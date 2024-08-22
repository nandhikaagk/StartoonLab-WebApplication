import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom';


const AdminLoginScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login() {
        const admin = { email, password };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/admins/login', admin); // Ensure correct URL
            setLoading(false);
            setSuccess(true);
            console.log('Login successful:', response.data); // Handle successful login

            // Store admin data in local storage or handle as needed
            localStorage.setItem('admin', JSON.stringify(response.data));

            // Redirect to admin dashboard or other admin page
            navigate('/admin-dashboard'); // Example: Redirect to admin dashboard
        } catch (error) {
            console.log('Error:', error.response ? error.response.data : error.message);
            setLoading(false);
            setError(true);
        }
    }

    return (
        <div className="admin-login-screen-container">
            {loading && <Loader />}
            {error && <Error />}
            <div className="admin-login-form-container">
                {success && <Success message="Login Successful" />}
                <h1>Admin Login</h1>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="btn admin-login" onClick={login}>
                   Login
                </button>
            </div>
        </div>
    );
};

export default AdminLoginScreen;
