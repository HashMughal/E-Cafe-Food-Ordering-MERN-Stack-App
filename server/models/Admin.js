const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: ['manage_products', 'manage_orders', 'manage_users', 'manage_admins'],
    default: ['manage_products', 'manage_orders']
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema); 