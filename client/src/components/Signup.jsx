import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const navigate = useNavigate();

  // Clear form data when component mounts
  useEffect(() => {
    // Clear all form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setTermsAccepted(false);
    setMarketingConsent(false);
    
    // Clear all error states
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');
    setApiError('');
    setApiSuccess('');
  }, []);

  const handleSignup = async () => {
    setApiError('');
    setApiSuccess('');
    try {
      const response = await fetch('http://localhost:5050/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          termsAccepted,
          marketingConsent,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setApiSuccess('Signup successful! You can now log in.');
        // Clear form data after successful signup
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTermsAccepted(false);
        setMarketingConsent(false);
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setApiError(data.message || 'Signup failed.');
      }
    } catch (err) {
      setApiError('Network error. Please try again.');
    }
  };

  const validateSignupForm = async (event) => {
    event.preventDefault();
    let isValid = true;

    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');
    setApiError('');
    setApiSuccess('');

    if (!firstName) {
      setFirstNameError('First Name is required');
      isValid = false;
    }

    if (!lastName) {
      setLastNameError('Last Name is required');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    }

    if (!termsAccepted) {
      setTermsError('You must accept the Terms & Conditions');
      isValid = false;
    }

    if (isValid) {
      await handleSignup();
    }

    return isValid;
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Top Section */}
      <div className="top-section">
        <div className="logo">
          <img src="Images/Tehzeeb-Logo-PNG1.webp" alt="Tehzeeb Logo" />
        </div>
        <div className="login-link">
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Sign-Up Form */}
      <div className="signup-container px-3">
        <div className="signup-form">
          <h2>Create an Account</h2>
          <form onSubmit={validateSignupForm}>
            <div className="name-fields">
              <div className="w-100">
                <input
                  type="text"
                  placeholder="Enter First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                />
                <span className="error-message">{firstNameError}</span>
              </div>
              <div className="w-100">
                <input
                  type="text"
                  placeholder="Enter Last Name *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="off"
                />
                <span className="error-message">{lastNameError}</span>
              </div>
            </div>

            <div className="email-field">
              <input
                type="email"
                placeholder="Enter your Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <span className="error-message">{emailError}</span>
            </div>

            <div className="password-fields">
              <div className="password-wrapper w-100">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={handleTogglePassword}
                ></i>
                <span className="error-message">{passwordError}</span>
              </div>
              <div className="password-wrapper w-100">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={handleTogglePassword}
                ></i>
                <span className="error-message">{confirmPasswordError}</span>
              </div>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                I accept the <Link to="/terms">Terms & Conditions</Link>
              </label>
              <span className="error-message">{termsError}</span>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                />
                Subscribe to our newsletter for exclusive offers and updates.
              </label>
            </div>

            {apiError && <div className="error-message">{apiError}</div>}
            {apiSuccess && <div className="success-message">{apiSuccess}</div>}

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup; 