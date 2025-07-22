import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Checkout.css';

const TABS = {
  ORDERS: 'Orders',
  USERS: 'Users',
  ADD_PRODUCT: 'Add Product',
  PRODUCTS: 'Products',
};

// Define categories (should match Categories.jsx)
const CATEGORY_OPTIONS = [
  'BREAD',
  'CAKES',
  'SNACK',
  'PIZZA',
  'BISCUIT',
  'PASTRY',
  'DONUT',
  'SALAD',
  'SANDWICH',
  'BURGER',
  'NIMKO',
  'PUFF',
  'GIFTING',
  'KANAS KETCHUP',
  'PACKED ITEMS'
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS.ORDERS);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: ''
  });
  const [productSuccess, setProductSuccess] = useState('');
  const [productError, setProductError] = useState('');
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch orders and users on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in as admin.');
          setLoading(false);
          return;
        }
        const [ordersRes, usersRes] = await Promise.all([
          axios.get('/api/orders/all', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/auth/users', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        let msg = 'Failed to load admin data';
        if (err.response && err.response.data && err.response.data.message) {
          msg += ': ' + err.response.data.message;
        } else if (err.message) {
          msg += ': ' + err.message;
        }
        setError(msg);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products?limit=1000');
      setProducts(res.data.products || []);
    } catch (err) {
      // Optionally handle error
    }
  };

  // Fetch products when tab changes to PRODUCTS
  useEffect(() => {
    if (activeTab === TABS.PRODUCTS) {
      fetchProducts();
    }
  }, [activeTab]);

  // Handle order status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders => orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // Utility to generate slug from name
  const generateSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // Handle product form submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductSuccess('');
    setProductError('');
    if (!productForm.image) {
      setProductError('Please upload an image before submitting.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const slug = generateSlug(productForm.name);
      await axios.post('/api/products', { ...productForm, slug }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductSuccess('Product added successfully!');
      setProductForm({ name: '', price: '', image: '', category: '', description: '' });
    } catch (err) {
      let msg = 'Failed to add product';
      if (err.response && err.response.data && err.response.data.message) {
        msg += ': ' + err.response.data.message;
      } else if (err.message) {
        msg += ': ' + err.message;
      }
      setProductError(msg);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setProductError('');
    setProductSuccess('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/products/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setProductForm({ ...productForm, image: res.data.filename });
      setProductSuccess('Image uploaded successfully!');
    } catch (err) {
      setProductError('Failed to upload image');
    }
    setUploading(false);
  };

  // Delete product handler
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products => products.filter(p => p._id !== productId));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="checkout-container" style={{ maxWidth: 1400, margin: '2rem auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ minWidth: 220 }}>
          <div className="orders-list" style={{ gap: '1rem' }}>
            {Object.values(TABS).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: activeTab === tab ? '#28a745' : '#fff',
                  color: activeTab === tab ? '#fff' : '#333',
                  border: '1px solid #28a745',
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  marginBottom: 8,
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div className="checkout-loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              {activeTab === TABS.ORDERS && (
                <div>
                  <h2>All Orders</h2>
                  {orders.length === 0 ? <div>No orders found.</div> : (
                    <div className="orders-list">
                      {orders.map(order => (
                        <div className="order-card" key={order._id}>
                          <div className="order-header">
                            <span><b>Order ID:</b> {order._id}</span>
                            <span><b>User:</b> {order.user?.email || 'N/A'}</span>
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
                          {order.status === 'pending' && (
                            <button
                              style={{ marginTop: 12, background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
                              onClick={() => handleStatusChange(order._id, 'delivered')}
                            >
                              Mark as Delivered
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === TABS.USERS && (
                <div>
                  <h2>All Users</h2>
                  {users.length === 0 ? <div>No users found.</div> : (
                    <div className="orders-list">
                      {users.map(user => (
                        <div className="order-card" key={user._id}>
                          <div className="order-header">
                            <span><b>Name:</b> {user.firstName} {user.lastName}</span>
                            <span><b>Email:</b> {user.email}</span>
                            <span><b>Status:</b> {user.status}</span>
                            <span><b>Admin:</b> {user.isAdmin ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === TABS.ADD_PRODUCT && (
                <div>
                  <h2>Add Product</h2>
                  <form className="checkout-form" onSubmit={handleProductSubmit} style={{ maxWidth: 500 }}>
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Image</label>
                      <input type="text" value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} placeholder="Enter image filename or upload" />
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ marginTop: 8 }} />
                      {uploading && <div style={{ color: '#28a745', marginTop: 5 }}>Uploading...</div>}
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} required>
                        <option value="">Select Category</option>
                        {CATEGORY_OPTIONS.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} />
                    </div>
                    <button type="submit" className="place-order-btn">Add Product</button>
                    {productSuccess && <div className="success-message" style={{ color: '#28a745', marginTop: 10 }}>{productSuccess}</div>}
                    {productError && <div className="error-message" style={{ marginTop: 10 }}>{productError}</div>}
                  </form>
                </div>
              )}
              {activeTab === TABS.PRODUCTS && (
                <div>
                  <h2>All Products</h2>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Image</th>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Name</th>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Price</th>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Category</th>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id}>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}><img src={`/Images/${product.image}`} alt={product.name} style={{ width: 60, height: 60, objectFit: 'cover' }} /></td>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>{product.name}</td>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>{product.price}</td>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>{product.category}</td>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>
                            <button style={{ background: '#be1238', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 