require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const demoProducts = [
  // Men's Clothing
  {
    name: 'Classic White T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=White+T-Shirt',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Denim Jeans',
    description: 'Classic blue denim jeans with a modern fit',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Denim+Jeans',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Hoodie',
    description: 'Warm and cozy hoodie for casual wear',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Hoodie',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Dress Shirt',
    description: 'Professional dress shirt for formal occasions',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Dress+Shirt',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Sneakers',
    description: 'Comfortable athletic sneakers for daily wear',
    price: 89.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Sneakers',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Winter Jacket',
    description: 'Warm winter jacket to keep you cozy in cold weather',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Winter+Jacket',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Polo Shirt',
    description: 'Classic polo shirt for smart casual occasions',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Polo+Shirt',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },

  // Women's Clothing
  {
    name: 'Summer Dress',
    description: 'Light and breezy summer dress perfect for warm weather',
    price: 69.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Summer+Dress',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Skinny Jeans',
    description: 'Trendy skinny jeans with a flattering fit',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Skinny+Jeans',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Blouse',
    description: 'Elegant blouse perfect for office or special occasions',
    price: 54.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Blouse',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Cardigan',
    description: 'Soft and comfortable cardigan for layering',
    price: 64.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Cardigan',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'High Heels',
    description: 'Elegant high heels for formal events',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=High+Heels',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Tank Top',
    description: 'Comfortable tank top for casual summer wear',
    price: 24.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Tank+Top',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Maxi Dress',
    description: 'Flowing maxi dress perfect for special occasions',
    price: 89.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Maxi+Dress',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },

  // Kids' Clothing
  {
    name: 'Kids T-Shirt',
    description: 'Colorful and comfortable t-shirt for kids',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+T-Shirt',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Jeans',
    description: 'Durable jeans designed for active kids',
    price: 34.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Jeans',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Hoodie',
    description: 'Warm and cozy hoodie for kids',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Hoodie',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Dress',
    description: 'Pretty dress for special occasions',
    price: 44.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Dress',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Sneakers',
    description: 'Comfortable sneakers for active kids',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Sneakers',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Shorts',
    description: 'Comfortable shorts for summer play',
    price: 24.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Shorts',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Jacket',
    description: 'Warm jacket to keep kids cozy',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Jacket',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert demo products
    const products = await Product.insertMany(demoProducts);
    console.log(`Inserted ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
