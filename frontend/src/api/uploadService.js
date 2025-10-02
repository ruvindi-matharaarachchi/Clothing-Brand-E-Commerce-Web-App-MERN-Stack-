import api from './axios';

// Upload API service
export const uploadService = {
  // Upload image file
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete image
  deleteImage: async (filename) => {
    try {
      const response = await api.delete(`/api/upload/image/${filename}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all uploaded images
  getImages: async () => {
    try {
      const response = await api.get('/api/upload/images');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default uploadService;
