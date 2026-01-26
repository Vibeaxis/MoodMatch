
import React from 'react';
import { motion } from 'framer-motion';
import { User, Star, FlaskConical, BookOpen, Compass, BarChart } from 'lucide-react';
import { RANK_CONFIG, getProgressToNextRank, PHILOSOPHY_CONFIG } from '@/lib/GameLogic';

function IDTab({ currentRank, totalXP, currentStreak, playerProfile }) {
  // Use helper to get derived data based on TOTAL XP, as currentRank state might just be an index
  const progressData = getProgressToNextRank(totalXP);
  // progressData: { currentRank, nextRank, currentXP, neededXP, xpToNextRank, percentage, isMaxRank }

  // Safe fallback for names
  const currentRankName = progressData.currentRank || 'Unknown';
  const nextRankName = progressData.nextRank || 'Max Rank';
  
  // Clamp percentage visually for safety
  const clampedPercentage = Math.max(0, Math.min(100, progressData.percentage));

  const philosophy = PHILOSOPHY_CONFIG[playerProfile?.philosophy || 'Pragmatist'];

  const PhilosophyIcon = {
    'Traditionalist': BookOpen,
    'Progressive': Compass,
    'Pragmatist': BarChart
  }[philosophy.id];

  return (
    <div className="h-full flex flex-col items-center justify-start p-4 md:p-6 bg-[#F5F1E8] rounded-sm shadow-inner relative overflow-y-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* ID Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden relative transform -rotate-1 transition-transform hover:rotate-0 duration-300 flex-shrink-0">
        
        {/* Header */}
        <div className="bg-[#2c3e50] p-5 flex items-center gap-4 border-b-4 border-[#FFD700]">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden shrink-0">
             <User className="w-8 h-8 text-stone-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold font-mono-typewriter tracking-widest text-lg leading-tight truncate">FACULTY ID</h2>
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.25em] truncate">Department of Education</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 gap-5 mb-8">
            <div className="flex justify-between items-baseline border-b border-stone-100 pb-1.5 group">
               <label className="text-stone-400 text-[10px] font-bold uppercase tracking-wider group-hover:text-amber-500 transition-colors">Current Rank</label>
               <span className="text-stone-800 font-serif font-bold text-xl">{currentRankName}</span>
            </div>
            
            <div className="flex justify-between items-baseline border-b border-stone-100 pb-1.5 group">
               <label className="text-stone-400 text-[10px] font-bold uppercase tracking-wider group-hover:text-blue-500 transition-colors">Total XP</label>
               <span className="text-stone-800 font-mono-typewriter font-bold text-xl">{totalXP}</span>
            </div>

             <div className="flex justify-between items-baseline border-b border-stone-100 pb-1.5 group">
               <label className="text-stone-400 text-[10px] font-bold uppercase tracking-wider group-hover:text-green-500 transition-colors">Streak</label>
               <div className="flex items-center gap-2">
                 <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                 <span className="text-stone-900 font-mono-typewriter font-bold text-2xl leading-none">{currentStreak}</span>
               </div>
            </div>
            
            {/* Philosophy Badge */}
            <div className="mt-2 bg-stone-50 border border-stone-200 rounded-lg p-3 flex items-center gap-3">
               <div className={`p-2 rounded-full bg-opacity-20 ${philosophy.id === 'Traditionalist' ? 'bg-blue-500 text-blue-700' : philosophy.id === 'Progressive' ? 'bg-green-500 text-green-700' : 'bg-purple-500 text-purple-700'}`}>
                   <PhilosophyIcon className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Philosophy</div>
                  <div className="font-serif font-bold text-stone-800">{philosophy.name}</div>
                  <div className="text-[10px] text-stone-500 leading-tight">{philosophy.description}</div>
               </div>
            </div>

          </div>

          {/* Career Progression Section */}
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 shadow-inner">
            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">Career Progression</h3>
            
            <div className="flex flex-col gap-4">
               {/* Visualization Row */}
               <div className="flex items-center gap-4">
                  
                  {/* Animated Beaker */}
                  <div className="relative w-12 h-14 flex-shrink-0 mx-auto">
                      {/* Glass Outline */}
                      <FlaskConical className="w-full h-full text-stone-400 relative z-20" strokeWidth={1.5} />
                      
                      {/* Liquid Container (Clipped to Flask Shape) */}
                      <div className="absolute top-[10%] bottom-[5%] left-[15%] right-[15%] z-10 overflow-hidden opacity-90"
                           style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
                         {/* The Liquid */}
                         <motion.div 
                           className="bg-[#FFD700] w-full absolute bottom-0 left-0 right-0"
                           initial={{ height: '0%' }}
                           animate={{ height: `${clampedPercentage}%` }}
                           transition={{ duration: 1.5, type: "spring", damping: 15 }}
                         >
                            {/* Bubbles effect overlay */}
                            <div className="absolute inset-0 w-full h-full opacity-30" 
                                 style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '4px 4px' }} />
                         </motion.div>
                      </div>
                  </div>
                  
                  {/* Progress Info */}
                  <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1.5">
                          <span className="text-xs font-bold text-stone-700 truncate mr-2">
                            {progressData.isMaxRank ? 'MAX LEVEL' : 'In Progress'}
                          </span>
                          <span className="text-[9px] text-stone-400 uppercase truncate">
                            Next: {nextRankName}
                          </span> 
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2.5 w-full bg-white rounded-full overflow-hidden mb-1.5 border border-stone-200 shadow-sm">
                          <motion.div 
                              className="h-full bg-gradient-to-r from-amber-300 to-[#FFD700]"
                              initial={{ width: 0 }}
                              animate={{ width: `${clampedPercentage}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                          />
                      </div>
                      
                      <div className="flex justify-between items-center">
                          <span className="text-[8px] text-stone-400 uppercase tracking-wider">XP Progress</span>
                          <span className="text-[9px] font-mono-typewriter font-bold text-stone-600">
                             {progressData.isMaxRank ? 'MAX' : `${Math.floor(progressData.xpToNextRank)} XP to go`}
                          </span>
                      </div>
                  </div>
               </div>

               {/* Rank Milestones (Dots) */}
               <div className="relative pt-2 pb-1 px-1">
                   {/* Connecting Line */}
                   <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-stone-200 -z-0 -translate-y-[20%]"></div>
                   
                   <div className="flex justify-between items-center relative z-10">
                       {RANK_CONFIG.map((rank) => {
                           // currentRank passed to component is an index
                           const isCurrent = rank.index === currentRank;
                           const isPast = rank.index < currentRank;
                           
                           return (
                               <div key={rank.index} className="group relative">
                                   <div 
                                       className={`
                                          rounded-full transition-all duration-300 border box-content
                                          ${isCurrent 
                                            ? 'w-3 h-3 bg-[#FFD700] border-amber-600 shadow-md scale-125' 
                                            : isPast 
                                                ? 'w-2 h-2 bg-amber-200 border-amber-300' 
                                                : 'w-2 h-2 bg-[#D3D3D3] border-stone-300 bg-opacity-50'
                                          }
                                       `}
                                   />
                                   
                                   {/* Tooltip */}
                                   <div className={`
                                      absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                                      bg-stone-800 text-white text-[9px] rounded opacity-0 
                                      group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none
                                      ${isCurrent ? 'opacity-100 mb-3 font-bold' : ''}
                                   `}>
                                      {rank.name}
                                      {/* Little arrow */}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800"></div>
                                   </div>
                               </div>
                           )
                       })}
                   </div>
               </div>
            </div>
          </div>

          {/* Footer / Barcode */}
          <div className="mt-8 flex flex-col items-center opacity-80">
             <div className="h-8 w-full bg-stone-900" 
               style={{ 
                 maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                 backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, black 1px, black 3px)' 
               }}>
             </div>
             <p className="text-[9px] font-mono-typewriter text-stone-500 mt-1 tracking-[0.4em]">FACULTY-ID-VERIFIED</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default IDTab;
