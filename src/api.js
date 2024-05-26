
import axios from 'axios';

const api = axios.create({
  baseURL:" http://192.168.59.239:5000", 
  withCredentials: true, 
});


export default api;
