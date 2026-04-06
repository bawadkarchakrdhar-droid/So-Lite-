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
            // Logic 100% same
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: localStorage.getItem('userId') || 'Anonymous_User'
            });
            alert("Question posted successfully! 🚀");
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Question post nahi hua. Backend check karein.");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h2 className="fw-bold mb-4" style={{ color: '#232629' }}>Ask a public question</h2>
                    
                    {/* Blue Instruction Box - Stack Overflow style */}
                    <div className="card mb-4 border-0 shadow-sm" style={{ backgroundColor: '#ebf4fb', borderLeft: '5px solid #0a95ff', borderRadius: '4px' }}>
                        <div className="card-body">
                            <h5 className="fw-bold text-dark">Writing a good question</h5>
                            <ul className="small text-muted mb-0 ps-3">
                                <li>Summarize your problem in a one-line title.</li>
                                <li>Describe what you tried and what you expected to happen.</li>
                                <li>Add tags to categorize your question.</li>
                            </ul>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="card shadow-sm p-4 mb-4 border" style={{ borderRadius: '6px' }}>
                            {/* Title Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">Title</label>
                                <small className="text-muted d-block mb-2">Be specific and imagine you’re asking a question to another person.</small>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="e.g. Is there an R function for finding the index of an element?" 
                                    style={{ fontSize: '15px', border: '1px solid #c8ccd0', borderRadius: '3px' }}
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Description Field with Fake Toolbar */}
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">What are the details of your problem?</label>
                                <small className="text-muted d-block mb-2">Introduce the problem and expand on what you put in the title.</small>
                                <div className="card border-0" style={{ border: '1px solid #c8ccd0', borderRadius: '3px' }}>
                                    <div className="bg-light border-bottom p-2 d-flex gap-4 px-3 text-muted" style={{ fontSize: '14px' }}>
                                        <b style={{ cursor: 'pointer' }}>B</b> <i style={{ cursor: 'pointer' }}>I</i> <span style={{ cursor: 'pointer' }}>🔗</span> <span style={{ cursor: 'pointer' }}>&lt;/&gt;</span>
                                    </div>
                                    <textarea 
                                        className="form-control border-0 shadow-none" 
                                        rows="12" 
                                        style={{ fontSize: '15px', padding: '15px', color: '#232629', width: '100%', fontFamily: 'monospace' }} 
                                        placeholder="Write your detailed description here..."
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Tags Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">Tags</label>
                                <small className="text-muted d-block mb-2">Add up to 5 tags to describe what your question is about.</small>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="react, nodejs, javascript" 
                                    style={{ fontSize: '15px', border: '1px solid #c8ccd0', borderRadius: '3px' }}
                                    value={tags} 
                                    onChange={(e) => setTags(e.target.value)} 
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary btn-lg px-4" style={{ backgroundColor: '#0a95ff', border: 'none', borderRadius: '4px' }}>
                                    Post Your Question
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;