import { axiosClient } from "../../api/axios";

const StagiaireAdminApi = {
  create: async (payload) => {
    try {
      const response = await axiosClient.post('/admin/stagiaires', payload);
      return response;
    } catch (error) {
      console.error('Failed to create encadrant:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },
  all: async () => {
    try {
      const response = await axiosClient.get('/admin/stagiaires');
      return response;
    } catch (error) {
      console.error('Failed to fetch encadrants:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/stagiaires/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete encadrant:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },
  update: async (id,payload) => {
    try {
    return await axiosClient.put(`/admin/stagiaires/${id}`, {...payload,id});
    } catch (error) {
      console.error('Failed to create encadrant:', error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  },

};

export default StagiaireAdminApi;
