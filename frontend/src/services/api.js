// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Adjust this to match your server URL
    // baseURL: 'https://codedev-crm-company.onrender.com/api/v1', // Adjust this to match your server URL

  withCredentials: true, // This is important for handling cookies
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add any common headers or authentication tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here (e.g., unauthorized, server errors)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      // For example, redirect to login page or refresh token
    }
    return Promise.reject(error);
  }
);

export default api;
