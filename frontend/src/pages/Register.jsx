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
            alert(response.data.message || "Account Created Successfully!");
            navigate('/'); // 🚀 Redirect to Home after successful registration
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '50px auto', boxBurrow: 'var(--shadow)', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-h)' }}>Create an Account</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <label style={{ fontWeight: '500', color: 'var(--text-h)' }}>Full Name</label>
                <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '6px', marginBottom: '16px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }} />
                
                <label style={{ fontWeight: '500', color: 'var(--text-h)' }}>Email Address</label>
                <input type="email" name="email" placeholder="example@domain.com" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '6px', marginBottom: '16px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }} />
                
                <label style={{ fontWeight: '500', color: 'var(--text-h)' }}>Password</label>
                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '6px', marginBottom: '16px', borderRadius: '6px', border: '1px solid var(--border)', boxSizing: 'border-box' }} />
                
                <label style={{ fontWeight: '500', color: 'var(--text-h)' }}>I am a:</label>
                <select name="role" onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '6px', marginBottom: '24px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
                    <option value="candidate">Candidate (Looking for Job)</option>
                    <option value="recruiter">Recruiter (Hiring)</option>
                </select>
                
                <button type="submit" style={{ width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold' }}>Register</button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '14px' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Login here</Link>
            </p>
        </div>
    );
};

export default Register;