const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer'); // Check karo path sahi hai ya nahi
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        const { answerBody, body, userId, questionId } = req.body;

        // 1. Naya Answer create karo (Dono body fields check kar rahe hain)
        const newAnswer = new Answer({
            body: answerBody || body, 
            user: userId,
            question: questionId
        });

        const savedAnswer = await newAnswer.save();

        // 2. IMPORTANT: Question model mein is answer ki ID push karo
        // Iske bina database mein save toh hoga par question page par dikhega nahi
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("Backend Save Error:", err);
        res.status(500).json({ message: "Database mein save nahi ho paya", error: err.message });
    }
});

module.exports = router;