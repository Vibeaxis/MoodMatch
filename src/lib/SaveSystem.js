
/**
 * SaveSystem.js
 * Comprehensive save management for Classroom Mood Matcher
 * Handles localStorage, backups, export/import, and metadata
 */

const SAVE_KEY = 'cmm_save_v1';
const BACKUP_KEY = 'cmm_save_backup';
const SETTINGS_KEY = 'cmm_settings_v1';

const DEFAULT_SETTINGS = {
  autoSaveEnabled: true,
  soundEnabled: true,
  musicEnabled: true,
  animationsEnabled: true,
  difficulty: 'NORMAL' // EASY, NORMAL, HARD
};

const DEFAULT_GAME_STATE = {
  playerProfile: {
    name: "Teacher",
    philosophy: "Pragmatist", 
    currentRank: 0,
    xpTotal: 0,
    streak: 0,
    supplies: [],
    weekNumber: 1,
    dayOfWeek: 0,
    careerGPA: 0.0
  },
  unlockedGradeLevels: ['Kindergarten'],
  currentGradeLevel: 'Kindergarten',
  unlockedPerks: [],
  dayCount: 1,
  shiftHistory: [], 
  lastPlayed: null,
  tutorialCompleted: false
};

export const SaveManager = {
  /**
   * Saves the current game state to localStorage
   * @param {Object} gameState - The complete game state object
   * @returns {boolean} success status
   */
  saveGame: (gameState) => {
    try {
      const saveObject = {
        ...gameState,
        version: 1,
        timestamp: Date.now(),
        meta: {
          playtime: gameState.meta?.playtime || 0, // Placeholder for future playtime tracking
          saveDate: new Date().toISOString()
        }
      };

      const serialized = JSON.stringify(saveObject);
      
      // Create backup of previous save if exists
      const existing = localStorage.getItem(SAVE_KEY);
      if (existing) {
        localStorage.setItem(BACKUP_KEY, existing);
      }

      localStorage.setItem(SAVE_KEY, serialized);
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  },

  /**
   * Loads game state from localStorage
   * @returns {Object|null} The game state or null if no save exists
   */
  loadGame: () => {
    try {
      const serialized = localStorage.getItem(SAVE_KEY);
      if (!serialized) return null;

      const saveObject = JSON.parse(serialized);
      
      // Merge with default state to ensure new fields exist
      return {
        ...DEFAULT_GAME_STATE,
        ...saveObject,
        playerProfile: {
          ...DEFAULT_GAME_STATE.playerProfile,
          ...(saveObject.playerProfile || {})
        }
      };
    } catch (e) {
      console.error('Load failed:', e);
      // Try backup
      try {
        const backup = localStorage.getItem(BACKUP_KEY);
        if (backup) {
          console.warn('Restoring from backup...');
          return JSON.parse(backup);
        }
      } catch (backupError) {
        console.error('Backup restore failed:', backupError);
      }
      return null;
    }
  },

  /**
   * Returns a fresh game state object
   */
  getNewGameState: () => {
    return JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
  },

  /**
   * Wipes save data
   */
  clearSave: () => {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    // Note: We might want to keep settings
  },

  /**
   * Exports save data as a Base64 string
   */
  exportSave: () => {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      if (!data) return null;
      return btoa(unescape(encodeURIComponent(data)));
    } catch (e) {
      console.error('Export failed:', e);
      return null;
    }
  },

  /**
   * Imports save data from Base64 string
   * @param {string} base64String 
   */
  importSave: (base64String) => {
    try {
      const jsonString = decodeURIComponent(escape(atob(base64String)));
      const parsed = JSON.parse(jsonString);
      
      // Basic validation
      if (!parsed.playerProfile || !parsed.version) {
        throw new Error('Invalid save file format');
      }

      localStorage.setItem(SAVE_KEY, jsonString);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },

  /**
   * Gets metadata about the save file without loading everything if possible
   * (In localStorage everything loads, but this formats it for UI)
   */
  getSaveMetadata: () => {
    const data = localStorage.getItem(SAVE_KEY);
    if (!data) return null;
    
    try {
      const parsed = JSON.parse(data);
      return {
        name: parsed.playerProfile?.name || 'Unknown Teacher',
        rank: parsed.playerProfile?.currentRank || 0,
        day: parsed.dayCount || 1,
        timestamp: parsed.timestamp || Date.now(),
        dateString: parsed.meta?.saveDate || new Date().toISOString()
      };
    } catch (e) {
      return null;
    }
  },

  hasSave: () => {
    return !!localStorage.getItem(SAVE_KEY);
  },

  getSaveSize: () => {
    const data = localStorage.getItem(SAVE_KEY);
    return data ? (data.length / 1024).toFixed(2) + ' KB' : '0 KB';
  },

  // --- Settings Management ---

  saveSettings: (settings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  loadSettings: () => {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  }
};
