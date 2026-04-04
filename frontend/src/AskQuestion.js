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
                title,
                description: body, // Fixed: 'body' mapping to 'description'
                tags: tags.split(',').map(tag => tag.trim()), 
                userId: localStorage.getItem('userId')
            });
            alert("Sawal post ho gaya! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Error: Connection check karein!"); //
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2>Pucho Sawal</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    className="form-control mb-3"
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    className="form-control mb-3"
                    placeholder="Describe it..." 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    rows="5"
                    required 
                />
                <input 
                    className="form-control mb-3"
                    placeholder="Tags (comma separated)" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                />
                <button type="submit" className="btn btn-primary w-100">Post Question</button>
            </form>
        </div>
    );
};

export default AskQuestion;