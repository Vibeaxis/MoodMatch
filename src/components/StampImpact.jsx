import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function StampImpact({ onComplete }) {
  useEffect(() => {
    // Vibrate on mount (impact)
    if (navigator.vibrate) {
      navigator.vibrate(30); // Single sharp thud
    }
    
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 600); // Slightly longer to let particles settle
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Create 8 dust particles
  const particles = Array.from({ length: 8 });

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Subtler Warm Screen Flash (Less blinding) */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-amber-50" // Warm flash instead of pure white
      />
      
      {/* Main Impact Shockwave */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, borderWidth: "40px" }}
        animate={{ scale: 1.8, opacity: 0, borderWidth: "0px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute w-[400px] h-[400px] rounded-full border-stone-800/30"
      />

      {/* Dust Particles Explosion */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
              x: Math.cos(angle * (Math.PI / 180)) * 250, // Fly outward 250px
              y: Math.sin(angle * (Math.PI / 180)) * 250,
              scale: [0, 1.5, 0], // Grow then shrink
              opacity: 0 
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              delay: 0.05 // Slight delay for impact feel
            }}
            className="absolute w-4 h-4 rounded-full bg-stone-600/40 blur-sm"
          />
        );
      })}
    </div>
  );
}

export default StampImpact;