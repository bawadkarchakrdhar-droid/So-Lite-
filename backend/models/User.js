const mongoose = require('mongoose');

// User ka dhancha (Schema) taiyar kar rahe hain
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Ek email se ek hi account banega
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Sirf 'user' ya 'admin' hi ho sakta hai
    default: 'user' // Naya user by default 'user' banega
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// Is schema ko "User" naam ke model mein convert karke export kar rahe hain
module.exports = mongoose.model('User', UserSchema);