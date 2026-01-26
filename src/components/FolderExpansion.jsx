
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityCard from './ActivityCard';
import { getShuffledHand } from '@/lib/GameLogic';

function FolderExpansion({ activities, onActivitySelect, isOpen, onClose }) {
  const [displayedCards, setDisplayedCards] = useState([]);

  // When folder opens, shuffle and pick 3 cards
  useEffect(() => {
    if (isOpen && activities && activities.length > 0) {
      setDisplayedCards(getShuffledHand(activities, 3));
    }
  }, [isOpen, activities]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center pointer-events-auto">
            {/* Backdrop to close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            />
            
            {/* Cards Container */}
            <div className="relative z-50 flex items-center justify-center gap-4 md:gap-8 w-full px-4">
              {displayedCards.map((activity, index) => {
                // Determine rotation for fanning effect
                const rotate = (index - 1) * 6; // -6, 0, 6 degrees
                const yOffset = Math.abs(index - 1) * 10; // Center is highest

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ y: 200, opacity: 0, rotate: 0, scale: 0.5 }}
                    animate={{ 
                      y: yOffset, 
                      opacity: 1, 
                      rotate: rotate, 
                      scale: 1 
                    }}
                    exit={{ y: 200, opacity: 0, scale: 0.5 }}
                    transition={{ 
                      type: 'spring', 
                      damping: 15, 
                      delay: index * 0.1 
                    }}
                    className="w-48 md:w-56"
                  >
                    <ActivityCard 
                      activity={activity} 
                      onSelect={onActivitySelect} 
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Instruction Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-20 z-50 bg-stone-900/80 text-white px-4 py-2 rounded-full font-mono-typewriter text-sm"
            >
              Select an Activity Card
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FolderExpansion;
