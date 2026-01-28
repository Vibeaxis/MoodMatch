/**
 * SaveSystem.js
 * Comprehensive save management for Classroom Mood Matcher
 * Handles localStorage, backups, export/import, and metadata
 * UPDATED: Now supports Multiple Save Slots
 */

const SAVE_KEY_AUTO = 'cmm_save_v1'; // Keeps backward compatibility
const SAVE_KEY_PREFIX = 'cmm_save_slot_'; // cmm_save_slot_1, cmm_save_slot_2, etc.
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

// Helper to determine the actual localStorage key based on slot ID
const getKeyForSlot = (slotId) => {
  if (!slotId || slotId === 'auto') return SAVE_KEY_AUTO;
  return `${SAVE_KEY_PREFIX}${slotId}`;
};
// --- Safe Storage Wrapper (prevents iOS Safari black-screen crashes) ---
const getSafeStorage = () => {
  try {
    const ls = window.localStorage;
    const k = "__cmm_storage_test__";
    ls.setItem(k, "1");
    ls.removeItem(k);
    return ls;
  } catch (e) {
    return null; // storage unavailable (common on iOS private mode)
  }
};

const SAFE_LS = getSafeStorage();
const MEM_FALLBACK = new Map(); // lets the game boot even if storage is dead

const safeGetItem = (key) => {
  try {
    if (SAFE_LS) return SAFE_LS.getItem(key);
  } catch (e) {}
  return MEM_FALLBACK.has(key) ? MEM_FALLBACK.get(key) : null;
};

const safeSetItem = (key, value) => {
  try {
    if (SAFE_LS) {
      SAFE_LS.setItem(key, value);
      return true;
    }
  } catch (e) {}
  MEM_FALLBACK.set(key, value);
  return false;
};

const safeRemoveItem = (key) => {
  try {
    if (SAFE_LS) SAFE_LS.removeItem(key);
  } catch (e) {}
  MEM_FALLBACK.delete(key);
};

export const SaveManager = {
  /**
   * Saves the current game state to localStorage
   * @param {Object} gameState - The complete game state object
   * @param {string|number} slotId - 'auto' for autosave, or 1, 2, 3 for manual slots
   * @returns {boolean} success status
   */
  saveGame: (gameState, slotId = 'auto') => {
    try {
      const storageKey = getKeyForSlot(slotId);
      
      const saveObject = {
        ...gameState,
        version: 1,
        timestamp: Date.now(),
        slotId: slotId, // Track which slot this is
        meta: {
          playtime: gameState.meta?.playtime || 0,
          saveDate: new Date().toISOString(),
          label: slotId === 'auto' ? 'Auto Save' : `Slot ${slotId}`
        }
      };

      const serialized = JSON.stringify(saveObject);
      
      // Only backup the AutoSave to prevent blowing up storage limits
      if (slotId === 'auto') {
        const existing = localStorage.getItem(SAVE_KEY_AUTO);
        if (existing) {
          localStorage.setItem(BACKUP_KEY, existing);
        }
      }

      localStorage.setItem(storageKey, serialized);
      return true;
    } catch (e) {
      console.error(`Save failed for slot ${slotId}:`, e);
      return false;
    }
  },

  /**
   * Loads game state from localStorage
   * @param {string|number} slotId - 'auto' or slot number
   * @returns {Object|null} The game state or null if no save exists
   */
  loadGame: (slotId = 'auto') => {
    try {
      const storageKey = getKeyForSlot(slotId);
      const serialized = localStorage.getItem(storageKey);
      
      if (!serialized) {
        // If trying to load Auto and it fails, try backup
        if (slotId === 'auto') return SaveManager.recoverBackup();
        return null;
      }

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
      console.error(`Load failed for slot ${slotId}:`, e);
      return null;
    }
  },

  /**
   * Specifically tries to load the backup file
   */
  recoverBackup: () => {
    try {
      const backup = localStorage.getItem(BACKUP_KEY);
      if (backup) {
        console.warn('Restoring from backup...');
        return JSON.parse(backup);
      }
    } catch (e) {
      console.error('Backup restore failed:', e);
    }
    return null;
  },

  /**
   * Returns a list of all populated save slots with their metadata
   * Used for the "Load Game" screen
   */
  getAllSaves: () => {
    const slots = [];
    
    // Check Auto Save
    const autoMeta = SaveManager.getSlotMetadata('auto');
    if (autoMeta) slots.push({ ...autoMeta, id: 'auto', label: 'Auto Save' });

    // Check Manual Slots (let's assume 3 slots for now)
    [1, 2, 3].forEach(num => {
      const meta = SaveManager.getSlotMetadata(num);
      if (meta) {
        slots.push({ ...meta, id: num, label: `Slot ${num}` });
      } else {
        // Push empty slot info so UI knows it's available
        slots.push({ id: num, label: `Slot ${num}`, isEmpty: true });
      }
    });

    return slots;
  },

  /**
   * Gets metadata for a specific slot without full validation
   */
  getSlotMetadata: (slotId) => {
    const key = getKeyForSlot(slotId);
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    try {
      const parsed = JSON.parse(data);
      return {
        isEmpty: false,
        name: parsed.playerProfile?.name || 'Unknown Teacher',
        rank: parsed.playerProfile?.currentRank || 0,
        day: parsed.dayCount || 1,
        week: parsed.playerProfile?.weekNumber || 1,
        timestamp: parsed.timestamp || Date.now(),
        dateString: parsed.meta?.saveDate || new Date().toISOString()
      };
    } catch (e) {
      return null;
    }
  },

  /**
   * Wipes save data for a specific slot
   */
  deleteSlot: (slotId) => {
    const key = getKeyForSlot(slotId);
    localStorage.removeItem(key);
    if (slotId === 'auto') localStorage.removeItem(BACKUP_KEY);
  },

  /**
   * Returns a fresh game state object
   */
  getNewGameState: () => {
    return JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
  },

  // --- Import/Export (Defaults to AutoSave for now) ---

  exportSave: (slotId = 'auto') => {
    try {
      const key = getKeyForSlot(slotId);
      const data = localStorage.getItem(key);
      if (!data) return null;
      return btoa(unescape(encodeURIComponent(data)));
    } catch (e) {
      console.error('Export failed:', e);
      return null;
    }
  },

  importSave: (base64String, targetSlotId = 'auto') => {
    try {
      const jsonString = decodeURIComponent(escape(atob(base64String)));
      const parsed = JSON.parse(jsonString);
      
      if (!parsed.playerProfile || !parsed.version) {
        throw new Error('Invalid save file format');
      }

      const key = getKeyForSlot(targetSlotId);
      localStorage.setItem(key, jsonString);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },

  // --- Settings (Shared across all saves) ---

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