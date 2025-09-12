import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RealtimeProjectsPageSimple = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for testing
    const mockProjects = [
      {
        id: 1,
        title: 'E-Commerce Web Application',
        description: 'Build a complete e-commerce platform with modern technologies including React, Node.js, and PostgreSQL.',
        shortDescription: 'Full-stack e-commerce platform with React, Node.js, and PostgreSQL',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        isActive: true,
        order: 1,
        phases: [
          {
            id: 1,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define project scope, requirements, and technical specifications',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 8,
            order: 1
          },
          {
            id: 2,
            title: 'Phase 2 - UI/UX (User Interface/User Experience)',
            description: 'Design user interface and user experience for the e-commerce platform',
            phaseNumber: 2,
            phaseType: 'UI/UX',
            estimatedDuration: 8,
            order: 2
          },
          {
            id: 3,
            title: 'Phase 3 - Development',
            description: 'Implement the e-commerce application using React, Node.js, and PostgreSQL',
            phaseNumber: 3,
            phaseType: 'Development',
            estimatedDuration: 16,
            order: 3
          },
          {
            id: 4,
            title: 'Phase 4 - Testing & Quality Assurance',
            description: 'Test the application thoroughly and ensure quality standards',
            phaseNumber: 4,
            phaseType: 'Testing',
            estimatedDuration: 4,
            order: 4
          },
          {
            id: 5,
            title: 'Phase 5 - Deployment & Launch',
            description: 'Deploy the application to production and launch',
            phaseNumber: 5,
            phaseType: 'Deployment',
            estimatedDuration: 4,
            order: 5
          }
        ]
      },
      {
        id: 2,
        title: 'Data Analytics Dashboard',
        description: 'Create an interactive data analytics dashboard using modern visualization libraries and real-time data processing.',
        shortDescription: 'Interactive data analytics dashboard with real-time visualization',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        isActive: true,
        order: 2,
        phases: [
          {
            id: 6,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define data requirements and analytics objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 7,
            order: 1
          },
          {
            id: 7,
            title: 'Phase 2 - UI/UX (User Interface/User Experience)',
            description: 'Design dashboard interface and user experience',
            phaseNumber: 2,
            phaseType: 'UI/UX',
            estimatedDuration: 7,
            order: 2
          },
          {
            id: 8,
            title: 'Phase 3 - Development',
            description: 'Build the analytics dashboard with data processing and visualization',
            phaseNumber: 3,
            phaseType: 'Development',
            estimatedDuration: 14,
            order: 3
          },
          {
            id: 9,
            title: 'Phase 4 - Testing & Quality Assurance',
            description: 'Test dashboard functionality and data accuracy',
            phaseNumber: 4,
            phaseType: 'Testing',
            estimatedDuration: 3,
            order: 4
          },
          {
            id: 10,
            title: 'Phase 5 - Deployment & Launch',
            description: 'Deploy dashboard and set up monitoring',
            phaseNumber: 5,
            phaseType: 'Deployment',
            estimatedDuration: 4,
            order: 5
          }
        ]
      },
      {
        id: 3,
        title: 'AI-Powered Learning Assistant',
        description: 'Develop an intelligent learning assistant using AI and machine learning technologies.',
        shortDescription: 'Intelligent learning assistant with AI and machine learning',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        difficulty: 'advanced',
        estimatedDuration: 45,
        isActive: true,
        order: 3,
        phases: [
          {
            id: 11,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define AI requirements and learning objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 9,
            order: 1
          },
          {
            id: 12,
            title: 'Phase 2 - UI/UX (User Interface/User Experience)',
            description: 'Design AI-powered learning interface',
            phaseNumber: 2,
            phaseType: 'UI/UX',
            estimatedDuration: 9,
            order: 2
          },
          {
            id: 13,
            title: 'Phase 3 - Development',
            description: 'Implement AI learning assistant with machine learning',
            phaseNumber: 3,
            phaseType: 'Development',
            estimatedDuration: 18,
            order: 3
          },
          {
            id: 14,
            title: 'Phase 4 - Testing & Quality Assurance',
            description: 'Test AI functionality and learning effectiveness',
            phaseNumber: 4,
            phaseType: 'Testing',
            estimatedDuration: 5,
            order: 4
          },
          {
            id: 15,
            title: 'Phase 5 - Deployment & Launch',
            description: 'Deploy AI assistant and monitor performance',
            phaseNumber: 5,
            phaseType: 'Deployment',
            estimatedDuration: 4,
            order: 5
          }
        ]
      }
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setSelectedProject(mockProjects[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Realtime Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn by doing with hands-on projects that build real-world skills
          </p>
        </motion.div>

        {/* Project Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProjectSelect(project)}
                className={`
                  relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                  ${selectedProject?.id === project.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-md hover:shadow-lg'
                  }
                  backdrop-blur-sm border border-white/20
                `}
              >
                <span className="relative z-10">
                  {project.title}
                </span>
                
                {/* Project number badge */}
                <div className={`
                  absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${selectedProject?.id === project.id
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-600 text-white'
                  }
                `}>
                  {index + 1}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Project Content */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {/* Project Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {selectedProject.description}
                  </p>
                  
                  {/* Project Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <span className="font-semibold capitalize">{selectedProject.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                      <span className="text-sm font-medium">Duration:</span>
                      <span className="font-semibold">{selectedProject.estimatedDuration}h</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
                      <span className="text-sm font-medium">Phases:</span>
                      <span className="font-semibold">{selectedProject.phases?.length || 5}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Phases */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Phases</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedProject.phases?.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                        {/* Phase Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            {phase.phaseNumber}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                              {phase.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-2xl">🚀</span>
                              <span className="text-sm text-gray-500 font-medium">{phase.phaseType}</span>
                            </div>
                          </div>
                        </div>

                        {/* Phase Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {phase.description}
                        </p>

                        {/* Phase Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Duration: {phase.estimatedDuration}h</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            Phase {phase.phaseNumber}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RealtimeProjectsPageSimple;
