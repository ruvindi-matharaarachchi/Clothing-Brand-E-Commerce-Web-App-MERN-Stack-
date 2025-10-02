import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const { cart, loading, error, clearError } = useCart();

  if (loading && cart.items.length === 0) {
    return <LoadingSpinner text="Loading cart..." />;
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Shopping Cart</h1>
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
            onClick={clearError}
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

  if (cart.items.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Shopping Cart</h1>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '40px 20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
          <h2 style={{ marginBottom: '8px', color: '#333' }}>Your cart is empty</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Looks like you haven't added any items to your cart yet.
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
      <h1>Shopping Cart</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '24px',
        marginTop: '20px'
      }}>
        {/* Cart Items */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>
              Items ({cart.itemCount})
            </h2>
            <Link to="/products" style={{
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Continue Shopping
            </Link>
          </div>

          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
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
              Order Summary
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
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                <span>Total:</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '12px'
              }}>
                Proceed to Checkout
              </Link>

              <div style={{
                fontSize: '12px',
                color: '#666',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0 0 4px 0' }}>🔒 Secure checkout</p>
                <p style={{ margin: 0 }}>30-day return policy</p>
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

export default Cart;
