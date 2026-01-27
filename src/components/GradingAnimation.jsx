import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

function GradingAnimation({ selectedActivity, rank, feedback, modifierApplied, onAnimationComplete, shouldRender }) {
  // 1. Local Active State: Keeps the window open even if parent turns off 'shouldRender'
  const [isVisible, setIsVisible] = useState(false);
  
  // 2. Data Snapshot: Saves the card info so it doesn't crash when parent clears 'selectedActivity'
  const [dataSnapshot, setDataSnapshot] = useState(null);
  
  const timerRef = useRef(null);

  // TRIGGER: When parent says "Go", we lock the state and save the data
  useEffect(() => {
    if (shouldRender && selectedActivity) {
      setIsVisible(true);
      setDataSnapshot(selectedActivity); // Capture the data immediately
      
      // Clear any running timers
      if (timerRef.current) clearTimeout(timerRef.current);

      // Start the 3.5s countdown
      timerRef.current = setTimeout(() => {
        handleClose();
      }, 3500);
    }
  }, [shouldRender, selectedActivity]);

  const handleClose = () => {
    setIsVisible(false);
    // Slight delay to allow exit animation if needed, or clear immediately
    if (onAnimationComplete) onAnimationComplete();
  };

  // CLEANUP: specific to unmounting
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // RENDER CONDITION: Rely on local 'isVisible' and the saved 'dataSnapshot'
  if (!isVisible || !dataSnapshot) return null;

  const isSuccess = rank === 'S' || rank === 'A';
  const isPerfect = rank === 'S';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
      onClick={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        handleClose();
      }}
    >
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center pointer-events-none">

        {/* --- THE CARD --- */}
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

        {/* --- FEEDBACK PANEL --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-stone-900/95 text-stone-100 p-6 rounded-lg max-w-md backdrop-blur-md shadow-2xl border border-stone-700 w-full pointer-events-auto"
        >
          <div className="flex items-start gap-4">
            <div className={`mt-1 p-2 rounded-full shrink-0 ${isSuccess ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {isSuccess ? <Check className="w-6 h-6 text-green-400" /> : <X className="w-6 h-6 text-red-400" />}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg mb-1 font-mono-typewriter flex items-center gap-2 uppercase tracking-tighter">
                {isPerfect ? 'Excellent Choice' : (rank === 'A' ? 'Standard Procedure' : 'Deviation Detected')}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed font-serif italic opacity-80">
                {feedback}
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-stone-800 mt-4 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-stone-500"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 3.5, ease: "linear" }}
             />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GradingAnimation;