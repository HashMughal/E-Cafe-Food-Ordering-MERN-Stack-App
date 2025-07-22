import express from 'express';
import { register, login, getProfile, updateProfile, deleteProfile, listUsers, getUserById, updateUserById, deleteUserById } from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user profile
router.get('/profile', protect, getProfile);

// Update user profile
router.put('/profile', protect, updateProfile);

// Delete user profile
router.delete('/profile', protect, deleteProfile);

// Admin: List all users
router.get('/users', protect, admin, listUsers);

// Admin: Get user by ID
router.get('/users/:id', protect, admin, getUserById);

// Admin: Update user by ID
router.put('/users/:id', protect, admin, updateUserById);

// Admin: Delete user by ID
router.delete('/users/:id', protect, admin, deleteUserById);

export default router; 