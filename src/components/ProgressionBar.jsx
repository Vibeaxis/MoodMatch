import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

function ProgressionBar({ xp, maxXp, streak, gradeLevel, nextUnlockAt, onPlannerClick }) {
  // FIX: Safeguard against division by zero. If maxXp is 0 or missing, default to 0%.
  const safeMaxXp = maxXp || 1; 
  const xpPercentage = Math.min((xp / safeMaxXp) * 100, 100);

  // Generate tick marks for the ruler
  const ticks = Array.from({ length: 41 }).map((_, i) => ({
    height: i % 10 === 0 ? 'h-6' : i % 5 === 0 ? 'h-4' : 'h-2',
    label: i % 10 === 0 ? `${i * 2.5}%` : null
  }));

  return (
    <div className="w-full relative mx-auto max-w-4xl">
      {/* Sticky Note for Grade Level - CLICKABLE NOW */}
      <motion.button 
        onClick={onPlannerClick}
        initial={{ rotate: -5, y: -20 }}
        animate={{ rotate: -3, y: 0 }}
        whileHover={{ scale: 1.05, rotate: -6 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -left-4 -top-6 z-20 bg-yellow-200 paper-texture shadow-lg p-3 w-32 transform -rotate-3 cursor-pointer group"
      >
        <div className="text-stone-800 font-mono-typewriter text-xs font-bold text-center border-b-2 border-yellow-300 mb-1 pb-1 group-hover:text-stone-900">
          TEACHER ID
        </div>
        <div className="flex flex-col items-center">
          <GraduationCap className="w-6 h-6 text-stone-700 mb-1" />
          <span className="text-stone-900 font-bold text-sm text-center leading-tight">{gradeLevel}</span>
        </div>
        {/* Pin */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-600 shadow-sm border border-red-800" />
        
        {/* Hint text */}
        <div className="absolute -bottom-6 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] bg-black/70 text-white px-2 py-1 rounded-full">Open Planner</span>
        </div>
      </motion.button>

      {/* Main Ruler Body */}
      <div className="bg-[#D4A373] wood-texture rounded-sm shadow-xl border-b-4 border-[#A07855] relative h-24 flex flex-col justify-end px-4">
        
        {/* XP Fill - "Inlaid" into the wood */}
        <div className="absolute top-1/2 left-4 right-4 h-3 bg-[#8B6B4C] rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          />
        </div>

        {/* Ticks and Measurements */}
        <div className="flex justify-between items-end w-full pb-1">
          {ticks.map((tick, i) => (
            <div key={i} className="flex flex-col items-center gap-1 w-px">
              {tick.label && (
                 <span className="text-[10px] font-mono-typewriter text-stone-800 font-bold absolute -top-2 opacity-60">
                   {tick.label === '0%' ? 'START' : tick.label === '100%' ? 'MAX' : ''}
                 </span>
              )}
              <div className={`w-0.5 bg-stone-800/40 ${tick.height}`} />
            </div>
          ))}
        </div>

        {/* Metal Edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-stone-300 to-stone-400 opacity-50" />
        
        {/* Next Unlock Sticky Note */}
        {nextUnlockAt !== null && (
           <motion.div 
             initial={{ rotate: 2 }}
             className="absolute -right-2 -bottom-8 z-20 bg-green-100 paper-texture shadow-md p-2 transform rotate-2 border border-green-200"
           >
             <p className="font-mono-typewriter text-[10px] text-green-900 leading-tight">
               NEXT UNLOCK:<br/>
               <span className="font-bold text-lg">{nextUnlockAt} STREAK</span>
             </p>
           </motion.div>
        )}
      </div>

      <div className="absolute right-4 top-2 text-xs font-mono-typewriter text-[#8B6B4C] font-bold opacity-70">
        CLASSROOM XP METER
      </div>
    </div>
  );
}

export default ProgressionBar;