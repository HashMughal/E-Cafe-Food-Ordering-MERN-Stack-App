const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All admin routes require authentication and admin privileges
router.use(auth);
router.use(adminAuth);

// Dashboard stats
router.get('/dashboard', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getUsers);

// Product management
router.get('/products', adminController.getProducts);
router.post('/products', adminController.addProduct);
router.put('/products/:productId', adminController.updateProduct);
router.delete('/products/:productId', adminController.deleteProduct);

// Order management
router.get('/orders', adminController.getOrders);
router.put('/orders/:orderId/status', adminController.updateOrderStatus);

module.exports = router; 