import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectProgress } from '../../context/ProjectProgressContext';

const PhaseNavigationBar = ({ currentPhase = null }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isPhaseUnlocked, initializeProject, progress, isInitialized } = useProjectProgress();

  // Initialize project progress when component mounts
  React.useEffect(() => {
    if (projectId) {
      initializeProject(projectId);
    }
  }, [projectId, initializeProject, progress]);

  const phases = [
    {
      id: 'brd',
      name: 'BRD',
      fullName: 'Business Requirements',
      icon: '📋',
      color: 'from-blue-500 to-blue-600',
      route: `/realtime-projects/${projectId}/brd`
    },
    {
      id: 'uiux',
      name: 'UI/UX',
      fullName: 'UI/UX Design',
      icon: '🎨',
      color: 'from-purple-500 to-purple-600',
      route: `/realtime-projects/${projectId}/uiux`
    },
    {
      id: 'architectural',
      name: 'Architecture',
      fullName: 'Architectural Design',
      icon: '🏗️',
      color: 'from-indigo-500 to-indigo-600',
      route: `/realtime-projects/${projectId}/architectural`
    },
    {
      id: 'code-development',
      name: 'Development',
      fullName: 'Code Development',
      icon: '💻',
      color: 'from-green-500 to-green-600',
      route: `/realtime-projects/${projectId}/code-development`
    },
    {
      id: 'testing',
      name: 'Testing',
      fullName: 'Testing & QA',
      icon: '🧪',
      color: 'from-orange-500 to-orange-600',
      route: `/realtime-projects/${projectId}/testing`
    },
    {
      id: 'deployment',
      name: 'Deployment',
      fullName: 'Deployment',
      icon: '🚀',
      color: 'from-red-500 to-red-600',
      route: `/realtime-projects/${projectId}/deployment`
    }
  ];

  const handlePhaseClick = (phase) => {
    if (isPhaseUnlocked(projectId, phase.id)) {
      navigate(phase.route);
    }
  };

  if (!isInitialized) {
    return (
      <div className="py-1">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-1"
    >
      {/* Phase Navigation Bar */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-indigo-500 via-green-500 via-orange-500 to-red-500 z-0 rounded-full"></div>

        {/* Phase Buttons */}
        <div className="flex justify-between items-start relative z-10">
          {phases.map((phase, index) => {
            const isActive = currentPhase === phase.id;
            const isUnlocked = isPhaseUnlocked(projectId, phase.id);
            const isCompleted = phases.findIndex(p => p.id === currentPhase) > index;
            
            return (
              <motion.button
                key={phase.id}
                onClick={() => handlePhaseClick(phase)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.05, y: -1 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                className={`group transition-all duration-300 flex flex-col items-center ${
                  isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                title={isUnlocked ? phase.fullName : 'Locked - Complete previous phases to unlock'}
              >
                {/* Phase Circle */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md
                  transition-all duration-300 border border-white
                  ${isUnlocked 
                    ? `bg-gradient-to-r ${phase.color} text-white group-hover:shadow-lg` 
                    : 'bg-gray-300 text-gray-500'
                  }
                  ${isActive && isUnlocked ? 'ring-1 ring-white ring-opacity-70 scale-105' : ''}
                  ${isCompleted && isUnlocked ? 'ring-1 ring-green-400 ring-opacity-80' : ''}
                `}>
                  {isUnlocked ? (
                    isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="text-white text-xs"
                      >
                        ✓
                      </motion.div>
                    ) : (
                      <span className="text-xs">{phase.icon}</span>
                    )
                  ) : (
                    <span className="text-xs">🔒</span>
                  )}
                </div>

                {/* Phase Name */}
                <div className="mt-0.5 text-center">
                  <div className={`
                    text-xs font-medium transition-colors duration-300
                    ${isActive && isUnlocked 
                      ? 'text-gray-800 font-semibold' 
                      : isUnlocked 
                        ? 'text-gray-600 group-hover:text-gray-800' 
                        : 'text-gray-400'
                    }
                  `}>
                    {phase.name}
                  </div>
                </div>

                {/* Subtle Glow Effect for Active Phase */}
                {isActive && isUnlocked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.15 }}
                    transition={{ duration: 0.6 }}
                    className={`absolute top-0 rounded-full bg-gradient-to-r ${phase.color} blur-md`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PhaseNavigationBar;
