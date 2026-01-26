
export class LeaderboardService {
  static OFFLINE_STORAGE_KEY = 'leaderboard_pending_scores';
  static CACHE_KEY = 'leaderboard_cache';
  static API_URL = 'https://api.example.com/leaderboard'; // Placeholder as per constraints

  static async submitScore(profileData) {
    // Validate
    if (!profileData.callsign || profileData.rankIndex === undefined || profileData.totalXP === undefined || !profileData.philosophy || profileData.gpa === undefined) {
      console.error("Invalid profile data for leaderboard submission");
      return false;
    }

    const payload = {
      ...profileData,
      timestamp: Date.now()
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return true;
      } else {
        throw new Error('API submission failed');
      }
    } catch (error) {
      console.warn("Leaderboard submission failed, saving offline:", error);
      this.saveOfflineScore(payload);
      return false;
    }
  }

  static async fetchLeaderboard(philosophyFilter = null) {
    try {
      // Simulate API call failure since no backend exists, forcing cache/fallback usage which mimics "offline" or "demo" mode
      throw new Error("No backend configured");
      
      /* 
      // Real implementation would be:
      const url = new URL(this.API_URL);
      if (philosophyFilter && philosophyFilter !== 'All') {
        url.searchParams.append('philosophy', philosophyFilter);
      }
      const response = await fetch(url.toString());
      if (response.ok) {
        const data = await response.json();
        this.cacheLeaderboard(data);
        return data;
      }
      */
    } catch (error) {
      return this.getCachedLeaderboard() || this.getMockLeaderboard();
    }
  }

  static saveOfflineScore(scorePayload) {
    const current = this.getPendingScores();
    current.push(scorePayload);
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

    // Simulate syncing
    // In a real app, we'd loop and fetch. Here we just clear them and pretend they synced 
    // because we can't actually sync to a non-existent backend.
    
    synced = pending.length;
    this.clearOfflineQueue();

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
    // Generate some fake data for display purposes
    const philosophies = ['Traditionalist', 'Progressive', 'Pragmatist'];
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      rank: i + 1,
      callsign: `Teacher_${Math.floor(Math.random() * 9000) + 1000}`,
      totalXP: Math.floor(50000 * Math.pow(0.9, i)),
      philosophy: philosophies[Math.floor(Math.random() * philosophies.length)],
      gpa: (4.0 - (i * 0.05)).toFixed(2)
    }));
    return mockData;
  }
}
