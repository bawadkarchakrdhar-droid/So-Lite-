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
            // Aapka working logic
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
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
        try {
            const userId = localStorage.getItem('userId');
            // Aapka working POST call
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
        <div className="container mt-5 mb-5">
            {/* Question Header Section */}
            <div className="pb-3 mb-4 border-bottom">
                <h1 className="display-6 fw-bold text-dark">{question.title}</h1>
                <div className="d-flex text-muted small gap-3 mt-2">
                    <span>Asked: Today</span>
                    <span>Modified: Today</span>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-9">
                    {/* Question Description */}
                    <div className="fs-5 mb-5" style={{ whiteSpace: 'pre-wrap', color: '#232629', lineHeight: '1.6' }}>
                        {question.description}
                    </div>

                    {/* Answers Section */}
                    <div className="mt-5">
                        <h4 className="fw-normal border-bottom pb-3 mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, i) => (
                            <div key={i} className="py-3 border-bottom">
                                <p className="mb-2" style={{ fontSize: '16px' }}>
                                    {ans.answerBody || "Data error: Field mismatch"}
                                </p>
                                <small className="text-primary">Posted on: {new Date(ans.createdAt).toLocaleDateString()}</small>
                            </div>
                        ))}
                    </div>

                    {/* STACK OVERFLOW STYLE ANSWER BOX */}
                    <div className="mt-5">
                        <h3 className="fw-bold mb-4">Your Answer</h3>
                        <form onSubmit={handleAns}>
                            <div className="card shadow-sm border" style={{ borderRadius: '4px' }}>
                                {/* Editor Toolbar Appearance */}
                                <div className="bg-light border-bottom p-2 d-flex gap-3 px-3 text-muted">
                                    <span className="fw-bold">B</span>
                                    <span className="fst-italic">I</span>
                                    <span>🔗</span>
                                    <span>&lt;/&gt;</span>
                                    <span>📷</span>
                                </div>
                                <textarea 
                                    className="form-control border-0 shadow-none" 
                                    value={ansBody} 
                                    onChange={(e) => setAnsBody(e.target.value)}
                                    placeholder="Write your technical solution here..." 
                                    style={{ 
                                        minHeight: '280px', 
                                        fontSize: '15px', 
                                        padding: '15px', 
                                        width: '100%',
                                        backgroundColor: '#fff'
                                    }}
                                    required 
                                />
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary btn-lg px-4" style={{ borderRadius: '4px', fontWeight: '500' }}>
                                    Post Your Answer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar Tips (Stack Overflow Look) */}
                <div className="col-lg-3 d-none d-lg-block">
                    <div className="card bg-warning bg-opacity-10 border-warning border-opacity-25 p-3">
                        <h6 className="fw-bold">How to Answer</h6>
                        <ul className="small ps-3 mb-0">
                            <li>Explain why your solution works.</li>
                            <li>Use code blocks for examples.</li>
                            <li>Be polite and helpful.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;