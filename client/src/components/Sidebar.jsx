import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
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

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3>Categories</h3>
        <ul>
          <li><Link to="/bread">Bread <i className="fas fa-chevron-right"></i></Link></li>
          <li><Link to="/cakes">Cakes <i className="fas fa-chevron-right"></i></Link></li>
          <li><Link to="/snacks">Snack</Link></li>
          <li><Link to="/pizza">Pizza</Link></li>
          <li><Link to="/biscuits">Biscuit</Link></li>
          <li><Link to="/pastry">Pastry <i className="fas fa-chevron-right"></i></Link></li>
          <li><Link to="/donuts">Donut</Link></li>
          <li><Link to="/salad">Salad</Link></li>
          <li><Link to="/sandwich">Sandwich</Link></li>
          <li><Link to="/burger">Burger</Link></li>
          <li><Link to="/nimko">Nimko</Link></li>
          <li><Link to="/puffs">Puff</Link></li>
          <li><Link to="/gifting">Gifting</Link></li>
          <li><Link to="/ketchup">Kanas Ketchup</Link></li>
          <li><Link to="/packed-items">Packed Items</Link></li>
          <li><Link to="/royal-biscuits">Royal Biscuits</Link></li>
        </ul>
        <h3><Link to="/login">Accounts</Link></h3>
        <h3><Link to="/contact">Contact Us</Link></h3>
        <h3><Link to="/about">About Us</Link></h3>
      </div>
      {isOpen && <div className="overlay active" onClick={onClose} />}
    </>
  );
};

export default Sidebar; 