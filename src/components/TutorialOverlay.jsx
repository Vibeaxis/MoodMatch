
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import './TutorialOverlay.css';

const TUTORIAL_STEPS = [
  {
    id: 'welcome',
    title: 'Orientation Day',
    description: "Welcome to the faculty! Before you face the students, let's review the survival protocols.",
    target: null, // Center screen
    position: 'center'
  },
  {
    id: 'learning-log',
    title: 'The Learning Log',
    description: "This is your daily instructional guide. It tells you the CURRENT MOOD and the REQUIRED CONSTRAINT for the lesson.",
    target: '.learning-log-container',
    position: 'right'
  },
  {
    id: 'strategy-deck',
    title: 'Lesson Plans',
    description: "These folders contain your activity cards. You must pick a card that matches the Student Mood (Folder Color) AND satisfies the Constraint.",
    target: '.strategy-deck-container',
    position: 'left'
  },
  {
    id: 'stamper',
    title: 'Grading Tool',
    description: "Once you select a card, drag this stamper onto the Morning Report to commit your choice. Grading is final!",
    target: '.stamper-button', // Assuming DragStamp renders a button or container with this class
    position: 'top-left'
  },
  {
    id: 'xp-bar',
    title: 'Progression',
    description: "Earn XP to rank up. Higher ranks unlock new supplies, perks, and harder grade levels.",
    target: '.xp-bar-container',
    position: 'bottom'
  },
  {
    id: 'morale-meter',
    title: 'Momentum',
    description: "Consecutive successes build your Combo Streak. High streaks yield massive XP bonuses.",
    target: '.morale-meter-container',
    position: 'right'
  },
  {
    id: 'supplies',
    title: 'Inventory',
    description: "Your unlocked supplies appear here. They unlock new specialized cards in your deck.",
    target: '.supplies-container',
    position: 'bottom-left'
  },
  {
    id: 'crisis',
    title: 'Daily Events',
    description: "Check the Memo daily. It lists active modifiers or crises that alter gameplay rules.",
    target: '.modifier-display',
    position: 'bottom'
  },
  {
    id: 'final',
    title: 'Class Dismissed',
    description: "That's the basics. Keep your head down, grade fairly, and try not to let the chaos win. Good luck.",
    target: null,
    position: 'center'
  }
];

const StickyNote = ({ title, description, progress, onNext, onSkip }) => (
  <motion.div 
    className="tutorial-sticky-note"
    initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
    animate={{ scale: 1, opacity: 1, rotate: -2 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="sticky-header">
      <h3>{title}</h3>
      <button onClick={onSkip} className="skip-btn" title="End Tutorial">
        <X size={16} />
      </button>
    </div>
    <div className="sticky-body">
      <p>{description}</p>
    </div>
    <div className="sticky-footer">
      <div className="progress-indicators">
        {TUTORIAL_STEPS.map((_, idx) => (
          <div 
            key={idx} 
            className={`progress-dot ${idx < progress ? 'completed' : ''} ${idx === progress ? 'active' : ''}`}
          />
        ))}
      </div>
      <button className="next-btn" onClick={onNext}>
        {progress === TUTORIAL_STEPS.length - 1 ? 'FINISH' : 'NEXT'} <ArrowRight size={16} />
      </button>
    </div>
  </motion.div>
);

const Spotlight = ({ target }) => {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!target) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(target);
      if (el) {
        const r = el.getBoundingClientRect();
        // Add some padding
        setRect({
          top: r.top - 10,
          left: r.left - 10,
          width: r.width + 20,
          height: r.height + 20
        });
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    // Small delay to allow layout to settle
    const timer = setTimeout(updateRect, 100);

    return () => {
      window.removeEventListener('resize', updateRect);
      clearTimeout(timer);
    };
  }, [target]);

  if (!rect) return null;

  return (
    <svg className="tutorial-spotlight" width="100%" height="100%">
      <defs>
        <mask id="spotlight-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect 
            x={rect.left} 
            y={rect.top} 
            width={rect.width} 
            height={rect.height} 
            rx="10" 
            fill="black" 
            className="spotlight-hole"
          />
        </mask>
      </defs>
      <rect 
        x="0" 
        y="0" 
        width="100%" 
        height="100%" 
        fill="rgba(0,0,0,0.8)" 
        mask="url(#spotlight-mask)" 
      />
      <rect 
        x={rect.left} 
        y={rect.top} 
        width={rect.width} 
        height={rect.height} 
        rx="10" 
        fill="transparent" 
        stroke="#fde047" 
        strokeWidth="3"
        strokeDasharray="10 5"
        className="spotlight-border"
      />
    </svg>
  );
};

const TutorialOverlay = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = TUTORIAL_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="tutorial-overlay-container">
      {currentStep.target ? (
        <Spotlight target={currentStep.target} />
      ) : (
        <div className="tutorial-backdrop" />
      )}

      <div className={`tutorial-content-wrapper position-${currentStep.position || 'center'}`}>
        <StickyNote 
          title={currentStep.title}
          description={currentStep.description}
          progress={currentStepIndex}
          onNext={handleNext}
          onSkip={onComplete}
        />
      </div>
    </div>
  );
};

export default TutorialOverlay;
