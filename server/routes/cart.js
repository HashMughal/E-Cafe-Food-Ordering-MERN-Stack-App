import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get cart
router.get('/', getCart);

// Add to cart
router.post('/add', addToCart);

// Update cart item
router.put('/update', updateCartItem);

// Remove from cart
router.delete('/remove/:productId', removeFromCart);

// Clear cart
router.delete('/clear', clearCart);

export default router; 