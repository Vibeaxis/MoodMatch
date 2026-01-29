import React from 'react';
import './DailyMemo.css';
import { Book, Bookmark, Lock } from 'lucide-react';
import { motion } from 'framer-motion'; // 1. Import Motion

const DailyMemo = ({ memo, onOpenHandbook }) => {
  if (!memo) return null;

  return (
    <motion.div 
      className="daily-memo-container"
      
      // 2. Physics & Drag Logic
      drag
      dragMomentum={false} // "Heavy" feel, no sliding
      dragElastic={0.1}    // Minimal rubber-banding
      
      // 3. Constraints (Left side of desk only)
      // These numbers act as boundaries relative to its starting position.
      // Adjust 'right' to control how far towards the center it can go.
      dragConstraints={{ left: 0, right: 300, top: -50, bottom: 300 }}
      
      // 4. Interaction Handling
      // We use onTap instead of onClick because it's smarter about 
      // distinguishing between a "drag" and a "click".
      onTap={onOpenHandbook} 
      whileHover={{ scale: 1.05, rotate: -2, cursor: 'grab' }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
      whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
      
      // Accessibility
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenHandbook()}
      aria-label="Open Employee Handbook"
    >
      {/* THE DIRECTIVE SLIP (Bookmark) */}
      <div className="directive-bookmark">
        <div className="bookmark-header">
          <span className="date-stamp">{new Date().toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</span>
          <span className="urgency-stamp">REQ</span>
        </div>
        <div className="bookmark-content">
          <p className="directive-name">{memo.name || "Standard Protocol"}</p>
        </div>
      </div>

      {/* THE PHYSICAL BOOK */}
      <div className="handbook-cover">
        <div className="handbook-spine"></div>
        <div className="handbook-face">
          <div className="gold-border">
            <div className="handbook-seal">
              <Book size={24} color="#d4af37" />
            </div>
            <h1 className="handbook-title">
              FACULTY<br/>HANDBOOK
            </h1>
            <div className="handbook-edition">VOL. IV</div>
          </div>
          
          <div className="handbook-footer">
            <Lock size={12} className="inline-block mr-1" />
            CONFIDENTIAL
          </div>
        </div>
      </div>

      <div className="hover-tooltip">
        Click to Consult Rules
      </div>
    </motion.div>
  );
};

export default DailyMemo;