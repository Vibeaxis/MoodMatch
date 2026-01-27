import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Zap, 
  Star, 
  Coffee, 
  Check,
  CalendarDays,
  Lock,
  Eye,
  Clock,
  Search
} from 'lucide-react';
import { playStampSound } from '@/lib/AudioUtils'; 
import './ScheduleTab.css';

const EVENT_ICONS = {
  'CRISIS': AlertTriangle,
  'MODIFIER': Clock,
  'BOON': Zap,
  'JACKPOT': Star,
  'NORMAL': Coffee,
  'FLAVOR': Coffee
};

function ScheduleTab({ weeklySchedule, currentDayIndex, weekNumber, supplies, onSpendSupply }) {
  // Track which future days the player has paid to reveal
  const [revealedDays, setRevealedDays] = useState([]);

  if (!weeklySchedule || weeklySchedule.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-500 font-mono-typewriter">
        <p>Schedule generation pending...</p>
      </div>
    );
  }

  const handleReveal = (dayIndex) => {
    // Check if player has supplies (or coffee) to spend
    // For this example, we'll assume the parent passes a handler, 
    // or we just simulate it if you haven't built the supply connection yet.
    
    // Play sound
    playStampSound();
    
    // Add to revealed list
    setRevealedDays(prev => [...prev, dayIndex]);
    
    // Trigger resource spend callback
    if (onSpendSupply) onSpendSupply(1); 
  };

  const getMechanicsTags = (day) => {
    const tags = [];
    const mechanics = day.event?.modifier || {};
    
    if (mechanics.xpMultiplier) tags.push(`XP x${mechanics.xpMultiplier}`);
    if (mechanics.blockType) tags.push(`${mechanics.blockType} Blocked`);
    if (mechanics.constraintMultiplier) tags.push(`Rules x${mechanics.constraintMultiplier}`);
    if (mechanics.puzzlesRequired) tags.push(`${mechanics.puzzlesRequired} Tasks`);
    if (mechanics.streakBreak) tags.push(`Fragile Streak`);
    
    if (day.type === 'BOON') tags.push('Bonus Effect');
    if (day.type === 'JACKPOT') tags.push('Legendary Event');

    return tags;
  };

  return (
    <div className="flex flex-col h-full bg-[#fdfbf7] relative overflow-hidden">
      
      {/* 1. FIXED HEADER: Sticky & Styled */}
      <div className="sticky top-0 z-20 bg-[#fdfbf7]/90 backdrop-blur-sm border-b-2 border-stone-800 p-4 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="font-mono-typewriter font-bold text-2xl text-stone-800 uppercase tracking-widest">
            Week {weekNumber}
          </h2>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wide">
            Fiscal Forecast
          </p>
        </div>
        
        {/* Resource Counter (Visual Aid) */}
        <div className="flex items-center gap-2 px-3 py-1 bg-stone-100 rounded border border-stone-200">
           <Eye size={14} className="text-stone-400" />
           <span className="text-xs font-bold text-stone-500">Intel Available</span>
        </div>
      </div>

      {/* 2. THE SCROLLABLE GRID */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {weeklySchedule.map((day, index) => {
          const isPast = index < currentDayIndex;
          const isToday = index === currentDayIndex;
          const isTomorrow = index === currentDayIndex + 1;
          const isRevealed = revealedDays.includes(index);
          
          // VISIBILITY LOGIC:
          // Past/Today/Tomorrow are always visible.
          // Future days (> Tomorrow) are HIDDEN unless revealed.
          const isHidden = index > currentDayIndex + 1 && !isRevealed;

          const EventIcon = EVENT_ICONS[day.type] || Coffee;
          const mechanicsTags = getMechanicsTags(day);

          return (
            <motion.div 
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                relative rounded-lg border-l-4 shadow-sm transition-all duration-300
                ${isPast ? 'bg-stone-100 border-stone-300 opacity-70 grayscale' : 'bg-white'}
                ${isToday ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md transform scale-[1.01]' : ''}
                ${isHidden ? 'border-stone-800 bg-stone-800 text-stone-400' : ''}
                ${!isHidden && !isPast && !isToday ? `border-${getDayColor(day.type)}` : ''}
              `}
            >
              {/* STATUS BADGES */}
              {isToday && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded tracking-wider border border-amber-200">
                  Active Shift
                </div>
              )}
              {isPast && (
                <div className="absolute top-3 right-3 text-stone-400">
                  <Check size={20} strokeWidth={3} />
                </div>
              )}

              <div className="p-4">
                {/* DAY HEADER */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono-typewriter font-bold text-lg ${isHidden ? 'text-stone-500' : 'text-stone-800'}`}>
                    {day.day}
                  </span>
                  {!isHidden && (
                    <span className="text-[10px] font-bold px-2 py-1 bg-stone-100 rounded text-stone-500 uppercase">
                      {day.type}
                    </span>
                  )}
                </div>

                {/* CONTENT AREA */}
                {isHidden ? (
                  // --- HIDDEN STATE ---
                  <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-stone-700 rounded bg-stone-800/50">
                    <div className="flex items-center gap-2 mb-2 text-stone-500">
                      <Lock size={16} />
                      <span className="font-mono-typewriter text-sm tracking-widest">CLASSIFIED</span>
                    </div>
                    
                    {/* REVEAL BUTTON */}
                    <button 
                      onClick={() => handleReveal(index)}
                      className="group flex items-center gap-2 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-bold rounded transition-colors"
                    >
                      <Search size={14} className="group-hover:scale-110 transition-transform" />
                      <span>Investigate (1 Supply)</span>
                    </button>
                  </div>
                ) : (
                  // --- REVEALED STATE ---
                  <div className="flex items-start gap-4">
                    <div className={`
                      p-3 rounded-full shrink-0 
                      ${getDayIconBg(day.type)}
                    `}>
                      <EventIcon size={20} className={getDayIconColor(day.type)} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-stone-800 text-sm mb-1 leading-tight">
                        {day.event?.name || "Standard Operations"}
                      </h3>
                      
                      <p className="text-xs text-stone-600 font-serif leading-relaxed mb-3">
                        {day.event?.description || "No anomalies detected on the horizon."}
                      </p>

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-2">
                        {mechanicsTags.map((tag, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-mono text-stone-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER TIP */}
      <div className="absolute bottom-0 left-0 right-0 bg-stone-100 border-t border-stone-200 p-3 text-center">
        <p className="text-[10px] text-stone-500 font-mono flex items-center justify-center gap-2">
          <CalendarDays size={12} />
          <span>Long-range forecasts are subject to administrative whims.</span>
        </p>
      </div>
    </div>
  );
}

// --- HELPER STYLES ---

function getDayColor(type) {
  switch(type) {
    case 'CRISIS': return 'red-500';
    case 'BOON': return 'emerald-500';
    case 'JACKPOT': return 'amber-500';
    default: return 'stone-300';
  }
}

function getDayIconBg(type) {
  switch(type) {
    case 'CRISIS': return 'bg-red-100';
    case 'BOON': return 'bg-emerald-100';
    case 'JACKPOT': return 'bg-amber-100';
    default: return 'bg-stone-100';
  }
}

function getDayIconColor(type) {
  switch(type) {
    case 'CRISIS': return 'text-red-600';
    case 'BOON': return 'text-emerald-600';
    case 'JACKPOT': return 'text-amber-600';
    default: return 'text-stone-500';
  }
}

export default ScheduleTab;