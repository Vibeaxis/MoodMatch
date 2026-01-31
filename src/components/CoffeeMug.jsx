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
    // POSITIONING: Bottom Right Corner
    <div className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[60]">
      <div className="relative group">
        
        {/* Steam Animation (Only when full and hovering/active) */}
        {hasUsesLeft && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.3, 0], y: -20, x: i % 2 === 0 ? 5 : -5 }}
                transition={{ 
                  duration: 2 + i, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1.5 h-1.5 bg-white rounded-full blur-sm"
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
            relative flex items-center justify-center
            /* SIZE: Fixed sizes to ensure handle aligns perfectly */
            w-14 h-14 md:w-16 md:h-16
            rounded-full shadow-2xl
            transition-all duration-300
            ${!hasUsesLeft ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          {/* 1. THE HANDLE (Sits behind the mug) */}
          <div className={`
             absolute top-1/2 -translate-y-1/2 -right-3 
             w-6 h-8 md:w-8 md:h-10 
             border-[6px] md:border-[8px] border-[#EFEBE9] 
             rounded-r-xl bg-transparent shadow-sm -z-10
          `} />

          {/* 2. THE CERAMIC BODY (The Container) */}
          <div className="w-full h-full rounded-full bg-[#EFEBE9] flex items-center justify-center shadow-md relative overflow-hidden">
            
            {/* 3. THE LIQUID / INTERIOR */}
            <div className={`
               w-[80%] h-[80%] rounded-full shadow-inner transition-colors duration-500 relative
               ${hasUsesLeft 
                 ? 'bg-[#3E2723]' // Dark Coffee
                 : 'bg-[#D7CCC8] shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]' // Empty Cup Bottom
               }
            `}>
              {/* Liquid Reflection/Sheen */}
              {hasUsesLeft && (
                <div className="absolute top-[15%] left-[15%] w-[30%] h-[20%] bg-white/10 rounded-full blur-[1px] rotate-[-45deg]" />
              )}
            </div>

          </div>

          {/* USES BADGE */}
          {hasUsesLeft && maxUses > 1 && (
             <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm z-20">
                {usesRemaining}
             </div>
          )}
        </motion.button>

        {/* ACTION MENU */}
        <AnimatePresence>
          {isOpen && hasUsesLeft && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-3 w-40 bg-[#fdfbf7] shadow-xl rounded border border-stone-300 z-50 origin-bottom-right"
            >
              <div className="flex flex-col p-1">
                <button
                  onClick={() => handleInteraction('REROLL')}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-stone-100 rounded text-stone-800 font-bold text-xs font-mono-typewriter transition-colors border-b border-stone-100"
                >
                  <RefreshCw className="w-4 h-4 text-amber-600" /> 
                  <span>New Memo</span>
                </button>
                <button
                  onClick={() => handleInteraction('HINT')}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-stone-100 rounded text-stone-800 font-bold text-xs font-mono-typewriter transition-colors"
                >
                  <Lightbulb className="w-4 h-4 text-blue-600" /> 
                  <span>Get Hint</span>
                </button>
              </div>
              
              {/* Arrow pointing to mug */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#fdfbf7] transform rotate-45 border-b border-r border-stone-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CoffeeMug;