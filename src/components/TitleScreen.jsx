
import React, { useState } from 'react';
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

  const handleSelect = (id) => {
    if (isTransitioning) return;
    setSelectedPhilosophy(id);
  };

  const handleStartGame = () => {
    if (!selectedPhilosophy || !playerName.trim()) return;
    
    setIsTransitioning(true);
    
    // Simulate transition delay
    setTimeout(() => {
      onClockIn({
        name: playerName.trim(),
        philosophy: selectedPhilosophy,
        currentRank: 0,
        xpTotal: 0,
        streak: 0,
        supplies: []
      });
    }, 1500); // 1.5s transition
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
    SaveManager.saveSettings(newSettings);
  };

  const cards = [
    PHILOSOPHY_CONFIG['Traditionalist'],
    PHILOSOPHY_CONFIG['Progressive'],
    PHILOSOPHY_CONFIG['Pragmatist']
  ];

  const hasSave = SaveManager.hasSave();

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
      <div className="title-header">
        <h1 className="main-title">MOOD: MANDATE</h1>
        <p className="sub-title">Establish Your Teaching Persona</p>
        
        <button 
          className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
          onClick={() => setShowSettings(true)}
        >
          <SettingsIcon size={24} />
        </button>
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
          <label htmlFor="teacherName">Enter Callsign / Name</label>
          <input 
            type="text" 
            id="teacherName"
            className="name-input"
            placeholder="e.g. Mr. Smith"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
            autoComplete="off"
          />
        </div>

        {playerName.trim().length > 0 && (
          <button className="clock-in-btn" onClick={handleStartGame}>
            Clock In
          </button>
        )}
      </div>
      
      {hasSave && !selectedPhilosophy && (
         <div className="load-game-section">
           <p className="text-stone-400 text-sm mb-2">Previous Record Found</p>
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
