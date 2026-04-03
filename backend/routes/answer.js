const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Answer post karne ka route
router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;

        if (!answerBody || !userId || !questionId) {
            return res.status(400).json({ message: "Bhai, saari details dalo!" });
        }

        // 1. Answer save karo
        const newAnswer = new Answer({
            body: answerBody,
            user: userId,
            question: questionId
        });
        const savedAnswer = await newAnswer.save();

        // 2. CRITICAL: Question ke answers array mein ye ID push karo
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(500).json({ message: "Backend Error", error: err.message });
    }
});

module.exports = router;