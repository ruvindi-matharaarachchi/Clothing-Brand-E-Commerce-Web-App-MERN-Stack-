import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import './App.css';

// Layout component
const Layout = ({ children }) => (
  <div className="App">
    <nav style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '1rem', 
      borderBottom: '1px solid #dee2e6',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          Clothing Store
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: '#333' }}>Cart</Link>
          <Link to="/orders" style={{ textDecoration: 'none', color: '#333' }}>Orders</Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</Link>
          <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
        </div>
      </div>
    </nav>

    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      {children}
    </main>

    <footer style={{ 
      marginTop: '4rem', 
      padding: '2rem', 
      backgroundColor: '#f8f9fa', 
      borderTop: '1px solid #dee2e6',
      textAlign: 'center'
    }}>
      <p>&copy; 2024 Clothing Store. All rights reserved.</p>
    </footer>
  </div>
);

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/products",
    element: <Layout><Products /></Layout>,
  },
  {
    path: "/product/:id",
    element: <Layout><ProductDetails /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/register",
    element: <Layout><Register /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><Cart /></Layout>,
  },
  {
    path: "/checkout",
    element: <Layout><Checkout /></Layout>,
  },
  {
    path: "/orders",
    element: <Layout><Orders /></Layout>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
