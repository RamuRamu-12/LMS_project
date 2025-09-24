import React from 'react';
import { motion } from 'framer-motion';
import { useProjectProgress } from '../../context/ProjectProgressContext';
import { useParams } from 'react-router-dom';

const NextButton = ({ currentPhase, currentModule, onNext }) => {
  const { projectId } = useParams();
  const { unlockNextModule, completeModule } = useProjectProgress();

  // Don't show the button for conclusion and final-steps modules since they have their own navigation
  if (currentModule === 'conclusion' || currentModule === 'final-steps') {
    return null;
  }

  const handleNext = () => {
    // Unlock next module in current phase
    unlockNextModule(projectId, currentPhase, currentModule);
    completeModule(projectId, currentPhase, currentModule);
    if (onNext) {
      onNext();
    }
  };

  return (
    <motion.button
      onClick={handleNext}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
    >
      <span className="font-medium">
        Next Module
      </span>
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg"
      >
        →
      </motion.div>
    </motion.button>
  );
};

export default NextButton;
