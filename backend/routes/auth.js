const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- 1. SIGNUP ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check karo agar user pehle se hai
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User pehle se maujood hai!" });

        user = new User({ username, email, password });

        // Password ko hash (hide) karna
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Token banana taaki signup ke baad auto-login ho sake
        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// --- 2. LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;