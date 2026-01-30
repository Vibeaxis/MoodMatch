import React, { useState, useEffect } from 'react';
import GameUI from '@/components/GameUI';
import TitleScreen from '@/components/TitleScreen';
import ErrorBoundary from '@/components/ErrorBoundary'; // <--- 1. IMPORT IT

const DEFAULT_PROFILE = {
  name: 'Teacher',
  xpTotal: 0,
  currentRank: 0,
  streak: 0,
  gpa: 4.0,
  unlockedPerks: [],
  supplies: [],
  philosophy: 'Pragmatist'
};

function App() {
  const [hasClockedIn, setHasClockedIn] = useState(() => {
    // FIX: Add try/catch for localStorage on mobile private mode
    try {
      return localStorage.getItem('hasClockedIn') === 'true';
    } catch (e) {
      return false;
    }
  });

 const [playerProfile, setPlayerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('playerProfile');
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  });

  const handleClockIn = (newProfile) => {
    const profile = newProfile || DEFAULT_PROFILE;
    setPlayerProfile(profile);
    setHasClockedIn(true);
    
    try {
      localStorage.setItem('playerProfile', JSON.stringify(profile));
      localStorage.setItem('hasClockedIn', 'true');
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  const handleClockOut = () => {
    setHasClockedIn(false);
    setPlayerProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('hasClockedIn');
      localStorage.removeItem('playerProfile');
    } catch (e) {}
  };

  const updateProfile = (updates) => {
    setPlayerProfile(prev => {
      const newState = { ...prev, ...updates };
      try {
        localStorage.setItem('playerProfile', JSON.stringify(newState));
      } catch (e) {}
      return newState;
    });
  };

  // 2. WRAP THE RETURN WITH ERROR BOUNDARY
  return (
    <ErrorBoundary>
      {hasClockedIn ? (
        <GameUI 
          playerProfile={playerProfile} 
          updateProfile={updateProfile} 
          onClockOut={handleClockOut}
        />
      ) : (
        <TitleScreen onClockIn={handleClockIn} />
      )}
    </ErrorBoundary>
  );
}
useEffect(() => {
   LootLocker.login();
}, []);
export default App;