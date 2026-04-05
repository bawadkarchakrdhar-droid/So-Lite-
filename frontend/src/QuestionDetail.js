import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');
    const [isFetching, setIsFetching] = useState(true);

    // API URL
    const API_URL = "https://so-lite-backend.onrender.com/api";

    useEffect(() => {
        const loadData = async () => {
            try {
                // Sahi mapping answers aur question fetch karne ke liye
                const qRes = await axios.get(`${API_URL}/questions/${id}`);
                setQuestion(qRes.data);
                const aRes = await axios.get(`${API_URL}/answers/${id}`);
                setAnswers(aRes.data || []);
                setIsFetching(false);
            } catch (err) {
                console.error("Connection error:", err);
                setIsFetching(false);
            }
        };
        loadData();
    }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Pehle kuch likho bhai!");

        try {
            await axios.post(`${API_URL}/answers`, {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'Guest_User'
            });
            alert("Answer post ho gaya! 🚀");
            setAnswerText('');
            window.location.reload(); 
        } catch (err) {
            // Render spin-down error handle karne ke liye message
            alert("Backend abhi jag raha hai (Render Sleep). Ek baar refresh karke 30 second baad try karein.");
        }
    };

    if (isFetching) return <div className="container mt-5 text-center"><h4>Backend jag raha hai... Sabr rakhein ⏳</h4></div>;
    if (!question) return <div className="container mt-5">Sawal nahi mila!</div>;

    return (
        <div className="container-fluid px-md-5 py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    
                    {/* Header Section */}
                    <div className="border-bottom pb-3 mb-4">
                        <h1 className="fw-bold" style={{ fontSize: '1.8rem', color: '#232629' }}>{question.title}</h1>
                        <div className="d-flex gap-3 text-muted small">
                            <span>Asked: Today</span>
                            <span>Viewed: 15 times</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-9">
                            {/* Question Content */}
                            <div className="fs-5 mb-5" style={{ lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                                {question.description}
                            </div>

                            {/* Answers Section */}
                            <div className="mt-5">
                                <h3 className="border-bottom pb-3 mb-4">{answers.length} Answers</h3>
                                {answers.map((ans, i) => (
                                    <div key={i} className="card shadow-sm border-0 mb-4 bg-light">
                                        <div className="card-body p-4">
                                            <p className="mb-0" style={{ fontSize: '1.1rem' }}>{ans.text}</p>
                                            <div className="text-end mt-2 small text-primary">
                                                — User_{ans.userId?.slice(-4)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* PREMIUM FULL-WIDTH BOX */}
                            <div className="mt-5 pt-4 border-top">
                                <h3 className="fw-bold mb-4">Your Answer</h3>
                                <div className="card shadow border-0" style={{ borderRadius: '8px' }}>
                                    {/* Mock Toolbar */}
                                    <div className="bg-light border-bottom p-2 px-3 d-flex gap-4" style={{ color: '#525960' }}>
                                        <i className="bi bi-type-bold"></i>
                                        <i className="bi bi-type-italic"></i>
                                        <i className="bi bi-code-slash"></i>
                                        <i className="bi bi-link-45deg"></i>
                                        <i className="bi bi-image"></i>
                                    </div>
                                    <textarea 
                                        className="form-control border-0 shadow-none"
                                        placeholder="Apna solution yahan poori detail mein likhein..."
                                        style={{ 
                                            minHeight: '350px', 
                                            fontSize: '16px', 
                                            padding: '20px',
                                            width: '100%', // Full-screen fix
                                            resize: 'vertical'
                                        }}
                                        value={answerText}
                                        onChange={(e) => setAnswerText(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg mt-4 px-5 fw-bold" 
                                        style={{ backgroundColor: '#0a95ff', border: 'none' }}
                                        onClick={handlePost}>
                                    Post Your Answer
                                </button>
                            </div>
                        </div>

                        {/* Sidebar Tips */}
                        <div className="col-lg-3 d-none d-lg-block">
                            <div className="card border-warning bg-light shadow-sm">
                                <div className="card-body small">
                                    <h6 className="fw-bold">How to Answer</h6>
                                    <p className="mb-1 text-muted">Explain **why** this solution is the best.</p>
                                    <p className="mb-0 text-muted">Share your research and code snippets.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;