import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');
    const [loading, setLoading] = useState(true);

    const API_BASE = "https://so-lite-backend.onrender.com/api";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetching question and answers separately
                const qRes = await axios.get(`${API_BASE}/questions/${id}`);
                setQuestion(qRes.data);
                const aRes = await axios.get(`${API_BASE}/answers/${id}`);
                setAnswers(aRes.data || []);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Please write an answer!");

        try {
            await axios.post(`${API_BASE}/answers`, {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'User123'
            });
            alert("Answer posted! 🚀");
            setAnswerText('');
            window.location.reload(); 
        } catch (err) {
            alert("Error: Connection failed! Backend check karein.");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5">Question not found.</div>;

    return (
        <div className="container-fluid px-md-5 py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    <div className="border-bottom pb-4 mb-5">
                        <h1 className="fw-bold">{question.title}</h1>
                        <p className="fs-5 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>{question.description}</p>
                    </div>

                    <div className="mb-5">
                        <h4 className="fw-bold mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, index) => (
                            <div key={index} className="card shadow-sm border-0 mb-3 bg-light p-3">
                                <p className="mb-0">{ans.text}</p>
                            </div>
                        ))}
                    </div>

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
                                style={{ minHeight: '300px', fontSize: '16px', padding: '20px', width: '100%' }} // Full width fix
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-lg mt-4 px-5 fw-bold" onClick={handlePostAnswer}>
                            Post Your Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;