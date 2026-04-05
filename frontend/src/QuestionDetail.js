import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Question and Answers fetch mapping
                const qRes = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
                setQuestion(qRes.data);
                const aRes = await axios.get(`https://so-lite-backend.onrender.com/api/answers/${id}`);
                setAnswers(aRes.data);
            } catch (err) {
                console.error("Data fetch error:", err);
            }
        };
        fetchDetails();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Please write an answer first!");

        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answers', {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'Anonymous'
            });
            alert("Answer posted successfully! 🚀");
            setAnswerText('');
            window.location.reload(); 
        } catch (err) {
            alert("Error: Answer post nahi hua.");
        }
    };

    if (!question) return <div className="container mt-5">Loading premium content...</div>;

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '50px' }}>
            <div className="container mt-4">
                {/* Question Header */}
                <div className="border-bottom pb-3 mb-4">
                    <h1 className="fw-bold text-dark mb-2" style={{ fontSize: '1.7rem' }}>{question.title}</h1>
                    <div className="d-flex gap-3 text-muted small">
                        <span>Asked: <span className="text-dark">Today</span></span>
                        <span>Viewed: <span className="text-dark">12 times</span></span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        {/* Question Body */}
                        <div className="pb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                            {question.description}
                        </div>

                        {/* Answers List */}
                        <div className="mt-5">
                            <h4 className="border-bottom pb-3 mb-4">{answers.length} Answers</h4>
                            {answers.map((ans, index) => (
                                <div key={index} className="border-bottom pb-4 mb-4">
                                    <div style={{ lineHeight: '1.6' }}>{ans.text}</div>
                                    <div className="d-flex justify-content-end mt-2">
                                        <div className="p-2 rounded bg-light small" style={{ width: '200px' }}>
                                            <span className="text-muted">answered on 4/4/2026</span>
                                            <div className="text-primary mt-1">User_{ans.userId?.slice(-4)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- PREMIUM ANSWER BOX START --- */}
                        <div className="mt-5">
                            <h4 className="fw-bold mb-3" style={{ fontSize: '1.3rem' }}>Your Answer</h4>
                            <div className="card shadow-sm mb-3" style={{ borderRadius: '3px', border: '1px solid #babfc4' }}>
                                {/* Editor Toolbar Icons */}
                                <div className="d-flex gap-3 p-2 bg-light border-bottom" style={{ color: '#525960', cursor: 'default' }}>
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

                                <textarea 
                                    className="form-control border-0 shadow-none"
                                    placeholder="Write your technical solution here..." 
                                    style={{ 
                                        minHeight: '280px', 
                                        padding: '15px', 
                                        fontSize: '15px',
                                        lineHeight: '1.5',
                                        backgroundColor: '#ffffff'
                                    }}
                                    value={answerText} 
                                    onChange={(e) => setAnswerText(e.target.value)} 
                                />
                            </div>

                            <button 
                                className="btn text-white fw-bold px-3 py-2 mb-5" 
                                style={{ backgroundColor: '#0a95ff', border: '1px solid #0a95ff', borderRadius: '3px' }}
                                onClick={handlePostAnswer}
                            >
                                Post Your Answer
                            </button>
                        </div>
                        {/* --- PREMIUM ANSWER BOX END --- */}
                    </div>

                    {/* Sidebar with Tips */}
                    <div className="col-lg-4 d-none d-lg-block">
                        <div className="card border shadow-sm" style={{ backgroundColor: '#fdf7e2', borderColor: '#e6dfbc' }}>
                            <div className="card-header fw-bold small" style={{ backgroundColor: '#fbf2d4', borderBottom: '1px solid #e6dfbc' }}>
                                How to Answer
                            </div>
                            <div className="card-body small p-3">
                                <p className="mb-2">Explain **why** your solution works to help the community.</p>
                                <hr style={{ color: '#e6dfbc' }} />
                                <p className="mb-0 text-muted">Use code blocks for any syntax examples.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;