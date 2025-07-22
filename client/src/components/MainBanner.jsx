import React from 'react';
import './MainBanner.css';

const MainBanner = ({ imageUrl, altText }) => {
  return (
    <div className="main-banner">
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default MainBanner; 