const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { sendOrderConfirmationEmail } = require('../utils/mailer');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Load user's cart with populated products
    let cart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name imageUrl price');

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if cart is empty
    if (cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Build order items using cart snapshots
    const items = cart.items.map(item => ({
      product: item.product._id,
      size: item.size,
      quantity: item.quantity,
      price: item.price // snapshot
    }));

    // Compute total price
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = await Order.create({
      user: userId,
      items,
      totalPrice
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Get user info for email
    const user = await User.findById(userId).select('name email');

    // Build order summary for response
    const orderSummary = {
      orderId: order._id,
      orderDate: order.orderDate,
      totalPrice,
      items: cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        lineTotal: item.price * item.quantity
      }))
    };

    // Send confirmation email (non-blocking)
    try {
      await sendOrderConfirmationEmail({
        to: user.email,
        userName: user.name,
        order: {
          id: order._id,
          date: order.orderDate,
          items: orderSummary.items,
          totalPrice
        }
      });
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    res.status(201).json(orderSummary);
  } catch (error) {
    next(error);
  }
};

// @desc    Get my orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    // Find orders for the user, sorted by most recent first
    const orders = await Order.find({ user: userId })
      .populate('items.product', 'name imageUrl price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: userId });
    const pages = Math.ceil(total / limit);

    res.json({
      data: orders,
      page,
      pages,
      total,
      limit,
      hasPrev: page > 1,
      hasNext: page < pages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};