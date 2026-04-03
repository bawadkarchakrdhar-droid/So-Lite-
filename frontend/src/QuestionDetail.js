import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [answerBody, setAnswerBody] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/questions/${id}`);
            setQuestion(res.data);
            // Safety Check: Hamesha array hi set hoga
            setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        const uId = localStorage.getItem('userId');
        if (!uId) return alert("Bhai, Login karo!");

        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody,
                userId: uId,
                questionId: id
            });
            setAnswerBody('');
            alert("Answer post ho gaya! ✅");
            loadData(); // Turant naya answer dikhane ke liye
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Server error"));
        }
    };

    if (loading) return <h2 style={{textAlign:'center'}}>Loading...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
            <h1>{question?.title}</h1>
            <p style={{fontSize:'18px'}}>{question?.body}</p>
            <hr />
            <h3>{answers.length} Answers</h3>
            {answers.map((a) => (
                <div key={a._id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius:'8px' }}>
                    <p>{a.body}</p>
                    <div style={{textAlign:'right'}}>
                        <small style={{color:'#0074cc'}}>— {a.user?.username || "Technical User"}</small>
                    </div>
                </div>
            ))}
            <form onSubmit={handlePost} style={{ marginTop: '30px', background:'#f4f4f4', padding:'20px', borderRadius:'10px' }}>
                <h4>Aapka Solution:</h4>
                <textarea 
                    value={answerBody} 
                    onChange={(e) => setAnswerBody(e.target.value)}
                    style={{ width: '100%', height: '120px', padding:'10px', borderRadius:'5px' }}
                    placeholder="LIFO logic samjhao..."
                    required
                />
                <button type="submit" style={{ marginTop:'10px', padding:'10px 20px', background: '#0074cc', color: 'white', border:'none', borderRadius:'5px', cursor:'pointer' }}>
                    Post Answer
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;