import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  logout: () => api.get('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  uploadPhoto: (formData: FormData) => api.post('/users/profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deletePhoto: () => api.delete('/users/profile/photo'),
};

// Food API
export const foodAPI = {
  getAll: (params?: any) => api.get('/food', { params }),
  getById: (id: string) => api.get(`/food/${id}`),
  getCategories: () => api.get('/food/categories/list'),
  getSpecials: () => api.get('/food/specials/today'),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) => api.post('/orders', orderData),
  getAll: (params?: any) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status }),
  updatePayment: (id: string, paymentData: any) => api.put(`/orders/${id}/payment`, paymentData),
};

export default api;