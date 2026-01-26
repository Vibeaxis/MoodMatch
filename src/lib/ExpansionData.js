
// Data for Achievements, Unlockables, and Future Content Plans

export const ACHIEVEMENTS = [
  // --- Milestone Achievements ---
  {
    id: 'FIRST_WEEK_SURVIVED',
    name: 'Survival Mode: Initiated',
    description: 'Survived your first week without crying in the supply closet. Much.',
    icon: 'Calendar',
    xpReward: 100,
    hidden: false,
    category: 'milestone',
    rarity: 'common'
  },
  {
    id: 'MONTH_COMPLETE',
    name: 'Monthly Survivor',
    description: 'Completed a full month of teaching. The caffeine dependence is now permanent.',
    icon: 'CalendarCheck',
    xpReward: 500,
    hidden: false,
    category: 'milestone',
    rarity: 'uncommon'
  },
  {
    id: 'SEMESTER_SURVIVOR',
    name: 'Halfway There',
    description: 'Survived a whole semester. You have seen things people wouldn\'t believe.',
    icon: 'GraduationCap',
    xpReward: 1500,
    hidden: false,
    category: 'milestone',
    rarity: 'rare'
  },
  {
    id: 'TENURE_SECURED',
    name: 'Tenure Track',
    description: 'They can\'t fire you easily now. Let the eccentric teaching methods begin.',
    icon: 'ShieldCheck',
    xpReward: 5000,
    hidden: false,
    category: 'milestone',
    rarity: 'epic'
  },
  {
    id: 'RETIREMENT_READY',
    name: 'Pension Planner',
    description: 'You are counting down the days. Only 4,000 left.',
    icon: 'RockingChair',
    xpReward: 10000,
    hidden: false,
    category: 'milestone',
    rarity: 'legendary'
  },
  {
    id: 'LIFER',
    name: 'The Lifer',
    description: 'You have become part of the building\'s structural integrity.',
    icon: 'Building',
    xpReward: 20000,
    hidden: false,
    category: 'milestone',
    rarity: 'legendary'
  },
  {
    id: 'DECADE_TEACHER',
    name: 'Decade of Dedication',
    description: 'Ten years. That is 1,800 mornings of "Please take your seat."',
    icon: 'Award',
    xpReward: 50000,
    hidden: true,
    category: 'milestone',
    rarity: 'legendary'
  },

  // --- Skill Achievements ---
  {
    id: 'PERFECT_WEEK',
    name: 'Flawless Victory',
    description: 'A full week of S-Rank lessons. The Superintendent is suspicious.',
    icon: 'Star',
    xpReward: 1000,
    hidden: false,
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: 'CRISIS_MANAGER',
    name: 'Crisis Averted',
    description: 'Solved a puzzle successfully while a Crisis was active.',
    icon: 'Siren',
    xpReward: 250,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },
  {
    id: 'COFFEE_FREE',
    name: 'Decaf Hero',
    description: 'Completed a shift without using a coffee buff. Are you human?',
    icon: 'Coffee',
    xpReward: 500,
    hidden: false,
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: 'REROLL_MASTER',
    name: 'Second Chance',
    description: 'Used a reroll to turn an F-Rank into an S-Rank.',
    icon: 'RefreshCw',
    xpReward: 300,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },
  {
    id: 'STREAK_BREAKER',
    name: 'Streak Breaker',
    description: 'Ended a shift with a combo streak of 10 or higher.',
    icon: 'Flame',
    xpReward: 750,
    hidden: false,
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: 'COMBO_KING',
    name: 'Combo King',
    description: 'Reached a x20 combo multiplier.',
    icon: 'Zap',
    xpReward: 2000,
    hidden: false,
    category: 'skill',
    rarity: 'epic'
  },
  {
    id: 'PERFECT_GRADING',
    name: 'The Grader',
    description: 'Submitted 50 consecutive S-Rank lessons.',
    icon: 'CheckCircle2',
    xpReward: 2500,
    hidden: false,
    category: 'skill',
    rarity: 'epic'
  },
  {
    id: 'CONSTRAINT_MASTER',
    name: 'Constraint Master',
    description: 'Successfully matched constraints 100 times.',
    icon: 'Lock',
    xpReward: 1000,
    hidden: false,
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: 'KINETIC_KING',
    name: 'Kinetic King',
    description: 'Used Kinetic cards 50 times successfully.',
    icon: 'Activity',
    xpReward: 500,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },
  {
    id: 'MEDIA_MAVEN',
    name: 'Media Maven',
    description: 'Used Media cards 50 times successfully. The AV club salutes you.',
    icon: 'MonitorPlay',
    xpReward: 500,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },
  {
    id: 'LECTURE_MASTER',
    name: 'Lecture Legend',
    description: 'Used Lecture cards 50 times successfully. They were captivated!',
    icon: 'BookOpen',
    xpReward: 500,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },
  {
    id: 'DISCUSSION_FACILITATOR',
    name: 'Debate Coach',
    description: 'Successfully used "Class Debate" 10 times.',
    icon: 'MessageCircle',
    xpReward: 200,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },
  {
    id: 'GROUP_WORK_GURU',
    name: 'Herding Cats',
    description: 'Successfully managed 20 "Social" constraint activities.',
    icon: 'Users',
    xpReward: 400,
    hidden: false,
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: 'ASSESSMENT_EXPERT',
    name: 'Test Master',
    description: 'Successfully used "Pop Quiz" or "Standardized Test Prep" 15 times.',
    icon: 'FileText',
    xpReward: 300,
    hidden: false,
    category: 'skill',
    rarity: 'uncommon'
  },

  // --- Failure/Fun Achievements ---
  {
    id: 'BURNOUT',
    name: 'Burnout Warning',
    description: 'Played for 4 hours straight. Go touch grass.',
    icon: 'BatteryWarning',
    xpReward: 50,
    hidden: true,
    category: 'failure',
    rarity: 'common'
  },
  {
    id: 'CHAOS_AGENT',
    name: 'Agent of Chaos',
    description: 'Achieved an F-Rank on a "High Stakes" day.',
    icon: 'Tornado',
    xpReward: 100,
    hidden: false,
    category: 'failure',
    rarity: 'uncommon'
  },
  {
    id: 'HOARDER',
    name: 'Supply Hoarder',
    description: 'Bought every item in the shop. Your desk is a fortress.',
    icon: 'Package',
    xpReward: 1000,
    hidden: false,
    category: 'failure',
    rarity: 'rare'
  },
  {
    id: 'SUPPLY_SHORTAGE',
    name: 'Empty Pockets',
    description: 'Hit 0 XP after a shopping spree.',
    icon: 'Wallet',
    xpReward: 50,
    hidden: true,
    category: 'failure',
    rarity: 'common'
  },
  {
    id: 'FIVE_FAILURES',
    name: 'Rough Week',
    description: 'Got 5 F-Ranks in a row. Maybe teaching isn\'t for you?',
    icon: 'ThumbsDown',
    xpReward: 100, // Pity XP
    hidden: false,
    category: 'failure',
    rarity: 'uncommon'
  },
  {
    id: 'COMBO_BREAKER',
    name: 'C-C-C-Combo Breaker',
    description: 'Lost a 10x streak to a simple mistake. Ouch.',
    icon: 'XCircle',
    xpReward: 50,
    hidden: false,
    category: 'failure',
    rarity: 'common'
  },
  {
    id: 'CRISIS_CASUALTY',
    name: 'Crisis Casualty',
    description: 'Failed a puzzle specifically because a Crisis disabled your chosen card type.',
    icon: 'Skull',
    xpReward: 150,
    hidden: true,
    category: 'failure',
    rarity: 'rare'
  },
  {
    id: 'NEVER_AGAIN',
    name: 'Never Again',
    description: 'Used "Glitter Art Project". The glitter will remain until the heat death of the universe.',
    icon: 'Sparkles',
    xpReward: 200,
    hidden: true,
    category: 'failure',
    rarity: 'rare'
  },

  // --- Philosophy Specific ---
  {
    id: 'IRON_FIST',
    name: 'The Iron Fist',
    description: 'Reach Level 5 as a Traditionalist.',
    icon: 'Gavel',
    xpReward: 1000,
    hidden: false,
    category: 'philosophy',
    philosophy: 'Traditionalist',
    rarity: 'epic'
  },
  {
    id: 'COOL_TEACHER',
    name: 'The Cool Teacher',
    description: 'Reach Level 5 as a Progressive.',
    icon: 'Sunglasses',
    xpReward: 1000,
    hidden: false,
    category: 'philosophy',
    philosophy: 'Progressive',
    rarity: 'epic'
  },
  {
    id: 'BALANCED_APPROACH',
    name: 'The Realist',
    description: 'Reach Level 5 as a Pragmatist.',
    icon: 'Scale',
    xpReward: 1000,
    hidden: false,
    category: 'philosophy',
    philosophy: 'Pragmatist',
    rarity: 'epic'
  },
  {
    id: 'TRADITIONALIST_MASTER',
    name: 'Old School',
    description: 'Unlock all Traditionalist perks.',
    icon: 'Scroll',
    xpReward: 2000,
    hidden: false,
    category: 'philosophy',
    philosophy: 'Traditionalist',
    rarity: 'legendary'
  },
  {
    id: 'PROGRESSIVE_MASTER',
    name: 'New Wave',
    description: 'Unlock all Progressive perks.',
    icon: 'Waves',
    xpReward: 2000,
    hidden: false,
    category: 'philosophy',
    philosophy: 'Progressive',
    rarity: 'legendary'
  },
  {
    id: 'PRAGMATIST_MASTER',
    name: 'Results Driven',
    description: 'Unlock all Pragmatist perks.',
    icon: 'BarChart3',
    xpReward: 2000,
    hidden: false,
    category: 'philosophy',
    philosophy: 'Pragmatist',
    rarity: 'legendary'
  },

  // --- Easter Eggs ---
  {
    id: 'BASEMENT_EXPLORER',
    name: 'Basement Explorer',
    description: 'Encountered the "Basement Door Unlocked" memo 3 times.',
    icon: 'Flashlight',
    xpReward: 666,
    hidden: true,
    category: 'easter_egg',
    rarity: 'epic'
  },
  {
    id: 'YEARBOOK_DETECTIVE',
    name: 'Paranormal Investigator',
    description: 'Noticed the "Yearbook Ghost" memo.',
    icon: 'Search',
    xpReward: 500,
    hidden: true,
    category: 'easter_egg',
    rarity: 'rare'
  },
  {
    id: 'BELL_SCHEDULE_GLITCH',
    name: 'Temporal Anomaly',
    description: 'Witnessed the Bell Schedule Glitch.',
    icon: 'Clock',
    xpReward: 500,
    hidden: true,
    category: 'easter_egg',
    rarity: 'rare'
  },
  {
    id: 'REPLY_ALL_CHAMPION',
    name: 'Reply All Regret',
    description: 'Got the "Reply All Potluck" memo during a Crisis.',
    icon: 'MailWarning',
    xpReward: 300,
    hidden: true,
    category: 'easter_egg',
    rarity: 'uncommon'
  },
  {
    id: 'TIME_TRAVELER_BELIEVER',
    name: 'Future Proof',
    description: 'Believe the Kindergartner from 2050.',
    icon: 'Hourglass',
    xpReward: 404,
    hidden: true,
    category: 'easter_egg',
    rarity: 'rare'
  },
  {
    id: 'PENCIL_COLLECTOR_ALLY',
    name: 'Graphite Guardian',
    description: 'Found the student hoarding 4,000 pencils.',
    icon: 'Pencil',
    xpReward: 200,
    hidden: true,
    category: 'easter_egg',
    rarity: 'uncommon'
  },

  // --- Collection ---
  {
    id: 'MEMO_COLLECTOR',
    name: 'Paperwork Pro',
    description: 'Read 50 unique memos.',
    icon: 'Files',
    xpReward: 500,
    hidden: false,
    category: 'collection',
    rarity: 'rare'
  },
  {
    id: 'CRISIS_SURVIVOR',
    name: 'Disaster Master',
    description: 'Survived every type of Crisis event at least once.',
    icon: 'ShieldAlert',
    xpReward: 2000,
    hidden: false,
    category: 'collection',
    rarity: 'legendary'
  },
  {
    id: 'JACKPOT_HUNTER',
    name: 'Lucky Duck',
    description: 'Hit the Jackpot event 3 times.',
    icon: 'Clover',
    xpReward: 1000,
    hidden: false,
    category: 'collection',
    rarity: 'epic'
  }
];

