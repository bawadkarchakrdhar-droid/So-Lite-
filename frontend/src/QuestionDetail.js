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
        if (!userId) return alert("Bhai, login toh kar lo pehle!");
        if (ansBody.trim().length < 5) return alert("Thoda bada answer likho bhai!");

        try {
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                user: userId,
                question: id
            });

            alert("Answer posted! ✅");
            setAnswers([...answers, res.data]);
            setAnsBody('');
            setIsPreview(false);
        } catch (err) {
            console.error(err);
            alert("Error! Answer post nahi hua.");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Syncing with AI...</h3></div>;
    if (!question) return <div className="container mt-5 text-center"><h3>Question gayab ho gaya! 🫢</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            {/* Question Card */}
            <div className="p-4 shadow-sm border-0 rounded-4 bg-white mb-4 shadow">
                <h1 className="fw-bold text-primary">{question.title}</h1>
                <p className="fs-5 text-muted">{question.description}</p>
            </div>

            <hr />
            
            {/* Answers List */}
            <h4 className="mb-4 fw-bold">💬 {answers.length} Solutions</h4>
            <div className="mb-5">
                {answers.map((ans, i) => (
                    <div key={i} className="p-4 mb-3 border-0 bg-light rounded-4 shadow-sm">
                        <p className="mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {ans.answerBody}
                        </p>
                    </div>
                ))}
            </div>

            {/* --- BIG AI ANSWER BOX --- */}
            <div className="mt-5 p-4 border-0 rounded-4 shadow-lg bg-dark text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 text-info font-monospace">// AI_EDITOR_MODE</h5>
                    <button 
                        className={`btn btn-sm rounded-pill px-4 ${isPreview ? 'btn-light' : 'btn-outline-info'}`}
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {isPreview ? "EDIT CODE" : "LIVE PREVIEW"}
                    </button>
                </div>

                <form onSubmit={handleAns}>
                    {!isPreview ? (
                        <textarea 
                            className="form-control bg-dark text-white border-secondary shadow-none" 
                            rows="15" // BADA SIZE YAHAN SE HAI
                            style={{ 
                                fontSize: '1.1rem', 
                                fontFamily: "monospace", 
                                padding: '25px',
                                border: '1px solid #444',
                                borderRadius: '15px'
                            }}
                            value={ansBody} 
                            onChange={(e) => setAnsBody(e.target.value)} 
                            placeholder="Type your deep technical explanation here..."
                        ></textarea>
                    ) : (
                        <div className="p-4 mb-3 bg-dark rounded-4 border border-info border-dashed" 
                            style={{ minHeight: '375px', whiteSpace: 'pre-wrap', color: '#e0e0e0', fontSize: '1.1rem' }}>
                            {ansBody || "Khaali hai bhai, kuch likho toh..."}
                        </div>
                    )}
                    
                    <button type="submit" className="btn btn-info w-100 fw-bold py-3 mt-4 rounded-pill shadow-lg">
                        PUBLISH TO NETWORK 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;