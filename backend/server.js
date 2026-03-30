const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/stack-lite')
    .then(() => console.log("MongoDB connected successfully! ✅"))
    .catch(err => console.log("MongoDB connection error: ❌", err));

// Routes Configuration
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
// FIXED: Added 's' to match frontend request
app.use('/api/answer', require('./routes/answer')); 

app.get('/', (req, res) => {
    res.send("Stack Lite Backend is Running...");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});