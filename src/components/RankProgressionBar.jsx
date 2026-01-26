
import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { RANK_CONFIG, getProgressToNextRank } from '@/lib/GameLogic';

function RankProgressionBar({ currentRankId, totalXP }) {
  // currentRankId coming in is expected to be an index 0-8. 
  // However, getProgressToNextRank expects totalXP and uses getCurrentRankIndex internally if totalXP is provided.
  // We can just rely on totalXP for the source of truth to ensure bar matches IDTab.
  
  const progressData = getProgressToNextRank(totalXP);
  
  // Safe Fallbacks
  const currentRankName = progressData.currentRank || 'Unknown';
  const nextRankName = progressData.nextRank || 'Max Rank';
  const percentage = Math.max(0, Math.min(100, progressData.percentage));

  return (
    <div className="w-full bg-white rounded-lg p-4 border border-stone-200 mt-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        
        {/* Beaker / Flask Visualization */}
        <div className="relative w-16 h-20 flex-shrink-0 flex items-center justify-center">
          <FlaskConical className="w-16 h-16 text-stone-300 absolute z-10" strokeWidth={1.5} />
          {/* Liquid Fill */}
          <div className="absolute bottom-2 left-[18px] right-[18px] bg-amber-200 rounded-b-full overflow-hidden h-[50px] z-0 opacity-80" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)' }}>
             <motion.div 
               className="bg-amber-500 w-full absolute bottom-0"
               initial={{ height: '0%' }}
               animate={{ height: `${percentage}%` }}
               transition={{ duration: 1, type: "spring" }}
             />
          </div>
        </div>

        {/* Text and Bar */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-end mb-1">
            <h3 className="font-bold text-stone-800 text-lg leading-none">{currentRankName}</h3>
            <span className="text-xs text-stone-500 font-mono-typewriter uppercase">
               Next: {nextRankName}
            </span>
          </div>

          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200 relative">
             <motion.div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8 }}
             />
          </div>
          
          <div className="text-right mt-1">
            <span className="text-xs text-stone-400 font-mono-typewriter">
               {progressData.isMaxRank ? 'MAX RANK' : `${Math.floor(progressData.xpToNextRank)} XP to Promotion`}
            </span>
          </div>
        </div>
      </div>

      {/* Rank Badges Row - Now 9 Dots */}
      <div className="mt-4 flex justify-between items-center gap-1 overflow-x-auto pb-2 scrollbar-hide w-full px-2">
        {RANK_CONFIG.map((rank) => {
          // progressData logic uses internal calculation, but let's compare against passed currentRankId to show "active"
          // Or compare totalXP vs rank.minXP
          const isUnlocked = totalXP >= rank.minXP;
          const isCurrent = rank.index === currentRankId;
          
          return (
            <div key={rank.index} className="flex flex-col items-center flex-1 min-w-[20px]">
              <div 
                className={`
                  w-3 h-3 rounded-full mb-1 transition-all duration-300
                  ${isCurrent ? 'bg-amber-500 scale-125 ring-2 ring-amber-200 shadow-md' : isUnlocked ? 'bg-amber-300/50' : 'bg-stone-200'}
                `}
              />
              {/* Only show labels for Start, End, and Current to avoid overlap */}
              {(isCurrent || rank.index === 0 || rank.index === RANK_CONFIG.length - 1) && (
                <span className={`text-[8px] uppercase font-bold whitespace-nowrap ${isCurrent ? 'text-amber-700' : 'text-stone-300'}`}>
                  {rank.index === 0 ? 'Start' : (rank.index === RANK_CONFIG.length - 1 ? 'Dean' : 'You')}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RankProgressionBar;
