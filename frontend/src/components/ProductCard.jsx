import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, name, description, price, imageUrl, category, sizes } = product;

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
    >
      <Link to={`/product/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Product Image */}
        <div style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              color: '#999',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Category Badge */}
          <div style={{
            backgroundColor: category === 'Men' ? '#007bff' : category === 'Women' ? '#e91e63' : '#28a745',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginBottom: '8px'
          }}>
            {category}
          </div>

          {/* Product Name */}
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#333',
            lineHeight: '1.3'
          }}>
            {name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: '0 0 12px 0',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>

          {/* Sizes */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Available Sizes:
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {sizes.map((size) => (
                <span
                  key={size}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#333'
                  }}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#007bff',
            marginTop: 'auto'
          }}>
            ${price.toFixed(2)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
