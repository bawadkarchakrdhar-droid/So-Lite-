const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// POST: /api/answer
router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;

        // Validation check
        if (!answerBody || !userId || !questionId) {
            return res.status(400).json({ message: "Fields missing hain!" });
        }

        // 1. Answer create aur save karo
        const newAnswer = new Answer({
            body: answerBody,
            user: userId,
            question: questionId
        });
        const savedAnswer = await newAnswer.save();

        // 2. Question model mein is answer ko link karo (Sabse important)
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Backend crash!", error: err.message });
    }
});

module.exports = router;