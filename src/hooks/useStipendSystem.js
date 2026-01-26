
import { useState, useEffect } from 'react';
import { getContractById } from '@/lib/StipendData';

export const useStipendSystem = () => {
  const [activeContract, setActiveContract] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [completedContracts, setCompletedContracts] = useState([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const storedState = localStorage.getItem('teacherStipendSystem');
    if (storedState) {
      const parsed = JSON.parse(storedState);
      setActiveContract(parsed.activeContract);
      setProgress(parsed.progress || 0);
      setIsComplete(parsed.isComplete || false);
      setCompletedContracts(parsed.completedContracts || []);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      activeContract,
      progress,
      isComplete,
      completedContracts
    };
    localStorage.setItem('teacherStipendSystem', JSON.stringify(stateToSave));
  }, [activeContract, progress, isComplete, completedContracts]);

  const signContract = (contractId) => {
    const contract = getContractById(contractId);
    if (!contract) return;

    setActiveContract(contract);
    setProgress(0);
    setIsComplete(false);
  };

  const updateProgress = (actionType, payload = {}) => {
    if (!activeContract || isComplete) return;

    let newProgress = progress;
    let shouldUpdate = false;

    switch (activeContract.objectiveType) {
      case 'PLAY_CARD':
        if (actionType === 'CARD_PLAYED') {
          if (activeContract.target === 'ANY' || activeContract.target === payload.cardType) {
            newProgress += 1;
            shouldUpdate = true;
          }
        }
        break;

      case 'APPROVE_REQUESTS':
        if (actionType === 'REQUEST_APPROVED') {
          newProgress += 1;
          shouldUpdate = true;
        }
        break;

      case 'ACHIEVE_RANK':
        if (actionType === 'PUZZLE_COMPLETE' || actionType === 'SHIFT_COMPLETE') {
          // Check if rank meets criteria. Simple check: Target S means 'S' rank only.
          // Target 'B' means A, B, or S usually, but for simplicity let's stick to exact or mapped
          const rankValue = { 'S': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
          const achieved = rankValue[payload.rank] || 0;
          const target = rankValue[activeContract.target] || 0;
          
          if (achieved >= target) {
             newProgress += 1;
             shouldUpdate = true;
          }
        }
        break;

      case 'MAINTAIN_STREAK':
        // Payload should contain current streak
        if (actionType === 'STREAK_UPDATE') {
           if (payload.streak >= activeContract.target) {
             newProgress = activeContract.target; // Max out
             shouldUpdate = true;
           } else {
             // For "Reach X streak", we just track max. 
             // If the contract is "Maintain X", it might be different, but let's assume "Reach" for now based on typical game logic
             if (payload.streak > newProgress) {
               newProgress = payload.streak;
               shouldUpdate = true;
             }
           }
        }
        break;
      
      case 'COMPLETE_DURING_CRISIS':
        if (payload.duringCrisis) {
           // If the action itself counts (like playing a card during crisis)
           // or if this is a shift complete during crisis
           if (actionType === 'PUZZLE_COMPLETE' || actionType === 'SHIFT_COMPLETE') {
             newProgress += 1;
             shouldUpdate = true;
           }
        }
        break;

      case 'ACCUMULATE_SUPPLIES':
        if (actionType === 'SUPPLY_GAINED') {
           newProgress += 1;
           shouldUpdate = true;
        }
        break;

      case 'SHIFT_COMPLETE':
        if (actionType === 'SHIFT_COMPLETE') {
          newProgress += 1;
          shouldUpdate = true;
        }
        break;
        
      case 'MAINTAIN_STAT':
        if (actionType === 'SHIFT_COMPLETE') {
           // Example: Maintain Morale. If payload.morale < threshold, reset. Else increment.
           if (payload.stat === activeContract.target) {
              // Assume payload.value is the stat value. Assume threshold is generic high (e.g. > 50)
              if (payload.value && payload.value < 50) {
                newProgress = 0; // Reset on failure
                shouldUpdate = true;
              } else {
                newProgress += 1;
                shouldUpdate = true;
              }
           }
        }
        break;

      default:
        break;
    }

    if (shouldUpdate) {
      if (newProgress >= activeContract.count) {
        newProgress = activeContract.count;
        setIsComplete(true);
      }
      setProgress(newProgress);
    }
  };

  const claimReward = () => {
    if (!isComplete || !activeContract) return 0;

    const reward = activeContract.rewardXP;
    setCompletedContracts(prev => [...prev, activeContract.id]);
    setActiveContract(null);
    setProgress(0);
    setIsComplete(false);
    
    return reward;
  };

  const abandonContract = () => {
    setActiveContract(null);
    setProgress(0);
    setIsComplete(false);
  };

  return {
    activeContract,
    progress,
    isComplete,
    completedContracts,
    signContract,
    updateProgress,
    claimReward,
    abandonContract
  };
};
