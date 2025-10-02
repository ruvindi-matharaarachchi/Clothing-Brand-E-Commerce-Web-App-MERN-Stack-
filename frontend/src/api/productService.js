import api from './axios';

// Product API service
export const productService = {
  // Get all products with filters, pagination, and sorting
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters
      };
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category, filters = {}) => {
    try {
      const params = {
        category,
        ...filters
      };
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get products with price range
  getProductsByPriceRange: async (minPrice, maxPrice, filters = {}) => {
    try {
      const params = {
        priceMin: minPrice,
        priceMax: maxPrice,
        ...filters
      };
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default productService;
