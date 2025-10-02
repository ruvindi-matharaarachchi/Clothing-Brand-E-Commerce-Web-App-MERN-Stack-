const { handleUpload } = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// @desc    Upload product image
// @route   POST /api/upload/image
// @access  Private (Admin)
const uploadImage = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Get the uploaded file info
    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    };

    // Generate the URL for the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${fileInfo.filename}`;

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      fileInfo: fileInfo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product image
// @route   DELETE /api/upload/image/:filename
// @access  Private (Admin)
const deleteImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    
    // Construct file path
    const filePath = path.join(__dirname, '../uploads/images', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all uploaded images
// @route   GET /api/upload/images
// @access  Private (Admin)
const getImages = async (req, res, next) => {
  try {
    const imagesDir = path.join(__dirname, '../uploads/images');
    
    // Read directory contents
    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    // Generate URLs for each image
    const images = imageFiles.map(file => ({
      filename: file,
      url: `${req.protocol}://${req.get('host')}/uploads/images/${file}`,
      path: path.join(imagesDir, file)
    }));
    
    res.json({
      images: images,
      count: images.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  getImages
};
