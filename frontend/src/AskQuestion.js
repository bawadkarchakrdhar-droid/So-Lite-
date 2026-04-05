import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API path bilkul seedha rakha hai
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: localStorage.getItem('userId') || 'Guest'
            });
            alert("Question posted! 🚀");
            navigate('/');
        } catch (err) {
            alert("Connection issue: Backend routes check karein.");
        }
    };

    return (
        <div className="container mt-5 py-4">
            <h2 className="fw-bold mb-4">Ask a question</h2>
            <div className="card shadow-sm p-4 border-0 bg-light">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea className="form-control" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Tags</label>
                        <input type="text" className="form-control" placeholder="react, nodejs" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary px-5">Post Your Question</button>
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;