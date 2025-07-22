import React from 'react';
import './Delivery.css';

const Delivery = () => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">HOW DO YOU WANT YOUR ITEM?</h5>
      </div>
      <div className="modal-body">
        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button type="button" className="btn btn-outline-dark">
            <i className="fas fa-motorcycle"></i> DELIVERY
          </button>
          <button type="button" className="btn btn-primary">
            <i className="fas fa-shopping-bag"></i> PICKUP
          </button>
        </div>

        {/* Sign In Text */}
        <div className="sign-in-text">
          For better experience please <a href="#">Sign in</a>
        </div>

        {/* Find Bakery Button */}
        <button type="button" className="find-bakery-btn">FIND NEAREST BAKERY</button>

        {/* Map Container */}
        <div className="map-container">
          <img src="Images/map.png" alt="Map" />
        </div>

        {/* Location Dropdown */}
        <select className="location-select">
          <option>Islamabad</option>
          <option selected>Tehzeeb Bakers (Blue Area)</option>
          <option>Tehzeeb Bakers (Other Location)</option>
        </select>

        {/* Closing Time */}
        <div className="closing-time">
          PICKUP Closing Time: 12:00 AM
        </div>

        {/* Save Button */}
        <button type="button" className="save-btn">SAVE</button>
      </div>
    </div>
  );
};

export default Delivery; 