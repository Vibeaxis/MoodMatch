

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, Check, GraduationCap, X, Award, Clock, Settings as SettingsIcon } from 'lucide-react';
import ClassroomLogic from '@/components/ClassroomLogic';
import ProgressionBar from '@/components/ProgressionBar';
import TeacherPlanner from '@/components/TeacherPlanner';
import SupplyDisplay from '@/components/SupplyDisplay';
import CoffeeMug from '@/components/CoffeeMug';
import Polaroid from '@/components/Polaroid';
import FinalExamModal from '@/components/FinalExamModal';
import SettingsModal from '@/components/SettingsModal';
import DailyMemo from '@/components/DailyMemo';
import EmployeeHandbook from '@/components/EmployeeHandbook';
import InboxTray from './InboxTray';
import TutorialOverlay from '@/components/TutorialOverlay';
import { useInboxSystem } from '../hooks/useInboxSystem';
import { useStipendSystem } from '../hooks/useStipendSystem';
import { useShiftHistory } from '../hooks/useShiftHistory';
import { SaveManager } from '@/lib/SaveSystem';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ACHIEVEMENTS } from '@/lib/ExpansionData';
import { 
  GRADE_LEVEL_CONFIG, 
  canUnlockNextLevel, 
  getCurrentRankIndex,
  getCurrentRankData,
  RANK_CONFIG,
  checkDirectiveCompletion,
  selectDailyDirective,
  getCurrentGradeLevel,
  shouldTriggerFinalExam,
  applyBoonEffect
} from '@/lib/GameLogic';
import { 
  generateWeeklySchedule, 
  applyScheduleEvent 
} from '@/lib/ScheduleLogic';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { playFRankSound } from '@/lib/AudioUtils';
import './GameUI.css';

// Helper to convert letter grade to GPA point
const gradeToPoint = (grade) => {
  switch(grade) {
    case 'S': return 4.0;
    case 'A': return 3.5;
    case 'B': return 3.0;
    case 'C': return 2.0;
    case 'D': return 1.0;
    case 'F': return 0.0;
    default: return 0.0;
  }
};

const generateShiftNotes = (rank, crisisName, deniedCount) => {
  let notes = [];
  
  if (rank === 'S') notes.push("Exceptional performance noted.");
  if (rank === 'F') notes.push("Severe disciplinary issues observed.");
  if (rank === 'C') notes.push("Standard operational compliance.");
  
  if (crisisName) {
    notes.push(`Crisis managed: ${crisisName}.`);
  }
  
  if (deniedCount > 5) {
    notes.push("High volume of request denials.");
  }
  
  if (notes.length === 0) return "Routine shift completed.";
  return notes.join(" ");
};

