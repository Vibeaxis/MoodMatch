// Game logic for classroom mood-matching puzzle game with constraints
import { MEMO_POOL } from './EventData';
import { Award, Zap, Smile, Star, Gift, Users, Shield, TrendingUp, Sun, Coffee } from 'lucide-react';

export const PHILOSOPHY_CONFIG = {
  Traditionalist: {
    id: 'Traditionalist',
    name: 'The Traditionalist',
    description: 'Believes in structure, discipline, and direct instruction.',
    headerText: 'DAILY INSTRUCTIONAL PLAN',
    headerColor: 'text-blue-900 border-blue-900',
    keywords: ['rigor', 'standards', 'discipline', 'focus', 'fundamentals'],
    favoredCategories: ['Lecture', 'Discipline'],
    xpBonus: 5,
    sRankBonus: 0,
    visualStyle: 'stamp'
  },
  Progressive: {
    id: 'Progressive',
    name: 'The Progressive',
    description: 'Focuses on student-centered, active, and holistic learning.',
    headerText: 'COMMUNITY LEARNING LOG',
    headerColor: 'text-green-800 border-green-800',
    keywords: ['growth', 'exploration', 'community', 'discovery', 'holistic'],
    favoredCategories: ['Kinetic', 'Media'],
    xpBonus: 5,
    sRankBonus: 0,
    visualStyle: 'postit'
  },
  Pragmatist: {
    id: 'Pragmatist',
    name: 'The Pragmatist',
    description: 'Adapts to whatever works best to get results.',
    headerText: 'CLASSROOM METRICS SHEET',
    headerColor: 'text-purple-900 border-purple-900',
    keywords: ['efficiency', 'outcomes', 'data', 'results', 'adaptive'],
    favoredCategories: [],
    xpBonus: 0,
    sRankBonus: 0.10, // 10%
    visualStyle: 'graph'
  }
};
// --- JOB TITLES (The Status) ---
export const RANK_CONFIG = [
  { index: 0, name: 'Substitute Teacher', minXP: 0 },       // Matches Kindergarten
  { index: 1, name: 'Elementary Teacher', minXP: 600 },     // Matches Elementary Unlock
  { index: 2, name: 'Middle School Teacher', minXP: 2200 }, // Matches Middle School Unlock
  { index: 3, name: 'High School Teacher', minXP: 5000 },   // Matches High School Unlock
  { index: 4, name: 'Department Head', minXP: 10000 },      // Matches Undergrad (Professors are Dept Heads)
  { index: 5, name: 'Assistant Principal', minXP: 20000 },  // Matches Graduate School
  { index: 6, name: 'Principal', minXP: 35000 },            // Endgame Prestige
  { index: 7, name: 'Superintendent', minXP: 60000 },       // Endgame Prestige
  { index: 8, name: 'Dean of College', minXP: 100000 }      // God Mode
];

