const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answerBody: { // Ye naam frontend se match karna chahiye
        type: String, 
        required: true 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', AnswerSchema);