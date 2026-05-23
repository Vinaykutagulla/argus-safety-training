import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me')
};

export const caseService = {
  createCase: (caseData) => api.post('/cases', caseData),
  getCases: (params) => api.get('/cases', { params }),
  getCaseById: (id) => api.get(`/cases/${id}`),
  updateCase: (id, data) => api.put(`/cases/${id}`, data),
  searchCases: (params) => api.get('/cases/search', { params })
};

export const adverseEventService = {
  createAdverseEvent: (eventData) => api.post('/adverse-events', eventData),
  getAdverseEventsByCase: (caseId) => api.get(`/adverse-events/case/${caseId}`),
  updateAdverseEvent: (id, data) => api.put(`/adverse-events/${id}`, data),
  deleteAdverseEvent: (id) => api.delete(`/adverse-events/${id}`)
};

export const meddraService = {
  searchMedDRA: (params) => api.get('/meddra/search', { params }),
  getMedDRAByCode: (code) => api.get(`/meddra/code/${code}`),
  getSOCs: () => api.get('/meddra/socs/list')
};

export const dashboardService = {
  getDashboardStats: () => api.get('/dashboard/stats'),
  getCasesTimeline: () => api.get('/dashboard/timeline'),
  getAdverseEventsReport: () => api.get('/dashboard/adverse-events-report')
};

export default api;
