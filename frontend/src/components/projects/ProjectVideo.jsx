import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

const ProjectVideo = ({ project }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Video</h3>
      
      {/* Video Player */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          {project.videoUrl ? (
            <ReactPlayer
              url={project.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    controls: 1,
                    rel: 0,
                    modestbranding: 1
                  }
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <h4 className="text-xl font-semibold mb-2">Video Coming Soon</h4>
                <p className="text-gray-300">Project video will be available soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {project.title} - Project Overview
          </h4>
          <p className="text-gray-600">
            Watch this video to get an overview of the project, its objectives, and what you'll learn.
          </p>
        </div>
      </div>

      {/* Video Chapters/Timestamps */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Video Chapters</h4>
        <div className="space-y-3">
          {[
            { time: '0:00', title: 'Project Introduction', description: 'Overview of the project and learning objectives' },
            { time: '2:30', title: 'Prerequisites', description: 'What you need to know before starting' },
            { time: '5:15', title: 'Project Structure', description: 'How the project is organized' },
            { time: '8:45', title: 'Getting Started', description: 'How to begin working on the project' },
            { time: '12:20', title: 'Next Steps', description: 'What to do after watching this video' }
          ].map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <div className="w-16 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-semibold group-hover:bg-blue-200 transition-colors">
                {chapter.time}
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {chapter.title}
                </h5>
                <p className="text-sm text-gray-600">{chapter.description}</p>
              </div>
              <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ▶
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              📚
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Project Documentation</h5>
              <p className="text-sm text-gray-600">Complete project guide and reference</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              💻
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Code Repository</h5>
              <p className="text-sm text-gray-600">Access to project source code</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              🎯
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Learning Objectives</h5>
              <p className="text-sm text-gray-600">What you'll achieve by completing this project</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              🚀
            </div>
            <div>
              <h5 className="font-medium text-gray-800">Getting Started</h5>
              <p className="text-sm text-gray-600">Step-by-step setup instructions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectVideo;
