// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ setIsAdmin }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = () => {
    if (password === 'admin123') { // Replace with secure authentication in production
      setIsAdmin(true);
      alert('Admin Login Successful');
      navigate('/admin-dashboard'); // Redirect to admin dashboard
    } else {
      alert('Incorrect Password');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
