
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'teacher_shift_history';

// Helper to calculate GPA from letter grade
const getGPA = (rank) => {
  const map = { 'S': 4.0, 'A': 3.5, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
  return map[rank] || 0.0;
};

// Helper to convert letter rank to numeric value for averaging
const getRankValue = (rank) => {
  const map = { 'S': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
  return map[rank] !== undefined ? map[rank] : 0;
};

export const useShiftHistory = () => {
  const [history, setHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse shift history', e);
        setHistory([]);
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const saveShift = useCallback((shiftData) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      dayNumber: shiftData.dayNumber || 1,
      gradeLevel: shiftData.gradeLevel || 'Kindergarten',
      finalRank: shiftData.finalRank || 'C',
      finalGPA: shiftData.finalGPA || getGPA(shiftData.finalRank || 'C'),
      xpEarned: shiftData.xpEarned || 0,
      crisisEncountered: shiftData.crisisEncountered || null, // Name of crisis or null
      requestsApproved: shiftData.requestsApproved || 0,
      requestsDenied: shiftData.requestsDenied || 0,
      cardsPlayed: shiftData.cardsPlayed || 0,
      comboStreak: shiftData.comboStreak || 0,
      moraleFinal: shiftData.moraleFinal || 100,
      notes: shiftData.notes || 'No notes recorded.',
      philosophy: shiftData.philosophy || 'Pragmatist'
    };

    setHistory(prev => [newEntry, ...prev]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getHistory = useCallback(() => {
    // Already sorted by newest first due to unshift in saveShift
    return history;
  }, [history]);

  const getStatistics = useCallback(() => {
    if (history.length === 0) {
      return {
        totalShifts: 0,
        averageRank: 0,
        averageGPA: 0,
        totalXP: 0,
        sRankCount: 0,
        fRankCount: 0,
        crisisCount: 0
      };
    }

    let totalRankVal = 0;
    let totalGPA = 0;
    let totalXP = 0;
    let sRankCount = 0;
    let fRankCount = 0;
    let crisisCount = 0;

    history.forEach(shift => {
      totalRankVal += getRankValue(shift.finalRank);
      totalGPA += shift.finalGPA;
      totalXP += shift.xpEarned;
      if (shift.finalRank === 'S') sRankCount++;
      if (shift.finalRank === 'F') fRankCount++;
      if (shift.crisisEncountered) crisisCount++;
    });

    return {
      totalShifts: history.length,
      averageRank: (totalRankVal / history.length).toFixed(1),
      averageGPA: (totalGPA / history.length).toFixed(2),
      totalXP,
      sRankCount,
      fRankCount,
      crisisCount
    };
  }, [history]);

  return {
    history,
    saveShift,
    clearHistory,
    getHistory,
    getStatistics
  };
};
