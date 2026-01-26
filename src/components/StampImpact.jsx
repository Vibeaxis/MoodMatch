
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function StampImpact({ onComplete }) {
  useEffect(() => {
    // Vibrate on mount (impact)
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Screen Flash */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white"
      />
      
      {/* Shockwave / Dust Motes */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[500px] h-[500px] rounded-full border-[20px] border-stone-800/20"
      />
    </div>
  );
}

export default StampImpact;
