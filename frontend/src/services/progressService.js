import { api } from './api';

export const progressService = {
  // Update or create progress
  updateProgress: async (progressData) => {
    try {
      const response = await api.post('/projects/progress', progressData);
      return response.data;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  },

  // Get user progress for a project
  getProjectProgress: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project progress:', error);
      throw error;
    }
  },

  // Get all user progress
  getAllUserProgress: async () => {
    try {
      const response = await api.get('/projects/progress/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  },

  // Get project leaderboard
  getProjectLeaderboard: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/leaderboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project leaderboard:', error);
      throw error;
    }
  }
};
