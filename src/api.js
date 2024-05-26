
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL, 
  withCredentials: true, 
});

export default api;
