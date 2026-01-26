import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, AlertTriangle, Package, GraduationCap, ShieldAlert, Users, Search, Briefcase, ChevronLeft, CheckCircle } from 'lucide-react';
import { STUDENT_ARCHETYPES } from '@/lib/StudentData';
import { getRandomContracts, getDifficultyColor } from '@/lib/StipendData';

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

  useEffect(() => {
    if (availableContracts.length === 0) {
      setAvailableContracts(getRandomContracts(3));
    }
  }, [availableContracts.length]);

  const tabs = [
    { id: 'onboarding', label: 'Onboarding', icon: <Book size={18} /> },
    { id: 'assessment', label: 'Assessment', icon: <GraduationCap size={18} /> },
    { id: 'taxonomy', label: 'Taxonomy', icon: <Users size={18} /> },
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
          <div className="handbook-section space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-stone-200 pb-1">Daily Shift Overview</h3>
            <p className="text-stone-700">Welcome to the Faculty. Your primary objective is to maintain classroom stability through the strategic deployment of educational activities. Failure to do so will result in administrative action.</p>
            
            <h4 className="font-bold text-stone-800 mt-6">Matching Protocol</h4>
            <p className="text-stone-700">Each student group presents a specific <strong>Need</strong> (Kinetic, Media, Lecture, etc.). You must play a matching Activity Card to resolve the situation effectively. Mismatched activities result in suboptimal outcomes and potential chaos.</p>
            
            <h4 className="font-bold text-stone-800 mt-6 uppercase text-xs tracking-widest">Mandatory Compliance</h4>
            <ul className="list-disc pl-5 space-y-2 text-stone-700">
              <li><strong>Directives:</strong> Daily constraints issued by Administration. Compliance rewards XP.</li>
              <li><strong>Stamina:</strong> Your energy is finite. Coffee consumption is authorized but limited.</li>
              <li><strong>Streak:</strong> Consecutive successes build momentum. Do not break the chain.</li>
            </ul>
          </div>
        );
      case 'assessment':
        return (
          <div className="handbook-section">
            <h3 className="text-xl font-bold border-b-2 border-stone-200 pb-1 mb-4">Grading Scale</h3>
            <div className="grid gap-2 mb-8">
              {[
                { g: 'S', d: 'Exemplary. Exceeds expectations. Rare.' },
                { g: 'A', d: 'Satisfactory. Keep it up.' },
                { g: 'B', d: 'Average. Unremarkable.' },
                { g: 'C', d: 'Substandard. Improvement needed.' },
                { g: 'D', d: 'Probationary territory.' },
                { g: 'F', d: 'Catastrophic failure. Immediate intervention required.' }
              ].map((item) => (
                <div key={item.g} className="flex items-center gap-4 p-3 bg-white border border-stone-200 shadow-sm">
                  <span className={`w-10 h-10 flex items-center justify-center font-black rounded-full border-2 
                    ${item.g === 'S' ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : 
                      item.g === 'F' ? 'border-red-600 text-red-600 bg-red-50' : 'border-stone-800 text-stone-800'}`}>
                    {item.g}
                  </span>
                  <span className="text-sm text-stone-600 font-serif">{item.d}</span>
                </div>
              ))}
            </div>
            <h4 className="font-bold text-stone-800">Combo Streaks</h4>
            <p className="text-stone-700 mt-2 italic text-sm">"Maintaining a high grade streak unlocks multipliers. One failure resets the counter to zero. Consistency is the hallmark of a tenured professional."</p>
          </div>
        );
      case 'taxonomy':
         return (
          <div className="flex flex-col md:flex-row h-full overflow-hidden rounded-sm border border-stone-300 bg-white">
            {/* Left Pane: List */}
            <div className={`w-full md:w-64 border-r border-stone-200 flex flex-col h-full ${selectedStudent ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-3 bg-stone-100 font-bold text-[10px] tracking-widest text-stone-500 flex justify-between uppercase">
                <span>Known Entities</span>
                <span>{STUDENT_ARCHETYPES.length} RECORDS</span>
              </div>
              <div className="overflow-y-auto flex-1">
                {STUDENT_ARCHETYPES.map((student) => (
                  <button 
                    key={student.id}
                    className={`w-full text-left p-3 border-b border-stone-100 transition-colors flex justify-between items-center hover:bg-stone-50
                        ${selectedStudent?.id === student.id ? 'bg-stone-100 border-l-4 border-l-stone-800 pl-2' : ''}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <span className="text-xs font-bold uppercase">{student.name}</span>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: student.riskColor }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Pane: Dossier (Full Data Restored) */}
            <div className={`flex-1 overflow-y-auto bg-[#FDFBF7] p-6 relative ${!selectedStudent ? 'hidden md:flex items-center justify-center' : 'block'}`}>
              {selectedStudent ? (
                <div className="max-w-lg mx-auto pb-10">
                  <button onClick={() => setSelectedStudent(null)} className="md:hidden flex items-center gap-1 text-stone-400 mb-4 text-xs font-bold"><ChevronLeft size={16} /> BACK</button>
                  <div className="border-b-2 border-stone-800 pb-2 mb-6">
                    <h3 className="text-3xl font-black uppercase text-stone-900">{selectedStudent.name}</h3>
                    <div className="text-[10px] font-mono text-stone-400">ID: {selectedStudent.id.replace('ARCHETYPE_', 'STD-')}</div>
                  </div>
                  <div className="space-y-6 text-sm text-stone-800">
                    <section>
                      <h4 className="text-[10px] font-black text-red-800 uppercase tracking-widest mb-1">Risk Assessment</h4>
                      <p className="font-serif italic border-l-4 border-stone-200 pl-4 py-1 text-base">{selectedStudent.description}</p>
                    </section>
                    <div className="grid grid-cols-1 gap-4">
                      <p><strong>Identified Weakness:</strong> {selectedStudent.weakness}</p>
                      <p><strong>Observed Behavior:</strong> {selectedStudent.behavior}</p>
                      <p><strong>Recommended Intervention:</strong> {selectedStudent.interventionStrategy}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                      <div>
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase">Preferred</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStudent.activityPreference.map((act, i) => <span key={i} className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase">{act}</span>)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase">Avoid</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStudent.activityAvoidance.map((act, i) => <span key={i} className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold uppercase">{act}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-stone-100 p-3 italic font-serif text-stone-600">"{selectedStudent.observationNotes}"</div>
                    <div className="absolute top-10 right-10 opacity-10 pointer-events-none rotate-12 border-4 border-red-600 p-2 text-red-600 font-black text-2xl">CLASSIFIED</div>
                  </div>
                </div>
              ) : (
                <div className="text-center opacity-20"><Search size={64} className="mx-auto" /><p className="mt-4 font-black uppercase tracking-widest">Select Subject</p></div>
              )}
            </div>
          </div>
        );
      case 'supply':
        return (
          <div className="handbook-section space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-stone-200 pb-1">Authorized Resources</h3>
            <p className="text-stone-700">The Supply Closet is available for requisitions, provided you have sufficient Streak currency. Budget cuts mean nothing is free.</p>
            <h4 className="font-bold text-stone-800 mt-4">Resource List</h4>
            <ul className="list-disc pl-5 space-y-3 text-stone-700">
              <li><strong>Coffee:</strong> Restores reroll capability. Maximum 1 per shift initially.</li>
              <li><strong>Rerolls:</strong> Allows for redrawing of Activity Cards. Use sparingly.</li>
              <li><strong>Decor:</strong> Improves morale. Functionally useless, emotionally vital.</li>
            </ul>
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-3">
              <AlertTriangle size={20} />
              <span className="text-sm font-bold uppercase tracking-tight">Note: Unused budget does not rollover. Use it or lose it.</span>
            </div>
          </div>
        );
      case 'emergency':
        return (
          <div className="handbook-section space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-stone-200 pb-1">Crisis Response Strategy</h3>
            <p className="text-stone-700">The school environment is volatile. Random events (CRISIS) may occur that alter gameplay mechanics. Preparedness is mandatory.</p>
            <h4 className="font-bold text-stone-800 mt-4">Crisis Categories</h4>
            <ul className="list-disc pl-5 space-y-2 text-stone-700">
              <li><strong>Facility:</strong> Power outages, floods, HVAC failure.</li>
              <li><strong>Personnel:</strong> Staff strikes, flu outbreaks, "personal days".</li>
              <li><strong>Student:</strong> Pranks, sugar rushes, emotional outbursts.</li>
            </ul>
            <h4 className="font-bold text-stone-800 mt-4">Escalation Protocol</h4>
            <p className="text-stone-700 italic border-l-4 border-red-500 pl-4">"In the event of a Crisis, normal rules may be suspended. Certain card types may be disabled. Adaptability is not just a soft skill; it is a survival trait."</p>
          </div>
        );
      case 'extra_duty':
        return (
          <div className="extra-duty-content pb-10">
            {!stipendState.activeContract ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-black uppercase text-stone-900 leading-none">Help Wanted</h2>
                  <p className="text-stone-500 text-sm mt-1">Voluntary assignments for ambitious faculty. Additional compensation provided upon completion.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableContracts.map((contract) => (
                    <div key={contract.id} className="bg-white border-2 border-stone-200 p-4 flex flex-col shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-stone-800 uppercase tracking-tighter">{contract.title}</span>
                        <span className="text-[10px] px-1 font-bold text-white uppercase" style={{ backgroundColor: getDifficultyColor(contract.difficulty) }}>{contract.difficulty}</span>
                      </div>
                      <p className="text-xs text-stone-600 mb-2 flex-1">{contract.description}</p>
                      <div className="text-[10px] font-mono text-stone-400 mb-4 border-t pt-2 italic">"{contract.flavor}"</div>
                      <div className="grid grid-cols-3 gap-2 text-[10px] font-bold mb-4">
                        <div className="flex flex-col"><span className="text-stone-400">GOAL</span>{contract.objectiveType.replace(/_/g, ' ')}</div>
                        <div className="flex flex-col"><span className="text-stone-400">TARGET</span>{contract.count}x</div>
                        <div className="flex flex-col"><span className="text-stone-400">REWARD</span><span className="text-green-700">+{contract.rewardXP} XP</span></div>
                      </div>
                      <button 
                        className="w-full py-2 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
                        onClick={() => onSignContract && onSignContract(contract.id)}
                      >SIGN CONTRACT</button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-xl mx-auto bg-white border-4 border-stone-900 p-6 relative">
                <div className="absolute top-4 right-4 opacity-20 rotate-12 border-2 border-stone-800 p-1 font-black text-stone-800">ACTIVE FILE</div>
                <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-stone-100">{stipendState.activeContract.title}</h3>
                <div className={`inline-block mb-6 px-3 py-1 text-xs font-black border-2 ${stipendState.isComplete ? 'border-green-600 text-green-600' : 'border-amber-600 text-amber-600'}`}>
                   {stipendState.isComplete ? 'COMPLETED' : 'IN PROGRESS'}
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-stone-400"><span>Progress Tracker</span><span>{stipendState.progress} / {stipendState.activeContract.count}</span></div>
                    <div className="h-4 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div className="h-full bg-stone-800 transition-all duration-500" style={{ width: `${Math.min(100, (stipendState.progress / stipendState.activeContract.count) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <p><strong>Task:</strong> {stipendState.activeContract.description}</p>
                    <p><strong>Compensation:</strong> {stipendState.activeContract.rewardXP} XP</p>
                  </div>
                  {stipendState.isComplete ? (
                    <div className="bg-green-50 p-4 border border-green-200 text-center">
                      <div className="font-black text-green-700 text-xl mb-1 uppercase">Payment Pending</div>
                      <p className="text-xs text-green-600 mb-4 tracking-tighter">Objective verified. Funds ready for disbursement.</p>
                      <button onClick={handleClaim} className="px-8 py-3 bg-green-700 text-white font-black uppercase text-xs tracking-widest hover:bg-green-800">CLAIM REWARD</button>
                    </div>
                  ) : (
                    <button onClick={() => onAbandonContract && onAbandonContract()} className="w-full py-2 text-red-500 font-bold text-[10px] hover:bg-red-50 uppercase tracking-widest transition-colors">Abandon Contract</button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8">
          <motion.div className="absolute inset-0 bg-stone-950/85 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div 
            className="relative w-full h-full md:h-[92vh] md:max-w-6xl bg-[#EBE7E0] shadow-2xl flex flex-col overflow-hidden md:rounded-sm border-x md:border-4 border-stone-900"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Fixed Header */}
            <header className="bg-stone-900 text-white p-4 flex justify-between items-center shadow-lg shrink-0">
              <div className="flex flex-col">
                <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                    <Book size={20} className="text-amber-500" /> Employee Handbook
                </h2>
                <span className="text-[10px] text-stone-400 font-mono tracking-widest mt-1">District Reg. 44-B // Eyes Only</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-transform active:scale-90"><X size={24} /></button>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Responsive Nav */}
              <nav className="shrink-0 bg-stone-800 flex md:flex-col overflow-x-auto no-scrollbar md:w-48 border-b md:border-b-0 md:border-r border-stone-700 shadow-xl z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 p-4 md:p-5 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                      ${activeTab === tab.id ? 'bg-[#EBE7E0] text-stone-900 shadow-[4px_0_0_inset_#f59e0b] md:shadow-[-4px_0_0_inset_#f59e0b]' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-700/50'}`}
                  >
                    {tab.icon} <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Main Content Pane */}
              <main className="flex-1 overflow-hidden flex flex-col bg-[#FDFBF7] relative">
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-300/30 to-transparent pointer-events-none z-20" />
                <div className="flex-1 overflow-y-auto p-6 md:p-12 md:pl-20 relative">
                    {renderContent()}
                </div>

                {/* Fixed Internal Footer */}
                <footer className="p-6 border-t border-stone-200 bg-stone-50 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
                  <div className="font-serif italic text-stone-400 flex flex-col leading-none">
                    <span className="text-xl">X _______________________</span>
                    <small className="text-[10px] mt-2 font-sans font-bold uppercase tracking-widest not-italic">Official Receipt Acknowledgement</small>
                  </div>
                  <button onClick={onClose} className="w-full md:w-auto px-10 py-3 bg-stone-900 text-white font-black uppercase text-xs tracking-widest hover:bg-amber-600 transition-colors shadow-lg active:scale-95">
                    I ACKNOWLEDGE & CLOSE
                  </button>
                </footer>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeHandbook;