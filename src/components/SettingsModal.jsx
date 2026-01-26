
import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Download, Trash2, Volume2, Monitor, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { SaveManager } from '@/lib/SaveSystem';
import { useToast } from '@/components/ui/use-toast';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, currentSettings, onSettingsChange, onHardReset }) => {
  const [activeTab, setActiveTab] = useState('GAMEPLAY');
  const [settings, setSettings] = useState(currentSettings);
  const [saveMeta, setSaveMeta] = useState(null);
  const [importString, setImportString] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSettings(currentSettings);
      refreshSaveMeta();
    }
  }, [isOpen, currentSettings]);

  const refreshSaveMeta = () => {
    setSaveMeta(SaveManager.getSaveMetadata());
  };

  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleDifficulty = (level) => {
    const newSettings = { ...settings, difficulty: level };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleExport = () => {
    const data = SaveManager.exportSave();
    if (data) {
      navigator.clipboard.writeText(data).then(() => {
        toast({
          title: "Save Exported!",
          description: "Save data copied to clipboard.",
          className: "bg-green-100 border-green-500 text-green-900"
        });
      });
    } else {
      toast({
        title: "Export Failed",
        description: "No save data found.",
        variant: "destructive"
      });
    }
  };

  const handleImport = () => {
    if (!importString) return;
    
    if (window.confirm("Importing will overwrite your current save. Are you sure?")) {
      const success = SaveManager.importSave(importString);
      if (success) {
        toast({
          title: "Import Successful",
          description: "Game will reload...",
          className: "bg-blue-100 border-blue-500 text-blue-900"
        });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast({
          title: "Import Failed",
          description: "Invalid save string.",
          variant: "destructive"
        });
      }
    }
  };

  const handleClearSave = () => {
    SaveManager.clearSave();
    if (onHardReset) {
      onHardReset();
    } else {
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>SYSTEM CONFIGURATION</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="settings-content">
          <div className="settings-tabs">
            <button 
              className={`tab-btn ${activeTab === 'GAMEPLAY' ? 'active' : ''}`}
              onClick={() => setActiveTab('GAMEPLAY')}
            >
              <Monitor size={16} /> GAMEPLAY
            </button>
            <button 
              className={`tab-btn ${activeTab === 'AUDIO' ? 'active' : ''}`}
              onClick={() => setActiveTab('AUDIO')}
            >
              <Volume2 size={16} /> AUDIO
            </button>
            <button 
              className={`tab-btn ${activeTab === 'SAVE' ? 'active' : ''}`}
              onClick={() => setActiveTab('SAVE')}
            >
              <Save size={16} /> DATA
            </button>
            <button 
              className={`tab-btn ${activeTab === 'ABOUT' ? 'active' : ''}`}
              onClick={() => setActiveTab('ABOUT')}
            >
              <Info size={16} /> ABOUT
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'GAMEPLAY' && (
              <div className="settings-section">
                <div className="setting-row">
                  <div className="setting-info">
                    <label>Auto-Save</label>
                    <p>Automatically save progress every few seconds.</p>
                  </div>
                  <div className={`toggle-switch ${settings.autoSaveEnabled ? 'active' : ''}`} onClick={() => handleToggle('autoSaveEnabled')}>
                    <div className="toggle-thumb" />
                  </div>
                </div>

                <div className="setting-row">
                  <div className="setting-info">
                    <label>Animations</label>
                    <p>Enable smooth UI transitions and effects.</p>
                  </div>
                  <div className={`toggle-switch ${settings.animationsEnabled ? 'active' : ''}`} onClick={() => handleToggle('animationsEnabled')}>
                    <div className="toggle-thumb" />
                  </div>
                </div>

                <div className="setting-group">
                  <label>Difficulty Preset</label>
                  <div className="difficulty-selector">
                    {['EASY', 'NORMAL', 'HARD'].map(diff => (
                      <button 
                        key={diff}
                        className={`diff-btn ${settings.difficulty === diff ? 'active' : ''}`}
                        onClick={() => handleDifficulty(diff)}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'AUDIO' && (
              <div className="settings-section">
                <div className="setting-row">
                  <div className="setting-info">
                    <label>Sound Effects</label>
                    <p>UI clicks, notifications, and interactions.</p>
                  </div>
                  <div className={`toggle-switch ${settings.soundEnabled ? 'active' : ''}`} onClick={() => handleToggle('soundEnabled')}>
                    <div className="toggle-thumb" />
                  </div>
                </div>

                <div className="setting-row">
                  <div className="setting-info">
                    <label>Music</label>
                    <p>Background ambience and tracks.</p>
                  </div>
                  <div className={`toggle-switch ${settings.musicEnabled ? 'active' : ''}`} onClick={() => handleToggle('musicEnabled')}>
                    <div className="toggle-thumb" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'SAVE' && (
              <div className="settings-section">
                <div className="save-meta-card">
                  <h4>CURRENT SAVE FILE</h4>
                  {saveMeta ? (
                    <div className="save-grid">
                      <div className="meta-item"><span>NAME:</span> {saveMeta.name}</div>
                      <div className="meta-item"><span>DAY:</span> {saveMeta.day}</div>
                      <div className="meta-item"><span>SIZE:</span> {SaveManager.getSaveSize()}</div>
                      <div className="meta-item"><span>SAVED:</span> {new Date(saveMeta.timestamp).toLocaleTimeString()}</div>
                    </div>
                  ) : (
                    <p className="no-save">No active save data found.</p>
                  )}
                </div>

                <div className="action-buttons">
                  <button className="action-btn export" onClick={handleExport}>
                    <Upload size={16} /> EXPORT SAVE
                  </button>
                  <button className="action-btn delete" onClick={() => setShowClearConfirm(true)}>
                    <Trash2 size={16} /> CLEAR DATA
                  </button>
                </div>

                {showClearConfirm && (
                  <div className="confirm-box">
                    <AlertTriangle size={24} className="text-red-500 mb-2" />
                    <p>Are you sure? This will wipe all progress permanently.</p>
                    <div className="confirm-actions">
                      <button className="confirm-btn cancel" onClick={() => setShowClearConfirm(false)}>CANCEL</button>
                      <button className="confirm-btn nuke" onClick={handleClearSave}>CONFIRM WIPE</button>
                    </div>
                  </div>
                )}

                <div className="import-section">
                  <label>Import Save Data</label>
                  <textarea 
                    placeholder="Paste save string here..." 
                    value={importString}
                    onChange={(e) => setImportString(e.target.value)}
                  />
                  <button 
                    className="action-btn import" 
                    onClick={handleImport}
                    disabled={!importString}
                  >
                    <Download size={16} /> IMPORT DATA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'ABOUT' && (
              <div className="settings-section about-section">
                <h3>Classroom Mood Matcher</h3>
                <p className="version">Version 1.0.0 (Beta)</p>
                <p>Manage chaos, grade assignments, and survive the academic year.</p>
                
                <h4>Tips & Tricks</h4>
                <ul className="tips-list">
                  <li><CheckCircle size={12}/> Coffee restores rerolls and hints.</li>
                  <li><CheckCircle size={12}/> S-Ranks increase your combo streak.</li>
                  <li><CheckCircle size={12}/> Check the daily memo for active modifiers.</li>
                  <li><CheckCircle size={12}/> Tenure protects you from one F-Rank per week.</li>
                </ul>

                <div className="credits">
                  <p>Designed for Hostinger Horizons</p>
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
