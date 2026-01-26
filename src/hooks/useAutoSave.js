
import { useEffect, useRef, useState } from 'react';
import { SaveManager } from '@/lib/SaveSystem';

export const useAutoSave = (gameState, enabled = true) => {
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef(null);
  const lastStateStringRef = useRef('');

  useEffect(() => {
    if (!enabled || !gameState) return;

    // Simple serialization to check for changes
    const currentStateString = JSON.stringify(gameState);
    
    // Avoid saving if state hasn't actually changed
    if (currentStateString === lastStateStringRef.current) {
      return;
    }

    // Debounce save
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      try {
        const success = SaveManager.saveGame(gameState);
        if (success) {
          setLastSaveTime(new Date());
          lastStateStringRef.current = currentStateString;
        }
      } catch (e) {
        console.error("Auto-save error:", e);
      } finally {
        setIsSaving(false);
      }
    }, 2000); // 2 second debounce

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
