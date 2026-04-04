const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;
        const newAnswer = new Answer({ answerBody, user: userId, question: questionId });
        const savedAnswer = await newAnswer.save();

        // Question mein answer link karna zaroori hai
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(500).json({ message: "Fail" });
    }
});

module.exports = router;