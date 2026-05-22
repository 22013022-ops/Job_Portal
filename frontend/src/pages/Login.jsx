import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // For redirecting after login

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/login', formData);
            
            // Save the token in LocalStorage
            localStorage.setItem('token', response.data.token);
            
            alert("Login Successful!");
            navigate('/'); // Redirect to Home page
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h2>Login to Job Portal</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /><br/><br/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /><br/><br/>
                <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>Login</button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;