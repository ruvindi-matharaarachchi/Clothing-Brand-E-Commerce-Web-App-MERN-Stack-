import React, { useState } from 'react';

const ProductFilters = ({ filters, onFiltersChange, onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceChange = (priceType, value) => {
    onFiltersChange({
      ...filters,
      [`price${priceType}`]: value
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      category: '',
      size: '',
      priceGte: '',
      priceLte: '',
      sort: 'createdAt:desc'
    });
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Size
          </label>
          <select
            value={filters.size || ''}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="">All Sizes</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Min Price
          </label>
          <input
            type="number"
            placeholder="Min price"
            value={filters.priceGte || ''}
            onChange={(e) => handlePriceChange('Gte', e.target.value)}
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Max Price
          </label>
          <input
            type="number"
            placeholder="Max price"
            value={filters.priceLte || ''}
            onChange={(e) => handlePriceChange('Lte', e.target.value)}
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Sort */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Sort By
          </label>
          <select
            value={filters.sort || 'createdAt:desc'}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name: A to Z</option>
            <option value="name:desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        style={{
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;
