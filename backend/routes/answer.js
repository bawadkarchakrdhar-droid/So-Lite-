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
        console.log("Answer Saved in DB:", savedAnswer);

        // 2. CRITICAL STEP: Question ke answers array mein ye ID push karo
        // Iske bina page refresh karne par answer gayab ho jayega
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId, 
            { $push: { answers: savedAnswer._id } },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question nahi mila!" });
        }

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ message: "Database Error", error: err.message });
    }
});

module.exports = router;