import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Lightbulb, Coffee } from 'lucide-react';

function CoffeeMug({ usesRemaining, maxUses, onUse }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleInteraction = (action) => {
    onUse(action);
    setIsOpen(false);
  };

  const hasUsesLeft = usesRemaining > 0;

  return (
    <div className="fixed bottom-32 right-6 md:bottom-36 md:right-8 z-50">
      <div className="relative">
        {/* Steam Animation if Full */}
        {hasUsesLeft && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.5, 0], y: -20, x: i % 2 === 0 ? 5 : -5 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.6,
                  ease: "easeInOut" 
                }}
                className="w-2 h-2 bg-white/40 rounded-full blur-sm"
              />
            ))}
          </div>
        )}

        {/* The Mug */}
        <motion.button
          onClick={() => hasUsesLeft && setIsOpen(!isOpen)}
          whileHover={hasUsesLeft ? { scale: 1.05, rotate: -5 } : {}}
          whileTap={hasUsesLeft ? { scale: 0.95 } : {}}
          className={`
            relative w-16 h-16 rounded-full shadow-xl flex items-center justify-center border-4
            transition-all duration-500
            ${!hasUsesLeft 
              ? 'bg-stone-100 border-stone-200 cursor-not-allowed opacity-80' 
              : 'bg-[#3E2723] border-white/20 cursor-pointer hover:shadow-2xl'
            }
          `}
        >
          {/* Liquid surface */}
          <div className={`
             absolute w-12 h-12 rounded-full transition-colors duration-500
             ${!hasUsesLeft ? 'bg-stone-200' : 'bg-[#5D4037]'}
          `}>
             {hasUsesLeft && <div className="absolute top-2 left-2 w-3 h-2 bg-white/10 rounded-full rotate-45" />}
          </div>
          
          {/* Mug Handle */}
          <div className={`
            absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-10 
            border-4 rounded-r-xl -z-10
            ${!hasUsesLeft ? 'border-stone-200 bg-transparent' : 'border-white/20 bg-[#3E2723]'}
          `} />
          
          {/* Uses Counter Badge (Only show if max > 1) */}
          {maxUses > 1 && (
             <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {usesRemaining}
             </div>
          )}
        </motion.button>

        {/* Action Menu */}
        <AnimatePresence>
          {isOpen && hasUsesLeft && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-xl border border-stone-200 min-w-[140px]"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleInteraction('REROLL')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-amber-100 rounded text-stone-800 font-bold text-xs transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> New Memo
                </button>
                <button
                  onClick={() => handleInteraction('HINT')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded text-stone-800 font-bold text-xs transition-colors"
                >
                  <Lightbulb className="w-4 h-4" /> Get Hint
                </button>
              </div>
              {/* Arrow */}
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/90 transform rotate-45 border-b border-r border-stone-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CoffeeMug;