const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// POST: /api/answer
router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;

        // 1. Pehle Answer save karo
        const newAnswer = new Answer({
            body: answerBody, 
            user: userId,
            question: questionId
        });
        const savedAnswer = await newAnswer.save();

        // 2. IMPORTANT: Question ke answers array mein iski ID push karo
        // Iske bina refresh karne par answer nahi dikhega
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

module.exports = router;