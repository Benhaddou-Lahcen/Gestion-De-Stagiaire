import { axiosClient } from "../../api/axios";

const AssignApi = {
  create: async (payload) => {
    try {
      const response = await axiosClient.post('/admin/assign', payload);
      return response;
    } catch (error) {
      console.error('Failed to assign encadrants:', error);
      throw error;
    }
  },
  update: async (id, payload) => {
    try {
      const response = await axiosClient.put(`/admin/assign/${id}`, payload);
      return response;
    } catch (error) {
      console.error('Failed to update assignment:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/assign/${id}`);
      return response;
    } catch (error) {
      console.error('Failed to delete assignment:', error);
      throw error;
    }
  },
};

export default AssignApi;
