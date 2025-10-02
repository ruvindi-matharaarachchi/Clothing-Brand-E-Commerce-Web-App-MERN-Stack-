import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminProducts from './pages/AdminProducts';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Navigation component with cart count
const Navigation = () => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
          <Link to="/cart" style={{ 
            textDecoration: 'none', 
            color: '#333',
            position: 'relative'
          }}>
            Cart
            {cart.itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {cart.itemCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <>
              <Link to="/orders" style={{ textDecoration: 'none', color: '#333' }}>Orders</Link>
              {cart.itemCount > 0 && (
                <Link to="/checkout" style={{ 
                  textDecoration: 'none', 
                  color: '#28a745',
                  fontWeight: 'bold'
                }}>
                  Checkout
                </Link>
              )}
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" style={{ 
                    textDecoration: 'none', 
                    color: '#28a745',
                    fontWeight: 'bold'
                  }}>Admin Dashboard</Link>
                  <Link to="/admin/products" style={{ 
                    textDecoration: 'none', 
                    color: '#28a745',
                    fontWeight: 'bold'
                  }}>Products</Link>
                </>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Welcome, {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</Link>
              <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Layout component
const Layout = ({ children }) => (
  <div className="App">
    <Navigation />

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
  {
    path: "/order-confirmation",
    element: <Layout><OrderConfirmation /></Layout>,
  },
  {
    path: "/admin",
    element: <Layout><ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute></Layout>,
  },
  {
    path: "/admin/products",
    element: <Layout><ProtectedRoute requiredRole="admin"><AdminProducts /></ProtectedRoute></Layout>,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
