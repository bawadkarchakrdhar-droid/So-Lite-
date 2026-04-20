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
            // Sahi URL path: /api/question/
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

    useEffect(() => { if(id) loadData(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId'); //
        if (!userId) return alert("Pehle login karo!");

        try {
            // Backend schema keys: answerBody, user, question
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                user: userId,
                question: id
            });

            alert("Answer save ho gaya! ✅"); //
            setAnswers([...answers, res.data]);
            setAnsBody('');
        } catch (err) {
            alert("Connection error!"); //
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question ID mismatch! Check backend routes.</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <h1 className="fw-bold">{question.title}</h1>
            <p className="fs-5">{question.description}</p>
            <hr />
            <h4>{answers.length} Answers</h4>
            {answers.map((ans, i) => (
                <div key={i} className="py-3 border-bottom">
                    <p>{ans.answerBody || "Naya Answer Format"}</p>
                </div>
            ))}
            <form onSubmit={handleAns} className="mt-4">
                <textarea className="form-control mb-3" rows="5" value={ansBody} 
                    onChange={(e) => setAnsBody(e.target.value)} placeholder="Write answer..."></textarea>
                <button className="btn btn-primary">Post Answer</button>
            </form>
        </div>
    );
};
export default QuestionDetail;