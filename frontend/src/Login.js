import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Navigation ke liye

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Aapka Live Backend URL
            const response = await fetch("https://so-lite-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Welcome! Login Successful ✅");
                // Login ke baad user ko dashboard ya home par bhej do
                navigate("/"); 
            } else {
                // Agar password galat ho ya user na mile
                alert(data.message || "error.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Server connect nahi ho raha. 1 minute wait karke firse try karo!");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login Karein</h2>
            <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Email:</label><br />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ padding: "8px", width: "250px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Password:</label><br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ padding: "8px", width: "250px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
                    Login
                </button>
            </form>
            <p>
                Account nahi hai? <Link to="/signup">Naya Account Banaao</Link>
            </p>
        </div>
    );
};

export default Login;