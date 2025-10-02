import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productService from '../api/productService';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { addNotification } = useNotifications();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Product not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setAddToCartMessage('Please select a size');
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setAddToCartMessage('Please log in to add items to cart');
      setTimeout(() => setAddToCartMessage(''), 3000);
      return;
    }

    try {
      setAddingToCart(true);
      setAddToCartMessage('');
      
      await addItem(product._id, selectedSize, quantity);
      setAddToCartMessage(`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`);
      
      // Show success notification
      addNotification({
        type: 'success',
        message: `Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`,
        duration: 3000
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setAddToCartMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        setAddToCartMessage('Please log in to add items to cart');
      } else {
        setAddToCartMessage(error.response?.data?.message || 'Failed to add item to cart');
      }
    } finally {
      setAddingToCart(false);
    }
  };

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
        <p style={{ marginTop: '10px' }}>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
        <Link to="/" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px', color: '#666' }}>/</span>
        <span style={{ color: '#666' }}>{product.name}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Product Image */}
        <div>
          <div style={{
            width: '100%',
            height: '500px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{ color: '#999', fontSize: '18px' }}>
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category Badge */}
          <div style={{
            backgroundColor: product.category === 'Men' ? '#007bff' : product.category === 'Women' ? '#e91e63' : '#28a745',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            {product.category}
          </div>

          {/* Product Name */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            color: '#333'
          }}>
            {product.name}
          </h1>

          {/* Price */}
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#007bff',
            marginBottom: '24px'
          }}>
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '8px', color: '#333' }}>Description</h3>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              fontSize: '16px'
            }}>
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px', color: '#333' }}>Size</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '8px 16px',
                    border: selectedSize === size ? '2px solid #007bff' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#e3f2fd' : 'white',
                    color: selectedSize === size ? '#007bff' : '#333',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: selectedSize === size ? 'bold' : 'normal'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px', color: '#333' }}>Quantity</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                -
              </button>
              <span style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                minWidth: '50px',
                textAlign: 'center'
              }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Message */}
          {addToCartMessage && (
            <div style={{
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              backgroundColor: addToCartMessage.includes('Added') ? '#d4edda' : '#f8d7da',
              color: addToCartMessage.includes('Added') ? '#155724' : '#721c24',
              border: `1px solid ${addToCartMessage.includes('Added') ? '#c3e6cb' : '#f5c6cb'}`,
              fontSize: '14px'
            }}>
              {addToCartMessage}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: addingToCart ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: addingToCart ? 'not-allowed' : 'pointer',
              marginBottom: '16px',
              opacity: addingToCart ? 0.6 : 1
            }}
          >
            {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </button>

          {/* Login Prompt */}
          {!localStorage.getItem('token') && (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              border: '1px solid #ffeaa7',
              textAlign: 'center'
            }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                <strong>Want to add this to your cart?</strong>
              </p>
              <Link to="/login" style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                Login to continue shopping
              </Link>
            </div>
          )}

          {/* Product Details */}
          <div style={{
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            <h3 style={{ marginBottom: '12px', color: '#333' }}>Product Details</h3>
            <div style={{ color: '#666', fontSize: '14px' }}>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Available Sizes:</strong> {product.sizes.join(', ')}</p>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
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

export default ProductDetails;
