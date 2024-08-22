import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Redirect to login if no user data is found
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <button className="btn logout" onClick={() => {
                localStorage.removeItem('user'); // Clear user data from local storage
                navigate('/login'); // Redirect to login page
            }}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
