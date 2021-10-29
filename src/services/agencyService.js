import axios from 'axios';
import { API_URL } from '../utils/constant';

export default {
  getAll: async token => {
    try {
      const response = await axios.get(`${API_URL}/agencies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  get: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/agencies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMajorAgencies: async (major_id, user_type_id, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/major-agencies/${major_id}/${user_type_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
