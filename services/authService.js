import axios from 'axios';

const API_URL = '/api/auth';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  async login(usernameOrEmail, password) {
    try {
      const response = await axiosInstance.post('/signin', {
        usernameOrEmail,
        password
      });
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async register(firstName, lastName, username, email, password) {
    try {
      const response = await axiosInstance.post('/signup', {
        firstName,
        lastName,
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getCurrentToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getCurrentToken();
  }
};

export default authService; 