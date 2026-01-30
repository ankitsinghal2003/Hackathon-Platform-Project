import api from './api';

export const projectService = {
  // Create/Submit project
  createProject: async (projectData, files) => {
    const formData = new FormData();

    // Append project data
    Object.keys(projectData).forEach(key => {
      if (Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else {
        formData.append(key, projectData[key]);
      }
    });

    // Append files
    if (files?.projectFiles) {
      files.projectFiles.forEach(file => {
        formData.append('projectFiles', file);
      });
    }

    if (files?.screenshots) {
      files.screenshots.forEach(file => {
        formData.append('screenshots', file);
      });
    }

    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Submit project (finalize)
  submitProject: async (id) => {
    const response = await api.post(`/projects/${id}/submit`);
    return response.data;
  },

  // Get all projects
  getProjects: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get single project
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Update project
  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};