// --- ENVIRONMENTS (The Gameplay) ---
export const GRADE_LEVELS = [
  { 
    id: 'kindergarten', 
    name: 'Kindergarten', 
    minXP: 0, 
    nextThreshold: 600 
  },
  { 
    id: 'elementary', 
    name: 'Elementary School', 
    minXP: 600, 
    nextThreshold: 2200 
  },
  { 
    id: 'middle', 
    name: 'Middle School', 
    minXP: 2200, 
    nextThreshold: 5000 
  },
  { 
    id: 'high', 
    name: 'High School', 
    minXP: 5000, 
    nextThreshold: 10000 
  },
  { 
    id: 'undergrad', 
    name: 'Undergraduate', 
    minXP: 10000, 
    nextThreshold: 20000 
  },
  { 
    id: 'grad', 
    name: 'Graduate School', 
    minXP: 20000, 
    nextThreshold: Infinity 
  }
];
// --- DISTRICT DIRECTIVES (Quests) ---
export const DISTRICT_DIRECTIVES = [
  // --- EXISTING & EASY ---
  { id: 'dd1', title: 'Diversity Mandate', description: 'Use cards from at least 3 different categories this shift.', type: 'diversity', targetDiversity: 3, xpBonus: 200, difficulty: 'Medium' },
  { id: 'dd2', title: 'Kinetic Focus', description: 'Successfully use a Kinetic card.', type: 'category-target', category: 'Kinetic', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd3', title: 'Media Integration', description: 'Successfully use a Media card.', type: 'category-target', category: 'Media', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd4', title: 'Discipline Enforcement', description: 'Successfully use a Discipline card.', type: 'category-target', category: 'Discipline', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd5', title: 'Lecture Series', description: 'Successfully use a Lecture card.', type: 'category-target', category: 'Lecture', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd6', title: 'Excellence Initiative', description: 'Achieve an S-Rank result.', type: 'grade-target', targetGrade: 'S', xpBonus: 300, difficulty: 'Hard' },
  { id: 'dd7', title: 'Consistency Check', description: 'Maintain a streak of at least 3.', type: 'streak-target', targetStreak: 3, xpBonus: 200, difficulty: 'Medium' },
  { id: 'dd8', title: 'No Incidents', description: 'Complete the shift without getting an F-Rank.', type: 'no-fail', xpBonus: 200, difficulty: 'Medium' },
  
  // --- MOOD TARGETS (Reactive Gameplay) ---
  { id: 'dd9', title: 'High Energy Handler', description: 'Solve a High Energy mood problem.', type: 'mood-target', targetMood: 'HighEnergy', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd17', title: 'Wake Up Call', description: 'Solve a Low Energy mood problem.', type: 'mood-target', targetMood: 'LowEnergy', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd18', title: 'Rebellion Quashed', description: 'Solve a Rebellious mood problem.', type: 'mood-target', targetMood: 'Rebellious', xpBonus: 250, difficulty: 'Medium' },
  { id: 'dd19', title: 'Focus Group', description: 'Solve a Distracted mood problem.', type: 'mood-target', targetMood: 'Distracted', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd20', title: 'Reality Check', description: 'Solve an Existential mood problem.', type: 'mood-target', targetMood: 'Existential', xpBonus: 300, difficulty: 'Hard' },
  { id: 'dd21', title: 'Hydration Station', description: 'Solve a Hungover mood problem.', type: 'mood-target', targetMood: 'Hungover', xpBonus: 300, difficulty: 'Hard' },
  { id: 'dd22', title: 'Calm the Panic', description: 'Solve an Anxious mood problem.', type: 'mood-target', targetMood: 'Anxious', xpBonus: 250, difficulty: 'Medium' },

  // --- TAG TARGETS (Constraints) ---
  { id: 'dd10', title: 'Quiet Time', description: 'Use a card with the "Quiet" tag.', type: 'constraint-target', targetConstraint: 'Quiet', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd11', title: 'Active Learning', description: 'Use a card with the "Active" tag.', type: 'constraint-target', targetConstraint: 'Active', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd12', title: 'Group Dynamics', description: 'Use a card with the "Social" tag.', type: 'constraint-target', targetConstraint: 'Social', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd13', title: 'Independent Study', description: 'Use a card with the "Individual" tag.', type: 'constraint-target', targetConstraint: 'Individual', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd14', title: 'The Great Outdoors', description: 'Use a card with the "Outdoor" tag.', type: 'constraint-target', targetConstraint: 'Outdoor', xpBonus: 250, difficulty: 'Medium' },
  { id: 'dd15', title: 'Serious Business', description: 'Use a card with the "Serious" tag.', type: 'constraint-target', targetConstraint: 'Serious', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd16', title: 'Mandatory Fun', description: 'Use a card with the "Playful" tag.', type: 'constraint-target', targetConstraint: 'Playful', xpBonus: 200, difficulty: 'Easy' },

  // --- NEW TECH & BRAIN TARGETS ---
  { id: 'dd_tech_1', title: 'Digital Transformation', description: 'Use a card with the "Digital" tag.', type: 'constraint-target', targetConstraint: 'Digital', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd_tech_2', title: 'Analog Revival', description: 'Use a card with the "Analog" tag.', type: 'constraint-target', targetConstraint: 'Analog', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd_brain_1', title: 'Right Brain Workout', description: 'Use a card with the "Creative" tag.', type: 'constraint-target', targetConstraint: 'Creative', xpBonus: 200, difficulty: 'Easy' },
  { id: 'dd_brain_2', title: 'Left Brain Logic', description: 'Use a card with the "Logic" tag.', type: 'constraint-target', targetConstraint: 'Logic', xpBonus: 200, difficulty: 'Easy' },

  // --- HIGH DIFFICULTY CHALLENGES ---
  { id: 'dd23', title: 'Streak Master', description: 'Reach a streak of 5 during the shift.', type: 'streak-target', targetStreak: 5, xpBonus: 400, difficulty: 'Hard' },
  { id: 'dd24', title: 'Double Excellence', description: 'Achieve at least 2 S-Rank results this shift.', type: 'grade-count-target', targetGrade: 'S', count: 2, xpBonus: 500, difficulty: 'Expert' },
  { id: 'dd25', title: 'Total Lockdown', description: 'Use 2 Discipline cards in a single shift.', type: 'category-count-target', category: 'Discipline', count: 2, xpBonus: 300, difficulty: 'Medium' }
];

export const SUPPLY_SYNERGIES = {
  'Hamster Habitat': { id: 'syn_hamster', name: 'Class Pet Duty', lessonType: 'Kinetic', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Playful'], description: 'Care for the class hamster.' },
  'Coffee Maker': { id: 'syn_coffee', name: 'Caffeine Study', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet'], description: 'Hyper-focused reading session.' },
  'Projector': { id: 'syn_projector', name: 'Cinema Day', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Social', 'Playful', 'Quiet'], description: 'Watch a relevant movie.' },
  'Whiteboard Set': { id: 'syn_whiteboard', name: 'Group Mind Map', lessonType: 'Lecture', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Loud'], description: 'Collaborative brainstorming.' },
  'Bean Bag Chairs': { id: 'syn_beanbag', name: 'Reading Corner', lessonType: 'Kinetic', tags: ['Indoor', 'Passive', 'Individual', 'Quiet', 'Playful'], description: 'Relaxed independent reading.' },
  'Art Supplies': { id: 'syn_art', name: 'Mural Painting', lessonType: 'Kinetic', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud'], description: 'Creative expression.' },
  'Science Kit': { id: 'syn_science', name: 'Explosion Lab', lessonType: 'Kinetic', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud'], description: 'Messy chemistry experiments.' },
  'Music Instruments': { id: 'syn_music', name: 'Jam Session', lessonType: 'Media', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud'], description: 'Make some noise.' }
};

export const STUDENT_SUBMISSION_TEMPLATES = {
  Traditionalist: [
    { id: 't1', title: 'The Importance of Silence', excerpt: '...therefore, absolute silence is the only way to ensure information retention...', style: 'handwritten', philosophy: 'Traditionalist', keywords: ['silence', 'retention', 'discipline'] },
    { id: 't2', title: 'Drill and Kill: A Defense', excerpt: '...repetition is the mother of learning. We must not fear the drill...', style: 'typed', philosophy: 'Traditionalist', keywords: ['repetition', 'drill', 'mastery'] },
    { id: 't3', title: 'Respecting Authority', excerpt: '...the teacher is the captain of the ship. Mutiny cannot be tolerated...', style: 'formal', philosophy: 'Traditionalist', keywords: ['authority', 'order', 'respect'] }
  ],
  Progressive: [
    { id: 'p1', title: 'Learning Through Play', excerpt: '...when the child constructs their own reality through blocks, they learn physics...', style: 'colorful', philosophy: 'Progressive', keywords: ['play', 'construct', 'discovery'] },
    { id: 'p2', title: 'The Democratic Classroom', excerpt: '...we voted on the curriculum today. Engagement is up 200%...', style: 'doodle', philosophy: 'Progressive', keywords: ['vote', 'engagement', 'democracy'] },
    { id: 'p3', title: 'Emotional Intelligence First', excerpt: '...before we learn math, we must learn to name our feelings...', style: 'emotional', philosophy: 'Progressive', keywords: ['feelings', 'empathy', 'whole-child'] }
  ],
  Pragmatist: [
    { id: 'pr1', title: 'Efficiency in Testing', excerpt: '...multiple choice allows for grading 300 papers in 10 minutes. It just works...', style: 'minimal', philosophy: 'Pragmatist', keywords: ['efficiency', 'speed', 'data'] },
    { id: 'pr2', title: 'Results Oriented Teaching', excerpt: '...if the test scores go up, the method was correct. End of discussion...', style: 'chart', philosophy: 'Pragmatist', keywords: ['results', 'scores', 'metrics'] },
    { id: 'pr3', title: 'Adaptive Strategies', excerpt: '...I used a puppet because it worked. Tomorrow I will use a spreadsheet...', style: 'messy', philosophy: 'Pragmatist', keywords: ['adaptive', 'flexible', 'outcome'] }
  ]
};

export const CONSTRAINT_TAGS = {
  // Environment
  Indoor: { pair: 'Outdoor', label: 'Indoors' },
  Outdoor: { pair: 'Indoor', label: 'Outdoors' },
  // Volume
  Loud: { pair: 'Quiet', label: 'Loud' },
  Quiet: { pair: 'Loud', label: 'Quiet' },
  // Energy
  Active: { pair: 'Passive', label: 'Active' },
  Passive: { pair: 'Active', label: 'Passive' },
  // Social
  Social: { pair: 'Individual', label: 'Group' },
  Individual: { pair: 'Social', label: 'Solo' },
  // Tone
  Serious: { pair: 'Playful', label: 'Serious' },
  Playful: { pair: 'Serious', label: 'Fun' },
  
  // --- NEW ADDITIONS ---
  // Technology
  Digital: { pair: 'Analog', label: 'Tech' },
  Analog: { pair: 'Digital', label: 'Lo-Fi' },
  // Brain Type
  Creative: { pair: 'Logic', label: 'Artsy' },
  Logic: { pair: 'Creative', label: 'Facts' }
};

export const LESSON_TYPES = {
  Kinetic: { 
    color: 'red', 
    bgClass: 'bg-red-700', 
    base: 'bg-red-700', 
    tab: 'bg-red-600', 
    shadow: 'shadow-red-900/50', 
    description: 'Physical Activity' 
  },
  Media: { 
    color: 'blue', 
    bgClass: 'bg-blue-700', 
    base: 'bg-blue-700', 
    tab: 'bg-blue-600', 
    shadow: 'shadow-blue-900/50', 
    description: 'Video/Audio Content' 
  },
  Discipline: { 
    color: 'yellow', 
    bgClass: 'bg-amber-600', 
    base: 'bg-amber-600', 
    tab: 'bg-amber-500', 
    shadow: 'shadow-amber-900/50', 
    description: 'Rules & Structure' 
  },
  Lecture: { 
    color: 'green', 
    bgClass: 'bg-emerald-700', 
    base: 'bg-emerald-700', 
    tab: 'bg-emerald-600', 
    shadow: 'shadow-emerald-900/50', 
    description: 'Direct Instruction' 
  },
  Sabbatical: { 
    color: 'purple', 
    bgClass: 'bg-purple-600', 
    base: 'bg-purple-600', 
    tab: 'bg-purple-500', 
    shadow: 'shadow-purple-900/50', 
    description: 'Rest & Recovery' 
  },
  Extracurricular: { 
    color: 'orange', 
    bgClass: 'bg-orange-500', 
    base: 'bg-orange-500', 
    tab: 'bg-orange-400', 
    shadow: 'shadow-orange-900/50', 
    description: 'Bonus Activities' 
  }
};
export const ACTIVITY_CARDS = {
  Kinetic: [
    { id: 'k1', name: 'Playground Run', lessonType: 'Kinetic', tags: ['Outdoor', 'Active', 'Loud', 'Social', 'Playful', 'Analog'], description: 'Burn energy outside.' },
    { id: 'k2', name: 'Chair Yoga', lessonType: 'Kinetic', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Analog', 'Logic'], description: 'Stretch quietly at desks.' },
    { id: 'k3', name: 'Dance Freeze', lessonType: 'Kinetic', tags: ['Indoor', 'Active', 'Loud', 'Social', 'Playful', 'Analog', 'Creative'], description: 'Stop when music stops.' },
    { id: 'k4', name: 'Sensory Bin', lessonType: 'Kinetic', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Playful', 'Analog', 'Creative'], description: 'Tactile exploration.' },
    { id: 'k5', name: 'Dodgeball', lessonType: 'Kinetic', tags: ['Indoor', 'Active', 'Loud', 'Social', 'Playful', 'Analog'], description: 'Competitive team sport.' },
    { id: 'k6', name: 'Nature Walk', lessonType: 'Kinetic', tags: ['Outdoor', 'Active', 'Quiet', 'Social', 'Serious', 'Analog', 'Logic'], description: 'Observing environment.' },
    { id: 'k7', name: 'Relay Race', lessonType: 'Kinetic', tags: ['Outdoor', 'Active', 'Loud', 'Social', 'Playful', 'Analog'], description: 'Team speed competition.' },
    { id: 'k8', name: 'Silent Stretching', lessonType: 'Kinetic', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Analog', 'Logic'], description: 'Focus and flexibility.' },
    { id: 'k9', name: 'Balloon Volleyball', lessonType: 'Kinetic', tags: ['Indoor', 'Active', 'Quiet', 'Social', 'Playful', 'Analog'], description: 'Keep it off the floor.' },
    { id: 'k10', name: 'Gardening', lessonType: 'Kinetic', tags: ['Outdoor', 'Active', 'Quiet', 'Social', 'Serious', 'Analog', 'Logic'], description: 'Planting and caring.' },
    { id: 'k11', name: 'Scavenger Hunt', lessonType: 'Kinetic', tags: ['Outdoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog', 'Creative'], description: 'Find hidden items.' },
    { id: 'k12', name: 'Yoga Flow', lessonType: 'Kinetic', tags: ['Indoor', 'Active', 'Quiet', 'Individual', 'Serious', 'Analog', 'Logic'], description: 'Continuous movement.' },
    { id: 'k13', name: 'Obstacle Course', lessonType: 'Kinetic', tags: ['Outdoor', 'Active', 'Loud', 'Social', 'Playful', 'Analog'], description: 'Agility challenge.' }
  ],
  Media: [
    { id: 'm1', name: 'Nature Doc', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Quiet', 'Serious', 'Individual', 'Digital', 'Logic'], description: 'Calming visuals.' },
    { id: 'm2', name: 'Pop Music Vid', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Loud', 'Playful', 'Social', 'Digital', 'Creative'], description: 'Upbeat sing-along.' },
    { id: 'm3', name: 'Audiobook', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Digital', 'Creative'], description: 'Listen and visualize.' },
    { id: 'm4', name: 'Virtual AR Tour', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Playful', 'Digital', 'Logic'], description: 'Digital field trip.' },
    { id: 'm5', name: 'Interactive Quiz', lessonType: 'Media', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Digital', 'Logic'], description: 'Gamified learning.' },
    { id: 'm6', name: 'Silent Film', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Digital', 'Creative'], description: 'Visual storytelling.' },
    { id: 'm7', name: 'Podcast Session', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Digital', 'Logic'], description: 'Audio learning.' },
    { id: 'm8', name: 'News Broadcast', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Loud', 'Digital', 'Logic'], description: 'Current events.' },
    { id: 'm9', name: 'Coding Lab', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Digital', 'Logic'], description: 'Logic puzzles.' },
    { id: 'm10', name: 'Student Radio', lessonType: 'Media', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog', 'Creative'], description: 'Creative broadcasting.' },
    { id: 'm11', name: 'Newsreel', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Quiet', 'Digital', 'Logic'], description: 'Historical footage.' },
    { id: 'm12', name: 'Music History', lessonType: 'Media', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Digital', 'Creative'], description: 'Genre appreciation.' },
    { id: 'm13', name: 'Video Editing', lessonType: 'Media', tags: ['Indoor', 'Active', 'Individual', 'Serious', 'Quiet', 'Digital', 'Creative'], description: 'Creative tech skill.' }
  ],
  Discipline: [
    { id: 'd1', name: 'Pop Quiz', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Analog', 'Logic'], description: 'Surprise assessment.' },
    { id: 'd2', name: 'Class Debate', lessonType: 'Discipline', tags: ['Indoor', 'Active', 'Loud', 'Social', 'Serious', 'Analog', 'Logic'], description: 'Structured argument.' },
    { id: 'd3', name: 'Silent Time', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Quiet', 'Individual', 'Serious', 'Analog'], description: 'Heads down, no talking.' },
    { id: 'd4', name: 'Peer Mediation', lessonType: 'Discipline', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Conflict resolution.' },
    { id: 'd5', name: 'Desk Audit', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Organization check.' },
    { id: 'd6', name: 'Restorative Circle', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Quiet', 'Analog', 'Creative'], description: 'Group discussion.' },
    { id: 'd7', name: 'Behavior Contract', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Written agreement.' },
    { id: 'd8', name: 'Hallway Lines', lessonType: 'Discipline', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Quiet', 'Analog'], description: 'Orderly movement.' },
    { id: 'd9', name: 'Roleplay Rules', lessonType: 'Discipline', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog', 'Creative'], description: 'Acting out scenarios.' },
    { id: 'd10', name: 'Detention Study', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Focused catch-up.' },
    { id: 'd11', name: 'Uniform Check', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog'], description: 'Standard enforcement.' },
    { id: 'd12', name: 'Clean Up', lessonType: 'Discipline', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Loud', 'Analog'], description: 'Community service.' },
    { id: 'd13', name: 'Silent Lunch', lessonType: 'Discipline', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Quiet', 'Analog'], description: 'Peaceful eating.' }
  ],
  Lecture: [
    { id: 'l1', name: 'Chalkboard', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Quiet', 'Serious', 'Individual', 'Analog', 'Logic'], description: 'Copy notes from board.' },
    { id: 'l2', name: 'Socratic Circle', lessonType: 'Lecture', tags: ['Indoor', 'Active', 'Loud', 'Social', 'Serious', 'Analog', 'Logic'], description: 'Student-led discussion.' },
    { id: 'l3', name: 'Guest Speaker', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Quiet', 'Social', 'Serious', 'Analog'], description: 'Listen to expert.' },
    { id: 'l4', name: 'Flashcards', lessonType: 'Lecture', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog', 'Logic'], description: 'Quick recall.' },
    { id: 'l5', name: 'Lab Demo', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Scientific observation.' },
    { id: 'l6', name: 'Storytelling', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Social', 'Playful', 'Quiet', 'Analog', 'Creative'], description: 'Narrative engagement.' },
    { id: 'l7', name: 'Peer Teaching', lessonType: 'Lecture', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Loud', 'Analog', 'Logic'], description: 'Students teach students.' },
    { id: 'l8', name: 'Outdoor Seminar', lessonType: 'Lecture', tags: ['Outdoor', 'Passive', 'Social', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Fresh air discussion.' },
    { id: 'l9', name: 'Brainstorm Wall', lessonType: 'Lecture', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Quiet', 'Analog', 'Creative'], description: 'Collective ideation.' },
    { id: 'l10', name: 'Textbook Dive', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Deep reading.' },
    { id: 'l11', name: 'Pop Culture Analysis', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Social', 'Playful', 'Loud', 'Digital', 'Creative'], description: 'Relatable learning.' },
    { id: 'l12', name: 'Debate Prep', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Evidence gathering.' },
    { id: 'l13', name: 'Career Day', lessonType: 'Lecture', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Quiet', 'Analog'], description: 'Future planning.' }
  ],
  Sabbatical: [
    { id: 's1', name: 'Sick Day', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Individual', 'Quiet'], description: 'Take a break to recover.' },
    { id: 's2', name: 'Half-Day', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Quiet', 'Playful'], description: 'Shortened schedule.' },
    { id: 's3', name: 'Substitute', lessonType: 'Sabbatical', tags: ['Indoor', 'Active', 'Social', 'Serious'], description: 'Call in a sub.' },
    { id: 's4', name: 'Grading Marathon', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet'], description: 'Catch up on paperwork.' },
    { id: 's5', name: 'Coffee Break', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Individual', 'Quiet', 'Playful'], description: 'Caffeine recharge.' },
    { id: 's6', name: 'PD Workshop', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Quiet'], description: 'Professional development.' },
    { id: 's7', name: 'Planning Period', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet'], description: 'Prep next week.' },
    { id: 's8', name: 'Staff Meeting', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Loud'], description: 'Faculty announcements.' },
    { id: 's9', name: 'Supply Run', lessonType: 'Sabbatical', tags: ['Outdoor', 'Active', 'Individual', 'Serious'], description: 'Restocking essentials.' },
    { id: 's10', name: 'Mental Health Day', lessonType: 'Sabbatical', tags: ['Outdoor', 'Passive', 'Individual', 'Quiet', 'Playful'], description: 'Total disconnect.' },
    { id: 's11', name: 'Parent Conference', lessonType: 'Sabbatical', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Quiet'], description: 'Discuss progress.' },
    { id: 's12', name: 'Desk Nap', lessonType: 'Sabbatical', tags: ['Indoor', 'Passive', 'Individual', 'Quiet', 'Playful'], description: 'Quick power snooze.' },
    { id: 's13', name: 'Union Rep Chat', lessonType: 'Sabbatical', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Quiet'], description: 'Know your rights.' }
  ],
  Extracurricular: [
    { id: 'e1', name: 'Guest Speaker', lessonType: 'Extracurricular', tags: ['Indoor', 'Passive', 'Social', 'Serious', 'Analog'], description: 'Invite an expert.', xpReward: 50 },
    { id: 'e2', name: 'Field Trip', lessonType: 'Extracurricular', tags: ['Outdoor', 'Active', 'Social', 'Playful', 'Analog'], description: 'Learning outside.', xpReward: 100 },
    { id: 'e3', name: 'School Assembly', lessonType: 'Extracurricular', tags: ['Indoor', 'Passive', 'Social', 'Loud', 'Analog'], description: 'Whole school gathering.', xpReward: 75 },
    { id: 'e4', name: 'Science Fair', lessonType: 'Extracurricular', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Student experiments.', xpReward: 120 },
    { id: 'e5', name: 'Talent Show', lessonType: 'Extracurricular', tags: ['Indoor', 'Passive', 'Social', 'Playful', 'Loud', 'Analog', 'Creative'], description: 'Showcase skills.', xpReward: 90 },
    { id: 'e6', name: 'Spelling Bee', lessonType: 'Extracurricular', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Vocabulary contest.', xpReward: 60 },
    { id: 'e7', name: 'Bake Sale', lessonType: 'Extracurricular', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog'], description: 'Fundraising event.', xpReward: 40 },
    { id: 'e8', name: 'Robotics Club', lessonType: 'Extracurricular', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Loud', 'Digital', 'Logic'], description: 'Build and battle.', xpReward: 110 },
    { id: 'e9', name: 'School Play', lessonType: 'Extracurricular', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog', 'Creative'], description: 'Drama production.', xpReward: 150 },
    { id: 'e10', name: 'Pep Rally', lessonType: 'Extracurricular', tags: ['Indoor', 'Active', 'Social', 'Playful', 'Loud', 'Analog'], description: 'School spirit.', xpReward: 80 },
    { id: 'e11', name: 'Yearbook Staff', lessonType: 'Extracurricular', tags: ['Indoor', 'Active', 'Social', 'Serious', 'Quiet', 'Digital', 'Creative'], description: 'Document memories.', xpReward: 70 },
    { id: 'e12', name: 'Chess Tournament', lessonType: 'Extracurricular', tags: ['Indoor', 'Passive', 'Individual', 'Serious', 'Quiet', 'Analog', 'Logic'], description: 'Strategic battles.', xpReward: 85 },
    { id: 'e13', name: 'Garden Club', lessonType: 'Extracurricular', tags: ['Outdoor', 'Active', 'Social', 'Serious', 'Quiet', 'Analog'], description: 'Growing vegetables.', xpReward: 65 }
  ]
};
export const MOOD_SOLUTION_MATRIX = {
  // --- Existing Moods (Expanded) ---
  HighEnergy: {
    solution: 'Kinetic',
    behaviors: [
      "Students are bouncing off the walls.",
      "The class is vibrating at a frequency that threatens the windows.",
      "A small group is attempting to start a mosh pit near the cubbies.",
      "Students are running laps around their desks in tight, frantic circles.",
      "Someone just tried to parkour off the smartboard.",
      "The floor is shaking because everyone is tapping their feet in unison.",
      "They are passing notes at the speed of sound."
    ]
  },
  LowEnergy: {
    solution: 'Media',
    behaviors: [
      "Everyone is yawning and struggling to keep their eyes open.",
      "Students are melting into their chairs like warm cheese.",
      "The collective energy levels have dropped into a catatonic state.",
      "Half the class is using their textbooks as makeshift pillows.",
      "Breathing seems to have become a voluntary group effort.",
      "A student is trying to learn by osmosis by resting their head on the book.",
      "The blinking rate has slowed to once per minute."
    ]
  },
  Rebellious: {
    solution: 'Discipline',
    behaviors: [
      "There is open defiance and systematic rule-breaking occurring.",
      "Students have begun dismantling the furniture to build a fort.",
      "A formal list of demands has been taped to your coffee mug.",
      "Instructions are being ignored with professional-grade intensity.",
      "They have declared the reading corner an 'Autonomous Zone'.",
      "Someone is shredding the syllabus while maintaining eye contact.",
      "The class mascot has been taken hostage until demands are met."
    ]
  },
  Distracted: {
    solution: 'Lecture',
    behaviors: [
      "Attention is scattered and side conversations are rampant.",
      "Students are attempting to communicate via complex blinking codes.",
      "Most of the back row is currently trading crypto-currency.",
      "Everyone is focusing on literally anything except the whiteboard.",
      "A pigeon outside has captured 100% of the class's mental bandwidth.",
      "They are intensely debating the flavor profile of glue.",
      "Someone is live-streaming the lecture to zero viewers."
    ]
  },
  Existential: {
    solution: 'Lecture',
    behaviors: [
      "Students are staring into the abyss and questioning reality.",
      "The curriculum is being met with sighs of profound nihilism.",
      "A student just asked if the grading scale is 'merely a social construct'.",
      "The class has collectively decided that nothing matters.",
      "Someone asked if the bell dismissal is just a metaphor for death.",
      "They are refusing to sit, claiming chairs are 'oppressive constructs'.",
      "The vibe is less 'Classroom' and more 'Waiting for Godot'."
    ]
  },
  Hungover: {
    solution: 'Media',
    behaviors: [
      "The room smells of regret and cheap beverages.",
      "Any sudden movement causes audible groaning from the students.",
      "Light sensitivity is at an all-time high; everyone is wearing shades.",
      "The class is moving in slow motion and avoiding eye contact.",
      "The sound of the marker on the whiteboard is causing physical pain.",
      "Hydration levels are critical; water bottles are being clutched like idols.",
      "A student is wearing two pairs of sunglasses simultaneously."
    ]
  },

  // --- NEW MOODS (Expanded) ---
  Anxious: {
    solution: 'Discipline', // Needs structure/routine to feel safe
    behaviors: [
      "Fidgeting is reaching a frantic, synchronized rhythm.",
      "Students are asking for the daily schedule every thirty seconds.",
      "The sound of a pencil dropping causes half the class to jump.",
      "Nervous whispers about 'The Big Test' are circulating rapidly.",
      "The clicking of ballpoint pens sounds like a swarm of angry cicadas.",
      "Someone is pre-panicking about an assignment due in 2028.",
      "The collective heart rate of the room is audible."
    ]
  },
  Apathetic: {
    solution: 'Kinetic', // Needs movement to snap them out of it
    behaviors: [
      "The collective 'meh' is palpable and heavy.",
      "Students are staring at their shoes with intense indifference.",
      "Every instruction is met with a synchronized, soul-crushing shrug.",
      "The class is moving like they are underwater and hate the water.",
      "You just offered free candy and nobody moved.",
      "The enthusiasm bar is so low it is currently underground.",
      "They are physically present but spiritually buffering."
    ]
  },
  Paranoid: {
    solution: 'Lecture', // Needs hard facts and data to ground them
    behaviors: [
      "Students are checking the ceiling for hidden surveillance.",
      "Every hallway noise is being interpreted as a secret inspection.",
      "Whispering has reached a level of feverish conspiracy.",
      "Students are refusing to write anything down 'for the record'.",
      "They think the fire alarm strobe is a mind-control device.",
      "Notes are being written in invisible ink (lemon juice).",
      "A student asked if you are 'wearing a wire'."
    ]
  },
  Whimsical: {
    solution: 'Extracurricular', // Perfect time for Assemblies/Field Trips
    behaviors: [
      "Spontaneous rhyming has broken out in the third row.",
      "Students are making elaborate paper hats instead of taking notes.",
      "The class has decided to communicate only through interpretive dance.",
      "Whimsy levels are exceeding safe administrative limits.",
      "Someone is trying to pay for lunch with 'dream coins'.",
      "The floor is lava, but emotionally.",
      "They are blowing bubbles and chasing them around the room."
    ]
  },
  BurnedOut: {
    solution: 'Sabbatical', // Needs Sick Days / Half Days
    behaviors: [
      "Heads are resting on desks in a display of total exhaustion.",
      "The students look like they haven't slept since the midterms.",
      "Drool is beginning to threaten the integrity of the worksheets.",
      "The class has the thousand-yard stare of a defeated army.",
      "The coffee maker is the only thing keeping society intact.",
      "A student is crying softly over a dropped eraser.",
      "They have accepted their fate as academic zombies."
    ]
  }
};
export const GRADE_LEVEL_CONFIG = {
  Kindergarten: {
    // Added Anxious and Whimsical
    availableMoods: ['HighEnergy', 'LowEnergy', 'Rebellious', 'Distracted', 'Anxious', 'Whimsical'],
    availableConstraints: ['Indoor', 'Outdoor', 'Active', 'Passive'],
    maxXP: 300,
    unlockStreak: 0
  },
  HighSchool: {
    // Added Apathetic
    availableMoods: ['HighEnergy', 'LowEnergy', 'Rebellious', 'Distracted', 'Existential', 'Anxious', 'Apathetic'],
    availableConstraints: ['Loud', 'Quiet', 'Active', 'Passive', 'Social', 'Individual'],
    maxXP: 500,
    unlockStreak: 3
  },
  College: {
    // Added Paranoid and BurnedOut
    availableMoods: ['HighEnergy', 'LowEnergy', 'Rebellious', 'Distracted', 'Existential', 'Hungover', 'Apathetic', 'Paranoid', 'BurnedOut'],
    availableConstraints: ['Loud', 'Quiet', 'Active', 'Passive', 'Social', 'Individual', 'Serious', 'Playful'],
    maxXP: 1000,
    unlockStreak: 6
  }
};

export const RANK_XP_REWARDS = {
  'S': 100,
  'A': 80,
  'F': 10
};
export const MODULAR_CONSTRAINTS = {
  Indoor: {
    causes: [
      "a sudden acid rain forecast",
      "a swarm of migrating murder hornets",
      "ongoing roof repairs involving lasers",
      "a declared outdoor biohazard event",
      "excessive UV radiation warnings",
      "a drone surveillance grid test outside",
      "the groundskeeper's emotional breakdown"
    ],
    restrictions: [
      "all instructional activities must remain strictly indoors",
      "exterior doors are magnetically sealed",
      "no student may breach the building perimeter",
      "windows have been shuttered for safety",
      "ventilation systems are in lockdown mode",
      "the playground has been designated a lava zone",
      "courtyard privileges are revoked"
    ],
    fluff: [
      "Compliance is mandatory for survival.",
      "The air quality index is 'Spicy'.",
      "Please ignore the scratching at the doors.",
      "Vitamin D is overrated anyway.",
      "District liability insurance has lapsed.",
      "We are currently a subterranean learning unit.",
      "Agoraphobia is encouraged today."
    ]
  },
  Outdoor: {
    causes: [
      "a fumigation schedule error",
      "a localized gravity failure in Room 101",
      "an infestation of intellectual pests",
      "the HVAC system pumping out pure anxiety",
      "a spontaneous indoor flash mob drill",
      "the sudden appearance of a sinkhole",
      "unexplained structural groaning"
    ],
    restrictions: [
      "the classroom has been relocated to the field",
      "learning must occur under the open sky",
      "indoor occupancy is strictly prohibited",
      "evacuate the building for educational purposes",
      "fresh air intake is now a graded metric",
      "desks have been moved to the parking lot",
      "we are now a forest school"
    ],
    fluff: [
      "Nature is the best (and cheapest) classroom.",
      "Breathing indoor air is currently a Tier 3 offense.",
      "The squirrels are now teaching assistants.",
      "Do not feed the wildlife or the students.",
      "Wi-Fi signal is actually better out here.",
      "Sunburns build character.",
      "Grass stains are part of the uniform."
    ]
  },
  Loud: {
    causes: [
      "nearby jackhammer competition",
      "the choir practicing primal screams",
      "a malfunctioning fire alarm (it's a feature)",
      "the soundproofing foam turning into dust",
      "mandatory vocal projection training",
      "a sonic boom from the science lab",
      "the band director's nervous breakdown"
    ],
    restrictions: [
      "activities must compete with 90dB ambient noise",
      "whispering is audibly impossible",
      "verbal instructions must be shouted",
      "silence is effectively banned by physics",
      "noise levels must be maintained above safety thresholds",
      "students must use their 'outdoor voices' inside",
      "auditory overstimulation is the goal"
    ],
    fluff: [
      "Hearing loss is a sign of dedication.",
      "Silence is suspicious.",
      "WHAT DID YOU SAY?",
      "The acoustics are aggressively resonant.",
      "Quiet reflection is for the weak.",
      "Volume knob is stuck on 11.",
      "Earmuffs are contraband."
    ]
  },
  Quiet: {
    causes: [
      "the Superintendent napping in the hall",
      "a migratory flock of librarians nearby",
      "the installation of sound-sensitive explosives",
      "a hangover affecting the entire administration",
      "a test of the new 'Silent but Deadly' protocol",
      "the walls developing ears",
      "a headache epidemic among staff"
    ],
    restrictions: [
      "decibel levels must not exceed a falling feather",
      "all communication must be non-verbal",
      "absolute silence is enforceable by detention",
      "even breathing should be done quietly",
      "sneezing requires a permission slip",
      "vocal chords are on administrative leave",
      "drop a pin and you fail"
    ],
    fluff: [
      "Shhh. They can hear your thoughts.",
      "Mime skills are highly graded.",
      "Silence is golden, and budget-friendly.",
      "The walls are listening.",
      "Noise violations result in paperwork.",
      "Library rules are now martial law.",
      "Zip it, lock it, put it in your pocket."
    ]
  },
  Active: {
    causes: [
      "a surplus of cafeteria sugar",
      "broken chairs in every row",
      "a district mandate against 'sedentary learning'",
      "the floor actually being lava",
      "a kinetic energy harvesting experiment",
      "widespread restless leg syndrome",
      "the heating system failing (stay warm!)"
    ],
    restrictions: [
      "students must remain in constant motion",
      "sitting is statistically linked to failure",
      "stationary learning is prohibited",
      "movement is the only valid answer",
      "cardio is now part of the curriculum",
      "stillness will be interpreted as defiance",
      "desks are merely obstacles now"
    ],
    fluff: [
      "Burn those calories or burn your grade.",
      "If you stop moving, the sensors turn off the lights.",
      "Fidget spinners were just the beginning.",
      "Sweat is just weakness leaving the brain.",
      "Motion blur looks good on report cards.",
      "Run, don't walk, to the answer.",
      "Gravity is optional today."
    ]
  },
  Passive: {
    causes: [
      "a post-lunch carb coma",
      "gravity being turned up to 11",
      "a fragile floor situation",
      "energy conservation budget cuts",
      "a meditation retreat simulation",
      "the air conditioning breaking (too hot to move)",
      "collective existential dread"
    ],
    restrictions: [
      "movement must be kept to an absolute minimum",
      "stay in your seats or face the consequences",
      "energy expenditure is strictly rationed",
      "horizontal learning is encouraged",
      "physical exertion is banned",
      "inertia is our best friend",
      "the class is effectively statues"
    ],
    fluff: [
      "Conservation of energy is the law.",
      "Blinking counts as exercise.",
      "Napping with eyes open is a skill.",
      "Do less, achieve more.",
      "Movement triggers the motion sensors (which explode).",
      "Sloth is a virtue today.",
      "Let the information wash over you."
    ]
  },
  Social: {
    causes: [
      "an outbreak of extreme isolationism",
      "mandated team-building metrics",
      "a shortage of individual supplies",
      "the Hive Mind initiative pilot",
      "codependency training requirements",
      "a lack of partitions",
      "safety in numbers protocols"
    ],
    restrictions: [
      "students must operate as a collective unit",
      "solitary work is considered suspicious",
      "collaboration is not optional",
      "group think is the only think",
      "individualism is temporarily suspended",
      "hold hands (metaphorically) or fail",
      "no student is an island today"
    ],
    fluff: [
      "There is no 'I' in 'Compliance'.",
      "Together we pass, divided we file paperwork.",
      "Sharing is caring (and mandatory).",
      "The collective consciousness grows.",
      "Privacy is a relic of the past.",
      "Group hugs are distinct probability.",
      "Assimilate or remediate."
    ]
  },
  Individual: {
    causes: [
      "a contagious stupidity outbreak",
      "extreme trust issues in the district",
      "standardized testing security measures",
      "a shortage of group tables",
      "the 'Lone Wolf' grant requirements",
      "peer pressure reaching toxic levels",
      "social distancing (emotional)"
    ],
    restrictions: [
      "collaboration is classified as cheating",
      "students must exist in personal bubbles",
      "interaction is strictly forbidden",
      "trust no one, grade everyone",
      "every student for themselves",
      "eye contact is a deduction",
      "teamwork is treason"
    ],
    fluff: [
      "Build your own fortress of solitude.",
      "Friends are just distractions.",
      "Self-reliance is the lesson.",
      "It's a dog-eat-homework world.",
      "The only person you can trust is the teacher.",
      "Isolation builds character.",
      "Bubbles are enforced by lasers."
    ]
  },
  Serious: {
    causes: [
      "a surprise inspection by the Fun Police",
      "the tragic loss of the class mascot",
      "new austerity measures",
      "a ban on serotonin",
      "the curriculum becoming sentient and angry",
      "a collective loss of humor",
      "the ominous hum in the ceiling"
    ],
    restrictions: [
      "smiling is a punishable offense",
      "joy is currently contraband",
      "grim determination is required",
      "laughter will be cited as disruption",
      "irony has been outlawed",
      "maintain a stoic disposition",
      "fun is cancelled until further notice"
    ],
    fluff: [
      "This will go on your permanent record.",
      "Life is suffering, and so is this class.",
      "The beatings will continue until morale worsens.",
      "Seriousness is next to godliness.",
      "We are not here to enjoy ourselves.",
      "Frowns are upside down smiles (which are banned).",
      "Gravitas is 50% of the grade."
    ]
  },
  Playful: {
    causes: [
      "a dangerous surplus of whimsy",
      "the clown college merger",
      "a leak in the laughing gas tanks",
      "mandatory morale improvement",
      "the textbook being replaced by a comic",
      "a glitch in the matrix",
      "the teacher's sudden regression"
    ],
    restrictions: [
      "seriousness is grounds for suspension",
      "silliness is the standard",
      "boredom is illegal",
      "learning must be accidentally fun",
      "rigidity will be mocked",
      "play is the only work allowed",
      "laughter is the new currency"
    ],
    fluff: [
      "Honk if you love learning.",
      "Whimsy is non-negotiable.",
      "If you're not laughing, you're not trying.",
      "Chaos is a ladder (a fun slide).",
      "Put on the red nose or get out.",
      "Life is a carnival.",
      "Logic has left the building."
    ]
  },

  // --- NEW ADDITIONS ---
  
  Digital: {
    causes: [
      "a sponsorship by a shady tech conglomerate",
      "paper being declared 'obsolete' by the board",
      "the Wi-Fi gaining sentience",
      "a surplus of electricity that must be used",
      "the sudden disappearance of all pencils",
      "a hologram replacing the principal"
    ],
    restrictions: [
      "all work must be submitted via hologram",
      "analog tools are strictly forbidden",
      "screens are mandatory for eye contact",
      "learning must be 100% virtual (even in person)",
      "paper is considered contraband",
      "students must speak in binary"
    ],
    fluff: [
      "The future is now.",
      "Buffer your expectations.",
      "If it doesn't plug in, throw it out.",
      "Loading learning modules...",
      "Papercuts are a thing of the past.",
      "We are all just data points."
    ]
  },
  Analog: {
    causes: [
      "a localized electromagnetic pulse",
      "the IT guy quitting in a blaze of glory",
      "a return to 'traditional values'",
      "a severe shortage of charging ports",
      "the robots attempting an uprising",
      "screens causing collective hypnosis"
    ],
    restrictions: [
      "technology is banned within 50 feet",
      "unplug everything immediately",
      "work must be done on stone tablets or paper",
      "calculators are considered cheating",
      "Wi-Fi signals have been jammed",
      "electricity is for lighting only"
    ],
    fluff: [
      "The cloud has evaporated.",
      "Return to monke.",
      "Smell the ink.",
      "Error 404: Computer Not Found.",
      "Hand cramps build character.",
      "Disconnect to reconnect."
    ]
  },
  Creative: {
    causes: [
      "a muse escaping captivity",
      "logic being outlawed by the art department",
      "a collective fever dream",
      "the curriculum becoming too rigid",
      "a surplus of glitter",
      "interpretive dance becoming mandatory"
    ],
    restrictions: [
      "answers must be painted, not written",
      "facts are optional, feelings are mandatory",
      "structure is the enemy",
      "think outside the box (the box is gone)",
      "logic will be penalized",
      "express yourself or face detention"
    ],
    fluff: [
      "There are no mistakes, only happy accidents.",
      "Color outside the lines.",
      "2 + 2 = Blue.",
      "Feel the algebra.",
      "Glitter is forever.",
      "Make it weird."
    ]
  },
  Logic: {
    causes: [
      "a visit from the Vulcans",
      "an emotional suppression field",
      "the art room being converted to storage",
      "chaos levels reaching critical mass",
      "a shortage of imagination",
      "standardized testing preparations"
    ],
    restrictions: [
      "creativity is inefficient",
      "facts only, no feelings",
      "art is subjective and therefore banned",
      "answers must be mathematically proven",
      "imagination is a distraction",
      "whimsy will be cited"
    ],
    fluff: [
      "Does not compute.",
      "Feelings are irrelevant.",
      "Show your work.",
      "The answer is absolute.",
      "Color is a distraction.",
      "Order must be maintained."
    ]
  }
};
// --- BOON SYSTEM ---

export const MINOR_BOONS = [
  { id: 'mb1', name: 'Morale Boost', description: 'Small improvement to classroom mood.', flavor: 'A student brought you an apple.', type: 'morale', effect: 'add', value: 10, icon: Smile, color: 'text-amber-500', rarity: 'common' },
  { id: 'mb2', name: 'Coffee Break', description: 'Free reroll for the next event.', flavor: 'Found a full pot in the breakroom!', type: 'reroll', effect: 'add', value: 1, icon: Coffee, color: 'text-amber-800', rarity: 'common' },
  { id: 'mb3', name: 'XP Trickle', description: 'Small XP bonus.', flavor: 'You found a typo in the textbook.', type: 'xp', effect: 'add', value: 50, icon: Zap, color: 'text-yellow-500', rarity: 'common' },
  { id: 'mb4', name: 'Supply Drop', description: 'Gain a random minor supply.', flavor: 'The janitor left a box of chalk.', type: 'supply', effect: 'random', value: 1, icon: Gift, color: 'text-blue-500', rarity: 'common' },
  { id: 'mb5', name: 'Student Appreciation', description: 'Bonus streak points.', flavor: 'They actually listened today.', type: 'streak', effect: 'add', value: 2, icon: Star, color: 'text-yellow-400', rarity: 'common' },
  { id: 'mb6', name: 'Colleague Support', description: 'XP bonus for collaboration.', flavor: 'Shared lesson plans save lives.', type: 'xp', effect: 'add', value: 75, icon: Users, color: 'text-green-500', rarity: 'common' },
  { id: 'mb7', name: 'Admin Approval', description: 'Slight reputation increase.', flavor: 'The principal nodded at you.', type: 'xp', effect: 'add', value: 60, icon: Shield, color: 'text-purple-500', rarity: 'common' },
  { id: 'mb8', name: 'Perfect Weather', description: 'Outdoor activities buffed.', flavor: 'Not too hot, not too cold.', type: 'buff', effect: 'duration', value: 1, icon: Sun, color: 'text-orange-400', rarity: 'common' },
  { id: 'mb9', name: 'Early Dismissal', description: 'Reduced puzzle requirement.', flavor: 'Staff meeting cancelled!', type: 'pacing', effect: 'reduce', value: 1, icon: TrendingUp, color: 'text-red-500', rarity: 'common' },
  { id: 'mb10', name: 'Found Stapler', description: 'It was under the desk.', flavor: 'A small victory.', type: 'morale', effect: 'add', value: 5, icon: Award, color: 'text-gray-500', rarity: 'common' }
];

export const MODERATE_BOONS = [
  { id: 'mod1', name: 'Morale Surge', description: 'Significant mood improvement.', flavor: 'Pizza party approved!', type: 'morale', effect: 'add', value: 25, icon: Smile, color: 'text-amber-600', rarity: 'uncommon' },
  { id: 'mod2', name: 'Rank Boost', description: 'Next puzzle grade +1.', flavor: 'You are in the zone.', type: 'rank', effect: 'boost', value: 1, icon: TrendingUp, color: 'text-green-600', rarity: 'uncommon' },
  { id: 'mod3', name: 'Major XP Boost', description: 'Large XP bonus.', flavor: 'Curriculum grant approved.', type: 'xp', effect: 'add', value: 250, icon: Zap, color: 'text-yellow-600', rarity: 'uncommon' },
  { id: 'mod4', name: 'Supply Jackpot', description: 'Gain rare supply item.', flavor: 'New tablets arrived!', type: 'supply', effect: 'random_rare', value: 1, icon: Gift, color: 'text-blue-600', rarity: 'uncommon' },
  { id: 'mod5', name: 'Superintendent Visit', description: 'Massive XP if next puzzle S-rank.', flavor: 'They are watching. Shine.', type: 'challenge', effect: 'wager', value: 500, icon: Users, color: 'text-purple-600', rarity: 'uncommon' },
  { id: 'mod6', name: 'Parent Appreciation', description: 'Supplies cost less streak.', flavor: 'PTA funding secured.', type: 'discount', effect: 'duration', value: 3, icon: Award, color: 'text-pink-500', rarity: 'uncommon' },
  { id: 'mod7', name: 'Student Success', description: 'Streak doubled.', flavor: 'They passed the state test!', type: 'streak', effect: 'multiply', value: 2, icon: Star, color: 'text-yellow-500', rarity: 'uncommon' },
  { id: 'mod8', name: 'Budget Approval', description: 'Free supply requisition.', flavor: 'Use it or lose it.', type: 'supply_token', effect: 'add', value: 1, icon: Gift, color: 'text-green-600', rarity: 'uncommon' },
  { id: 'mod9', name: 'Colleague Collab', description: 'Next 3 puzzles auto-hint.', flavor: 'Team teaching works.', type: 'hint', effect: 'add', value: 3, icon: Users, color: 'text-blue-500', rarity: 'uncommon' },
  { id: 'mod10', name: 'Perfect Lesson', description: 'Auto S-Rank next puzzle.', flavor: 'Lightning in a bottle.', type: 'auto_s', effect: 'once', value: 1, icon: Star, color: 'text-amber-500', rarity: 'uncommon' }
];

export const LEGENDARY_BOONS = [
  { id: 'leg1', name: 'The Perfect Day', description: 'Max morale, S-Ranks easier.', flavor: 'Everything is going right.', type: 'state', effect: 'max', value: 100, icon: Sun, color: 'text-yellow-400 animate-pulse', rarity: 'legendary' },
  { id: 'leg2', name: 'District Recognition', description: 'Massive XP & Reputation.', flavor: 'Teacher of the Year.', type: 'xp', effect: 'add', value: 1000, icon: Award, color: 'text-purple-600 animate-bounce', rarity: 'legendary' },
  { id: 'leg3', name: 'Supply Bonanza', description: 'Unlock 3 supplies instantly.', flavor: 'A truck backed up to your door.', type: 'supply', effect: 'bulk', value: 3, icon: Gift, color: 'text-blue-600 animate-pulse', rarity: 'legendary' },
  { id: 'leg4', name: 'Morale Reset', description: 'Full morale & streak protection.', flavor: 'Clean slate protocol.', type: 'protection', effect: 'active', value: 5, icon: Shield, color: 'text-green-500', rarity: 'legendary' },
  { id: 'leg5', name: 'Rank Guarantee', description: 'Next 5 puzzles S-Rank.', flavor: 'You are untouchable.', type: 'auto_s', effect: 'count', value: 5, icon: Star, color: 'text-yellow-600', rarity: 'legendary' },
  { id: 'leg6', name: 'XP Explosion', description: 'Gain 1 Level immediately.', flavor: 'Fast track promotion.', type: 'level', effect: 'add', value: 1, icon: Zap, color: 'text-amber-500 animate-pulse', rarity: 'legendary' },
  { id: 'leg7', name: 'Sabbatical Offer', description: 'Skip shift with full rewards.', flavor: 'Paid leave.', type: 'skip', effect: 'once', value: 1, icon: Coffee, color: 'text-amber-900', rarity: 'legendary' },
  { id: 'leg8', name: 'Promotion', description: 'Permanent salary (XP) increase.', flavor: 'Moving on up.', type: 'passive', effect: 'permanent', value: 1.1, icon: TrendingUp, color: 'text-green-600', rarity: 'legendary' }
];

export function buildConstraintString(tag) {
  const data = MODULAR_CONSTRAINTS[tag];
  if (!data) return "Specific constraints apply.";

  const cause = data.causes[Math.floor(Math.random() * data.causes.length)];
  const restriction = data.restrictions[Math.floor(Math.random() * data.restrictions.length)];
  const fluff = data.fluff[Math.floor(Math.random() * data.fluff.length)];

  return `Due to ${cause}, ${restriction}. ${fluff}`;
}

export function getShuffledHand(cards, handSize = 3) {
  if (!cards || !Array.isArray(cards)) return [];
  return [...cards].sort(() => 0.5 - Math.random()).slice(0, handSize);
}

export function getMoodSolution(mood) {
  const moodData = MOOD_SOLUTION_MATRIX[mood];
  if (!moodData) return null;
  return {
    correctSolution: moodData.solution,
    description: moodData.description
  };
}

export function getRandomMood(gradeLevel) {
  const config = GRADE_LEVEL_CONFIG[gradeLevel];
  const availableMoods = config.availableMoods;
  return availableMoods[Math.floor(Math.random() * availableMoods.length)];
}

export function generateClue(gradeLevel, mood) {
  const moodData = MOOD_SOLUTION_MATRIX[mood];
  const config = GRADE_LEVEL_CONFIG[gradeLevel];
  
  // 1. Pick a random behavior from our new arrays
  const behavior = moodData.behaviors[Math.floor(Math.random() * moodData.behaviors.length)];

  // 2. Existing constraint selection logic (Keep as is)
  const correctFolder = moodData.solution;
  const potentialActivities = ACTIVITY_CARDS[correctFolder];
  const validTags = new Set();
  
  potentialActivities.forEach(card => {
    card.tags.forEach(tag => {
      if (config.availableConstraints.includes(tag)) {
        validTags.add(tag);
      }
    });
  });

  const validTagsArray = Array.from(validTags);
  const constraint = validTagsArray.length > 0 
    ? validTagsArray[Math.floor(Math.random() * validTagsArray.length)]
    : config.availableConstraints[Math.floor(Math.random() * config.availableConstraints.length)];

  // 3. Use your existing buildConstraintString function
  const constraintText = buildConstraintString(constraint);

  return {
    mood,
    constraint,
    // The final result: Varied behavior + Procedural Constraint
    text: `${behavior} (Constraint: ${constraintText})`
  };
}

export function generateDailyMemo() {
  return MEMO_POOL();
}

export function getGradeRank(selectedActivity, targetMood, targetConstraint, activeModifier = null, playerPhilosophy = 'Pragmatist') {
  const philosophy = PHILOSOPHY_CONFIG[playerPhilosophy] || PHILOSOPHY_CONFIG['Pragmatist'];

  // 0. Check Jackpot Modifier
  if (activeModifier && activeModifier.id === 'FREE_PASS') {
    return {
      rank: 'S',
      xp: RANK_XP_REWARDS['S'],
      feedback: `SUPERINTENDENT APPROVAL! Any strategy works today!`,
      moodCorrect: true,
      constraintCorrect: true,
      modifierApplied: true,
      philosophyBonus: 0
    };
  }

  // --- CRISIS CHECKS ---
  if (activeModifier && activeModifier.type === 'CRISIS') {
    // Tech Failure: Media disabled
    if (activeModifier.id === 'TECH_FAILURE' && selectedActivity.lessonType === 'Media') {
      return {
        rank: 'F',
        xp: 0,
        feedback: "Tech Failure! Media lessons are unavailable due to network outage.",
        moodCorrect: false,
        constraintCorrect: false,
        crisisActive: 'TECH_FAILURE',
        philosophyBonus: 0
      };
    }
    // Supply Shortage: Kinetic disabled
    if (activeModifier.id === 'SUPPLY_SHORTAGE' && selectedActivity.lessonType === 'Kinetic') {
      return {
        rank: 'F',
        xp: 0,
        feedback: "Supply Shortage! Kinetic lessons impossible without equipment.",
        moodCorrect: false,
        constraintCorrect: false,
        crisisActive: 'SUPPLY_SHORTAGE',
        philosophyBonus: 0
      };
    }
  }

  const moodData = MOOD_SOLUTION_MATRIX[targetMood];
  const correctFolder = moodData.solution;
  
  // 1. Check Mood (Folder) Match
  const isMoodCorrect = selectedActivity.lessonType === correctFolder;
  
  if (!isMoodCorrect) {
    return {
      rank: 'F',
      xp: RANK_XP_REWARDS['F'],
      feedback: `Wrong Approach! ${targetMood} students need ${correctFolder}, not ${selectedActivity.lessonType}.`,
      moodCorrect: false,
      constraintCorrect: false,
      philosophyBonus: 0
    };
  }

  // 2. Check Constraint Match
  const isConstraintCorrect = selectedActivity.tags.includes(targetConstraint);
  
  let rank = isConstraintCorrect ? 'S' : 'A';
  let feedback = isConstraintCorrect 
    ? `Perfect Match! ${selectedActivity.name} handles ${targetMood} and fits the ${targetConstraint} requirement.`
    : `Good, but not perfect. ${selectedActivity.name} fits the mood, but misses the ${targetConstraint} requirement.`;
  let modifierApplied = false;
  let crisisActive = null;

  // 3. Apply Modifiers (Boosts and Crisis)
  if (activeModifier) {
    let boosted = false;
    
    // Type boost (e.g. Media Boost)
    if (activeModifier.targetType && activeModifier.targetType === selectedActivity.lessonType) {
      boosted = true;
    }
    // Tag boost (e.g. Indoor Expert)
    if (activeModifier.targetTag && selectedActivity.tags.includes(activeModifier.targetTag)) {
      boosted = true;
    }

    if (boosted && rank === 'A') {
      rank = 'S';
      feedback += ` (Boosted to S-Rank by ${activeModifier.text}!)`;
      modifierApplied = true;
    }

    // Crisis Impacts
    if (activeModifier.type === 'CRISIS') {
      crisisActive = activeModifier.id;
      
      // OBSERVATION_DAY: Handled in GameUI (streak break logic), but we tag it here
      if (activeModifier.id === 'OBSERVATION_DAY' && rank === 'F') {
        feedback += " (CRISIS: F-Rank caused immediate streak loss!)";
      }
      
      // FIRE_DRILL: Increase difficulty
      if (activeModifier.id === 'FIRE_DRILL' && rank === 'S') {
         // 20% chance to drop rank due to chaos
         if (Math.random() < 0.2) {
           rank = 'A';
           feedback = "The Fire Drill disrupted the flow! Downgraded to A-Rank.";
         }
      }

      // PARENT_COMPLAINT: Constraint is vital.
      if (activeModifier.id === 'PARENT_COMPLAINT' && !isConstraintCorrect) {
         rank = 'C';
         feedback = "Parent Complaint! Missing the constraint requirement resulted in a harsh penalty.";
      }
      
      // STUDENT_INCIDENT: Higher threshold
      if (activeModifier.id === 'STUDENT_INCIDENT' && rank === 'A') {
         if (Math.random() < 0.2) {
           rank = 'B';
           feedback = "Student Incident distracted the class. Grade lowered.";
         }
      }
    }
  }

  let finalXP = RANK_XP_REWARDS[rank];
  let philosophyBonus = 0;
  let bonusReason = null;

  // 4. Apply Philosophy Bonus
  if (philosophy.favoredCategories.includes(selectedActivity.lessonType)) {
    philosophyBonus += philosophy.xpBonus;
    bonusReason = `${philosophy.name} Bonus (+${philosophy.xpBonus} XP)`;
    finalXP += philosophy.xpBonus;
  }
  
  if (playerPhilosophy === 'Pragmatist' && rank === 'S') {
    const sBonus = Math.floor(finalXP * philosophy.sRankBonus);
    philosophyBonus += sBonus;
    bonusReason = `${philosophy.name} Efficiency (+${sBonus} XP)`;
    finalXP += sBonus;
  }

  // Post-Calculation XP Modifiers (Crisis)
  if (activeModifier && activeModifier.id === 'COFFEE_SHORTAGE') {
     finalXP = Math.floor(finalXP * 0.5);
     feedback += " (XP halved due to Coffee Shortage)";
     crisisActive = 'COFFEE_SHORTAGE';
  }

  return {
    rank,
    xp: finalXP,
    feedback,
    moodCorrect: true,
    constraintCorrect: isConstraintCorrect,
    modifierApplied,
    crisisActive,
    philosophyBonus,
    bonusReason
  };
}

export function calculateXP(rank) {
  return RANK_XP_REWARDS[rank] || 0;
}
// UPDATED: Now accepts totalXP to allow Rank-based promotion
export function canUnlockNextLevel(currentLevel, streak, totalXP) {
  const levels = ['Kindergarten', 'HighSchool', 'College'];
  const currentIndex = levels.indexOf(currentLevel);
  
  if (currentIndex === levels.length - 1) return null; // Already Max Level

  const nextLevel = levels[currentIndex + 1];
  const nextLevelConfig = GRADE_LEVEL_CONFIG[nextLevel];

  // 1. Check Streak (The original method)
  if (streak >= nextLevelConfig.unlockStreak) {
    return nextLevel;
  }

  // 2. Check XP (The "Department Head" Override)
  // If you have enough XP for the rank associated with the next level, unlock it.
  // Example: High School unlocks at 2500 XP (Department Head)
  // You can tune these numbers to match your RANK_CONFIG
  if (nextLevel === 'HighSchool' && totalXP >= 2500) return 'HighSchool';
  if (nextLevel === 'College' && totalXP >= 4500) return 'College';

  return null;
}

// Helper Functions for Rank Progression
export function getCurrentRankIndex(totalXP) {
  for (let i = RANK_CONFIG.length - 1; i >= 0; i--) {
    if (totalXP >= RANK_CONFIG[i].minXP) {
      return RANK_CONFIG[i].index;
    }
  }
  return 0; // Default to lowest rank index
}

export function getCurrentRankData(totalXP) {
  const index = getCurrentRankIndex(totalXP);
  return RANK_CONFIG[index];
}

export function getNextRankData(totalXP) {
  const currentIndex = getCurrentRankIndex(totalXP);
  if (currentIndex >= RANK_CONFIG.length - 1) {
    return null; // Max rank achieved
  }
  return RANK_CONFIG[currentIndex + 1];
}

export function getProgressToNextRank(totalXP) {
  const currentRankIndex = getCurrentRankIndex(totalXP);
  const currentRankData = RANK_CONFIG[currentRankIndex];
  const nextRankData = RANK_CONFIG[currentRankIndex + 1];

  if (!nextRankData) {
    // Max Rank Achieved
    return {
      currentRank: currentRankData.name,
      nextRank: "MAX RANK ACHIEVED",
      currentXP: totalXP,
      neededXP: totalXP,
      xpToNextRank: 0,
      percentage: 100,
      isMaxRank: true
    };
  }

  // Calculate progress within current tier
  const baseXP = currentRankData.minXP;
  const xpInLevel = totalXP - baseXP;
  const xpNeededForLevel = nextRankData.minXP - baseXP;
  
  const percentage = Math.min(100, Math.max(0, (xpInLevel / xpNeededForLevel) * 100));

  return {
    currentRank: currentRankData.name,
    nextRank: nextRankData.name,
    currentXP: totalXP,
    neededXP: nextRankData.minXP, // XP target to reach
    xpToNextRank: nextRankData.minXP - totalXP, // Remaining XP needed
    percentage: percentage,
    isMaxRank: false
  };
}

export function selectDailyDirective() {
  if (Math.random() > 0.6) return null;
  return DISTRICT_DIRECTIVES[Math.floor(Math.random() * DISTRICT_DIRECTIVES.length)];
}

export function checkDirectiveCompletion(directive, shiftData) {
  if (!directive || !shiftData) return false;

  const { cardsUsed, targetMood, finalGrade, currentStreak, uniqueCategoryCount } = shiftData;

  switch (directive.type) {
    case 'diversity':
      return uniqueCategoryCount >= directive.targetDiversity;
    
    case 'category-target':
      // Check if any card used matches the target category
      return cardsUsed.some(card => card.lessonType === directive.category);
    
    case 'grade-target':
      return finalGrade === directive.targetGrade;
      
    case 'streak-target':
      return currentStreak >= directive.targetStreak;
      
    case 'no-fail':
      return finalGrade !== 'F';
      
    case 'mood-target':
      return targetMood === directive.targetMood;
      
    case 'constraint-target':
      return cardsUsed.some(card => card.tags.includes(directive.targetConstraint));
      
    default:
      return false;
  }
}

export function getAvailableCards(baseCards, playerSupplies = []) {
  const availableCards = [...baseCards];
  const unlockedCards = new Set(); // Avoid duplicates

  // Check each player supply for synergies
  playerSupplies.forEach(supplyId => {
    Object.keys(SUPPLY_SYNERGIES).forEach(supplyName => {
      const match = playerSupplies.some(id => 
        id.toLowerCase().includes(supplyName.toLowerCase().split(' ')[0])
      );
      
      if (match) {
        const synergyCard = { 
          ...SUPPLY_SYNERGIES[supplyName],
          isUnlocked: true,
          unlockedBy: supplyName
        };
        
        // Add if not already in base set (by ID check)
        if (!availableCards.some(c => c.id === synergyCard.id) && !unlockedCards.has(synergyCard.id)) {
           availableCards.push(synergyCard);
           unlockedCards.add(synergyCard.id);
        }
      }
    });
  });

  return availableCards;
}

export function getCurrentGradeLevel(totalXP) {
  for (let i = GRADE_LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= GRADE_LEVELS[i].minXP) {
      return GRADE_LEVELS[i];
    }
  }
  return GRADE_LEVELS[0];
}

export function getGradeLevelProgress(totalXP) {
  const current = getCurrentGradeLevel(totalXP);
  const next = GRADE_LEVELS.find(g => g.minXP === current.nextThreshold);
  
  if (!next) {
    return { percentage: 100, xpRemaining: 0, current, next: null };
  }
  
  const range = next.minXP - current.minXP;
  const progress = totalXP - current.minXP;
  const percentage = Math.min(100, Math.max(0, (progress / range) * 100));
  
  return {
    percentage,
    xpRemaining: next.minXP - totalXP,
    current,
    next
  };
}

export function shouldTriggerFinalExam(previousXP, currentXP) {
  const prevLevel = getCurrentGradeLevel(previousXP);
  const currLevel = getCurrentGradeLevel(currentXP);
  // Ensure we don't re-trigger for the same level if XP fluctuates, 
  // but basically if the computed level changed, we assume it's an upgrade.
  // Ideally we should track max level achieved, but based on prompt this suffices.
  return currLevel.minXP > prevLevel.minXP;
}

export function generateFinalExamSubmissions(playerPhilosophy) {
  const allPhilosophies = ['Traditionalist', 'Progressive', 'Pragmatist'];
  let submissions = [];
  
  // 60% chance of 1 match + 2 random
  if (Math.random() < 0.6) {
    const matchTemplate = STUDENT_SUBMISSION_TEMPLATES[playerPhilosophy][Math.floor(Math.random() * 3)];
    submissions.push({ ...matchTemplate, isMatch: true });
    
    // Add 2 random others
    for (let i = 0; i < 2; i++) {
      const randPhil = allPhilosophies[Math.floor(Math.random() * allPhilosophies.length)];
      const randTemplate = STUDENT_SUBMISSION_TEMPLATES[randPhil][Math.floor(Math.random() * 3)];
      submissions.push({ ...randTemplate, isMatch: randPhil === playerPhilosophy });
    }
  } else {
    // 40% chance of 3 random
    for (let i = 0; i < 3; i++) {
      const randPhil = allPhilosophies[Math.floor(Math.random() * allPhilosophies.length)];
      const randTemplate = STUDENT_SUBMISSION_TEMPLATES[randPhil][Math.floor(Math.random() * 3)];
      submissions.push({ ...randTemplate, isMatch: randPhil === playerPhilosophy });
    }
  }
  
  // Shuffle
  return submissions.sort(() => 0.5 - Math.random());
}

export function handleSabbaticalCard(cardId, currentXP, currentStreak, activeCrisis) {
  if (cardId === 'sabbatical-sick-day') {
    return {
      xpGained: 0,
      streakPreserved: true,
      crisisIgnored: true,
      shiftEnded: true,
      message: "Sick Day taken. You preserved your streak, but gained no XP."
    };
  } else if (cardId === 'sabbatical-half-day') {
    return {
      xpGained: 25,
      chaosReduced: true,
      chaosReductionPercent: 50,
      message: "Half-Day taken. Chaos reduced by 50%. Gained 25 XP."
    };
  } else if (cardId === 'sabbatical-substitute') {
    if (currentXP < 10) {
      return {
        xpGained: 0,
        xpCost: 0,
        grade: "F",
        message: "Insufficient XP to hire a substitute."
      };
    }

    const success = Math.random() < 0.20;
    if (success) {
      return {
        xpGained: 200,
        xpCost: 10,
        grade: "S",
        message: "Substitute was amazing! Earned S-Rank and 200 XP."
      };
    } else {
      return {
        xpGained: -50,
        xpCost: 10,
        grade: "F",
        message: "Substitute lost control. Earned F-Rank and lost 50 XP."
      };
    }
  }
  return null;
}

export function getExtracurricularBonus(cardId, baseXP) {
  // Find card in Extracurricular array
  const card = ACTIVITY_CARDS.Extracurricular?.find(c => c.id === cardId);
  if (card && card.lessonType === 'Extracurricular') {
    return card.xpReward || 0;
  }
  return baseXP;
}

export function calculateRequiredPuzzles(gradeLevelName, hasStaffAbsence) {
  const levels = ['Kindergarten', 'Elementary School', 'Middle School', 'High School', 'Undergraduate', 'Graduate School'];
  
  // Normalize based on config key names vs display names
  let normalized = gradeLevelName;
  if (gradeLevelName === 'HighSchool') normalized = 'High School';
  if (gradeLevelName === 'College') normalized = 'Undergraduate';
  if (gradeLevelName === 'Elementary') normalized = 'Elementary School';
  
  const index = levels.indexOf(normalized);
  
  // Pacing fix logic
  let base = 3;
  if (index <= 1) base = Math.floor(Math.random() * 2) + 3; // K-E: 3-4
  else if (index <= 3) base = Math.floor(Math.random() * 3) + 5; // M-H: 5-7
  else base = Math.floor(Math.random() * 5) + 8; // U-G: 8-12
  
  return base + (hasStaffAbsence ? Math.floor(Math.random() * 2) + 1 : 0);
}

export function calculateBoonSpawn(dayNumber, puzzlesSolved, totalRequired, currentStreak) {
  // Base Rates
  let minorRate = 0;
  let moderateRate = 0;
  let legendaryRate = 0;

  switch(dayNumber) {
    case 1: minorRate=0.15; moderateRate=0.05; legendaryRate=0.01; break;
    case 2: minorRate=0.20; moderateRate=0.08; legendaryRate=0.02; break;
    case 3: minorRate=0.10; moderateRate=0.03; legendaryRate=0.00; break;
    case 4: minorRate=0.25; moderateRate=0.12; legendaryRate=0.03; break;
    case 5: minorRate=0.30; moderateRate=0.15; legendaryRate=0.05; break;
    default: minorRate=0.15; moderateRate=0.05; legendaryRate=0.01;
  }

  // Modifiers
  const streakBonus = currentStreak * 0.02;
  const progressionBonus = (puzzlesSolved / totalRequired) * 0.10;

  const roll = Math.random();
  
  // Check Legendary
  if (roll < (legendaryRate + streakBonus/4)) return getRandomBoon('legendary');
  
  // Check Moderate
  if (roll < (legendaryRate + moderateRate + streakBonus/2 + progressionBonus)) return getRandomBoon('uncommon');
  
  // Check Minor
  if (roll < (legendaryRate + moderateRate + minorRate + streakBonus + progressionBonus)) return getRandomBoon('common');
  
  return null;
}

export function applyBoonEffect(boon) {
  // Returns a delta object describing what should change
  return {
    type: boon.type,
    value: boon.value,
    effect: boon.effect,
    name: boon.name
  };
}

export function getRandomBoon(tier) {
  let pool;
  if (tier === 'legendary') pool = LEGENDARY_BOONS;
  else if (tier === 'uncommon') pool = MODERATE_BOONS;
  else pool = MINOR_BOONS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function testModularConstraints() {
  console.log("=== Testing Modular Constraints ===");
  Object.keys(MODULAR_CONSTRAINTS).forEach(tag => {
    console.log(`\nTAG: ${tag}`);
    for(let i=0; i<3; i++) {
      console.log(`  ${i+1}. ${buildConstraintString(tag)}`);
    }
  });
  console.log("===================================");
}