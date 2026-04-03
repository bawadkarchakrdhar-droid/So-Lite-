const express = require('express');
const router = require('express').Router();
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

        // Answer ID ko Question model ke andar push karna
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(500).json({ message: "Error saving answer", error: err.message });
    }
});

module.exports = router;