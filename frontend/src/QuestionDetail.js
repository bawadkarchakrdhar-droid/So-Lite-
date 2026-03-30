import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerBody, setAnswerBody] = useState('');

    const loadAllDetails = async () => {
        try {
            // Sawal fetch karein
            const qRes = await axios.get(`http://localhost:5000/api/questions/${id}`);
            setQuestion(qRes.data);

            // Answers fetch karein
            const aRes = await axios.get(`http://localhost:5000/api/answer/${id}`);
            setAnswers(aRes.data);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => {
        loadAllDetails();
    }, [id]);

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) return navigate('/login');

        try {
            // Yahan error tha, ab fix hai
            await axios.post('http://localhost:5000/api/answer', {
                body: answerBody,
                userId,
                questionId: id
            });
            setAnswerBody('');
            loadAllDetails(); // Naya answer turant dikhane ke liye
            alert("Answer post ho gaya! ✅");
        } catch (err) {
            alert("Server Error: Backend ya Database check karo!");
        }
    };

    if (!question) return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
            <h2>Loading...</h2>
            <p>Bhai, thoda sabr karo, data aa raha hai!</p>
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial' }}>
            <button 
                onClick={() => navigate('/dashboard')} 
                style={{ marginBottom: '25px', padding: '8px 18px', border: '1px solid #dfe6e9', borderRadius: '5px', backgroundColor: '#fff', cursor: 'pointer' }}
            >
                ← Back to Dashboard
            </button>
            
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #f1f2f6' }}>
                <h1 style={{ color: '#2d3436', fontSize: '28px', marginBottom: '15px', fontWeight: '700' }}>{question.title}</h1>
                <div style={{ fontSize: '16px', color: '#3b4045', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {question.description}
                </div>
                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'right' }}>
                    <small style={{ color: '#6a737c' }}>Asked by <b style={{ color: '#0074cc' }}>{question.user?.username}</b></small>
                </div>
            </div>

            <h3 style={{ marginTop: '40px', color: '#2d3436', borderBottom: '2px solid #6c5ce7', display: 'inline-block', paddingBottom: '5px' }}>
                {answers.length} Answers
            </h3>
            
            <div style={{ marginTop: '20px' }}>
                {answers.map((ans) => (
                    <div key={ans._id} style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '15px', border: '1px solid #f1f2f6' }}>
                        <p style={{ fontSize: '15px', color: '#232629' }}>{ans.body}</p>
                        <div style={{ textAlign: 'right', marginTop: '10px' }}>
                            <small style={{ color: '#0074cc' }}>— {ans.user?.username}</small>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAnswerSubmit} style={{ marginTop: '40px', backgroundColor: '#f8f9fb', padding: '25px', borderRadius: '12px', border: '1px solid #e3e6e8' }}>
                <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Your Answer</h4>
                <textarea 
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #dfe6e9', fontSize: '15px', outlineColor: '#6c5ce7' }} 
                    rows="6" 
                    value={answerBody} 
                    onChange={(e) => setAnswerBody(e.target.value)}
                    placeholder="Write your technical solution here..."
                    required
                />
                <button type="submit" style={{ marginTop: '20px', padding: '12px 35px', background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(108,92,231,0.2)' }}>
                    Post Your Answer
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;