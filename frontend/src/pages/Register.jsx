import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'candidate'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/register', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required /><br/><br/>
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required /><br/><br/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
                <select name="role" onChange={handleChange}>
                    <option value="candidate">Candidate (Looking for Job)</option>
                    <option value="recruiter">Recruiter (Hiring)</option>
                </select><br/><br/>
                <button type="submit">Register</button>
            </form>

            {/* 2. Link to Login Page */}
            <p style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;