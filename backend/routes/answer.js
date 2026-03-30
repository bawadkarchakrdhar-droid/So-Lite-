const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// 1. Answer post karne ke liye
router.post('/', async (req, res) => {
    try {
        const { body, userId, questionId } = req.body;
        const newAnswer = new Answer({ body, user: userId, question: questionId });
        await newAnswer.save();
        res.status(201).json({ msg: "Answer post ho gaya! ✅" });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// 2. Answers fetch karne ke liye
router.get('/:questionId', async (req, res) => {
    try {
        const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'username');
        res.json(answers);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// 3. NEW: Vote update karne ke liye
router.put('/:id/vote', async (req, res) => {
    try {
        const { voteType } = req.body; 
        const answer = await Answer.findById(req.params.id);
        if (voteType === 'up') answer.votes += 1;
        else if (voteType === 'down') answer.votes -= 1;
        await answer.save();
        res.json({ votes: answer.votes });
    } catch (err) {
        res.status(500).send("Vote error");
    }
});

module.exports = router;