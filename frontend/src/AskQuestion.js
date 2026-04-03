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
            // Sahi Backend URL check karein
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                body,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: localStorage.getItem('userId')
            });
            alert("Sawal post ho gaya! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Network Error: Backend connect nahi ho pa raha!");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'Arial' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Pucho Sawal</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                    placeholder="Title (e.g. What is React?)" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', height: '120px' }}
                    placeholder="Describe your problem..." 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    required 
                />
                <input 
                    style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                    placeholder="Tags (react, js, frontend)" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                />
                <button 
                    type="submit" 
                    style={{ background: '#007bff', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Post Question
                </button>
            </form>
        </div>
    );
};

export default AskQuestion;