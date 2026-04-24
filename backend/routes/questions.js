const router = require('express').Router();
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        const { title, description, tags, userId } = req.body;

        // Strict Validation
        if (!title || !description || !userId) {
            return res.status(400).json({ message: "Bhai, Data missing hai (Title/Desc/User)!" });
        }

        const newQuestion = new Question({
            title,
            description,
            tags,
            user: userId // Ensure Schema field is named 'user'
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ message: "Server Error: " + err.message });
    }
});

module.exports = router;