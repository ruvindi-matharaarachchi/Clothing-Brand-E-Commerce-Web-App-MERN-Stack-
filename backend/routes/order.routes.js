const express = require('express');
const { createOrder, getMyOrders } = require('../controllers/order.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', createOrder);

// @route   GET /api/orders/my
// @desc    Get user's orders
// @access  Private
router.get('/my', getMyOrders);

module.exports = router;
