
import React from 'react';
import { motion } from 'framer-motion';
import { SUPPLY_ICONS } from '@/components/PlannerTabs/SuppliesTab';
import { Grid3x3 } from 'lucide-react';

const SUPPLY_POSITIONS = {
  // Desk Decor
  newtons_cradle: { color: 'text-stone-600', pos: 'top-[5%] left-[5%]' },
  globe: { color: 'text-blue-700', pos: 'top-[5%] right-[5%]' },
  potted_plant: { color: 'text-green-600', pos: 'bottom-[35%] left-[2%]' },
  photo_frame: { color: 'text-amber-800', pos: 'top-[15%] left-[15%]' },
  desk_lamp: { color: 'text-emerald-800', pos: 'top-[2%] left-[40%]' },
  pencil_holder: { color: 'text-stone-500', pos: 'bottom-[40%] right-[15%]' },
  desk_clock: { color: 'text-stone-800', pos: 'top-[8%] right-[25%]' },
  calendar: { color: 'text-red-700', pos: 'top-[25%] left-[5%]' },

  // Classroom Supplies
  markers: { color: 'text-pink-600', pos: 'bottom-[15%] right-[10%]' },
  stapler: { color: 'text-red-600', pos: 'bottom-[10%] right-[25%]' },
  paper_clips: { color: 'text-stone-400', pos: 'bottom-[20%] right-[30%]' },
  tape_dispenser: { color: 'text-stone-500', pos: 'bottom-[12%] right-[18%]' },
  calculator: { color: 'text-stone-700', pos: 'bottom-[25%] right-[5%]' },
  sticky_notes: { color: 'text-yellow-500', pos: 'bottom-[30%] right-[8%]' },
  scissors: { color: 'text-blue-500', pos: 'bottom-[5%] right-[35%]' },
  ruler: { color: 'text-stone-400', pos: 'bottom-[2%] right-[20%]' },

  // Comfort
  stress_ball: { color: 'text-yellow-400', pos: 'bottom-[45%] left-[8%]' },
  hand_sanitizer: { color: 'text-blue-300', pos: 'top-[30%] right-[5%]' },
  tissues: { color: 'text-white', pos: 'top-[40%] right-[2%]' },
  water_bottle: { color: 'text-blue-500', pos: 'bottom-[5%] left-[5%]' },
  tea_box: { color: 'text-amber-600', pos: 'top-[15%] right-[35%]' },
  snack_bowl: { color: 'text-amber-700', pos: 'bottom-[15%] left-[15%]' },
  cushion: { color: 'text-indigo-600', pos: 'bottom-[5%] left-[30%]' },
  desk_fan: { color: 'text-stone-500', pos: 'top-[35%] left-[5%]' },

  // Pets
  goldfish: { color: 'text-orange-500', pos: 'top-[50%] left-[5%]' },
  hamster: { color: 'text-stone-500', pos: 'top-[55%] left-[2%]' },
  rock_pet: { color: 'text-stone-600', pos: 'bottom-[25%] left-[10%]' },
  cactus: { color: 'text-green-800', pos: 'top-[45%] left-[12%]' },
  ant_farm: { color: 'text-amber-900', pos: 'top-[60%] right-[5%]' },
  robo_dog: { color: 'text-sky-500', pos: 'bottom-[5%] right-[5%]' },
  tamagotchi: { color: 'text-pink-500', pos: 'bottom-[15%] left-[25%]' },

  // Tech
  tablet: { color: 'text-stone-800', pos: 'bottom-[35%] right-[5%]' },
  clicker: { color: 'text-stone-600', pos: 'bottom-[45%] right-[5%]' },
  laser_pointer: { color: 'text-red-600', pos: 'bottom-[50%] right-[8%]' },
  headphones: { color: 'text-stone-900', pos: 'top-[50%] right-[8%]' },
  usb_fan: { color: 'text-blue-400', pos: 'top-[25%] right-[10%]' },
  digital_timer: { color: 'text-red-600', pos: 'top-[15%] right-[15%]' },
  voice_amp: { color: 'text-stone-800', pos: 'top-[65%] right-[2%]' }
};

function SupplyDisplay({ unlockedSupplies = [] }) {
  if (!unlockedSupplies || unlockedSupplies.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {unlockedSupplies.map(id => {
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
