const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET single question with its answers
router.get('/:id', async (req, res) => {
    try {
        // .populate('answers') likhna compulsory hai answers dikhane ke liye
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) {
            return res.status(404).json({ message: "Question nahi mila" });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;