import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Navbar from './Navbar';
import ProductCardOne from './ProductCardOne';
import axios from 'axios';
import './products.css';
import './Gifting.css'; // Import Gifting.css

const Gifting = ({ refreshCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          params: { category: 'GIFTING', limit: 100 }
        });
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (<><Navbar /><div className="loading">Loading...</div></>);
  if (error) return (<><Navbar /><div className="error-message">{error}</div></>);

  return (
    <>
      <Navbar />
      <Banner imageUrl="/Images/Gifting_Banner.webp" altText="Gifting Banner" />
      <section className="product-section">
        <h2 style={{ width: '100%', textAlign: 'center' }}>Gifting</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCardOne
              key={product._id}
              image={`/Images/${product.image}`}
              title={product.name}
              price={`PKR ${product.price?.toFixed(2)}`}
              description={product.description}
              productId={product._id}
              onAddToCart={refreshCart}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Gifting; 