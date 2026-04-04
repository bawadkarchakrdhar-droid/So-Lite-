import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            // Sahi URL: 'questions' (plural) backend route se match karne ke liye
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            
            if (res.data) {
                setQuestion(res.data);
                // Agar answers array exist karta hai toh set karo, nahi toh khali array
                setAnswers(res.data.answers || []); 
            }
            setLoading(false);
        } catch (err) {
            console.error("Data load nahi hua. Check if ID exists or Backend is down.", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        try {
            // Answer post karne ka URL
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: localStorage.getItem('userId'),
                questionId: id
            });
            setAnsBody('');
            alert("Answer save ho gaya! ✅");
            window.location.reload(); // Naye answer ko dikhane ke liye refresh
        } catch (err) {
            alert("Error: Answer save nahi hua! Check Console.");
        }
    };

    if (loading) return <div style={{padding: '20px'}}><h3>Loading question details... Please wait.</h3></div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {question ? (
                <>
                    <h1>{question.title}</h1>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{question.description || question.body}</p>
                    <hr />
                    
                    <h3>{answers.length} Answers</h3>
                    {answers.length > 0 ? (
                        answers.map((a) => (
                            <div key={a._id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                                <p>{a.answerBody}</p>
                            </div>
                        ))
                    ) : (
                        <p>No answers yet. Be the first to answer!</p>
                    )}

                    <form onSubmit={handleAns} style={{ marginTop: '30px', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
                        <h4>Your Answer</h4>
                        <textarea
                            value={ansBody}
                            onChange={(e) => setAnsBody(e.target.value)}
                            placeholder="Write your detailed answer here..."
                            rows="6"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                            required
                        />
                        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Post Answer</button>
                    </form>
                </>
            ) : (
                <div>
                    <h3>Question nahi mila! ❌</h3>
                    <p>Ya toh ID galat hai ya server se error (500) aa raha hai.</p>
                </div>
            )}
        </div>
    );
};

export default QuestionDetail;