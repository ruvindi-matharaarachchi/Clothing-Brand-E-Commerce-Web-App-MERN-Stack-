import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import adminService from '../api/adminService';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAdminProducts({ limit: 50 });
      setProducts(response.data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      
      if (editingProduct) {
        // Update existing product
        await adminService.updateProduct(editingProduct._id, formData);
        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id 
            ? { ...p, ...formData, price: Number(formData.price) }
            : p
        ));
      } else {
        // Create new product
        const newProduct = await adminService.createProduct(formData);
        setProducts(prev => [newProduct, ...prev]);
      }
      
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(productId);
      await adminService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={handleCancelForm}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back to Products
          </button>
        </div>
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
          loading={formLoading}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>Product Management</h1>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          + Add New Product
        </button>
      </div>

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              style={{
                background: 'none',
                border: 'none',
                color: '#721c24',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '10px' }}>Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {products.map((product) => (
            <div key={product._id} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f5f5f5',
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
                  <div style={{ color: '#999', fontSize: '14px' }}>No Image</div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '16px' }}>
                <div style={{
                  backgroundColor: product.category === 'Men' ? '#007bff' : product.category === 'Women' ? '#e91e63' : '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  marginBottom: '8px'
                }}>
                  {product.category}
                </div>

                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {product.name}
                </h3>

                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  color: '#666',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#007bff'
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {product.sizes.join(', ')}
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deleteLoading === product._id}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: deleteLoading === product._id ? '#6c757d' : '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: deleteLoading === product._id ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      opacity: deleteLoading === product._id ? 0.6 : 1
                    }}
                  >
                    {deleteLoading === product._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products */}
      {!loading && products.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <h3 style={{ marginBottom: '8px', color: '#333' }}>No products found</h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Get started by adding your first product.
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Add First Product
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

export default AdminProducts;
