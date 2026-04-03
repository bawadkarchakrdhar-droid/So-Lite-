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
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title, body, tags: tags.split(','), userId: localStorage.getItem('userId')
            });
            alert("Sawal post ho gaya! 🚀");
            navigate('/dashboard');
        } catch (err) {
            alert("Error: Connection check karein!");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Pucho Sawal</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{padding: '10px'}} />
                <textarea placeholder="Describe it..." value={body} onChange={(e) => setBody(e.target.value)} required style={{padding: '10px', height: '100px'}} />
                <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} style={{padding: '10px'}} />
                <button type="submit" style={{background: '#007bff', color: 'white', padding: '10px', cursor: 'pointer'}}>Post Question</button>
            </form>
        </div>
    );
};
export default AskQuestion;