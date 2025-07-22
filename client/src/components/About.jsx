import React from 'react';
import './About.css';
import Banner from './Banner';
import NavBar from './Navbar';

const About = () => {
  return (
    <div className="about-page">
      {/* Main Content */}
      <div className="about-content">
        {/* Navigation Bar */}
        <NavBar />

        {/* Banner Section */}
        <Banner 
          imageUrl="/Images/aboutus_banner.webp" 
          altText="About Banner" 
        />

        {/* Container Section */}
        <div className="container">
          <div className="image-container">
            <img src="/Images/two_col_pic.webp" alt="About Image" />
          </div>
          <div className="text-container">
            <h1>ABOUT US</h1>
            <p>
              Welcome to Riwayat e Afaq, where tradition meets innovation in the art of baking. 
              Our journey began with a simple passion for creating exceptional baked goods that 
              bring joy to people's lives.
            </p>
            <p>
              At Riwayat e Afaq, we believe in using only the finest ingredients, sourced locally 
              whenever possible, to create our delicious range of products. From our signature 
              cakes to our artisanal breads, each item is crafted with care and attention to detail.
            </p>
            <p>
              Our team of skilled bakers combines traditional techniques with modern innovation 
              to create unique and memorable flavors. We take pride in our commitment to quality 
              and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Classic Baking Section */}
        <div className="classic-baking">
          <h2 className="baking-title">CLASSIC BAKING</h2>
          <h3 className="baking-subtitle">TRADITIONAL RECIPES</h3>
          <p className="baking-text">
            Our commitment to traditional baking methods sets us apart. We use time-honored 
            recipes passed down through generations, combined with modern techniques to create 
            the perfect balance of taste and texture.
          </p>
          <a href="/products" className="read-more">READ MORE</a>
          <p className="locations">LOCATIONS: KARACHI, LAHORE, ISLAMABAD</p>
        </div>

        {/* Cake Section */}
        <section className="cake-section">
          <div className="cake-text">
            <h1>Walnut Fudge Cake</h1>
            <p>An exclusive collection of cakes at Tehzeeb. Perfect for your teatime.</p>
            <div className="divider">
              <span>❦</span>
            </div>
            <div className="circle"></div>
          </div>
          <div className="cake-image">
            <img src="/Images/chiken_abooutt.webp" alt="Walnut Fudge Cake" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 