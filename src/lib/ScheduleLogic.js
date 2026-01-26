
import { CRISIS_EVENTS, FLAVOR_MEMOS, MINOR_BOONS, JACKPOT_EVENTS } from './EventData';

// --- Event Pools ---

// Filter Crisis Events into "Modifier" (Gameplay changes) vs "Crisis" (Blocks/Penalties)
const MODIFIER_EVENTS = CRISIS_EVENTS.filter(e => 
  ['Constraint Focus', 'Difficulty Up', 'Double Shifts'].includes(e.impact) || e.severity === 'Medium'
);

const SEVERE_CRISIS_EVENTS = CRISIS_EVENTS.filter(e => 
  ['Media Disabled', 'Kinetic Disabled', 'XP Gain Halved', 'XP Gain Reduced', 'Streak Break on F'].includes(e.impact) || e.severity === 'High'
);

// Fallback if filtering is too strict
const SAFE_MODIFIERS = MODIFIER_EVENTS.length > 0 ? MODIFIER_EVENTS : CRISIS_EVENTS;
const SAFE_CRISIS = SEVERE_CRISIS_EVENTS.length > 0 ? SEVERE_CRISIS_EVENTS : CRISIS_EVENTS;

const NORMAL_EVENTS = FLAVOR_MEMOS;
const BOON_EVENTS = MINOR_BOONS;
// JACKPOT_EVENTS is imported directly

// --- RNG Utils ---

// Simple seeded RNG (Mulberry32)
function seededRandom(seed) {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function getRandomFromPool(pool, seed) {
  if (!pool || pool.length === 0) return null;
  const index = Math.floor(seededRandom(seed) * pool.length);
  return pool[index];
}

// --- Schedule Generation ---

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function generateWeeklySchedule(weekNumber) {
  // Use weekNumber as the base seed
  let seed = weekNumber * 100;

  return DAYS.map((dayName, index) => {
    // Increment seed for each day to ensure variety
    const daySeed = seed + index; 
    const roll = seededRandom(daySeed);
    
    let type = 'NORMAL';
    let event = null;

    // Schedule Logic
    switch(index) {
      case 0: // Monday
        type = 'NORMAL';
        break;
      case 1: // Tuesday: 50/50 Normal/Modifier
        type = roll < 0.5 ? 'NORMAL' : 'MODIFIER';
        break;
      case 2: // Wednesday: 80/20 Crisis/Normal
        type = roll < 0.8 ? 'CRISIS' : 'NORMAL';
        break;
      case 3: // Thursday: 50/50 Boon/Modifier
        type = roll < 0.5 ? 'BOON' : 'MODIFIER';
        break;
      case 4: // Friday: 70/30 Jackpot/Boon
        type = roll < 0.7 ? 'JACKPOT' : 'BOON';
        break;
      default:
        type = 'NORMAL';
    }

    // Select Event based on Type
    switch(type) {
      case 'NORMAL':
        event = getRandomFromPool(NORMAL_EVENTS, daySeed);
        break;
      case 'MODIFIER':
        event = getRandomFromPool(SAFE_MODIFIERS, daySeed);
        break;
      case 'CRISIS':
        event = getRandomFromPool(SAFE_CRISIS, daySeed);
        break;
      case 'BOON':
        event = getRandomFromPool(BOON_EVENTS, daySeed);
        break;
      case 'JACKPOT':
        event = getRandomFromPool(JACKPOT_EVENTS, daySeed);
        break;
    }

    return {
      day: dayName,
      dayIndex: index,
      type,
      event: event || { text: 'Quiet Day', description: 'Nothing notable.', type: 'FLAVOR' }
    };
  });
}

// --- Helpers ---

export function getEventMechanics(scheduleDay) {
  if (!scheduleDay || !scheduleDay.event) return {};
  const e = scheduleDay.event;
  
  // Extract mechanics based on event structure
  if (e.modifier) return e.modifier; // Crisis/Modifier events
  if (e.type === 'BOON') return { boon: true, target: e.targetType || e.targetTag };
  if (e.type === 'JACKPOT') return { jackpot: true, id: e.id };
  
  return {};
}

export function applyScheduleEvent(scheduleDay, gameState) {
  const { event, type } = scheduleDay;
  if (!event) return gameState;

  // Build the new state fragment
  let updates = {
    dailyMemo: event,
    activeModifier: null,
    activeCrisis: null,
    crisisActive: false
  };

  if (type === 'NORMAL') {
    // Just a memo, no active modifiers usually
    // Unless flavor memo implies something, but strictly visual
  } else if (type === 'CRISIS' || type === 'MODIFIER') {
    updates.activeModifier = event;
    updates.activeCrisis = event;
    updates.crisisActive = true;
  } else if (type === 'BOON') {
    updates.activeModifier = event; // Treated as modifier for boosts
  } else if (type === 'JACKPOT') {
    updates.activeModifier = event;
    // Jackpots often handled via specific ID checks in GameLogic
  }

  return updates;
}
