
import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHILOSOPHY_CONFIG, selectDailyDirective } from '@/lib/GameLogic';
import { Smile, ClipboardList, Star } from 'lucide-react';

const MorningReport = forwardRef(({ clue, gradeLevel, stampCommitted, grade, philosophy = 'Pragmatist' }, ref) => {
  const config = PHILOSOPHY_CONFIG[philosophy] || PHILOSOPHY_CONFIG['Pragmatist'];
  const [dailyDirective, setDailyDirective] = useState(null);
  const [sRankEarned, setSRankEarned] = useState(false);

  useEffect(() => {
    setDailyDirective(selectDailyDirective());
  }, []); // Run once on mount per session/refresh, ideally this should be passed from parent to persist per day

  useEffect(() => {
    if (grade === 'S') {
      setSRankEarned(true);
    } else {
      setSRankEarned(false);
    }
  }, [grade]);

  // Visual config for the committed stamp
  const stampConfig = {
    'S': { color: 'text-red-700 border-red-700', text: 'EXCELLENT' },
    'A': { color: 'text-red-700 border-red-700', text: 'APPROVED' },
    'B': { color: 'text-blue-700 border-blue-700', text: 'ACCEPTED' },
    'C': { color: 'text-orange-600 border-orange-600', text: 'REVIEW' },
    'F': { color: 'text-red-800 border-red-800', text: 'INCIDENT' },
  };

  const stampStyle = stampConfig[grade] || stampConfig['F'];

  const getPhilosophyFlavor = (text) => {
     if (!config.keywords) return text;
     const keyword = config.keywords[Math.floor(Math.random() * config.keywords.length)];
     return `${text} (Focus on ${keyword} recommended.)`;
  };

  return (
    <motion.div
      ref={ref} // Drop target ref
      initial={{ opacity: 0, x: -50, rotate: 0 }}
      animate={{ opacity: 1, x: 0, rotate: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="w-full max-w-md relative group perspective-1000"
    >
      {/* Paper Shadow */}
      <div className="absolute inset-0 bg-black/20 translate-y-2 translate-x-2 blur-sm rounded-sm transform group-hover:translate-y-3 group-hover:translate-x-3 transition-transform duration-300" />
      
      {/* The Paper */}
      <div className="relative bg-[#FDFBF7] paper-texture rounded-sm p-8 shadow-2xl border border-stone-200 min-h-[500px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b-2 border-stone-800/80 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h2 className={`font-mono-typewriter text-2xl font-bold tracking-tighter uppercase leading-none ${config.headerColor.split(' ')[0]}`}>
              {config.headerText.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
            </h2>
            <p className="font-mono-typewriter text-xs text-stone-500 mt-2">CONFIDENTIAL • FACULTY EYES ONLY</p>
          </div>
          <div className="border-2 border-red-800/40 text-red-800/60 font-bold px-2 py-1 transform -rotate-12 text-xs uppercase tracking-widest">
            Urgent
          </div>
        </div>
        
        {/* Metadata */}
        <div className="mb-6 font-mono-typewriter text-sm space-y-1 text-stone-600">
          <div className="flex justify-between">
            <span>DATE:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>GRADE LEVEL:</span>
            <span className="font-bold text-stone-900 bg-yellow-100 px-1">{gradeLevel.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS:</span>
            <span>{stampCommitted ? "CLOSED" : "ACTIVE"}</span>
          </div>
        </div>
        
        {/* Body Content */}
        <div className="flex-grow relative space-y-6">
           <div className="absolute inset-0 pointer-events-none" 
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 28px)',
                  backgroundAttachment: 'local'
                }} 
           />
           
           <p className="font-mono-typewriter text-lg leading-[28px] text-stone-800 relative z-10 pt-1">
             <span className="font-bold">OBSERVATION:</span>
             <br/>
             "{getPhilosophyFlavor(clue)}"
           </p>

           {/* District Directive Section */}
           {dailyDirective && (
             <div className="relative z-10 mt-4 rounded-lg border-2 border-amber-400 p-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
               <div className="flex items-center gap-2 mb-2 border-b border-amber-400/50 pb-2">
                 <ClipboardList className="w-5 h-5 text-amber-700" />
                 <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">DISTRICT DIRECTIVE</span>
               </div>
               
               <h4 className="font-semibold text-amber-900 text-sm mb-1">{dailyDirective.title}</h4>
               <p className="text-amber-800 text-xs leading-relaxed mb-3">{dailyDirective.description}</p>
               
               <div className="inline-flex items-center gap-1 bg-white/60 px-2 py-1 rounded-full border border-white/40">
                 <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                 <span className="text-[10px] font-bold text-amber-700">+{dailyDirective.xpBonus} XP Bonus</span>
               </div>
             </div>
           )}
        </div>

        {/* Philosophy Specific Overlay - Bottom Right */}
        <div className={`absolute bottom-6 right-6 z-10 opacity-90 pointer-events-none transition-all duration-2000 ease-out ${sRankEarned ? 'animate-fadeInStamp opacity-100' : 'opacity-0 scale-90'}`}>
           {philosophy === 'Traditionalist' && (
              <div className="border-4 border-blue-900 text-blue-900 rounded-full w-24 h-24 flex flex-col items-center justify-center transform rotate-[-15deg]">
                  <span className="text-[10px] font-bold">CERTIFIED</span>
                  <span className="text-xl font-bold tracking-widest">STD</span>
              </div>
           )}
           {philosophy === 'Progressive' && (
              <div className="bg-yellow-200 w-28 h-28 shadow-md p-4 transform rotate-[3deg] flex flex-col items-center justify-center font-handwriting text-stone-800 border-t border-yellow-100/50">
                  <Smile className="w-8 h-8 text-stone-600 mb-1" />
                  <span className="font-handwriting text-sm text-center leading-tight">Excellent! 😊</span>
              </div>
           )}
           {philosophy === 'Pragmatist' && (
              <div className="bg-white border border-stone-300 shadow-sm p-3 w-32 rounded-sm">
                  <div className="text-[8px] text-stone-400 mb-1 uppercase tracking-wider">Peak Performance</div>
                  <div className="flex items-end gap-1 h-12 w-full">
                      <div className="bg-purple-300 w-1/3 h-[40%]"></div>
                      <div className="bg-purple-500 w-1/3 h-[70%]"></div>
                      <div className="bg-purple-700 w-1/3 h-[100%]"></div>
                  </div>
              </div>
           )}
        </div>

        {/* Committed Stamp Visual */}
        <AnimatePresence>
          {stampCommitted && grade && (
            <motion.div
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 0.9, rotate: -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`
                absolute bottom-20 right-20 z-20 
                border-4 ${stampStyle.color} 
                w-32 h-32 rounded-full 
                flex items-center justify-center 
                mix-blend-multiply
              `}
              style={{ 
                maskImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjUiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZykiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==")'
              }}
            >
              <div className="flex flex-col items-center">
                 <span className={`text-xl font-black font-mono-typewriter tracking-tighter ${stampStyle.color.replace('border', 'text')}`}>
                   {stampStyle.text}
                 </span>
                 <span className="text-[10px] uppercase tracking-widest font-bold">
                   {new Date().toLocaleDateString()}
                 </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-stone-300 text-center">
          <p className="font-serif italic text-stone-500 text-sm">
            {stampCommitted ? "Report filed successfully." : "Please select appropriate intervention strategy."}
          </p>
        </div>
      </div>
      
      {/* Paper Clip */}
      <div className="absolute -top-3 right-8 w-4 h-12 rounded-full border-4 border-stone-400 z-20 bg-transparent shadow-sm" />
    </motion.div>
  );
});

export default MorningReport;
