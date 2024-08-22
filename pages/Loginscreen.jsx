import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom';

const Loginscreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault(); // Prevent form from submitting the traditional way

        const user = { email, password };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users/login', user); // Ensure correct URL
            setLoading(false);
            localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in local storage
            navigate('/profile'); // Redirect to profile page
        } catch (error) {
            console.log('Error:', error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    }

    return (
        <div className="login-screen-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI4hvCHWsCjsEn-It33lBpAL80baI4OOZkQ&s" alt="Logo" />
            {loading && <Loader />}
            {error && <Error message={error} />}
            <div className="login-form-container">
                <h1>Sign In</h1>
                <form onSubmit={login}>
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
                    <button className="btn sign-in" type="submit">
                        Sign In
                    </button>&nbsp;&nbsp;
                    <button className="btn sign-up" onClick={() => navigate('/register')}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Loginscreen;
