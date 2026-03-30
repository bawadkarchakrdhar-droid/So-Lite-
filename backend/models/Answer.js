const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    votes: { type: Number, default: 0 }, // Naya field votes ke liye
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', AnswerSchema);