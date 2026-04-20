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
            // Sahi Singular Path use kiya hai
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            if (res.data) {
                setQuestion(res.data);
                setAnswers(res.data.answers || []);
            }
        } catch (err) {
            console.error("Fetch error details:", err.response); //check if 404 or 500git gi 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if(id) loadData(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) return alert("Pehle login kar lo!");

        try {
            // Field names matching your schema
            const res = await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                user: userId,
                question: id
            });

            alert("Answer save ho gaya! ✅");
            setAnswers([...answers, res.data]);
            setAnsBody('');
        } catch (err) {
            alert("Error! Answer post nahi hua.");
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question gayab nahi hua, bas server se nahi mila! Check Render Logs. 🫢</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <h1 className="fw-bold">{question.title}</h1>
            <p className="fs-5">{question.description}</p>
            <hr />
            <h4 className="mb-4">{answers.length} Answers</h4>
            {answers.map((ans, i) => (
                <div key={i} className="py-3 border-bottom card mb-2 p-3">
                    <p className="mb-0">{ans.answerBody || ans.body || "Naya Answer"}</p>
                </div>
            ))}
            <form onSubmit={handleAns} className="mt-5">
                <h3>Post Your Answer</h3>
                <textarea className="form-control mb-3" rows="5" value={ansBody} 
                    onChange={(e) => setAnsBody(e.target.value)} placeholder="Write technical answer here..."></textarea>
                <button className="btn btn-primary px-5">Post Answer</button>
            </form>
        </div>
    );
};
export default QuestionDetail;