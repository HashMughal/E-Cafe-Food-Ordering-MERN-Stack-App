import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    marketingConsent: false,
    isAdmin: false
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5050/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      marketingConsent: user.marketingConsent,
      isAdmin: user.isAdmin
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5050/api/auth/users/${selectedUser._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(user => user._id === selectedUser._id ? response.data : user));
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5050/api/auth/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Users</h1>
      {updateSuccess && <div>User updated successfully!</div>}
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.firstName} {user.lastName} ({user.email})
              <button onClick={() => handleSelectUser(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>Password (leave blank to keep current):</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label>
                <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} />
                Marketing Consent
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
                Admin
              </label>
            </div>
            <button type="submit">Update User</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUsers; 