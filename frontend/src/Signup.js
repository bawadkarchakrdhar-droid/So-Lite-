import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Dhyaan dena: Backend mein humne '/register' banaya hai
            const res = await axios.post('https://so-lite-backend.onrender.com/api/auth/register', {
                username,
                email,
                password
            });

            // Signup ke baad seedha login details save kar lo
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('userId', res.data.user.id);

            alert("Account ban gaya! Welcome to Stack Lite ✅");
            navigate('/dashboard'); 
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Lafda ho gaya! Backend check karo.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f2f3' }}>
            <div style={{ width: '350px', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', color: '#f48225' }}>Naya Account Banao</h2>
                <form onSubmit={handleSignup}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Username</label>
                        <input type="text" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input type="email" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Password</label>
                        <input type="password" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign Up</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>Pehle se account hai? <Link to="/login">Login karein</Link></p>
            </div>
        </div>
    );
};

export default Signup;