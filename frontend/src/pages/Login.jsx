import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/login', formData);
            
            // Save token and basic info locally
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userRole', response.data.user.role);
            
            alert("Login Successful!");
            navigate('/'); // Redirect to Home dashboard
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '50px auto', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-h)' }}>Login to Job Portal</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <label style={{ fontWeight: '500', color: 'var(--text-h)' }}>Email Address</label>
                <input type="email" name="email" placeholder="example@domain.com" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '6px', marginBottom: '16px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }} /><br/>
                
                <label style={{ fontWeight: '500', color: 'var(--text-h)' }}>Password</label>
                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '6px', marginBottom: '24px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }} /><br/>
                
                <button type="submit" style={{ width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold' }}>Login</button>
            </form>
            <p style={{ marginTop: '20px', fontSize: '14px' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Register here</Link>
            </p>
        </div>
    );
};

export default Login;