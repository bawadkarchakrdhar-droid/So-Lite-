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
            // Backend se question aur uske populated answers fetch ho rahe hain
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            // Ensure kar rahe hain ki agar answers null ho toh khali array set ho
            setAnswers(res.data.answers || []); 
            setLoading(false);
        } catch (err) {
            console.error("Data load nahi hua", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleAns = async (e) => {
        e.preventDefault();
        if (!ansBody.trim()) return alert("Answer khali nahi ho sakta!");

        try {
            const userId = localStorage.getItem('userId'); // Login user ki ID
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: userId,
                questionId: id
            });
            
            alert("Answer save ho gaya! ✅");
            setAnsBody('');
            load(); // List ko refresh karne ke liye
        } catch (err) {
            alert("Error: Answer post nahi hua!");
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading question...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question nahi mila! ❌</h3></div>;

    return (
        <div className="container mt-5">
            <h2>{question.title}</h2>
            <p className="text-muted">{question.description}</p>
            <hr />
            
            <h4>{answers.length} Answers</h4>
            {answers.length > 0 ? (
                answers.map((ans, index) => (
                    <div key={index} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <p>{ans.answerBody}</p>
                            <small className="text-secondary">Posted on: {new Date(ans.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                ))
            ) : (
                <p>No answers yet. Be the first to answer!</p>
            )}

            <hr />
            <form onSubmit={handleAns} className="mt-4">
                <div className="mb-3">
                    <label className="form-label font-weight-bold">Your Answer</label>
                    <textarea 
                        className="form-control" 
                        rows="5" 
                        value={ansBody}
                        onChange={(e) => setAnsBody(e.target.value)}
                        placeholder="Write your technical solution here..."
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Post Answer</button>
            </form>
        </div>
    );
};

export default QuestionDetail;