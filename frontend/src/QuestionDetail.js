import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');

    const load = async () => {
        const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
        setQuestion(res.data);
        setAnswers(res.data.answers || []);
    };

    useEffect(() => { load(); }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        await axios.post('https://so-lite-backend.onrender.com/api/answer', {
            answerBody: ansBody, userId: localStorage.getItem('userId'), questionId: id
        });
        setAnsBody('');
        alert("Answer save ho gaya! ✅");
        load(); // Refresh list
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{question?.title}</h1>
            <p>{question?.body}</p>
            <hr />
            <h3>{answers.length} Answers</h3>
            {answers.map(a => <div key={a._id} style={{borderBottom: '1px solid #eee', padding: '10px'}}><p>{a.body}</p></div>)}
            <form onSubmit={handleAns}>
                <textarea value={ansBody} onChange={(e) => setAnsBody(e.target.value)} required style={{width: '100%', height: '80px'}} />
                <button type="submit">Post Answer</button>
            </form>
        </div>
    );
};
export default QuestionDetail;