export const UNLOCKABLES = [
  // --- Planner Skins ---
  {
    id: 'PLANNER_SKIN_LEATHER',
    name: 'Executive Leather',
    description: 'Smells like success and expensive mahogany.',
    type: 'planner_skin',
    icon: 'Book',
    unlockedBy: 'TENURE_SECURED',
    rarity: 'epic'
  },
  {
    id: 'PLANNER_SKIN_CYBER',
    name: 'Digital Dashboard',
    description: 'The future of bureaucracy is neon.',
    type: 'planner_skin',
    icon: 'Cpu',
    unlockedBy: 'TECH_FAILURE_SURVIVOR', // Hypothetical
    rarity: 'rare'
  },
  {
    id: 'PLANNER_SKIN_NOTEBOOK',
    name: 'Composition Classic',
    description: 'The black and white marble pattern never goes out of style.',
    type: 'planner_skin',
    icon: 'Notebook',
    unlockedBy: 'default',
    rarity: 'common'
  },
  {
    id: 'PLANNER_SKIN_COFFEE_STAINED',
    name: 'Caffeinated Chaos',
    description: 'It\'s not a mess, it\'s a record of your struggle.',
    type: 'planner_skin',
    icon: 'Coffee',
    unlockedBy: 'COFFEE_SHORTAGE_SURVIVOR', // Hypothetical
    rarity: 'uncommon'
  },
  {
    id: 'PLANNER_SKIN_MINIMALIST',
    name: 'Zen Whiteboard',
    description: 'Clean. Empty. Just like your mind on Friday at 3pm.',
    type: 'planner_skin',
    icon: 'Square',
    unlockedBy: 'PERFECT_WEEK',
    rarity: 'rare'
  },

  // --- Room Skins ---
  {
    id: 'ROOM_SKIN_CLASSROOM',
    name: 'Standard Classroom',
    description: 'Beige walls, fluorescent lights. Home sweet home.',
    type: 'room_skin',
    icon: 'Home',
    unlockedBy: 'default',
    rarity: 'common'
  },
  {
    id: 'ROOM_SKIN_SCIENCE_LAB',
    name: 'Science Lab',
    description: 'Comes with safety goggles and mysterious stains.',
    type: 'room_skin',
    icon: 'FlaskConical',
    unlockedBy: 'KINETIC_KING',
    rarity: 'rare'
  },
  {
    id: 'ROOM_SKIN_GYMNASIUM',
    name: 'The Gym',
    description: 'Echoey and smells faintly of rubber and sweat.',
    type: 'room_skin',
    icon: 'Dumbbell',
    unlockedBy: 'KINETIC_KING',
    rarity: 'rare'
  },
  {
    id: 'ROOM_SKIN_LIBRARY',
    name: 'School Library',
    description: 'Shhh! A sanctuary of silence.',
    type: 'room_skin',
    icon: 'Library',
    unlockedBy: 'LECTURE_MASTER',
    rarity: 'rare'
  },
  {
    id: 'ROOM_SKIN_PORTABLES',
    name: 'The Portables',
    description: 'Temporary classrooms that have been there for 30 years.',
    type: 'room_skin',
    icon: 'Container',
    unlockedBy: 'BUDGET_AUDIT_SURVIVOR', // Hypothetical
    rarity: 'uncommon'
  },
  {
    id: 'ROOM_SKIN_AUDITORIUM',
    name: 'Auditorium',
    description: 'For when you need to lecture to an empty void.',
    type: 'room_skin',
    icon: 'Mic2',
    unlockedBy: 'MEDIA_MAVEN',
    rarity: 'epic'
  },
  {
    id: 'ROOM_SKIN_CAFETERIA',
    name: 'Cafeteria',
    description: 'The jungle. Survival of the fittest.',
    type: 'room_skin',
    icon: 'Utensils',
    unlockedBy: 'STUDENT_INCIDENT_SURVIVOR', // Hypothetical
    rarity: 'rare'
  },
  {
    id: 'ROOM_SKIN_BASEMENT',
    name: 'The Basement',
    description: 'We don\'t talk about the basement.',
    type: 'room_skin',
    icon: 'Ghost',
    unlockedBy: 'BASEMENT_EXPLORER',
    rarity: 'legendary'
  },

  // --- Item Skins ---
  {
    id: 'COFFEE_SKIN_STANDARD',
    name: 'Diner Mug',
    description: 'Chipped, stained, reliable.',
    type: 'item_skin',
    icon: 'Coffee',
    unlockedBy: 'default',
    rarity: 'common'
  },
  {
    id: 'COFFEE_SKIN_ESPRESSO',
    name: 'Tiny Cup',
    description: 'For when you need concentrated power.',
    type: 'item_skin',
    icon: 'CupSoda',
    unlockedBy: 'COFFEE_FREE',
    rarity: 'rare'
  },
  {
    id: 'COFFEE_SKIN_FANCY',
    name: 'Barista Art',
    description: 'A leaf pattern in the foam. Fancy.',
    type: 'item_skin',
    icon: 'Flower2',
    unlockedBy: 'TENURE_SECURED',
    rarity: 'epic'
  },

  // --- Perks ---
  {
    id: 'PERK_EARLY_MEMO_PEEK',
    name: 'Insider Info',
    description: 'See the daily memo before starting the shift.',
    type: 'perk',
    icon: 'Eye',
    unlockedBy: 'MEMO_COLLECTOR',
    rarity: 'rare'
  },
  {
    id: 'PERK_DOUBLE_XP_FRIDAY',
    name: 'Casual Friday',
    description: 'Earn 2x XP on every 5th shift.',
    type: 'perk',
    icon: 'CalendarHeart',
    unlockedBy: 'PERFECT_WEEK',
    rarity: 'epic'
  },
  {
    id: 'PERK_CRISIS_SHIELD',
    name: 'Emergency Fund',
    description: 'Ignore the first Crisis event of a semester.',
    type: 'perk',
    icon: 'Shield',
    unlockedBy: 'CRISIS_SURVIVOR',
    rarity: 'legendary'
  },
  {
    id: 'PERK_SUPPLY_DISCOUNT',
    name: 'Coupon Clipper',
    description: 'Shop items cost 20% less.',
    type: 'perk',
    icon: 'Tag',
    unlockedBy: 'HOARDER',
    rarity: 'rare'
  },
  {
    id: 'PERK_REROLL_REFUND',
    name: 'Administration Error',
    description: '10% chance a reroll doesn\'t cost resources.',
    type: 'perk',
    icon: 'Undo2',
    unlockedBy: 'REROLL_MASTER',
    rarity: 'epic'
  }
];

