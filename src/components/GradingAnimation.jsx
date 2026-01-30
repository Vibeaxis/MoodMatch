import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react'; // Removed Check and X imports

function GradingAnimation({ selectedActivity, modifierApplied, onAnimationComplete, shouldRender }) {
  // 1. Local Active State
  const [isVisible, setIsVisible] = useState(false);
  
  // 2. Data Snapshot
  const [dataSnapshot, setDataSnapshot] = useState(null);
  
  const timerRef = useRef(null);

  // TRIGGER
  useEffect(() => {
    if (shouldRender && selectedActivity) {
      setIsVisible(true);
      setDataSnapshot(selectedActivity);
      
      if (timerRef.current) clearTimeout(timerRef.current);

      // Keep the 3.5s timer so the card lingers before vanishing
      timerRef.current = setTimeout(() => {
        handleClose();
      }, 3500);
    }
  }, [shouldRender, selectedActivity]);

  const handleClose = () => {
    setIsVisible(false);
    if (onAnimationComplete) onAnimationComplete();
  };

  // CLEANUP
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isVisible || !dataSnapshot) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
      onClick={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        handleClose();
      }}
    >
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center pointer-events-none">

        {/* --- THE CARD (KEPT) --- */}
        <motion.div
          initial={{ y: 200, opacity: 0, rotate: 10, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, rotate: -2, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="bg-[#FDFBF7] w-64 h-80 rounded-sm shadow-2xl p-6 relative flex flex-col items-center border border-stone-200 paper-texture pointer-events-auto"
        >
          <div className="border-b-2 border-stone-300 w-full pb-2 mb-4 text-center">
            <h2 className="font-mono-typewriter font-bold text-xl text-stone-900 leading-tight">
              {dataSnapshot.name}
            </h2>
            <p className="text-xs text-stone-500 font-serif italic mt-1">{dataSnapshot.lessonType}</p>
          </div>

          <div className="flex-grow flex items-center justify-center text-center">
            <p className="font-serif text-sm text-stone-600 leading-snug">{dataSnapshot.description}</p>
          </div>

          {modifierApplied && (
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full p-2 shadow-lg z-40 border-2 border-white">
              <Sparkles className="w-5 h-5" />
            </div>
          )}
        </motion.div>

        {/* --- FEEDBACK PANEL (DELETED) --- */}
        {/* It used to be here. Now it is gone. */}

      </div>
    </div>
  );
}

export default GradingAnimation;