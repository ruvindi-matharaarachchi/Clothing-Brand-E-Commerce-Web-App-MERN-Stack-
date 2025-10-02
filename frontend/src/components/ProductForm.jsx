import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL']
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        imageUrl: product.imageUrl || '',
        category: product.category || 'Men',
        sizes: product.sizes || ['S', 'M', 'L', 'XL']
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSizeChange = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: imageUrl
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.sizes.length === 0) {
      newErrors.sizes = 'At least one size must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const availableSizes = ['S', 'M', 'L', 'XL'];

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center'
      }}>
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.name ? '#dc3545' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter product name"
          />
          {errors.name && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            placeholder="Enter product description"
          />
        </div>

        {/* Price and Category */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${errors.price ? '#dc3545' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="0.00"
            />
            {errors.price && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.price}
              </div>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${errors.category ? '#dc3545' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            {errors.category && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.category}
              </div>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <ImageUpload
          onImageUpload={handleImageUpload}
          currentImageUrl={formData.imageUrl}
          loading={loading}
        />

        {/* Sizes */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Available Sizes *
          </label>
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            {availableSizes.map(size => (
              <label
                key={size}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: formData.sizes.includes(size) ? '#007bff' : 'white',
                  color: formData.sizes.includes(size) ? 'white' : '#333',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  style={{ margin: 0 }}
                />
                {size}
              </label>
            ))}
          </div>
          {errors.sizes && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.sizes}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
