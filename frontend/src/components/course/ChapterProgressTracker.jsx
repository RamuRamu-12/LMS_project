import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiPlay, FiFileText, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useChapterProgress } from '../../hooks/useChapterProgress';

const ChapterProgressTracker = ({ 
  enrollmentId, 
  chapterId, 
  chapterTitle, 
  hasVideo = false, 
  hasPDF = false,
  onProgressUpdate 
}) => {
  const {
    getChapterProgress,
    isChapterCompleted,
    isVideoWatched,
    isPDFViewed,
    markCompleted,
    markVideoWatched,
    markPDFViewed,
    addTimeSpent,
    loading,
    error
  } = useChapterProgress(enrollmentId);

  const [isUpdating, setIsUpdating] = useState(false);

  const chapterProgress = getChapterProgress(chapterId);

  const handleMarkCompleted = async () => {
    try {
      setIsUpdating(true);
      await markCompleted(chapterId);
      onProgressUpdate?.();
    } catch (error) {
      console.error('Error marking chapter as completed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkVideoWatched = async () => {
    try {
      setIsUpdating(true);
      await markVideoWatched(chapterId);
      onProgressUpdate?.();
    } catch (error) {
      console.error('Error marking video as watched:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkPDFViewed = async () => {
    try {
      setIsUpdating(true);
      await markPDFViewed(chapterId);
      onProgressUpdate?.();
    } catch (error) {
      console.error('Error marking PDF as viewed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <p className="text-sm text-red-600">Error loading progress: {error}</p>
      </div>
    );
  }

  const isCompleted = isChapterCompleted(chapterId);
  const videoWatched = isVideoWatched(chapterId);
  const pdfViewed = isPDFViewed(chapterId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-indigo-200 rounded-xl p-4 space-y-3 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Progress Tracking</h4>
        {isCompleted && (
          <div className="flex items-center text-green-600">
            <FiCheckCircle className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Completed</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {/* Video Progress */}
        {hasVideo && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiPlay className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">Video</span>
            </div>
            <div className="flex items-center">
              {videoWatched ? (
                <div className="flex items-center text-green-600">
                  <FiCheck className="w-3 h-3 mr-1" />
                  <span className="text-xs">Watched</span>
                </div>
              ) : (
                <button
                  onClick={handleMarkVideoWatched}
                  disabled={isUpdating}
                  className="text-xs text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                >
                  Mark as Watched
                </button>
              )}
            </div>
          </div>
        )}

        {/* PDF Progress */}
        {hasPDF && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiFileText className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">PDF</span>
            </div>
            <div className="flex items-center">
              {pdfViewed ? (
                <div className="flex items-center text-green-600">
                  <FiCheck className="w-3 h-3 mr-1" />
                  <span className="text-xs">Viewed</span>
                </div>
              ) : (
                <button
                  onClick={handleMarkPDFViewed}
                  disabled={isUpdating}
                  className="text-xs text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                >
                  Mark as Viewed
                </button>
              )}
            </div>
          </div>
        )}

        {/* Time Spent */}
        {chapterProgress?.time_spent > 0 && (
          <div className="flex items-center">
            <FiClock className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">
              Time spent: {chapterProgress.time_spent} minutes
            </span>
          </div>
        )}
      </div>

      {/* Complete Chapter Button */}
      {!isCompleted && (videoWatched || pdfViewed) && (
        <button
          onClick={handleMarkCompleted}
          disabled={isUpdating}
          className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
        >
          {isUpdating ? 'Updating...' : 'Mark Chapter as Complete'}
        </button>
      )}

      {/* Enhanced Progress Summary */}
      {chapterProgress && (
        <div className="pt-3 border-t-2 border-indigo-100">
          <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Chapter Progress</span>
            <span className="text-indigo-600">
              {isCompleted ? '100%' : 
               videoWatched && pdfViewed ? '50%' :
               videoWatched || pdfViewed ? '25%' : '0%'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ 
                width: isCompleted ? '100%' : 
                       videoWatched && pdfViewed ? '50%' :
                       videoWatched || pdfViewed ? '25%' : '0%'
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChapterProgressTracker;
