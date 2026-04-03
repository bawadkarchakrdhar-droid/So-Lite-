import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerBody, setAnswerBody] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            // Backend URL check karo
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        const uId = localStorage.getItem('userId');
        if (!uId) return alert("Login karo!");

        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody,
                userId: uId,
                questionId: id
            });
            setAnswerBody('');
            alert("Answer post ho gaya! ✅");
            loadData(); // Success ke baad turant refresh
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Server error"));
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>{question?.title}</h1>
            <p>{question?.body}</p>
            <hr />
            <h3>{answers.length} Answers</h3>
            {answers.map((a) => (
                <div key={a._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                    <p>{a.body}</p>
                    <small>By: {a.user?.username || "Developer"}</small>
                </div>
            ))}
            <form onSubmit={handlePost}>
                <textarea 
                    value={answerBody} 
                    onChange={(e) => setAnswerBody(e.target.value)}
                    style={{ width: '100%', height: '100px' }}
                    placeholder="Apna answer likho..."
                    required
                />
                <button type="submit">Post Answer</button>
            </form>
        </div>
    );
};

export default QuestionDetail;