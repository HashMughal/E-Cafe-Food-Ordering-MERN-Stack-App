import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config.env') });

const products = [
  // Biscuits
  {
    name: 'Milk & Butter Biscuits',
    description: 'Our Milk & Butter Biscuits are the perfect tea-time companions.',
    price: 705,
    category: 'BISCUIT',
    image: 'royal.jpg',
    sizes: ['Regular', 'Large']
  },
  {
    name: 'Pistachio Biscuits',
    description: 'Experience the rich flavor of pistachios.',
    price: 705,
    category: 'BISCUIT',
    image: 'royal.jpg',
    sizes: ['Regular', 'Large']
  },
  {
    name: 'Coconut Biscuits',
    description: 'Sweet and crunchy coconut biscuits.',
    price: 705,
    category: 'BISCUIT',
    image: 'royal.jpg',
    sizes: ['Regular', 'Large']
  },
  {
    name: 'Chocolate Chip Biscuits',
    description: 'Classic chocolate chip goodness.',
    price: 705,
    category: 'BISCUIT',
    image: 'royal.jpg',
    sizes: ['Regular', 'Large']
  },
  {
    name: 'Almond Biscuits',
    description: 'Delicious almond-flavored biscuits.',
    price: 705,
    category: 'BISCUIT',
    image: 'royal.jpg',
    sizes: ['Regular', 'Large']
  },
  {
    name: 'Ginger Biscuits',
    description: 'Spicy and sweet ginger biscuits.',
    price: 705,
    category: 'BISCUIT',
    image: 'royal.jpg',
    sizes: ['Regular', 'Large']
  },
  // Bread
  {
    name: 'WHITE BREAD',
    description: 'Classic white bread, soft and fresh.',
    price: 120,
    category: 'BREAD',
    image: 'bread1.webp',
    sizes: []
  },
  {
    name: 'BROWN BREAD',
    description: 'Healthy brown bread, rich in fiber.',
    price: 130,
    category: 'BREAD',
    image: 'bread2.webp',
    sizes: []
  },
  {
    name: 'SPECIAL BREAD',
    description: 'Special recipe bread for unique taste.',
    price: 150,
    category: 'BREAD',
    image: 'bread3.webp',
    sizes: []
  },
  {
    name: 'CROISSANT',
    description: 'Flaky and buttery croissant.',
    price: 180,
    category: 'BREAD',
    image: 'bread3.webp',
    sizes: []
  },
  // Cakes
  {
    name: 'FRESH CREAM CAKE',
    description: 'Soft cake with fresh cream.',
    price: 1200,
    category: 'CAKES',
    image: 'cake1.webp',
    sizes: []
  },
  {
    name: 'DRY CAKE',
    description: 'Delicious dry cake.',
    price: 900,
    category: 'CAKES',
    image: 'cake2.webp',
    sizes: []
  },
  {
    name: 'CHOCOLATE CAKE',
    description: 'Rich chocolate cake.',
    price: 1300,
    category: 'CAKES',
    image: 'cake3.jpg',
    sizes: []
  },
  {
    name: 'SPECIAL CAKE',
    description: 'Special cake with fresh cream.',
    price: 1500,
    category: 'CAKES',
    image: 'Fresh_cream_cake.webp',
    sizes: []
  },
  // Gifting
  {
    name: 'Gift Box 1',
    description: 'A beautiful gift box with assorted treats.',
    price: 1500,
    category: 'GIFTING',
    image: 'gifting1.webp',
    sizes: []
  },
  {
    name: 'Gift Box 2',
    description: 'Premium selection of baked goods in an elegant box.',
    price: 2000,
    category: 'GIFTING',
    image: 'gifting2.webp',
    sizes: []
  },
  {
    name: 'Gift Box 3',
    description: 'Luxurious gift box for special occasions.',
    price: 2500,
    category: 'GIFTING',
    image: 'gifting3.webp',
    sizes: []
  },
  {
    name: 'Custom Hamper',
    description: 'Create your own custom hamper with a variety of items.',
    price: 3000,
    category: 'GIFTING',
    image: 'gifting3.webp',
    sizes: []
  },
  // Pastry
  {
    name: 'CHOCOLATE PASTRY',
    description: 'Chocolate flavored pastry.',
    price: 250,
    category: 'PASTRY',
    image: 'pastry1.webp',
    sizes: []
  },
  {
    name: 'VANILLA PASTRY',
    description: 'Vanilla flavored pastry.',
    price: 250,
    category: 'PASTRY',
    image: 'pastry2.webp',
    sizes: []
  },
  {
    name: 'STRAWBERRY PASTRY',
    description: 'Strawberry flavored pastry.',
    price: 250,
    category: 'PASTRY',
    image: 'pastry3.webp',
    sizes: []
  },
  // Pizza
  {
    name: 'Vegetarian Pizza',
    description: 'A delicious veggie mix on a cheesy base.',
    price: 705,
    category: 'PIZZA',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
  },
  {
    name: 'Cheese & Tomato Pizza',
    description: 'Classic favorite, featuring a rich and creamy blend of melted cheddar mozzarella.',
    price: 705,
    category: 'PIZZA',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
  },
  {
    name: 'Mortadella Pizza',
    description: 'Loaded with mortadella slices, olives and cheese.',
    price: 705,
    category: 'PIZZA',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
  },
  {
    name: 'Chicken Supreme Pizza',
    description: 'A delicious combo of chicken, veggies, and cheese.',
    price: 705,
    category: 'PIZZA',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
  },
  {
    name: 'Fajita Pizza',
    description: 'Spicy fajita chicken with onions and capsicum.',
    price: 705,
    category: 'PIZZA',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
  },
  {
    name: 'Tikka Pizza',
    description: 'Classic chicken tikka flavor with a blend of spices.',
    price: 705,
    category: 'PIZZA',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
  },
  // Salad
  {
    name: 'Chicken Caesar Salad',
    description: 'A classic Caesar salad featuring crisp romaine lettuce, grilled chicken breast, Parmesan cheese, croutons, and a creamy Caesar dressing.',
    price: 650,
    category: 'SALAD',
    image: 'salad1.webp',
    sizes: ['Small', 'Regular', 'Large']
  },
  {
    name: 'Mixed Green Salad',
    description: 'A refreshing blend of various fresh greens, cherry tomatoes, cucumbers, and a light vinaigrette dressing.',
    price: 550,
    category: 'SALAD',
    image: 'salad2.webp',
    sizes: ['Small', 'Regular', 'Large']
  },
  {
    name: 'Pasta Salad',
    description: 'A hearty pasta salad with a colorful mix of vegetables, tender pasta, and a zesty dressing.',
    price: 700,
    category: 'SALAD',
    image: 'salad3.webp',
    sizes: ['Small', 'Regular', 'Large']
  },
  {
    name: 'Fruit Salad',
    description: 'A delightful mix of fresh seasonal fruits, offering a sweet and healthy treat.',
    price: 400,
    category: 'SALAD',
    image: 'pizza_10_of_13_.webp',
    sizes: ['Small', 'Regular', 'Large']
  },
  // Snacks
  {
    name: 'Chicken Patty',
    description: 'A savory chicken patty, perfect for a quick bite.',
    price: 150,
    category: 'SNACK',
    image: 'snack1.webp',
    sizes: []
  },
  {
    name: 'Vegetable Patty',
    description: 'Healthy and delicious vegetable patty.',
    price: 150,
    category: 'SNACK',
    image: 'snack2.webp',
    sizes: []
  },
  {
    name: 'Chicken Samosa',
    description: 'Crispy samosa filled with spiced chicken.',
    price: 120,
    category: 'SNACK',
    image: 'snack3.png',
    sizes: []
  },
  {
    name: 'Vegetable Samosa',
    description: 'Classic samosa with a flavorful vegetable filling.',
    price: 120,
    category: 'SNACK',
    image: 'snack1.webp',
    sizes: []
  },
  {
    name: 'Spring Roll',
    description: 'Crunchy spring rolls with a mix of vegetables.',
    price: 130,
    category: 'SNACK',
    image: 'snack2.webp',
    sizes: []
  },
  {
    name: 'Pizza Slice',
    description: 'A single slice of delicious pizza.',
    price: 200,
    category: 'SNACK',
    image: 'snack3.png',
    sizes: []
  },
  // Puff
  {
    name: 'Chicken Puff',
    description: 'Flaky pastry filled with seasoned chicken.',
    price: 120,
    category: 'PUFF',
    image: '1.webp',
    sizes: []
  },
  {
    name: 'Vegetable Puff',
    description: 'Crispy puff pastry stuffed with mixed vegetables.',
    price: 100,
    category: 'PUFF',
    image: '2.webp',
    sizes: []
  },
  {
    name: 'Cheese Puff',
    description: 'Delicious puff pastry with a cheesy filling.',
    price: 130,
    category: 'PUFF',
    image: '3.webp',
    sizes: []
  },
];

// Slugify function
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^a-z0-9\-]/g, '')    // Remove all non-alphanumeric chars except -
    .replace(/\-+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
}

products.forEach((product, idx) => {
  product.slug = slugify(product.name) + (products.findIndex(p => p.name === product.name) === idx ? '' : '-' + idx);
});

async function seedProducts() {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts(); 