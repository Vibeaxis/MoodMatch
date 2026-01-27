import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ThumbsUp, Meh, HelpCircle, AlertTriangle } from 'lucide-react';

const GRADE_CONFIG = {
  'S': { icon: <Crown className="w-16 h-16 text-amber-500" />, label: 'Excellent!', color: 'bg-amber-50' },
  'A': { icon: <ThumbsUp className="w-16 h-16 text-green-600" />, label: 'Great Job', color: 'bg-green-50' },
  'B': { icon: <Meh className="w-16 h-16 text-blue-500" />, label: 'Okay', color: 'bg-blue-50' },
  'C': { icon: <HelpCircle className="w-16 h-16 text-orange-500" />, label: 'Confused', color: 'bg-orange-50' },
  'F': { icon: <AlertTriangle className="w-16 h-16 text-red-600" />, label: 'Chaos!', color: 'bg-red-50' }
};

function Polaroid({ grade, timestamp, index, isVisible, onClick }) {
  const config = GRADE_CONFIG[grade] || GRADE_CONFIG['F'];
  // Keep rotation stable for a given index
  const [rotation] = useState(Math.random() * 6 - 3 + (index * 2)); 

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
         initial={{ x: 300, opacity: 0, rotate: 15 }}
          animate={{ x: 0, opacity: 1, rotate: rotation }}
          exit={{ x: -300, opacity: 0, rotate: -15 }}
          
          // 2. Add the onClick handler here
          onClick={onClick}
          
          // 3. Add 'cursor-pointer' and 'pointer-events-auto' to ensure it captures clicks
          // 'pointer-events-auto' is crucial because the parent container is 'pointer-events-none'
          className="absolute top-20 right-4 md:right-10 w-48 bg-white p-3 pb-8 shadow-xl transform origin-top-right border border-stone-200 cursor-pointer pointer-events-auto hover:z-50 transition-all"
          
          style={{ zIndex: 30 + index }}
          
          // Optional: Add a subtle hover effect
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Photo Area */}
          <div className={`w-full aspect-square ${config.color} border border-stone-100 shadow-inner flex flex-col items-center justify-center mb-2 overflow-hidden relative`}>
            {/* Grain Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {config.icon}
            </motion.div>
            <div className="absolute bottom-2 right-2 font-mono-typewriter text-[10px] opacity-50 font-bold text-stone-900">
               {grade}-RANK
            </div>
          </div>

          {/* Handwritten Label */}
          <div className="font-serif italic text-stone-800 text-center transform -rotate-2">
            <p className="text-sm font-bold">{config.label}</p>
            <p className="text-[10px] text-stone-500">{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>

          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 rotate-1 backdrop-blur-sm border-l border-r border-white/60 shadow-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Polaroid;