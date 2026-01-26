import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

function GradingAnimation({ selectedActivity, rank, feedback, modifierApplied, onAnimationComplete, shouldRender }) {
  
  // 1. AUTO-DISMISS TIMER
  useEffect(() => {
    if (!shouldRender) return;
    
    // Wait 3.5 seconds, then auto-advance
    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, 3500); 

    return () => clearTimeout(timer);
  }, [shouldRender, onAnimationComplete]);

  if (!shouldRender || !selectedActivity) return null;

  const isSuccess = rank === 'S' || rank === 'A';
  const isPerfect = rank === 'S';

  return (
    // 2. CLICK TO DISMISS (Early exit for fast readers)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      onClick={() => onAnimationComplete && onAnimationComplete()}
    >
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center pointer-events-none">

        {/* Card Display */}
        <motion.div
          initial={{ y: 200, opacity: 0, rotate: 10, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, rotate: -2, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: -100 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="bg-[#FDFBF7] w-64 h-80 rounded-sm shadow-2xl p-6 relative flex flex-col items-center border border-stone-200 paper-texture pointer-events-auto"
        >
          <div className="border-b-2 border-stone-300 w-full pb-2 mb-4 text-center">
            <h2 className="font-mono-typewriter font-bold text-xl text-stone-900 leading-tight">
              {selectedActivity.name}
            </h2>
            <p className="text-xs text-stone-500 font-serif italic mt-1">{selectedActivity.lessonType}</p>
          </div>

          <div className="flex-grow flex items-center justify-center text-center">
            <p className="font-serif text-sm text-stone-600 leading-snug">{selectedActivity.description}</p>
          </div>

          {modifierApplied && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full p-2 shadow-lg z-40 border-2 border-white"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          )}
        </motion.div>

        {/* Feedback Panel (Simplified - No Button) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-stone-900/95 text-stone-100 p-6 rounded-lg max-w-md backdrop-blur-md shadow-2xl border border-stone-700 w-full pointer-events-auto"
        >
          <div className="flex items-start gap-4">
            <div className={`mt-1 p-2 rounded-full shrink-0 ${isSuccess ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {isSuccess ? <Check className="w-6 h-6 text-green-400" /> : <X className="w-6 h-6 text-red-400" />}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg mb-1 font-mono-typewriter flex items-center gap-2">
                {isPerfect ? 'Excellent Choice!' : (rank === 'A' ? 'Solid Effort' : 'Needs Improvement')}
                {modifierApplied && <span className="text-[10px] bg-blue-600/50 px-2 py-0.5 rounded text-blue-100 uppercase tracking-wider">Bonus</span>}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed font-serif">
                {feedback}
              </p>
            </div>
          </div>
          
          {/* Subtle Progress Bar to show it's timed */}
          <motion.div 
            className="h-1 bg-stone-700 mt-4 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
             <motion.div 
               className="h-full bg-stone-400"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 3.5, ease: "linear" }}
             />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default GradingAnimation;