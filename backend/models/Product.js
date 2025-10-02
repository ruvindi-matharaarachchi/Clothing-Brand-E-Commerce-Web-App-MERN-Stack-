const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: false,
    index: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  imageUrl: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Men', 'Women', 'Kids']
  },
  sizes: {
    type: [String],
    enum: ['S', 'M', 'L', 'XL'],
    default: ['S', 'M', 'L', 'XL']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
