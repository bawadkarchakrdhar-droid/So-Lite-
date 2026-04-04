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
                description: body,
                tags: tags.split(',').map(tag => tag.trim()), 
                userId: localStorage.getItem('userId')
            });
            alert("Success! Your question is live. 🚀");
            navigate('/dashboard');
        } catch (err) {
            alert("Error: Connection check karein!");
        }
    };

    return (
        <div className="container-fluid py-5" style={{ 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
            minHeight: '100vh' 
        }}>
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-9">
                    
                    {/* Header with Animation */}
                    <div className="text-center mb-5 mt-3">
                        <h1 className="display-5 fw-bold text-dark mb-2" style={{ letterSpacing: '-1px' }}>
                            Ask a Public Question
                        </h1>
                        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '600px' }}>
                            Join the community of developers and get answers to your toughest technical challenges.
                        </p>
                    </div>

                    {/* Premium Glassmorphic Card */}
                    <div className="card border-0 shadow-lg overflow-hidden" style={{ 
                        borderRadius: '24px', 
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                
                                {/* Floating Title Input */}
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-uppercase text-primary tracking-wider">Title</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0" style={{ borderRadius: '12px 0 0 12px' }}>
                                            <i className="bi bi-lightning-charge text-warning"></i>
                                        </span>
                                        <input 
                                            className="form-control form-control-lg border-start-0 ps-0"
                                            placeholder="What's your programming question? Be specific." 
                                            style={{ borderRadius: '0 12px 12px 0', fontSize: '1rem', border: '1.5px solid #dee2e6' }}
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Modern Description Editor Area */}
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-uppercase text-primary tracking-wider">Description</label>
                                    <textarea 
                                        className="form-control shadow-none"
                                        placeholder="Describe your problem, what you've tried, and any code snippets..." 
                                        style={{ 
                                            border: '1.5px solid #dee2e6', 
                                            borderRadius: '16px', 
                                            minHeight: '280px', 
                                            padding: '1.2rem',
                                            backgroundColor: '#fcfcfc'
                                        }}
                                        value={body} 
                                        onChange={(e) => setBody(e.target.value)} 
                                        required 
                                    />
                                </div>

                                {/* Tags Input with Icon */}
                                <div className="mb-5">
                                    <label className="form-label small fw-bold text-uppercase text-primary tracking-wider">Tags</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0" style={{ borderRadius: '12px 0 0 12px' }}>
                                            <i className="bi bi-hash text-muted"></i>
                                        </span>
                                        <input 
                                            className="form-control form-control-lg border-start-0 ps-0"
                                            placeholder="reactjs, nodejs, typescript..." 
                                            style={{ borderRadius: '0 12px 12px 0', fontSize: '1rem', border: '1.5px solid #dee2e6' }}
                                            value={tags} 
                                            onChange={(e) => setTags(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                {/* Actions with Gradient Button */}
                                <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-4">
                                    <button type="button" className="btn btn-link text-muted text-decoration-none fw-bold" onClick={() => navigate('/dashboard')}>
                                        Discard Draft
                                    </button>
                                    <button type="submit" className="btn btn-lg px-5 py-3 text-white fw-bold shadow" style={{ 
                                        background: 'linear-gradient(45deg, #0d6efd, #00d2ff)',
                                        border: 'none',
                                        borderRadius: '14px'
                                    }}>
                                        Post Question <i className="bi bi-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Pro Tip Section */}
                    <div className="mt-4 text-center">
                        <span className="badge rounded-pill bg-white text-dark shadow-sm px-3 py-2 border text-uppercase" style={{ fontSize: '0.7rem' }}>
                            💡 Pro Tip: Better tags get faster answers
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AskQuestion;