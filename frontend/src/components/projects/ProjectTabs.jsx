import React from 'react';
import { motion } from 'framer-motion';

const ProjectTabs = ({ projects, selectedProject, onProjectSelect }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      {projects.map((project, index) => (
        <motion.button
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onProjectSelect(project)}
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
          
          {/* Active indicator */}
          {selectedProject?.id === project.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

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
  );
};

export default ProjectTabs;
