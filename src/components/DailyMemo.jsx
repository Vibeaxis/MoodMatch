
import React from 'react';
import './DailyMemo.css';
import { BookOpen } from 'lucide-react';

const DailyMemo = ({ memo, onOpenHandbook }) => {
  if (!memo) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenHandbook();
    }
  };

  return (
    <div 
      className="daily-memo-container"
      role="button"
      tabIndex={0}
      onClick={onOpenHandbook}
      onKeyDown={handleKeyDown}
      aria-label="Open Employee Handbook"
    >
      <div className="memo-paper">
        {/* Sticky Note */}
        <div className="memo-sticky-note">
          <span className="sticky-text">Review<br/>Protocols</span>
          <div className="sticky-arrow">⬇</div>
        </div>

        {/* Header */}
        <div className="memo-header">
          <div className="memo-date">{new Date().toLocaleDateString()}</div>
          <div className="memo-stamp">RECEIVED</div>
        </div>

        {/* Content */}
        <div className="memo-content">
          <h3 className="memo-title">{memo.name || "Daily Directive"}</h3>
          <div className="memo-divider"></div>
          <p className="memo-text">{memo.text || memo.description || "No active directives."}</p>
          {memo.flavor && <p className="memo-flavor">{memo.flavor}</p>}
        </div>

        {/* Footer */}
        <div className="memo-footer">
          <span className="memo-category">{memo.type || "NOTICE"}</span>
          <BookOpen size={16} className="handbook-icon" />
        </div>
      </div>
      
      <div className="memo-hover-hint">Click to open Handbook</div>
    </div>
  );
};

export default DailyMemo;
