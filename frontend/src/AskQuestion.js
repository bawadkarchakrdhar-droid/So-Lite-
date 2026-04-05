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
            // Correct API path with /api/questions
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: localStorage.getItem('userId') || 'Guest_User'
            });
            alert("Sawal post ho gaya! 🚀");
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Error: Question post nahi hua. Backend check karein.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 card shadow-sm p-4">
                    <h2 className="fw-bold mb-4">Pucho Sawal</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="e.g. What is React?" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Description</label>
                            <textarea 
                                className="form-control" 
                                rows="8" 
                                placeholder="Describe your problem in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Tags (comma separated)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="react, javascript, frontend"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary px-4">Post Question</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;