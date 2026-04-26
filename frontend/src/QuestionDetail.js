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
                // Backend se populated answers array set ho raha hai
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
        if (!userId) return alert("Pehle login karo!");
        if (ansBody.trim().length < 5) return alert("Thoda bada answer likho!");

        try {
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                user: userId,
                question: id
            });

            alert("Answer posted! ✅");
            await loadData();
            setAnsBody('');
            setIsPreview(false);
        } catch (err) {
            alert("Error: Answer post nahi hua!");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>AI Interface loading...</h3></div>;
    if (!question) return <div className="container mt-5 text-center"><h3>Question not found!</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="p-4 shadow border-0 rounded-4 bg-white mb-4">
                <h1 className="fw-bold text-primary">{question.title}</h1>
                <p className="fs-5 text-muted">{question.description}</p>
            </div>

            <hr />
            
            <h4 className="mb-4 fw-bold">✨ {answers.length} Solutions</h4>
            <div className="answers-display mb-5">
                {answers.map((ans, i) => (
                    <div key={i} className="p-4 mb-3 border-0 bg-light rounded-4 shadow-sm">
                        <p className="mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            {ans && typeof ans === 'object' ? ans.answerBody : ans}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-5 p-4 border-0 rounded-4 shadow-lg bg-dark text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 text-info font-monospace">// AI_EDITOR_MODE</h5>
                    <button 
                        className={`btn btn-sm rounded-pill px-4 ${isPreview ? 'btn-light' : 'btn-outline-info'}`}
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {isPreview ? "EDIT" : "PREVIEW"}
                    </button>
                </div>

                <form onSubmit={handleAns}>
                    {!isPreview ? (
                        <textarea 
                            className="form-control bg-dark text-white border-secondary shadow-none" 
                            rows="12" 
                            style={{ fontSize: '1.1rem', fontFamily: "monospace", padding: '20px', borderRadius: '15px' }}
                            value={ansBody} 
                            onChange={(e) => setAnsBody(e.target.value)} 
                            placeholder="Type solution here..."
                        ></textarea>
                    ) : (
                        <div className="p-4 mb-3 bg-dark rounded-4 border border-info border-dashed" style={{ minHeight: '300px', whiteSpace: 'pre-wrap' }}>
                            {ansBody || "Preview empty..."}
                        </div>
                    )}
                    <button type="submit" className="btn btn-info w-100 fw-bold py-3 mt-4 rounded-pill shadow">
                        PUBLISH TO NETWORK 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;