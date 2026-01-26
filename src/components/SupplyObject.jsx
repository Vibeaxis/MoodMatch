import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Smartphone, Monitor, Armchair, Ghost, Coffee } from 'lucide-react';

const SUPPLY_CONFIG = {
  whiteboard_markers: { 
    icon: <PenTool className="w-8 h-8 text-blue-600 rotate-45" />, 
    color: 'bg-blue-100',
    rotation: 12
  },
  class_pet: { 
    icon: <Ghost className="w-8 h-8 text-stone-600" />, // Placeholder for Hamster
    color: 'bg-amber-100',
    rotation: -5
  },
  beanbag_chairs: { 
    icon: <Armchair className="w-8 h-8 text-red-500" />, 
    color: 'bg-red-100',
    rotation: 8
  },
  tablet_time: { 
    icon: <Smartphone className="w-8 h-8 text-stone-800" />, 
    color: 'bg-stone-200',
    rotation: -15
  },
  coffee_maker: { 
    icon: <Coffee className="w-8 h-8 text-stone-900" />, 
    color: 'bg-stone-300',
    rotation: 5
  },
  smart_board: { 
    icon: <Monitor className="w-8 h-8 text-blue-900" />, 
    color: 'bg-blue-200',
    rotation: 0
  }
};

function SupplyObject({ supplyId, position }) {
  const config = SUPPLY_CONFIG[supplyId];
  
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: config.rotation }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 0,
        y: -5,
        transition: { type: 'spring', stiffness: 300 } 
      }}
      className={`absolute z-10 p-3 rounded-lg shadow-md border-2 border-white/50 backdrop-blur-sm cursor-pointer ${config.color} ${position}`}
      title={supplyId.replace('_', ' ')}
    >
      {/* Glossy Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-lg pointer-events-none" />
      {config.icon}
    </motion.div>
  );
}

export default SupplyObject;