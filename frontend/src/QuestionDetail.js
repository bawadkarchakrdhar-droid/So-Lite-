import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState('');
    const [loading, setLoading] = useState(true);

    const API_URL = "https://so-lite-backend.onrender.com/api";

    useEffect(() => {
        const loadPage = async () => {
            try {
                const qRes = await axios.get(`${API_URL}/questions/${id}`);
                setQuestion(qRes.data);
                const aRes = await axios.get(`${API_URL}/answers/${id}`);
                setAnswers(aRes.data || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        loadPage();
    }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Write something!");
        try {
            await axios.post(`${API_URL}/answers`, {
                questionId: id,
                text: answerText,
                userId: localStorage.getItem('userId') || 'User123'
            });
            alert("Answer posted!");
            setAnswerText('');
            window.location.reload();
        } catch (err) {
            alert("Error: Connection failed! Render check karein.");
        }
    };

    if (loading) return <div className="text-center mt-5"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5">Sawal nahi mila!</div>;

    return (
        <div className="container-fluid px-md-5 py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    <div className="border-bottom pb-4 mb-4">
                        <h1 className="fw-bold mb-3" style={{ color: '#232629' }}>{question.title}</h1>
                        <p className="fs-5" style={{ whiteSpace: 'pre-wrap', color: '#3b4045' }}>{question.description}</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="mb-4">{answers.length} Answers</h3>
                        {answers.map((ans, i) => (
                            <div key={i} className="card shadow-sm border-0 mb-3 bg-light p-4">
                                <p className="mb-0 fs-6">{ans.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 pt-4 border-top">
                        <h3 className="fw-bold mb-4">Your Answer</h3>
                        <div className="card shadow-sm border" style={{ borderRadius: '6px' }}>
                            <div className="bg-light border-bottom p-2 d-flex gap-4 px-3 text-muted">
                                <i className="bi bi-type-bold"></i><i className="bi bi-type-italic"></i><i className="bi bi-code-slash"></i>
                            </div>
                            <textarea 
                                className="form-control border-0 shadow-none"
                                placeholder="Share your knowledge..."
                                style={{ minHeight: '300px', width: '100%', padding: '20px', fontSize: '16px' }} // Full width fix
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-lg mt-4 px-5 fw-bold" onClick={handlePost}>Post Your Answer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;