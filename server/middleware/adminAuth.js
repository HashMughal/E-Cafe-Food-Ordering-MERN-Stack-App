const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ user: req.user._id });
    
    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying admin privileges', error: error.message });
  }
};

module.exports = adminAuth; 