import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Check if you use tokens
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                body,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: localStorage.getItem('userId')
            });
            alert("Question post ho gaya! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Question post nahi hua! Connection check karein.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Pucho Sawal</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br/>
                <textarea placeholder="Description" value={body} onChange={(e) => setBody(e.target.value)} required /><br/>
                <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} /><br/>
                <button type="submit">Post Question</button>
            </form>
        </div>
    );
};

export default AskQuestion;