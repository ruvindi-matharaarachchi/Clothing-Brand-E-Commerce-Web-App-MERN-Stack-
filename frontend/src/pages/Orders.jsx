import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
    hasPrev: false,
    hasNext: false
  });

  // Check if user is logged in
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Please log in to view your orders');
      setLoading(false);
      return;
    }

    loadOrders();
  }, [token]);

  const loadOrders = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get(`/api/orders?page=${page}&limit=10`);
      setOrders(response.data.data);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
        limit: response.data.limit,
        hasPrev: response.data.hasPrev,
        hasNext: response.data.hasNext
      });
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      loadOrders(newPage);
    }
  };

  if (!token) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>My Orders</h1>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Login Required</h2>
          <p style={{ margin: '0 0 20px 0' }}>
            Please log in to view your order history.
          </p>
          <Link to="/login" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '10px' }}>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>My Orders</h1>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <p style={{ margin: 0 }}>{error}</p>
          <button
            onClick={() => loadOrders()}
            style={{
              marginTop: '8px',
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: '1px solid #721c24',
              color: '#721c24',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>My Orders</h1>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '40px 20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <h2 style={{ marginBottom: '8px', color: '#333' }}>No orders yet</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link to="/products" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>My Orders</h1>
      
      {/* Orders List */}
      <div style={{ marginTop: '20px' }}>
        {orders.map((order) => (
          <div key={order._id} style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {/* Order Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                  Order #{order._id.slice(-8).toUpperCase()}
                </h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#007bff'
                }}>
                  ${order.totalPrice.toFixed(2)}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div style={{
              borderTop: '1px solid #e0e0e0',
              paddingTop: '15px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                Items:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {order.items.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {item.product?.imageUrl && (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product?.name || 'Product'}
                        style={{
                          width: '30px',
                          height: '30px',
                          objectFit: 'cover',
                          borderRadius: '2px'
                        }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {item.product?.name || 'Unknown Product'}
                      </div>
                      <div style={{ color: '#666' }}>
                        Size: {item.size} | Qty: {item.quantity} | ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '30px'
        }}>
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev}
            style={{
              padding: '8px 16px',
              backgroundColor: pagination.hasPrev ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: pagination.hasPrev ? 'pointer' : 'not-allowed',
              opacity: pagination.hasPrev ? 1 : 0.6
            }}
          >
            Previous
          </button>
          
          <span style={{ padding: '0 10px' }}>
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNext}
            style={{
              padding: '8px 16px',
              backgroundColor: pagination.hasNext ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: pagination.hasNext ? 'pointer' : 'not-allowed',
              opacity: pagination.hasNext ? 1 : 0.6
            }}
          >
            Next
          </button>
        </div>
      )}

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

export default Orders;