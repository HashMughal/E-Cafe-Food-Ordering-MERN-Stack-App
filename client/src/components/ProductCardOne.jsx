import React, { useState } from 'react';
import axios from 'axios';
import './ProductCardOne.css';

const ProductCardOne = ({ image, title, price, sizes, description, productId, onAddToCart }) => {
  const [activeSize, setActiveSize] = useState(sizes ? sizes[0] : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSizeClick = (size) => {
    setActiveSize(size);
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from localStorage
      const token = localStorage.getItem('token');

      const response = await axios.post(
        '/api/cart/add',
        {
          productId,
          quantity: 1
        },
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : undefined
      );

      if (response.data) {
        // You could add a toast notification here
        console.log('Added to cart successfully');
        if (onAddToCart) onAddToCart();
      }
    } catch (err) {
      setError('Failed to add to cart');
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card-one">
      <img src={image} alt={title} />
      <div className="product-info-one">
        <h3>{title}</h3>
        <p>{price}</p>
        <button 
          onClick={handleAddToCart} 
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="product-hover-one">
        <h3>{title}</h3>
        <p>{description}</p>
        {sizes && (
          <div className="sizes-one">
            {sizes.map((size) => (
              <span
                key={size}
                className={activeSize === size ? 'active' : ''}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </span>
            ))}
          </div>
        )}
        <p>{price}</p>
        <button 
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ProductCardOne;