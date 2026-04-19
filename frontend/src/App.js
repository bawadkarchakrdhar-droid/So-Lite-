import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import AskQuestion from './AskQuestion';
import QuestionDetail from './QuestionDetail'; // Naya component


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/settings"element={<ProtectedRoute><setting /></ProtectedRoute>} />
          <Route path="/ask-question" element={<ProtectedRoute><AskQuestion /></ProtectedRoute>} />
          {/* Naya Dynamic Route */}
          <Route path="/question/:id" element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;