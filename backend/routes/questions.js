const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions for dashboard
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Data fetch fail" });
    }
});

// Get single question with answers
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) return res.status(404).json({ message: "Sawal nahi mila" });
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Post a new question
router.post('/', async (req, res) => {
    try {
        const { title, description, tags, userId } = req.body;
        const newQuestion = new Question({
            title,
            description,
            tags,
            user: userId
        });
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(500).json({ message: "Post failed" });
    }
});

module.exports = router;