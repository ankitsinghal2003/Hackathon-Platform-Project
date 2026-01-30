import api from './api';

// Judge Service
export const judgeService = {
  // Get projects for evaluation
  getProjectsForEvaluation: async (params = {}) => {
    const response = await api.get('/judge/projects', { params });
    return response.data;
  },

  // Submit evaluation
  submitEvaluation: async (evaluationData) => {
    const response = await api.post('/judge/evaluate', evaluationData);
    return response.data;
  },

  // Get my evaluations
  getMyEvaluations: async () => {
    const response = await api.get('/judge/my-evaluations');
    return response.data;
  },

  // Update evaluation
  updateEvaluation: async (id, evaluationData) => {
    const response = await api.put(`/judge/evaluate/${id}`, evaluationData);
    return response.data;
  },

  // Get judge statistics
  getStats: async () => {
    const response = await api.get('/judge/stats');
    return response.data;
  },
};

// Admin Service
export const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // User management
  getAllUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  toggleUserStatus: async (userId) => {
    const response = await api.put(`/admin/users/${userId}/status`);
    return response.data;
  },

  // Submissions
  getAllSubmissions: async (params = {}) => {
    const response = await api.get('/admin/submissions', { params });
    return response.data;
  },

  // Hackathon configuration
  getHackathonConfig: async () => {
    const response = await api.get('/admin/hackathon');
    return response.data;
  },

  updateHackathonConfig: async (configData) => {
    const response = await api.put('/admin/hackathon', configData);
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },

  // Export data
  exportData: async (type) => {
    const response = await api.get(`/admin/export/${type}`);
    return response.data;
  },
};