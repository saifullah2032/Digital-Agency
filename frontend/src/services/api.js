import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add admin token to requests if available
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    config.headers['x-admin-token'] = adminToken;
  }
  return config;
});

// ========== PROJECTS API ==========
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  create: (formData) => api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/projects/${id}`),
};

// ========== CLIENTS API ==========
export const clientsAPI = {
  getAll: () => api.get('/clients'),
  create: (formData) => api.post('/clients', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/clients/${id}`),
};

// ========== CONTACT API ==========
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  delete: (id) => api.delete(`/contact/${id}`),
};

// ========== SUBSCRIPTION API ==========
export const subscriptionAPI = {
  subscribe: (email) => api.post('/subscribe', { email }),
  getAll: () => api.get('/subscribe'),
  unsubscribe: (id) => api.delete(`/subscribe/${id}`),
};

export default api;
