import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle } from 'lucide-react';
import './InboxTray.css';

const InboxTray = ({ requests, onApprove, onDeny, onTopple }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Auto-topple if too many requests
  useEffect(() => {
    if (requests.length > 8) {
      onTopple();
    }
  }, [requests.length, onTopple]);

  const handleSlipClick = (req) => {
    setSelectedRequest(req);
  };

  const handleAction = (action) => {
    if (!selectedRequest) return;
    
    if (action === 'approve') {
      onApprove(selectedRequest.id);
    } else {
      onDeny(selectedRequest.id);
    }
    setSelectedRequest(null);
  };

  const getCategoryCode = (category, type) => {
    if (type === 'pink') {
      return category.charAt(0); // H, C, A, W
    } else {
      return category.charAt(0); // H, I, P
    }
  };

  const getCategoryColor = (category, type) => {
    if (type === 'pink') {
       switch(category) {
         case 'HYGIENE': return '#ef4444'; // Red-ish
         case 'CONFLICT': return '#f59e0b'; // Amber
         case 'ACADEMIC': return '#3b82f6'; // Blue
         case 'WEIRD': return '#8b5cf6'; // Purple
         default: return '#888';
       }
    } else {
       // Blue slips are uniform administrative
       return '#1e40af';
    }
  };

  return (
    <>
      <div className="inbox-tray-container">
        <div className="tray-label">INBOX ({requests.length})</div>
        <div className="tray-bed">
          <AnimatePresence>
            {requests.length === 0 && (
              <div className="empty-state">
                <span>Tray Empty</span>
              </div>
            )}
            {requests.map((req, index) => {
              const categoryColor = getCategoryColor(req.category, req.type);
              return (
                <motion.div
                  key={req.id}
                  className={`request-slip ${req.type} ${hoveredIndex === index ? 'hovered' : ''}`}
                  style={{ 
                    zIndex: index + 1,
                    transform: `rotate(${index * 4 - 8}deg) translateX(${index * 2}px) translateY(${index * -3}px)`,
                    borderLeftColor: categoryColor
                  }}
                  initial={{ opacity: 0, y: -50, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: index * 4 - 8 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  whileHover={{ y: -12, scale: 1.05, transition: { duration: 0.2 } }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSlipClick(req)}
                >
                  <div className="slip-content">
                    <div className="slip-header">
                      <span className="slip-category-code" style={{ color: categoryColor }}>
                        [{getCategoryCode(req.category, req.type)}]
                      </span>
                      {req.urgency === 'critical' && <AlertTriangle size={12} color="#b91c1c" />}
                    </div>
                    <div className="slip-student">{req.student}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Popover Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div 
            className="inbox-popover-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div 
              className="inbox-popover"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popover-header">
                <h3>REQUEST REVIEW</h3>
                <button className="close-btn" onClick={() => setSelectedRequest(null)}><X size={16} /></button>
              </div>
              
              <div className="popover-body">
                <div className="popover-meta">
                  <span className={`urgency-badge ${selectedRequest.urgency}`}>
                    {selectedRequest.urgency}
                  </span>
                  <span className="category-name">{selectedRequest.category}</span>
                </div>

                <div className="student-header">
                   <span className="student-label">FROM:</span>
                   <span className="student-name">{selectedRequest.student}</span>
                </div>
                
                <p className="request-text">"{selectedRequest.text}"</p>
                
                {(selectedRequest.xpReward !== 0 || selectedRequest.moraleImpact !== 0) && (
                  <div className="impact-preview">
                     {selectedRequest.xpReward !== 0 && (
                       <div className={`impact-item ${selectedRequest.xpReward < 0 ? 'negative' : 'positive'}`}>
                         XP: {selectedRequest.xpReward > 0 ? '+' : ''}{selectedRequest.xpReward}
                       </div>
                     )}
                     {selectedRequest.moraleImpact !== 0 && (
                       <div className={`impact-item ${selectedRequest.moraleImpact < 0 ? 'negative' : 'positive'}`}>
                         MORALE: {selectedRequest.moraleImpact > 0 ? '+' : ''}{selectedRequest.moraleImpact}
                       </div>
                     )}
                  </div>
                )}
              </div>

              <div className="popover-actions">
                <button 
                  className="action-btn deny"
                  onClick={() => handleAction('deny')}
                >
                  <X size={18} />
                  DENY
                </button>
                <button 
                  className="action-btn approve"
                  onClick={() => handleAction('approve')}
                >
                  <Check size={18} />
                  APPROVE
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