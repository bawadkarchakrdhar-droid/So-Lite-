const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

router.post('/', async (req, res) => {
    try {
        // Frontend se 'user' aur 'question' keys match honi chahiye
        const { answerBody, user, question } = req.body;

        if (!answerBody || !user || !question) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAnswer = new Answer({
            answerBody,
            user,     // Reference to User ID
            question  // Reference to Question ID
        });

        const savedAnswer = await newAnswer.save();

        // Push answer ID into the Question's answers array
        await Question.findByIdAndUpdate(question, {
            $push: { answers: savedAnswer._id }
        });

        res.status(201).json(savedAnswer);
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;