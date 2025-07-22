import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Banner from './Banner';
import Navbar from './Navbar';
import axios from 'axios';
import './products.css';

const Cakes = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products', {
                    params: { category: 'CAKES', limit: 100 }
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
            <Banner imageUrl="/Images/Cake_Banner.webp" altText="Cakes Banner" />
            <section className="categories">
                <h2>Categories</h2>
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            image={`/Images/${product.image}`}
                            title={product.name}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Cakes; 