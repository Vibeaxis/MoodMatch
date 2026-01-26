
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LESSON_TYPES, ACTIVITY_CARDS } from '@/lib/GameLogic';
import FolderExpansion from './FolderExpansion';
import { Lock } from 'lucide-react';

function LessonPlanFolders({ onFolderSelect, disabled, disabledTypes = [], onActivitySelect, highlightedFolder }) {
  const folders = Object.entries(LESSON_TYPES);
  const [expandedFolder, setExpandedFolder] = useState(null);

  // Extended rotations to handle potential extra folders (Sabbatical, Extracurricular)
  const rotations = [-2, 1, -1, 2, -1, 1];

  const handleFolderClick = (type) => {
    if (disabled) return;
    if (disabledTypes.includes(type)) return;
    setExpandedFolder(type);
    onFolderSelect(type); 
  };

  const handleCloseExpansion = () => {
    setExpandedFolder(null);
  };

  const handleCardSelection = (activity) => {
    setExpandedFolder(null);
    onActivitySelect(activity);
  };

  return (
    <>
      <div className={`w-full max-w-md relative p-4 transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
        <h2 className="text-xl font-bold text-stone-200/50 mb-6 text-center uppercase tracking-widest font-mono-typewriter">
          Strategy Files
        </h2>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          {folders.map(([type, config], index) => {
            // Use config from GameLogic, with fallbacks to prevent crashes
            const colors = {
              base: config.base || 'bg-stone-700',
              tab: config.tab || 'bg-stone-600',
              shadow: config.shadow || 'shadow-stone-900/50'
            };
            
            const isHighlighted = highlightedFolder === type;
            const isLocked = disabledTypes.includes(type);
            const rotationIndex = index % rotations.length;

            return (
              <motion.button
                key={type}
                onClick={() => handleFolderClick(type)}
                disabled={disabled || isLocked}
                initial={{ rotate: rotations[rotationIndex] }}
                animate={isHighlighted ? { 
                  scale: [1, 1.1, 1],
                  rotate: [rotations[rotationIndex], 0, rotations[rotationIndex]],
                  boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.6)"
                } : { 
                  rotate: rotations[rotationIndex],
                  boxShadow: "0px 0px 0px rgba(0,0,0,0)"
                }}
                transition={isHighlighted ? { duration: 1, repeat: 2 } : {}}
                whileHover={disabled || isLocked ? {} : { 
                  scale: 1.05, 
                  rotate: 0, 
                  y: -10,
                  transition: { type: 'spring', stiffness: 300 } 
                }}
                whileTap={disabled || isLocked ? {} : { scale: 0.95, y: 0 }}
                className={`
                  relative w-full aspect-[4/3]
                  group
                  ${isHighlighted ? 'z-20 ring-4 ring-yellow-400 ring-offset-4 ring-offset-stone-900 rounded-lg' : ''}
                  ${isLocked ? 'grayscale opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {/* Folder Tab (Top Left) */}
                <div className={`
                  absolute -top-3 left-0 w-5/12 h-6 
                  ${colors.tab} rounded-t-lg z-0
                  border-t border-l border-r border-white/20
                  shadow-sm
                `}>
                  <span className="absolute top-1 left-2 text-[10px] font-bold text-white/90 uppercase tracking-wider">
                    REF-{index + 1}0{index}
                  </span>
                </div>

                {/* Main Folder Body */}
                <div className={`
                  relative z-10 w-full h-full 
                  ${colors.base} rounded-r-md rounded-bl-md rounded-br-md rounded-tl-none
                  shadow-xl ${colors.shadow}
                  border-t-2 border-white/10
                  flex flex-col items-start justify-center p-4
                  wood-texture
                `}>
                  {/* Lock Overlay */}
                  {isLocked && (
                     <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-md">
                        <Lock className="w-12 h-12 text-white opacity-80" />
                     </div>
                  )}

                  {/* Paper inside peeking out */}
                  <div className="absolute top-2 right-2 w-11/12 h-5/6 bg-white opacity-10 rotate-1 rounded-sm pointer-events-none" />

                  <div className="relative z-20 text-left">
                    <div className="bg-white/90 px-2 py-1 mb-2 inline-block shadow-sm transform -rotate-1">
                      <span className="text-stone-900 font-mono-typewriter font-bold text-lg uppercase tracking-tighter">
                        {type}
                      </span>
                    </div>
                    <div className="text-white/80 font-serif text-xs italic leading-tight max-w-[90%]">
                      {config.description}
                    </div>
                  </div>

                  {/* Decorative label holder */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-2 border-white/30 rounded-full opacity-50" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expanded View Overlay */}
      <FolderExpansion 
        isOpen={!!expandedFolder}
        activities={expandedFolder ? ACTIVITY_CARDS[expandedFolder] : []}
        onActivitySelect={handleCardSelection}
        onClose={handleCloseExpansion}
      />
    </>
  );
}

export default LessonPlanFolders;
