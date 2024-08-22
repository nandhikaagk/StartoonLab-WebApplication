import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:5000/api/users'); // Fetch users from the API
                console.log('Users fetched:', response.data); // Debugging: Log the response data
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response ? error.response.data : error.message); // Detailed error logging
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleSearch = () => {
        // Implement search functionality if needed
    };

    return (
        <div className="admin-dashboard-container">
            <nav className="admin-nav">
                <ul>
                    <li><a href="#home" onClick={() => navigate('/home')}>Home</a></li>
                    <li><a href="#graph" onClick={() => navigate('/graph')}>Graph</a></li>
                    
                </ul>
            </nav>
            <div className="user-table-container">
            
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Count</th>
                            <th>Last Login Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.count || 'N/A'}</td>
                                    <td>{user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
