import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Lock, CheckCircle, Shield, Eye, ShoppingCart, Coffee, Star, FileText, RefreshCw, Trophy } from 'lucide-react';
import { RANK_CONFIG } from '@/lib/GameLogic'; // Verify path
import { LeaderboardService } from '@/lib/LeaderboardService'; // Verify path
import './PerformanceTab.css';

const PERK_DEFINITIONS = [
  {
    id: 'TENURE',
    name: 'Tenure Protection',
    description: 'Immunity from one F-Rank shift per week. Keeps your record clean.',
    icon: <Shield size={20} />,
    requirement: '3.8+ GPA'
  },
  {
    id: 'EARLY_MEMO_PEEK',
    name: 'Advanced Notice',
    description: 'Unlock ability to peek at tomorrow\'s Daily Memo ahead of time.',
    icon: <Eye size={20} />,
    requirement: '3.5+ GPA'
  },
  {
    id: 'UNION_DISCOUNTS',
    name: 'Union Card',
    description: 'Reduced streak cost for all classroom supply requisitions.',
    icon: <ShoppingCart size={20} />,
    requirement: '3.0+ GPA'
  },
  {
    id: 'COFFEE_REFILL',
    name: 'Bottomless Mug',
    description: 'Coffee mug holds 2 charges per day instead of 1.',
    icon: <Coffee size={20} />,
    requirement: '3.0+ GPA'
  },
  {
    id: 'MENTORSHIP',
    name: 'Senior Mentorship',
    description: 'Passive XP multiplier for all student interactions. (Coming Soon)',
    icon: <Star size={20} />,
    requirement: '4.0+ GPA'
  }
];

