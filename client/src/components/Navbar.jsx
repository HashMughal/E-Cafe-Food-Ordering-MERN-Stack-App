// NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1);

  const getDisplayName = (path) => {
    if (path === '') return 'Home';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="nav-bar">
      <div className="_first">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/bread">Bread</Link></li>
          <li className="nav-item"><Link to="/cakes">Cakes</Link></li>
          <li className="nav-item"><Link to="/snack">Snack</Link></li>
          <li className="nav-item"><Link to="/pizza">Pizza</Link></li>
          <li className="nav-item"><Link to="/biscuit">Biscuit</Link></li>
          <li className="nav-item"><Link to="/pastry">Pastry</Link></li>
          <li className="nav-item"><Link to="/donut">Donut</Link></li>
          <li className="nav-item"><Link to="/salad">Salad</Link></li>
          <li className="nav-item"><Link to="/sandwich">Sandwich</Link></li>
          <li className="nav-item"><Link to="/burger">Burger</Link></li>
          <li className="nav-item"><Link to="/nimko">Nimko</Link></li>
          <li className="nav-item"><Link to="/puffs">Puffs</Link></li>
          <li className="nav-item"><Link to="/gifting">Gifting</Link></li>
          <li className="nav-item"><Link to="/kanas-ketchup">Kanas Ketchup</Link></li>
          <li className="nav-item"><Link to="/packed-items">Packed Items</Link></li>
          <li className="nav-item"><Link to="/best-sellers">Best Sellers</Link></li>
          <li className="nav-item"><Link to="/royal-biscuits">Royal Biscuits</Link></li>
        </ul>
      </div>
      <div className="_second">
        <ul>
          <li><i className="fa fa-home" aria-hidden="true"></i></li>
          <li><span>{getDisplayName(currentPage)}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;