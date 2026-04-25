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
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            await axios.post('https://so-lite-backend.onrender.com/api/question', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Question posted successfully!");
            navigate('/dashboard'); // Post hone ke baad dashboard pe bhej dega
        } catch (err) {
            console.error(err);
            alert("Error posting question. Check if you are logged in.");
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: '850px' }}>
            <div className="d-flex align-items-center mb-4">
                <h2 className="fw-bold">Ask a public question</h2>
            </div>

            {/* Blue Info Box for Guidance */}
            <div className="card mb-4" style={{ backgroundColor: '#ebf4fb', border: '1px solid #a6d3f2' }}>
                <div className="card-body">
                    <h5 className="card-title text-dark">Writing a good question</h5>
                    <p className="card-text small text-muted mb-0">
                        You’re ready to ask a programming-related question. Summarize your problem, 
                        describe what you tried, and add tags to help others find it.
                    </p>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="card shadow-sm p-4 border-1">
                <form onSubmit={handleSubmit}>
                    
                    {/* Title Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold mb-0">Title</label>
                        <p className="text-muted small mb-2">Be specific and imagine you’re asking a question to another person.</p>
                        <input 
                            type="text" 
                            className="form-control p-2 border-secondary-subtle" 
                            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold mb-0">What are the details of your problem?</label>
                        <p className="text-muted small mb-2">Introduce the problem and expand on what you put in the title.</p>
                        <textarea 
                            className="form-control border-secondary-subtle" 
                            rows="8" 
                            placeholder="Describe your problem in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Tags Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold mb-0">Tags</label>
                        <p className="text-muted small mb-2">Add up to 5 tags to describe what your question is about (comma separated).</p>
                        <input 
                            type="text" 
                            className="form-control border-secondary-subtle" 
                            placeholder="e.g. (java, react-js, maven)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary px-4 py-2 fw-bold shadow-sm">
                            Post Your Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;