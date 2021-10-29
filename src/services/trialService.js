import axios from 'axios';
import { API_URL } from '../utils/constant';

export default {
  getAll: async token => {
    try {
      const response = await axios.get(`${API_URL}/trials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
