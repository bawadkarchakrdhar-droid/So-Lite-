const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE: CORS ko sahi se set kiya hai taaki Vercel block na ho
app.use(cors({
    origin: "*", // Testing ke liye sab allow hai, connection issue nahi aayega
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// 2. MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully! ✅"))
    .catch(err => console.log("MongoDB connection error: ❌", err));

// 3. ROUTES CONFIGURATION
// Dhyaan dein: Routes ke paths wahi hain jo aapne pehle use kiye the
app.use('/api/auth', require('./routes/auth'));
app.use('/api/question', require('./routes/questions')); // 's' check kar lena
app.use('/api/answer', require('./routes/answer'));

// 4. SERVER STATUS CHECK
app.get('/', (req, res) => {
    res.send("Stack Lite Backend is Running...");
});

// 5. PORT SETTINGS
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});