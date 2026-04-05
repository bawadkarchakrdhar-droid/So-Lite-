import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');
    const [loading, setLoading] = useState(true);

    // BHAU, YE URL DHAYAN SE DEKHO - /api lagana zaroori hai
    const API_BASE_URL = "https://so-lite-backend.onrender.com/api";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Correct Endpoint Mapping
                const qRes = await axios.get(`${API_BASE_URL}/questions/${id}`);
                setQuestion(qRes.data);
                
                const aRes = await axios.get(`${API_BASE_URL}/answers/${id}`);
                setAnswers(aRes.data || []);
                setLoading(false);
            } catch (err) {
                console.error("404 ya Connection Error:", err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Write something!");

        try {
            await axios.post(`${API_BASE_URL}/answers`, {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'Anonymous'
            });
            alert("Answer posted! 🚀");
            setAnswerText('');
            window.location.reload(); 
        } catch (err) {
            alert("Error posting answer. Backend routes check karein.");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5">Question not found.</div>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    
                    {/* Question Section */}
                    <div className="pb-4 border-bottom mb-5">
                        <h1 className="fw-bold">{question.title}</h1>
                        <p className="fs-5 text-muted" style={{ whiteSpace: 'pre-wrap' }}>{question.description}</p>
                    </div>

                    {/* Answers List Section */}
                    <div className="mb-5">
                        <h4 className="fw-bold mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, index) => (
                            <div key={index} className="card shadow-sm border-0 mb-3 bg-light p-3">
                                <p className="mb-0">{ans.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* FULL WIDTH PREMIUM ANSWER BOX */}
                    <div className="mt-5 pt-4 border-top">
                        <h3 className="fw-bold mb-4">Your Answer</h3>
                        <div className="card shadow border-0" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                            <div className="bg-light border-bottom p-2 d-flex gap-3 px-3">
                                <i className="bi bi-type-bold"></i><i className="bi bi-type-italic"></i>
                                <i className="bi bi-code-slash"></i><i className="bi bi-link-45deg"></i>
                            </div>
                            <textarea 
                                className="form-control border-0 shadow-none"
                                placeholder="Write your technical solution here..." 
                                style={{ minHeight: '300px', padding: '20px', fontSize: '16px', width: '100%' }}
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