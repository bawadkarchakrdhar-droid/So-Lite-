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
                description: body, // Aapke backend mapping ke hisaab se
                tags: tags.split(',').map(tag => tag.trim()), 
                userId: localStorage.getItem('userId')
            });
            alert("Sawal post ho gaya! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Error: Connection check karein!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Header Section */}
                    <div className="mb-4">
                        <h2 className="fw-bold text-dark">Sawal Pucho</h2>
                        <p className="text-muted">Aapka technical sawal detail mein likhein taaki community help kar sake.</p>
                    </div>

                    {/* Form Card */}
                    <div className="card shadow border-0 p-4" style={{ borderRadius: '15px' }}>
                        <form onSubmit={handleSubmit}>
                            {/* Title Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Sawal ka Title</label>
                                <input 
                                    className="form-control form-control-lg shadow-none"
                                    placeholder="e.g. Node.js mein frontend kaise connect karein?" 
                                    style={{ border: '2px solid #eee', borderRadius: '10px' }}
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required 
                                />
                                <small className="text-muted">Ek line mein sawal ka nichod likhein.</small>
                            </div>

                            {/* Description Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Poori Detail</label>
                                <textarea 
                                    className="form-control shadow-none"
                                    placeholder="Apna error aur code yahan paste karein..." 
                                    style={{ border: '2px solid #eee', borderRadius: '10px', minHeight: '250px' }}
                                    value={body} 
                                    onChange={(e) => setBody(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Tags Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Tags</label>
                                <input 
                                    className="form-control shadow-none"
                                    placeholder="e.g. reactjs, nodejs, mongodb" 
                                    style={{ border: '2px solid #eee', borderRadius: '10px' }}
                                    value={tags} 
                                    onChange={(e) => setTags(e.target.value)} 
                                />
                                <small className="text-muted">Tags ko comma (,) se alag karein.</small>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg fw-bold shadow-sm" style={{ borderRadius: '10px' }}>
                                    Sawal Post Karein <i className="bi bi-send-fill ms-2"></i>
                                </button>
                                <button type="button" className="btn btn-link text-decoration-none text-muted" onClick={() => navigate('/dashboard')}>
                                    Cancel
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