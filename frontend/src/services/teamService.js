import api from './api';

export const teamService = {
  // Create new team
  createTeam: async (teamData) => {
    const response = await api.post('/teams', teamData);
    return response.data;
  },

  // Get all teams
  getTeams: async (params = {}) => {
    const response = await api.get('/teams', { params });
    return response.data;
  },

  // Get single team
  getTeam: async (id) => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },

  // Update team
  updateTeam: async (id, teamData) => {
    const response = await api.put(`/teams/${id}`, teamData);
    return response.data;
  },

  // Join team with invite code
  joinTeam: async (inviteCode) => {
    const response = await api.post('/teams/join', { inviteCode });
    return response.data;
  },

  // Leave team
  leaveTeam: async (id) => {
    const response = await api.delete(`/teams/${id}/leave`);
    return response.data;
  },

  // Remove member from team
  removeMember: async (teamId, userId) => {
    const response = await api.delete(`/teams/${teamId}/members/${userId}`);
    return response.data;
  },

  // Delete team
  deleteTeam: async (id) => {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  },

  // Get team members
  getTeamMembers: async (id) => {
    const response = await api.get(`/teams/${id}/members`);
    return response.data;
  },
};