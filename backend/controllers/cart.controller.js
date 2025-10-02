const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Constants
const ALLOWED_SIZES = ['S', 'M', 'L', 'XL'];

// Helper function to compute cart summary
const computeSummary = (cart) => {
  const items = cart.items.map(item => ({
    id: item._id,
    product: item.product._id || item.product,
    name: item.product.name || 'Unknown Product',
    imageUrl: item.product.imageUrl || '',
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    lineTotal: item.quantity * item.price
  }));

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  return {
    items,
    itemCount,
    subtotal,
    updatedAt: cart.updatedAt
  };
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find or create cart for user
    let cart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name imageUrl price');

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const summary = computeSummary(cart);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addItem = async (req, res, next) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!productId || !size || !quantity) {
      return res.status(400).json({ 
        message: 'productId, size, and quantity are required' 
      });
    }

    // Validate size
    if (!ALLOWED_SIZES.includes(size)) {
      return res.status(400).json({ 
        message: `Invalid size. Must be one of: ${ALLOWED_SIZES.join(', ')}` 
      });
    }

    // Validate quantity
    const qty = Number(quantity);
    if (!qty || qty < 1 || !Number.isInteger(qty)) {
      return res.status(400).json({ 
        message: 'Quantity must be a positive integer' 
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Fetch product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product has the requested size
    if (!product.sizes.includes(size)) {
      return res.status(400).json({ 
        message: `Product does not have size ${size}. Available sizes: ${product.sizes.join(', ')}` 
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if item already exists (same product + size)
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += qty;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        size,
        quantity: qty,
        price: product.price
      });
    }

    // Save cart
    await cart.save();

    // Populate and return summary
    await cart.populate('items.product', 'name imageUrl price');
    const summary = computeSummary(cart);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
const updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity, size } = req.body;
    const userId = req.user.id;

    // Validate itemId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    // Validate that at least one field is provided
    if (quantity === undefined && size === undefined) {
      return res.status(400).json({ 
        message: 'Either quantity or size must be provided' 
      });
    }

    // Find cart
    const cart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name imageUrl price sizes');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const item = cart.items[itemIndex];

    // Update quantity if provided
    if (quantity !== undefined) {
      const qty = Number(quantity);
      if (!qty || qty < 1 || !Number.isInteger(qty)) {
        return res.status(400).json({ 
          message: 'Quantity must be a positive integer' 
        });
      }
      item.quantity = qty;
    }

    // Update size if provided
    if (size !== undefined) {
      if (!ALLOWED_SIZES.includes(size)) {
        return res.status(400).json({ 
          message: `Invalid size. Must be one of: ${ALLOWED_SIZES.join(', ')}` 
        });
      }

      // Check if product supports the new size
      if (!item.product.sizes.includes(size)) {
        return res.status(400).json({ 
          message: `Product does not have size ${size}. Available sizes: ${item.product.sizes.join(', ')}` 
        });
      }

      item.size = size;
    }

    // Save cart
    await cart.save();

    // Return updated summary
    const summary = computeSummary(cart);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    // Validate itemId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    // Find cart
    const cart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name imageUrl price');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if item exists
    const itemExists = cart.items.some(
      item => item._id.toString() === itemId
    );

    if (!itemExists) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove item using $pull
    await Cart.updateOne(
      { user: userId },
      { $pull: { items: { _id: itemId } } }
    );

    // Fetch updated cart
    const updatedCart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name imageUrl price');

    // Return updated summary
    const summary = computeSummary(updatedCart);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
};
