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
            alert("Sawal post ho gaya! 🚀");
            navigate('/dashboard');
        } catch (err) {
            alert("Error: Connection check karein!");
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9f9', minHeight: '100vh', padding: '40px 20px' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold fs-3">Ask a public question</h1>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg" alt="SO" width="50" />
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        {/* Main Form Card */}
                        <div className="card shadow-sm border p-4 mb-4" style={{ borderRadius: '4px' }}>
                            <form onSubmit={handleSubmit}>
                                
                                {/* Title Section */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-0">Title</label>
                                    <p className="text-muted small mb-2">Be specific and imagine you’re asking a question to another person.</p>
                                    <input 
                                        className="form-control form-control-sm"
                                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?" 
                                        style={{ borderColor: '#babfc4', padding: '10px' }}
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>

                                {/* Body/Description Section with Toolbar placeholder */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-0">Body</label>
                                    <p className="text-muted small mb-2">Include all the information someone would need to answer your question.</p>
                                    
                                    {/* Mock Toolbar to match screenshot */}
                                    <div className="border border-bottom-0 p-2 d-flex gap-3 bg-light" style={{ borderColor: '#babfc4' }}>
                                        <i className="bi bi-type-bold"></i> <i className="bi bi-type-italic"></i>
                                        <i className="bi bi-link-45deg"></i> <i className="bi bi-code-slash"></i>
                                        <i className="bi bi-image"></i> <i className="bi bi-list-ol"></i>
                                    </div>
                                    
                                    <textarea 
                                        className="form-control"
                                        style={{ 
                                            borderColor: '#babfc4', 
                                            minHeight: '300px', 
                                            borderRadius: '0 0 4px 4px',
                                            padding: '15px'
                                        }}
                                        value={body} 
                                        onChange={(e) => setBody(e.target.value)} 
                                        required 
                                    />
                                </div>

                                {/* Tags Section */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-0">Tags</label>
                                    <p className="text-muted small mb-2">Add up to 5 tags to describe what your question is about.</p>
                                    <input 
                                        className="form-control"
                                        placeholder="e.g. (ajax django reactjs)" 
                                        style={{ borderColor: '#babfc4', padding: '10px' }}
                                        value={tags} 
                                        onChange={(e) => setTags(e.target.value)} 
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary fw-bold px-4" style={{ backgroundColor: '#0a95ff', border: 'none' }}>
                                    Post your question
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side Sidebar (Optional Tips) */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border">
                            <div className="card-header bg-light fw-bold border-bottom">Step 1: Draft your question</div>
                            <div className="card-body small">
                                <p>The community is here to help you with specific coding, algorithm, or language problems.</p>
                                <hr />
                                <ul className="ps-3 mb-0">
                                    <li>Summarize the problem</li>
                                    <li>Describe what you've tried</li>
                                    <li>Show some code</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;