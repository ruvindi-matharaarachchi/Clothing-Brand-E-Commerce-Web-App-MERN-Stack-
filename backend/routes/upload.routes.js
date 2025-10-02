const express = require('express');
const { uploadImage, deleteImage, getImages } = require('../controllers/upload.controller');
const { handleUpload } = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// @route   POST /api/upload/image
// @desc    Upload product image
// @access  Private (Admin)
router.post('/image', protect, admin, handleUpload, uploadImage);

// @route   DELETE /api/upload/image/:filename
// @desc    Delete product image
// @access  Private (Admin)
router.delete('/image/:filename', protect, admin, deleteImage);

// @route   GET /api/upload/images
// @desc    Get all uploaded images
// @access  Private (Admin)
router.get('/images', protect, admin, getImages);

module.exports = router;
