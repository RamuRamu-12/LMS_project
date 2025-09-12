import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { progressService } from '../../services/progressService';
import toast from 'react-hot-toast';

const ProjectProgress = ({ project }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user, project.id]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await progressService.getProjectProgress(project.id);
      if (response.success) {
        setProgress(response.data);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
      toast.error('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (phaseId, status, progressPercentage) => {
    try {
      const response = await progressService.updateProgress({
        projectId: project.id,
        phaseId,
        status,
        progressPercentage
      });

      if (response.success) {
        toast.success('Progress updated successfully');
        fetchProgress();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const getPhaseProgress = (phaseId) => {
    return progress.find(p => p.phaseId === phaseId) || {
      status: 'not_started',
      progressPercentage: 0,
      timeSpent: 0
    };
  };

  const getOverallProgress = () => {
    if (!project.phases || project.phases.length === 0) return 0;
    
    const totalPhases = project.phases.length;
    const completedPhases = project.phases.filter(phase => {
      const phaseProgress = getPhaseProgress(phase.id);
      return phaseProgress.status === 'completed';
    }).length;

    return Math.round((completedPhases / totalPhases) * 100);
  };

  const getTotalTimeSpent = () => {
    return progress.reduce((total, p) => total + (p.timeSpent || 0), 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-green-600';
      case 'in_progress': return 'from-blue-500 to-blue-600';
      case 'skipped': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-300 to-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'skipped': return 'Skipped';
      default: return 'Not Started';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const overallProgress = getOverallProgress();
  const totalTimeSpent = getTotalTimeSpent();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h3>
      
      {/* Overall Progress Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold text-gray-800">Overall Progress</h4>
          <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Time Spent:</span>
            <span className="font-semibold text-gray-800">{Math.round(totalTimeSpent / 60)}h {totalTimeSpent % 60}m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Phases Completed:</span>
            <span className="font-semibold text-gray-800">
              {project.phases?.filter(phase => getPhaseProgress(phase.id).status === 'completed').length || 0} / {project.phases?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Phase Progress</h4>
        
        {project.phases?.map((phase, index) => {
          const phaseProgress = getPhaseProgress(phase.id);
          const isCompleted = phaseProgress.status === 'completed';
          const isInProgress = phaseProgress.status === 'in_progress';
          
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor(phaseProgress.status)}
                    flex items-center justify-center text-white text-lg font-bold shadow-lg
                  `}>
                    {isCompleted ? '✓' : phase.phaseNumber}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-lg">{phase.title}</h5>
                    <p className="text-sm text-gray-600">{phase.phaseType}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Status</div>
                  <div className={`font-semibold ${
                    isCompleted ? 'text-green-600' : 
                    isInProgress ? 'text-blue-600' : 
                    'text-gray-500'
                  }`}>
                    {getStatusText(phaseProgress.status)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{phaseProgress.progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${phaseProgress.progressPercentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor(phaseProgress.status)}`}
                  />
                </div>
              </div>

              {/* Phase Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Time Spent:</span>
                  <div className="font-semibold text-gray-800">
                    {Math.round((phaseProgress.timeSpent || 0) / 60)}h {(phaseProgress.timeSpent || 0) % 60}m
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Estimated:</span>
                  <div className="font-semibold text-gray-800">{phase.estimatedDuration}h</div>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <div className="font-semibold text-gray-800">
                    {phaseProgress.lastAccessedAt ? 
                      new Date(phaseProgress.lastAccessedAt).toLocaleDateString() : 
                      'Never'
                    }
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!isCompleted && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateProgress(phase.id, 'in_progress', 25)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Start Phase
                  </button>
                  {isInProgress && (
                    <button
                      onClick={() => updateProgress(phase.id, 'completed', 100)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Progress Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{overallProgress}%</div>
            <div className="text-sm text-gray-600">Overall Completion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {project.phases?.filter(phase => getPhaseProgress(phase.id).status === 'completed').length || 0}
            </div>
            <div className="text-sm text-gray-600">Phases Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(totalTimeSpent / 60)}h
            </div>
            <div className="text-sm text-gray-600">Total Time Spent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
