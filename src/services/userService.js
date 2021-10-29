import axios from 'axios';
import { API_URL } from '../utils/constant';

export default {
  get: async token => {
    try {
      const response = await axios.get(`${API_URL}/my-score`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
