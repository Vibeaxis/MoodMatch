
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
    { id: 'schedule', icon: <Calendar className="w-3 h-3 md:w-4 md:h-4" />, label: 'Schedule' },
    { id: 'id', icon: <User className="w-3 h-3 md:w-4 md:h-4" />, label: 'ID Card' },
    { id: 'memos', icon: <Mail className="w-3 h-3 md:w-4 md:h-4" />, label: 'Memos' },
    { id: 'supplies', icon: <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />, label: 'Supplies' },
    { id: 'performance', icon: <LineChart className="w-3 h-3 md:w-4 md:h-4" />, label: 'Performance' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">

      {/* Scrollbar Styling Injection */}
      <style>{`
        .planner-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .planner-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .planner-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
          opacity: 0.5;
        }
        .planner-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #B89628;
        }
      `}</style>

      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Planner Body */}
      <motion.div
        initial={{ y: '20%', opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '20%', opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl h-full max-h-[85vh] bg-[#5D4037] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#3E2723]"
        style={{
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        {/* Leather Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}
        />

        {/* --- HEADER --- */}
        <div className="shrink-0 h-16 md:h-20 bg-[#4E342E] relative flex items-center justify-between px-4 md:px-6 border-b-8 border-[#3E2723] z-30 shadow-lg">

          {/* Binder Rings */}
          <div className="absolute top-[-10px] md:top-[-12px] left-1/2 -translate-x-1/2 flex gap-8 md:gap-16 pointer-events-none z-40">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-5 md:w-8 h-10 md:h-12 rounded-full border-[4px] md:border-[6px] border-[#D4AF37] bg-[#2d2d2d] shadow-lg relative">
                <div className="absolute top-2 left-1 w-1 h-3 bg-white/40 rounded-full" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 z-10">
            <BookOpen className="text-[#D4AF37]" size={20} />
            <h1 className="text-[#D4AF37] font-mono-typewriter font-bold text-lg md:text-xl tracking-[0.2em] drop-shadow-md truncate">
              FACULTY PLANNER
            </h1>
          </div>

          <button
            onClick={onClose}
            className="z-10 group bg-[#3E2723] text-[#D4AF37] p-1.5 md:p-2 rounded-full border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all duration-300"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* --- TABS ROW --- */}
        <div className="shrink-0 flex px-2 md:px-4 pt-4 md:pt-5 gap-1 z-20 overflow-x-auto no-scrollbar items-end">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                   flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-t-lg font-bold text-[10px] md:text-xs uppercase tracking-wider whitespace-nowrap
                   transition-all duration-200 transform relative
                   ${isActive
                    ? 'bg-[#F5F1E8] text-stone-900 translate-y-0.5 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-20'
                    : 'bg-[#3E2723] text-[#A1887F] hover:bg-[#4E342E] hover:text-[#D7CCC8] mb-1 z-0 shadow-inner'
                  }
                 `}
              >
                {tab.icon} {tab.label}
                {isActive && <div className="absolute bottom-[-5px] left-0 right-0 h-4 bg-[#F5F1E8]" />}
              </button>
            );
          })}
        </div>

        {/* --- MAIN CONTENT AREA (The Paper) --- */}
        <div className="flex-1 bg-[#F5F1E8] mx-2 md:mx-4 mb-4 rounded-b-lg rounded-tr-lg shadow-[inset_0_2px_15px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col z-10">

          {/* Paper Grain Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-0"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")` }}
          />

          {/* SCROLLABLE CONTENT WRAPPER */}
          <div className="flex-1 overflow-y-auto planner-scrollbar p-4 md:p-6 relative z-10 pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="h-full"
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
    playerProfile={{
      ...gameData.playerProfile,
      gpa: gameData.careerGPA
    }}
    unlockedPerks={gameData.unlockedPerks}
    /* ADD THIS LINE - This is the missing link */
    shiftHistory={gameData.shiftHistory} 
  />
)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Decorative Footer Stamp */}
          <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none z-0">
            <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-black rounded-full flex items-center justify-center rotate-[-15deg]">
              <span className="font-mono-typewriter font-bold text-[8px] md:text-xs uppercase text-center leading-tight">
                Property of<br />District<br />Board
              </span>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}

export default TeacherPlanner;
