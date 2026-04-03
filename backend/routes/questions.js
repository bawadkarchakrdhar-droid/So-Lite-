const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Saare questions lane ke liye (Dashboard ke liye)
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ date: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Dashboard load fail" });
    }
});

// Single question detail with safe populate
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) return res.status(404).json({ message: "Nahi mila" });
        res.json(question);
    } catch (err) {
        // Agar populate fail ho toh bina answers ke bhej do crash rokne ke liye
        const questionOnly = await Question.findById(req.params.id);
        res.json({ ...questionOnly._doc, answers: [] });
    }
});

module.exports = router;