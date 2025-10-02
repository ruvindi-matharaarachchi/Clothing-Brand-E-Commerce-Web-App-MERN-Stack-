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
      'price[gte]': priceGte,
      'price[lte]': priceLte,
      page = 1,
      limit = 10,
      sort = 'createdAt:desc'
    } = req.query;

    // Build filter object using $and for better query performance
    const filterConditions = [];

    // Search filter (name or description) - case insensitive
    if (search && search.trim()) {
      filterConditions.push({
        $or: [
          { name: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } }
        ]
      });
    }

    // Category filter
    if (category && ['Men', 'Women', 'Kids'].includes(category)) {
      filterConditions.push({ category });
    }

    // Size filter - check if product's sizes array includes the requested size
    if (size && ['S', 'M', 'L', 'XL'].includes(size)) {
      filterConditions.push({ sizes: size });
    }

    // Price range filter with bracket syntax
    const priceGteNum = priceGte ? Number(priceGte) : null;
    const priceLteNum = priceLte ? Number(priceLte) : null;
    
    if (priceGteNum !== null || priceLteNum !== null) {
      const priceFilter = {};
      if (priceGteNum !== null && !isNaN(priceGteNum) && priceGteNum >= 0) {
        priceFilter.$gte = priceGteNum;
      }
      if (priceLteNum !== null && !isNaN(priceLteNum) && priceLteNum >= 0) {
        priceFilter.$lte = priceLteNum;
      }
      
      // Validate price range
      if (priceGteNum !== null && priceLteNum !== null && 
          !isNaN(priceGteNum) && !isNaN(priceLteNum) && 
          priceGteNum > priceLteNum) {
        return res.status(400).json({ 
          message: 'price[gte] cannot be greater than price[lte]' 
        });
      }
      
      if (Object.keys(priceFilter).length > 0) {
        filterConditions.push({ price: priceFilter });
      }
    }

    // Build final filter
    const filter = filterConditions.length > 0 ? { $and: filterConditions } : {};

    // Pagination
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sortObj = { createdAt: -1 }; // default sort
    if (sort && typeof sort === 'string') {
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

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, imageUrl, category, sizes } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ 
        message: 'Name, price, and category are required' 
      });
    }

    // Validate category
    if (!['Men', 'Women', 'Kids'].includes(category)) {
      return res.status(400).json({ 
        message: 'Category must be one of: Men, Women, Kids' 
      });
    }

    // Validate price
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ 
        message: 'Price must be a valid positive number' 
      });
    }

    // Validate sizes
    const validSizes = ['S', 'M', 'L', 'XL'];
    if (sizes && !Array.isArray(sizes)) {
      return res.status(400).json({ 
        message: 'Sizes must be an array' 
      });
    }

    if (sizes && sizes.some(size => !validSizes.includes(size))) {
      return res.status(400).json({ 
        message: `Invalid sizes. Must be one or more of: ${validSizes.join(', ')}` 
      });
    }

    // Create product
    const product = await Product.create({
      name: name.trim(),
      description: description?.trim() || '',
      price: priceNum,
      imageUrl: imageUrl?.trim() || '',
      category,
      sizes: sizes || validSizes
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category, sizes } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate category if provided
    if (category && !['Men', 'Women', 'Kids'].includes(category)) {
      return res.status(400).json({ 
        message: 'Category must be one of: Men, Women, Kids' 
      });
    }

    // Validate price if provided
    if (price !== undefined) {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({ 
          message: 'Price must be a valid positive number' 
        });
      }
    }

    // Validate sizes if provided
    if (sizes !== undefined) {
      const validSizes = ['S', 'M', 'L', 'XL'];
      if (!Array.isArray(sizes)) {
        return res.status(400).json({ 
          message: 'Sizes must be an array' 
        });
      }

      if (sizes.some(size => !validSizes.includes(size))) {
        return res.status(400).json({ 
          message: `Invalid sizes. Must be one or more of: ${validSizes.join(', ')}` 
        });
      }
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...(name && { name: name.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(price !== undefined && { price: Number(price) }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl.trim() }),
        ...(category && { category }),
        ...(sizes && { sizes })
      },
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find and delete product
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
