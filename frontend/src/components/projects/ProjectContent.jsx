import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectPhases from './ProjectPhases';
import ProjectVideo from './ProjectVideo';
import ProjectReadme from './ProjectReadme';
import ProjectProgress from './ProjectProgress';

const ProjectContent = ({ project }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'phases', label: 'Phases', icon: '🚀' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'readme', label: 'Documentation', icon: '📚' },
    { id: 'progress', label: 'Progress', icon: '📊' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Project Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {project.title}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {project.description}
            </p>
            
            {/* Project Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                <span className="text-sm font-medium">Difficulty:</span>
                <span className="font-semibold capitalize">{project.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <span className="text-sm font-medium">Duration:</span>
                <span className="font-semibold">{project.estimatedDuration}h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
                <span className="text-sm font-medium">Phases:</span>
                <span className="font-semibold">{project.phases?.length || 5}</span>
              </div>
            </div>
          </div>

          {/* Project Thumbnail */}
          {project.thumbnail && (
            <div className="w-full md:w-64 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-6xl">
              🚀
            </div>
          )}
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden"
      >
        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300
                ${activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {project.phases && project.phases.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Project Phases</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.phases.map((phase, index) => (
                        <div key={phase.id} className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {phase.phaseNumber}
                            </div>
                            <h5 className="font-semibold text-gray-800">{phase.title}</h5>
                          </div>
                          <p className="text-sm text-gray-600">{phase.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'phases' && (
              <ProjectPhases project={project} />
            )}

            {activeTab === 'video' && (
              <ProjectVideo project={project} />
            )}

            {activeTab === 'readme' && (
              <ProjectReadme project={project} />
            )}

            {activeTab === 'progress' && (
              <ProjectProgress project={project} />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectContent;
