import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
