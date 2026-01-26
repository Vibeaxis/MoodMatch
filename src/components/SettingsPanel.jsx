import React, { useState, useEffect } from 'react';
import { X, Trash2, Volume2, Music, Monitor, Type, Info, Users, Sun } from 'lucide-react';
import './SettingsPanel.css';

function SettingsPanel({ isOpen, onClose, onClockOut }) {
  const [activeTab, setActiveTab] = useState('SYSTEM'); // 'SYSTEM' | 'MANIFEST'

  // --- AUDIO STATE ---
  const [sfxVolume, setSfxVolume] = useState(() =>
    parseInt(localStorage.getItem('sfxVolume') || '50', 10)
  );
  const [musicVolume, setMusicVolume] = useState(() =>
    parseInt(localStorage.getItem('musicVolume') || '30', 10)
  );

  // --- DISPLAY STATE ---
  const [brightness, setBrightness] = useState(() =>
    parseInt(localStorage.getItem('appBrightness') || '100', 10)
  );
  const [uiScale, setUiScale] = useState(() =>
    parseInt(localStorage.getItem('appUiScale') || '100', 10)
  );

  const [showWipeConfirm, setShowWipeConfirm] = useState(false);

  // --- AUDIO EFFECTS ---
  useEffect(() => {
    localStorage.setItem('sfxVolume', sfxVolume);
    // AudioEngine.setGlobalSFX(sfxVolume / 100); // Hook up to your engine here
  }, [sfxVolume]);

  useEffect(() => {
    localStorage.setItem('musicVolume', musicVolume);
    // AudioEngine.setGlobalMusic(musicVolume / 100); // Hook up to your engine here
  }, [musicVolume]);

  // --- DISPLAY EFFECTS (THE "RETAIL" FEEL) ---
  useEffect(() => {
    localStorage.setItem('appBrightness', brightness);
    // Apply brightness filter to the body for "Gamma Correction"
    document.body.style.filter = `brightness(${brightness}%)`;
  }, [brightness]);

  useEffect(() => {
    localStorage.setItem('appUiScale', uiScale);
    // Scale root font-size to zoom UI (assuming rem-based layout)
    // Default is usually 16px (100%). Range: 80% (12.8px) to 120% (19.2px)
    document.documentElement.style.fontSize = `${uiScale}%`;
  }, [uiScale]);


  const handleWipeData = () => {
    // Clear persistent game data
    const keysToWipe = [
      'playerProfile', 'hasClockedIn', 'leaderboard_pending_scores',
      'leaderboard_cache', 'teacherPerformanceHistory',
      'tenureProtectionUsed', 'teacherUnlockedSupplies'
    ];
    keysToWipe.forEach(k => localStorage.removeItem(k));

    // Reset Settings? Optional. Let's keep them for convenience.

    onClockOut();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>

        {/* HEADER & TABS */}
        <div className="settings-header-wrapper">
          <div className="settings-header">
            <h2>CONFIG TERMINAL</h2>
            <button className="close-btn" onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="settings-tabs">
            <button
              className={`tab-btn ${activeTab === 'SYSTEM' ? 'active' : ''}`}
              onClick={() => setActiveTab('SYSTEM')}
            >
              <Monitor className="w-4 h-4" /> SYSTEM
            </button>
            <button
              className={`tab-btn ${activeTab === 'MANIFEST' ? 'active' : ''}`}
              onClick={() => setActiveTab('MANIFEST')}
            >
              <Info className="w-4 h-4" /> MANIFEST
            </button>
          </div>
        </div>

        <div className="settings-content-scroll">

          {/* --- SYSTEM TAB --- */}
          {activeTab === 'SYSTEM' && (
            <div className="settings-section">

              {/* DISPLAY GROUP */}
              <div className="control-group">
                <h3 className="group-label">DISPLAY</h3>

                <div className="slider-container">
                  <label>
                    <span className="flex items-center gap-2"><Sun className="w-4 h-4" /> Gamma</span>
                    <span>{brightness}%</span>
                  </label>
                  <input
                    type="range" min="50" max="150" value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="volume-slider"
                  />
                  <span className="slider-hint">Adjust screen brightness</span>
                </div>

                <div className="slider-container">
                  <label>
                    <span className="flex items-center gap-2"><Type className="w-4 h-4" /> UI Scale</span>
                    <span>{uiScale}%</span>
                  </label>
                  <input
                    type="range" min="85" max="115" value={uiScale}
                    onChange={(e) => setUiScale(Number(e.target.value))}
                    className="volume-slider"
                  />
                  <span className="slider-hint">Scale interface text size</span>
                </div>
              </div>

              {/* AUDIO GROUP */}
              <div className="control-group">
                <h3 className="group-label">AUDIO</h3>

                <div className="slider-container">
                  <label>
                    <span className="flex items-center gap-2"><Volume2 className="w-4 h-4" /> SFX</span>
                    <span>{sfxVolume}%</span>
                  </label>
                  <input
                    type="range" min="0" max="100" value={sfxVolume}
                    onChange={(e) => setSfxVolume(Number(e.target.value))}
                    className="volume-slider"
                  />
                </div>

                <div className="slider-container">
                  <label>
                    <span className="flex items-center gap-2"><Music className="w-4 h-4" /> Music</span>
                    <span>{musicVolume}%</span>
                  </label>
                  <input
                    type="range" min="0" max="100" value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                    className="volume-slider"
                  />
                </div>
              </div>

              {/* DANGER ZONE */}
              <div className="danger-zone">
                {!showWipeConfirm ? (
                  <button className="wipe-btn" onClick={() => setShowWipeConfirm(true)}>
                    <Trash2 className="w-4 h-4" />
                    FORMAT SAVE DATA
                  </button>
                ) : (
                  <div className="confirmation-dialog">
                    <p>WARNING: This action is irreversible. All tenure progress will be lost.</p>
                    <div className="confirm-actions">
                      <button className="confirm-btn yes" onClick={handleWipeData}>CONFIRM WIPE</button>
                      <button className="confirm-btn no" onClick={() => setShowWipeConfirm(false)}>CANCEL</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- MANIFEST (CREDITS) TAB --- */}
          {activeTab === 'MANIFEST' && (
            <div className="credits-section">
              <div className="credits-header">
                <h3>SHIFT: CLASSROOM</h3>
                <p>v1.0.4 (Build: Retail_Candidate)</p>
              </div>

              <div className="credits-list">
                <div className="credit-item">
                  <span className="role">Lead Developer</span>
                  <span className="name">VibeAxis</span>
                </div>
                <div className="credit-item">
                  <span className="role">Systems Architect</span>
                  <span className="name">Horizons Core</span>
                </div>
                <div className="credit-item">
                  <span className="role">Narrative Design</span>
                  <span className="name">District Board of Ed.</span>
                </div>
                <div className="credit-item">
                  <span className="role">Special Thanks</span>
                  <span className="name">Hostinger Cloud</span>
                </div>
              </div>

              <div className="credits-footer">
                <p>© 2026 District Education Board.</p>
                <p>Unauthorized breaks will be deducted from pay.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;