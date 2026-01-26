
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye } from 'lucide-react';
import { generateDailyMemo } from '@/lib/GameLogic';

function MemosTab({ dailyMemo, activeModifier, onReadMemo, earlyPeekUnlocked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [peekMemo, setPeekMemo] = useState(null);
  
  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (onReadMemo) onReadMemo();
    }
  };

  const handlePeek = (e) => {
    e.stopPropagation();
    if (!peekMemo) {
       // Generate a "fake" future memo for visualization (stateless here, normally would come from game state)
       // For this implementation, we'll generate one on the fly since we don't persist future days yet
       setPeekMemo(generateDailyMemo());
    }
  };

  const isFlavor = dailyMemo.type === 'FLAVOR';

  return (
    <div className="h-full p-6 flex flex-col items-center justify-start bg-[#F5F1E8] rounded-sm relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px)', backgroundSize: '100% 24px' }} />

       <h2 className="font-mono-typewriter text-2xl font-bold text-stone-800 mb-8 border-b-2 border-stone-300 pb-2 w-full text-center">
         Daily Correspondence
       </h2>

       {/* Envelope / Letter Container */}
       <div className="relative w-full max-w-md h-96 flex items-center justify-center">
         <AnimatePresence mode="wait">
           {!isOpen ? (
             <motion.button
               key="envelope"
               onClick={handleOpen}
               initial={{ scale: 0.9, rotate: -2 }}
               whileHover={{ scale: 1, rotate: 0 }}
               exit={{ opacity: 0, scale: 1.2 }}
               className="w-64 h-40 bg-[#e3dac9] shadow-xl flex items-center justify-center rounded-sm border-2 border-[#d4c5a9] cursor-pointer relative group"
             >
               {/* Stamp Seal */}
               <div className="absolute bg-red-800 w-12 h-12 rounded-full shadow-md flex items-center justify-center text-white/50 font-bold text-[10px] border-4 border-red-900/50 group-hover:scale-110 transition-transform">
                 CONF
               </div>
               
               <div className="text-stone-500 font-mono-typewriter text-xs absolute bottom-4 right-4">
                 Tap to Open
               </div>
               
               {/* Envelope Flap Lines */}
               <div className="absolute top-0 left-0 w-full h-full border-t-[80px] border-l-[128px] border-r-[128px] border-transparent border-t-[#dcd3c2] pointer-events-none mix-blend-multiply opacity-50"></div>
             
               {earlyPeekUnlocked && (
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={handlePeek}
                    className="absolute -top-12 right-0 bg-purple-100 border border-purple-300 text-purple-800 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-2 hover:bg-purple-200 z-50"
                 >
                   <Eye className="w-3 h-3" /> Insider Peek
                 </motion.div>
               )}
             </motion.button>
           ) : (
             <motion.div
               key="letter"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ type: "spring", stiffness: 100 }}
               className="bg-white w-full h-full shadow-md p-8 relative rotate-1 overflow-y-auto"
             >
               {/* Letter Content */}
               <div className="font-mono-typewriter text-stone-800 text-sm leading-relaxed space-y-4">
                 <div className="border-b border-stone-300 pb-2 mb-4 text-xs text-stone-500">
                   {new Date().toLocaleDateString()} | MEMO REF: {Math.floor(Math.random() * 9999)}
                 </div>
                 
                 <div className="whitespace-pre-wrap font-bold text-stone-900">
                   {dailyMemo.flavor || "To: Faculty"}
                 </div>
                 
                 <div className="py-4">
                   {dailyMemo.description}
                 </div>

                 {/* Modifier Stamp Logic */}
                 {!isFlavor && (
                   <motion.div
                     initial={{ scale: 3, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                     className="absolute bottom-8 right-8 border-4 border-blue-700 text-blue-700 rounded-lg px-4 py-2 font-bold uppercase transform -rotate-12 opacity-80 mix-blend-multiply"
                   >
                     {dailyMemo.text} ACTIVE
                   </motion.div>
                 )}
               </div>
             </motion.div>
           )}
         </AnimatePresence>
         
         {/* Peek Modal Overlay */}
         <AnimatePresence>
           {peekMemo && (
             <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 className="bg-purple-50 p-4 rounded border-2 border-purple-200 shadow-xl relative max-w-sm w-full"
               >
                 <button onClick={(e) => { e.stopPropagation(); setPeekMemo(null); }} className="absolute top-2 right-2 text-purple-800 hover:text-purple-900"><Eye className="w-4 h-4" /></button>
                 <h3 className="font-bold text-purple-900 mb-2 text-xs uppercase tracking-wider">Tomorrow's Forecast</h3>
                 <p className="font-mono-typewriter text-sm text-purple-800 mb-2">{peekMemo.description}</p>
                 <p className="text-[10px] text-purple-600 italic">Subject to change by administration.</p>
               </motion.div>
             </div>
           )}
         </AnimatePresence>
       </div>

       {/* Footer Status */}
       <div className="mt-auto w-full text-center">
          {activeModifier ? (
             <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-md inline-block font-bold text-sm border border-blue-200 shadow-sm">
               ACTIVE: {activeModifier.text}
             </div>
          ) : (
             <div className="text-stone-400 italic text-sm">No active modifiers</div>
          )}
       </div>
    </div>
  );
}

export default MemosTab;
