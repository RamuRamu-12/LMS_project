import { useState, useEffect, useCallback } from 'react';
import { chapterProgressService } from '../services/chapterProgressService';

export const useChapterProgress = (enrollmentId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load progress data
  const loadProgress = useCallback(async () => {
    if (!enrollmentId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await chapterProgressService.getChapterProgress(enrollmentId);
      setProgress(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading chapter progress:', err);
    } finally {
      setLoading(false);
    }
  }, [enrollmentId]);

  // Update chapter progress
  const updateProgress = useCallback(async (chapterId, progressData) => {
    try {
      setError(null);
      const response = await chapterProgressService.updateChapterProgress(
        enrollmentId, 
        chapterId, 
        progressData
      );
      
      // Update local state
      setProgress(prevProgress => {
        if (!prevProgress) return prevProgress;
        
        const updatedChapters = prevProgress.chapters.map(chapter => 
          chapter.id === chapterId 
            ? { ...chapter, ...progressData }
            : chapter
        );
        
        return {
          ...prevProgress,
          chapters: updatedChapters,
          progress: response.data.overallProgress,
          enrollment: response.data.enrollment
        };
      });
      
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [enrollmentId]);

  // Mark chapter as completed
  const markCompleted = useCallback(async (chapterId) => {
    return updateProgress(chapterId, { is_completed: true });
  }, [updateProgress]);

  // Mark video as watched
  const markVideoWatched = useCallback(async (chapterId) => {
    return updateProgress(chapterId, { video_watched: true });
  }, [updateProgress]);

  // Mark PDF as viewed
  const markPDFViewed = useCallback(async (chapterId) => {
    return updateProgress(chapterId, { pdf_viewed: true });
  }, [updateProgress]);

  // Add time spent
  const addTimeSpent = useCallback(async (chapterId, minutes) => {
    return updateProgress(chapterId, { time_spent: minutes });
  }, [updateProgress]);

  // Get chapter progress by ID
  const getChapterProgress = useCallback((chapterId) => {
    if (!progress?.chapters) return null;
    return progress.chapters.find(chapter => chapter.id === chapterId);
  }, [progress]);

  // Check if chapter is completed
  const isChapterCompleted = useCallback((chapterId) => {
    const chapterProgress = getChapterProgress(chapterId);
    return chapterProgress?.is_completed || false;
  }, [getChapterProgress]);

  // Check if video is watched
  const isVideoWatched = useCallback((chapterId) => {
    const chapterProgress = getChapterProgress(chapterId);
    return chapterProgress?.video_watched || false;
  }, [getChapterProgress]);

  // Check if PDF is viewed
  const isPDFViewed = useCallback((chapterId) => {
    const chapterProgress = getChapterProgress(chapterId);
    return chapterProgress?.pdf_viewed || false;
  }, [getChapterProgress]);

  // Get overall progress percentage
  const getOverallProgress = useCallback(() => {
    return progress?.progress?.percentage || 0;
  }, [progress]);

  // Get completed chapters count
  const getCompletedChaptersCount = useCallback(() => {
    return progress?.progress?.completedChapters || 0;
  }, [progress]);

  // Get total chapters count
  const getTotalChaptersCount = useCallback(() => {
    return progress?.progress?.totalChapters || 0;
  }, [progress]);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    progress,
    loading,
    error,
    loadProgress,
    updateProgress,
    markCompleted,
    markVideoWatched,
    markPDFViewed,
    addTimeSpent,
    getChapterProgress,
    isChapterCompleted,
    isVideoWatched,
    isPDFViewed,
    getOverallProgress,
    getCompletedChaptersCount,
    getTotalChaptersCount
  };
};
