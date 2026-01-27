import { useEffect, useRef, useState } from 'react';
import { SaveManager } from '@/lib/SaveSystem';

export const useAutoSave = (gameState, enabled = true) => {
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Refs to track state without triggering re-renders
  const timeoutRef = useRef(null);
  const lastStateStringRef = useRef('');
  const currentStateRef = useRef(gameState); // ALWAYS holds latest state

  // 1. Keep the Ref updated with the latest game state
  useEffect(() => {
    currentStateRef.current = gameState;
  }, [gameState]);

  // 2. THE "EMERGENCY SAVE" (Fixes the Refresh Issue)
  // This listener fires exactly when the user tries to close/refresh the tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (enabled && currentStateRef.current) {
        // We force a synchronous save using the Ref
        SaveManager.saveGame(currentStateRef.current, 'auto');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enabled]);

  // 3. THE "GAMEPLAY" AUTOSAVE (Your original logic)
  useEffect(() => {
    if (!enabled || !gameState) return;

    const currentStateString = JSON.stringify(gameState);
    
    // Don't save if nothing changed (prevents loops)
    if (currentStateString === lastStateStringRef.current) {
      return;
    }

    // Clear previous timer (Debounce)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timer
    timeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      console.log('💾 Auto-saving...'); // Console log to verify it works

      try {
        const success = SaveManager.saveGame(gameState, 'auto');
        if (success) {
          setLastSaveTime(new Date());
          lastStateStringRef.current = currentStateString;
          console.log('✅ Auto-save complete.');
        }
      } catch (e) {
        console.error("Auto-save error:", e);
      } finally {
        setIsSaving(false);
      }
    }, 2000); // 2 seconds after last action

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [gameState, enabled]);

  return {
    enabled,
    lastSaveTime,
    isSaving
  };
};