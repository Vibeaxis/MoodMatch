// A lightweight, dependency-free LootLocker client
const API_KEY = "dev_93740266e7714856bd317a602128713d"; // Your Key
const GAME_VERSION = "0.1";
const BASE_URL = "https://api.lootlocker.io/game/v2";

// Helper to manage the session token
const getSessionToken = () => localStorage.getItem("ll_session_token");
const setSessionToken = (token) => localStorage.setItem("ll_session_token", token);

// 1. LOGIN (Guest)
export const login = async () => {
  try {
    // If we already have a token, just assume it's good (basic check)
    // In a real app, you might want to "ping" the server to verify it.
    if (getSessionToken()) {
      console.log("✅ LootLocker: Resuming session.");
      return { success: true };
    }

    // Get or Create a Guest ID
    let playerIdentifier = localStorage.getItem("mood_player_id");
    if (!playerIdentifier) {
      playerIdentifier = "guest_" + Math.floor(Math.random() * 10000000);
      localStorage.setItem("mood_player_id", playerIdentifier);
    }

    const res = await fetch(`${BASE_URL}/session/guest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game_key: API_KEY,
        game_version: GAME_VERSION,
        player_identifier: playerIdentifier
      })
    });

    const data = await res.json();
    
    if (data.session_token) {
      setSessionToken(data.session_token);
      console.log("✅ LootLocker: Logged in as", data.player_id);
      return data;
    } else {
      console.error("❌ LootLocker Login Failed:", data);
      return null;
    }
  } catch (err) {
    console.error("❌ LootLocker Network Error:", err);
    return null;
  }
};

// 2. SUBMIT SCORE
export const submitScore = async (score) => {
  const LEADERBOARD_KEY = "global_highscore";
  const token = getSessionToken();

  if (!token) {
    await login(); // Auto-login if missing
  }

  try {
    const res = await fetch(`${BASE_URL}/leaderboards/${LEADERBOARD_KEY}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-session-token": getSessionToken() // Re-fetch token in case login() just set it
      },
      body: JSON.stringify({ score: Math.floor(score) }) // Must be integer
    });

    const data = await res.json();
    console.log("📤 Score Upload:", data);
    return data;
  } catch (err) {
    console.error("❌ Submit Score Error:", err);
  }
};

// 3. GET LEADERBOARD
export const getLeaderboard = async () => {
  const LEADERBOARD_KEY = "global_highscore";
  const token = getSessionToken();

  if (!token) {
    await login();
  }

  try {
    // Fetch top 10
    const res = await fetch(`${BASE_URL}/leaderboards/${LEADERBOARD_KEY}/list?count=10`, {
      method: "GET",
      headers: {
        "x-session-token": getSessionToken()
      }
    });

    const data = await res.json();
    
    // LootLocker structure is usually data.items or data.items[].member
    if (data.items) {
      return data.items;
    } else {
      console.warn("⚠️ Leaderboard empty or invalid:", data);
      return [];
    }
  } catch (err) {
    console.error("❌ Fetch Leaderboard Error:", err);
    return [];
  }
};