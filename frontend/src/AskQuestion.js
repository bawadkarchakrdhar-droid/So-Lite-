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
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            return alert("Bhai, pehle login karo!");
        }

        try {
            // Logic 100% fixed now
            await axios.post('https://so-lite-backend.onrender.com/api/question', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: userId
            });

            alert("Question posted successfully! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Question not posted. Backend check karo!");
        }
    }; // handleSubmit function yahan khatam ho raha hai

    // Return hamesha function ke andar hona chahiye
    return (
        <div className="container mt-5">
            <h2 className="fw-bold mb-4">Ask a public question</h2>
            <div className="card p-4 shadow-sm border-0 rounded-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="e.g. How to fix Java SQL error?" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea 
                            className="form-control" 
                            rows="6" 
                            placeholder="Explain your problem in detail..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Tags</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="e.g. java, maven, react (comma separated)" 
                            value={tags} 
                            onChange={(e) => setTags(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                        Post Your Question
                    </button>
                </form>
            </div>
        </div>
    );
}; // AskQuestion component yahan khatam ho raha hai

export default AskQuestion;