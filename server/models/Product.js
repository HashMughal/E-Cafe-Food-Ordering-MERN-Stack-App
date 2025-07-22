import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'BREAD', 'CAKES', 'SNACK', 'PIZZA', 'BISCUIT', 'PASTRY', 
      'DONUT', 'SALAD', 'SANDWICH', 'BURGER', 'NIMKO', 'PUFF', 
      'GIFTING', 'KANAS KETCHUP', 'PACKED ITEMS'
    ]
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  sizes: [{
    type: String,
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large', 'Regular']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product; 