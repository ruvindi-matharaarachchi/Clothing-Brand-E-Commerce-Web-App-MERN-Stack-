const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get all products with filtering, pagination, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      size,
      priceMin,
      priceMax,
      page = 1,
      limit = 10,
      sort = 'createdAt:desc'
    } = req.query;

    // Build filter object
    let filter = {};

    // Search filter (name or description) - case insensitive
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && ['Men', 'Women', 'Kids'].includes(category)) {
      filter.category = category;
    }

    // Size filter - check if product's sizes array includes the requested size
    if (size && ['S', 'M', 'L', 'XL'].includes(size)) {
      filter.sizes = size;
    }

    // Price range filter
    const priceMinNum = priceMin ? Number(priceMin) : null;
    const priceMaxNum = priceMax ? Number(priceMax) : null;
    
    if (priceMinNum !== null || priceMaxNum !== null) {
      filter.price = {};
      if (priceMinNum !== null && priceMinNum >= 0) {
        filter.price.$gte = priceMinNum;
      }
      if (priceMaxNum !== null && priceMaxNum >= 0) {
        filter.price.$lte = priceMaxNum;
      }
      // Validate price range
      if (priceMinNum !== null && priceMaxNum !== null && priceMinNum > priceMaxNum) {
        return res.status(400).json({ message: 'priceMin cannot be greater than priceMax' });
      }
    }

    // Pagination
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sortObj = { createdAt: -1 }; // default sort
    if (sort) {
      const [sortField, sortDirection] = sort.split(':');
      const allowedFields = ['price', 'name', 'createdAt'];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (allowedFields.includes(sortField)) {
        sortObj = { [sortField]: direction };
      }
    }

    // Execute query
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort(sortObj);

    const total = await Product.countDocuments(filter);
    const pages = Math.ceil(total / limitNum);

    res.json({
      data: products,
      page: pageNum,
      pages,
      total,
      limit: limitNum,
      hasPrev: pageNum > 1,
      hasNext: pageNum < pages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
