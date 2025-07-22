import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Navbar from './Navbar';
import ProductCardOne from './ProductCardOne';
import axios from 'axios';
import './products.css';
import './Salad.css'; // Import Salad.css

const Salad = ({ refreshCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          params: { category: 'SALAD', limit: 100 }
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
      <Banner imageUrl="/Images/Salad_Banner.webp" altText="Salad Banner" />
      <div className="main_container">
        <div className="create_bowl_outer">
          <div className="common_block image_bowl">
            <div className="overlayy"></div>
          </div>
          <div className="common_block create_bowl">
            <a href="#" className="create_circle">
              <span className="circle_title">CREATE</span>
            </a>
            <h3 className="create_title">CREATE YOUR PERFECT SALAD BOWL!</h3>
          </div>
        </div>
      </div>
      <section className="product-section">
        <h2 className="product-section-title" style={{ width: '100%', textAlign: 'center' }}>MORE TO BUY</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCardOne
              key={product._id}
              image={`/Images/${product.image}`}
              title={product.name}
              price={`PKR ${product.price?.toFixed(2)}`}
              sizes={product.sizes}
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

export default Salad; 