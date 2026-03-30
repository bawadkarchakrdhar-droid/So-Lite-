const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// 1. Saare sawal fetch karne ke liye (Dashboard)
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'username').sort({ date: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// 2. Ek specific sawal ID se nikalne ke liye (Detail Page)
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('user', 'username');
        if (!question) return res.status(404).json({ msg: "Sawal nahi mila!" });
        res.json(question);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error: ID galat ho sakti hai" });
    }
});

// 3. Naya sawal post karne ke liye
router.post('/', async (req, res) => {
    try {
        const { title, description, tags, userId } = req.body;
        const newQuestion = new Question({ title, description, tags, user: userId });
        await newQuestion.save();
        res.status(201).json({ msg: "Sawaal post ho gaya! 🚀" });
    } catch (err) {
        res.status(500).json({ msg: "Post fail ho gaya" });
    }
});

module.exports = router;