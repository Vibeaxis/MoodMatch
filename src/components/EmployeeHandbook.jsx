import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Package, GraduationCap, ShieldAlert, Users, Briefcase, ChevronLeft, Search, Lock } from 'lucide-react';
import { STUDENT_ARCHETYPES } from '@/lib/StudentData';
import { getRandomContracts, getDifficultyColor } from '@/lib/StipendData';
// We are effectively bypassing the broken CSS file by using utility classes below
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

  // Reset student selection when tab changes
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
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b-2 border-stone-200 pb-2">
                <h3 className="font-serif text-3xl text-stone-900 font-bold">Daily Shift Overview</h3>
            </div>
            <p className="text-stone-700 leading-relaxed text-lg font-serif">
                Welcome to the Faculty. Your primary objective is to maintain classroom stability through the strategic deployment of educational activities.
            </p>
            
            <div className="bg-amber-50 p-6 border-l-4 border-amber-500 rounded-r-md">
                <h4 className="font-bold text-amber-900 uppercase tracking-widest text-sm mb-2">Matching Protocol</h4>
                <p className="text-amber-900/80">Each student group presents a specific <strong>Need</strong>. You must play a matching Activity Card to resolve the situation effectively.</p>
            </div>
            
            <div>
                <h4 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-3 border-b border-stone-200 pb-1">Mandatory Compliance</h4>
                <ul className="list-disc pl-5 space-y-2 text-stone-700 marker:text-amber-600">
                  <li><strong>Directives:</strong> Daily constraints issued by Administration.</li>
                  <li><strong>Stamina:</strong> Your energy is finite. Coffee consumption is authorized.</li>
                  <li><strong>Streak:</strong> Consecutive successes build momentum.</li>
                </ul>
            </div>
          </div>
        );

      case 'assessment':
        return (
          <div className="max-w-2xl mx-auto">
             <div className="border-b-2 border-stone-200 pb-2 mb-6">
                <h3 className="font-serif text-3xl text-stone-900 font-bold">Grading Scale</h3>
             </div>
             
             <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden mb-8">
                 {[
                    { grade: 'S', desc: 'Exemplary. Exceeds expectations.', bg: 'bg-yellow-100', text: 'text-yellow-700' },
                    { grade: 'A', desc: 'Satisfactory. Keep it up.', bg: 'bg-green-100', text: 'text-green-700' },
                    { grade: 'B', desc: 'Average. Unremarkable.', bg: 'bg-blue-100', text: 'text-blue-700' },
                    { grade: 'C', desc: 'Substandard. Improvement needed.', bg: 'bg-stone-100', text: 'text-stone-600' },
                    { grade: 'D', desc: 'Probationary territory.', bg: 'bg-orange-100', text: 'text-orange-700' },
                    { grade: 'F', desc: 'Catastrophic failure.', bg: 'bg-red-100', text: 'text-red-700' },
                 ].map((row) => (
                     <div key={row.grade} className="flex items-center border-b border-stone-100 last:border-0 p-3">
                         <div className={`w-10 h-10 ${row.bg} ${row.text} font-black text-xl flex items-center justify-center rounded mr-4 shrink-0`}>
                             {row.grade}
                         </div>
                         <span className="text-stone-600 font-serif">{row.desc}</span>
                     </div>
                 ))}
             </div>
             
             <h4 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-2">Combo Streaks</h4>
             <p className="text-stone-600">Maintaining a high grade streak unlocks multipliers. One failure resets the counter.</p>
          </div>
        );

      case 'taxonomy':
         return (
          <div className="flex h-full w-full -m-4 md:-m-10"> {/* Negative margin to counteract container padding for full bleed */}
            
            {/* Left Pane: List */}
            <div className="w-1/3 border-r border-stone-300 bg-stone-100 flex flex-col h-full">
              <div className="p-3 border-b border-stone-300 bg-stone-200/50 flex justify-between items-center text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                <span>Known Entities</span>
                <span>{STUDENT_ARCHETYPES.length} Recs</span>
              </div>
              
              <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {STUDENT_ARCHETYPES.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`
                        p-3 rounded border cursor-pointer transition-all flex items-center justify-between group
                        ${selectedStudent?.id === student.id 
                            ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-500 z-10' 
                            : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-sm'}
                    `}
                  >
                    <span className={`font-bold text-sm ${selectedStudent?.id === student.id ? 'text-stone-900' : 'text-stone-600'}`}>
                        {student.name}
                    </span>
                    <span 
                        className="text-[10px] font-bold text-white px-2 py-0.5 rounded shadow-sm"
                        style={{ backgroundColor: student.riskColor }}
                    >
                      {student.riskLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pane: Dossier */}
            <div className="w-2/3 h-full overflow-y-auto bg-[#FDFBF7] p-8 relative">
              {selectedStudent ? (
                <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Top Secret Stamp */}
                  <div className="absolute top-4 right-4 border-4 border-red-800/20 text-red-900/20 font-black text-4xl p-2 -rotate-12 select-none pointer-events-none">
                      TOP SECRET
                  </div>

                  <div className="border-b-4 border-stone-800 mb-6 pb-2">
                     <h3 className="font-serif text-3xl font-black text-stone-900 uppercase">{selectedStudent.name}</h3>
                     <div className="font-mono text-xs text-stone-500 mt-1">ID: {selectedStudent.id.replace('ARCHETYPE_', 'STD-')}</div>
                  </div>

                  <div className="space-y-6">
                    <div>
                        <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Risk Assessment</h4>
                        <div className="bg-white p-4 border border-stone-200 shadow-sm rounded-sm">
                            <span 
                                className="inline-block px-3 py-1 rounded text-white text-xs font-bold mb-2 shadow-sm" 
                                style={{ backgroundColor: selectedStudent.riskColor }}
                            >
                                {selectedStudent.riskLevel}
                            </span>
                            <p className="text-stone-700 font-serif leading-relaxed">{selectedStudent.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-stone-50 p-3 rounded border border-stone-200">
                            <strong className="block text-xs uppercase text-stone-400 mb-1">Weakness</strong>
                            <span className="text-stone-800 font-medium">{selectedStudent.weakness}</span>
                        </div>
                        <div className="bg-stone-50 p-3 rounded border border-stone-200">
                            <strong className="block text-xs uppercase text-stone-400 mb-1">Behavior</strong>
                            <span className="text-stone-800 font-medium">{selectedStudent.behavior}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Preferences</h4>
                        <div className="space-y-2">
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold text-green-700 w-16">LOVES:</span>
                                <div className="flex gap-1 flex-wrap">
                                    {selectedStudent.activityPreference.map((act, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded border border-green-200">{act}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold text-red-700 w-16">HATES:</span>
                                <div className="flex gap-1 flex-wrap">
                                    {selectedStudent.activityAvoidance.map((act, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded border border-red-200">{act}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-stone-300 opacity-60">
                  <Search size={64} className="mb-4" />
                  <div className="font-mono font-bold uppercase tracking-widest text-center border-2 border-dashed border-stone-300 p-4 rounded">
                    Select Subject<br/>For Review
                  </div>
                </div>
              )}
            </div>
          </div>
         );

      case 'supply':
        return (
          <div className="handbook-section">
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-4">Authorized Resources</h3>
            <p className="text-stone-700 mb-6">The Supply Closet is available for requisitions, provided you have sufficient Streak currency.</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded text-amber-700"><Briefcase size={20}/></div>
                  <div>
                      <strong className="text-stone-900 block">Coffee</strong>
                      <span className="text-stone-600">Restores reroll capability.</span>
                  </div>
              </li>
              <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded text-blue-700"><Package size={20}/></div>
                  <div>
                      <strong className="text-stone-900 block">Rerolls</strong>
                      <span className="text-stone-600">Allows for redrawing of Activity Cards.</span>
                  </div>
              </li>
            </ul>
          </div>
        );

      case 'emergency':
        return (
          <div className="handbook-section">
             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <h3 className="font-serif text-2xl font-bold text-red-900 flex items-center gap-2">
                    <ShieldAlert className="text-red-600"/> Crisis Response
                </h3>
             </div>
             <p className="text-stone-700 mb-4">Random events (CRISIS) may occur that alter gameplay mechanics. Preparedness is mandatory.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {['Facility', 'Personnel', 'Student'].map((cat) => (
                     <div key={cat} className="bg-white border border-stone-200 p-4 rounded shadow-sm">
                         <h4 className="font-bold text-stone-900 uppercase mb-2">{cat}</h4>
                         <p className="text-xs text-stone-500">Events related to {cat.toLowerCase()} disruptions.</p>
                     </div>
                 ))}
             </div>
          </div>
        );

      case 'extra_duty':
        return (
          <div className="extra-duty-content pb-20">
            {!stipendState.activeContract ? (
              <>
                <div className="mb-6 border-b border-stone-200 pb-4">
                    <h2 className="text-2xl font-black text-stone-800 uppercase tracking-tight">Help Wanted</h2>
                    <p className="text-stone-500 font-serif italic">Voluntary assignments for ambitious faculty.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {availableContracts.map((contract) => (
                    <div key={contract.id} className="bg-white border-2 border-stone-200 p-4 rounded hover:border-stone-400 transition-colors shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-1 bg-stone-100 rounded-bl text-[10px] font-bold text-stone-400 uppercase tracking-wider group-hover:bg-stone-200">
                          Vol. Assignment
                      </div>
                      
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg text-stone-900">{contract.title}</span>
                        <span className="text-xs px-2 py-1 rounded text-white font-bold uppercase tracking-wider shadow-sm" style={{ backgroundColor: getDifficultyColor(contract.difficulty) }}>
                          {contract.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-sm text-stone-600 mb-4 font-serif leading-snug">{contract.description}</p>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-100">
                         <div className="flex items-center gap-2">
                             <span className="text-[10px] font-bold text-stone-400 uppercase">Reward:</span>
                             <span className="text-sm font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">{contract.rewardXP} XP</span>
                         </div>
                         <button 
                            className="bg-stone-900 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-lg"
                            onClick={() => onSignContract && onSignContract(contract.id)}
                         >
                           Sign Contract
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white border-4 border-stone-800 p-6 rounded-sm shadow-lg relative">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-800 text-amber-500 px-4 py-1 text-xs font-black uppercase tracking-widest rounded-full shadow-lg border border-amber-500">
                     Active Assignment
                 </div>
                 
                 <div className="text-center mb-6 mt-2">
                    <h3 className="text-2xl font-black text-stone-900 uppercase">{stipendState.activeContract.title}</h3>
                    <div className="inline-block mt-2 px-3 py-1 bg-stone-100 rounded text-xs font-bold text-stone-500 uppercase">
                      Status: {stipendState.isComplete ? <span className="text-green-600">Complete</span> : <span className="text-amber-600">In Progress</span>}
                    </div>
                 </div>

                 <p className="text-center font-serif italic text-stone-600 mb-8 border-y border-stone-100 py-4">
                    "{stipendState.activeContract.flavor}"
                 </p>

                 <div className="bg-stone-100 rounded-full h-6 mb-2 overflow-hidden border border-stone-200 relative">
                    <div 
                        className="bg-amber-500 h-full transition-all duration-500 relative overflow-hidden" 
                        style={{ width: `${Math.min(100, (stipendState.progress / stipendState.activeContract.count) * 100)}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-stone-600 tracking-widest">
                        {stipendState.progress} / {stipendState.activeContract.count}
                    </div>
                 </div>

                 <div className="flex justify-center mt-6">
                    {stipendState.isComplete ? (
                      <button className="bg-green-700 text-white px-8 py-3 rounded shadow-lg hover:bg-green-600 font-bold uppercase tracking-widest animate-bounce" onClick={handleClaim}>
                        Claim Reward
                      </button>
                    ) : (
                      <button className="text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-700 hover:underline" onClick={() => onAbandonContract && onAbandonContract()}>
                        Abandon Contract
                      </button>
                    )}
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* 1. Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* 2. The Physical Book Container */}
          <motion.div 
            // Changed sizes here to be smaller and more manageable
            className="relative w-[95%] h-[85vh] md:max-w-4xl bg-[#fdfbf7] shadow-2xl flex flex-col overflow-hidden rounded-r-lg border-l-8 border-stone-800"
            initial={{ y: "20%", opacity: 0, scale: 0.95 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: "20%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header / Spine Top */}
            <div className="bg-stone-900 text-stone-100 p-4 flex justify-between items-center shadow-md shrink-0 border-b-4 border-amber-600">
              <div className="flex flex-col">
                <h2 className="text-lg font-black uppercase tracking-tighter leading-none flex items-center gap-3">
                    <div className="bg-stone-800 p-1.5 rounded text-amber-500">
                        <Book size={18} /> 
                    </div>
                    Employee Handbook
                </h2>
                <span className="text-[10px] text-stone-500 font-mono tracking-widest mt-1 ml-10">Vol. IV // Eyes Only</span>
              </div>
              <button 
                onClick={onClose} 
                className="hover:bg-red-900/50 p-2 rounded-full transition-colors text-stone-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#fdfbf7] text-stone-900">
              
              {/* Sidebar Navigation */}
              <nav className="shrink-0 bg-stone-100 flex md:flex-col overflow-x-auto md:overflow-y-auto md:w-56 border-r border-stone-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        flex-shrink-0 flex items-center gap-3 p-4 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border-l-4
                        ${activeTab === tab.id 
                            ? 'bg-white text-amber-700 border-amber-600 shadow-sm z-10' 
                            : 'text-stone-500 border-transparent hover:bg-stone-200 hover:text-stone-800'}
                    `}
                  >
                    <span className={activeTab === tab.id ? "opacity-100" : "opacity-70"}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Content Area */}
              <main className="flex-1 overflow-hidden relative flex flex-col">
                {/* Scrollable container */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 relative custom-scrollbar">
                    {renderContent()}
                </div>
              </main>
            </div>
            
            {/* Footer */}
            <div className="bg-stone-100 p-2 text-center text-[10px] font-mono text-stone-400 border-t border-stone-200 shrink-0 uppercase tracking-widest">
                Confidential // Do Not Distribute
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeHandbook;