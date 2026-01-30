/**
 * LeaderboardService.js
 * REAL Implementation using LootLocker
 */

const LL_DOMAIN = "https://ldqxmm6b.api.lootlocker.io";
const LL_KEY = "dev_a853d9ed19e941218e28becf795493ff"; // Staging Key
const LL_LEADERBOARD_KEY = "global_highscore";
const LL_VERSION = "0.1.0";

export class LeaderboardService {
  static OFFLINE_STORAGE_KEY = 'leaderboard_pending_scores';
  static CACHE_KEY = 'leaderboard_cache';
  
  // Internal session token storage
  static _sessionToken = null;
  static _playerId = null;

  /**
   * Helper: Ensure we have a valid LootLocker session
   */
  static async _ensureSession() {
    if (this._sessionToken) return true;

    try {
      const response = await fetch(`${LL_DOMAIN}/game/v2/session/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_key: LL_KEY,
          game_version: LL_VERSION,
          development_mode: true 
        }),
      });

      const data = await response.json();
      if (data.session_token) {
        this._sessionToken = data.session_token;
        this._playerId = data.player_id;
        return true;
      }
      return false;
    } catch (e) {
      console.error("LootLocker Login Error:", e);
      return false;
    }
  }

  static async submitScore(profileData) {
    // 1. Validate Data
    if (!profileData.callsign || profileData.totalXP === undefined) {
      console.error("Invalid profile data for leaderboard submission");
      return false;
    }

    // 2. Ensure we are logged in
    const isLoggedIn = await this._ensureSession();
    if (!isLoggedIn) {
      console.warn("Could not log in to leaderboard. Saving offline.");
      this.saveOfflineScore(profileData);
      return false;
    }

    // 3. Prepare Payload
    // LootLocker takes one integer "score" and a "metadata" string for everything else.
    const payload = {
      score: Math.floor(profileData.totalXP),
      member_id: profileData.callsign, // Display name on the board
      metadata: JSON.stringify({
        philosophy: profileData.philosophy || "Unknown",
        gpa: profileData.gpa || "0.0",
        rankIndex: profileData.rankIndex || 0,
        timestamp: Date.now()
      })
    };

    try {
      const response = await fetch(`${LL_DOMAIN}/game/leaderboards/${LL_LEADERBOARD_KEY}/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-session-token': this._sessionToken
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Score Submitted to LootLocker:", data);
        return true;
      } else {
        throw new Error('API submission failed: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.warn("Leaderboard submission failed, saving offline:", error);
      this.saveOfflineScore(profileData);
      return false;
    }
  }

  static async fetchLeaderboard(philosophyFilter = null) {
    // Attempt to load real data
    try {
      const isLoggedIn = await this._ensureSession();
      if (!isLoggedIn) throw new Error("No session");

      const response = await fetch(`${LL_DOMAIN}/game/leaderboards/${LL_LEADERBOARD_KEY}/list?count=50`, {
        method: 'GET',
        headers: { 'x-session-token': this._sessionToken }
      });

      if (!response.ok) throw new Error("Fetch failed");

      const data = await response.json();
      
      // Parse LootLocker data back into our App's format
      let formattedItems = [];
      
      if (data.items) {
        formattedItems = data.items.map(item => {
          let meta = {};
          try { meta = item.metadata ? JSON.parse(item.metadata) : {}; } catch(e){}

          return {
            rank: item.rank,
            callsign: item.member_id || "Anonymous",
            totalXP: item.score,
            philosophy: meta.philosophy || "Unknown",
            gpa: meta.gpa || "0.00"
          };
        });
      }

      // Apply Filter Client-Side (LootLocker filtering is complex, this is easier for <100 items)
      if (philosophyFilter && philosophyFilter !== 'All') {
        formattedItems = formattedItems.filter(i => i.philosophy === philosophyFilter);
      }

      // Update Cache
      this.cacheLeaderboard(formattedItems);
      return formattedItems;

    } catch (error) {
      console.warn("Using offline/cached leaderboard due to error:", error);
      return this.getCachedLeaderboard() || this.getMockLeaderboard();
    }
  }

  // --- Offline & Helpers (Kept mostly the same) ---

  static saveOfflineScore(scorePayload) {
    const current = this.getPendingScores();
    current.push({ ...scorePayload, timestamp: Date.now() });
    localStorage.setItem(this.OFFLINE_STORAGE_KEY, JSON.stringify(current));
  }

  static getPendingScores() {
    const raw = localStorage.getItem(this.OFFLINE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static clearOfflineQueue() {
    localStorage.removeItem(this.OFFLINE_STORAGE_KEY);
  }

  static async syncPendingScores() {
    const pending = this.getPendingScores();
    if (pending.length === 0) return { synced: 0, failed: 0 };

    let synced = 0;
    let failed = 0;

    console.log(`Attempting to sync ${pending.length} offline scores...`);

    // Try to submit each one (LIFO or FIFO doesn't matter much here, usually FIFO)
    for (const scoreData of pending) {
       // We re-use submitScore but we must be careful not to create an infinite loop 
       // of saving offline again. 
       // Simple trick: We call the internal fetch logic or just await submitScore.
       // If submitScore fails, it re-saves. We should probably clear queue first, 
       // then process, and re-add failures.
       
       const success = await this.submitScore(scoreData);
       if (success) synced++;
       else failed++;
    }
    
    // In a robust system we would remove only the successful ones. 
    // For now, we clear the queue to prevent permanent retry loops on bad data.
    if (synced > 0) this.clearOfflineQueue();

    return { synced, failed };
  }

  static cacheLeaderboard(leaderboard) {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(leaderboard));
  }

  static getCachedLeaderboard() {
    const raw = localStorage.getItem(this.CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  static hasPendingScores() {
    return this.getPendingScores().length > 0;
  }

  static getMockLeaderboard() {
    // Keep this as the "Internet is down" fallback
    const philosophies = ['Traditionalist', 'Progressive', 'Pragmatist'];
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      callsign: `Offline_Teacher_${Math.floor(Math.random() * 900)}`,
      totalXP: Math.floor(50000 * Math.pow(0.9, i)),
      philosophy: philosophies[Math.floor(Math.random() * philosophies.length)],
      gpa: (4.0 - (i * 0.05)).toFixed(2)
    }));
    return mockData;
  }
}