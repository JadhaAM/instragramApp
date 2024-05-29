
import axios from 'axios';


const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL; 
const api = axios.create({
  baseURL:apiUrl, 
  withCredentials: true, 
});


export default api;
