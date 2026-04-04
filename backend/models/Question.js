const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // YE FIELD ANSWERS KO LINK KARNE KE LIYE HAI
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);