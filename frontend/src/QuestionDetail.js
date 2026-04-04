import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            setAnswers(res.data.answers || []); 
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: userId,
                questionId: id
            });
            alert("Answer save ho gaya! ✅");
            setAnsBody('');
            loadData(); // Naya answer turant dikhane ke liye
        } catch (err) {
            alert("Connection error! Backend check karein.");
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question nahi mila! ❌</h3></div>;

    return (
        <div className="container mt-5">
            <h2 className="text-primary">{question.title}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{question.description}</p>
            <hr />
            <h4>{answers.length} Answers</h4>
            {answers.map((ans, i) => (
                <div key={i} className="card mb-2 shadow-sm">
                    <div className="card-body">{ans.answerBody}</div>
                </div>
            ))}
            <form onSubmit={handleAns} className="mt-4">
                <textarea 
                    className="form-control" 
                    value={ansBody} 
                    onChange={(e) => setAnsBody(e.target.value)}
                    placeholder="Write answer here..." 
                    required 
                />
                <button type="submit" className="btn btn-success mt-2">Post Answer</button>
            </form>
        </div>
    );
};

export default QuestionDetail;