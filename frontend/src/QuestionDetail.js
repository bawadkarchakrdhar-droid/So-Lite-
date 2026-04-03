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
            // Sahi Render Backend URL
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            if (res.data &&
                res.data.answer){
                    setAnswerBody(res.data.answer);
                } else {
                    setAnswerBody([]);
                }
                setLoading(false);
            
        } catch (err) {
            console.error("Fetch Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadData();
    }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        const uId = localStorage.getItem('userId');
        if (!uId) return alert("Pehle login karo!");

        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody,
                userId: uId,
                questionId: id
            });
            setAnswerBody('');
            alert("Answer save ho gaya! ✅");
            loadData(); // Refresh list immediately
        } catch (err) {
            alert("Post failed. Check server.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>{question?.title}</h1>
            <p style={{ background: '#f4f4f4', padding: '10px' }}>{question?.body}</p>
            <hr />
            <h3>{answers.length} Answers</h3>
            {answers.map((ans) => (
                <div key={ans._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
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
                <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
                    Post Answer
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;