import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]); // Array to store fetched answers
    const [answerText, setAnswerText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Bhai, yahan purane answers aur question fetch kar rahe hain
        const fetchDetails = async () => {
            try {
                // Fetching Question Details mapping
                const qRes = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
                setQuestion(qRes.data);
                
                // Fetching Answers mapping associated with this question
                const aRes = await axios.get(`https://so-lite-backend.onrender.com/api/answers/${id}`);
                setAnswers(aRes.data); // Pure answers state mein set kiye
            } catch (err) {
                console.error("Data fetching error:", err);
            }
        };
        fetchDetails();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText) return alert("Please write an answer first!");

        try {
            // Posting new answer mapping
            await axios.post('https://so-lite-backend.onrender.com/api/answers', {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'Anonymous'
            });
            alert("Answer posted! 🚀");
            setAnswerText('');
            window.location.reload(); // Refresh to see the new answer
        } catch (err) {
            console.error(err);
            alert("Error: Connection failed");
        }
    };

    if (!question) return <div className="container mt-5">Loading question...</div>;

    return (
        <div className="container mt-4 mb-5">
            {/* Question Details Area */}
            <div className="pb-3 border-bottom mb-4">
                <h1 className="fw-bold text-dark mb-1">{question.title}</h1>
                <div className="d-flex text-muted small gap-3">
                    <span>Asked <span className="text-dark">today</span></span>
                    <span>Viewed <span className="text-dark">12 times</span></span>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    {/* The Question Body */}
                    <div className="question-body pb-5" style={{ fontSize: '1.1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                        {question.description}
                    </div>

                    {/* Bhai, yahan purane answers wapas aayenge */}
                    <div className="answers-section mt-5">
                        <h4 className="border-bottom pb-3 mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, index) => (
                            <div key={index} className="border-bottom pb-4 mb-4">
                                <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{ans.text}</p>
                                <div className="d-flex justify-content-end text-muted small">
                                    answered 4/4/2026 by User_{ans.userId?.slice(-4)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- ADVANCED ANSWER BOX SECTION --- */}
                    <div className="mt-5 pt-4 border-top">
                        <h4 className="fw-bold mb-3" style={{ fontSize: '1.3rem' }}>Your Answer</h4>
                        
                        {/* Container card with modern styling */}
                        <div className="card shadow border-0 p-3 p-md-4" style={{ borderRadius: '15px' }}>
                            {/* Editor Toolbar (Mock icons for style) */}
                            <div className="d-flex gap-3 mb-3 pb-2 border-bottom" style={{ color: '#525960', fontSize: '1.1rem' }}>
                                <i className="bi bi-type-bold mx-1"></i>
                                <i className="bi bi-type-italic mx-1"></i>
                                <div className="vr mx-2"></div>
                                <i className="bi bi-link-45deg mx-1"></i>
                                <i className="bi bi-code-slash mx-1"></i>
                                <i className="bi bi-image mx-1"></i>
                                <div className="vr mx-2"></div>
                                <i className="bi bi-list-ol mx-1"></i>
                                <i className="bi bi-list-ul mx-1"></i>
                            </div>

                            {/* Bhai, ye hai full-width advanced textarea */}
                            <textarea 
                                className="form-control shadow-none border"
                                placeholder="Apna detailed programming solution yahan paste karein..." 
                                style={{ 
                                    width: '100%', 
                                    minHeight: '280px', 
                                    padding: '1.2rem', 
                                    fontSize: '15px', 
                                    lineHeight: '1.5',
                                    borderRadius: '12px',
                                    backgroundColor: '#fff',
                                    resize: 'none',
                                    border: '1px solid #ced4da'
                                }}
                                value={answerText} 
                                onChange={(e) => setAnswerText(e.target.value)} 
                            />
                        </div>

                        {/* Stack Overflow blue button */}
                        <div className="d-grid gap-2 mt-4">
                            <button 
                                className="btn btn-primary fw-bold text-white shadow" 
                                style={{ backgroundColor: '#0a95ff', border: '1px solid #0a95ff', borderRadius: '4px', fontSize: '14px', padding: '12px' }}
                                onClick={handlePostAnswer}
                            >
                                Post Your Answer
                            </button>
                            <button type="button" className="btn btn-link text-decoration-none text-muted" onClick={() => navigate('/dashboard')}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;