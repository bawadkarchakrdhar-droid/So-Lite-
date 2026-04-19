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
            // Sahi Endpoint: ensures correct question fetch
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            if (res.data) {
                setQuestion(res.data);
                // Important: agar answers populated hain toh display honge
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
        if (!userId) return alert("Bhai login toh kar le!");

        try {
            // Matching backend keys exactly
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody, 
                user: userId,       
                question: id        
            });

            alert("Answer save ho gaya! ✅");
            setAnswers([...answers, res.data]); 
            setAnsBody('');
        } catch (err) {
            console.error(err);
            alert("Connection error! Check Render logs.");
        }
    };

    if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
    if (!question) return <h3 className="text-center mt-5">Question nahi mila! (ID mismatch) 🫢</h3>;

    return (
        <div className="container mt-5">
            <h1 className="fw-bold">{question.title}</h1>
            <p className="fs-5">{question.description}</p>
            <hr />
            <h4>{answers.length} Answers</h4>
            {answers.map((ans, i) => (
                <div key={i} className="border-bottom py-2">
                    <p>{ans.answerBody || ans.body || "Naya Answer"}</p>
                </div>
            ))}
            <form onSubmit={handleAns} className="mt-4">
                <textarea className="form-control" value={ansBody} onChange={(e)=>setAnsBody(e.target.value)} rows="4" placeholder="Write answer..."></textarea>
                <button className="btn btn-primary mt-2">Post Answer</button>
            </form>
        </div>
    );
};
export default QuestionDetail;