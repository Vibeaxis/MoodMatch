import React from 'react';
import './DailyMemo.css';
import { Book, Bookmark, Lock } from 'lucide-react';

const DailyMemo = ({ memo, onOpenHandbook }) => {
  if (!memo) return null;

  return (
    <div 
      className="daily-memo-container"
      role="button"
      tabIndex={0}
      onClick={onOpenHandbook}
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
    </div>
  );
};

export default DailyMemo;