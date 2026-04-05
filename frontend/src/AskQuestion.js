import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');
    const [loading, setLoading] = useState(true);

    // CRITICAL: Ensure this URL matches your Render backend exactly!
    const API_BASE_URL = "https://so-lite-backend.onrender.com/api";

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching from:", `${API_BASE_URL}/questions/${id}`);
                const qRes = await axios.get(`${API_BASE_URL}/questions/${id}`);
                setQuestion(qRes.data);

                const aRes = await axios.get(`${API_BASE_URL}/answers/${id}`);
                setAnswers(aRes.data || []);
                setLoading(false);
            } catch (err) {
                console.error("Fetch detailed error:", err.response || err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Write something first!");

        try {
            // Posting with explicit headers for CORS
            const response = await axios.post(`${API_BASE_URL}/answers`, {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'Anonymous'
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 201 || response.status === 200) {
                alert("Answer posted! 🚀");
                setAnswerText('');
                window.location.reload();
            }
        } catch (err) {
            console.error("Post error:", err.response || err);
            alert(`Error: ${err.message}. Backend check karein agar logs mein 404 ya 500 aa raha hai.`);
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading Question...</h3></div>;

    return (
        <div className="container-fluid px-md-5 py-5" style={{ minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    
                    {/* Question Content */}
                    {question && (
                        <div className="border-bottom pb-4 mb-5">
                            <h1 className="fw-bold mb-3">{question.title}</h1>
                            <div className="fs-5 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                                {question.description}
                            </div>
                        </div>
                    )}

                    {/* Answers List */}
                    <div className="mb-5">
                        <h4 className="fw-bold mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, index) => (
                            <div key={index} className="card shadow-sm border-0 mb-3 bg-light p-3">
                                <p className="mb-0">{ans.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* FULL SCREEN PREMIUM BOX */}
                    <div className="mt-5 pt-4 border-top">
                        <h3 className="fw-bold mb-4">Your Answer</h3>
                        <div className="card shadow border-0" style={{ borderRadius: '8px' }}>
                            <div className="bg-light border-bottom p-2 px-3 d-flex gap-4">
                                <i className="bi bi-type-bold"></i><i className="bi bi-type-italic"></i>
                                <i className="bi bi-code-slash"></i><i className="bi bi-link-45deg"></i>
                            </div>
                            <textarea 
                                className="form-control border-0 shadow-none"
                                placeholder="Write your technical solution here..."
                                style={{ minHeight: '350px', fontSize: '16px', padding: '20px', width: '100%' }}
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-lg mt-4 px-5 fw-bold" 
                                style={{ backgroundColor: '#0a95ff', border: 'none' }}
                                onClick={handlePostAnswer}>
                            Post Your Answer
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;