require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

const showCredentials = async () => {
  try {
    await connectDB();
    
    console.log('🔐 ADMIN CREDENTIALS:');
    console.log('==================');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('');
    
    // Check if test user exists, if not create one
    let testUser = await User.findOne({ email: 'user@example.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Test User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
      });
      console.log('✅ Test user created successfully!');
    } else {
      console.log('ℹ️  Test user already exists');
    }
    
    console.log('');
    console.log('👤 TEST USER CREDENTIALS:');
    console.log('========================');
    console.log('Email: user@example.com');
    console.log('Password: user123');
    console.log('Role: user');
    console.log('');
    
    console.log('🚀 You can now test both admin and user roles!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

showCredentials();
