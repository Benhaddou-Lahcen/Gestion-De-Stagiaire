import { axiosClient } from "../../api/axios";

const EncadrantApi = {
  create: async (payload) => {
    try {
      const response = await axiosClient.post('/admin/encadrants', payload);
      return response;
    } catch (error) {
      console.error('Failed to create encadrant:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },
  all: async () => {
    try {
      const response = await axiosClient.get('/admin/encadrants');
      return response;
    } catch (error) {
      console.error('Failed to fetch encadrants:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/encadrants/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete encadrant:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },
  update: async (id,payload) => {
    try {
    return await axiosClient.put(`/admin/encadrants/${id}`, {...payload,id});
    } catch (error) {
      console.error('Failed to create encadrant:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },

};

export default EncadrantApi;
