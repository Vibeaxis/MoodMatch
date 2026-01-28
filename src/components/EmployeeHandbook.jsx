import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, AlertTriangle, Package, GraduationCap, ShieldAlert, Users, Search, Briefcase, CheckCircle, ChevronLeft } from 'lucide-react';
import { STUDENT_ARCHETYPES } from '@/lib/StudentData';
import { getRandomContracts, getDifficultyColor } from '@/lib/StipendData';
import './EmployeeHandbook.css';

const EmployeeHandbook = ({ 
  isOpen, 
  onClose, 
  stipendState = {}, 
  onSignContract, 
  onAbandonContract,
  onClaimReward 
}) => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [availableContracts, setAvailableContracts] = useState([]);

  // Generate contracts once
  useEffect(() => {
    if (availableContracts.length === 0) {
      setAvailableContracts(getRandomContracts(3));
    }
  }, []);

  // Reset student selection when tab changes to avoid getting stuck
  useEffect(() => {
    if (activeTab !== 'taxonomy') {
        setSelectedStudent(null);
    }
  }, [activeTab]);

  const tabs = [
    { id: 'onboarding', label: 'Onboarding', icon: <Book size={18} /> },
    { id: 'assessment', label: 'Assessment', icon: <GraduationCap size={18} /> },
    { id: 'taxonomy', label: 'Student Taxonomy', icon: <Users size={18} /> },
    { id: 'supply', label: 'Supply Chain', icon: <Package size={18} /> },
    { id: 'emergency', label: 'Emergency', icon: <ShieldAlert size={18} /> },
    { id: 'extra_duty', label: 'Extra Duty', icon: <Briefcase size={18} /> }
  ];

  const handleClaim = () => {
    if (onClaimReward) onClaimReward();
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'onboarding':
        return (
          <div className="handbook-section">
            <h3>Daily Shift Overview</h3>
            <p>Welcome to the Faculty. Your primary objective is to maintain classroom stability through the strategic deployment of educational activities.</p>
            
            <h4>Matching Protocol</h4>
            <p>Each student group presents a specific <strong>Need</strong>. You must play a matching Activity Card to resolve the situation effectively.</p>
            
            <h4>Mandatory Compliance</h4>
            <ul>
              <li><strong>Directives:</strong> Daily constraints issued by Administration.</li>
              <li><strong>Stamina:</strong> Your energy is finite. Coffee consumption is authorized.</li>
              <li><strong>Streak:</strong> Consecutive successes build momentum.</li>
            </ul>
          </div>
        );
      case 'assessment':
        return (
          <div className="handbook-section">
             <h3>Grading Scale</h3>
            <div className="grade-table">
              <div className="grade-row s-rank"><span className="grade">S</span><span className="desc">Exemplary. Exceeds expectations.</span></div>
              <div className="grade-row a-rank"><span className="grade">A</span><span className="desc">Satisfactory. Keep it up.</span></div>
              <div className="grade-row b-rank"><span className="grade">B</span><span className="desc">Average. Unremarkable.</span></div>
              <div className="grade-row c-rank"><span className="grade">C</span><span className="desc">Substandard. Improvement needed.</span></div>
              <div className="grade-row d-rank"><span className="grade">D</span><span className="desc">Probationary territory.</span></div>
              <div className="grade-row f-rank"><span className="grade">F</span><span className="desc">Catastrophic failure.</span></div>
            </div>
            <h4>Combo Streaks</h4>
            <p>Maintaining a high grade streak unlocks multipliers. One failure resets the counter.</p>
          </div>
        );
      case 'taxonomy':
         return (
          // Added 'mobile-view' and conditional 'show-detail' class
          <div className={`taxonomy-container mobile-view ${selectedStudent ? 'show-detail' : ''}`}>
            
            {/* Left Pane: List */}
            <div className="taxonomy-list">
              <div className="taxonomy-list-header">
                <span>KNOWN ENTITIES</span>
                <small>{STUDENT_ARCHETYPES.length} RECORDS</small>
              </div>
              <div className="taxonomy-list-items">
                {STUDENT_ARCHETYPES.map((student) => (
                  <div 
                    key={student.id}
                    className={`taxonomy-list-item ${selectedStudent?.id === student.id ? 'active' : ''}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="item-name">{student.name}</div>
                    <div className="taxonomy-risk-badge" style={{ backgroundColor: student.riskColor }}>
                      {student.riskLevel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pane: Dossier */}
            <div className="taxonomy-dossier">
              {/* Mobile Back Button - Only visible via CSS when in detail view */}
              <div className="md:hidden p-4 bg-stone-100 border-b border-stone-200">
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="flex items-center gap-2 text-stone-600 font-bold uppercase text-sm"
                  >
                    <ChevronLeft size={16} /> Back to Index
                  </button>
              </div>

              {selectedStudent ? (
                <div className="dossier-content">
                  <div className="dossier-header">
                    <div>
                        <h3>{selectedStudent.name}</h3>
                        <div className="dossier-id">ID: {selectedStudent.id.replace('ARCHETYPE_', 'STD-')}</div>
                    </div>
                    <div className="top-secret-stamp">TOP SECRET</div>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Risk Assessment</div>
                    <div className="dossier-risk-display">
                      <div className="dossier-risk-badge" style={{ 
                        backgroundColor: selectedStudent.riskColor,
                        display: 'inline-block',
                        padding: '4px 8px',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        marginBottom: '8px'
                      }}>
                        {selectedStudent.riskLevel}
                      </div>
                      <p className="dossier-text">{selectedStudent.description}</p>
                    </div>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Profile Data</div>
                    <p className="dossier-text"><strong>Weakness:</strong> {selectedStudent.weakness}</p>
                    <p className="dossier-text"><strong>Behavior:</strong> {selectedStudent.behavior}</p>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Preferences</div>
                    <div className="activity-group mb-2">
                      <span className="text-xs font-bold text-stone-400 uppercase">Preferred:</span>
                      <div className="activity-tags">
                        {selectedStudent.activityPreference.map((act, i) => (
                          <span key={i} className="activity-tag preferred">{act}</span>
                        ))}
                      </div>
                    </div>
                    <div className="activity-group">
                      <span className="text-xs font-bold text-stone-400 uppercase">Avoid:</span>
                      <div className="activity-tags">
                        {selectedStudent.activityAvoidance.map((act, i) => (
                          <span key={i} className="activity-tag avoid">{act}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="dossier-empty hidden md:flex">
                  <Search size={48} opacity={0.2} />
                  <div className="empty-stamp">SELECT SUBJECT<br/>FOR REVIEW</div>
                </div>
              )}
            </div>
          </div>
        );
      case 'supply':
        return (
          <div className="handbook-section">
            <h3>Authorized Resources</h3>
            <p>The Supply Closet is available for requisitions, provided you have sufficient Streak currency.</p>
            <ul>
              <li><strong>Coffee:</strong> Restores reroll capability.</li>
              <li><strong>Rerolls:</strong> Allows for redrawing of Activity Cards.</li>
              <li><strong>Decor:</strong> Improves morale.</li>
            </ul>
          </div>
        );
      case 'emergency':
        return (
          <div className="handbook-section">
             <h3>Crisis Response Strategy</h3>
            <p>Random events (CRISIS) may occur that alter gameplay mechanics.</p>
            <h4>Crisis Categories</h4>
            <ul>
              <li><strong>Facility:</strong> Power outages, floods.</li>
              <li><strong>Personnel:</strong> Staff strikes, flu outbreaks.</li>
              <li><strong>Student:</strong> Pranks, sugar rushes.</li>
            </ul>
          </div>
        );
      case 'extra_duty':
        return (
          <div className="extra-duty-content pb-20">
            {!stipendState.activeContract ? (
              <>
                <div className="extra-duty-header mb-6">
                  <h2 className="text-2xl font-black text-stone-800">HELP WANTED</h2>
                  <p className="text-stone-500">Voluntary assignments for ambitious faculty.</p>
                </div>
                <div className="contracts-grid">
                  {availableContracts.map((contract) => (
                    <div key={contract.id} className="contract-card">
                      <div className="contract-header">
                        <span className="contract-title">{contract.title}</span>
                        <span className="contract-difficulty" style={{ backgroundColor: getDifficultyColor(contract.difficulty) }}>
                          {contract.difficulty}
                        </span>
                      </div>
                      <div className="contract-content">
                        <p className="contract-description">{contract.description}</p>
                        <div className="contract-requirements mt-4">
                            <div className="requirement-item">
                                <span className="requirement-label">REWARD:</span>
                                <span className="requirement-value" style={{color: '#166534'}}>{contract.rewardXP} XP</span>
                            </div>
                        </div>
                      </div>
                      <button className="contract-sign-btn" onClick={() => onSignContract && onSignContract(contract.id)}>
                        SIGN CONTRACT
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="active-contract-container">
                <div className="extra-duty-header mb-6">
                  <h2 className="text-2xl font-black text-stone-800">ACTIVE ASSIGNMENT</h2>
                </div>
                <div className="active-contract-card">
                  <div className="active-contract-header">
                    <h3 className="active-contract-title font-bold">{stipendState.activeContract.title}</h3>
                    <div className={`text-xs font-bold px-2 py-1 rounded bg-stone-700`}>
                      {stipendState.isComplete ? 'COMPLETED' : 'IN PROGRESS'}
                    </div>
                  </div>
                  <div className="active-contract-details">
                      <p className="text-sm italic text-stone-500 mb-4">"{stipendState.activeContract.flavor}"</p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-stone-200 rounded-full h-4 mb-2">
                        <div 
                            className="bg-amber-500 h-4 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, (stipendState.progress / stipendState.activeContract.count) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs font-bold text-stone-500 mb-4">
                        <span>PROGRESS</span>
                        <span>{stipendState.progress} / {stipendState.activeContract.count}</span>
                      </div>

                      <div className="active-contract-actions flex gap-2">
                        {stipendState.isComplete ? (
                          <button className="contract-sign-btn bg-green-700 hover:bg-green-600" onClick={handleClaim}>
                            CLAIM REWARD
                          </button>
                        ) : (
                          <button className="abandon-btn" onClick={() => onAbandonContract && onAbandonContract()}>
                            ABANDON CONTRACT
                          </button>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="relative w-full h-[95dvh] md:h-[90vh] md:max-w-6xl bg-[#EBE7E0] shadow-2xl flex flex-col overflow-hidden rounded-t-xl md:rounded-sm border-x md:border-4 border-stone-900"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-stone-900 text-white p-4 flex justify-between items-center shadow-lg shrink-0">
              <div className="flex flex-col">
                <h2 className="text-lg font-black uppercase tracking-tighter leading-none flex items-center gap-2">
                    <Book size={20} className="text-amber-500" /> Employee Handbook
                </h2>
                <span className="text-[10px] text-stone-400 font-mono tracking-widest mt-1">District Reg. 44-B // Eyes Only</span>
              </div>
              <button onClick={onClose} className="hover:rotate-90 transition-transform p-2 bg-stone-800 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Responsive Navigation Tabs - Horizontal Scroll on Mobile */}
              <nav className="shrink-0 bg-stone-800 flex md:flex-col overflow-x-auto no-scrollbar md:w-48 border-b md:border-b-0 md:border-r border-stone-700 shadow-xl z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center gap-3 p-4 md:p-5 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap
                      ${activeTab === tab.id 
                        ? 'bg-[#EBE7E0] text-stone-900 shadow-[0_-4px_0_inset_#f59e0b] md:shadow-[-4px_0_0_inset_#f59e0b]' 
                        : 'text-stone-400 hover:text-stone-100 hover:bg-stone-700/50'}`}
                  >
                    {tab.icon}
                    <span className="inline">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Content Area */}
              <main className="flex-1 overflow-hidden flex flex-col bg-[#FDFBF7] relative">
                <div className="flex-1 overflow-y-auto p-4 md:p-10 md:pl-16 relative">
                    {renderContent()}
                </div>

                {/* Footer Decal - Hidden on very small screens if needed, or kept simple */}
                <div className="p-4 md:p-6 border-t border-stone-200 bg-stone-50 flex justify-between items-center shrink-0 safe-area-bottom">
                  <div className="hidden md:flex font-handwriting text-stone-400 flex-col leading-none">
                    <span className="text-xl">X _______________________</span>
                  </div>
                  <button onClick={onClose} className="w-full md:w-auto px-8 py-3 bg-stone-900 text-white font-black uppercase text-xs tracking-widest hover:bg-amber-600 transition-colors shadow-lg">
                    Close Handbook
                  </button>
                </div>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeHandbook;