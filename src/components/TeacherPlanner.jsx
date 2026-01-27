import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, ShoppingBag, LineChart, BookOpen, Calendar } from 'lucide-react';
import IDTab from './PlannerTabs/IDTab';
import MemosTab from './PlannerTabs/MemosTab';
import SuppliesTab from './PlannerTabs/SuppliesTab';
import PerformanceTab from './PlannerTabs/PerformanceTab';
import ScheduleTab from './PlannerTabs/ScheduleTab';

function TeacherPlanner({
  isOpen,
  onClose,
  gameData,
  onReadMemo,
  onRequisition
}) {
  const [activeTab, setActiveTab] = useState('schedule');

  if (!isOpen) return null;

  const tabs = [
    { id: 'schedule', icon: <Calendar className="w-4 h-4" />, label: 'Schedule' },
    { id: 'id', icon: <User className="w-4 h-4" />, label: 'ID Card' },
    { id: 'memos', icon: <Mail className="w-4 h-4" />, label: 'Memos' },
    { id: 'supplies', icon: <ShoppingBag className="w-4 h-4" />, label: 'Supplies' },
    { id: 'performance', icon: <LineChart className="w-4 h-4" />, label: 'Performance' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 md:p-8">
      
      {/* Scrollbar & UI Fixes Injection */}
      <style>{`
        .planner-scrollbar::-webkit-scrollbar { width: 8px; }
        .planner-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.03); border-radius: 10px; }
        .planner-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; border: 2px solid #F5F1E8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] bg-[#5D4037] rounded-lg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border-2 border-[#3E2723]"
      >
        {/* Leather Grain Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

       {/* --- BINDER HEADER --- */}
        {/* CHANGE 2: Added 'rounded-t-lg' here to maintain the corner shape */}
        <div className="shrink-0 h-16 md:h-20 bg-[#4E342E] rounded-t-lg flex items-center justify-between px-6 border-b-4 border-[#3E2723] z-50 relative">
          
          {/* Binder Rings (Physically outside the frame) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 md:gap-24 pointer-events-none z-50">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 md:w-8 h-12 md:h-16 rounded-full border-4 md:border-[6px] border-[#D4AF37] bg-[#1a1a1a] shadow-2xl relative">
                <div className="absolute top-2 left-1.5 w-1.5 h-4 bg-white/20 rounded-full" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <BookOpen className="text-[#D4AF37] hidden md:block" />
            <h1 className="text-[#D4AF37] font-mono-typewriter font-bold text-sm md:text-xl tracking-[0.3em] uppercase drop-shadow-lg">
              Faculty Planner
            </h1>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-[#D4AF37] hover:text-white rounded-full transition-all border border-transparent hover:border-[#3E2723]">
            <X size={20} className="text-[#D4AF37] group-hover:text-white" />
          </button>
        </div>

        {/* --- TABS ROW (Fixed Scrollbar) --- */}
        <div className="shrink-0 flex px-4 md:px-8 pt-4 gap-1 z-40 overflow-x-auto no-scrollbar">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                   flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-[10px] md:text-xs uppercase tracking-widest
                   transition-all duration-200 relative whitespace-nowrap
                   ${isActive 
                    ? 'bg-[#FDFBF7] text-stone-900 shadow-lg z-30 -mb-[2px] border-x border-t border-white/20' 
                    : 'bg-[#3E2723] text-stone-400 hover:text-stone-200 mt-1 opacity-80'}
                `}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        {/* --- MAIN CONTENT (The Paper Binder) --- */}
        <div className="flex-1 bg-[#FDFBF7] mx-2 md:mx-6 mb-4 rounded-b-md shadow-2xl relative flex flex-col overflow-hidden border-t-2 border-white/50">
          
          {/* Subtle Paper Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] shadow-inner" />
          
          {/* Internal Content Area */}
          <div className="flex-1 overflow-y-auto planner-scrollbar p-6 md:p-10 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.1 }}
                className="min-h-full"
              >
                {activeTab === 'schedule' && (
                  <ScheduleTab 
                    weeklySchedule={gameData.weeklySchedule} 
                    currentDayIndex={gameData.dayOfWeek} 
                    weekNumber={gameData.weekNumber} 
                  />
                )}
                {activeTab === 'id' && (
                  <IDTab 
                    currentRank={gameData.currentRank} 
                    totalXP={gameData.totalXP} 
                    currentStreak={gameData.currentStreak} 
                  />
                )}
                {activeTab === 'memos' && (
                  <MemosTab 
                    dailyMemo={gameData.dailyMemo} 
                    activeModifier={gameData.activeModifier} 
                    onReadMemo={onReadMemo} 
                    earlyPeekUnlocked={gameData.unlockedPerks?.includes('EARLY_MEMO_PEEK')} 
                  />
                )}
                {activeTab === 'supplies' && (
                  <SuppliesTab 
                    currentStreak={gameData.currentStreak} 
                    unlockedSupplies={gameData.unlockedSupplies} 
                    onRequisition={onRequisition} 
                    unionDiscountActive={gameData.unlockedPerks?.includes('UNION_DISCOUNTS')} 
                  />
                )}
                {activeTab === 'performance' && (
                  <PerformanceTab 
                    playerProfile={{ ...gameData.playerProfile, gpa: gameData.careerGPA }} 
                    unlockedPerks={gameData.unlockedPerks} 
                    shiftHistory={gameData.shiftHistory} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Decorative Red Line (Notebook Margin) */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-red-200/50 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export default TeacherPlanner;