import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Registerscreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    async function register() {
        if (password === cpassword) {
            const user = { name, email, password, gender };

            try {
                setLoading(true);
                await axios.post('http://localhost:5000/api/users/register', user);  // Ensure correct URL
                setLoading(false);
                setSuccess(true);
                navigate('/login');  // Navigate to login page on success

                setName('');
                setEmail('');
                setPassword('');
                setCPassword('');
                setGender('');
            } catch (error) {
                console.log('Error:', error.response ? error.response.data : error.message);
                setLoading(false);
                setError(true);
            }
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <div className="register-screen-container">
            {loading && <Loader />}
            {error && <Error />}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI4hvCHWsCjsEn-It33lBpAL80baI4OOZkQ&s"/>
            <div className="register-form-container"><br></br>
                {success && <Success message="Successfully Registered" />}
                
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
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
                <input
                    type="password"
                    className="form-control"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <div className="gender-options">
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="other"
                            checked={gender === 'other'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Other
                    </label>
                </div><br></br>
                <button className="btn sign-up " onClick={register}>
                    Sign Up
                </button>&nbsp;&nbsp;&nbsp;
                <button className="btn sign-in" onClick={register}>
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Registerscreen;
