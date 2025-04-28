import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/users', { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const promoteUser = async (userId, newRole) => {
    const confirmed = window.confirm(`Are you sure you want to change this user's role to "${newRole}"?`);
    if (!confirmed) {
      return; 
    }
  
    try {
      await axios.post(`http://localhost:3001/api/users/${userId}/promote`, { role: newRole }, { withCredentials: true });
      setMessage('User role updated successfully');
      fetchUsers(); // Refresh the user list
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Failed to promote user', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`, { withCredentials: true });
      setMessage('User deleted successfully');
      fetchUsers(); // Refresh after deletion
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };
  
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-page">
        <h1>Admin Dashboard</h1>
        {message && <div className="status-message">{message}</div>}

        <div className="user-table-container">
            <table>
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                        <select
                            value={user.role}
                            onChange={(e) => promoteUser(user.id, e.target.value)}
                        >
                            <option value="visitor">Visitor</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

  );
}

export default AdminDashboard;
