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
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            setQuestion(res.data);
            setAnswers(res.data.answers || []);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return alert("Please login first");

            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody, // Spelling fixed
                user: userId,       // Matching backend schema
                question: id        // Matching backend schema
            });

            alert("Answer save ho gaya! ✅");
            setAnsBody('');
            window.location.reload(); // Small 'w'
        } catch (err) {
            console.error(err);
            alert("Connection error! Check if backend is live.");
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question nahi mila!</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <h1 className="fw-bold">{question.title}</h1>
            <div className="fs-5 mb-5" style={{ whiteSpace: 'pre-wrap' }}>{question.description}</div>

            <div className="mt-5">
                <h4 className="border-bottom pb-3 mb-4">{answers.length} Answers</h4>
                {answers.map((ans, i) => (
                    <div key={i} className="py-3 border-bottom">
                        {/* Safe display logic */}
                        <p>{ans.answerBody || ans.body || "Naya answer format mil gaya!"}</p>
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
                    <button type="submit" className="btn btn-primary">Post Your Answer</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;