function GameUI({ playerProfile, updateProfile, onClockOut }) {
  // Settings & Save System
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(SaveManager.loadSettings());
  
  const [currentGradeLevel, setCurrentGradeLevel] = useState('Kindergarten');
  
  const { xpTotal, streak, supplies: unlockedSupplies, currentRank } = playerProfile;
  const [unlockedGradeLevels, setUnlockedGradeLevels] = useState(['Kindergarten']);
  
  const [dayCount, setDayCount] = useState(1);

  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  // Schedule State
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(0); // 0=Monday, 4=Friday
  const [weekNumber, setWeekNumber] = useState(1);

  // Game State
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [dailyMemo, setDailyMemo] = useState(null);
  const [activeModifier, setActiveModifier] = useState(null);

  
  const [dailyDirective, setDailyDirective] = useState(null);
const [showGallery, setShowGallery] = useState(false);
  // Final Exam State
  const [showFinalExam, setShowFinalExam] = useState(false);
  const [finalExamData, setFinalExamData] = useState({ previousLevel: null, nextLevel: null });
  const [pendingXP, setPendingXP] = useState(0);

  // Crisis State
  const [activeCrisis, setActiveCrisis] = useState(null);
  const [crisisActive, setCrisisActive] = useState(false);
const [showAchievementGallery, setShowAchievementGallery] = useState(false);
  // Performance & Perks State
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [careerGPA, setCareerGPA] = useState(0);
  const [unlockedPerks, setUnlockedPerks] = useState([]);
  const [tenureProtectionUsed, setTenureProtectionUsed] = useState(false);

  // Interaction State
  const [coffeeUsesRemaining, setCoffeeUsesRemaining] = useState(1);
  const [coffeeMaxUses, setCoffeeMaxUses] = useState(1);
  const [hintActive, setHintActive] = useState(false);
  const [dailyPolaroids, setDailyPolaroids] = useState([]);
  
  const gameContainerRef = useRef(null);
  
  // Inbox System Hook
  const { requests, isToppled, handleApprove, handleDeny, handleTopple } = useInboxSystem();
  
  // Stipend System Hook
  const stipendSystem = useStipendSystem();

  // Shift History Hook
  const shiftHistory = useShiftHistory();

  const { toast } = useToast();
  const currentConfig = GRADE_LEVEL_CONFIG[currentGradeLevel];
  const maxXp = currentConfig.maxXP;

  // Auto-Save Logic
  const fullGameState = {
    playerProfile,
    currentGradeLevel,
    dayCount,
    unlockedGradeLevels,
    unlockedPerks,
    weeklySchedule,
    dayOfWeek,
    weekNumber,
    performanceHistory,
    settings,
    tutorialCompleted
  };
  
  const autoSaveStatus = useAutoSave(fullGameState, settings.autoSaveEnabled);
// Load saved state on mount
  useEffect(() => {
    const savedState = SaveManager.loadGame();
    
    if (savedState) {
      if (savedState.dayCount) setDayCount(savedState.dayCount);
      if (savedState.unlockedGradeLevels) setUnlockedGradeLevels(savedState.unlockedGradeLevels);
      if (savedState.unlockedPerks) setUnlockedPerks(savedState.unlockedPerks);
      
      // --- THE FIX: XP OVERRIDE CHECK ---
      // 1. Default to what the save file says
      let loadedLevel = savedState.currentGradeLevel || 'Kindergarten';
      
      // 2. Check the props (playerProfile) to see if we deserve a promotion
      // Note: We use the prop 'xpTotal' because it is the source of truth for the profile
      if (xpTotal >= 4500) {
        loadedLevel = 'College'; 
      } else if (xpTotal >= 2500) {
        loadedLevel = 'HighSchool';
      }

      // 3. Set the corrected level
      setCurrentGradeLevel(loadedLevel);
      // ----------------------------------

      // Tutorial Check
      if (savedState.tutorialCompleted !== undefined) {
        setTutorialCompleted(savedState.tutorialCompleted);
      }
      
      const shiftsDone = savedState.shiftHistory ? savedState.shiftHistory.length : 0;
      if (!savedState.tutorialCompleted && shiftsDone === 0) {
        setShowTutorial(true);
      }
    } else {
      // New game defaults
      // Even for a "New Game", if the profile prop has XP (from a previous clock-in), we should sync it.
      if (xpTotal >= 4500) setCurrentGradeLevel('College');
      else if (xpTotal >= 2500) setCurrentGradeLevel('HighSchool');
      else setShowTutorial(true);
    }
  }, []); // Only runs once on mount

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    SaveManager.saveGame({ ...fullGameState, tutorialCompleted: true });
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    SaveManager.saveSettings(newSettings);
    SaveManager.saveGame(fullGameState);
  };

  // Initialize Schedule
  useEffect(() => {
    const currentWeek = playerProfile?.weekNumber || weekNumber;
    const currentDay = playerProfile?.dayOfWeek || dayOfWeek;
    
    if (weeklySchedule.length === 0) {
       const schedule = generateWeeklySchedule(currentWeek);
       setWeeklySchedule(schedule);
       
       const todaysEvent = schedule[currentDay];
       if (todaysEvent) {
         const updates = applyScheduleEvent(todaysEvent, {});
         setDailyMemo(updates.dailyMemo);
         setActiveModifier(updates.activeModifier);
         setActiveCrisis(updates.activeCrisis);
         setCrisisActive(updates.crisisActive || false);
         
         const directive = selectDailyDirective();
         setDailyDirective(directive);
       }
    }
  }, [playerProfile?.weekNumber, playerProfile?.dayOfWeek, weekNumber, dayOfWeek]); 

  const triggerScreenShake = () => {
    if (gameContainerRef.current && settings.animationsEnabled) {
      gameContainerRef.current.classList.remove('shake-animation');
      void gameContainerRef.current.offsetWidth; // trigger reflow
      gameContainerRef.current.classList.add('shake-animation');
      
      setTimeout(() => {
        if (gameContainerRef.current) {
          gameContainerRef.current.classList.remove('shake-animation');
        }
      }, 500);
    }
  };

  const showDirectiveCompletionToast = (directive) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
           <Check className="w-5 h-5 text-amber-900" />
           <span className="font-bold text-amber-900">DIRECTIVE COMPLETE</span>
        </div>
      ),
      description: <span className="text-amber-800 font-semibold">+{directive.xpBonus} XP Bonus!</span>,
      duration: 3000,
      className: "bg-amber-300 border-2 border-amber-500",
    });
  };

  const showPromotionCeremonyToast = (nextLevel, bonusXP) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
           <GraduationCap className="w-6 h-6 text-yellow-800" />
           <span className="font-bold text-yellow-900 uppercase">PROMOTED TO {nextLevel?.name?.toUpperCase()}!</span>
        </div>
      ),
      description: <span className="text-yellow-800 font-bold">+{bonusXP} XP Philosophy Bonus!</span>,
      duration: 4000,
      className: "bg-gradient-to-r from-yellow-200 to-amber-100 border-2 border-yellow-500",
    });
  };

  const handleXPGained = (xpAmount, rank) => {
    if (rank === 'F' && settings.animationsEnabled) {
      triggerScreenShake();
      if (settings.soundEnabled) playFRankSound();
    }

    const currentXP = xpTotal;
    const newXP = currentXP + xpAmount;
    
    if (shouldTriggerFinalExam(currentXP, newXP)) {
       const prevLevel = getCurrentGradeLevel(currentXP);
       const nextLevel = getCurrentGradeLevel(newXP);
       
       setFinalExamData({ previousLevel: prevLevel, nextLevel: nextLevel });
       setPendingXP(newXP);
       setShowFinalExam(true);
       return;
    }

    const newRankIndex = getCurrentRankIndex(newXP);
    if (newRankIndex > currentRank) {
       const newRankData = getCurrentRankData(newXP);

       stipendSystem.updateProgress('GAIN_RANK', { rankGain: 1 });
       
       toast({
          title: "🎉 RANK UP!",
          description: `Congratulations! You are now a ${newRankData.name}!`,
          duration: 5000,
          className: "bg-amber-100 border-amber-400 text-amber-900"
        });
    }

    updateProfile({ 
      xpTotal: newXP,
      currentRank: newRankIndex 
    });
  };

  const handleFinalExamComplete = (bonusXP) => {
    const totalXP = pendingXP + bonusXP;
    const newRankIndex = getCurrentRankIndex(totalXP);
    
    updateProfile({
      xpTotal: totalXP,
      currentRank: newRankIndex
    });
    
    showPromotionCeremonyToast(finalExamData.nextLevel, bonusXP);
    setShowFinalExam(false);
    setPendingXP(0);
  };

  const handleShiftComplete = (shiftData) => {
    if (dailyDirective && checkDirectiveCompletion(dailyDirective, shiftData)) {
       handleXPGained(dailyDirective.xpBonus, 'Bonus');
       showDirectiveCompletionToast(dailyDirective);
    }
    
    stipendSystem.updateProgress('SHIFT_COMPLETE', { 
      stat: 'MORALE', 
      value: 100 
    });
    
    if (crisisActive) {
      stipendSystem.updateProgress('COMPLETE_DURING_CRISIS', { duringCrisis: true });
    }
const finalRank = shiftData.rank || 'C';
  const finalGPA = gradeToPoint(finalRank);

  const shiftObject = {
    dayNumber: dayCount,
    gradeLevel: currentGradeLevel,
    finalRank,
    finalGPA,
    xpEarned: shiftData.xpEarned || 0,
    crisisEncountered: (crisisActive && activeCrisis) ? activeCrisis.name : null,
    requestsApproved: shiftData.approved || 0,
    requestsDenied: shiftData.denied || 0,
    cardsPlayed: shiftData.cardsPlayed || 0,
    comboStreak: shiftData.maxStreak || streak,
    moraleFinal: 100,
    notes: generateShiftNotes(finalRank, (crisisActive && activeCrisis), shiftData.denied),
    philosophy: playerProfile.philosophy,
    ignored: false // Important for the GPA calculation
  };

  // 1. Save to persistent storage
  shiftHistory.saveShift(shiftObject);

  // 2. Update local history state immediately
  const updatedHistory = shiftHistory.getHistory();
  setPerformanceHistory(updatedHistory);

  // 3. Recalculate GPA and Perks immediately
  recalculateStats(updatedHistory);
};
  useEffect(() => {
     const correctRankIndex = getCurrentRankIndex(xpTotal);
     if (correctRankIndex !== currentRank) {
         updateProfile({ currentRank: correctRankIndex });
     }
  }, [xpTotal, currentRank, updateProfile]);


  const recalculateStats = (history) => {
  if (!history || history.length === 0) {
    setCareerGPA(0);
    setUnlockedPerks([]);
    return;
  }

  let totalPoints = 0;
  let count = 0;
  
  history.forEach(shift => {
    if (!shift.ignored) {
      // Determine points safely from either finalGPA or a string grade
      const points = shift.finalGPA !== undefined 
        ? shift.finalGPA 
        : gradeToPoint(shift.finalRank || shift.grade || 'C');
      
      totalPoints += points;
      count++;
    }
  });

  const calculatedGPA = count > 0 ? totalPoints / count : 0;
  
  // Update local states
  setCareerGPA(calculatedGPA);
  
  const newPerks = [];
  if (calculatedGPA >= 3.8) newPerks.push('TENURE');
  if (calculatedGPA >= 3.5) newPerks.push('EARLY_MEMO_PEEK');
  if (calculatedGPA >= 3.0) {
    newPerks.push('UNION_DISCOUNTS');
    newPerks.push('COFFEE_REFILL');
  }
  
  setUnlockedPerks(newPerks);

  // Sync back to the profile object
  updateProfile({ 
      gpa: calculatedGPA,
      unlockedPerks: newPerks 
  });

  if (newPerks.includes('COFFEE_REFILL')) {
    setCoffeeMaxUses(2);
  }
};

  const handleReadMemo = () => {
    if (dailyMemo && dailyMemo.type !== 'FLAVOR' && !activeModifier) {
      setActiveModifier(dailyMemo);
      toast({
        title: "Event Active!",
        description: dailyMemo.description,
        duration: 3000
      });
    }
  };

  const handleRequisition = (item) => {
    if (streak >= item.cost) {
      const newStreak = streak - item.cost;
      const newSupplies = [...unlockedSupplies, item.id];
      
      updateProfile({
        streak: newStreak,
        supplies: newSupplies
      });
      
      stipendSystem.updateProgress('ACCUMULATE_SUPPLIES', { supplyCount: newSupplies.length });
      localStorage.setItem('teacherUnlockedSupplies', JSON.stringify(newSupplies));

      toast({
        title: "Requisition Approved",
        description: `${item.name} has been added to the classroom inventory.`,
      });
    } else {
      toast({
        title: "Request Denied",
        description: "Insufficient streak points.",
        variant: "destructive"
      });
    }
  };

  const handleCoffeeUse = (action) => {
    if (coffeeUsesRemaining <= 0) return;

    if (action === 'REROLL') {
      toast({ title: "Coffee Break", description: "You took a moment to regroup." });
    } else if (action === 'HINT') {
      setHintActive(true);
      setTimeout(() => setHintActive(false), 3000);
      toast({ title: "Caffeine Boost", description: "Clarity achieved! The solution seems obvious now..." });
    }

    setCoffeeUsesRemaining(prev => prev - 1);
  };

  const handlePolaroidCreated = (rank) => {
    const newPolaroid = {
      id: Date.now(),
      grade: rank,
      timestamp: Date.now(),
      visible: true 
    };
    setDailyPolaroids(prev => [...prev.slice(-4), newPolaroid]);
    stipendSystem.updateProgress('PUZZLE_COMPLETE', { 
      rank: rank,
      duringCrisis: crisisActive 
    });

    let finalRank = rank;
    let ignoreInGPA = false;

    if (rank === 'F' && unlockedPerks.includes('TENURE') && !tenureProtectionUsed) {
      ignoreInGPA = true;
      setTenureProtectionUsed(true);
      localStorage.setItem('tenureProtectionUsed', 'true');
      toast({
        title: "Tenure Protection Active",
        description: "This F-Rank will NOT count towards your Career GPA.",
        variant: "default"
      });
    }

    const newShift = {
      shiftNumber: performanceHistory.length + 1,
      grade: finalRank,
      date: new Date().toISOString(),
      xpEarned: 100, 
      modifierUsed: activeModifier ? activeModifier.text : null,
      crisisEvent: crisisActive && activeCrisis ? `${activeCrisis.name} - ${activeCrisis.impact}` : null,
      ignored: ignoreInGPA
    };

    const updatedHistory = [newShift, ...performanceHistory];
    setPerformanceHistory(updatedHistory);
    recalculateStats(updatedHistory);
  };

  const handleManualNextDay = () => {
    const nextDayIndex = (dayOfWeek + 1) % 5;
    let currentSchedule = weeklySchedule;
    let currentWeekNumber = weekNumber;

    if (nextDayIndex === 0) {
      currentWeekNumber += 1;
      setWeekNumber(currentWeekNumber);
      currentSchedule = generateWeeklySchedule(currentWeekNumber);
      setWeeklySchedule(currentSchedule);
      toast({ title: "New Week!", description: `Welcome to Week ${currentWeekNumber}. Check your planner!` });
    }

    setDayOfWeek(nextDayIndex);
    
    const todaysEvent = currentSchedule[nextDayIndex];
    const updates = applyScheduleEvent(todaysEvent, {});
    
    setDailyMemo(updates.dailyMemo);
    setActiveModifier(updates.activeModifier);
    setActiveCrisis(updates.activeCrisis);
    setCrisisActive(updates.crisisActive || false);
    
    const directive = selectDailyDirective();
    setDailyDirective(directive);

    setDayCount(prev => prev + 1); 
    setCoffeeUsesRemaining(unlockedPerks.includes('COFFEE_REFILL') ? 2 : 1);
    setCoffeeMaxUses(unlockedPerks.includes('COFFEE_REFILL') ? 2 : 1);
    
    setDailyPolaroids([]);
    
    toast({ title: `Day ${dayCount + 1}`, description: todaysEvent.event?.text || "New Day Started" });

    if (nextDayIndex === 0) {
      setTenureProtectionUsed(false);
      localStorage.setItem('tenureProtectionUsed', 'false');
      if (unlockedPerks.includes('TENURE')) {
        toast({ title: "Tenure Reset", description: "Your weekly protection has been restored." });
      }
    }
  };

  const getNextUnlockStreak = () => {
    const levels = ['Kindergarten', 'HighSchool', 'College'];
    const currentIndex = levels.indexOf(currentGradeLevel);
    if (currentIndex === levels.length - 1) return null;
    const nextLevel = levels[currentIndex + 1];
    return GRADE_LEVEL_CONFIG[nextLevel].unlockStreak;
  };

 const handleCorrectAnswer = () => {
    const newStreak = streak + 1;
    updateProfile({ streak: newStreak });
    
    stipendSystem.updateProgress('CARD_PLAYED', { cardType: 'ANY' }); 
    stipendSystem.updateProgress('MAINTAIN_STREAK', { streak: newStreak });

    const nextLevel = canUnlockNextLevel(currentGradeLevel, newStreak);
    if (nextLevel && !unlockedGradeLevels.includes(nextLevel)) {
      setUnlockedGradeLevels(prev => [...prev, nextLevel]);
      setCurrentGradeLevel(nextLevel);
      updateProfile({ xpTotal: 0 }); 
      toast({ title: '🎉 New Grade Level Unlocked!', description: `Welcome to ${nextLevel}!` });
    }

    // REMOVED: setFeedbackModal(...)
    // The GradingAnimation in ClassroomLogic now handles the visual success state.
  };

  const handleWrongAnswer = () => {
    if (activeModifier && activeModifier.id === 'STREAK_SAVER') return;
    if (crisisActive && activeCrisis.id === 'OBSERVATION_DAY') {
       updateProfile({ streak: 0 });
       return;
    }
    updateProfile({ streak: 0 });

    // REMOVED: setFeedbackModal(...)
    // The GradingAnimation in ClassroomLogic now handles the visual failure state.
  };
  
  const handleRequestApproveWrapper = (id) => {
    handleApprove(id);
    stipendSystem.updateProgress('REQUEST_APPROVED');
  };
  
  const handleClaimReward = () => {
     const reward = stipendSystem.claimReward();
     if (reward > 0) {
       handleXPGained(reward, 'Bonus');
       toast({
         title: "Contract Payment Received",
         description: `Transfer complete: +${reward} XP`,
         className: "bg-green-100 border-green-500 text-green-900"
       });
     }
  };

  const handleApplyBoon = (boon) => {
    const changes = applyBoonEffect(boon);
    
    if (changes.type === 'xp' || changes.type === 'challenge') {
      handleXPGained(changes.value, 'Boon');
    }
    
    if (changes.type === 'streak') {
      if (changes.effect === 'add') {
         updateProfile({ streak: streak + changes.value });
      } else if (changes.effect === 'multiply') {
         updateProfile({ streak: streak * changes.value });
      }
    }
    
    if (changes.type === 'reroll') {
       setCoffeeUsesRemaining(prev => prev + changes.value);
    }
    
    if (changes.type === 'supply' || changes.type === 'supply_token') {
       handleXPGained(150, 'SupplyFallback');
       toast({ title: "Supply Grant", description: "Supplies converted to XP budget (150 XP)." });
    }

    toast({
      title: "Boon Activated",
      description: `${changes.name}: Effect applied!`,
      className: "bg-amber-100 border-amber-500 text-amber-900"
    });
  };

  return (
    <>
      <Helmet>
        <title>Classroom Mood Matcher</title>
      </Helmet>

   {/* MASTER CONTAINER 
          - Mobile: min-h-screen (Scrolls normally if content overflows)
          - Desktop: h-screen + overflow-hidden (Locks everything in place like a game canvas) 
      */}
      <div 
        ref={gameContainerRef} 
        className={`
          relative w-full bg-stone-900 font-serif
          min-h-screen overflow-y-auto overflow-x-hidden
          md:h-screen md:overflow-hidden 
          ${showTutorial ? 'tutorial-disabled' : ''}
        `}
      >
      {/* --- 2. SETTINGS BUTTON (Top Right) --- */}
        {/* Floating freely, no header bar background */}
        <div className="absolute top-4 right-4 z-50">
           <button 
             className="settings-button w-12 h-12 rounded-full bg-stone-900/50 hover:bg-stone-900 text-stone-400 border border-stone-700 flex items-center justify-center transition-all shadow-lg" 
             onClick={() => setShowSettings(true)} 
             aria-label="Settings"
           >
             <SettingsIcon size={24} />
           </button>
        </div>

       {/* Add z-50 and relative positioning to force it above the gradient background */}
<div className="supplies-container fixed inset-0 z-50 pointer-events-none">
  <SupplyDisplay unlockedSupplies={unlockedSupplies} />
</div>

      {/* Handbook */}
                <div className="absolute top-24 left-0 z-20 origin-left transform scale-50 md:scale-90 md:top-32 md:left-8">
                    <DailyMemo 
                      memo={dailyMemo} 
                      onOpenHandbook={() => setIsHandbookOpen(true)} 
                    />
                </div>

        <EmployeeHandbook 
          isOpen={isHandbookOpen} 
          onClose={() => setIsHandbookOpen(false)} 
          stipendState={{
            activeContract: stipendSystem.activeContract,
            progress: stipendSystem.progress,
            isComplete: stipendSystem.isComplete
          }}
          onSignContract={stipendSystem.signContract}
          onAbandonContract={stipendSystem.abandonContract}
          onClaimReward={handleClaimReward}
        />

        <AnimatePresence>
          {showFinalExam && (
            <FinalExamModal
              isOpen={showFinalExam}
              previousLevel={finalExamData.previousLevel}
              nextLevel={finalExamData.nextLevel}
              playerPhilosophy={playerProfile.philosophy}
              onComplete={handleFinalExamComplete}
              onClose={() => setShowFinalExam(false)}
            />
          )}
        </AnimatePresence>

        <SettingsModal 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          currentSettings={settings}
          onSettingsChange={handleSettingsChange}
          onHardReset={() => {
            onClockOut(); // Use parent method to fully reset
            window.location.reload();
          }}
        />

        {showTutorial && (
          <TutorialOverlay onComplete={handleTutorialComplete} />
        )}

        <AnimatePresence>
          {crisisActive && activeCrisis && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
            >
              <div className="bg-red-600 text-white rounded-lg shadow-2xl border-2 border-red-800 p-4 flex items-center gap-4">
                <div className="bg-red-800 p-2 rounded-full animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight uppercase tracking-wider">{activeCrisis.name}</h3>
                  <p className="text-red-100 text-xs font-mono-typewriter">{activeCrisis.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
{/* POLAROID OVERLAY LAYER */}
<div className="absolute inset-0 pointer-events-none z-30">
  <AnimatePresence>
    {dailyPolaroids.map((p, index) => (
      <Polaroid 
        key={p.id} 
        grade={p.grade} 
        timestamp={p.timestamp} 
        index={index} 
        isVisible={p.visible}
        // Pass the function directly
        onClick={() => setShowAchievementGallery(true)}
      />
    ))}
  </AnimatePresence>
</div>

 {/* --- COFFEE MUG (MOVED BACK TO BOTTOM RIGHT) --- */}
        {/* Removed from top, pinned back to bottom right thumb zone */}
        <div className="fixed bottom-32 right-4 z-50 md:bottom-12 md:right-12">
            <CoffeeMug 
              usesRemaining={coffeeUsesRemaining} 
              maxUses={coffeeMaxUses}
              onUse={handleCoffeeUse} 
            />
        </div>

{/* --- 1. THE RULER (Top Z-Layer) --- */}
 <div className="absolute top-0 left-0 w-full z-20 pt-12 px-4 pb-2 flex justify-center pointer-events-none">
           <div className="w-full max-w-7xl pointer-events-auto">
       
              <ProgressionBar
                xp={xpTotal}
                maxXp={maxXp}
                streak={streak}
                gradeLevel={currentGradeLevel}
                nextUnlockAt={getNextUnlockStreak()}
                onPlannerClick={() => setIsPlannerOpen(true)}
              />
           </div>
        </div>
        {/* C. THE PAPER & FOLDERS (Gameplay) */}
                {/* 'mt-4' gives just a little breathing room below the ruler */}
  <div className="relative z-10 w-full max-w-7xl mx-auto pt-40 px-2 pb-32">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentGradeLevel}-${dayCount}`} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ClassroomLogic
                          currentGradeLevel={currentGradeLevel}
                          onXPGained={handleXPGained}
                          onStreakUpdate={(val) => updateProfile({ streak: val })} 
                          onCorrectAnswer={handleCorrectAnswer}
                          onWrongAnswer={handleWrongAnswer}
                          streak={streak}
                          activeModifier={activeModifier}
                          hintActive={hintActive}
                          onPolaroidCreated={handlePolaroidCreated}
                          onGameNextDay={handleManualNextDay}
                          playerPhilosophy={playerProfile.philosophy}
                          playerSupplies={playerProfile.supplies}
                          onShiftComplete={handleShiftComplete}
                          onApplyBoon={handleApplyBoon}
                          dayCount={dayCount}
                        />
                      </motion.div>
                    </AnimatePresence>
                </div>

        <AnimatePresence>
          {isPlannerOpen && (
            <div className="performance-tab">
              <TeacherPlanner
                isOpen={isPlannerOpen}
                onClose={() => setIsPlannerOpen(false)}
                gameData={{
                  currentLevel: currentGradeLevel,
                  totalXP: xpTotal,
                  currentStreak: streak,
                  dailyMemo: dailyMemo,
                  activeModifier: activeModifier,
                  unlockedSupplies: unlockedSupplies,
                  careerGPA: careerGPA,
                  performanceHistory: performanceHistory,
                  unlockedPerks: unlockedPerks,
                  currentRank: currentRank,
                  playerProfile: playerProfile,
                  weeklySchedule: weeklySchedule,
                  dayOfWeek: dayOfWeek,
                  weekNumber: weekNumber,
                  shiftHistory: shiftHistory // Pass the hook object
                }}
                onReadMemo={handleReadMemo}
                onRequisition={handleRequisition}
              />
            </div>
          )}
        </AnimatePresence>

        <InboxTray 
          requests={requests} 
          onApprove={handleRequestApproveWrapper} 
          onDeny={handleDeny} 
          onTopple={handleTopple} 
        />

     {/* --- ACHIEVEMENT GALLERY MODAL --- */}
<AnimatePresence>
  {showAchievementGallery && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setShowAchievementGallery(false)} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#FDFBF7] w-full max-w-5xl h-[85vh] overflow-y-auto rounded-lg shadow-2xl p-8 border-4 border-stone-800"
      >
        {/* Close Button */}
        <button 
          onClick={() => setShowAchievementGallery(false)}
          className="absolute top-6 right-6 p-2 hover:bg-stone-200 rounded-full z-50 transition-colors"
        >
          <X className="w-8 h-8 text-stone-800" />
        </button>

        <h2 className="font-mono-typewriter text-4xl font-bold text-stone-800 mb-2 uppercase tracking-widest border-b-4 border-stone-800 pb-6">
          Hall of Records
        </h2>
        
        {/* DYNAMIC GRID START */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ACHIEVEMENTS.map((ach) => {
              // Check if unlocked (Safeguard: check if array exists)
              const isUnlocked = playerProfile.unlockedAchievements?.includes(ach.id);
              
              return (
                <div 
                  key={ach.id} 
                  className={`p-6 border-2 rounded-lg relative overflow-hidden transition-all ${
                    isUnlocked 
                      ? 'bg-white border-stone-800 shadow-md opacity-100' 
                      : 'bg-stone-200 border-stone-300 opacity-60 grayscale'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                     {/* Icon Badge */}
                     <div className={`p-3 rounded-full flex items-center justify-center w-12 h-12 ${
                       isUnlocked ? 'bg-amber-100 text-amber-600' : 'bg-stone-300 text-stone-500'
                     }`}>
                       {/* Using a generic Award icon for stability */}
                       <Award size={24} />
                     </div>
                     
                     {/* Unlocked Badge */}
                     {isUnlocked && (
                       <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-1 rounded uppercase tracking-wider border border-green-200">
                         Unlocked
                       </span>
                     )}
                  </div>
                  
                  <h3 className="font-bold text-lg font-mono-typewriter leading-tight mb-2 text-stone-900">
                    {ach.name}
                  </h3>
                  
                  {/* Description Logic: Hide if it's a "Hidden" achievement and not yet unlocked */}
                  <p className="text-sm text-stone-600 font-serif leading-relaxed">
                    {ach.hidden && !isUnlocked ? "???" : ach.description}
                  </p>

                  {/* XP Reward Tag */}
                  <div className="absolute bottom-3 right-3 text-xs font-mono font-bold text-stone-400">
                    +{ach.xpReward} XP
                  </div>
                </div>
              );
           })}
        </div>
        {/* DYNAMIC GRID END */}

      </motion.div>
    </div>
  )}
</AnimatePresence>

        <Toaster />
      </div>
    </>
  );
}

export default GameUI;
