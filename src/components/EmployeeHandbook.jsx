
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, AlertTriangle, Package, GraduationCap, ShieldAlert, Users, Search, Briefcase, CheckCircle } from 'lucide-react';
import { STUDENT_ARCHETYPES } from '@/lib/StudentData';
import { getRandomContracts, getDifficultyColor } from '@/lib/StipendData';
import './EmployeeHandbook.css';

const EmployeeHandbook = ({ 
  isOpen, 
  onClose, 
  stipendState = {}, // { activeContract, progress, isComplete }
  onSignContract, 
  onAbandonContract,
  onClaimReward // Function to call when claiming reward
}) => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [availableContracts, setAvailableContracts] = useState([]);

  // Generate random contracts only once when component mounts or when tab opens if empty
  useEffect(() => {
    if (availableContracts.length === 0) {
      setAvailableContracts(getRandomContracts(3));
    }
  }, []);

  const tabs = [
    { id: 'onboarding', label: 'Onboarding', icon: <Book size={18} /> },
    { id: 'assessment', label: 'Assessment', icon: <GraduationCap size={18} /> },
    { id: 'taxonomy', label: 'Student Taxonomy', icon: <Users size={18} /> },
    { id: 'supply', label: 'Supply Chain', icon: <Package size={18} /> },
    { id: 'emergency', label: 'Emergency', icon: <ShieldAlert size={18} /> },
    { id: 'extra_duty', label: 'Extra Duty', icon: <Briefcase size={18} /> }
  ];

  const handleClaim = () => {
    if (onClaimReward) {
      onClaimReward();
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'onboarding':
        return (
          <div className="handbook-section">
            <h3>Daily Shift Overview</h3>
            <p>Welcome to the Faculty. Your primary objective is to maintain classroom stability through the strategic deployment of educational activities. Failure to do so will result in administrative action.</p>
            
            <h4>Matching Protocol</h4>
            <p>Each student group presents a specific <strong>Need</strong> (Kinetic, Media, Lecture, etc.). You must play a matching Activity Card to resolve the situation effectively. Mismatched activities result in suboptimal outcomes and potential chaos.</p>
            
            <h4>Mandatory Compliance</h4>
            <ul>
              <li><strong>Directives:</strong> Daily constraints issued by Administration. Compliance rewards XP.</li>
              <li><strong>Stamina:</strong> Your energy is finite. Coffee consumption is authorized but limited.</li>
              <li><strong>Streak:</strong> Consecutive successes build momentum. Do not break the chain.</li>
            </ul>
          </div>
        );
      case 'assessment':
        return (
          <div className="handbook-section">
             <h3>Grading Scale</h3>
            <div className="grade-table">
              <div className="grade-row s-rank">
                <span className="grade">S</span>
                <span className="desc">Exemplary. Exceeds expectations. Rare.</span>
              </div>
              <div className="grade-row a-rank">
                <span className="grade">A</span>
                <span className="desc">Satisfactory. Keep it up.</span>
              </div>
              <div className="grade-row b-rank">
                <span className="grade">B</span>
                <span className="desc">Average. Unremarkable.</span>
              </div>
              <div className="grade-row c-rank">
                <span className="grade">C</span>
                <span className="desc">Substandard. Improvement needed.</span>
              </div>
              <div className="grade-row d-rank">
                <span className="grade">D</span>
                <span className="desc">Probationary territory.</span>
              </div>
              <div className="grade-row f-rank">
                <span className="grade">F</span>
                <span className="desc">Catastrophic failure. Immediate intervention required.</span>
              </div>
            </div>

            <h4>Combo Streaks</h4>
            <p>Maintaining a high grade streak unlocks multipliers. One failure resets the counter to zero. Consistency is the hallmark of a tenured professional.</p>
          </div>
        );
      case 'taxonomy':
         return (
          <div className="taxonomy-container">
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
              {selectedStudent ? (
                <div className="dossier-content">
                  <div className="dossier-header">
                    <h3>{selectedStudent.name}</h3>
                    <div className="dossier-id">ID: {selectedStudent.id.replace('ARCHETYPE_', 'STD-')}</div>
                    <div className="top-secret-stamp">TOP SECRET</div>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Risk Assessment</div>
                    <div className="dossier-risk-display">
                      <div className="dossier-risk-badge" style={{ backgroundColor: selectedStudent.riskColor }}>
                        {selectedStudent.riskLevel}
                      </div>
                      <p className="dossier-text">{selectedStudent.description}</p>
                    </div>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Profile Data</div>
                    <p className="dossier-text"><strong>Identified Weakness:</strong> {selectedStudent.weakness}</p>
                    <p className="dossier-text"><strong>Observed Behavior:</strong> {selectedStudent.behavior}</p>
                    <p className="dossier-text"><strong>Recommended Intervention:</strong> {selectedStudent.interventionStrategy}</p>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Activity Preferences</div>
                    
                    <div className="activity-group">
                      <span className="group-label">Preferred:</span>
                      <div className="activity-tags">
                        {selectedStudent.activityPreference.map((act, i) => (
                          <span key={i} className="activity-tag preferred">{act}</span>
                        ))}
                      </div>
                    </div>

                    <div className="activity-group">
                      <span className="group-label">Avoid:</span>
                      <div className="activity-tags">
                        {selectedStudent.activityAvoidance.map((act, i) => (
                          <span key={i} className="activity-tag avoid">{act}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="dossier-section">
                     <div className="dossier-section-title">Streak Impact</div>
                     <p className="dossier-text">{selectedStudent.streakImpact}</p>
                  </div>

                  <div className="dossier-section">
                    <div className="dossier-section-title">Observation Notes</div>
                    <div className="dossier-notes">
                      "{selectedStudent.observationNotes}"
                    </div>
                  </div>

                  <div className="dossier-footer">
                     <div className="redacted-bar"></div>
                     <small>CLASSIFIED - DISTRICT LEVEL 4 CLEARANCE REQUIRED</small>
                  </div>

                </div>
              ) : (
                <div className="dossier-empty">
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
            <p>The Supply Closet is available for requisitions, provided you have sufficient Streak currency. Budget cuts mean nothing is free.</p>
            
            <h4>Resource List</h4>
            <ul>
              <li><strong>Coffee:</strong> Restores reroll capability. Maximum 1 per shift initially.</li>
              <li><strong>Rerolls:</strong> Allows for redrawing of Activity Cards. Use sparingly.</li>
              <li><strong>Decor:</strong> Improves morale. Functionally useless, emotionally vital.</li>
            </ul>
            
            <div className="warning-box">
              <AlertTriangle size={16} />
              <span>NOTE: Unused budget does not rollover. Use it or lose it.</span>
            </div>
          </div>
        );
      case 'emergency':
        return (
          <div className="handbook-section">
             <h3>Crisis Response Strategy</h3>
            <p>The school environment is volatile. Random events (CRISIS) may occur that alter gameplay mechanics. Preparedness is mandatory.</p>
            
            <h4>Crisis Categories</h4>
            <ul>
              <li><strong>Facility:</strong> Power outages, floods, HVAC failure.</li>
              <li><strong>Personnel:</strong> Staff strikes, flu outbreaks, "personal days".</li>
              <li><strong>Student:</strong> Pranks, sugar rushes, emotional outbursts.</li>
            </ul>
            
            <h4>Escalation Protocol</h4>
            <p>In the event of a Crisis, normal rules may be suspended. Certain card types may be disabled. Adaptability is not just a soft skill; it is a survival trait.</p>
          </div>
        );
      case 'extra_duty':
        return (
          <div className="extra-duty-content">
            {!stipendState.activeContract ? (
              <>
                <div className="extra-duty-header">
                  <h2 className="extra-duty-title">HELP WANTED</h2>
                  <p className="extra-duty-subtitle">Voluntary assignments for ambitious faculty. Additional compensation provided upon completion.</p>
                </div>
                <div className="contracts-grid">
                  {availableContracts.map((contract) => (
                    <div key={contract.id} className="contract-card">
                      <div className="contract-header">
                        <span className="contract-title">{contract.title}</span>
                        <span 
                          className="contract-difficulty" 
                          style={{ backgroundColor: getDifficultyColor(contract.difficulty) }}
                        >
                          {contract.difficulty}
                        </span>
                      </div>
                      <div className="contract-content">
                        <p className="contract-description">{contract.description}</p>
                        <p className="contract-flavor">"{contract.flavor}"</p>
                        <div className="contract-requirements">
                          <div className="requirement-item">
                            <span className="requirement-label">OBJECTIVE:</span>
                            <span className="requirement-value">{contract.objectiveType.replace(/_/g, ' ')}</span>
                          </div>
                          <div className="requirement-item">
                            <span className="requirement-label">TARGET:</span>
                            <span className="requirement-value">{contract.count}x</span>
                          </div>
                          <div className="requirement-item">
                            <span className="requirement-label">REWARD:</span>
                            <span className="requirement-value" style={{color: '#166534'}}>{contract.rewardXP} XP</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="contract-sign-btn"
                        onClick={() => onSignContract && onSignContract(contract.id)}
                      >
                        SIGN CONTRACT
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="active-contract-container">
                <div className="extra-duty-header">
                  <h2 className="extra-duty-title">PERFORMANCE REVIEW</h2>
                  <p className="extra-duty-subtitle">Current assignment status and tracking.</p>
                </div>
                
                <div className="active-contract-card">
                  <div className="active-contract-header">
                    <h3 className="active-contract-title">{stipendState.activeContract.title}</h3>
                    <div className={`contract-status-stamp ${stipendState.isComplete ? 'completed' : 'in-progress'}`}>
                      {stipendState.isComplete ? 'COMPLETED' : 'IN PROGRESS'}
                    </div>
                  </div>

                  <div className="active-contract-details">
                     <p className="contract-flavor-text">"{stipendState.activeContract.flavor}"</p>
                     
                     <div className="progress-section">
                        <div className="progress-header">
                           <span className="progress-label">PROGRESS</span>
                           <span className="progress-count">
                             {stipendState.progress} / {stipendState.activeContract.count}
                           </span>
                        </div>
                        <div className="progress-bar-container">
                           <div 
                             className="progress-bar-fill"
                             style={{ width: `${Math.min(100, (stipendState.progress / stipendState.activeContract.count) * 100)}%` }}
                           />
                        </div>
                     </div>

                     <div className="objective-details">
                        <div className="objective-item">
                           <span className="objective-label">TASK DESCRIPTION</span>
                           <span className="objective-value">{stipendState.activeContract.description}</span>
                        </div>
                        <div className="objective-item">
                           <span className="objective-label">COMPENSATION</span>
                           <span className="objective-value">{stipendState.activeContract.rewardXP} XP</span>
                        </div>
                     </div>

                     {stipendState.isComplete && (
                       <div className="completion-notice">
                         <div className="completion-stamp">PAYMENT PENDING</div>
                         <p className="completion-text">Objective verified. Funds ready for disbursement.</p>
                       </div>
                     )}
                  </div>

                  <div className="active-contract-actions">
                    {stipendState.isComplete ? (
                      <button 
                        className="contract-sign-btn" 
                        style={{ backgroundColor: '#15803d' }}
                        onClick={handleClaim}
                      >
                        CLAIM REWARD
                      </button>
                    ) : (
                      <button 
                        className="abandon-btn"
                        onClick={() => onAbandonContract && onAbandonContract()}
                      >
                        ABANDON CONTRACT
                      </button>
                    )}
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8">
          <motion.div 
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="relative w-full h-full md:h-[90vh] md:max-w-6xl bg-[#EBE7E0] shadow-2xl flex flex-col overflow-hidden md:rounded-sm border-x md:border-4 border-stone-900"
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
              
              {/* Responsive Navigation Tabs */}
              <nav className="shrink-0 bg-stone-800 flex md:flex-col overflow-x-auto no-scrollbar md:w-48 border-b md:border-b-0 md:border-r border-stone-700 shadow-xl z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 p-4 md:p-5 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap
                      ${activeTab === tab.id 
                        ? 'bg-[#EBE7E0] text-stone-900 shadow-[4px_0_0_inset_#f59e0b] md:shadow-[-4px_0_0_inset_#f59e0b]' 
                        : 'text-stone-400 hover:text-stone-100 hover:bg-stone-700/50'}`}
                  >
                    {tab.icon}
                    <span className="md:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Content Area */}
              <main className="flex-1 overflow-hidden flex flex-col bg-[#FDFBF7] relative">
                {/* Visual Binder Rings (Desktop Only) */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-300 to-transparent pointer-events-none z-20" />
                
                <div className="flex-1 overflow-y-auto p-6 md:p-10 md:pl-16 relative">
                    {renderContent()}
                </div>

                {/* Footer Decal */}
                <div className="p-6 border-t border-stone-200 bg-stone-50 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
                  <div className="font-handwriting text-stone-400 flex flex-col leading-none">
                    <span className="text-xl">X _______________________</span>
                    <small className="text-[10px] mt-1 font-sans font-bold uppercase tracking-widest">Acknowledge receipt of information</small>
                  </div>
                  <button onClick={onClose} className="w-full md:w-auto px-8 py-3 bg-stone-900 text-white font-black uppercase text-xs tracking-widest hover:bg-amber-600 transition-colors shadow-lg">
                    I Acknowledge & Close
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