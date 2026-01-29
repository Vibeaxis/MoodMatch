
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

    // THE FIX: Use an invisible "Buffer" (Ghost Hitbox)
    // This adds 50px of forgiveness to every side of the target.
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
    <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-center">
      <motion.div
  drag
  dragConstraints={null} // Let them drag anywhere on screen
  dragElastic={1}        // Zero resistance (1 = follows mouse 1:1)
  dragMomentum={false}   // Optional: Stops it from sliding like ice when released
  animate={controls}
  onDragStart={handleDragStart}
  onDrag={handleDrag}
  onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.1, cursor: 'grab' }}
        whileTap={{ scale: 0.95, cursor: 'grabbing' }}
        whileDrag={{ scale: 1.1, opacity: 1 }}
        className={`
          w-32 h-32 rounded-full border-4 shadow-2xl flex items-center justify-center
          backdrop-blur-sm transition-colors duration-300
          ${isInZone ? 'bg-red-600 border-red-800 text-white' : 'bg-stone-100/80 border-stone-400 text-stone-400'}
        `}
        style={{ touchAction: 'none' }} // Prevent scrolling on mobile while dragging
      >
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-current opacity-50 flex items-center justify-center">
           <span className="font-mono-typewriter font-bold text-xl uppercase tracking-widest">
             {isInZone ? "DROP" : "STAMP"}
           </span>
        </div>
      </motion.div>
      
      {!isDragging && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-white font-mono-typewriter text-xs bg-black/50 px-2 py-1 rounded"
        >
          Drag to Morning Report
        </motion.p>
      )}
    </div>
  );
}

export default DragStamp;
