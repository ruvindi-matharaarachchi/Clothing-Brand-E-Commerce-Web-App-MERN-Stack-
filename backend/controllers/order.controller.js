const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    // Calculate total price
    const totalPrice = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Create order
    const order = await Order.create({
      user: userId,
      items,
      totalPrice
    });

    // TODO: Send email with Nodemailer
    console.log('Order created, email sending not implemented yet');

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name imageUrl')
      .sort({ orderDate: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
