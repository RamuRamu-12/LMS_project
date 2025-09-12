import React from 'react';
import { motion } from 'framer-motion';

const ProjectPhases = ({ project }) => {
  const phases = project.phases || [];

  const phaseColors = {
    'BRD': 'from-blue-500 to-blue-600',
    'UI/UX': 'from-purple-500 to-purple-600',
    'Development': 'from-green-500 to-green-600',
    'Testing': 'from-orange-500 to-orange-600',
    'Deployment': 'from-red-500 to-red-600'
  };

  const phaseIcons = {
    'BRD': '📋',
    'UI/UX': '🎨',
    'Development': '💻',
    'Testing': '🧪',
    'Deployment': '🚀'
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Phases</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phases.map((phase, index) => (
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
                <div className={`
                  w-12 h-12 rounded-xl bg-gradient-to-r ${phaseColors[phase.phaseType] || 'from-gray-500 to-gray-600'}
                  flex items-center justify-center text-white text-xl font-bold shadow-lg
                `}>
                  {phase.phaseNumber}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                    {phase.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl">{phaseIcons[phase.phaseType]}</span>
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

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '0%' }} // This would be dynamic based on user progress
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Started</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Phase Timeline */}
      <div className="mt-12">
        <h4 className="text-xl font-semibold text-gray-800 mb-6">Phase Timeline</h4>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative flex items-start gap-6 mb-8 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className={`
                w-16 h-16 rounded-full bg-gradient-to-r ${phaseColors[phase.phaseType] || 'from-gray-500 to-gray-600'}
                flex items-center justify-center text-white text-xl font-bold shadow-lg z-10
              `}>
                {phase.phaseNumber}
              </div>

              {/* Phase Content */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{phaseIcons[phase.phaseType]}</span>
                  <h5 className="font-bold text-gray-800 text-lg">{phase.title}</h5>
                </div>
                <p className="text-gray-600 mb-4">{phase.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Duration: {phase.estimatedDuration}h</span>
                  <span>•</span>
                  <span>Type: {phase.phaseType}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPhases;
