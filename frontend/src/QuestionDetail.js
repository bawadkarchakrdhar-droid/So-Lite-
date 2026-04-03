import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]); // Default empty array rakha hai
    const [answerBody, setAnswerBody] = useState('');
    const [loading, setLoading] = useState(true);

    // 1. Backend se data mangwane ka function
    const loadAllDetails = async () => {
        try {
            // Live backend URL use kar rahe hain
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            
            setQuestion(res.data);
            
            // Yahan error fix hai: Agar answers nahi hain, toh khali list ([]) set hogi
            // Taki .map() crash na ho
            if (res.data && res.data.answers) {
                setAnswers(res.data.answers);
            } else {
                setAnswers([]);
            }
            
            setLoading(false);
        } catch (err) {
            console.error("Data laane mein lafda:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllDetails();
    }, [id]);

    // 2. Naya Answer submit karne ka logic
    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert("Bhai, pehle Login toh kar lo!");
            return navigate('/login');
        }

        try {
            // "body:" keyword hataya kyunki axios direct object leta hai
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody,
                userId,
                questionId: id
            });
            
            setAnswerBody('');
            loadAllDetails(); // Taki naya answer turant dikhe
            alert("Answer post ho gaya! ✅");
        } catch (err) {
            alert("Server Error: Answer post nahi ho paya.");
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Loading...</h2>
                <p>Bhai, backend jaag raha hai, thoda sabr rakho!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            {/* Question Part */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h1 style={{ color: '#2c3e50' }}>{question?.title}</h1>
                <hr />
                <p style={{ fontSize: '17px', color: '#34495e', whiteSpace: 'pre-wrap' }}>{question?.body}</p>
            </div>

            {/* Answers Part */}
            <h3 style={{ marginTop: '40px', borderBottom: '2px solid #6c5ce7', display: 'inline-block' }}>
                {answers.length} Answers
            </h3>

            <div style={{ marginTop: '20px' }}>
    {Array.isArray(answers) && answers.length > 0 ? (
        answers.map((ans) => (
            <div key={ans._id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
                <p>{ans.answerBody || ans.body}</p>
                <div style={{ textAlign: 'right' }}>
                    <small>— {ans.user?.username || "Technical User"}</small>
                </div>
            </div>
        ))
    ) : (
        <p>Abhi koi answer nahi hai.</p>
    )}
</div>
            

            {/* Answer Form */}
            <div style={{ marginTop: '50px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
                <h3>Aapka Solution:</h3>
                <form onSubmit={handleAnswerSubmit}>
                    <textarea 
                        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
                        rows="6"
                        value={answerBody}
                        onChange={(e) => setAnswerBody(e.target.value)}
                        placeholder="Yahan apna code ya solution likhein..."
                        required
                    />
                    <button type="submit" style={{ marginTop: '15px', padding: '12px 30px', backgroundColor: '#6c5ce7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                        Post Answer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;