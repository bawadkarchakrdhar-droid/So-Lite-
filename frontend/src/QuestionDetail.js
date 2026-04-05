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
        const fetchAll = async () => {
            try {
                const qRes = await axios.get(`${API_BASE}/questions/${id}`);
                setQuestion(qRes.data);
                const aRes = await axios.get(`${API_BASE}/answers/${id}`);
                setAnswers(aRes.data || []);
                setLoading(false);
            } catch (err) {
                console.error("Fetch failed", err);
                setLoading(false);
            }
        };
        fetchAll();
    }, [id]);

    const handleAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return;
        try {
            await axios.post(`${API_BASE}/answers`, {
                questionId: id,
                text: answerText,
                userId: 'User123'
            });
            alert("Answer posted!");
            setAnswerText('');
            window.location.reload();
        } catch (err) {
            alert("Error: Backend se connect nahi ho raha.");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            {question && (
                <div className="border-bottom pb-4 mb-5">
                    <h1 className="fw-bold">{question.title}</h1>
                    <p className="fs-5 text-muted">{question.description}</p>
                </div>
            )}

            <div className="mb-5">
                <h4>{answers.length} Answers</h4>
                {answers.map((ans, i) => (
                    <div key={i} className="card p-3 mb-2 bg-white shadow-sm border-0">{ans.text}</div>
                ))}
            </div>

            <div className="mt-5">
                <h3 className="fw-bold mb-3">Your Answer</h3>
                <textarea 
                    className="form-control mb-3" 
                    rows="8" 
                    style={{ width: '100%', padding: '15px' }} 
                    placeholder="Write your technical solution..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                />
                <button className="btn btn-primary btn-lg" onClick={handleAnswer}>Post Answer</button>
            </div>
        </div>
    );
};

export default QuestionDetail;