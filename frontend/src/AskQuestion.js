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
                description: body, // Fixed backend variable mapping
                tags: tags.split(',').map(tag => tag.trim()), 
                userId: localStorage.getItem('userId')
            });
            alert("Question Posted Successfully! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Error: Connection failed! Please check backend");
        }
    };

    return (
        // Middle Aligned Container using justify-content-center
        <div className="container mt-5" style={{ minHeight: '80vh' }}>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    
                    {/* Advance English Header Section */}
                    <div className="mb-5 text-center">
                        <h1 className="fw-bold text-dark display-6">Ask a Public Question</h1>
                        <p className="text-muted fs-5">Detailed questions help our community find the best solutions for your technical challenge.</p>
                    </div>

                    {/* Main Form Card with advanced styling */}
                    <div className="card shadow-lg border-0 p-4 p-md-5" style={{ borderRadius: '20px', backgroundColor: '#fff' }}>
                        <form onSubmit={handleSubmit}>
                            
                            {/* Title Field Group */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">
                                    <i className="bi bi-tag-fill me-2"></i>Question Title
                                </label>
                                <input 
                                    className="form-control form-control-lg shadow-none"
                                    placeholder="e.g. How to handle multiple form inputs in React without useState?" 
                                    style={{ border: '2px solid #eaecf0', borderRadius: '12px', fontSize: '1rem' }}
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required 
                                />
                                <small className="text-muted ms-2">Be specific and imagine you’re asking a peer.</small>
                            </div>

                            {/* Question Details Field Group */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">
                                    <i className="bi bi-file-text me-2"></i>Detailed Question Description
                                </label>
                                <textarea 
                                    className="form-control form-control-lg shadow-none"
                                    placeholder="Describe your error, what you tried, and paste relevant code snippets here..." 
                                    style={{ border: '2px solid #eaecf0', borderRadius: '12px', minHeight: '300px', fontSize: '1rem' }}
                                    value={body} 
                                    onChange={(e) => setBody(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Tags Field Group */}
                            <div className="mb-5">
                                <label className="form-label fw-semibold text-secondary">
                                    <i className="bi bi-hash me-2"></i>Tags
                                </label>
                                <input 
                                    className="form-control form-control-lg shadow-none"
                                    placeholder="reactjs, nodejs, forms, validation" 
                                    style={{ border: '2px solid #eaecf0', borderRadius: '12px', fontSize: '1rem' }}
                                    value={tags} 
                                    onChange={(e) => setTags(e.target.value)} 
                                />
                                <small className="text-muted ms-2">Separate multiple tags with a comma (,).</small>
                            </div>

                            {/* Advance English Action Buttons */}
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-end">
                                <button type="button" className="btn btn-outline-secondary btn-lg fw-medium" style={{ borderRadius: '12px' }} onClick={() => navigate('/dashboard')}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-lg fw-bold shadow-sm" style={{ borderRadius: '12px', paddingLeft: '40px', paddingRight: '40px' }}>
                                    Post Your Question <i className="bi bi-send-fill ms-2"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;