import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);

    // Data load karne ka function
    const loadData = async () => {
        try {
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            setAnswers(res.data.answers || []); // Backend se answers populate ho kar aayenge
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    // Answer post karne ka function
    const handleAns = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: userId,
                questionId: id
            });
            
            alert("Answer save ho gaya! ✅");
            setAnsBody(''); // Box khali karo
            loadData(); // Screen refresh karo taaki naya answer dikhe
        } catch (err) {
            alert("Error: Connection check karein!"); //
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading Sawal...</h3></div>;
    if (!question) return <div className="container mt-5 text-center"><h3>Sawal nahi mila! ❌</h3></div>;

    return (
        <div className="container mt-5" style={{ paddingBottom: '50px' }}>
            {/* Question Section */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                    <h2 className="text-primary fw-bold">{question.title}</h2>
                    <p className="lead mt-3" style={{ whiteSpace: 'pre-wrap', color: '#444' }}>
                        {question.description}
                    </p>
                    <div className="mt-3">
                        {question.tags && question.tags.map((tag, i) => (
                            <span key={i} className="badge bg-light text-secondary border me-2 p-2">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-5" />

            {/* Answers List */}
            <h4 className="mb-4 text-secondary">{answers.length} Answers</h4>
            {answers.map((ans, i) => (
                <div key={i} className="card mb-3 shadow-sm border-0 border-start border-primary border-4">
                    <div className="card-body">
                        <p style={{ fontSize: '1.1rem' }}>
                            {ans.answerBody || <span className="text-danger">Data error: Field mismatch</span>}
                        </p>
                        <div className="d-flex justify-content-end">
                            <small className="text-muted">
                                Posted on: {new Date(ans.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                </div>
            ))}

            {/* --- Advance Answer Box Section --- */}
            <div className="card mt-5 shadow border-0 bg-light">
                <div className="card-body p-4">
                    <h5 className="mb-3 fw-bold text-dark">Tera Answer Likho</h5>
                    <form onSubmit={handleAns}>
                        <div className="form-floating mb-3">
                            <textarea 
                                className="form-control shadow-none" 
                                placeholder="Yahan detail mein likho..." 
                                id="ansInput" 
                                style={{ height: '180px', borderRadius: '10px', border: '2px solid #dee2e6' }}
                                value={ansBody} 
                                onChange={(e) => setAnsBody(e.target.value)}
                                required 
                            ></textarea>
                            <label htmlFor="ansInput">Write your technical solution here...</label>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary px-5 py-2 fw-bold shadow-sm" style={{ borderRadius: '8px' }}>
                                Post Answer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;