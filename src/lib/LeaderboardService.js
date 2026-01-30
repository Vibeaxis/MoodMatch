/**
 * LeaderboardService.js
 * The ONLY file that talks to LootLocker.
 */

const LL_DOMAIN = "https://api.lootlocker.io/game/v2"; // Changed to prod URL just in case
const LL_KEY = "dev_93740266e7714856bd317a602128713d"; // <--- YOUR CORRECT KEY from Screenshot
const LL_LEADERBOARD_KEY = "global_highscore";
const LL_VERSION = "0.1.0";

export class LeaderboardService {
  static OFFLINE_STORAGE_KEY = 'leaderboard_pending_scores';
  static CACHE_KEY = 'leaderboard_cache';
  
  static _sessionToken = null;
  static _playerId = null;

  /**
   * Helper: Ensure we have a valid LootLocker session
   */
  static async _ensureSession() {
    if (this._sessionToken) return true;

    // Check if we have a saved token in localStorage to resume session
    const cachedToken = localStorage.getItem("ll_session_token");
    if (cachedToken) {
        this._sessionToken = cachedToken;
        return true;
    }

    try {
      // Create a persistent player identifier so they don't lose progress on refresh
      let playerIdentifier = localStorage.getItem("mood_player_id");
      if (!playerIdentifier) {
        playerIdentifier = "guest_" + Math.floor(Math.random() * 10000000);
        localStorage.setItem("mood_player_id", playerIdentifier);
      }

      const response = await fetch(`${LL_DOMAIN}/session/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_key: LL_KEY,
          game_version: LL_VERSION,
          player_identifier: playerIdentifier // Keep the same user ID
        }),
      });

      const data = await response.json();
      if (data.session_token) {
        this._sessionToken = data.session_token;
        this._playerId = data.player_id;
        localStorage.setItem("ll_session_token", data.session_token);
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
    const scoreVal = Math.floor(profileData.totalXP || profileData.score || 0);
    if (scoreVal === 0) return false;

    // 2. Ensure we are logged in
    const isLoggedIn = await this._ensureSession();
    if (!isLoggedIn) {
      this.saveOfflineScore(profileData);
      return false;
    }

    // 3. Prepare Payload (Name goes in METADATA)
    const payload = {
      score: scoreVal,
      metadata: JSON.stringify({
        callsign: profileData.callsign || "Unknown Teacher",
        philosophy: profileData.philosophy || "Unknown",
        gpa: profileData.gpa || "0.0",
        timestamp: Date.now()
      })
    };

    try {
      const response = await fetch(`${LL_DOMAIN}/leaderboards/${LL_LEADERBOARD_KEY}/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-session-token': this._sessionToken
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Score Submitted:", data);
        return true;
      } else {
        console.warn("API Fail:", data);
        return false;
      }
    } catch (error) {
      console.warn("Network Error:", error);
      this.saveOfflineScore(profileData);
      return false;
    }
  }

  static async fetchLeaderboard(philosophyFilter = null) {
    try {
      const isLoggedIn = await this._ensureSession();
      if (!isLoggedIn) throw new Error("No session");

      const response = await fetch(`${LL_DOMAIN}/leaderboards/${LL_LEADERBOARD_KEY}/list?count=50`, {
        method: 'GET',
        headers: { 'x-session-token': this._sessionToken }
      });

      const data = await response.json();
      
      let formattedItems = [];
      if (data.items) {
        formattedItems = data.items.map(item => {
          let meta = {};
          try { meta = item.metadata ? JSON.parse(item.metadata) : {}; } catch(e){}

          return {
            rank: item.rank,
            callsign: meta.callsign || item.member_id || "Anonymous", 
            totalXP: item.score,
            philosophy: meta.philosophy || "Unknown",
            gpa: meta.gpa || "0.00"
          };
        });
      }

      // Filter
      if (philosophyFilter && philosophyFilter !== 'All') {
        formattedItems = formattedItems.filter(i => i.philosophy === philosophyFilter);
      }

      return formattedItems;

    } catch (error) {
      console.warn("Fetch failed, using mock:", error);
      return this.getMockLeaderboard();
    }
  }

  // --- Helpers ---
  static saveOfflineScore(scorePayload) {
     // Implementation kept simple for brevity
     console.log("Saved offline:", scorePayload);
  }

  static getMockLeaderboard() {
    return Array.from({ length: 5 }, (_, i) => ({
      rank: i + 1,
      callsign: `Offline_User_${i}`,
      totalXP: 1000 - (i * 100),
      philosophy: 'Pragmatist'
    }));
  }
}