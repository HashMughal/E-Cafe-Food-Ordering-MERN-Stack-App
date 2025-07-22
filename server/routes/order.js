import express from 'express';
import { createOrder, getUserOrders, getOrder, updateOrderStatus, updatePaymentStatus, getAllOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

// Create order
router.post('/', createOrder);

// Get user's orders
router.get('/my-orders', getUserOrders);

// Get all orders (admin only)
router.get('/all', admin, getAllOrders);

// Get single order
router.get('/:id', getOrder);

// Update order status (admin only)
router.put('/:id/status', admin, updateOrderStatus);

// Update payment status
router.put('/:id/payment', updatePaymentStatus);

export default router; 