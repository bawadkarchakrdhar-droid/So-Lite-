import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            // Calling your Render backend
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            if (res.data) {
                setQuestion(res.data);
                setAnswers(res.data.answers || []);
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err); // Error is caught here
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) return alert("Please login first");

        try {
            // Using correct field names for your backend schema
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody, 
                user: userId,       
                question: id        
            });

            alert("Answer save ho gaya! ✅");
            setAnswers([...answers, res.data]); // Instant update without reload
            setAnsBody('');
        } catch (err) {
            console.error(err);
            alert("Connection error! Answer save nahi hua.");
        }
    };

    if (loading) return <div className="container mt-5 text-center"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5 text-center"><h3>Question nahi mila! (Check URL ID) 🫢</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <h1 className="fw-bold">{question.title}</h1>
            <div className="fs-5 mb-5" style={{ whiteSpace: 'pre-wrap' }}>{question.description}</div>

            <div className="mt-5">
                <h4 className="border-bottom pb-3 mb-4">{answers.length} Answers</h4>
                {answers.map((ans, i) => (
                    <div key={i} className="py-3 border-bottom">
                        <p>{ans.answerBody || ans.body || "Naya answer!"}</p>
                        <small className="text-muted">
                            Posted on: {ans.createdAt ? new Date(ans.createdAt).toLocaleDateString() : "Recently"}
                        </small>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <h3 className="fw-bold mb-4">Your Answer</h3>
                <form onSubmit={handleAns}>
                    <textarea 
                        className="form-control mb-3" 
                        rows="6" 
                        value={ansBody} 
                        onChange={(e) => setAnsBody(e.target.value)}
                        placeholder="Write your answer here..."
                    ></textarea>
                    <button type="submit" className="btn btn-primary px-4">Post Answer</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;