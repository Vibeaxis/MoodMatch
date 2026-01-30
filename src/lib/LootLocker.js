import { LootLocker } from "@/lib/LootLocker";

// 1. INITIAL SETUP
// Replace this with your API Key if it's different, but this looks like the one we used before.
const API_KEY = "dev_93740266e7714856bd317a602128713d"; 
LootLocker.init(API_KEY, "0.1");

// 2. THE SESSION MANAGER
export const login = async () => {
  try {
    // Check if we already have a session
    const session = await LootLocker.getSession();
    if (session && session.token) {
      console.log("✅ LootLocker: Session already active.", session.player_id);
      return session;
    }

    // Start a Guest Session
    // We use a random ID stored in localStorage so the user "keeps" their guest account on refresh
    let playerId = localStorage.getItem("mood_player_id");
    if (!playerId) {
      playerId = "guest_" + Math.floor(Math.random() * 1000000);
      localStorage.setItem("mood_player_id", playerId);
    }

    const response = await LootLocker.guestLogin(playerId);
    
    if (!response || response.error) {
      console.error("❌ LootLocker Login Failed:", response?.error);
      return null;
    }

    console.log("✅ LootLocker Logged in as:", response.player_id);
    return response;
  } catch (err) {
    console.error("❌ LootLocker Crash:", err);
    return null;
  }
};

// 3. THE SCORE SUBMITTER
export const submitScore = async (score) => {
  // CRITICAL: This MUST match the yellow badge in your screenshot
  const LEADERBOARD_KEY = "global_highscore"; 
  
  // LootLocker only accepts Integers (whole numbers). No decimals.
  const cleanScore = Math.floor(score);

  if (cleanScore === 0) {
    console.log("⚠️ LootLocker: Ignoring score of 0.");
    return;
  }

  try {
    // Ensure we are logged in before sending
    await login(); 

    console.log(`📤 LootLocker: Submitting ${cleanScore} to '${LEADERBOARD_KEY}'...`);
    
    // The actual SDK call
    const response = await LootLocker.submitScore(cleanScore, LEADERBOARD_KEY);
    
    if (response && !response.error) {
      console.log("🏆 LootLocker Success! Rank:", response.rank);
    } else {
      console.error("❌ LootLocker Submit Failed:", response?.error);
    }
  } catch (error) {
    console.error("❌ LootLocker Error:", error);
  }
};

// 4. THE LEADERBOARD FETCHER
export const getLeaderboard = async () => {
  const LEADERBOARD_KEY = "global_highscore";
  try {
    await login();
    // Get top 10 scores
    const response = await LootLocker.getScoreList(LEADERBOARD_KEY, 10);
    
    if (!response || response.error) {
        console.error("❌ LootLocker Fetch Failed:", response?.error);
        return [];
    }
    
    return response.items || [];
  } catch (error) {
    console.error("❌ LootLocker Fetch Error:", error);
    return [];
  }
};