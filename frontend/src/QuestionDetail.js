import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [ansBody, setAnsBody] = useState('');

    const load = async () => {
        try {
            // Backend se question aur uske answers fetch ho rahe hain
            const res = await axios.get(`https://so-lite-backend.onrender.com/api/question/${id}`);
            setQuestion(res.data);
            setAnswers(res.data.answers || []); 
        } catch (err) {
            console.error("Data load nahi hua", err);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAns = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://so-lite-backend.onrender.com/api/answer', {
                answerBody: ansBody,
                userId: localStorage.getItem('userId'),
                questionId: id
            });
            setAnsBody('');
            alert("Answer save ho gaya! ✅");
            
            // Ye line page ko refresh karegi taaki naya answer list mein dikhe
            window.location.reload(); 
        } catch (err) {
            alert("Error: Answer save nahi hua!");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {question ? (
                <>
                    <h1>{question.title}</h1>
                    <p>{question.description}</p>
                    <hr />
                    <h3>{answers.length} Answers</h3>
                    {answers.map((a) => (
                        <div key={a._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            <p>{a.answerBody}</p>
                        </div>
                    ))}

                    <form onSubmit={handleAns} style={{ marginTop: '20px' }}>
                        <textarea
                            value={ansBody}
                            onChange={(e) => setAnsBody(e.target.value)}
                            placeholder="Write your answer..."
                            rows="4"
                            cols="50"
                            required
                        />
                        <br />
                        <button type="submit">Post Answer</button>
                    </form>
                </>
            ) : (
                <p>Loading question...</p>
            )}
        </div>
    );
};

export default QuestionDetail;