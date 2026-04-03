const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;

        // 1. Pehle Answer create karo
        const newAnswer = new Answer({
            body: answerBody, 
            user: userId,
            question: questionId
        });
        const savedAnswer = await newAnswer.save();

        // 2. Question model ko update karo (Ye missing ho sakta hai aapke code mein)
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("Database Save Error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;