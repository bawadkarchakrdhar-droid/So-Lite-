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

    useEffect(() => { loadData(); }, [id]);

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
            loadData(); 
        } catch (err) {
            alert("Connection error!");
        }
    };

    if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;
    if (!question) return <div className="container mt-5"><h3>Question nahi mila! ❌</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="pb-3 mb-4 border-bottom">
                <h1 className="fw-bold">{question.title}</h1>
            </div>
            <div className="fs-5 mb-5" style={{ whiteSpace: 'pre-wrap' }}>{question.description}</div>

            <div className="mt-5">
                <h4 className="border-bottom pb-3 mb-4">{answers.length} Answers</h4>
                console.log(Answers from backend:",answers);
                {answers.map((ans, i) => (
                    <div key={i} className="py-3 border-bottom">
                        <p>{ans.answerBody}</p>
                        <small className="text-muted">Posted on: {new Date(ans.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <h3 className="fw-bold mb-4">Your Answer</h3>
                <form onSubmit={handleAns}>
                    <div className="card shadow-sm border">
                        <div className="bg-light border-bottom p-2 px-3 text-muted small"><b>B</b> <i>I</i> 🔗 &lt;/&gt;</div>
                        <textarea 
                            className="form-control border-0 shadow-none" 
                            value={ansBody} onChange={(e) => setAnsBody(e.target.value)}
                            placeholder="Write your technical solution here..." 
                            style={{ minHeight: '280px', padding: '15px', width: '100%' }} // Full width fix
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg px-4 mt-4">Post Your Answer</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;