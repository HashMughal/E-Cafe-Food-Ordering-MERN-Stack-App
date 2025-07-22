import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    marketingConsent: false
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5050/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          password: '',
          marketingConsent: response.data.marketingConsent
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setUpdateSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      // Create update data with only the fields that have changed
      const updateData = {};
      if (formData.firstName !== user.firstName) {
        updateData.firstName = formData.firstName;
      }
      if (formData.lastName !== user.lastName) {
        updateData.lastName = formData.lastName;
      }
      if (formData.marketingConsent !== user.marketingConsent) {
        updateData.marketingConsent = formData.marketingConsent;
      }
      // Only include password if it's not empty
      if (formData.password && formData.password.trim() !== '') {
        updateData.password = formData.password;
      }

      // Only proceed with update if there are changes
      if (Object.keys(updateData).length === 0) {
        setError('No changes to update');
        return;
      }

      console.log('Sending update request with data:', updateData);
      console.log('Current user data:', user);
      console.log('Form data:', formData);

      const response = await axios.put(
        'http://localhost:5050/api/auth/profile',
        updateData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data);

      if (response.data) {
        setUser(response.data);
        setUpdateSuccess(true);
        // Clear password field after successful update
        setFormData(prev => ({
          ...prev,
          password: ''
        }));
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Update error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('token'); // Clear invalid token
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response.data.details) {
          // Handle validation errors
          const errorMessage = Array.isArray(err.response.data.details) 
            ? err.response.data.details.join(', ')
            : err.response.data.details;
          setError(errorMessage);
        } else {
          setError(err.response.data.message || 'Failed to update profile. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', err);
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        navigate('/login');
        return;
      }

      console.log('Sending delete account request...');

      const response = await axios.delete(
        'http://localhost:5050/api/auth/profile',
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Delete account response:', response.data);

      if (response.data.message === 'Account deleted successfully') {
        // Clear local storage
        localStorage.removeItem('token');
        
        // Show success message
        setError('');
        setUpdateSuccess(true);
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Delete account error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      if (err.response) {
        if (err.response.status === 401) {
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('token'); // Clear invalid token
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(err.response.data.message || 'Failed to delete account. Please try again.');
        }
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check your internet connection.');
      } else {
        console.error('Request setup error:', err);
        setError('An error occurred. Please try again.');
      }
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        {updateSuccess && <div className="success-message">Profile updated successfully!</div>}
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="info-group">
            <label>Email</label>
            <div className="read-only-field">{user.email}</div>
            <small className="email-note">To change your email, please contact support.</small>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password (leave blank to keep current)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="8"
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleChange}
              />
              I agree to receive marketing communications
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="update-btn">Update Profile</button>
            <button type="button" className="delete-btn" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 