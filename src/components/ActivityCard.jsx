
import React from 'react';
import { motion } from 'framer-motion';

// Inside ActivityCard.jsx

const getTagColor = (tag) => {
  const colors = {
    // ... existing colors ...
    Indoor: 'bg-stone-200 text-stone-700',
    Outdoor: 'bg-green-100 text-green-800',
    Active: 'bg-red-100 text-red-800',
    Passive: 'bg-blue-100 text-blue-800',
    Loud: 'bg-orange-100 text-orange-800',
    Quiet: 'bg-purple-100 text-purple-800',
    Social: 'bg-pink-100 text-pink-800',
    Individual: 'bg-gray-100 text-gray-800',
    Serious: 'bg-slate-200 text-slate-800',
    Playful: 'bg-yellow-100 text-yellow-800',
    
    // --- NEW TAG COLORS ---
    Digital: 'bg-cyan-100 text-cyan-800',     // Tech vibe
    Analog: 'bg-amber-100 text-amber-900',    // Paper/Old school vibe
    Creative: 'bg-fuchsia-100 text-fuchsia-800', // Artsy vibe
    Logic: 'bg-indigo-100 text-indigo-800'    // Math/Science vibe
  };
  return colors[tag] || 'bg-stone-100 text-stone-600';
};

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(activity)}
      className={`
        relative w-full aspect-[3/4] bg-[#FDFBF7] 
        rounded-sm p-4 shadow-md border border-stone-200
        flex flex-col cursor-pointer group paper-texture
        ${isSelected ? 'ring-4 ring-amber-500 ring-offset-2' : ''}
      `}
    >
      {/* Tape Effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-yellow-200/50 rotate-1 transform shadow-sm" />

      {/* Header */}
      <div className="border-b-2 border-stone-300 pb-2 mb-2">
        <h3 className="font-mono-typewriter font-bold text-stone-900 text-lg leading-tight">
          {activity.name}
        </h3>
        <p className="text-xs text-stone-500 font-serif italic mt-1">
          {activity.lessonType} Strategy
        </p>
      </div>

      {/* Description */}
      <div className="flex-grow">
        <p className="font-serif text-sm text-stone-700 leading-relaxed">
          {activity.description}
        </p>
      </div>

      {/* Tags Footer */}
      <div className="flex flex-wrap gap-1 mt-2 content-end">
        {activity.tags.slice(0, 4).map(tag => (
          <span 
            key={tag}
            className={`
              text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm
              ${getTagColor(tag)} border border-current/10
            `}
          >
            {tag}
          </span>
        ))}
        {activity.tags.length > 4 && (
          <span className="text-[10px] text-stone-400 font-bold px-1 py-0.5">...</span>
        )}
      </div>

      {/* Hover visual cue */}
      <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors rounded-sm pointer-events-none" />
    </motion.div>
  );
}

export default ActivityCard;
