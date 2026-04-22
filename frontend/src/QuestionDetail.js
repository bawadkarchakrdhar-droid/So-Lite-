import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPreview, setIsPreview] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            if (res.data) {
                setQuestion(res.data);
                setAnswers(res.data.answers || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (id) loadData(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) return alert("Bhai, pehle login karo!");
        if (ansBody.trim().length < 5) return alert("Bhai, thoda bada answer likho!");

        try {
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                user: userId,
                question: id
            });

            alert("Answer successfully posted! ✅");
            setAnswers([...answers, res.data]);
            setAnsBody('');
            setIsPreview(false);
        } catch (err) {
            alert("Error: Answer post nahi hua!");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading AI Interface...</h3></div>;
    if (!question) return <div className="container mt-5 text-center"><h3>Question nahi mila! (ID mismatch) 🫢</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            {/* Question Display */}
            <div className="p-4 shadow-sm border rounded bg-white mb-4">
                <h1 className="fw-bold text-primary">{question.title}</h1>
                <p className="fs-5 text-secondary">{question.description}</p>
            </div>

            <hr />
            
            {/* Solutions List */}
            <h4 className="mb-4 fw-bold text-dark">✨ {answers.length} Solutions Found</h4>
            <div className="answers-display mb-5">
                {answers.length > 0 ? (
                    answers.map((ans, i) => (
                        <div key={i} className="p-4 mb-3 border-start border-4 border-info bg-light rounded shadow-sm">
                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap', color: '#2c3e50', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                {ans.answerBody || "No text content found"}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-warning">Abhi tak koi answer nahi hai. Neeche AI box mein likhein!</div>
                )}
            </div>

            {/* --- UPGRADED BIG AI ANSWER BOX --- */}
            <div className="mt-5 p-4 border-0 rounded-4 shadow-lg bg-dark text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 text-info d-flex align-items-center gap-2">
                        <span className="badge bg-info text-dark">AI</span> 
                        <span>Smart Editor Mode</span>
                    </h5>
                    <button 
                        className={`btn btn-sm rounded-pill px-4 ${isPreview ? 'btn-light' : 'btn-outline-info'}`}
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {isPreview ? "✍️ BACK TO EDIT" : "👁️ LIVE PREVIEW"}
                    </button>
                </div>

                <form onSubmit={handleAns}>
                    {!isPreview ? (
                        <div className="position-relative">
                            <textarea 
                                className="form-control bg-dark text-white border-secondary shadow-none" 
                                rows="12"  // Bada size
                                style={{ 
                                    fontSize: '1.1rem', 
                                    fontFamily: "monospace", 
                                    border: '1px solid #444',
                                    padding: '25px',
                                    lineHeight: '1.6',
                                    borderRadius: '15px'
                                }}
                                value={ansBody} 
                                onChange={(e) => setAnsBody(e.target.value)} 
                                placeholder="Write your detailed technical solution here... (Box will auto-expand if needed)"
                            ></textarea>
                        </div>
                    ) : (
                        <div className="p-4 mb-3 bg-dark rounded-4 border border-info" 
                            style={{ 
                                minHeight: '300px', 
                                whiteSpace: 'pre-wrap', 
                                color: '#e0e0e0',
                                fontSize: '1.1rem',
                                borderStyle: 'dashed'
                            }}>
                            {ansBody || "Bhai kuch type karo tabhi preview dikhega!"}
                        </div>
                    )}
                    
                    <div className="mt-4">
                        <button type="submit" className="btn btn-info w-100 fw-bold py-3 shadow-lg rounded-pill">
                            🚀 PUBLISH TO COMMUNITY
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;