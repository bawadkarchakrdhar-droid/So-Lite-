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
                description: body, // Backend variable mapping fixed
                tags: tags.split(',').map(tag => tag.trim()), 
                userId: localStorage.getItem('userId')
            });
            alert("Success! Your programming question is live. 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Error: Connection failed!");
        }
    };

    return (
        <div className="container-fluid py-5" style={{ 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="row justify-content-center w-100">
                <div className="col-lg-7 col-md-10">
                    
                    {/* Header Section - Modern Spacing */}
                    <div className="text-center mb-5 mt-3">
                        <h1 className="display-6 fw-bold text-dark mb-2" style={{ letterSpacing: '-1.5px' }}>
                            Ask a Public Question
                        </h1>
                        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '650px' }}>
                            Describe your technical challenge with precision and get expert community solutions.
                        </p>
                    </div>

                    {/* Premium Glassmorphic Form Card */}
                    <div className="card border-0 shadow-lg overflow-hidden" style={{ 
                        borderRadius: '24px', 
                        backdropFilter: 'blur(15px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                
                                {/* Floating Title Input */}
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-uppercase text-primary tracking-wider mb-2">
                                        <i className="bi bi-lightning me-1"></i>Title
                                    </label>
                                    <input 
                                        className="form-control form-control-lg shadow-none"
                                        placeholder="What's your programming question? Be specific (e.g., 'React forms with custom hooks')" 
                                        style={{ 
                                            borderRadius: '12px', 
                                            fontSize: '1.05rem', 
                                            border: '1.5px solid #dee2e6', 
                                            padding: '1rem' 
                                        }}
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>

                                {/* Modern Description Editor Area */}
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-uppercase text-primary tracking-wider mb-2">
                                        <i className="bi bi-file-text me-1"></i>Detailed Description
                                    </label>
                                    <textarea 
                                        className="form-control shadow-none"
                                        placeholder="Describe your problem, include error messages, and paste code snippets..." 
                                        style={{ 
                                            border: '1.5px solid #dee2e6', 
                                            borderRadius: '16px', 
                                            minHeight: '320px', 
                                            padding: '1.2rem',
                                            backgroundColor: '#fcfcfc',
                                            fontSize: '1rem'
                                        }}
                                        value={body} 
                                        onChange={(e) => setBody(e.target.value)} 
                                        required 
                                    />
                                </div>

                                {/* Tags Input */}
                                <div className="mb-5">
                                    <label className="form-label small fw-bold text-uppercase text-primary tracking-wider mb-2">
                                        <i className="bi bi-tags me-1"></i>Tags (comma-separated)
                                    </label>
                                    <input 
                                        className="form-control form-control-lg shadow-none"
                                        placeholder="reactjs, nodejs, mongodb..." 
                                        style={{ borderRadius: '12px', fontSize: '1.05rem', border: '1.5px solid #dee2e6', padding: '1rem' }}
                                        value={tags} 
                                        onChange={(e) => setTags(e.target.value)} 
                                    />
                                </div>

                                {/* Advance Actions with Full-Width Button */}
                                <div className="d-grid gap-3 pt-3 border-top mt-4">
                                    <button type="submit" className="btn btn-lg px-5 py-3 text-white fw-bold shadow" style={{ 
                                        background: 'linear-gradient(45deg, #0d6efd, #00d2ff)',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '1.1rem'
                                    }}>
                                        Post Your Question <i className="bi bi-send-fill ms-2"></i>
                                    </button>
                                    <button type="button" className="btn btn-link text-muted text-decoration-none fw-medium" onClick={() => navigate('/dashboard')}>
                                        Discard Draft
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Pro Tip - Premium Badge */}
                    <div className="mt-4 text-center">
                        <span className="badge rounded-pill bg-white text-dark shadow-sm px-4 py-2 border text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                            💡 Pro Tip: Detailed questions get better answers
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AskQuestion;