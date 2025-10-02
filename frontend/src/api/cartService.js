import api from './axios';

// Cart API service
export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      const response = await api.get('/api/cart');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add item to cart
  addItem: async (productId, size, quantity) => {
    try {
      const response = await api.post('/api/cart', {
        productId,
        size,
        quantity
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update cart item
  updateItem: async (itemId, updates) => {
    try {
      const response = await api.put(`/api/cart/${itemId}`, updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    try {
      const response = await api.delete(`/api/cart/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update item quantity
  updateQuantity: async (itemId, quantity) => {
    try {
      const response = await api.put(`/api/cart/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update item size
  updateSize: async (itemId, size) => {
    try {
      const response = await api.put(`/api/cart/${itemId}`, { size });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default cartService;
