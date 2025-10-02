const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering, pagination, and sorting
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin)
router.post('/', protect, admin, createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put('/:id', protect, admin, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
