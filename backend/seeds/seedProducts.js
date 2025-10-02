require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const demoProducts = [
  // Men's Clothing (8 products)
  {
    name: 'Classic White T-Shirt',
    description: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Soft fabric with a relaxed fit.',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=White+T-Shirt',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Premium Denim Jeans',
    description: 'Classic blue denim jeans with a modern slim fit. Made from high-quality denim for durability.',
    price: 89.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Denim+Jeans',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Cotton Hoodie',
    description: 'Warm and cozy hoodie for casual wear. Features a kangaroo pocket and adjustable drawstring hood.',
    price: 69.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Hoodie',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Dress Shirt',
    description: 'Professional dress shirt for formal occasions. Wrinkle-resistant fabric with classic collar.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Dress+Shirt',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Athletic Sneakers',
    description: 'Comfortable athletic sneakers for daily wear. Lightweight with excellent cushioning.',
    price: 119.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Sneakers',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Winter Parka',
    description: 'Heavy-duty winter jacket to keep you warm in cold weather. Water-resistant outer shell.',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Winter+Jacket',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Polo Shirt',
    description: 'Classic polo shirt for smart casual occasions. Pique cotton fabric with three-button placket.',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Polo+Shirt',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Chino Pants',
    description: 'Versatile chino pants perfect for both casual and business casual looks. Stretch fabric for comfort.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Chino+Pants',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  },

  // Women's Clothing (8 products)
  {
    name: 'Floral Summer Dress',
    description: 'Light and breezy summer dress perfect for warm weather. Floral print with comfortable fit.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Summer+Dress',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'High-Waist Skinny Jeans',
    description: 'Trendy high-waist skinny jeans with a flattering fit. Stretch denim for comfort and style.',
    price: 89.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Skinny+Jeans',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Silk Blouse',
    description: 'Elegant silk blouse perfect for office or special occasions. Luxurious fabric with classic cut.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Silk+Blouse',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Cashmere Cardigan',
    description: 'Soft and comfortable cashmere cardigan for layering. Perfect for transitional weather.',
    price: 149.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Cashmere+Cardigan',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Stylish leather ankle boots for any occasion. Comfortable heel height with quality leather.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Ankle+Boots',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Cotton Tank Top',
    description: 'Comfortable cotton tank top for casual summer wear. Soft fabric with relaxed fit.',
    price: 24.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Tank+Top',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Elegant Maxi Dress',
    description: 'Flowing maxi dress perfect for special occasions. Beautiful drape and sophisticated silhouette.',
    price: 119.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Maxi+Dress',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Wool Blazer',
    description: 'Professional wool blazer for business attire. Classic cut with modern styling.',
    price: 179.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Wool+Blazer',
    category: 'Women',
    sizes: ['S', 'M', 'L', 'XL']
  },

  // Kids' Clothing (8 products)
  {
    name: 'Kids Graphic T-Shirt',
    description: 'Colorful and comfortable t-shirt for kids. Fun graphic design with soft cotton fabric.',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+T-Shirt',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Denim Jeans',
    description: 'Durable denim jeans designed for active kids. Reinforced knees and comfortable fit.',
    price: 34.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Jeans',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Fleece Hoodie',
    description: 'Warm and cozy fleece hoodie for kids. Soft fabric with fun colors and designs.',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Hoodie',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Party Dress',
    description: 'Pretty party dress for special occasions. Sparkly details and comfortable fit.',
    price: 44.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Dress',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Running Shoes',
    description: 'Comfortable running shoes for active kids. Lightweight with good traction.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Shoes',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Shorts Set',
    description: 'Comfortable shorts set for summer play. Easy-care fabric with fun patterns.',
    price: 24.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Shorts',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Winter Coat',
    description: 'Warm winter coat to keep kids cozy. Water-resistant outer with soft lining.',
    price: 69.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Coat',
    category: 'Kids',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    name: 'Kids Pajama Set',
    description: 'Comfortable pajama set for bedtime. Soft cotton fabric with fun prints.',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/300x300?text=Kids+Pajamas',
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
    console.log(`Successfully inserted ${products.length} products`);
    
    // Log category breakdown
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('Products by category:', categoryCount);
    console.log('Seed completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
