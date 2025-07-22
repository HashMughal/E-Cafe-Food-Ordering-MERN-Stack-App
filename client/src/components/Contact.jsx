import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="container">
      <h1>GET IN TOUCH WITH US</h1>
      <p className="intro">
        Our customer service department will do everything in its power to respond to you as soon
        as possible. For any inquiries, we are available at any time through the form below.
      </p>

      <div className="content">
        {/* Form Section */}
        <div className="form-section">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">What would you like to know? *</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info">
          <h3>Let's talk about Tehzeeb</h3>
          <p>To request a quote or want to meet up for coffee, feel free to contact us directly.</p>
          <h4>Get in touch with us via</h4>
          <p><span className="icon">🌐</span> Tehzeeb Bakers Islamabad Pakistan</p>
          <p><span className="icon">✉️</span> customer.care@tehzeeb.com</p>
          <p><span className="icon">📞</span> (051)042-111-CAKE (2253)</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <img src="Images/map.png" alt="Map of Tehzeeb Bakers" />
      </div>
    </div>
  );
};

export default Contact; 