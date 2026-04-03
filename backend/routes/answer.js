const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// POST: /api/answer
router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;

        // Validation: Koi field khali na ho
        if (!answerBody || !userId || !questionId) {
            return res.status(400).json({ message: "Bhai, saari details bhejo!" });
        }

        // 1. Naya Answer create karo
        const newAnswer = new Answer({
            body: answerBody,
            user: userId,
            question: questionId
        });

        const savedAnswer = await newAnswer.save();

        // 2. Question model mein is answer ko link karo
        // Bina iske page refresh pe answer gayab ho jayega
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ message: "Database mein save nahi hua", error: err.message });
    }
});

module.exports = router;