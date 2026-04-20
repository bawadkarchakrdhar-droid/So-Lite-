import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPreview, setIsPreview] = useState(false); // AI Preview Toggle

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
    if (!question) return <div className="container mt-5"><h3>Question nahi mila!</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="p-4 shadow-sm border rounded bg-white mb-4">
                <h1 className="fw-bold text-primary">{question.title}</h1>
                <p className="fs-5 text-secondary">{question.description}</p>
            </div>

            <hr />
            <h4 className="mb-4 fw-bold">{answers.length} Solutions</h4>
            {answers.map((ans, i) => (
                <div key={i} className="p-3 mb-3 border-start border-4 border-primary bg-light rounded shadow-sm">
                    <p style={{ whiteSpace: 'pre-wrap' }}>{ans.answerBody}</p>
                </div>
            ))}

            {/* --- ADVANCE AI ANSWER BOX --- */}
            <div className="mt-5 p-4 border rounded shadow-lg bg-dark text-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">✨ AI Assistant Mode</h5>
                    <button 
                        className={`btn btn-sm ${isPreview ? 'btn-info' : 'btn-outline-info'}`}
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
                            style={{ fontSize: '1rem', fontFamily: 'monospace' }}
                            value={ansBody} 
                            onChange={(e) => setAnsBody(e.target.value)} 
                            placeholder="Type your technical solution here..."
                        ></textarea>
                    ) : (
                        <div className="p-3 mb-3 bg-secondary rounded" style={{ minHeight: '150px', whiteSpace: 'pre-wrap' }}>
                            {ansBody || "Nothing to preview yet..."}
                        </div>
                    )}
                    <button type="submit" className="btn btn-info w-100 fw-bold py-2 shadow">
                        🚀 POST ANSWER
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;