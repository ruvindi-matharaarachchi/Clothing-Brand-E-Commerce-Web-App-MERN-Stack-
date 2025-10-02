import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // If no order data, show fallback
  if (!order) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Order Confirmation</h1>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h2 style={{ margin: '0 0 10px 0' }}>No order found</h2>
          <p style={{ margin: '0 0 20px 0' }}>
            We couldn't find your order information. This might happen if you refreshed the page.
          </p>
          <Link to="/orders" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Success Header */}
      <div style={{
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #c3e6cb',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
        <h1 style={{ margin: '0 0 10px 0', color: '#155724' }}>
          Order Confirmed!
        </h1>
        <p style={{ margin: 0, fontSize: '16px' }}>
          Thank you for your purchase. A confirmation email has been sent to your email address.
        </p>
      </div>

      {/* Order Details */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Order Details</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <strong>Order ID:</strong><br />
            <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              #{order.orderId}
            </span>
          </div>
          <div>
            <strong>Order Date:</strong><br />
            {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>

        {/* Items Table */}
        <h3 style={{ margin: '20px 0 15px 0', color: '#333' }}>Items Ordered</h3>
        
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderBottom: '1px solid #e0e0e0',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '10px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            <div>Product</div>
            <div>Size</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>
          </div>
          
          {order.items.map((item, index) => (
            <div key={index} style={{
              padding: '12px',
              borderBottom: '1px solid #e0e0e0',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              gap: '10px',
              alignItems: 'center',
              fontSize: '14px'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.name}
                </div>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                )}
              </div>
              <div>{item.size}</div>
              <div>{item.quantity}</div>
              <div>${item.price.toFixed(2)}</div>
              <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                ${item.lineTotal.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Total: ${order.totalPrice.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        <Link to="/products" style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}>
          Continue Shopping
        </Link>
        
        <Link to="/orders" style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#6c757d',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}>
          View All Orders
        </Link>
      </div>

      {/* Additional Info */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          <strong>What's next?</strong>
        </p>
        <p style={{ margin: '0 0 10px 0' }}>
          • You'll receive an order confirmation email shortly
        </p>
        <p style={{ margin: '0 0 10px 0' }}>
          • We'll process your order and send you tracking information
        </p>
        <p style={{ margin: 0 }}>
          • If you have any questions, please contact our support team
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
