import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerBody, setAnswerBody] = useState('');

    const loadData = async () => {
        try {
            // Check URL: https://so-lite-backend.onrender.com
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            // Array check taaki crash na ho
            setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => {
        if (id) loadData();
    }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        const uId = localStorage.getItem('userId');
        if (!uId) return alert("Login please!");

        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody,
                userId: uId,
                questionId: id
            });
            setAnswerBody('');
            alert("Answer post ho gaya! ✅");
            loadData(); // Refresh list
        } catch (err) {
            alert("Error: Server connect nahi ho raha");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2>{question?.title}</h2>
            <p style={{ background: '#f4f4f4', padding: '10px' }}>{question?.body}</p>
            <hr />
            <h3>{answers.length} Answers</h3>
            {answers.map((ans) => (
                <div key={ans._id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                    <p>{ans.body}</p>
                </div>
            ))}
            <form onSubmit={handlePost} style={{ marginTop: '20px' }}>
                <textarea 
                    value={answerBody} 
                    onChange={(e) => setAnswerBody(e.target.value)} 
                    style={{ width: '100%', height: '100px' }}
                    placeholder="Apna answer likho..."
                    required 
                />
                <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
                    Post Answer
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;