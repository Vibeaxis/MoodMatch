import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, Tag, ChevronDown, ChevronUp, Lamp, Leaf, Image, Grid3x3, Wind, Lightbulb, Pen, StickyNote, Briefcase, Clock, Zap, Layers, Armchair, Droplets, Circle, Flower, Headphones, Monitor, Speaker, Rat, Fish, Rabbit, Bug, Archive, Scissors, Ruler, Calculator } from 'lucide-react';
import { SUPPLIES_SHOP } from '@/lib/EventData';

// Map supply IDs to Lucide icons (Same as before)
export const SUPPLY_ICONS = {
  newtons_cradle: Grid3x3, globe: Circle, potted_plant: Leaf, photo_frame: Image, desk_lamp: Lamp, pencil_holder: Archive, desk_clock: Clock, calendar: Layers,
  markers: Pen, stapler: Briefcase, paper_clips: Layers, tape_dispenser: Circle, calculator: Calculator, sticky_notes: StickyNote, scissors: Scissors, ruler: Ruler,
  stress_ball: Circle, hand_sanitizer: Droplets, tissues: Layers, water_bottle: Droplets, tea_box: Flower, snack_bowl: Circle, cushion: Armchair, desk_fan: Wind,
  goldfish: Fish, hamster: Rat, rock_pet: Circle, cactus: Leaf, ant_farm: Bug, robo_dog: Zap, tamagotchi: Monitor,
  tablet: Monitor, clicker: Zap, laser_pointer: Lightbulb, headphones: Headphones, usb_fan: Wind, digital_timer: Clock, voice_amp: Speaker
};

function SuppliesTab({ currentStreak, unlockedSupplies, onRequisition, unionDiscountActive }) {
  // Group supplies by category
  const categories = SUPPLIES_SHOP.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="h-full relative flex flex-col bg-[#F5F1E8] rounded-sm">
      
      {/* 1. Header is now absolute/fixed at the top of this container */}
      <div className="z-20 bg-[#F5F1E8]/95 backdrop-blur-sm border-b border-stone-300 p-4 shadow-sm flex-shrink-0 flex justify-between items-center">
        <div>
           <h2 className="font-mono-typewriter text-xl font-bold text-stone-800">Supply Requisition</h2>
           <p className="text-[10px] text-stone-500 font-serif italic">Approved vendors only.</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 shadow-inner">
            Budget: {currentStreak.toFixed(2)} Pts
          </div>
          {unionDiscountActive && (
            <div className="flex items-center gap-1 text-[10px] text-green-700 font-bold mt-1 bg-green-50 px-2 py-0.5 rounded border border-green-100">
              <Tag className="w-3 h-3" /> Union Discount (-15%)
            </div>
          )}
        </div>
      </div>

      {/* 2. Content Area scrolls independently beneath the header */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
        <div className="space-y-6 pb-20"> {/* pb-20 ensures last item isn't cut off */}
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="bg-white/50 rounded-lg border border-stone-200 overflow-hidden shadow-sm">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex justify-between items-center p-3 bg-stone-100/50 hover:bg-stone-100 transition-colors border-b border-stone-100"
              >
                <h3 className="font-mono-typewriter font-bold text-stone-700 uppercase tracking-wider text-sm flex items-center gap-2">
                   {/* Category Icons could go here if you wanted */}
                   {category}
                   <span className="text-[10px] text-stone-400 font-normal">({items.length} items)</span>
                </h3>
                {expandedCategories[category] ? (
                  <ChevronUp className="w-4 h-4 text-stone-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-500" />
                )}
              </button>

              <AnimatePresence>
                {expandedCategories[category] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {items.map((item) => {
                        const isUnlocked = unlockedSupplies.includes(item.id);
                        let finalCost = item.cost;
                        if (unionDiscountActive) finalCost = item.cost * 0.85;
                        const canAfford = currentStreak >= finalCost;
                        const IconComponent = SUPPLY_ICONS[item.id] || Grid3x3;

                        return (
                          <div
                            key={item.id}
                            className={`
                              relative p-3 rounded-lg border transition-all duration-200 group flex flex-col
                              ${isUnlocked 
                                ? 'bg-white border-green-200 shadow-sm ring-1 ring-green-100' 
                                : 'bg-stone-50 border-stone-200'
                              }
                            `}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className={`
                                w-10 h-10 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner
                                ${isUnlocked ? 'bg-amber-100 text-amber-600' : 'bg-stone-200 text-stone-400 opacity-60'}
                              `}>
                                 <IconComponent className="w-6 h-6" />
                              </div>
                              {isUnlocked ? (
                                <div className="bg-green-100 text-green-700 p-1 rounded-full">
                                  <Check className="w-3 h-3" />
                                </div>
                              ) : (
                                <Lock className="w-3 h-3 text-stone-300" />
                              )}
                            </div>

                            <h4 className="font-bold text-xs text-stone-800 mb-1 leading-tight">{item.name}</h4>
                            <p className="text-[10px] text-stone-500 mb-3 leading-tight min-h-[2.5em] flex-grow">
                              {item.description}
                            </p>

                            {!isUnlocked ? (
                              <button
                                onClick={() => onRequisition({ ...item, cost: finalCost })}
                                disabled={!canAfford}
                                className={`
                                  w-full py-1.5 rounded text-[10px] font-bold uppercase tracking-wider
                                  transition-all mt-auto
                                  ${canAfford
                                    ? 'bg-stone-800 text-white hover:bg-stone-900 shadow-md transform hover:-translate-y-0.5'
                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                  }
                                `}
                              >
                                Req. ({finalCost % 1 === 0 ? finalCost : finalCost.toFixed(2)})
                              </button>
                            ) : (
                              <div className="mt-auto text-[10px] font-bold text-green-600 uppercase tracking-wider text-center py-1 bg-green-50 rounded border border-green-100">
                                Acquired
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuppliesTab;