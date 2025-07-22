import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cash'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cart', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setCart(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cart');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        paymentMethod: formData.paymentMethod
      };
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/orders', orderData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setShowSuccess(true);
    } catch (err) {
      setError('Failed to place order');
    }
  };

  if (loading) {
    return <div className="checkout-loading">Loading...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart-message">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {error && <div className="error-message">{error}</div>}

      {showSuccess && (
        <div className="order-success-modal">
          <div className="order-success-content">
            <h2>Order Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </div>
      )}

      <div className="checkout-content" style={{ filter: showSuccess ? 'blur(2px)' : 'none', pointerEvents: showSuccess ? 'none' : 'auto' }}>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item.product._id} className="checkout-item">
                <img src={`/Images/${item.product.image}`} alt={item.product.name} />
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: Rs. {item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>Rs. {cart.totalAmount}</span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span>Rs. {cart.totalAmount}</span>
            </div>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 