const User = require('../models/User');

// @desc    Check if user is admin
// @access  Private
const admin = async (req, res, next) => {
  try {
    // Get user from database to ensure we have the latest role
    const user = await User.findById(req.user.id).select('role');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Server error in admin middleware' });
  }
};

module.exports = { admin };
