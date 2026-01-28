import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHILOSOPHY_CONFIG, selectDailyDirective } from '@/lib/GameLogic';
import { ClipboardList, Star, Smile } from 'lucide-react';

const MorningReport = forwardRef(({ clue, gradeLevel, stampCommitted, grade, philosophy = 'Pragmatist' }, ref) => {
  const config = PHILOSOPHY_CONFIG[philosophy] || PHILOSOPHY_CONFIG['Pragmatist'];
  const [dailyDirective, setDailyDirective] = useState(null);
  const [sRankEarned, setSRankEarned] = useState(false);

  useEffect(() => {
    setDailyDirective(selectDailyDirective());
  }, []);

  useEffect(() => {
    setSRankEarned(grade === 'S');
  }, [grade]);

  // Stamp Config
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
      ref={ref}
      initial={{ opacity: 0, x: -50, rotate: 0 }}
      animate={{ opacity: 1, x: 0, rotate: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      // FIX 1: Added 'scale-[0.85] md:scale-100 origin-top' to shrink it on mobile
      // FIX 2: Removed 'mt-24', changed to 'mt-4' for mobile so it sits higher
      className="w-full max-w-md relative group perspective-1000 mt-4 md:mt-0 scale-[0.85] md:scale-100 origin-top mx-auto"
    >
      {/* Paper Shadow */}
      <div className="absolute inset-0 bg-black/20 translate-y-2 translate-x-2 blur-sm rounded-sm transform group-hover:translate-y-3 group-hover:translate-x-3 transition-transform duration-300" />
      
      {/* The Paper */}
      <div className="relative bg-[#FDFBF7] paper-texture rounded-sm p-5 md:p-6 shadow-2xl border border-stone-200 min-h-[380px] md:min-h-[420px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="border-b-2 border-stone-800/80 pb-2 mb-3 flex justify-between items-end">
          <div>
            <h2 className={`font-mono-typewriter text-xl font-bold tracking-tighter uppercase leading-none ${config.headerColor.split(' ')[0]}`}>
              {config.headerText.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
            </h2>
            <p className="font-mono-typewriter text-[10px] text-stone-500 mt-1">CONFIDENTIAL • FACULTY EYES ONLY</p>
          </div>
          <div className="border-2 border-red-800/40 text-red-800/60 font-bold px-2 py-0.5 transform -rotate-12 text-[10px] uppercase tracking-widest">
            Urgent
          </div>
        </div>
        
        {/* Metadata */}
        <div className="mb-4 font-mono-typewriter text-xs space-y-1 text-stone-600">
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
        <div className="flex-grow relative space-y-3">
           <div className="absolute inset-0 pointer-events-none" 
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 28px)',
                  backgroundAttachment: 'local'
                }} 
           />
           
           <p className="font-mono-typewriter text-sm md:text-base leading-snug text-stone-800 relative z-10 pt-1">
             <span className="font-bold">OBSERVATION:</span>
             <br/>
             "{getPhilosophyFlavor(clue)}"
           </p>

           {dailyDirective && (
             <div className="relative z-10 mt-2 rounded-lg border-2 border-amber-400 p-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
               <div className="flex items-center gap-2 mb-1 border-b border-amber-400/50 pb-1">
                 <ClipboardList className="w-4 h-4 text-amber-700" />
                 <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">DISTRICT DIRECTIVE</span>
               </div>
               <h4 className="font-semibold text-amber-900 text-xs mb-0.5">{dailyDirective.title}</h4>
               <p className="text-amber-800 text-[10px] leading-tight mb-2">{dailyDirective.description}</p>
               <div className="inline-flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-white/40">
                 <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                 <span className="text-[10px] font-bold text-amber-700">+{dailyDirective.xpBonus} XP</span>
               </div>
             </div>
           )}
        </div>

        {/* Philosophy Stamps */}
        <div className={`absolute bottom-4 right-4 z-10 opacity-90 pointer-events-none transition-all duration-2000 ease-out ${sRankEarned ? 'animate-fadeInStamp opacity-100' : 'opacity-0 scale-90'}`}>
            {philosophy === 'Traditionalist' && (
              <div className="border-4 border-blue-900 text-blue-900 rounded-full w-20 h-20 flex flex-col items-center justify-center transform rotate-[-15deg]">
                  <span className="text-[8px] font-bold">CERTIFIED</span>
                  <span className="text-lg font-bold tracking-widest">STD</span>
              </div>
            )}
            {philosophy === 'Progressive' && (
              <div className="bg-yellow-200 w-24 h-24 shadow-md p-3 transform rotate-[3deg] flex flex-col items-center justify-center font-handwriting text-stone-800 border-t border-yellow-100/50">
                  <Smile className="w-6 h-6 text-stone-600 mb-1" />
                  <span className="font-handwriting text-xs text-center leading-tight">Excellent! 😊</span>
              </div>
            )}
            {philosophy === 'Pragmatist' && (
              <div className="bg-white border border-stone-300 shadow-sm p-2 w-28 rounded-sm">
                  <div className="text-[8px] text-stone-400 mb-1 uppercase tracking-wider">Peak Performance</div>
                  <div className="flex items-end gap-1 h-8 w-full">
                      <div className="bg-purple-300 w-1/3 h-[40%]"></div>
                      <div className="bg-purple-500 w-1/3 h-[70%]"></div>
                      <div className="bg-purple-700 w-1/3 h-[100%]"></div>
                  </div>
              </div>
            )}
        </div>

        {/* Committed Stamp */}
        <AnimatePresence>
          {stampCommitted && grade && (
            <motion.div
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 0.9, rotate: -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`absolute bottom-12 right-8 md:bottom-16 md:right-16 z-20 border-4 ${stampStyle.color} w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mix-blend-multiply`}
              style={{ maskImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjUiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZykiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==")' }}
            >
              <div className="flex flex-col items-center">
                 <span className={`text-lg font-black font-mono-typewriter tracking-tighter ${stampStyle.color.replace('border', 'text')}`}>{stampStyle.text}</span>
                 <span className="text-[8px] uppercase tracking-widest font-bold">{new Date().toLocaleDateString()}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <div className="mt-auto pt-2 border-t border-stone-300 text-center">
          <p className="font-serif italic text-stone-500 text-xs">
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