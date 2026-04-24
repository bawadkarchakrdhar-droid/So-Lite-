const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// 1. GET ALL QUESTIONS (For Dashboard)
// URL: /api/question
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        console.error("Fetch All Error:", err);
        res.status(500).json({ message: "Questions load nahi huye: " + err.message });
    }
});

// 2. GET SINGLE QUESTION BY ID (For Detail Page)
// URL: /api/question/:id
router.get('/:id', async (req, res) => {
    try {
        // IMPORTANT: Populate answers taaki detail page par answers dikhein
        const question = await Question.findById(req.params.id).populate('answers');
        if (!question) {
            return res.status(404).json({ message: "Question nahi mila!" });
        }
        res.json(question);
    } catch (err) {
        console.error("Fetch Single Error:", err);
        res.status(500).json({ message: "Server error occurred." });
    }
});

// 3. POST A NEW QUESTION
// URL: /api/question
router.post('/', async (req, res) => {
    try {
        const { title, description, tags, userId } = req.body;

        // Validation: Ensure userId and basic fields are present
        if (!title || !description || !userId || userId === 'undefined') {
            return res.status(400).json({ 
                message: "Bhai, Title, Description aur UserID teeno zaroori hain!" 
            });
        }

        const newQuestion = new Question({
            title,
            description,
            tags: Array.isArray(tags) ? tags : [], // Ensure tags is an array
            user: userId // Map frontend 'userId' to schema 'user' field
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        console.error("Post Question Error:", err);
        // Status 500 fixed to provide clear message
        res.status(500).json({ message: "Database Error: " + err.message });
    }
});

module.exports = router;