# Clothing Brand E-Commerce Web App (MERN Stack)

A full-stack e-commerce application built with MongoDB, Express.js, React, and Node.js for a clothing brand. This scaffold provides a solid foundation with authentication, product management, shopping cart, and order processing capabilities.

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for products with filtering and search
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Processing**: Create and manage customer orders
- **Email Integration**: Nodemailer setup for order confirmations
- **Database**: MongoDB with Mongoose ODM
- **Security**: Password hashing with bcrypt, CORS protection

### Frontend Features
- **React Router**: Client-side routing for all pages
- **Responsive Design**: Mobile-friendly interface
- **API Integration**: Axios for backend communication
- **Authentication**: Login and registration forms
- **Product Pages**: Home, product details, cart, checkout, orders

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── product.controller.js # Product management
│   │   ├── cart.controller.js    # Shopping cart logic
│   │   └── order.controller.js   # Order processing
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── auth.routes.js       # Auth endpoints
│   │   ├── product.routes.js    # Product endpoints
│   │   ├── cart.routes.js       # Cart endpoints
│   │   └── order.routes.js      # Order endpoints
│   ├── seeds/
│   │   └── seedProducts.js      # Demo data seeder
│   ├── package.json
│   ├── server.js
│   └── env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js         # API configuration
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── Orders.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── env.example
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Clothing-Brand-E-Commerce-Web-App-MERN-Stack-
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   **Backend (.env)**
   ```bash
   cd backend
   cp env.example .env
   ```
   
   

   **Frontend (.env)**
   ```bash
   cd frontend
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://127.0.0.1:27017/clothing_ecommerce`

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

3. **Seed Demo Products** (Optional)
   ```bash
   cd backend
   npm run seed:products
   ```

4. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   App will run on http://localhost:3000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders/my` - Get user's orders

### Query Parameters for Products
- `search` - Search in name and description
- `category` - Filter by category (Men, Women, Kids)
- `size` - Filter by size (S, M, L, XL)
- `priceMin` - Minimum price filter
- `priceMax` - Maximum price filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## 🔧 Development

### Backend Development
- Uses nodemon for auto-restart during development
- Environment variables loaded from `.env`
- MongoDB connection with error handling
- Centralized error handling middleware

### Frontend Development
- React development server with hot reload
- Axios interceptors for authentication
- React Router for navigation
- Responsive CSS styling

## 📝 TODO Features

The following features are scaffolded but need implementation:

### Backend
- [ ] Complete cart controller logic
- [ ] Email sending with Nodemailer
- [ ] Product image upload
- [ ] Order status management
- [ ] Admin panel for product management

### Frontend
- [ ] Product listing with images
- [ ] Search and filter functionality
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] User authentication integration
- [ ] Order history display

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Happy Coding! 🎉**