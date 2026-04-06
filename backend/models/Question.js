const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    userId: { type: String, required: true },
    // Naya: User ka naam save karne ke liye
    userName: { type: String, default: 'Anonymous User' }, 
    answers: [
        {
            answerBody: String,
            userId: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);