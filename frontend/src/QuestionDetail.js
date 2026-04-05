import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');
    const [loading, setLoading] = useState(true);

    // Backend URL Variable
    const API_BASE_URL = "https://so-lite-backend.onrender.com/api";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Mapping calls to fetch question and existing answers
                const qRes = await axios.get(`${API_BASE_URL}/questions/${id}`);
                setQuestion(qRes.data);
                
                const aRes = await axios.get(`${API_BASE_URL}/answers/${id}`);
                setAnswers(aRes.data || []); 
                setLoading(false);
            } catch (err) {
                console.error("Fetch Error:", err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Pehle answer likhein!");

        try {
            // Posting new answer to backend mapping
            await axios.post(`${API_BASE_URL}/answers`, {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'User_Guest'
            });
            alert("Answer post ho gaya! 🚀");
            setAnswerText('');
            window.location.reload(); 
        } catch (err) {
            // Updated error message for clarity
            alert("Error: Backend se connection nahi ho pa raha. Kripya Render dashboard check karein.");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5">Question nahi mila!</div>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    
                    {/* Question Section */}
                    <div className="pb-4 border-bottom mb-5">
                        <h1 className="fw-bold text-dark mb-3" style={{ fontSize: '2rem' }}>{question.title}</h1>
                        <p className="fs-5 text-muted" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {question.description}
                        </p>
                    </div>

                    {/* Answers Section */}
                    <div className="mb-5">
                        <h4 className="fw-bold mb-4">{answers.length} Answers</h4>
                        {answers.length > 0 ? (
                            answers.map((ans, index) => (
                                <div key={index} className="card shadow-sm border-0 mb-4 bg-light">
                                    <div className="card-body p-4">
                                        <p className="mb-0" style={{ fontSize: '1.05rem' }}>{ans.text}</p>
                                        <hr className="my-3 opacity-25" />
                                        <small className="text-primary fw-bold">Answered by: User_{ans.userId?.slice(-4)}</small>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted italic">Abhi tak koi answer nahi hai. Pehla answer aap likhein!</p>
                        )}
                    </div>

                    {/* PREMIUM FULL-WIDTH ANSWER BOX */}
                    <div className="mt-5 pt-4 border-top">
                        <h3 className="fw-bold mb-4">Your Answer</h3>
                        
                        <div className="card shadow border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
                            {/* Toolbar */}
                            <div className="bg-light border-bottom p-3 d-flex gap-4">
                                <i className="bi bi-type-bold fs-5"></i>
                                <i className="bi bi-type-italic fs-5"></i>
                                <i className="bi bi-code-slash fs-5"></i>
                                <i className="bi bi-link-45deg fs-5"></i>
                                <i className="bi bi-list-ul fs-5"></i>
                            </div>

                            {/* Full Width Textarea */}
                            <textarea 
                                className="form-control border-0 shadow-none"
                                placeholder="Apna technical solution yahan vistaar se likhein..." 
                                style={{ 
                                    minHeight: '350px', 
                                    padding: '25px', 
                                    fontSize: '16px',
                                    width: '100%', 
                                    backgroundColor: '#fff',
                                    resize: 'vertical'
                                }}
                                value={answerText} 
                                onChange={(e) => setAnswerText(e.target.value)} 
                            />
                        </div>

                        <div className="mt-4">
                            <button 
                                className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-sm"
                                style={{ backgroundColor: '#0a95ff', border: 'none', borderRadius: '6px' }}
                                onClick={handlePostAnswer}
                            >
                                Post Your Answer
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;