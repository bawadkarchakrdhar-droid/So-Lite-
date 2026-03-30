import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            // 1. Token aur User Details ko LocalStorage mein save karna
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('userId', res.data.user.id); // YE LINE SABSE IMP HAI

            alert("Bhai, Login Successful! ✅");
            navigate('/dashboard'); // Login ke baad Dashboard pe bhej dega
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Login failed! Password check karo.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f2f3' }}>
            <div style={{ width: '350px', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: '#f48225' }}>Stack Lite</h2>
                    <p style={{ color: '#6a737c', fontSize: '14px' }}>Apne account mein login karein</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
                        <input 
                            type="email" 
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #babfc4' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Password</label>
                        <input 
                            type="password" 
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #babfc4' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{ width: '100%', padding: '10px', backgroundColor: '#0095ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Log In
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                    Account nahi hai? <Link to="/signup" style={{ color: '#0074cc', textDecoration: 'none' }}>Sign up karein</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;