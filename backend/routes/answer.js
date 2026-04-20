const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// POST: /api/answer
router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body; // Frontend se aane wale names

        if (!answerBody || !userId || !questionId) {
            return res.status(400).json({ message: "Fields missing!" });
        }

        const newAnswer = new Answer({
            answerBody,
            user: userId,
            question: questionId
        });

        const savedAnswer = await newAnswer.save();

        // Question mein answer push karna
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;