/**
 * LootLocker.js
 * Handles anonymous "Guest" login and leaderboard submissions.
 * Zero-friction: No sign-ups required for the player.
 */

const API_DOMAIN = "https://ldqxmm6b.api.lootlocker.io";
const GAME_API_KEY = "dev_a853d9ed19e941218e28becf795493ff"; // Staging Key
const LEADERBOARD_KEY = "global_highscore"; // Make sure this matches your Dashboard!
const GAME_VERSION = "0.1.0";

let sessionToken = null;

export const LootLocker = {
  /**
   * 1. Authenticate as a "Guest"
   * Stores the session token internally for subsequent calls.
   * Call this once when the game loads (e.g., inside App.js useEffect).
   */
  login: async () => {
    try {
      const storedToken = localStorage.getItem("cmm_ll_token");
      
      // OPTIONAL: If we want to remember the player ID between refreshes, 
      // we would use the 'player_identifier' field. For now, we'll just generate a fresh session.
      
      const response = await fetch(`${API_DOMAIN}/game/v2/session/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_key: GAME_API_KEY,
          game_version: GAME_VERSION,
          development_mode: true 
        }),
      });

      const data = await response.json();
      
      if (data.session_token) {
        sessionToken = data.session_token;
        localStorage.setItem("cmm_player_id", data.player_id); // Save ID for debugging
        console.log("✅ LootLocker Login Success:", data.player_id);
        return true;
      } else {
        console.error("❌ LootLocker Login Failed:", data);
        return false;
      }
    } catch (e) {
      console.error("❌ LootLocker Connection Error:", e);
      return false;
    }
  },

  /**
   * 2. Submit a Score
   * @param {number} score - The total XP or Streak
   * @param {string} memberId - The player's visible name (e.g., "Teacher Tim")
   */
  submitScore: async (score, memberId) => {
    if (!sessionToken) {
      console.warn("⚠️ Cannot submit score: No Session. Logging in...");
      const success = await LootLocker.login();
      if (!success) return;
    }

    try {
      const response = await fetch(`${API_DOMAIN}/game/leaderboards/${LEADERBOARD_KEY}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-token": sessionToken,
        },
        body: JSON.stringify({
          score: score,
          member_id: memberId, // This is the visible name on the board
          metadata: JSON.stringify({ rank: "Tenure Track", date: new Date().toISOString() }) // Extra flavor data
        }),
      });

      const data = await response.json();
      console.log("🚀 Score Submitted:", data);
      return data;
    } catch (e) {
      console.error("❌ Submit Error:", e);
    }
  },

  /**
   * 3. Get Top 10 Scores
   * Returns an array of formatted score objects.
   */
  getLeaderboard: async () => {
    if (!sessionToken) await LootLocker.login();

    try {
      const response = await fetch(`${API_DOMAIN}/game/leaderboards/${LEADERBOARD_KEY}/list?count=10`, {
        method: "GET",
        headers: {
          "x-session-token": sessionToken,
        },
      });

      const data = await response.json();
      
      if (data.items) {
        return data.items.map((item, index) => ({
          rank: item.rank,
          name: item.member_id || "Anonymous Teacher",
          score: item.score,
          meta: item.metadata ? JSON.parse(item.metadata) : {}
        }));
      }
      return [];
    } catch (e) {
      console.error("❌ Fetch Leaderboard Error:", e);
      return [];
    }
  }
};