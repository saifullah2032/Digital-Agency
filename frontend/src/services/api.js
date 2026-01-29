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

// ========== CLIENT PORTAL API ==========
export const clientPortalAPI = {
  // Dashboard stats
  getStats: (email) => api.get('/client/stats', { params: { email } }),
  
  // Projects
  getProjects: (email) => api.get('/client/projects', { params: { email } }),
  
  // Messages
  getMessages: (email) => api.get('/client/messages', { params: { email } }),
  sendMessage: (data) => api.post('/client/messages', data),
  markAsRead: (id) => api.patch(`/client/messages/${id}/read`),
  
  // Files
  getFiles: (email) => api.get('/client/files', { params: { email } }),
  uploadFile: (data) => api.post('/client/files', data),
  deleteFile: (id) => api.delete(`/client/files/${id}`),
  
  // Email
  sendWelcomeEmail: (data) => api.post('/client/welcome-email', data),
};

// ========== ADMIN DASHBOARD API ==========
export const adminDashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getContacts: () => api.get('/dashboard/contacts'),
  getSubscribers: () => api.get('/dashboard/subscribers'),
};

// ========== ACTIVITY API ==========
export const activityAPI = {
  getClientActivities: (email, limit = 50, page = 1) => 
    api.get('/activities', { params: { email, limit, page } }),
  getProjectActivities: (projectId, email) => 
    api.get(`/activities/project/${projectId}`, { params: { email } }),
  getActivityStats: (email) => 
    api.get('/activities/stats', { params: { email } }),
  deleteOldActivities: () => 
    api.delete('/activities/cleanup'),
};

// ========== TEAM MEMBERS API ==========
export const teamMembersAPI = {
  getAll: (role, status, projectId) => 
    api.get('/team-members', { params: { role, status, projectId } }),
  getOne: (id) => 
    api.get(`/team-members/${id}`),
  create: (data) => 
    api.post('/team-members', data),
  update: (id, data) => 
    api.patch(`/team-members/${id}`, data),
  updatePermissions: (id, permissions) => 
    api.patch(`/team-members/${id}/permissions`, { permissions }),
  assignToProject: (id, projectId) => 
    api.post(`/team-members/${id}/assign-project`, { projectId }),
  removeFromProject: (id, projectId) => 
    api.delete(`/team-members/${id}/project/${projectId}`),
  delete: (id) => 
    api.delete(`/team-members/${id}`),
  getStats: () => 
    api.get('/team-members/stats'),
};

export default api;
