
import React from 'react';
import { Shield, Tag, Eye, Coffee, Lock, Check } from 'lucide-react';

const PERK_DEFINITIONS = [
  {
    id: 'TENURE',
    name: 'Tenure Protection',
    description: 'One F-grade per week is excluded from your permanent record.',
    icon: <Shield className="w-6 h-6" />,
    thresholdLabel: 'Unlock at S-Rank (3.8+ GPA)',
    isUnlocked: (gpa) => gpa >= 3.8
  },
  {
    id: 'EARLY_MEMO_PEEK',
    name: 'Insider Info',
    description: 'Peek at tomorrow\'s Daily Memo one hour before the shift starts.',
    icon: <Eye className="w-6 h-6" />,
    thresholdLabel: 'Unlock at A-Rank (3.5+ GPA)',
    isUnlocked: (gpa) => gpa >= 3.5
  },
  {
    id: 'UNION_DISCOUNTS',
    name: 'Union Benefits',
    description: '15% Discount on all classroom supply requisitions.',
    icon: <Tag className="w-6 h-6" />,
    thresholdLabel: 'Unlock at B-Rank (3.0+ GPA)',
    isUnlocked: (gpa) => gpa >= 3.0
  },
  {
    id: 'COFFEE_REFILL',
    name: 'Staff Room Key',
    description: 'Gain access to the "Good" coffee pot. Two mug refills per day.',
    icon: <Coffee className="w-6 h-6" />,
    thresholdLabel: 'Unlock at B-Rank (3.0+ GPA)',
    isUnlocked: (gpa) => gpa >= 3.0
  }
];

function UnlockedPerks({ careerGPA }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {PERK_DEFINITIONS.map((perk) => {
        const unlocked = perk.isUnlocked(careerGPA);
        
        return (
          <div 
            key={perk.id}
            className={`
              relative p-4 rounded-lg border-2 flex items-start gap-4
              transition-all duration-300
              ${unlocked 
                ? 'bg-white border-stone-200 shadow-sm' 
                : 'bg-stone-200/50 border-stone-300/50 opacity-70'
              }
            `}
          >
            <div className={`
              p-2 rounded-full 
              ${unlocked ? 'bg-amber-100 text-amber-700' : 'bg-stone-300 text-stone-500'}
            `}>
              {perk.icon}
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className={`font-bold font-mono-typewriter ${unlocked ? 'text-stone-800' : 'text-stone-500'}`}>
                  {perk.name}
                </h3>
                {unlocked ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-stone-400 bg-stone-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
              
              <p className="text-xs text-stone-500 font-serif mt-1 leading-snug">
                {perk.description}
              </p>
              
              {!unlocked && (
                <p className="text-[10px] font-bold text-stone-400 mt-2 uppercase tracking-wide">
                  {perk.thresholdLabel}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UnlockedPerks;
