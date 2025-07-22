import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // Clear form data when component mounts
  useEffect(() => {
    // Clear any existing form data
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    setApiError('');
    setShowPassword(false);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        // Clear form data before redirecting
        setEmail('');
        setPassword('');
        // If admin selected, check isAdmin
        if (role === 'admin') {
          if (data.isAdmin) {
            navigate('/admin');
          } else {
            setApiError('You are not authorized as admin.');
            return;
          }
        } else {
          // Redirect to home page
          navigate('/');
        }
      } else {
        setApiError(data.message || 'Login failed');
      }
    } catch (err) {
      setApiError('Network error. Please try again.');
    }
  };

  const validateLoginForm = (event) => {
    event.preventDefault();
    let isValid = true;

    setEmailError('');
    setPasswordError('');
    setApiError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password must be at least 8 characters, include uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter');
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      isValid = false;
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError('Password must contain at least one number');
      isValid = false;
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setPasswordError('Password must contain at least one special character (@$!%*?&)');
      isValid = false;
    }

    if (isValid) {
      handleLogin();
    }

    return isValid;
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Top Header */}
      <div className="top-section">
        <div className="logo">
          <img src="Images/Tehzeeb-Logo-PNG1.webp" alt="Tehzeeb Logo" />
        </div>
        <div className="create-account">
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={validateLoginForm}>
            <div className="mb-3">
              <select
                className="form-control"
                value={role}
                onChange={e => setRole(e.target.value)}
                style={{ marginBottom: '1rem' }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address *"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
              <span id="emailError" className="error-message">
                {emailError}
              </span>
            </div>
            <div className="mb-3 password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password *"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                id="togglePassword"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <span id="passwordError" className="error-message">
              {passwordError}
            </span>
            {apiError && <div className="error-message">{apiError}</div>}
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login; 