const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// GET single question by ID with populated answers
router.get('/:id', async (req, res) => {
    try {
        // IMPORTANT: answers array ko populate karna zaroori hai
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new question
router.post('/', async (req, res) => {
    const { title, description, tags, userId } = req.body;

    if (!title || !description || !userId) {
        return res.status(400).json({ message: "Bhai, saare fields bharo!" });
    }

    const newQuestion = new Question({
        title,
        description,
        tags,
        user: userId // Make sure 'user' matches your MongoDB Schema
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;