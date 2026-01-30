
import React, { useState } from 'react';
import { Award, TrendingUp, Lock, CheckCircle, Shield, Eye, ShoppingCart, Coffee, Star, FileText } from 'lucide-react';
import { RANK_CONFIG } from '@/lib/GameLogic';
import './PerformanceTab.css';
import { LeaderboardService } from '@/lib/LeaderboardService';
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

const MOCK_LEADERBOARD = [
  { rank: 1, callsign: 'Mrs. Krabappel', xp: 14500, philosophy: 'Traditionalist' },
  { rank: 2, callsign: 'Mr. Feeny', xp: 13200, philosophy: 'Pragmatist' },
  { rank: 3, callsign: 'Ms. Frizzle', xp: 12850, philosophy: 'Progressive' },
  { rank: 4, callsign: 'Mr. Miyagi', xp: 11500, philosophy: 'Traditionalist' },
  { rank: 5, callsign: 'Dewey Finn', xp: 9800, philosophy: 'Progressive' },
  { rank: 6, callsign: 'Ms. Honey', xp: 9200, philosophy: 'Progressive' },
  { rank: 7, callsign: 'Mr. Garvey', xp: 8750, philosophy: 'Pragmatist' },
  { rank: 8, callsign: 'Cameron Diaz', xp: 7400, philosophy: 'Traditionalist' },
  { rank: 9, callsign: 'Mr. Kotter', xp: 6200, philosophy: 'Pragmatist' },
  { rank: 10, callsign: 'Ben Stein', xp: 5100, philosophy: 'Traditionalist' }
];

const PerformanceTab = ({ playerProfile, unlockedPerks = [], shiftHistory }) => {
  const [activeView, setActiveView] = useState('PROFILE');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // New State for Real Data
  const [leaderboardData, setLeaderboardData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  const rankData = RANK_CONFIG[playerProfile.currentRank] || RANK_CONFIG[0];

  // --- NEW: Fetch Real Data when tab is opened ---
  useEffect(() => {
    if (activeView === 'LEADERBOARD') {
      setIsLoading(true);
      
      LeaderboardService.fetchLeaderboard()
        .then((data) => {
          // Map the Service format (totalXP) to this component's format (xp)
          const formatted = data.map(item => ({
             ...item,
             xp: item.totalXP // Fix variable name mismatch
          }));
          setLeaderboardData(formatted);
        })
        .finally(() => setIsLoading(false));
    }
  }, [activeView]);

  // --- MERGE LOGIC ---
  // If we have real data, use it. Otherwise fallback to Mock.
  const sourceData = leaderboardData.length > 0 ? leaderboardData : MOCK_LEADERBOARD;

  // Check if player is already in the top list (by matching name/callsign)
  const playerInTop = sourceData.some(entry => entry.callsign === playerProfile.name);

  let displayLeaderboard = [...sourceData];

  // If player isn't in the fetched list, force add them so they can compare
  if (!playerInTop) {
    displayLeaderboard.push({
      rank: 999, // Temporary rank until sorted
      callsign: playerProfile.name || 'YOU',
      xp: playerProfile.xpTotal,
      philosophy: playerProfile.philosophy,
      isPlayer: true
    });
  } else {
    // Mark the player's entry so we can highlight it
    displayLeaderboard = displayLeaderboard.map(entry => 
      entry.callsign === playerProfile.name ? { ...entry, isPlayer: true } : entry
    );
  }

  // Sort by XP (Highest First) and Re-Rank
  displayLeaderboard = displayLeaderboard
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10) // Top 10 only
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  // ... Rest of your render logic ...

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
        {activeView === 'PROFILE' && (
          <div className="profile-view">
            {/* Stats Card */}
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
    {/* Force conversion to Number to prevent .toFixed string crash */}
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

      {activeView === 'LEADERBOARD' && (
          <div className="leaderboard-view">
            {/* 1. The Header Row (Same as before) */}
            <div className="leaderboard-header-row">
              <span className="col-rank">RANK</span>
              <span className="col-name">FACULTY MEMBER</span>
              <span className="col-phil">PHILOSOPHY</span>
              <span className="col-xp">XP</span>
            </div>
            
            <div className="leaderboard-list">
              {/* 2. THE NEW PART: Check if Loading */}
              {isLoading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                   {/* Simple CSS Spinner */}
                   <div style={{ 
                       display: 'inline-block',
                       width: '20px', 
                       height: '20px', 
                       border: '3px solid #ccc', 
                       borderTop: '3px solid #333', 
                       borderRadius: '50%', 
                       animation: 'spin 1s linear infinite',
                       marginBottom: '10px'
                   }}></div>
                   <div>Contacting District Mainframe...</div>
                   <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
              ) : (
                /* 3. THE DATA PART: Use 'displayLeaderboard' instead of 'finalLeaderboard' */
                displayLeaderboard.map((entry) => (
                  <div key={entry.rank} className={`leaderboard-row ${entry.isPlayer ? 'player-row' : ''}`}>
                    <div className="col-rank">
                      <span className={`rank-badge rank-${entry.rank <= 3 ? entry.rank : 'other'}`}>
                        {entry.rank}
                      </span>
                    </div>
                    <div className="col-name">
                      {entry.callsign}
                      {entry.isPlayer && <span className="you-indicator">(YOU)</span>}
                    </div>
                    <div className="col-phil">
                      <span className={`phil-tag ${entry.philosophy ? entry.philosophy.toLowerCase() : 'pragmatist'}`}>
                        {entry.philosophy || 'Unknown'}
                      </span>
                    </div>
                    <div className="col-xp">{entry.xp.toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>

            <div className="leaderboard-footer">
               <div className="status-indicator">
                 <span className={`status-dot ${isLoading ? 'orange' : 'green'}`}></span>
                 System Status: {isLoading ? 'Syncing...' : 'Online'}
               </div>
               <p className="motivational-text">"Excellence is not an act, but a habit."</p>
            </div>
          </div>
        )}

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
                <span className="label">TOTAL XP</span>
                <span className="value">{shiftStats.totalXP}</span>
              </div>
              <div className="stat-box">
                <span className="label">S-RANK SHIFTS</span>
                <span className="value">{shiftStats.sRankCount}</span>
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
                         <div className="col-date" data-label="DATE">
                            Day {log.dayNumber}
                         </div>
                         <div className="col-assign" data-label="ASSIGNMENT">
                            {log.gradeLevel}
                         </div>
                         <div className="col-perf" data-label="PERFORMANCE">
                            <span className={`rank-letter rank-${log.finalRank}`}>{log.finalRank}</span>
                            <span className="gpa-small">{log.finalGPA.toFixed(1)}</span>
                         </div>
                         <div className="col-notes" data-label="NOTES">
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
