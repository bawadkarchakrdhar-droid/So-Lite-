const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new question
router.post('/', async (req, res) => {
    const { title, description, tags, userId, userName } = req.body;
    
    const newQuestion = new Question({
        title,
        description,
        tags,
        userId,
        userName // Frontend se aaya hua naam yahan save hoga
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET single question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;