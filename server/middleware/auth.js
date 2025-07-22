import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes
export const protect = async (req, res, next) => {
  try {
    let token;

    console.log('Auth middleware - Request headers:', {
      authorization: req.headers.authorization ? 'Bearer [REDACTED]' : 'Not present',
      contentType: req.headers['content-type'],
      userAgent: req.headers['user-agent']
    });

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        if (!token) {
          console.error('No token provided in Bearer header');
          return res.status(401).json({ message: 'No token provided' });
        }

        if (!process.env.JWT_SECRET) {
          console.error('JWT_SECRET is not defined in environment variables');
          return res.status(500).json({ message: 'Server configuration error' });
        }

        console.log('Attempting to verify token...');
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', {
          id: decoded.id,
          iat: decoded.iat,
          exp: decoded.exp
        });

        // Get user from token
        console.log('Finding user with ID:', decoded.id);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
          console.error('User not found for ID:', decoded.id);
          return res.status(401).json({ message: 'User not found' });
        }

        console.log('User found:', {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        });

        // Add user to request object
        req.user = user;
        next();
      } catch (error) {
        console.error('Token verification error:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });

        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      console.error('No Bearer token in Authorization header');
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Server error in auth middleware' });
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  console.log('Admin middleware - Checking user:', {
    id: req.user._id,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  });

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    console.error('Admin access denied for user:', {
      id: req.user._id,
      email: req.user.email
    });
    res.status(401).json({ message: 'Not authorized as admin' });
  }
}; 