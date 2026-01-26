import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Stamp, FileX, FileCheck, X } from 'lucide-react';
import './InboxTray.css';

const InboxTray = ({ requests, onApprove, onDeny, onTopple }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [stampAnimation, setStampAnimation] = useState(null); // 'approved' | 'denied' | null

  // Auto-topple logic
  useEffect(() => {
    if (requests.length > 8) {
      onTopple();
    }
  }, [requests.length, onTopple]);

  const handleSlipClick = (req) => {
    setSelectedRequest(req);
    setStampAnimation(null);
  };

  const handleStamp = (type) => {
    if (!selectedRequest || stampAnimation) return;
    
    // Trigger Animation
    setStampAnimation(type);

    // Delay actual logic so player sees the stamp hit
    setTimeout(() => {
      if (type === 'approved') {
        onApprove(selectedRequest.id);
      } else {
        onDeny(selectedRequest.id);
      }
      setSelectedRequest(null);
      setStampAnimation(null);
    }, 600); // 0.6s delay for animation
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'critical': return '#b91c1c'; // Red
      case 'high': return '#c2410c'; // Orange
      default: return '#1c1917'; // Black
    }
  };

  return (
    <>
      {/* --- THE TRAY (Background UI) --- */}
      <div className="inbox-tray-container">
        <div className="tray-label flex justify-between items-center">
            <span>INBOX</span>
            <span className={`text-xs font-mono ${requests.length > 5 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`}>
                {requests.length}/8
            </span>
        </div>
        
        <div className="tray-bed">
          <AnimatePresence>
            {requests.length === 0 && (
              <div className="empty-state">
                <span className="opacity-30 italic font-serif">All clear.</span>
              </div>
            )}
            
            {requests.map((req, index) => {
              // Stack logic: slight random rotation for messiness
              const rotation = (index * 3) - 6 + (req.id % 4); 
              
              return (
                <motion.div
                  key={req.id}
                  className={`request-slip ${req.type}`}
                  style={{ 
                    zIndex: index + 1,
                    // Use CSS variable for dynamic coloring in stylesheet if needed
                    '--category-color': req.type === 'pink' ? '#f472b6' : '#60a5fa' 
                  }}
                  initial={{ opacity: 0, y: -100, rotate: 10 }}
                  animate={{ opacity: 1, y: index * -4, rotate: rotation, x: index * 2 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ y: (index * -4) - 10, scale: 1.05 }}
                  onClick={() => handleSlipClick(req)}
                >
                  {/* Visual "Paper Clip" or Header */}
                  <div className="slip-top-border" />
                  
                  <div className="slip-content-mini">
                    <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                            {req.category.substring(0, 4)}
                        </span>
                        {req.urgency === 'critical' && <AlertTriangle size={10} className="text-red-600" />}
                    </div>
                    <div className="font-handwriting text-sm leading-tight mt-1 truncate">
                        {req.student}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* --- THE "FOCUS MODE" (Active Decision) --- */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRequest(null)} // Click outside to cancel
          >
            <motion.div 
              className={`
                relative w-full max-w-sm bg-[#fdfbf7] shadow-2xl rounded-sm overflow-hidden
                border-2 ${selectedRequest.type === 'pink' ? 'border-pink-300' : 'border-blue-300'}
                rotate-1
              `}
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Click inside doesn't cancel
            >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply" 
                     style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+")' }} 
                />

                {/* --- HEADER --- */}
                <div className={`
                    p-4 border-b-2 border-dashed 
                    ${selectedRequest.type === 'pink' ? 'border-pink-200 bg-pink-50' : 'border-blue-200 bg-blue-50'}
                    flex justify-between items-start
                `}>
                    <div>
                        <h3 className="font-mono-typewriter font-bold text-lg uppercase tracking-tight text-stone-800">
                            REQUEST FORM 104-B
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[10px] font-bold bg-white border border-stone-300 px-1 py-0.5 rounded text-stone-500 uppercase">
                                REF: {selectedRequest.id.split('-')[1] || '000'}
                            </span>
                            <span 
                                className="text-[10px] font-bold uppercase px-1 py-0.5 rounded text-white"
                                style={{ backgroundColor: getUrgencyColor(selectedRequest.urgency) }}
                            >
                                {selectedRequest.urgency}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setSelectedRequest(null)} className="text-stone-400 hover:text-red-500">
                        <X size={20} />
                    </button>
                </div>

                {/* --- BODY --- */}
                <div className="p-6 relative min-h-[200px]">
                    
                    {/* The Stamp Animation Layer */}
                    <AnimatePresence>
                        {stampAnimation && (
                            <motion.div 
                                initial={{ scale: 2, opacity: 0, rotate: -20 }}
                                animate={{ scale: 1, opacity: 0.8, rotate: -5 }}
                                className={`
                                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                                    border-4 rounded-lg px-6 py-2 font-black text-3xl uppercase tracking-widest mix-blend-multiply
                                    ${stampAnimation === 'approved' ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}
                                `}
                            >
                                {stampAnimation === 'approved' ? 'GRANTED' : 'REJECTED'}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mb-4">
                        <label className="block font-mono text-[10px] text-stone-400 uppercase">Applicant</label>
                        <p className="font-handwriting text-2xl text-stone-800">{selectedRequest.student}</p>
                    </div>

                    <div className="mb-6">
                        <label className="block font-mono text-[10px] text-stone-400 uppercase">Nature of Request</label>
                        <p className="font-serif italic text-lg text-stone-700 leading-relaxed border-l-2 border-stone-200 pl-3 mt-1">
                            "{selectedRequest.text}"
                        </p>
                    </div>

                    {/* Hints / Obfuscated Stats */}
                    <div className="bg-stone-100 p-2 rounded border border-stone-200 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-stone-400" />
                        <span className="text-xs font-mono text-stone-500">
                            {selectedRequest.xpReward > 20 ? "Projected Impact: SIGNIFICANT" : "Projected Impact: NEGLIGIBLE"}
                        </span>
                    </div>
                </div>

                {/* --- FOOTER (ACTIONS) --- */}
                <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between gap-4">
                    <button 
                        onClick={() => handleStamp('denied')}
                        disabled={!!stampAnimation}
                        className="flex-1 py-3 border-2 border-stone-300 rounded-sm font-bold text-stone-500 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 group"
                    >
                        <FileX size={20} className="group-hover:rotate-12 transition-transform" />
                        REJECT
                    </button>
                    
                    <button 
                        onClick={() => handleStamp('approved')}
                        disabled={!!stampAnimation}
                        className="flex-1 py-3 border-2 border-stone-300 rounded-sm font-bold text-stone-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center gap-2 group"
                    >
                        <FileCheck size={20} className="group-hover:-rotate-12 transition-transform" />
                        GRANT
                    </button>
                </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InboxTray;