import React, { useState, useEffect } from 'react';
import { PHILOSOPHY_CONFIG } from '@/lib/GameLogic';
import { SaveManager } from '@/lib/SaveSystem';
import SettingsModal from '@/components/SettingsModal';
import { Settings as SettingsIcon } from 'lucide-react';
import './TitleScreen.css';

function TitleScreen({ onClockIn }) {
  const [selectedPhilosophy, setSelectedPhilosophy] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(SaveManager.loadSettings());
  const [hasSave, setHasSave] = useState(false);

  // Check for save on mount to avoid hydration mismatches
  useEffect(() => {
    setHasSave(SaveManager.hasSave());
  }, []);

  const handleSelect = (id) => {
    if (isTransitioning) return;
    // Toggle: if clicking selected, unselect it
    if (selectedPhilosophy === id) {
        setSelectedPhilosophy(null);
    } else {
        setSelectedPhilosophy(id);
    }
  };

  const handleStartGame = () => {
    if (!selectedPhilosophy || !playerName.trim()) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      onClockIn({
        name: playerName.trim(),
        philosophy: selectedPhilosophy,
        currentRank: 0,
        xpTotal: 0,
        streak: 0,
        supplies: []
      });
    }, 1500); 
  };
  
  const handleLoadGame = () => {
    const saved = SaveManager.loadGame();
    if (saved) {
      setIsTransitioning(true);
      setTimeout(() => {
        onClockIn(saved.playerProfile);
      }, 1500);
    }
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    setHasSave(!!SaveManager.loadGame('auto'));
  };

  const cards = [
    PHILOSOPHY_CONFIG['Traditionalist'],
    PHILOSOPHY_CONFIG['Progressive'],
    PHILOSOPHY_CONFIG['Pragmatist']
  ];

  if (isTransitioning) {
    return (
      <div className="desk-transition-view">
        <div className="desk-surface">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <div className="desk-message">REPORTING FOR DUTY...</div>
        </div>
      </div>
    );
  }




  return (
    <div className="title-screen-container">
      {/* Settings Button */}
      <button 
        className="absolute top-6 right-6 text-stone-500 hover:text-white transition-colors z-50 p-2"
        onClick={() => setShowSettings(true)}
        aria-label="Settings"
      >
        <SettingsIcon size={24} />
      </button>

      <div className="title-header">
        <h1 className="main-title">MOOD: MANDATE</h1>
        <p className="sub-title">Establish Your Teaching Persona</p>
      </div>

      <div className="philosophy-selection">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className={`personnel-file ${selectedPhilosophy === card.id ? 'selected' : ''}`}
            onClick={() => handleSelect(card.id)}
          >
            <div className="file-tab"></div>
            <div className="file-content">
              <h3>{card.name}</h3>
              <p>{card.description}</p>
              <div className="keywords-list">
                {card.keywords.slice(0, 3).map(kw => (
                  <span key={kw} className="keyword-tag">{kw}</span>
                ))}
              </div>
            </div>
            {selectedPhilosophy === card.id && (
              <div className="stamp-overlay">SELECTED</div>
            )}
          </div>
        ))}
      </div>

      <div className={`input-section ${selectedPhilosophy ? 'visible' : ''}`}>
        <div className="name-input-container">
          <label htmlFor="teacherName">ENTER CALLSIGN</label>
          <input 
            type="text" 
            id="teacherName"
            className="name-input"
            placeholder="e.g. PROF. CHAOS"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
            autoComplete="off"
            autoFocus
          />
        </div>

        {playerName.trim().length > 0 && (
          <button className="clock-in-btn" onClick={handleStartGame}>
            CLOCK IN
          </button>
        )}
      </div>
      
      {/* Load Game Button - Only shows if NOT starting a new game */}
      {hasSave && !selectedPhilosophy && (
         <div className="load-game-section">
           <p className="font-mono-typewriter text-xs text-stone-500 mb-3 tracking-widest">PREVIOUS RECORD FOUND</p>
           <button className="load-btn" onClick={handleLoadGame}>
             RESUME SHIFT
           </button>
         </div>
      )}

      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentSettings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

export default TitleScreen;