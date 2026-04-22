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
            // Sahi route hit kar rahe hain
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            if (res.data) {
                setQuestion(res.data);
                // Backend se answers ko array ki tarah set kar rahe hain
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
            // Naya answer list mein add kar rahe hain taaki turant dikhe
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
            {/* Question Section */}
            <div className="p-4 shadow-sm border rounded bg-white mb-4">
                <h1 className="fw-bold text-primary">{question.title}</h1>
                <p className="fs-5 text-secondary">{question.description}</p>
            </div>

            <hr />
            
            {/* Solutions List Section */}
            <h4 className="mb-4 fw-bold text-dark">✨ {answers.length} Solutions</h4>
            <div className="answers-display">
                {answers.length > 0 ? (
                    answers.map((ans, i) => (
                        <div key={i} className="p-3 mb-3 border-start border-4 border-info bg-light rounded shadow-sm">
                            {/* Atlas mein answerBody save ho raha hai */}
                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap', color: '#2c3e50', fontSize: '1.05rem' }}>
                                {ans.answerBody || "No text content found"}
                            </p>
                            <div className="mt-2 text-end">
                                <small className="text-muted italic">Verified Solution</small>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-warning">Abhi tak koi answer nahi hai. Neeche box mein answer likhein!</div>
                )}
            </div>

            {/* Advance AI Answer Box */}
            <div className="mt-5 p-4 border rounded shadow-lg bg-dark text-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-info">🤖 AI Assistant Mode</h5>
                    <button 
                        className={`btn btn-sm ${isPreview ? 'btn-light' : 'btn-outline-light'}`}
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {isPreview ? "✍️ Edit Mode" : "👁️ Preview Mode"}
                    </button>
                </div>

                <form onSubmit={handleAns}>
                    {!isPreview ? (
                        <textarea 
                            className="form-control bg-dark text-white border-secondary mb-3" 
                            rows="6" 
                            style={{ fontSize: '1rem', fontFamily: 'monospace', border: '1px solid #444' }}
                            value={ansBody} 
                            onChange={(e) => setAnsBody(e.target.value)} 
                            placeholder="Type your technical solution here using AI style..."
                        ></textarea>
                    ) : (
                        <div className="p-3 mb-3 bg-secondary rounded" style={{ minHeight: '150px', whiteSpace: 'pre-wrap', border: '1px dashed #fff' }}>
                            {ansBody || "Kuch likho bhai preview dekhne ke liye..."}
                        </div>
                    )}
                    <button type="submit" className="btn btn-info w-100 fw-bold py-2 shadow-sm text-uppercase">
                        🚀 POST ANSWER
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;