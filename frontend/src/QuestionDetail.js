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

    const loadAllDetails = async () => {
        try {
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            setQuestion(res.data);
            setAnswers(Array.isArray(res.data?.answers) ? res.data.answers : []);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllDetails();
    }, [id]);

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert("Bhai, pehle Login karo!");
            return navigate('/login');
        }

        try {
            // Dono fields bhej rahe hain taaki 500 Internal Server Error fix ho jaye
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: answerBody, 
                body: answerBody,       
                userId: userId,
                questionId: id
            });
            
            setAnswerBody('');
            loadAllDetails(); 
            alert("Answer post ho gaya! ✅");
        } catch (err) {
            console.error("Full Post Error:", err.response?.data || err.message);
            alert(`Lafda ho gaya: ${err.response?.data?.message || "Server Error (Backend Check Karo)"}`);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
                <h2>Loading...</h2>
                <p>Bhai, backend jaag raha hai, thoda sabr rakho!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
            <div style={{ borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
                <h1 style={{ color: '#2c3e50' }}>{question?.title}</h1>
                <p style={{ fontSize: '18px', whiteSpace: 'pre-wrap' }}>{question?.body}</p>
            </div>

            <h3 style={{ marginTop: '30px', color: '#6c5ce7' }}>{answers.length} Answers</h3>
            
            <div style={{ marginTop: '20px' }}>
                {answers.length > 0 ? (
                    answers.map((ans) => (
                        <div key={ans._id} style={{ padding: '15 fpx', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' }}>
                            {/* Dono field check kar rahe hain display ke liye */}
                            <p style={{ margin: '0' }}>{ans.answerBody || ans.body}</p>
                            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                                <small style={{ color: '#0074cc' }}>— {ans.user?.username || "Technical User"}</small>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#888' }}>Abhi tak koi answer nahi hai. Pehla answer aap likhein!</p>
                )}
            </div>

            <div style={{ marginTop: '50px', padding: '20px', background: '#f9f9f9', borderRadius: '10px' }}>
                <h4>Aapka Solution:</h4>
                <form onSubmit={handleAnswerSubmit}>
                    <textarea 
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
                        rows="5"
                        value={answerBody}
                        onChange={(e) => setAnswerBody(e.target.value)}
                        placeholder="Yahan apna solution likhein..."
                        required
                    />
                    <button type="submit" style={{ marginTop: '15px', padding: '10px 25px', backgroundColor: '#6c5ce7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Post Answer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;