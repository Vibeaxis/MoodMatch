
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MorningReport from '@/components/MorningReport';
import LessonPlanFolders from '@/components/LessonPlanFolders';
import GradingAnimation from '@/components/GradingAnimation';
import DragStamp from '@/components/DragStamp';
import StampImpact from '@/components/StampImpact';
import { 
  getRandomMood, 
  generateClue, 
  getGradeRank,
  getMoodSolution,
  getAvailableCards,
  calculateRequiredPuzzles,
  calculateBoonSpawn,
  applyBoonEffect,
  ACTIVITY_CARDS
} from '@/lib/GameLogic';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';
import './ClassroomLogic.css';
import './BoonDisplay.css';

function ClassroomLogic({ 
  currentGradeLevel, 
  onXPGained, 
  onStreakUpdate, 
  onCorrectAnswer,
  onWrongAnswer,
  streak,
  activeModifier,
  hintActive,
  onPolaroidCreated,
  onGameNextDay,
  playerPhilosophy = 'Pragmatist',
  playerSupplies = [],
  onShiftComplete,
  onApplyBoon, 
  dayCount
}) {
  const [currentPuzzle, setCurrentPuzzle] = useState({ mood: null, constraint: null, text: '' });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [gradingResult, setGradingResult] = useState(null);
  const [highlightedFolder, setHighlightedFolder] = useState(null);
  
  const [isPending, setIsPending] = useState(false);
  const [isStampCommitted, setIsStampCommitted] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [showGrading, setShowGrading] = useState(false);

  const [puzzlesSolvedInShift, setPuzzlesSolvedInShift] = useState(0);
  const [isShiftComplete, setIsShiftComplete] = useState(false);
  const [cardsUsedInShift, setCardsUsedInShift] = useState([]); 
  const [uniqueCategorySet, setUniqueCategorySet] = useState(new Set());
  
  const [shiftCombo, setShiftCombo] = useState(0);
  const [comboHistory, setComboHistory] = useState([]);
  const [xpAtShiftStart, setXpAtShiftStart] = useState(0); 
  const [xpEarnedInShift, setXpEarnedInShift] = useState(0); 

  const [customActivities, setCustomActivities] = useState(ACTIVITY_CARDS);

  const [activeBoon, setActiveBoon] = useState(null);
  const [boonHistory, setBoonHistory] = useState([]);

  useEffect(() => {
    const baseKinetic = ACTIVITY_CARDS.Kinetic;
    const baseMedia = ACTIVITY_CARDS.Media;
    const baseDiscipline = ACTIVITY_CARDS.Discipline;
    const baseLecture = ACTIVITY_CARDS.Lecture;
    
    const newKinetic = getAvailableCards(baseKinetic, playerSupplies);
    const newMedia = getAvailableCards(baseMedia, playerSupplies);
    const newDiscipline = getAvailableCards(baseDiscipline, playerSupplies);
    const newLecture = getAvailableCards(baseLecture, playerSupplies);

    setCustomActivities({
      Kinetic: newKinetic,
      Media: newMedia,
      Discipline: newDiscipline,
      Lecture: newLecture
    });
    
  }, [playerSupplies]);


  const reportRef = useRef(null);
  const { toast } = useToast();

  const resetShiftState = () => {
    setPuzzlesSolvedInShift(0);
    setCardsUsedInShift([]);
    setUniqueCategorySet(new Set());
    setShiftCombo(0);
    setComboHistory([]);
    setXpEarnedInShift(0);
    setIsShiftComplete(false);
    
    generateNewPuzzle();
  };

  const generateNewPuzzle = () => {
    const mood = getRandomMood(currentGradeLevel);
    const puzzleData = generateClue(currentGradeLevel, mood); 
    
    setCurrentPuzzle(puzzleData);
    setSelectedActivity(null);
    setGradingResult(null);
    setHighlightedFolder(null);
    setIsPending(false);
    setIsStampCommitted(false);
    setShowImpact(false);
    setShowGrading(false);
  };

  useEffect(() => {
    resetShiftState();
  }, [currentGradeLevel]);

  useEffect(() => {
    if (hintActive && currentPuzzle.mood) {
      const solution = getMoodSolution(currentPuzzle.mood);
      if (solution) {
        setHighlightedFolder(solution.correctSolution);
        const timer = setTimeout(() => setHighlightedFolder(null), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [hintActive, currentPuzzle.mood]);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    const result = getGradeRank(activity, currentPuzzle.mood, currentPuzzle.constraint, activeModifier, playerPhilosophy);
    setGradingResult(result);
    setIsPending(true);
  };

  const handleStampCommit = () => {
    setIsPending(false);
    setShowImpact(true);
    setIsStampCommitted(true);
  };

  const handleImpactComplete = () => {
    setShowImpact(false);
    setTimeout(() => {
      if (onPolaroidCreated && gradingResult) {
        onPolaroidCreated(gradingResult.rank);
      }

      handleGradingComplete();
      setShowGrading(true);
    }, 1500);
  };
  const addPuzzleToHistory = (puzzleEntry) => {
    setCardsUsedInShift(prev => [...prev, puzzleEntry]);
  };

  const handleGradingComplete = () => {
    if (!gradingResult) return;

    const { rank, xp: baseXP, philosophyBonus, bonusReason } = gradingResult;
    const isSuccess = rank === 'S' || rank === 'A';
    
    let newCombo = shiftCombo;
    let comboBonus = 0;
    
    if (isSuccess) {
      newCombo += 1;
      comboBonus = newCombo * 50;
      setShiftCombo(newCombo);
    } else {
      newCombo = 0;
      setShiftCombo(0);
    }

    const totalPuzzleXP = baseXP + comboBonus;
    const newXPEarnedInShift = xpEarnedInShift + totalPuzzleXP;
    setXpEarnedInShift(newXPEarnedInShift);

    setComboHistory(prev => [...prev, { puzzleNum: puzzlesSolvedInShift + 1, grade: rank, bonus: comboBonus }]);
    
    addPuzzleToHistory({
      puzzle: currentPuzzle,
      activity: selectedActivity,
      grade: rank,
      xp: totalPuzzleXP,
      comboBonus: comboBonus,
      timestamp: new Date().toISOString()
    });

    const newUniqueSet = new Set(uniqueCategorySet);
    newUniqueSet.add(selectedActivity.lessonType);
    setUniqueCategorySet(newUniqueSet);

    if (newCombo > 1) {
      toast({
        title: `COMBBO! ${newCombo}x Streak!`,
        description: `+${baseXP} XP +${comboBonus} Combo Bonus!`,
        className: "bg-amber-100 border-2 border-amber-400 text-amber-900"
      });
    } else if (newCombo === 0 && shiftCombo > 0) {
      toast({
        title: "Combo Broken!",
        description: "Streak reset to 0x.",
        variant: "destructive"
      });
    } else {
       toast({
        title: `Grade ${rank}! ${philosophyBonus > 0 ? `(+${philosophyBonus} Bonus)` : ''}`,
        description: bonusReason ? `${bonusReason} | Total: +${totalPuzzleXP} XP` : `+${totalPuzzleXP} XP`,
        variant: isSuccess ? "default" : "destructive"
      });
    }

    onXPGained(totalPuzzleXP, rank);
    if (isSuccess) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
    
    const newSolvedCount = puzzlesSolvedInShift + 1;
    setPuzzlesSolvedInShift(newSolvedCount);
    
    const hasStaffAbsence = activeModifier && activeModifier.id === 'STAFF_ABSENCE';
    const requiredPuzzles = calculateRequiredPuzzles(currentGradeLevel, hasStaffAbsence);

    const spawnedBoon = calculateBoonSpawn(dayCount || 1, newSolvedCount, requiredPuzzles, newCombo);
    if (spawnedBoon) {
      setActiveBoon(spawnedBoon);
      setBoonHistory(prev => [...prev, spawnedBoon]);
    }

    if (newSolvedCount >= requiredPuzzles) {
      setIsShiftComplete(true);
      toast({
        title: "Shift Complete!",
        description: "Clock out to review your performance.",
        className: "bg-green-100 border-green-500 text-green-900"
      });
    } else {
       toast({
        title: "Next Puzzle",
        description: `Puzzle ${newSolvedCount}/${requiredPuzzles} Complete!`,
      });
      setTimeout(() => {
          generateNewPuzzle();
      }, 500);
    }
  };

  const handleClaimBoon = () => {
    if (activeBoon && onApplyBoon) {
      onApplyBoon(activeBoon);
    }
    setActiveBoon(null);
  };

  const handleShiftComplete = () => {
    const shiftSummary = {
      puzzlesSolved: puzzlesSolvedInShift,
      cardsUsed: cardsUsedInShift.map(h => h.activity), 
      fullHistory: cardsUsedInShift,
      totalXPEarned: xpEarnedInShift,
      finalCombo: shiftCombo,
      comboHistory: comboHistory,
      timestamp: Date.now(),
      targetMood: currentPuzzle.mood, 
      finalGrade: gradingResult?.rank,
      currentStreak: streak,
      uniqueCategoryCount: uniqueCategorySet.size,
      xpAtShiftStart: xpAtShiftStart 
    };

    if (onShiftComplete) {
      onShiftComplete(shiftSummary);
    }
    
    if (onGameNextDay) {
      resetShiftState();
      onGameNextDay();
    }
  };

  return (
    <div 
      className="min-h-screen w-full p-8 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #78350f 0%, #0c0a09 100%)', 
      }}
    >
     {/* Wood Texture (Optional - Keep this one if you want texture but no darkness) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply url('data:image/svg+xml;base64,...') z-0" />
      
      <div className="combo-indicator morale-meter-container">
        <div className="combo-counter">
          <span className="combo-value">{shiftCombo > 0 ? `${shiftCombo}x` : '0x'}</span>
          <span className="combo-label">{shiftCombo > 0 ? 'COMBO' : 'No Combo'}</span>
        </div>
        <div className="combo-history">
          {comboHistory.map((entry, idx) => (
            <div key={idx} className="combo-entry">
              <span className={`combo-grade ${entry.grade === 'F' ? 'text-red-500' : ''}`}>{entry.grade}</span>
              {entry.bonus > 0 && <span className="combo-bonus">+{entry.bonus}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 z-0 pointer-events-none opacity-60">
        <p className="font-mono-typewriter text-stone-400/50 text-xs mb-1 tracking-widest">SUCCESS STREAK</p>
        <div className="flex flex-wrap gap-4 max-w-xs">
          {Array.from({ length: streak }).map((_, i) => (
             <motion.div 
               key={i}
               className="w-1 h-8 bg-stone-400/70 rounded-full transform rotate-6 shadow-sm" 
               style={{ 
                 marginLeft: i % 5 === 0 ? '10px' : '2px',
                 transform: i > 0 && (i + 1) % 5 === 0 ? 'rotate(-60deg) translateX(-15px) translateY(10px)' : 'rotate(5deg)'
               }}
             />
          ))}
        </div>
      </div>
      
      {activeModifier && (
        <motion.div 
          className={`absolute bottom-10 right-10 z-0 border p-2 rounded-lg backdrop-blur-sm
            ${activeModifier.type === 'CRISIS' ? 'bg-red-900/40 border-red-500/30' : 'bg-blue-900/40 border-blue-500/30'}
          `}
        >
          <p className={`${activeModifier.type === 'CRISIS' ? 'text-red-100' : 'text-blue-100'} font-bold text-xs uppercase tracking-wider text-center`}>
             {activeModifier.type === 'CRISIS' ? '⚠️ CRISIS ACTIVE' : 'Active Effect'}
          </p>
          <p className="text-white font-mono-typewriter text-sm">{activeModifier.text}</p>
        </motion.div>
      )}

      {showImpact && <StampImpact onComplete={handleImpactComplete} />}

      <div className="stamper-button">
        <DragStamp 
          isVisible={isPending} 
          targetRef={reportRef} 
          onCommit={handleStampCommit} 
          grade={gradingResult?.rank}
        />
      </div>

      <AnimatePresence>
        {activeBoon && (
           <div className="boon-modal-overlay" onClick={handleClaimBoon}>
             <motion.div 
               className={`boon-modal ${activeBoon.rarity}`}
               onClick={(e) => e.stopPropagation()} 
             >
                <div className="boon-modal-header">
                   {activeBoon.icon}
                   <h2>{activeBoon.name}</h2>
                   <div className="boon-rarity-badge">{activeBoon.rarity}</div>
                </div>
                <div className="boon-modal-content">
                   <p className="boon-description">{activeBoon.description}</p>
                   <p className="boon-flavor">"{activeBoon.flavor}"</p>
                </div>
                <div className="boon-modal-actions">
                   <button className="boon-btn" onClick={handleClaimBoon}>
                      CLAIM REWARD
                   </button>
                </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isShiftComplete && !activeBoon && (
          <motion.button 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={handleShiftComplete}
            className="fixed bottom-8 right-8 z-[100] bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl flex items-center gap-2 border-2 border-green-400"
          >
            <span>End Shift & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left side - Morning Report */}
          <div className="flex justify-center lg:justify-end learning-log-container">
            <MorningReport 
              ref={reportRef}
              clue={currentPuzzle.text} 
              gradeLevel={currentGradeLevel} 
              stampCommitted={isStampCommitted}
              grade={gradingResult?.rank}
              philosophy={playerPhilosophy}
            />
          </div>

          {/* Right side - Lesson Plan Folders */}
          <div className="flex justify-center lg:justify-start pt-12 lg:pt-0 strategy-deck-container">
            <LessonPlanFolders 
              onFolderSelect={() => {}} 
              onActivitySelect={handleActivitySelect}
              disabled={isPending || isStampCommitted || showGrading || isShiftComplete || activeBoon}
              disabledTypes={activeModifier?.modifier?.blockType ? [activeModifier.modifier.blockType] : []}
              highlightedFolder={highlightedFolder}
              customActivities={customActivities}
            />
          </div>
        </div>

        <GradingAnimation
          shouldRender={showGrading}
          selectedActivity={selectedActivity}
          rank={gradingResult?.rank}
          feedback={gradingResult?.feedback}
          activeModifier={activeModifier}
          modifierApplied={gradingResult?.modifierApplied}
          onAnimationComplete={() => {
            setShowGrading(false);       
            setSelectedActivity(null); 
            handleManualNextDay();  
          }}
        />
      </div>
    </div>
  );
}

export default ClassroomLogic;
