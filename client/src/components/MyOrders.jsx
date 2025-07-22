import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Checkout.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/orders/my-orders', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="checkout-loading">Loading orders...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="checkout-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-cart-message">
          <h2>You have not placed any orders yet.</h2>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <span><b>Order ID:</b> {order._id}</span>
                <span><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</span>
                <span><b>Status:</b> {order.status}</span>
                <span><b>Total:</b> Rs. {order.totalAmount}</span>
              </div>
              <div className="order-items">
                {order.items.map(item => (
                  <div className="checkout-item" key={item.product._id}>
                    <img src={`/Images/${item.product.image}`} alt={item.product.name} />
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: Rs. {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders; 