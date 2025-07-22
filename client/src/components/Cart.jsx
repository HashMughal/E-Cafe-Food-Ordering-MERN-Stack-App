import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = ({ isOpen, onClose, cartRefreshKey }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cart', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setCartItems(response.data.items || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cart');
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, cartRefreshKey]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cart/remove/${productId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setCartItems(cartItems.filter(item => item.product._id !== productId));
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/cart/update', {
        productId,
        quantity: newQuantity
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setCartItems(response.data.items);
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      // If not logged in, show confirmation dialog
      const shouldCreateAccount = window.confirm(
        'You need to create an account to place an order. Would you like to create an account now?'
      );
      if (shouldCreateAccount) {
        navigate('/signup');
      }
    } else {
      // If logged in, proceed to checkout
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close-btn" onClick={onClose}>Close</button>
        </div>
        <div className="cart-content">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            Close
          </button>
        </div>

        <div className="cart-content">
          {error && <div className="error-message">{error}</div>}
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-bag"></i>
              <p>You have no items in your shopping cart.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.product._id} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '18px', background: '#faf7f2', borderRadius: '12px', padding: '10px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <img 
                      src={`/Images/${item.product.image}`} 
                      alt={item.product.name} 
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', marginRight: '14px', background: '#fff' }}
                    />
                    <div className="item-details" style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '17px', margin: '0 0 4px 0', fontWeight: 500 }}>{item.product.name}</h4>
                      <p className="price" style={{ color: '#d32f2f', fontWeight: 600, margin: 0 }}>Rs. {item.price}</p>
                      <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} style={{ padding: '2px 10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
                          <i className="fas fa-minus" style={{ fontSize: '20px' }}></i>
                        </button>
                        <span style={{ margin: '0 10px', fontWeight: 500 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} style={{ padding: '2px 10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
                          <i className="fas fa-plus" style={{ fontSize: '20px' }}></i>
                        </button>
                      </div>
                    </div>
                    <button 
                      className="remove-item" 
                      onClick={() => removeItem(item.product._id)}
                      aria-label="Remove item"
                      style={{ background: 'none', border: 'none', color: '#d32f2f', fontSize: '20px', marginLeft: '8px', cursor: 'pointer' }}
                    >
                      <i className="fas fa-times" style={{ fontSize: '20px' }}></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span>Rs. {calculateTotal()}</span>
                </div>
                <div className="shipping">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="total">
                  <span>Total:</span>
                  <span>Rs. {calculateTotal()}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="checkout-btn" onClick={handleCheckout}>
                  {isLoggedIn ? 'Proceed to Checkout' : 'Create Account to Checkout'}
                </button>
                <button className="continue-shopping" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isOpen && <div className="overlay active" onClick={onClose} />}
    </>
  );
};

export default Cart; 