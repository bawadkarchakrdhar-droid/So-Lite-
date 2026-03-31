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
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert("please login first!");
            return navigate('/login');
        }

        try {
            // Tags ko string se array mein badalna zaroori hai
            const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
            
            const res = await axios.post('https://so-lite-backend.onrender.com/api/questions', {
                title,
                description,
                tags: tagsArray,
                userId
            });

            if(res.status === 201) {
                alert("Question post successfully! 🚀");
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Frontend Error:", err);
            alert("Question not posted!"); //
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fb', display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
            <div style={{ width: '100%', maxWidth: '700px', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f2f6' }}>
                <h2 style={{ fontSize: '26px', color: '#2d3436', marginBottom: '10px', fontWeight: '700' }}>Pucho Sawaal 💡</h2>
                <p style={{ color: '#636e72', marginBottom: '30px' }}>Post your doubts and get help from the community.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Title</label>
                        <input type="text" placeholder="e.g. What is React?" value={title} onChange={(e) => setTitle(e.target.value)} required 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Description</label>
                        <textarea rows="8" placeholder="Explain in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9' }}></textarea>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Tags (comma separated)</label>
                        <input type="text" placeholder="react, js, node" value={tags} onChange={(e) => setTags(e.target.value)} 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button type="submit" style={{ flex: 1, padding: '14px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                            Post Question
                        </button>
                        <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '14px 25px', borderRadius: '8px', border: '1px solid #dfe6e9', background: 'white', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;