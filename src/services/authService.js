import axios from 'axios';
import { API_URL } from '../utils/constant';

export default {
  login: async values => {
    try {
      const response = await axios.post(`${API_URL}/login`, values);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async values => {
    try {
      const response = await axios.post(`${API_URL}/register`, values);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
