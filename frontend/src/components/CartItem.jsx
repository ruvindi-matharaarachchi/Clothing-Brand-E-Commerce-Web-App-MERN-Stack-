import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, updateSize, removeItem, loading } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setIsUpdating(true);
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSizeChange = async (newSize) => {
    if (newSize === item.size) return;
    
    try {
      setIsUpdating(true);
      await updateSize(item.id, newSize);
    } catch (error) {
      console.error('Error updating size:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      try {
        setIsUpdating(true);
        await removeItem(item.id);
      } catch (error) {
        console.error('Error removing item:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: 'white',
      marginBottom: '12px',
      opacity: isUpdating ? 0.6 : 1,
      transition: 'opacity 0.2s ease'
    }}>
      {/* Product Image */}
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{ color: '#999', fontSize: '12px' }}>No Image</div>
        )}
      </div>

      {/* Product Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
          lineHeight: '1.3'
        }}>
          {item.name}
        </h3>

        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Size Selector */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Size:
            </label>
            <select
              value={item.size}
              onChange={(e) => handleSizeChange(e.target.value)}
              disabled={isUpdating || loading}
              style={{
                padding: '4px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: isUpdating || loading ? '#f5f5f5' : 'white'
              }}
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {/* Quantity Selector */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Qty:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || loading || item.quantity <= 1}
                style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  cursor: (isUpdating || loading || item.quantity <= 1) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  opacity: (isUpdating || loading || item.quantity <= 1) ? 0.5 : 1
                }}
              >
                -
              </button>
              <span style={{
                minWidth: '30px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating || loading}
                style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  cursor: (isUpdating || loading) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  opacity: (isUpdating || loading) ? 0.5 : 1
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Price */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#007bff'
            }}>
              ${item.lineTotal.toFixed(2)}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666'
            }}>
              ${item.price.toFixed(2)} each
            </div>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <button
          onClick={handleRemove}
          disabled={isUpdating || loading}
          style={{
            padding: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#dc3545',
            cursor: (isUpdating || loading) ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            opacity: (isUpdating || loading) ? 0.5 : 1,
            borderRadius: '4px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!isUpdating && !loading) {
              e.target.style.backgroundColor = '#f8d7da';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          title="Remove item"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartItem;
