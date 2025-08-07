const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
    maxlength: [100, 'Food name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['all', 'beverages', 'desserts', 'main-course', 'snacks', 'special']
  },
  isVeg: {
    type: Boolean,
    required: true,
    default: true
  },
  available: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true
  }],
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  isSpecial: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better search performance
foodSchema.index({ name: 'text', description: 'text' });
foodSchema.index({ category: 1, available: 1 });

module.exports = mongoose.model('Food', foodSchema);