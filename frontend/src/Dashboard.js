import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/questions');
                setQuestions(res.data);
            } catch (err) { console.error(err); }
        };
        fetchQuestions();
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fb' }}>
            {/* Sidebar - Dark & Sleek */}
            <div style={{ 
                width: '220px', 
                backgroundColor: '#2d3436', 
                color: '#fff',
                paddingTop: '40px',
                flexShrink: 0,
                boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{ padding: '0 25px', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '20px', color: '#00d2ff', letterSpacing: '1px' }}>SO-LITE</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ padding: '12px 25px', backgroundColor: '#0984e3', borderLeft: '4px solid #74b9ff', cursor: 'pointer' }}>🌐 Dashboard</div>
                    <div style={{ padding: '12px 25px', color: '#b2bec3', cursor: 'pointer', transition: '0.3s' }} className="side-link">🏷️ All Tags</div>
                    <div style={{ padding: '12px 25px', color: '#b2bec3', cursor: 'pointer' }}>👥 Users</div>
                    <div style={{ padding: '12px 25px', color: '#b2bec3', cursor: 'pointer', marginTop: '20px' }}>⚙️ Settings</div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '40px 50px' }}>
                {/* Top Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', color: '#2d3436', margin: 0, fontWeight: '700' }}>Developer Forum</h1>
                        <p style={{ color: '#636e72', marginTop: '5px' }}>Check out the latest technical discussions</p>
                    </div>
                    <button 
                        onClick={() => navigate('/ask-question')}
                        style={{ 
                            padding: '12px 25px', 
                            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(108, 92, 231, 0.3)',
                            cursor: 'pointer' 
                        }}
                    >
                        + Ask a Question
                    </button>
                </div>

                {/* Questions Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {questions.map((q) => (
                        <div key={q._id} style={{ 
                            backgroundColor: '#fff', 
                            borderRadius: '12px', 
                            padding: '25px', 
                            display: 'flex',
                            gap: '25px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                            border: '1px solid #f1f2f6',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }} 
                        onClick={() => navigate(`/question/${q._id}`)}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Stats Section */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '70px', textAlign: 'center' }}>
                                <div style={{ backgroundColor: '#f1f2f6', padding: '10px', borderRadius: '8px' }}>
                                    <span style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: '#2d3436' }}>0</span>
                                    <small style={{ fontSize: '10px', color: '#636e72', textTransform: 'uppercase' }}>Votes</small>
                                </div>
                                <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '8px', border: '1px solid #bbdefb' }}>
                                    <span style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>{q.answers?.length || 0}</span>
                                    <small style={{ fontSize: '10px', color: '#1976d2', textTransform: 'uppercase' }}>Ans</small>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 10px 0', color: '#2d3436', fontSize: '20px', fontWeight: '600' }}>{q.title}</h3>
                                <p style={{ color: '#636e72', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
                                    {q.description.substring(0, 160)}...
                                </p>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {['react', 'javascript'].map(tag => (
                                            <span key={tag} style={{ 
                                                padding: '5px 12px', 
                                                backgroundColor: '#f1f2f6', 
                                                color: '#636e72', 
                                                borderRadius: '20px', 
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}>#{tag}</span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#6c5ce7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                            {q.user?.username?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <span style={{ fontSize: '13px', color: '#2d3436', fontWeight: '500' }}>{q.user?.username || 'User'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;