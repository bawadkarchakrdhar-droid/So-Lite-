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
            // Backend mapping ke liye 'description' use kiya hai
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description: body, 
                tags: tags.split(',').map(tag => tag.trim()), 
                userId: localStorage.getItem('userId')
            });
            alert("Question posted successfully! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Question not posted!"); // Wahi alert jo screenshot mein hai
        }
    };

    return (
        <div className="container mt-5">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="fw-bold mb-4">Pucho Sawal</h2>
                <p className="text-muted mb-4">Post your doubts and get help from the community.</p>

                <form onSubmit={handleSubmit}>
                    {/* Title Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Title</label>
                        <input 
                            type="text"
                            className="form-control shadow-none"
                            placeholder="What is React and how does it work?" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            style={{ padding: '12px' }}
                        />
                    </div>

                    {/* Description Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Description</label>
                        <textarea 
                            className="form-control shadow-none"
                            placeholder="Describe it..." 
                            rows="10"
                            value={body} 
                            onChange={(e) => setBody(e.target.value)} 
                            required 
                            style={{ padding: '12px' }}
                        />
                    </div>

                    {/* Tags Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Tags (comma separated)</label>
                        <input 
                            type="text"
                            className="form-control shadow-none"
                            placeholder="react, javascript, frontend" 
                            value={tags} 
                            onChange={(e) => setTags(e.target.value)} 
                            style={{ padding: '12px' }}
                        />
                    </div>

                    {/* Post Button - Full Width */}
                    <div className="d-grid gap-2 mt-5">
                        <button type="submit" className="btn btn-primary btn-lg py-3 fw-bold" style={{ backgroundColor: '#3b5bdb', border: 'none' }}>
                            Post Question
                        </button>
                        <button type="button" className="btn btn-link text-decoration-none text-muted" onClick={() => navigate('/dashboard')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;