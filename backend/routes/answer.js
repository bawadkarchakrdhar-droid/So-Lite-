const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;

        const newAnswer = new Answer({
            body: answerBody,
            user: userId,
            question: questionId
        });

        const savedAnswer = await newAnswer.save();

        // Ye line answers ko question se connect karti hai
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;