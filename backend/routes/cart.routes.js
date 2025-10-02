const express = require('express');
const { getCart, addItem, updateItem, removeItem } = require('../controllers/cart.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', getCart);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', addItem);

// @route   PUT /api/cart/:itemId
// @desc    Update cart item (quantity or size)
// @access  Private
router.put('/:itemId', updateItem);

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/:itemId', removeItem);

module.exports = router;
