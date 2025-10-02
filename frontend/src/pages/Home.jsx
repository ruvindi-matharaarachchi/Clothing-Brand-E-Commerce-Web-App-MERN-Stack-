import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../api/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Load 8 featured products (2 from each category)
        const response = await productService.getProducts({
          limit: 8,
          sort: 'createdAt:desc'
        });
        setFeaturedProducts(response.data);
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          margin: '0 0 16px 0'
        }}>
          Welcome to Clothing Store
        </h1>
        <p style={{
          fontSize: '20px',
          margin: '0 0 32px 0',
          opacity: 0.9
        }}>
          Discover the latest fashion trends for Men, Women, and Kids
        </p>
        <Link to="/products" style={{
          display: 'inline-block',
          padding: '16px 32px',
          backgroundColor: 'white',
          color: '#667eea',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'transform 0.2s ease'
        }}>
          Shop Now
        </Link>
      </div>

      {/* Category Quick Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <Link to="/products?category=Men" style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '30px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Men's Fashion</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Shop Men's Collection</p>
          </div>
        </Link>

        <Link to="/products?category=Women" style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          <div style={{
            backgroundColor: '#e91e63',
            color: 'white',
            padding: '30px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Women's Fashion</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Shop Women's Collection</p>
          </div>
        </Link>

        <Link to="/products?category=Kids" style={{
          textDecoration: 'none',
          color: 'inherit'
        }}>
          <div style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '30px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Kids' Fashion</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Shop Kids' Collection</p>
          </div>
        </Link>
      </div>

      {/* Featured Products */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: 0,
            color: '#333'
          }}>
            Featured Products
          </h2>
          <Link to="/products" style={{
            color: '#007bff',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            View All Products →
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666'
          }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '10px' }}>Loading featured products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            borderRadius: '8px',
            border: '1px solid #f5c6cb'
          }}>
            <p>{error}</p>
          </div>
        )}

        {/* Featured Products Grid */}
            {!loading && !error && featuredProducts.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h2 style={{ margin: 0, color: '#333' }}>Featured Products</h2>
                  <Link to="/products" style={{
                    color: '#007bff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    View All Products →
                  </Link>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px',
                  marginBottom: '40px'
                }}>
                  {featuredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}

        {/* No Products State */}
        {!loading && !error && featuredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666'
          }}>
            <h3>No products available</h3>
            <p>Check back later for new arrivals!</p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '40px 20px',
        borderRadius: '12px',
        marginTop: '40px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333'
        }}>
          Why Choose Our Store?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>🚚</div>
            <h3 style={{ marginBottom: '8px', color: '#333' }}>Free Shipping</h3>
            <p style={{ color: '#666', margin: 0 }}>Free shipping on orders over $50</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>↩️</div>
            <h3 style={{ marginBottom: '8px', color: '#333' }}>Easy Returns</h3>
            <p style={{ color: '#666', margin: 0 }}>30-day return policy</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>💎</div>
            <h3 style={{ marginBottom: '8px', color: '#333' }}>Quality Products</h3>
            <p style={{ color: '#666', margin: 0 }}>Premium quality clothing</p>
          </div>
        </div>
      </div>

      {/* Add CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;
