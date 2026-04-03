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
            // Sahi URL check karo
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            // Answers fetch karne ka sahi tarika
            setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody,
                userId: localStorage.getItem('userId'),
                questionId: id
            });
            setAnswerBody('');
            alert("Answer save ho gaya! ✅");
            loadData(); 
        } catch (err) {
            alert("Error saving answer");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{question?.title}</h1>
            <p>{question?.body}</p>
            <hr />
            <h3>{answers.length} Answers</h3>
            {answers.map((a) => (
                <div key={a._id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
                    <p>{a.body}</p>
                </div>
            ))}
            <form onSubmit={handlePost}>
                <textarea 
                    value={answerBody} 
                    onChange={(e) => setAnswerBody(e.target.value)} 
                    placeholder="Apna answer yahan likhein..."
                    required 
                />
                <button type="submit">Post Answer</button>
            </form>
        </div>
    );
};

export default QuestionDetail;