export const FUTURE_CONTENT = {
  STUDENT_ARCHETYPES: [
    { id: 'ARCHETYPE_CLASS_CLOWN', name: 'The Class Clown', modifier: { disruptionChance: 0.2, humorBonus: 10 } },
    { id: 'ARCHETYPE_SLEEPER', name: 'The Sleeper', modifier: { participation: -0.5, energyDrain: 0.1 } },
    { id: 'ARCHETYPE_GIFTED_KID', name: 'The Gifted Kid', modifier: { finishSpeed: 2.0, burnoutRisk: 0.3 } },
    { id: 'ARCHETYPE_TATTLETALE', name: 'The Tattletale', modifier: { ruleEnforcement: 1.5, peerTrust: -0.2 } },
    { id: 'ARCHETYPE_TROUBLEMAKER', name: 'The Troublemaker', modifier: { crisisChance: 0.15, authorityChallenge: 0.2 } },
    { id: 'ARCHETYPE_QUIET_GENIUS', name: 'The Quiet Genius', modifier: { silentWorkBonus: 0.3, groupWorkPenalty: 0.2 } },
    { id: 'ARCHETYPE_ATHLETE', name: 'The Athlete', modifier: { kineticBonus: 0.25, lecturePenalty: 0.1 } },
    { id: 'ARCHETYPE_ARTIST', name: 'The Artist', modifier: { creativeBonus: 0.25, messiness: 0.3 } },
    { id: 'ARCHETYPE_PARENT_NIGHTMARE', name: 'The Parent Nightmare', modifier: { emailSpam: 0.5, adminComplaintRisk: 0.2 } },
    { id: 'ARCHETYPE_PERFECT_STUDENT', name: 'The Perfect Student', modifier: { autoSuccessChance: 0.1, stressLevel: 0.5 } }
  ],
  ROOM_SKINS: [
    { theme: 'Retro 80s', backgroundColor: '#ff00ff', accentColor: '#00ffff', rarity: 'rare' },
    { theme: 'Haunted', backgroundColor: '#222222', accentColor: '#440000', rarity: 'epic' },
    { theme: 'Space Station', backgroundColor: '#000033', accentColor: '#cccccc', rarity: 'legendary' },
    { theme: 'Forest', backgroundColor: '#004400', accentColor: '#663300', rarity: 'uncommon' },
    { theme: 'Candy Land', backgroundColor: '#ffcccc', accentColor: '#ff6666', rarity: 'rare' },
    { theme: 'Noir', backgroundColor: '#333333', accentColor: '#000000', rarity: 'epic' },
    { theme: 'Underwater', backgroundColor: '#003366', accentColor: '#006699', rarity: 'rare' },
    { theme: 'Volcano', backgroundColor: '#330000', accentColor: '#ff3300', rarity: 'legendary' },
    { theme: 'Cloud City', backgroundColor: '#eeffff', accentColor: '#99ccff', rarity: 'epic' },
    { theme: 'Dungeon', backgroundColor: '#111111', accentColor: '#333333', rarity: 'rare' }
  ],
  PLANNER_SKINS: [
    { theme: 'Gold Leaf', primaryColor: '#d4af37', accentColor: '#000000', rarity: 'legendary' },
    { theme: 'Holographic', primaryColor: '#silver', accentColor: '#rainbow', rarity: 'epic' },
    { theme: 'Chalkboard', primaryColor: '#333333', accentColor: '#ffffff', rarity: 'common' },
    { theme: 'Corkboard', primaryColor: '#cc9966', accentColor: '#663300', rarity: 'uncommon' },
    { theme: 'Blueprint', primaryColor: '#003399', accentColor: '#ffffff', rarity: 'rare' },
    { theme: 'Old Scroll', primaryColor: '#ffcc99', accentColor: '#663300', rarity: 'rare' },
    { theme: 'Circuit Board', primaryColor: '#003300', accentColor: '#00ff00', rarity: 'epic' },
    { theme: 'Galaxy', primaryColor: '#000000', accentColor: '#purple', rarity: 'legendary' }
  ],
  NARRATIVE_SEASONS: [
    { id: 'SEASON_1_BUDGET_CUTS', duration: '30 Days', storyArc: ['Notice', 'Panic', 'Adaptation', 'Protest', 'Resolution'], rewards: { gold: 500, skin: 'Budget Planner' } },
    { id: 'SEASON_2_STANDARDIZED_TESTING', duration: '14 Days', storyArc: ['Prep', 'Stress', 'Test Day', 'Waiting', 'Results'], rewards: { xp: 2000, skin: 'Scantron Room' } },
    { id: 'SEASON_3_SCIENCE_FAIR', duration: '7 Days', storyArc: ['Hypothesis', 'Volcanoes', 'Explosions', 'Judging', 'Cleanup'], rewards: { item: 'Blue Ribbon' } },
    { id: 'SEASON_4_WINTER_BREAK', duration: '14 Days', storyArc: ['Anticipation', 'Chaos', 'Party', 'Freedom', 'Dread'], rewards: { perk: 'Holiday Spirit' } },
    { id: 'SEASON_5_SPRING_RENEWAL', duration: '20 Days', storyArc: ['Thaw', 'Cleaning', 'Fever', 'Outdoors', 'Bloom'], rewards: { skin: 'Garden Room' } },
    { id: 'SEASON_6_FINAL_EXAMS', duration: '10 Days', storyArc: ['Cramming', 'Panic', 'Exam', 'Grading', 'Summer'], rewards: { trophy: 'Year End' } }
  ],
  FUTURE_FEATURES: [
    { id: 'FEATURE_MULTIPLAYER', status: 'Planning', estimatedRelease: '2025' },
    { id: 'FEATURE_LEADERBOARDS', status: 'In Development', estimatedRelease: 'Q3 2024' },
    { id: 'FEATURE_CUSTOM_PUZZLES', status: 'Concept', estimatedRelease: '2025' },
    { id: 'FEATURE_STUDENT_PROFILES', status: 'In Development', estimatedRelease: 'Q4 2024' },
    { id: 'FEATURE_DAILY_CHALLENGES', status: 'Near Completion', estimatedRelease: 'Q3 2024' },
    { id: 'FEATURE_TRADING_SYSTEM', status: 'Concept', estimatedRelease: 'TBD' }
  ]
};

export default { ACHIEVEMENTS, UNLOCKABLES, FUTURE_CONTENT };
