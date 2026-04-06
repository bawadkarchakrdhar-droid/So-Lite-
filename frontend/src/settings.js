import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // LocalStorage se user ka data nikalna
        const storedName = localStorage.getItem('userName') || '';
        const storedEmail = localStorage.getItem('userEmail') || 'user@so-lite.com';
        setName(storedName);
        setEmail(storedEmail);
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        // Naam update karne ka logic
        localStorage.setItem('userName', name);
        alert("Profile updated! Ab naye sawalon mein aapka naam dikhega. ✅");
        window.location.href = '/'; // Update ke baad home pe bhej dena
    };

    const handleLogout = () => {
        localStorage.clear(); // Saara data saaf
        window.location.href = '/login'; 
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="fw-bold mb-4" style={{ color: '#232629' }}>User Settings</h2>
                    
                    {/* Profile Section */}
                    <div className="card shadow-sm border mb-4" style={{ borderRadius: '4px' }}>
                        <div className="card-header bg-white fw-bold border-bottom py-3">
                            Public Profile
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSave}>
                                <div className="mb-4 text-center">
                                    <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2" 
                                         style={{ width: '80px', height: '80px', fontSize: '2rem', fontWeight: 'bold' }}>
                                        {name ? name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <p className="small text-muted">Profile Picture automatically generated</p>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold small">Display Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Apna naam likhein"
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold small">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control bg-light" 
                                        value={email} 
                                        readOnly 
                                    />
                                    <small className="text-muted">Email badla nahi ja sakta.</small>
                                </div>

                                <button type="submit" className="btn btn-primary px-4 shadow-none" style={{ borderRadius: '4px' }}>
                                    Save Profile
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="card shadow-sm border border-danger-subtle" style={{ borderRadius: '4px' }}>
                        <div className="card-header bg-white fw-bold text-danger border-bottom py-3">
                            Danger Zone
                        </div>
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold mb-1">Session Management</h6>
                                <p className="text-muted small mb-0">Apne account se bahar nikalne ke liye logout karein.</p>
                            </div>
                            <button onClick={handleLogout} className="btn btn-outline-danger px-4" style={{ borderRadius: '4px' }}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;