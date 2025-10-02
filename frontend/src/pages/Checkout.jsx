import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

const Checkout = () => {
  const { cart, loading: cartLoading } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (cart.items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [token, cart.items.length, navigate]);

  const handlePlaceOrder = async () => {
    try {
      setCheckoutLoading(true);
      setError('');

      const response = await api.post('/api/orders');
      
      // Navigate to order confirmation with order data
      navigate('/order-confirmation', { 
        state: { order: response.data } 
      });
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Login Required</h1>
        <p>Please log in to proceed with checkout.</p>
      </div>
    );
  }

  if (cartLoading) {
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
        <p style={{ marginTop: '10px' }}>Loading cart...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Your cart is empty</h1>
        <p>Add some items to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Checkout</h1>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '30px',
        marginTop: '20px'
      }}>
        {/* Order Summary */}
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Order Summary</h2>
          
          {/* Customer Info */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Customer Information</h3>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Name:</strong> {user.name || 'N/A'}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Email:</strong> {user.email || 'N/A'}
            </p>
          </div>

          {/* Items */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Items ({cart.itemCount})</h3>
            
            {cart.items.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Size: {item.size} | Qty: {item.quantity}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                    ${item.lineTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Actions */}
        <div>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              color: '#333'
            }}>
              Order Total
            </h3>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#666'
            }}>
              <span>Subtotal ({cart.itemCount} items):</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#666'
            }}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#666'
            }}>
              <span>Tax:</span>
              <span>Calculated at checkout</span>
            </div>

            <div style={{
              borderTop: '1px solid #e0e0e0',
              paddingTop: '12px',
              marginTop: '12px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                <span>Total:</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={checkoutLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: checkoutLoading ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                  opacity: checkoutLoading ? 0.6 : 1,
                  marginBottom: '12px'
                }}
              >
                {checkoutLoading ? 'Placing Order...' : 'Place Order'}
              </button>

              <div style={{
                fontSize: '12px',
                color: '#666',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0 0 4px 0' }}>🔒 Secure checkout</p>
                <p style={{ margin: 0 }}>Order confirmation will be sent to your email</p>
              </div>
            </div>
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

export default Checkout;