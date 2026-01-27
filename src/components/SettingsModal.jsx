import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Download, Trash2, Volume2, Monitor, Info, CheckCircle, AlertTriangle, Sun, Type, HardDrive, Layout } from 'lucide-react';
import { SaveManager } from '@/lib/SaveSystem';
import { useToast } from '@/components/ui/use-toast';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, gameState, onSettingsChange, onLoadGame }) => {
  const [activeTab, setActiveTab] = useState('GAMEPLAY');
  const [saveSlots, setSaveSlots] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null); // { type: 'overwrite'|'delete', slotId: 1 }
  const [importString, setImportString] = useState('');
  
  const { toast } = useToast();

  // --- LOCAL STATE FOR SETTINGS ---
  // We initialize these from localStorage to ensure they persist across reloads
  const [settings, setSettings] = useState(() => ({
    autoSaveEnabled: localStorage.getItem('cmm_autosave') !== 'false',
    animationsEnabled: localStorage.getItem('cmm_animations') !== 'false',
    difficulty: localStorage.getItem('cmm_difficulty') || 'NORMAL',
    sfxVolume: parseInt(localStorage.getItem('cmm_sfx') || '50'),
    musicVolume: parseInt(localStorage.getItem('cmm_music') || '30'),
    brightness: parseInt(localStorage.getItem('cmm_brightness') || '100'),
    uiScale: parseInt(localStorage.getItem('cmm_ui_scale') || '100'),
  }));

  // --- INITIALIZATION ---
  useEffect(() => {
    if (isOpen) {
      refreshSlots();
    }
  }, [isOpen]);

  // --- EFFECT: APPLY DISPLAY SETTINGS ---
  useEffect(() => {
    // Apply Gamma
    document.body.style.filter = `brightness(${settings.brightness}%)`;
    // Apply UI Scale (assuming root font-size usage)
    document.documentElement.style.fontSize = `${settings.uiScale}%`;
    
    // Persist all settings
    localStorage.setItem('cmm_autosave', settings.autoSaveEnabled);
    localStorage.setItem('cmm_animations', settings.animationsEnabled);
    localStorage.setItem('cmm_difficulty', settings.difficulty);
    localStorage.setItem('cmm_sfx', settings.sfxVolume);
    localStorage.setItem('cmm_music', settings.musicVolume);
    localStorage.setItem('cmm_brightness', settings.brightness);
    localStorage.setItem('cmm_ui_scale', settings.uiScale);

    // Notify parent if needed
    if (onSettingsChange) onSettingsChange(settings);
  }, [settings]);

  // --- SAVE MANAGEMENT ---
  const refreshSlots = () => {
    const slots = SaveManager.getAllSaves();
    setSaveSlots(slots);
  };

  const handleSaveToSlot = (slotId) => {
    if (!gameState) return;
    const success = SaveManager.saveGame(gameState, slotId);
    if (success) {
      toast({ title: "Game Saved", description: `Progress written to ${slotId === 'auto' ? 'Auto Save' : 'Slot ' + slotId}.` });
      refreshSlots();
      setConfirmAction(null);
    }
  };

  const handleLoadFromSlot = (slotId) => {
    if (onLoadGame) {
      onLoadGame(slotId);
      onClose();
    }
  };

  const handleDeleteSlot = (slotId) => {
    SaveManager.deleteSlot(slotId);
    toast({ title: "Slot Cleared", description: "Data removed permanently." });
    refreshSlots();
    setConfirmAction(null);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // --- EXPORT/IMPORT ---
  const handleExport = () => {
    const data = SaveManager.exportSave('auto'); // Default to exporting auto save
    if (data) {
      navigator.clipboard.writeText(data);
      toast({ title: "Copied to Clipboard", description: "Save string is ready to share." });
    }
  };

  const handleImport = () => {
    if (window.confirm("This will overwrite your AUTO SAVE. Continue?")) {
      const success = SaveManager.importSave(importString, 'auto');
      if (success) {
        window.location.reload();
      } else {
        toast({ title: "Import Failed", variant: "destructive" });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        
        {/* HEADER */}
        <div className="settings-header">
          <div className="header-title">
            <h2>SYSTEM CONFIG</h2>
            <span className="build-tag">RETAIL_BETA_v1.0</span>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="settings-body">
          {/* SIDEBAR TABS */}
          <div className="settings-sidebar">
            <button className={`tab-btn ${activeTab === 'GAMEPLAY' ? 'active' : ''}`} onClick={() => setActiveTab('GAMEPLAY')}>
              <Layout size={18} /> GAMEPLAY
            </button>
            <button className={`tab-btn ${activeTab === 'DISPLAY' ? 'active' : ''}`} onClick={() => setActiveTab('DISPLAY')}>
              <Monitor size={18} /> DISPLAY
            </button>
            <button className={`tab-btn ${activeTab === 'AUDIO' ? 'active' : ''}`} onClick={() => setActiveTab('AUDIO')}>
              <Volume2 size={18} /> AUDIO
            </button>
            <button className={`tab-btn ${activeTab === 'DATA' ? 'active' : ''}`} onClick={() => setActiveTab('DATA')}>
              <HardDrive size={18} /> SAVE DATA
            </button>
            <button className={`tab-btn ${activeTab === 'ABOUT' ? 'active' : ''}`} onClick={() => setActiveTab('ABOUT')}>
              <Info size={18} /> ABOUT
            </button>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="settings-content">
            
            {/* --- GAMEPLAY --- */}
            {activeTab === 'GAMEPLAY' && (
              <div className="settings-panel">
                <h3>Preferences</h3>
                
                <div className="setting-row">
                  <div className="label">
                    <span>Auto-Save</span>
                    <small>Save progress every 2 seconds</small>
                  </div>
                  <div className={`toggle ${settings.autoSaveEnabled ? 'on' : 'off'}`} 
                       onClick={() => updateSetting('autoSaveEnabled', !settings.autoSaveEnabled)}>
                    <div className="thumb" />
                  </div>
                </div>

                <div className="setting-row">
                  <div className="label">
                    <span>Animations</span>
                    <small>Disable for performance</small>
                  </div>
                  <div className={`toggle ${settings.animationsEnabled ? 'on' : 'off'}`} 
                       onClick={() => updateSetting('animationsEnabled', !settings.animationsEnabled)}>
                    <div className="thumb" />
                  </div>
                </div>

                <div className="setting-group">
                  <label>Difficulty</label>
                  <div className="segment-control">
                    {['EASY', 'NORMAL', 'HARD'].map(d => (
                      <button 
                        key={d} 
                        className={settings.difficulty === d ? 'active' : ''}
                        onClick={() => updateSetting('difficulty', d)}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- DISPLAY (The Missing Features!) --- */}
            {activeTab === 'DISPLAY' && (
              <div className="settings-panel">
                <h3>Visual Settings</h3>

                <div className="setting-slider-group">
                  <div className="label-row">
                    <span className="flex items-center gap-2"><Sun size={16}/> Gamma (Brightness)</span>
                    <span className="value">{settings.brightness}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="150" 
                    value={settings.brightness} 
                    onChange={(e) => updateSetting('brightness', Number(e.target.value))} 
                  />
                  <div className="slider-track-visual"></div>
                </div>

                <div className="setting-slider-group">
                  <div className="label-row">
                    <span className="flex items-center gap-2"><Type size={16}/> UI Scale</span>
                    <span className="value">{settings.uiScale}%</span>
                  </div>
                  <input 
                    type="range" min="80" max="120" 
                    value={settings.uiScale} 
                    onChange={(e) => updateSetting('uiScale', Number(e.target.value))} 
                  />
                </div>
              </div>
            )}

            {/* --- AUDIO --- */}
            {activeTab === 'AUDIO' && (
              <div className="settings-panel">
                <h3>Volume Mixing</h3>
                
                <div className="setting-slider-group">
                  <div className="label-row">
                    <span>Sound Effects</span>
                    <span className="value">{settings.sfxVolume}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={settings.sfxVolume} 
                    onChange={(e) => updateSetting('sfxVolume', Number(e.target.value))} 
                  />
                </div>

                <div className="setting-slider-group">
                  <div className="label-row">
                    <span>Music</span>
                    <span className="value">{settings.musicVolume}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={settings.musicVolume} 
                    onChange={(e) => updateSetting('musicVolume', Number(e.target.value))} 
                  />
                </div>
              </div>
            )}

            {/* --- DATA (SAVE SLOTS) --- */}
            {activeTab === 'DATA' && (
              <div className="settings-panel">
                <h3>Save Management</h3>
                <div className="slots-grid">
                  {saveSlots.map(slot => (
                    <div key={slot.id} className={`save-slot ${slot.id === 'auto' ? 'auto-slot' : ''}`}>
                      <div className="slot-header">
                        <span className="slot-title">{slot.label}</span>
                        {!slot.isEmpty && <span className="slot-timestamp">{new Date(slot.timestamp).toLocaleDateString()}</span>}
                      </div>
                      
                      {slot.isEmpty ? (
                        <div className="empty-state">
                          <span>Empty Slot</span>
                          <button className="save-btn" onClick={() => handleSaveToSlot(slot.id)}>Save Current</button>
                        </div>
                      ) : (
                        <div className="slot-details">
                          <p>Day {slot.day} • {slot.name}</p>
                          
                          {confirmAction?.slotId === slot.id ? (
                             <div className="confirm-overlay">
                               <p>Are you sure?</p>
                               <div className="confirm-row">
                                 <button className="danger" onClick={() => confirmAction.type === 'delete' ? handleDeleteSlot(slot.id) : handleSaveToSlot(slot.id)}>Yes</button>
                                 <button onClick={() => setConfirmAction(null)}>No</button>
                               </div>
                             </div>
                          ) : (
                            <div className="slot-actions">
                              <button className="load-btn" onClick={() => handleLoadFromSlot(slot.id)}>Load</button>
                              <button className="overwrite-btn" onClick={() => setConfirmAction({type:'overwrite', slotId: slot.id})}>Save</button>
                              {slot.id !== 'auto' && (
                                <button className="delete-btn" onClick={() => setConfirmAction({type:'delete', slotId: slot.id})}><Trash2 size={14}/></button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="import-export-area">
                  <button className="utility-btn" onClick={handleExport}><Upload size={14}/> Export to Clipboard</button>
                  <div className="import-row">
                    <input 
                      type="text" 
                      placeholder="Paste save string..." 
                      value={importString}
                      onChange={(e) => setImportString(e.target.value)}
                    />
                    <button className="utility-btn" onClick={handleImport}><Download size={14}/> Import</button>
                  </div>
                </div>
              </div>
            )}

        {/* --- ABOUT --- */}
            {activeTab === 'ABOUT' && (
              <div className="settings-panel about-panel">
                <div className="about-logo">
                  <div className="logo-icon"><Monitor size={32}/></div>
                  {/* CHANGED TITLE HERE 👇 */}
                  <h1>Mood: Mandate</h1>
                </div>
                <p>Version 1.0.4 (Retail Beta)</p>
                <div className="credits-scroll">
                  <h4>Development Team</h4>
                  <p>VibeAxis • Core Systems</p>
                  
                  <h4>Narrative Design</h4>
                  <p>District Board of Education</p>

                  <h4>Special Thanks</h4>
                  <p>Faculty Beta Testers</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;