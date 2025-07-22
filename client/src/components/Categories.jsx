import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'BREAD', image: 'Images/Bun-grey-512z512.webp', link: '/bread' },
    { id: 2, name: 'CAKES', image: 'Images/Cake-grey-512x512.webp', link: '/cakes' },
    { id: 3, name: 'SNACK', image: 'Images/Roll-2-grey-512x512.webp', link: '/snacks' },
    { id: 4, name: 'PIZZA', image: 'Images/pizzaa-grey-512x512_1_.webp', link: '/pizza' },
    { id: 5, name: 'BISCUIT', image: 'Images/Royal-biscuit-grey-512x512.webp', link: '/biscuits' },
    { id: 6, name: 'PASTRY', image: 'Images/Pastry-grey-512x512.webp', link: '/pastry' },
    { id: 7, name: 'DONUT', image: 'Images/Donut-grey-512x512_1_.webp', link: '/donuts' },
    { id: 8, name: 'SALAD', image: 'Images/salad-grey-512x512.webp', link: '/salad' },
    { id: 9, name: 'SANDWICH', image: 'Images/Sandwich-grey-512x512.webp', link: '/sandwich' },
    { id: 10, name: 'BURGER', image: 'Images/Jalapeno-Burger-grey-512x512.webp', link: '/burger' },
    { id: 11, name: 'NIMKO', image: 'Images/Nimko-grey-512x512.webp', link: '/nimko' },
    { id: 12, name: 'PUFF', image: 'Images/puff-grey-512x512.webp', link: '/puffs' },
    { id: 13, name: 'GIFTING', image: 'Images/Gifrbasket-grey-512x512_1_.webp', link: '/gifting' },
    { id: 14, name: 'KANAS KETCHUP', image: 'Images/Tomat-ketchup-gray-512x512.webp', link: '/ketchup' },
    { id: 15, name: 'PACKED ITEMS', image: 'Images/countryside-grey-512x512.webp', link: '/packed-items' }
  ];

  return (
    <section className="categories">
      <h2>Categories</h2>
      <div className="products-grid">
        {categories.map((category) => (
          <Link to={category.link} key={category.id} className="product">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories; 