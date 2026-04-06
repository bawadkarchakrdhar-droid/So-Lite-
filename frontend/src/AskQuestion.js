import React, { useState } from 'react';
import axios from 'axios';

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedUserId = localStorage.getItem('userId');
            const storedUserName = localStorage.getItem('userName') || 'Anonymous User';

            await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                userId: storedUserId,
                userName: storedUserName 
            });

            alert("Sawal post ho gaya! 🚀");
            window.location.href = '/'; // Login page issue fix
        } catch (err) {
            alert("Error: Post nahi hua.");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <h2 className="fw-bold mb-4">Ask a public question</h2>
                    <div className="card mb-4 shadow-sm" style={{ backgroundColor: '#ebf4fb', border: '1px solid #a6d3f2' }}>
                        <div className="card-body">
                            <h5 className="fw-bold">Writing a good question</h5>
                            <p className="mb-0 small text-muted">Summarize problem → Describe what you tried → Add tags.</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card shadow-sm p-4 border" style={{ borderRadius: '4px' }}>
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">Title</label>
                                <input type="text" className="form-control" placeholder="e.g. How to connect React to Node?" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">Description</label>
                                <div className="card border">
                                    <div className="bg-light border-bottom p-2 d-flex gap-3 px-3 text-muted small"><b>B</b> <i>I</i> <span>&lt;/&gt;</span></div>
                                    <textarea className="form-control border-0 shadow-none" rows="12" style={{ padding: '15px' }} value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold mb-0">Tags</label>
                                <input type="text" className="form-control" placeholder="react, nodejs" value={tags} onChange={(e) => setTags(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg px-4">Post your question</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;