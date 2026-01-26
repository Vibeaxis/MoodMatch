import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, FileCheck, FileX } from 'lucide-react';

const InboxTray = ({ requests, onApprove, onDeny, onTopple }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [stampAnimation, setStampAnimation] = useState(null); 

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
    setStampAnimation(type);
    setTimeout(() => {
      if (type === 'approved') onApprove(selectedRequest.id);
      else onDeny(selectedRequest.id);
      setSelectedRequest(null);
      setStampAnimation(null);
    }, 600);
  };

  return (
    <>
     <div className="fixed bottom-6 left-6 z-[60] w-56 group">
        <div className="flex justify-between items-center bg-stone-800 text-stone-200 px-3 py-1 rounded-t-sm border-b border-stone-600">
            <span className="text-xs font-bold tracking-widest">INBOX</span>
            <span className={`text-[10px] font-mono ${requests.length > 5 ? 'text-red-400 animate-pulse' : 'text-stone-400'}`}>
                {requests.length}/8
            </span>
        </div>
        
     <div className="relative h-36 bg-stone-900/60 backdrop-blur-md rounded-b-sm border-x border-b border-stone-800 p-2 transition-all group-hover:bg-stone-900/80">
          <AnimatePresence>
            {requests.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <span className="text-stone-400 text-xs italic font-serif">All clear.</span>
              </div>
            )}
            
            {requests.map((req, index) => {
              // --- CRASH FIX START ---
              // Safely convert ID to string to prevent .charCodeAt crash on numbers
              const safeId = String(req.id);
              const charCode = safeId.charCodeAt(safeId.length - 1) || 0;
              const rotation = (index * 3) - 6 + (charCode % 4); 
              // --- CRASH FIX END ---
              
              const isPink = req.type === 'pink';

              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: -50, rotate: 10 }}
                  animate={{ opacity: 1, y: index * -4, rotate: rotation, x: index * 2 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ y: (index * -4) - 15, scale: 1.05, transition: { duration: 0.1 } }}
                  onClick={() => handleSlipClick(req)}
                  className={`
                    absolute left-2 right-2 h-16 
                    border-l-4 shadow-md cursor-pointer
                    ${isPink ? 'bg-pink-50 border-pink-400' : 'bg-blue-50 border-blue-500'}
                  `}
                  style={{ bottom: '10px', zIndex: index + 1 }}
                >
                  <div className="p-2 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <span className="font-mono text-[8px] text-stone-500 uppercase tracking-wider">
                            {req.category?.substring(0, 3) || 'GEN'}
                        </span>
                        {req.urgency === 'critical' && <AlertTriangle size={10} className="text-red-600 animate-pulse" />}
                    </div>
                    <div className="font-serif text-xs text-stone-800 leading-none truncate font-bold">
                        {req.student}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`
                relative w-full max-w-sm bg-[#fdfbf7] shadow-2xl rounded-sm overflow-hidden
                border-2 transform rotate-1
                ${selectedRequest.type === 'pink' ? 'border-pink-300' : 'border-blue-300'}
              `}
            >
                <div className={`
                    p-4 border-b-2 border-dashed flex justify-between items-start
                    ${selectedRequest.type === 'pink' ? 'border-pink-200 bg-pink-50/50' : 'border-blue-200 bg-blue-50/50'}
                `}>
                    <div>
                        <h3 className="font-mono text-lg font-bold text-stone-800 uppercase tracking-tighter">
                            REQ. FORM 104-B
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[10px] font-bold bg-white border border-stone-300 px-1 py-0.5 rounded text-stone-500 uppercase">
                                {/* FIX: Safe string splitting */}
                                ID: {String(selectedRequest.id).includes('-') ? String(selectedRequest.id).split('-')[1] : String(selectedRequest.id).substring(0, 4)}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-1 py-0.5 rounded text-white ${
                                selectedRequest.urgency === 'critical' ? 'bg-red-600' : 
                                selectedRequest.urgency === 'high' ? 'bg-orange-500' : 'bg-stone-500'
                            }`}>
                                {selectedRequest.urgency}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setSelectedRequest(null)} className="text-stone-400 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 relative min-h-[240px] flex flex-col gap-4">
                    <AnimatePresence>
                        {stampAnimation && (
                            <motion.div 
                                initial={{ scale: 3, opacity: 0, rotate: -30 }}
                                animate={{ scale: 1, opacity: 0.9, rotate: -15 }}
                                className={`
                                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                                    border-[6px] rounded px-6 py-2 font-black text-4xl uppercase tracking-widest mix-blend-multiply
                                    pointer-events-none whitespace-nowrap
                                    ${stampAnimation === 'approved' ? 'border-green-700 text-green-700' : 'border-red-700 text-red-700'}
                                `}
                            >
                                {stampAnimation === 'approved' ? 'GRANTED' : 'DENIED'}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <label className="block font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-1">Applicant</label>
                        <p className="font-serif text-2xl text-stone-800 border-b border-stone-200 pb-2">
                            {selectedRequest.student}
                        </p>
                    </div>

                    <div>
                        <label className="block font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-1">Request Details</label>
                        <p className="font-serif italic text-lg text-stone-700 leading-relaxed pl-4 border-l-4 border-stone-200">
                            "{selectedRequest.text}"
                        </p>
                    </div>

                    <div className="mt-auto bg-stone-100 p-3 rounded border border-stone-200 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span className="text-xs font-mono text-stone-500">
                            {selectedRequest.xpReward > 20 ? "HR Note: High impact potential." : "HR Note: Routine administrative matter."}
                        </span>
                    </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-200 flex gap-4">
                    <button 
                        onClick={() => handleStamp('denied')}
                        disabled={!!stampAnimation}
                        className="flex-1 py-4 bg-white border-2 border-stone-200 rounded-sm font-bold text-stone-400 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                    >
                        <FileX size={20} className="group-hover:scale-110 transition-transform" />
                        REJECT
                    </button>
                    
                    <button 
                        onClick={() => handleStamp('approved')}
                        disabled={!!stampAnimation}
                        className="flex-1 py-4 bg-white border-2 border-stone-200 rounded-sm font-bold text-stone-400 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                    >
                        <FileCheck size={20} className="group-hover:scale-110 transition-transform" />
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