import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import Pagination from './Pagination';
import productService from '../api/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 12,
    hasPrev: false,
    hasNext: false
  });

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    size: '',
    priceGte: '',
    priceLte: '',
    sort: 'createdAt:desc'
  });

  // Load products
  const loadProducts = async (page = 1, filterParams = {}) => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page,
        limit: pagination.limit,
        ...filters,
        ...filterParams
      };

      const response = await productService.getProducts(params);
      
      setProducts(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total,
        limit: response.limit,
        hasPrev: response.hasPrev,
        hasNext: response.hasNext
      });
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount and when filters change
  useEffect(() => {
    loadProducts(1, filters);
  }, [filters]);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    loadProducts(page, filters);
  };

  // Handle items per page change
  const handleLimitChange = (limit) => {
    setPagination(prev => ({ ...prev, limit }));
    loadProducts(1, { ...filters, limit });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Products</h1>
      
      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Results Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ color: '#666' }}>
          {loading ? (
            'Loading...'
          ) : (
            `Showing ${products.length} of ${pagination.total} products`
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '14px', color: '#666' }}>Items per page:</label>
          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            disabled={loading}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
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
          {error}
        </div>
      )}

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
          <p style={{ marginTop: '10px' }}>Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </>
      )}

      {/* No Products Found */}
      {!loading && products.length === 0 && !error && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666'
        }}>
          <h3>No products found</h3>
          <p>Try adjusting your search criteria or filters.</p>
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

export default ProductList;
