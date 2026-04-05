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
                // Backend calls check karein
                const qRes = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
                setQuestion(qRes.data);
                const aRes = await axios.get(`https://so-lite-backend.onrender.com/api/answers/${id}`);
                setAnswers(aRes.data); // Answers wapas lane ke liye
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchDetails();
    }, [id]);

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return alert("Please write an answer!");

        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answers', {
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

    if (!question) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    
                    {/* Question Section */}
                    <div className="border-bottom pb-4 mb-5">
                        <h1 className="fw-bold display-6 mb-3">{question.title}</h1>
                        <p className="fs-5 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                            {question.description}
                        </p>
                    </div>

                    {/* Answers List Section */}
                    <div className="mb-5">
                        <h4 className="fw-bold mb-4">{answers.length} Answers</h4>
                        {answers.map((ans, index) => (
                            <div key={index} className="card shadow-sm border-0 mb-3 bg-light">
                                <div className="card-body">
                                    <p className="mb-0">{ans.text}</p>
                                    <small className="text-muted d-block mt-2">Posted on: 4/5/2026</small>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PREMIUM FULL-WIDTH ANSWER BOX */}
                    <div className="mt-5 pt-4 border-top">
                        <h3 className="fw-bold mb-4">Your Answer</h3>
                        
                        <div className="card shadow-sm border" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                            {/* Toolbar */}
                            <div className="bg-light border-bottom p-2 d-flex gap-3 px-3">
                                <i className="bi bi-type-bold"></i>
                                <i className="bi bi-type-italic"></i>
                                <i className="bi bi-code-slash"></i>
                                <i className="bi bi-link-45deg"></i>
                            </div>

                            {/* Full Screen Textarea */}
                            <textarea 
                                className="form-control border-0 shadow-none"
                                placeholder="Write your technical solution here in detail..." 
                                style={{ 
                                    minHeight: '300px', 
                                    padding: '20px', 
                                    fontSize: '16px',
                                    width: '100%' // Full screen width fix
                                }}
                                value={answerText} 
                                onChange={(e) => setAnswerText(e.target.value)} 
                            />
                        </div>

                        <button 
                            className="btn btn-primary btn-lg mt-4 px-5 fw-bold"
                            style={{ backgroundColor: '#0a95ff', border: 'none', borderRadius: '4px' }}
                            onClick={handlePostAnswer}
                        >
                            Post Your Answer
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;