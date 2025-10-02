const express = require('express');
const { getProducts, getProductById } = require('../controllers/product.controller');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering, pagination, and sorting
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProductById);

module.exports = router;
