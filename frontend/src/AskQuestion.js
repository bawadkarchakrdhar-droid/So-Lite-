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
            // Aapka working logic
            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: localStorage.getItem('userId') || 'User_Guest'
            });
            alert("Sawal post ho gaya! 🚀");
            navigate('/');
        } catch (err) {
            alert("Error: Question post nahi hua. Backend check karein.");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <h2 className="fw-bold mb-4" style={{ color: '#232629' }}>Ask a public question</h2>
                    
                    {/* Blue Guidance Box - Premium Feel */}
                    <div className="card border-info mb-4 shadow-sm" style={{ backgroundColor: '#ebf4fb', border: '1px solid #a6d3f2' }}>
                        <div className="card-body">
                            <h5 className="fw-bold">Writing a good question</h5>
                            <p className="mb-0 small text-muted">
                                Steps: Summarize problem → Describe what you tried → Add tags to categorize.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="card shadow-sm p-4 mb-4 border" style={{ borderRadius: '4px' }}>
                            {/* Title Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">Title</label>
                                <small className="text-muted d-block mb-2">Be specific and imagine you’re asking a question to another person.</small>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="e.g. Is there an R function for finding the index of an element?" 
                                    style={{ fontSize: '15px', borderRadius: '3px' }}
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Description Field */}
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">What are the details of your problem?</label>
                                <small className="text-muted d-block mb-2">Introduce the problem and expand on what you put in the title.</small>
                                <div className="card border" style={{ borderRadius: '4px' }}>
                                    <div className="bg-light border-bottom p-2 d-flex gap-3 px-3 text-muted">
                                        <span className="fw-bold">B</span>
                                        <span className="fst-italic">I</span>
                                        <span>&lt;/&gt;</span>
                                    </div>
                                    <textarea 
                                        className="form-control border-0 shadow-none" 
                                        rows="12" 
                                        style={{ fontSize: '15px', padding: '15px', width: '100%' }} // Full width fix
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
                                    placeholder="e.g. (vba react node.js)" 
                                    style={{ fontSize: '15px', borderRadius: '3px' }}
                                    value={tags} 
                                    onChange={(e) => setTags(e.target.value)} 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg px-4 mt-2" style={{ borderRadius: '4px' }}>
                                Post your question
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;