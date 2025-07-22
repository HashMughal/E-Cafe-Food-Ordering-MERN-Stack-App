import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, title }) => {
    return (
        <div className="product">
            <img src={image} alt={title} />
            <h3>{title}</h3>
        </div>
    );
};

export default ProductCard; 