const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Dashboard ke liye saare questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Data fetch fail" });
    }
});

// Specific question detail with populated answers
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) {
            return res.status(404).json({ message: "Sawal nahi mila" });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: "Server error in populate logic" });
    }
});

module.exports = router;