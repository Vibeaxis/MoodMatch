import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Lightbulb } from 'lucide-react';

function CoffeeMug({ usesRemaining, maxUses, onUse }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleInteraction = (action) => {
    onUse(action);
    setIsOpen(false);
  };

  const hasUsesLeft = usesRemaining > 0;

  return (
    // POSITIONING: 
    // Mobile: bottom-6, right-4 (Tucked in corner, smaller)
    // Desktop: bottom-10, right-10 (Standard size)
    <div className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[60]">
      <div className="relative">
        
        {/* Steam Animation (Only when full) */}
        {hasUsesLeft && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.4, 0], y: -15, x: i % 2 === 0 ? 3 : -3 }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeInOut" 
                }}
                className="w-1.5 h-1.5 bg-white rounded-full blur-[2px]"
              />
            ))}
          </div>
        )}

        {/* THE MUG BUTTON */}
        <motion.button
          onClick={() => hasUsesLeft && setIsOpen(!isOpen)}
          whileHover={hasUsesLeft ? { scale: 1.05 } : {}}
          whileTap={hasUsesLeft ? { scale: 0.95 } : {}}
          className={`
            relative rounded-full shadow-2xl flex items-center justify-center
            transition-all duration-300
            /* SIZE: Smaller on mobile (w-12), Regular on desktop (w-16) */
            w-12 h-12 md:w-16 md:h-16
            /* CERAMIC LOOK: White body, subtle border */
            bg-[#f5f5f4] border border-stone-300
            ${!hasUsesLeft ? 'opacity-80 cursor-default' : 'cursor-pointer hover:shadow-orange-900/20'}
          `}
        >
          {/* MUG HANDLE (Pseudo-element style) */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-6 md:w-4 md:h-8 border-2 border-stone-300 rounded-r-md bg-[#f5f5f4] -z-10" />

          {/* LIQUID SURFACE / INTERIOR */}
          <div className={`
             rounded-full transition-colors duration-500 overflow-hidden relative
             /* SIZE: Inner circle is slightly smaller than container */
             w-9 h-9 md:w-12 md:h-12
             ${hasUsesLeft 
               ? 'bg-[#3e2723] shadow-inner' /* Dark Coffee */ 
               : 'bg-stone-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]' /* Empty Stain */
             }
          `}>
             {/* Liquid Reflection (Only if full) */}
             {hasUsesLeft && (
               <div className="absolute top-2 left-2 w-2 h-1.5 bg-white/10 rounded-full rotate-12 blur-[1px]" />
             )}
          </div>
          
          {/* USES BADGE (Notification Dot) */}
          {hasUsesLeft && maxUses > 1 && (
             <div className="absolute -top-1 -right-1 md:top-0 md:right-0 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center border border-white shadow-sm z-20">
                {usesRemaining}
             </div>
          )}
        </motion.button>

        {/* ACTION MENU (Popup) */}
        <AnimatePresence>
          {isOpen && hasUsesLeft && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-3 w-36 bg-[#fdfbf7] shadow-2xl rounded border border-stone-300 z-50 origin-bottom-right"
            >
              <div className="flex flex-col p-1">
                <button
                  onClick={() => handleInteraction('REROLL')}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-stone-100 rounded text-stone-800 font-bold text-xs font-mono-typewriter transition-colors border-b border-stone-100"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600" /> 
                  <span>New Memo</span>
                </button>
                <button
                  onClick={() => handleInteraction('HINT')}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-stone-100 rounded text-stone-800 font-bold text-xs font-mono-typewriter transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-blue-600" /> 
                  <span>Get Hint</span>
                </button>
              </div>
              
              {/* Arrow pointing to mug */}
              <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-[#fdfbf7] transform rotate-45 border-b border-r border-stone-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CoffeeMug;