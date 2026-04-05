import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            // Sahi endpoint check karein: /api/questions/${id}
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            // Answers agar array mein hain toh set honge
            setAnswers(res.data.answers || []); 
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        if (!ansBody.trim()) return;

        try {
            const userId = localStorage.getItem('userId') || 'Anonymous';
            // POST call check karein: /api/answer
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: userId,
                questionId: id
            });
            alert("Answer save ho gaya! ✅");
            setAnsBody('');
            loadData(); 
        } catch (err) {
            alert("Connection error! Backend check karein.");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question nahi mila! ❌</h3></div>;

    return (
        <div className="container-fluid px-md-5 py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    {/* Question Section */}
                    <div className="border-bottom pb-4 mb-4">
                        <h1 className="fw-bold text-dark mb-3">{question.title}</h1>
                        <p className="fs-5 text-secondary" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {question.description}
                        </p>
                    </div>

                    {/* Answers List */}
                    <div className="mb-5">
                        <h4 className="fw-bold mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, i) => (
                            <div key={i} className="card mb-3 shadow-sm border-0 bg-light p-3">
                                <div className="card-body p-2">
                                    <p className="fs-6 mb-2">
                                        {ans.answerBody || "Data error: Field mismatch"}
                                    </p>
                                    <small className="text-muted">
                                        Posted on: {ans.createdAt ? new Date(ans.createdAt).toLocaleDateString() : 'Today'}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Full-Width Answer Box */}
                    <div className="mt-5 pt-4 border-top">
                        <h3 className="fw-bold mb-4">Tera Answer Likho</h3>
                        <form onSubmit={handleAns}>
                            <div className="card shadow-sm border mb-3">
                                <div className="bg-light border-bottom p-2 px-3 text-muted">
                                    <i className="bi bi-type-bold me-3"></i>
                                    <i className="bi bi-type-italic me-3"></i>
                                    <i className="bi bi-code-slash"></i>
                                </div>
                                <textarea 
                                    className="form-control border-0 shadow-none" 
                                    value={ansBody} 
                                    onChange={(e) => setAnsBody(e.target.value)}
                                    placeholder="Yahan detail mein likho..." 
                                    style={{ minHeight: '300px', fontSize: '16px', padding: '20px' }}
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold mt-2">
                                Post Answer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;