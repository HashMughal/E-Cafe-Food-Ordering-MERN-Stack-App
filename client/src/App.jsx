import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import Categories from './components/Categories';
import FeaturedSection from './components/FeaturedSection';
import VideosSection from './components/VideosSection';
import AboutSection from './components/AboutSection';
import Sidebar from './components/Sidebar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Bread from './components/Bread';
import Cakes from './components/Cakes';
import Pastry from './components/Pastry';
import Pizza from './components/Pizza';
import Biscuits from './components/Biscuits';
import Puffs from './components/Puffs';
import Snacks from './components/Snacks';
import Gifting from './components/Gifting';
import Salad from './components/Salad';
import Delivery from './components/Delivery';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import About from './components/About';
import Profile from './pages/Profile';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  // Handle cart toggle
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Close both sidebars
  const closeSidebars = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  };

  // Close menu
  const closeMenu = () => setIsMenuOpen(false);

  // Close cart
  const closeCart = () => setIsCartOpen(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSidebars();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Auth routes without header and footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* All other routes with header and footer */}
          <Route path="*" element={
            <>
              <Sidebar 
                isMenuOpen={isMenuOpen}
                isCartOpen={isCartOpen}
                onCloseMenu={closeMenu}
                onCloseCart={closeCart}
                onToggleMenu={toggleMenu}
                onToggleCart={toggleCart}
              />
              
              <Cart isOpen={isCartOpen} onClose={closeCart} />
              
              <Header onToggleMenu={toggleMenu} onToggleCart={toggleCart} />
              
              <main>
                <Routes>
                  <Route path="/" element={
                    <>
                      <MainBanner imageUrl="/Images/6_1.webp" altText="Tehzeeb Bakery Banner" />
                      <Categories />
                      <FeaturedSection />
                      <VideosSection />
                      <AboutSection />
                    </>
                  } />
                  <Route path="/bread" element={<Bread />} />
                  <Route path="/cakes" element={<Cakes />} />
                  <Route path="/pastry" element={<Pastry />} />
                  <Route path="/pizza" element={<Pizza />} />
                  <Route path="/biscuits" element={<Biscuits />} />
                  <Route path="/puffs" element={<Puffs />} />
                  <Route path="/snacks" element={<Snacks />} />
                  <Route path="/gifting" element={<Gifting />} />
                  <Route path="/salad" element={<Salad />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 