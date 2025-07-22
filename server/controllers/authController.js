import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register User
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, termsAccepted, marketingConsent } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      termsAccepted,
      marketingConsent
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    // Log the entire request for debugging
    console.log('Update Profile Request:', {
      headers: req.headers,
      body: req.body,
      user: req.user
    });

    if (!req.user || !req.user._id) {
      console.error('No user found in request');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find user and include password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      console.error('User not found:', req.user._id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Current user data:', {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });

    // Update only the fields that are provided
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.marketingConsent !== undefined) user.marketingConsent = req.body.marketingConsent;
    
    // Handle password update if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    console.log('Updated user data:', {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      hasPassword: !!req.body.password
    });

    // Save the changes
    await user.save();
    console.log('User saved successfully');

    // Return the updated user (without password)
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      marketingConsent: user.marketingConsent
    });
  } catch (error) {
    console.error('Profile update error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ 
        message: 'Validation error', 
        details: validationErrors
      });
    }

    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      console.error('MongoDB error:', error);
      return res.status(500).json({ 
        message: 'Database error occurred',
        details: error.message
      });
    }

    res.status(500).json({ 
      message: 'Failed to update profile. Please try again.',
      details: error.message
    });
  }
};

// Delete user profile
export const deleteProfile = async (req, res) => {
  try {
    console.log('Delete profile request for user:', req.user._id);

    // First verify the user exists and include password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      console.error('User not found for deletion:', req.user._id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user to delete:', {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) {
      console.error('Failed to delete user:', req.user._id);
      return res.status(500).json({ message: 'Failed to delete user' });
    }

    console.log('User deleted successfully:', {
      id: deletedUser._id,
      email: deletedUser.email
    });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });

    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      return res.status(500).json({ 
        message: 'Database error occurred while deleting account',
        details: error.message
      });
    }

    res.status(500).json({ 
      message: 'Failed to delete account. Please try again.',
      details: error.message
    });
  }
};

// Admin: List all users
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['firstName', 'lastName', 'email', 'password', 'marketingConsent', 'isAdmin'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 