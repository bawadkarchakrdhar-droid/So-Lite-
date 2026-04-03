const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        const { answerBody, userId, questionId } = req.body;
        const newAns = new Answer({ body: answerBody, user: userId, question: questionId });
        const savedAns = await newAns.save();

        // Question collection mein answer ki ID push karo
        await Question.findByIdAndUpdate(questionId, { $push: { answers: savedAns._id } });
        res.status(201).json(savedAns);
    } catch (err) {
        res.status(500).json({ error: "Answer save nahi hua" });
    }
});
module.exports = router;