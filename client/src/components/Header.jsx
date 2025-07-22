import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import './Header.css';
import Sidebar from './Sidebar';
import Cart from './Cart';
import ProductCardOne from './ProductCardOne';
import Pizza from './Pizza';
import Biscuits from './Biscuits';
import Gifting from './Gifting';
import Salad from './Salad';
import Snacks from './Snacks';
import Puffs from './Puffs';

const Header = ({ onToggleMenu, onToggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartRefreshKey, setCartRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const deliveryText = document.querySelector('.delivery_txt');
      const deliveryTextHeight = deliveryText?.offsetHeight || 0;
      setIsSticky(window.scrollY > deliveryTextHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in by looking for token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    if (!isCartOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const toggleCart = () => {
    if (!isMenuOpen) {
      setIsCartOpen(!isCartOpen);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);
  const closeCart = () => setIsCartOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const refreshCart = () => setCartRefreshKey(prev => prev + 1);

  return (
    <>
      <div className="delivery_txt">
        <p className="text">
          Delivering Nationwide.
          <a href="tel:051111112253">051-111-11-2253</a>
          <i> | </i>
          <a href="tel:042111112253">042-111-11-2253</a>
        </p>
      </div>
      
      <header className={isSticky ? 'sticky' : ''}>
        <div className="left">
          <div className="lefttop">
            <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle menu">
              <i className="fas fa-bars"></i>
            </button>
            <span>HOW DO YOU WANT YOUR PRODUCTS?</span>
          </div>
          <div className="leftbottom">
            <Link to="/pizza">PIZZA</Link>
            <Link to="/cakes">CAKES</Link>
            <Link to="/biscuits">BISCUITS</Link>
            <Link to="/pastry">PASTRY</Link>
            <Link to="/bread">BREAD</Link>
            <Link to="/puffs">PUFFS</Link>
          </div>
        </div>

        <div className="center">
          <Link to="/" className="logo">
            <img src="/Images/Tehzeeb-Logo-PNG1.webp" alt="Tehzeeb Logo" />
          </Link>
        </div>

        <div className="right">
          <div className="righttop">
            <i className="fas fa-phone"></i>
            <span>CALL US</span>
            <div className="search-bar">
              <input type="text" placeholder="Search Tehzeeb" />
              <i className="fas fa-search"></i>
            </div>
            {isLoggedIn ? (
              <div className="user-menu">
                <Link to="/profile">
                  <i className="fas fa-user-circle"></i>
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <Link to="/login">
                <i className="fas fa-user"></i>
              </Link>
            )}
            <button className="orders-nav-btn" onClick={() => navigate('/my-orders')} aria-label="My Orders" title="My Orders">
              <i className="fas fa-list-alt"></i>
            </button>
            <button className="checkout-nav-btn" onClick={() => navigate('/checkout')} aria-label="Go to checkout" title="Checkout">
              <i className="fas fa-credit-card"></i>
            </button>
            <button className="cart-toggle-btn" onClick={toggleCart} aria-label="Toggle cart">
              <i className="fas fa-shopping-bag"></i>
            </button>
          </div>
          <div className="rightbottom">
            <Link to="/gifting">GIFTING</Link>
            <Link to="/delivery">DELIVER NATIONWIDE</Link>
            <Link to="/snacks">SNACKS</Link>
            <Link to="/salad">SALAD</Link>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
      <Cart isOpen={isCartOpen} onClose={closeCart} cartRefreshKey={cartRefreshKey} />
    </>
  );
};

export default Header; 