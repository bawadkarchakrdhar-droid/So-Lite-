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
            // BACKEND URL CHECK: Ensure /api/question/${id} exists
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            if (res.data) {
                setQuestion(res.data);
                setAnswers(res.data.answers || []);
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) return alert("Login karo pehle!");

        try {
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: userId,
                questionId: id
            });

            alert("Answer save ho gaya! ✅");
            setAnswers([...answers, res.data]);
            setAnsBody('');
        } catch (err) {
            alert("Connection error!");
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
    // UI fix for your "Question nahi mila" error
    if (!question) return <div className="container mt-5"><h3>Question ID galat hai bhai! 🫢</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <h1 className="fw-bold">{question.title}</h1>
            <p>{question.description}</p>
            <hr />
            <h4 className="mb-4">{answers.length} Answers</h4>
            {answers.map((ans, i) => (
                <div key={i} className="py-3 border-bottom">
                    <p>{ans.answerBody || ans.body || "Naya Answer"}</p>
                </div>
            ))}
            <div className="mt-5">
                <form onSubmit={handleAns}>
                    <textarea 
                        className="form-control mb-3" 
                        rows="5" 
                        value={ansBody} 
                        onChange={(e) => setAnsBody(e.target.value)}
                        placeholder="Write your answer..."
                    ></textarea>
                    <button type="submit" className="btn btn-primary">Post Answer</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;