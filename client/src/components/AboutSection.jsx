import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <>
      <section className="classic-baking">
        <h2 className="baking-title">THE CLASSIC BAKING TRADITION</h2>
        <h3 className="baking-subtitle">114 YEARS OF LEGACY</h3>
        <p className="baking-text">
          Tehzeeb is a culture, tradition, lifestyle and class of Pakistan, with a legacy of more than 114 years. <br />
          The bakery is exceedingly popular among the society including Presidents, Prime Ministers, <br />
          Diplomats, Royalties and their families visiting Pakistan from all across the world. <br />
          We believe in making this world a better place by sharing love, empathy and happiness.
        </p>
        <Link to="/about" className="read-more">Read more</Link>
        <div className="locations">
          Islamabad | Rawalpindi | Lahore | Wah
        </div>
      </section>

      <section className="imagescatch">
        <img src="Images/scatch.webp" alt="Tehzeeb Bakery Building" />
      </section>
    </>
  );
};

export default AboutSection; 