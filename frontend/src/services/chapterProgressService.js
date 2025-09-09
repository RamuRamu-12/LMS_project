import api from './api';

export const chapterProgressService = {
  // Get chapter progress for an enrollment
  getChapterProgress: async (enrollmentId) => {
    try {
      const response = await api.get(`/progress/enrollment/${enrollmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get chapter progress');
    }
  },

  // Update chapter progress
  updateChapterProgress: async (enrollmentId, chapterId, progressData) => {
    try {
      const response = await api.put(`/progress/enrollment/${enrollmentId}/chapter/${chapterId}`, progressData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update chapter progress');
    }
  },

  // Mark chapter as completed
  markChapterCompleted: async (enrollmentId, chapterId) => {
    try {
      const response = await api.post(`/progress/enrollment/${enrollmentId}/chapter/${chapterId}/complete`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark chapter as completed');
    }
  },

  // Mark video as watched
  markVideoWatched: async (enrollmentId, chapterId) => {
    try {
      const response = await api.post(`/progress/enrollment/${enrollmentId}/chapter/${chapterId}/video-watched`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark video as watched');
    }
  },

  // Mark PDF as viewed
  markPDFViewed: async (enrollmentId, chapterId) => {
    try {
      const response = await api.post(`/progress/enrollment/${enrollmentId}/chapter/${chapterId}/pdf-viewed`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark PDF as viewed');
    }
  },

  // Add time spent on chapter
  addTimeSpent: async (enrollmentId, chapterId, minutes) => {
    try {
      const response = await api.post(`/progress/enrollment/${enrollmentId}/chapter/${chapterId}/time-spent`, {
        minutes
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add time spent');
    }
  },

  // Get course progress statistics (for instructors)
  getCourseProgressStats: async (courseId) => {
    try {
      const response = await api.get(`/progress/course/${courseId}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get course progress statistics');
    }
  }
};
