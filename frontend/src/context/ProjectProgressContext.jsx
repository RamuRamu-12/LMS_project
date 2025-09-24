import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectProgressContext = createContext();

export const useProjectProgress = () => {
  const context = useContext(ProjectProgressContext);
  if (!context) {
    throw new Error('useProjectProgress must be used within a ProjectProgressProvider');
  }
  return context;
};

export const ProjectProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('projectProgress');
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setProgress(parsedProgress);
      } else {
        setProgress({});
      }
    } catch (error) {
      console.error('Error loading project progress:', error);
      setProgress({});
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      try {
        localStorage.setItem('projectProgress', JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving project progress:', error);
      }
    }
  }, [progress]);

  const initializeProject = (projectId) => {
    setProgress(prev => {
      // If project doesn't exist or needs to be reset, initialize it
      if (!prev[projectId] || !prev[projectId].unlockedPhases?.includes('brd')) {
        const newProgress = {
          ...prev,
          [projectId]: {
            currentPhase: 'brd',
            unlockedPhases: ['brd'],
            unlockedModules: {
              brd: ['overview'],
              uiux: [],
              architectural: [],
              'code-development': [],
              testing: [],
              deployment: []
            },
            completedModules: {
              brd: [],
              uiux: [],
              architectural: [],
              'code-development': [],
              testing: [],
              deployment: []
            }
          }
        };
        return newProgress;
      }
      return prev;
    });
  };

  const unlockNextPhase = (projectId, currentPhase) => {
    const phases = ['brd', 'uiux', 'architectural', 'code-development', 'testing', 'deployment'];
    const currentIndex = phases.indexOf(currentPhase);
    
    if (currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1];
      setProgress(prev => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          unlockedPhases: [...new Set([...prev[projectId].unlockedPhases, nextPhase])],
          unlockedModules: {
            ...prev[projectId].unlockedModules,
            [nextPhase]: ['overview']
          }
        }
      }));
    }
  };

  const unlockNextModule = (projectId, phase, currentModule) => {
    const moduleOrder = {
      brd: ['overview', 'functional-requirements', 'non-functional-requirements', 'user-stories', 'conclusion'],
      uiux: ['overview', 'design-system', 'customer-pages', 'admin-pages', 'navigation-flow', 'conclusion'],
      architectural: ['overview', 'system-architecture', 'database-design', 'api-design', 'security-architecture', 'conclusion'],
      'code-development': ['overview', 'frontend-development', 'backend-development', 'database-implementation', 'testing', 'conclusion'],
      testing: ['overview', 'test-planning', 'unit-testing', 'integration-testing', 'performance-testing', 'conclusion'],
      deployment: ['overview', 'deployment-planning', 'environment-setup', 'final-steps']
    };

    const modules = moduleOrder[phase] || [];
    const currentIndex = modules.indexOf(currentModule);
    
    if (currentIndex < modules.length - 1) {
      const nextModule = modules[currentIndex + 1];
      setProgress(prev => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          unlockedModules: {
            ...prev[projectId].unlockedModules,
            [phase]: [...new Set([...prev[projectId].unlockedModules[phase], nextModule])]
          }
        }
      }));
    }
  };

  const completeModule = (projectId, phase, module) => {
    setProgress(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        completedModules: {
          ...prev[projectId].completedModules,
          [phase]: [...new Set([...prev[projectId].completedModules[phase], module])]
        }
      }
    }));
  };

  const isPhaseUnlocked = (projectId, phase) => {
    return progress[projectId]?.unlockedPhases?.includes(phase) || false;
  };

  const isModuleUnlocked = (projectId, phase, module) => {
    return progress[projectId]?.unlockedModules?.[phase]?.includes(module) || false;
  };

  const isModuleCompleted = (projectId, phase, module) => {
    return progress[projectId]?.completedModules?.[phase]?.includes(module) || false;
  };

  const getCurrentPhase = (projectId) => {
    return progress[projectId]?.currentPhase || 'brd';
  };

  const setCurrentPhase = (projectId, phase) => {
    setProgress(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        currentPhase: phase
      }
    }));
  };

  const value = {
    progress,
    isInitialized,
    initializeProject,
    unlockNextPhase,
    unlockNextModule,
    completeModule,
    isPhaseUnlocked,
    isModuleUnlocked,
    isModuleCompleted,
    getCurrentPhase,
    setCurrentPhase
  };

  return (
    <ProjectProgressContext.Provider value={value}>
      {children}
    </ProjectProgressContext.Provider>
  );
};
