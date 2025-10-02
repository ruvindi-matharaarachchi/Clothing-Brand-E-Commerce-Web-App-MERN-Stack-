import api from './axios';

// Admin API service for product management
export const adminService = {
  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/api/products', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all products for admin (with pagination)
  getAdminProducts: async (params = {}) => {
    try {
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default adminService;
