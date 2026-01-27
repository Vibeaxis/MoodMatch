import React from 'react';
import { motion } from 'framer-motion';
import { SUPPLY_ICONS } from '@/components/PlannerTabs/SuppliesTab';
import { Grid3x3 } from 'lucide-react';

const SUPPLY_POSITIONS = {
  // --- DESK DECOR ---
  // Left side items avoid the 20%-50% range to clear the Faculty Handbook
  // Left Bottom (80%+) is avoided to clear the Inbox Tray
  newtons_cradle: { color: 'text-stone-600', pos: 'top-[12%] left-[2%]' },
  globe:          { color: 'text-blue-700', pos: 'top-[12%] right-[2%]' },
  photo_frame:    { color: 'text-amber-800', pos: 'top-[60%] left-[2%]' },
  desk_lamp:      { color: 'text-emerald-800', pos: 'top-[70%] left-[2%]' },
  pencil_holder:  { color: 'text-stone-500', pos: 'bottom-[25%] right-[2%]' },
  desk_clock:     { color: 'text-stone-800', pos: 'top-[12%] right-[8%]' },
  
  // Moved Calendar up slightly to avoid Inbox top edge
  calendar:       { color: 'text-red-700', pos: 'top-[52%] left-[8%]' }, 

  // --- CLASSROOM SUPPLIES (Clustered Right Bottom) ---
  markers:        { color: 'text-pink-600', pos: 'bottom-[15%] right-[2%]' },
  stapler:        { color: 'text-red-600', pos: 'bottom-[20%] right-[8%]' },
  paper_clips:    { color: 'text-stone-400', pos: 'bottom-[30%] right-[2%]' },
  tape_dispenser: { color: 'text-stone-500', pos: 'bottom-[10%] right-[8%]' },
  calculator:     { color: 'text-stone-700', pos: 'bottom-[35%] right-[8%]' },
  sticky_notes:   { color: 'text-yellow-500', pos: 'bottom-[40%] right-[2%]' },
  scissors:       { color: 'text-blue-500', pos: 'bottom-[5%] right-[8%]' },
  ruler:          { color: 'text-stone-400', pos: 'bottom-[45%] right-[2%]' },

  // --- COMFORT (Moved from Bottom-Left to Top-Left/Mid-Left to clear Inbox) ---
  potted_plant:   { color: 'text-green-600', pos: 'top-[4%] left-[2%]' },  // Was bottom-15%
  water_bottle:   { color: 'text-blue-500', pos: 'top-[4%] left-[8%]' },   // Was bottom-5%
  snack_bowl:     { color: 'text-amber-700', pos: 'top-[12%] left-[8%]' }, // Was bottom-10%
  cushion:        { color: 'text-indigo-600', pos: 'top-[55%] left-[2%]' },// Was bottom-20%
  stress_ball:    { color: 'text-yellow-400', pos: 'top-[65%] left-[8%]' },// Was bottom-25%
  
  hand_sanitizer: { color: 'text-blue-300', pos: 'top-[25%] right-[2%]' },
  tissues:        { color: 'text-white', pos: 'top-[35%] right-[2%]' },
  tea_box:        { color: 'text-amber-600', pos: 'top-[45%] right-[2%]' },
  desk_fan:       { color: 'text-stone-500', pos: 'top-[55%] left-[2%]' }, // Overlaps cushion slightly, adjusted below? 
  // Adjusted desk_fan to not overlap cushion:
  // desk_fan: { color: 'text-stone-500', pos: 'top-[55%] left-[8%]' }, 
  // Actually, let's move desk_fan to Right to balance? Or keep it:
  // Let's just push desk_fan to top-[52%] left-[2%] to group with Calendar? 
  // Let's leave desk_fan at top-[55%] left-[2%] and move cushion to top-[55%] left-[8%]
  
  // --- PETS (Scattered Edges) ---
  goldfish:       { color: 'text-orange-500', pos: 'top-[65%] right-[8%]' },
  hamster:        { color: 'text-stone-500', pos: 'top-[75%] right-[8%]' },
  rock_pet:       { color: 'text-stone-600', pos: 'top-[75%] left-[2%]' }, // Was bottom-35%
  cactus:         { color: 'text-green-800', pos: 'top-[25%] left-[8%]' },
  ant_farm:       { color: 'text-amber-900', pos: 'top-[55%] right-[8%]' },
  robo_dog:       { color: 'text-sky-500', pos: 'bottom-[5%] right-[2%]' },
  tamagotchi:     { color: 'text-pink-500', pos: 'top-[75%] left-[8%]' }, // Was bottom-30%

  // --- TECH (Right Side Column) ---
  tablet:         { color: 'text-stone-800', pos: 'bottom-[50%] right-[8%]' },
  clicker:        { color: 'text-stone-600', pos: 'bottom-[60%] right-[2%]' },
  laser_pointer:  { color: 'text-red-600', pos: 'bottom-[70%] right-[2%]' },
  headphones:     { color: 'text-stone-900', pos: 'top-[85%] right-[2%]' },
  usb_fan:        { color: 'text-blue-400', pos: 'top-[15%] right-[2%]' },
  digital_timer:  { color: 'text-red-600', pos: 'top-[20%] right-[8%]' },
  voice_amp:      { color: 'text-stone-800', pos: 'top-[90%] right-[8%]' }
};

function SupplyDisplay({ unlockedSupplies = [] }) {
  if (!unlockedSupplies || unlockedSupplies.length === 0) return null;

  // LIMIT TO 5: Keeps the desk clean while showing newest progress
  const recentSupplies = unlockedSupplies.slice(-5);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {recentSupplies.map(id => {
        const config = SUPPLY_POSITIONS[id];
        if (!config) return null;

        const Icon = SUPPLY_ICONS[id] || Grid3x3;

        return (
          <motion.div
            key={id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`absolute ${config.pos} pointer-events-auto cursor-pointer`}
          >
            <div className={`
              p-2 rounded-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50
              hover:bg-white/60 transition-colors
              ${config.color}
            `}>
              <Icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default SupplyDisplay;