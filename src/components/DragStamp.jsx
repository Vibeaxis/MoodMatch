import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { playStampSound } from '@/lib/AudioUtils';

function DragStamp({ targetRef, onCommit, grade, isVisible }) {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const [isInZone, setIsInZone] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Reset position when becoming visible
      controls.start({ x: 0, y: 0, scale: 1, opacity: 0.8 });
    }
  }, [isVisible, controls]);

  const handleDragStart = () => {
    setIsDragging(true);
    if (navigator.vibrate) navigator.vibrate(5);
  };

  const handleDrag = (event, info) => {
    if (!targetRef.current) return;

    const stampRect = event.target.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    // The Buffer (Ghost Hitbox)
    const buffer = 50; 

    const isOverlapping = 
      stampRect.right > (targetRect.left - buffer) &&
      stampRect.left < (targetRect.right + buffer) &&
      stampRect.bottom > (targetRect.top - buffer) &&
      stampRect.top < (targetRect.bottom + buffer);

    if (isOverlapping) {
      if (!isInZone) {
        setIsInZone(true);
        if (navigator.vibrate) navigator.vibrate([10, 5, 10]);
      }
    } else {
      if (isInZone) {
        setIsInZone(false);
      }
    }
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    if (isInZone && targetRef.current) {
      // Commit Stamp
      playStampSound();
      if (navigator.vibrate) navigator.vibrate(20);
      onCommit(); // Trigger parent flow
    } else {
      // Snap back
      controls.start({ x: 0, y: 0 });
      setIsInZone(false);
    }
  };

  // Keyboard support for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isVisible && e.key === 'Enter') {
        playStampSound();
        onCommit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onCommit]);

  if (!isVisible) return null;

  return (
    // UPDATED POSITION: Moved further in/up (bottom-24 right-24) on desktop
    // Added pointer-events-none to container so the empty space doesn't block clicks on folders behind it
    <div className="fixed bottom-6 right-6 md:bottom-24 md:right-24 z-[60] flex flex-col items-center pointer-events-none">
      <motion.div
        drag
        dragConstraints={null} 
        dragElastic={1}        
        dragMomentum={false}   
        animate={controls}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.1, cursor: 'grab' }}
        whileTap={{ scale: 0.95, cursor: 'grabbing' }}
        whileDrag={{ scale: 1.1, opacity: 1 }}
        // Added pointer-events-auto to the button so it's clickable
        className={`
          w-28 h-28 md:w-32 md:h-32 rounded-full border-4 shadow-2xl flex items-center justify-center
          backdrop-blur-sm transition-colors duration-300 pointer-events-auto
          ${isInZone ? 'bg-red-600 border-red-800 text-white' : 'bg-stone-100/80 border-stone-400 text-stone-400'}
        `}
        style={{ touchAction: 'none' }} 
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-current opacity-50 flex items-center justify-center">
           <span className="font-mono-typewriter font-bold text-lg md:text-xl uppercase tracking-widest select-none">
             {isInZone ? "DROP" : "STAMP"}
           </span>
        </div>
      </motion.div>
      
      {!isDragging && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-white font-mono-typewriter text-xs bg-black/50 px-2 py-1 rounded pointer-events-none select-none"
        >
          Drag to Morning Report
        </motion.p>
      )}
    </div>
  );
}

export default DragStamp;