const PerformanceTab = ({ playerProfile, unlockedPerks = [], shiftHistory }) => {
  const [activeView, setActiveView] = useState('PROFILE');
  
  // --- REAL LEADERBOARD STATE ---
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const rankData = RANK_CONFIG[playerProfile.currentRank] || RANK_CONFIG[0];
  const shiftHistoryList = shiftHistory ? shiftHistory.getHistory() : [];
  const shiftStats = shiftHistory ? shiftHistory.getStatistics() : {
    totalShifts: 0, averageRank: 0, averageGPA: 0, totalXP: 0, sRankCount: 0, fRankCount: 0, crisisCount: 0
  };

  // --- FETCH REAL DATA ---
  useEffect(() => {
    if (activeView === 'LEADERBOARD') {
      loadLeaderboard();
    }
  }, [activeView, filter]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    
    // 1. Fetch from Service
    const data = await LeaderboardService.fetchLeaderboard(filter);
    
    // 2. Prepare "YOU" row for comparison
    const myEntry = {
      rank: '?',
      callsign: `${playerProfile.name} (YOU)`,
      totalXP: playerProfile.xpTotal || playerProfile.totalXP || 0,
      philosophy: playerProfile.philosophy,
      gpa: playerProfile.gpa || "0.00",
      isPlayer: true
    };
    
    // 3. Merge Logic: Ensure "You" are visible
    // Check if player is already in the fetched list
    const amIInList = data.some(p => p.callsign.includes(playerProfile.name));
    
    let finalDisplay = [...data];

    // If list is empty, or I'm not in it, put me at the top so I can see myself
    if (!amIInList && data.length > 0) {
       finalDisplay = [myEntry, ...data];
    } else if (data.length === 0) {
       finalDisplay = [myEntry];
    } else {
       // Highlight me if I am in the list
       finalDisplay = finalDisplay.map(p => p.callsign.includes(playerProfile.name) ? { ...p, isPlayer: true } : p);
    }

    setLeaderboardData(finalDisplay);
    setIsLoading(false);
  };

  // --- RENDER HELPERS ---
  const getRankStyle = (rank) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "rank-other";
  };

  return (
    <div className="performance-tab-container">
      {/* Navigation Tabs */}
      <div className="performance-nav">
        <button 
          className={`nav-btn ${activeView === 'PROFILE' ? 'active' : ''}`}
          onClick={() => setActiveView('PROFILE')}
        >
          <Award size={16} />
          PERSONNEL RECORD
        </button>
        <button 
          className={`nav-btn ${activeView === 'LEADERBOARD' ? 'active' : ''}`}
          onClick={() => setActiveView('LEADERBOARD')}
        >
          <TrendingUp size={16} />
          DISTRICT STANDINGS
        </button>
        <button 
          className={`nav-btn ${activeView === 'SHIFT_LOGS' ? 'active' : ''}`}
          onClick={() => setActiveView('SHIFT_LOGS')}
        >
          <FileText size={16} />
          SHIFT LOGS
        </button>
      </div>

      <div className="performance-content">
        
        {/* === VIEW 1: PROFILE (UNCHANGED) === */}
        {activeView === 'PROFILE' && (
          <div className="profile-view">
            <div className="stats-card-container">
              <div className="stats-header">
                <h3>OFFICIAL RECORD</h3>
                <span className="record-id">ID: {Math.floor(Math.random() * 90000) + 10000}</span>
              </div>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">CURRENT RANK</span>
                  <span className="stat-value">{rankData.name}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">TOTAL XP</span>
                  <span className="stat-value">{playerProfile.xpTotal.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">CAREER GPA</span>
                  <span className="stat-value highlight">
                    {Number(playerProfile.gpa || shiftStats.averageGPA || 0).toFixed(2)}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">PHILOSOPHY</span>
                  <span className="stat-value">{playerProfile.philosophy}</span>
                </div>
              </div>
              <div className="stats-footer">
                LAST UPDATED: {new Date().toLocaleDateString()}
              </div>
              <div className="stamp-overlay">OFFICIAL</div>
            </div>

            {/* Perks Section */}
            <div className="perks-section">
              <h4 className="section-title">CAREER PERKS</h4>
              <div className="perks-grid">
                {PERK_DEFINITIONS.map((perk) => {
                  const isUnlocked = unlockedPerks.includes(perk.id);
                  return (
                    <div key={perk.id} className={`perk-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                      <div className="perk-icon-wrapper">
                        {isUnlocked ? perk.icon : <Lock size={20} />}
                      </div>
                      <div className="perk-info">
                        <div className="perk-header">
                          <span className="perk-name">{perk.name}</span>
                          {isUnlocked && <CheckCircle size={14} className="check-icon" />}
                        </div>
                        <p className="perk-desc">{perk.description}</p>
                        <span className="perk-req">{perk.requirement}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* === VIEW 2: LEADERBOARD (UPDATED FOR REAL DATA) === */}
        {activeView === 'LEADERBOARD' && (
          <div className="leaderboard-view">
            
            {/* NEW: Filter Bar */}
            <div className="flex justify-between items-center p-4 border-b border-stone-200 bg-white sticky top-0 z-10">
              <div className="flex gap-2">
                {['All', 'Traditionalist', 'Progressive', 'Pragmatist'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border transition-colors ${filter === f ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button 
                onClick={loadLeaderboard} 
                disabled={isLoading} 
                className="text-stone-400 hover:text-amber-600 transition-colors p-2"
                title="Refresh Standings"
              >
                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              </button>
            </div>

            {/* Header Row */}
            <div className="leaderboard-header-row">
              <span className="col-rank">RANK</span>
              <span className="col-name">FACULTY MEMBER</span>
              <span className="col-phil">PHILOSOPHY</span>
              <span className="col-xp">XP</span>
            </div>
            
            <div className="leaderboard-list">
              {isLoading && leaderboardData.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                   <div className="inline-block w-6 h-6 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin mb-4"></div>
                   <div>Connecting to District Mainframe...</div>
                </div>
              ) : (
                leaderboardData.map((entry, idx) => (
                  <div key={idx} className={`leaderboard-row ${entry.isPlayer ? 'player-row' : ''}`}>
                    <div className="col-rank">
                      <span className={`rank-badge ${getRankStyle(entry.rank)}`}>
                        {entry.rank === '?' ? '-' : entry.rank}
                      </span>
                    </div>
                    <div className="col-name">
                      {entry.callsign}
                      {entry.isPlayer && <span className="you-indicator">(YOU)</span>}
                      {entry.rank === 1 && <Trophy size={14} className="text-amber-500 ml-2" />}
                    </div>
                    <div className="col-phil">
                      <span className={`phil-tag ${entry.philosophy ? entry.philosophy.toLowerCase() : 'pragmatist'}`}>
                        {entry.philosophy || 'Unknown'}
                      </span>
                    </div>
                    <div className="col-xp">
                        {(entry.totalXP || entry.xp || 0).toLocaleString()} 
                        <span className="text-[10px] text-stone-400 ml-1">XP</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="leaderboard-footer">
               <div className="status-indicator">
                 <span className={`status-dot ${isLoading ? 'orange' : 'green'}`}></span>
                 System Status: {isLoading ? 'Syncing...' : 'Online'}
               </div>
            </div>
          </div>
        )}

        {/* === VIEW 3: SHIFT LOGS (UNCHANGED) === */}
        {activeView === 'SHIFT_LOGS' && (
          <div className="shift-logs-view">
            <div className="shift-logs-header">
               <h2>OFFICIAL TRANSCRIPT</h2>
               <div className="subtitle">DO NOT REMOVE FROM ARCHIVES</div>
            </div>

            <div className="shift-statistics">
              <div className="stat-box">
                <span className="label">TOTAL SHIFTS</span>
                <span className="value">{shiftStats.totalShifts}</span>
              </div>
              <div className="stat-box">
                <span className="label">AVERAGE RANK</span>
                <span className="value">{shiftStats.averageRank}</span>
              </div>
              <div className="stat-box">
                <span className="label">AVERAGE GPA</span>
                <span className="value">{shiftStats.averageGPA}</span>
              </div>
              <div className="stat-box">
                <span className="label">F-RANK SHIFTS</span>
                <span className="value text-red-700">{shiftStats.fRankCount}</span>
              </div>
              {shiftStats.crisisCount > 0 && (
                 <div className="stat-box">
                    <span className="label text-orange-700">CRISIS EVENTS</span>
                    <span className="value text-orange-700">{shiftStats.crisisCount}</span>
                 </div>
              )}
            </div>

            {shiftHistoryList.length === 0 ? (
               <div className="shift-logs-empty">
                  <h3>No records found.</h3>
                  <p>Faculty member is unproven.</p>
               </div>
            ) : (
               <div className="shift-logs-table">
                  <div className="shift-log-row header">
                     <div className="col-date">DATE</div>
                     <div className="col-assign">ASSIGNMENT</div>
                     <div className="col-perf">PERFORMANCE</div>
                     <div className="col-notes">NOTES</div>
                  </div>
                  <div className="shift-log-list">
                    {shiftHistoryList.map((log) => (
                      <div 
                        key={log.id} 
                        className={`shift-log-row ${log.finalRank === 'F' ? 'failure' : ''} ${log.crisisEncountered ? 'crisis' : ''}`}
                      >
                         <div className="col-date">Day {log.dayNumber}</div>
                         <div className="col-assign">{log.gradeLevel}</div>
                         <div className="col-perf">
                            <span className={`rank-letter rank-${log.finalRank}`}>{log.finalRank}</span>
                            <span className="gpa-small">{log.finalGPA.toFixed(1)}</span>
                         </div>
                         <div className="col-notes">
                            {log.crisisEncountered && (
                              <span className="crisis-badge">{log.crisisEncountered}</span>
                            )}
                            <span className="notes-text">{log.notes}</span>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            )}
            
            <div className="shift-logs-footer">
               Disclaimer: These records are permanent and will be used during your annual tenure review.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceTab;