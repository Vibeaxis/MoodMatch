import React from 'react';
import { motion } from 'framer-motion';
import { SUPPLY_ICONS } from '@/components/PlannerTabs/SuppliesTab';
import { Grid3x3 } from 'lucide-react';

const SUPPLY_POSITIONS = {
  // === TOP RIGHT CLUSTER (Decor & Tech) ===
  // Starts lower (12%) to give the Settings Gear some breathing room
  desk_clock:     { color: 'text-stone-800', pos: 'top-[12%] right-[2%]' },
  globe:          { color: 'text-blue-700', pos: 'top-[12%] right-[10%]' },
  usb_fan:        { color: 'text-blue-400', pos: 'top-[18%] right-[6%]' },
  newtons_cradle: { color: 'text-stone-600', pos: 'top-[18%] right-[14%]' },
  desk_lamp:      { color: 'text-emerald-800', pos: 'top-[5%] right-[6%]' }, // High up, but distinct
  digital_timer:  { color: 'text-red-600', pos: 'top-[24%] right-[2%]' },

  // === UPPER MID RIGHT (Comfort & Plants) ===
  hand_sanitizer: { color: 'text-blue-300', pos: 'top-[30%] right-[8%]' },
  potted_plant:   { color: 'text-green-600', pos: 'top-[30%] right-[14%]' },
  tissues:        { color: 'text-white', pos: 'top-[36%] right-[2%]' },
  cactus:         { color: 'text-green-800', pos: 'top-[42%] right-[10%]' },
  tea_box:        { color: 'text-amber-600', pos: 'top-[42%] right-[2%]' },

  // === MID RIGHT (Personal & Snacks) ===
  photo_frame:    { color: 'text-amber-800', pos: 'top-[48%] right-[8%]' },
  snack_bowl:     { color: 'text-amber-700', pos: 'top-[54%] right-[14%]' },
  ant_farm:       { color: 'text-amber-900', pos: 'top-[54%] right-[4%]' },
  desk_fan:       { color: 'text-stone-500', pos: 'top-[60%] right-[10%]' },

  // === LOWER MID RIGHT (Pets & Gadgets) ===
  goldfish:       { color: 'text-orange-500', pos: 'top-[66%] right-[2%]' },
  hamster:        { color: 'text-stone-500', pos: 'top-[66%] right-[12%]' },
  tamagotchi:     { color: 'text-pink-500', pos: 'top-[72%] right-[6%]' },
  laser_pointer:  { color: 'text-red-600', pos: 'top-[78%] right-[14%]' },
  rock_pet:       { color: 'text-stone-600', pos: 'top-[82%] right-[4%]' },

  // === BOTTOM RIGHT (Tools & Clutter) ===
  calendar:       { color: 'text-red-700', pos: 'bottom-[35%] right-[12%]' },
  calculator:     { color: 'text-stone-700', pos: 'bottom-[35%] right-[4%]' },
  stapler:        { color: 'text-red-600', pos: 'bottom-[28%] right-[10%]' },
  tape_dispenser: { color: 'text-stone-500', pos: 'bottom-[22%] right-[2%]' },
  pencil_holder:  { color: 'text-stone-500', pos: 'bottom-[22%] right-[14%]' },
  markers:        { color: 'text-pink-600', pos: 'bottom-[15%] right-[6%]' },
  
  // === VERY BOTTOM EDGE (The "Floor" items) ===
  water_bottle:   { color: 'text-blue-500', pos: 'bottom-[8%] right-[12%]' },
  scissors:       { color: 'text-blue-500', pos: 'bottom-[8%] right-[4%]' },
  cushion:        { color: 'text-indigo-600', pos: 'bottom-[2%] right-[10%]' },
  robo_dog:       { color: 'text-sky-500', pos: 'bottom-[2%] right-[2%]' },

  // === FILLER/LEFTOVERS ===
  clicker:        { color: 'text-stone-600', pos: 'bottom-[42%] right-[8%]' },
  tablet:         { color: 'text-stone-800', pos: 'bottom-[48%] right-[2%]' },
  headphones:     { color: 'text-stone-900', pos: 'bottom-[55%] right-[12%]' },
  voice_amp:      { color: 'text-stone-800', pos: 'bottom-[62%] right-[4%]' },
  paper_clips:    { color: 'text-stone-400', pos: 'bottom-[12%] right-[14%]' },
  sticky_notes:   { color: 'text-yellow-500', pos: 'bottom-[18%] right-[8%]' },
  ruler:          { color: 'text-stone-400', pos: 'bottom-[45%] right-[14%]' },
};

function SupplyDisplay({ unlockedSupplies = [] }) {
  if (!unlockedSupplies || unlockedSupplies.length === 0) return null;

  // Still limiting to 5 to prevent the Right Side from becoming a total junkyard
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