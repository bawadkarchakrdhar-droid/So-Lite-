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
            // Array check taaki map crash na ho
            setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handlePost = async (e) => {
        e.preventDefault();
        const uId = localStorage.getItem('userId');
        if (!uId) return alert("Login karo pehle!");

        try {
            // Backend endpoint check
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: answerBody,
                userId: uId,
                questionId: id
            });
            
            setAnswerBody('');
            alert("Answer save ho gaya! ✅");
            loadData(); // List refresh karne ke liye
        } catch (err) {
            alert("Lafda ho gaya: " + (err.response?.data?.message || "Server Busy"));
        }
    };

    if (loading) return <h2 style={{textAlign:'center', marginTop:'50px'}}>Loading Question...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{color: '#2c3e50'}}>{question?.title}</h1>
            <p style={{fontSize: '18px', background: '#f9f9f9', padding: '15px'}}>{question?.body}</p>
            <hr />
            
            <h3>{answers.length} Answers</h3>
            {answers.map((ans) => (
                <div key={ans._id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
                    <p>{ans.body}</p>
                    <small style={{color: 'blue'}}>— {ans.user?.username || "Developer"}</small>
                </div>
            ))}

            <form onSubmit={handlePost} style={{marginTop: '30px'}}>
                <h4>Aapka Solution:</h4>
                <textarea 
                    value={answerBody} 
                    onChange={(e) => setAnswerBody(e.target.value)} 
                    style={{width: '100%', height: '120px', padding: '10px'}}
                    placeholder="Yahan apna code ya solution likho..."
                    required 
                />
                <button type="submit" style={{marginTop: '10px', padding: '10px 25px', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer'}}>
                    Post Answer
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;