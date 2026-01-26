import React, { useState, useEffect } from 'react';
import GameUI from '@/components/GameUI';
import TitleScreen from '@/components/TitleScreen';

const DEFAULT_PROFILE = {
  name: "Teacher",
  philosophy: "Pragmatist", 
  currentRank: 0,
  xpTotal: 0,
  streak: 0,
  supplies: []
};

function App() {
  const [hasClockedIn, setHasClockedIn] = useState(() => {
    return localStorage.getItem('hasClockedIn') === 'true';
  });

  const [playerProfile, setPlayerProfile] = useState(() => {
    const saved = localStorage.getItem('playerProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const handleClockIn = (newProfile) => {
    const profile = newProfile || DEFAULT_PROFILE;
    setPlayerProfile(profile);
    setHasClockedIn(true);
    
    localStorage.setItem('playerProfile', JSON.stringify(profile));
    localStorage.setItem('hasClockedIn', 'true');
  };

  const handleClockOut = () => {
    // Reset local state
    setHasClockedIn(false);
    setPlayerProfile(DEFAULT_PROFILE);
    
    // Note: Local storage clearing is handled by the SettingsPanel before calling this
    // but we can ensure key state items are gone here too for safety
    localStorage.removeItem('hasClockedIn');
    localStorage.removeItem('playerProfile');
  };

  const updateProfile = (updates) => {
    setPlayerProfile(prev => {
      const newState = { ...prev, ...updates };
      localStorage.setItem('playerProfile', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <>
      {hasClockedIn ? (
        <GameUI 
          playerProfile={playerProfile} 
          updateProfile={updateProfile} 
          onClockOut={handleClockOut}
        />
      ) : (
        <TitleScreen onClockIn={handleClockIn} />
      )}
    </>
  );
}

export default App;