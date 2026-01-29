import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ThumbsUp, Meh, HelpCircle, AlertTriangle } from 'lucide-react';

// 1. Updated Icon sizes to be responsive (w-8 on mobile, w-16 on desktop)
const GRADE_CONFIG = {
  'S': { icon: <Crown className="w-8 h-8 md:w-16 md:h-16 text-amber-500" />, label: 'Excellent!', color: 'bg-amber-50' },
  'A': { icon: <ThumbsUp className="w-8 h-8 md:w-16 md:h-16 text-green-600" />, label: 'Great Job', color: 'bg-green-50' },
  'B': { icon: <Meh className="w-8 h-8 md:w-16 md:h-16 text-blue-500" />, label: 'Okay', color: 'bg-blue-50' },
  'C': { icon: <HelpCircle className="w-8 h-8 md:w-16 md:h-16 text-orange-500" />, label: 'Confused', color: 'bg-orange-50' },
  'F': { icon: <AlertTriangle className="w-8 h-8 md:w-16 md:h-16 text-red-600" />, label: 'Chaos!', color: 'bg-red-50' }
};

function Polaroid({ grade, timestamp, index, isVisible, onClick }) {
  const config = GRADE_CONFIG[grade] || GRADE_CONFIG['F'];
  const [rotation] = useState(Math.random() * 6 - 3 + (index * 2)); 

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0, rotate: 15 }}
          animate={{ x: 0, opacity: 1, rotate: rotation }}
          exit={{ x: -300, opacity: 0, rotate: -15 }}
          onClick={onClick}
          
          // 2. RESIZED CONTAINER: w-32 on mobile, w-48 on desktop
          // Adjusted padding (p-2 vs p-3) and bottom padding (pb-6 vs pb-8)
          className="absolute top-20 right-4 md:right-10 w-32 md:w-48 bg-white p-2 md:p-3 pb-6 md:pb-8 shadow-xl transform origin-top-right border border-stone-200 cursor-pointer pointer-events-auto hover:z-50 transition-all"
          
          style={{ zIndex: 30 + index }}
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
            <div className="absolute bottom-2 right-2 font-mono-typewriter text-[8px] md:text-[10px] opacity-50 font-bold text-stone-900">
               {grade}-RANK
            </div>
          </div>

          {/* Handwritten Label */}
          <div className="font-serif italic text-stone-800 text-center transform -rotate-2">
            {/* 3. Scaled text sizes down for mobile */}
            <p className="text-xs md:text-sm font-bold leading-tight">{config.label}</p>
            <p className="text-[8px] md:text-[10px] text-stone-500">{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>

          {/* Tape - Scaled down */}
          <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 w-8 h-3 md:w-12 md:h-4 bg-white/40 rotate-1 backdrop-blur-sm border-l border-r border-white/60 shadow-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Polaroid;