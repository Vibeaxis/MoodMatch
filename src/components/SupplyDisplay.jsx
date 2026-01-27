import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUPPLY_ICONS } from '@/components/PlannerTabs/SuppliesTab';
import { Grid3x3, MessageSquare } from 'lucide-react';

// --- INITIAL POSITIONS (The "Clean" State) ---
// These serve as the spawn points.
const SUPPLY_POSITIONS = {
  // === TOP RIGHT CLUSTER ===
  desk_clock:     { color: 'text-stone-800', pos: 'top-[12%] right-[2%]' },
  globe:          { color: 'text-blue-700', pos: 'top-[12%] right-[10%]' },
  usb_fan:        { color: 'text-blue-400', pos: 'top-[18%] right-[6%]' },
  newtons_cradle: { color: 'text-stone-600', pos: 'top-[18%] right-[14%]' },
  desk_lamp:      { color: 'text-emerald-800', pos: 'top-[5%] right-[6%]' },
  digital_timer:  { color: 'text-red-600', pos: 'top-[24%] right-[2%]' },

  // === UPPER MID RIGHT ===
  hand_sanitizer: { color: 'text-blue-300', pos: 'top-[30%] right-[8%]' },
  potted_plant:   { color: 'text-green-600', pos: 'top-[30%] right-[14%]' },
  tissues:        { color: 'text-white', pos: 'top-[36%] right-[2%]' },
  cactus:         { color: 'text-green-800', pos: 'top-[42%] right-[10%]' },
  tea_box:        { color: 'text-amber-600', pos: 'top-[42%] right-[2%]' },

  // === MID RIGHT ===
  photo_frame:    { color: 'text-amber-800', pos: 'top-[48%] right-[8%]' },
  snack_bowl:     { color: 'text-amber-700', pos: 'top-[54%] right-[14%]' },
  ant_farm:       { color: 'text-amber-900', pos: 'top-[54%] right-[4%]' },
  desk_fan:       { color: 'text-stone-500', pos: 'top-[60%] right-[10%]' },

  // === LOWER MID RIGHT ===
  goldfish:       { color: 'text-orange-500', pos: 'top-[66%] right-[2%]' },
  hamster:        { color: 'text-stone-500', pos: 'top-[66%] right-[12%]' },
  tamagotchi:     { color: 'text-pink-500', pos: 'top-[72%] right-[6%]' },
  laser_pointer:  { color: 'text-red-600', pos: 'top-[78%] right-[14%]' },
  rock_pet:       { color: 'text-stone-600', pos: 'top-[82%] right-[4%]' },

  // === BOTTOM RIGHT ===
  calendar:       { color: 'text-red-700', pos: 'bottom-[35%] right-[12%]' },
  calculator:     { color: 'text-stone-700', pos: 'bottom-[35%] right-[4%]' },
  stapler:        { color: 'text-red-600', pos: 'bottom-[28%] right-[10%]' },
  tape_dispenser: { color: 'text-stone-500', pos: 'bottom-[22%] right-[2%]' },
  pencil_holder:  { color: 'text-stone-500', pos: 'bottom-[22%] right-[14%]' },
  markers:        { color: 'text-pink-600', pos: 'bottom-[15%] right-[6%]' },
  
  // === FLOOR ===
  water_bottle:   { color: 'text-blue-500', pos: 'bottom-[8%] right-[12%]' },
  scissors:       { color: 'text-blue-500', pos: 'bottom-[8%] right-[4%]' },
  cushion:        { color: 'text-indigo-600', pos: 'bottom-[2%] right-[10%]' },
  robo_dog:       { color: 'text-sky-500', pos: 'bottom-[2%] right-[2%]' },

  // === FILLER ===
  clicker:        { color: 'text-stone-600', pos: 'bottom-[42%] right-[8%]' },
  tablet:         { color: 'text-stone-800', pos: 'bottom-[48%] right-[2%]' },
  headphones:     { color: 'text-stone-900', pos: 'bottom-[55%] right-[12%]' },
  voice_amp:      { color: 'text-stone-800', pos: 'bottom-[62%] right-[4%]' },
  paper_clips:    { color: 'text-stone-400', pos: 'bottom-[12%] right-[14%]' },
  sticky_notes:   { color: 'text-yellow-500', pos: 'bottom-[18%] right-[8%]' },
  ruler:          { color: 'text-stone-400', pos: 'bottom-[45%] right-[14%]' },
};

