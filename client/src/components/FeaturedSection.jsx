import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedSection.css';

const FeaturedSection = () => {
  return (
    <>
      <section className="cake-section">
        <div className="cake-content">
          <h2>Coffee Fudge Cake</h2>
          <p>Our iconic cake, loved throughout generations.<br />
            Perfectly moist sponge, rich and creamy.<br />
            Have it with tea or coffee for a perfect afternoon.
          </p>
          <Link to="/cakes" className="order-button">Order Now</Link>
        </div>
      </section>

      <section className="gifting-section">
        <h2 className="gifting-title">GIFTING</h2>
        <p className="gifting-description">
          Our gifting collection is thoughtfully crafted to bring joy and a smile to your face. Whether it's a birthday,
          anniversary, or your special day, a gift from Tehzeeb Bakers is a wonderful way to express your care for your
          loved one.
        </p>
        <div className="gifting-items">
          <div className="gifting-item">
            <img src="Images/gifting1.webp" alt="Basket" className="gifting-img" />
            <span className="gifting-label">BASKET</span>
          </div>
          <div className="gifting-item">
            <img src="Images/gifting2.webp" alt="Biscuits" className="gifting-img" />
            <span className="gifting-label">BISCUITS</span>
          </div>
          <div className="gifting-item">
            <img src="Images/gifting3.webp" alt="Cakes" className="gifting-img" />
            <span className="gifting-label">CAKES</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedSection; 