const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Men', 'Women', 'Kids'],
    index: true
  },
  sizes: {
    type: [String],
    enum: ['S', 'M', 'L', 'XL'],
    default: ['S', 'M', 'L', 'XL']
  }
}, {
  timestamps: true
});

// Indexes for search and filtering
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