// --- FLAVOR TEXT DATABASE ---
const FLAVOR_TEXTS = {
  hamster: ["He is plotting something.", "Running to nowhere, fast.", "Squeak?"],
  goldfish: ["It has forgotten you already.", "Bloop.", "Swimming in circles."],
  rock_pet: ["It hasn't moved in years.", "Solid.", "The perfect listener."],
  ant_farm: ["The queen demands sugar.", "Industry in motion.", "They are organizing."],
  potted_plant: ["Photosynthesis in progress.", "Please water me.", "Looking green."],
  cactus: ["Sharp personality.", "Don't touch.", "Thriving on neglect."],
  newtons_cradle: ["Click... clack...", "Conservation of momentum.", "Hypnotic."],
  desk_fan: ["Blowing hot air around.", "Whirrrr.", "A gentle breeze."],
  snack_bowl: ["Empty again?", "Just one more...", "Crumbs everywhere."],
  robo_dog: ["Bark.exe loaded.", "Good bot.", "Battery low."],
  tamagotchi: ["It needs food!", "It beeped at you.", "Pixel love."],
  globe: ["Spinning the world.", "Where to next?", "Tiny geography."],
  stapler: ["Ka-chunk!", "Jammed again.", "Holding it together."],
  default: ["It sits there, menacingly.", "Property of the Faculty.", "Do not remove."]
};

function SupplyDisplay({ unlockedSupplies = [] }) {
  // Ref for the drag constraints (The Safe Zone)
  const constraintsRef = useRef(null);
  const [activeToast, setActiveToast] = useState(null);

  if (!unlockedSupplies || unlockedSupplies.length === 0) return null;

  const recentSupplies = unlockedSupplies.slice(-5);

  const handleItemClick = (id) => {
    // Pick a random line or default
    const lines = FLAVOR_TEXTS[id] || FLAVOR_TEXTS.default;
    const text = lines[Math.floor(Math.random() * lines.length)];
    
    setActiveToast({ id, text });
    
    // Auto hide after 3 seconds
    setTimeout(() => setActiveToast(null), 3000);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* --- DRAG CONSTRAINT ZONE --- */}
      {/* This invisible box defines where items can be dragged. 
          It covers the right 25% of the screen, keeping items out of the center. */}
      <div 
        ref={constraintsRef} 
        className="absolute top-[5%] bottom-[5%] right-0 w-[25%] pointer-events-none border-l border-transparent"
      />

      {recentSupplies.map(id => {
        const config = SUPPLY_POSITIONS[id];
        if (!config) return null;

        const Icon = SUPPLY_ICONS[id] || Grid3x3;
        const isToastActive = activeToast?.id === id;

        return (
          <motion.div
            key={id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 50 }}
            onClick={() => handleItemClick(id)}
            className={`absolute ${config.pos} pointer-events-auto touch-none`}
          >
            {/* The Icon Bubble */}
            <div className={`
              p-2 rounded-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50
              hover:bg-white/60 transition-colors
              ${config.color}
            `}>
              <Icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>

            {/* The Flavor Toast */}
            <AnimatePresence>
              {isToastActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] z-50 pointer-events-none"
                >
                  <div className="bg-stone-800 text-stone-100 text-[10px] px-2 py-1 rounded shadow-lg border border-stone-600 font-mono-typewriter text-center relative">
                    {activeToast.text}
                    {/* Tiny triangle arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}

export default SupplyDisplay;