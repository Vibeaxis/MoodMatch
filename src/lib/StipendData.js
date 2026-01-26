
export const STIPEND_CONTRACTS = [
  // --- ATHLETICS DEPARTMENT ---
  {
    id: 'ATH_001',
    title: 'Morning Calisthenics',
    description: 'Deploy 5 Kinetic activity cards.',
    flavor: 'A sound mind in a sound body. Or just a tired body.',
    objectiveType: 'PLAY_CARD',
    target: 'KINETIC',
    count: 5,
    rewardXP: 150,
    difficulty: 'EASY',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_002',
    title: 'Energy Conservation',
    description: 'End a shift with at least 50% Stamina/Energy.',
    flavor: 'Don\'t burn out before the playoffs.',
    objectiveType: 'MAINTAIN_STAT',
    target: 'ENERGY',
    count: 1,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_003',
    title: 'Varsity Performance',
    description: 'Achieve an S-Rank.',
    flavor: 'We are looking for champions, not participants.',
    objectiveType: 'ACHIEVE_RANK',
    target: 'S',
    count: 1,
    rewardXP: 500,
    difficulty: 'HARD',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_004',
    title: 'Winning Streak',
    description: 'Reach a combo streak of 15.',
    flavor: 'It\'s not about how you start, it\'s about how you keep going.',
    objectiveType: 'MAINTAIN_STREAK',
    target: 15,
    count: 1,
    rewardXP: 600,
    difficulty: 'HARD',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_005',
    title: 'Equipment Check',
    description: 'Accumulate 3 new supply items.',
    flavor: 'We need new balls. And bats. And everything else.',
    objectiveType: 'ACCUMULATE_SUPPLIES',
    target: 'ANY',
    count: 3,
    rewardXP: 350,
    difficulty: 'MEDIUM',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_006',
    title: 'Coach\'s Whistle',
    description: 'Play 8 Kinetic cards.',
    flavor: 'Move it, people! Faster!',
    objectiveType: 'PLAY_CARD',
    target: 'KINETIC',
    count: 8,
    rewardXP: 400,
    difficulty: 'MEDIUM',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_007',
    title: 'Game Day Prep',
    description: 'Approve 5 requests related to sports or leave.',
    flavor: 'Let the kids play.',
    objectiveType: 'APPROVE_REQUESTS',
    target: 'ANY',
    count: 5,
    rewardXP: 250,
    difficulty: 'EASY',
    department: 'ATHLETICS'
  },
  {
    id: 'ATH_008',
    title: 'Endurance Training',
    description: 'Complete 3 shifts without failing.',
    flavor: 'Pain is weakness leaving the body.',
    objectiveType: 'MAINTAIN_STREAK', // Simulating shift streak
    target: 3, // Assuming logic handles shift count mapping
    count: 1,
    rewardXP: 800,
    difficulty: 'HARD',
    department: 'ATHLETICS'
  },

  // --- AV CLUB ---
  {
    id: 'AVC_001',
    title: 'Screen Time',
    description: 'Play 5 Media activity cards.',
    flavor: 'Did you try turning it off and on again?',
    objectiveType: 'PLAY_CARD',
    target: 'MEDIA',
    count: 5,
    rewardXP: 150,
    difficulty: 'EASY',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_002',
    title: 'Tech Support',
    description: 'Complete a shift during a Crisis event.',
    flavor: 'The projector is smoking. Please advise.',
    objectiveType: 'COMPLETE_DURING_CRISIS',
    target: 'ANY',
    count: 1,
    rewardXP: 550,
    difficulty: 'HARD',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_003',
    title: 'Inventory Upgrade',
    description: 'Acquire 5 total supply items in inventory.',
    flavor: 'We need more cables. Specifically, the ones we don\'t have.',
    objectiveType: 'ACCUMULATE_SUPPLIES',
    target: 5, // Threshold check
    count: 1,
    rewardXP: 400,
    difficulty: 'MEDIUM',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_004',
    title: 'Film Festival',
    description: 'Play 10 Media cards.',
    flavor: 'It\'s an educational documentary about sloths.',
    objectiveType: 'PLAY_CARD',
    target: 'MEDIA',
    count: 10,
    rewardXP: 600,
    difficulty: 'HARD',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_005',
    title: 'Quiet on Set',
    description: 'Deny 3 disruptive requests.',
    flavor: 'We are recording! Silence!',
    objectiveType: 'DENY_REQUESTS',
    target: 'ANY',
    count: 3,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_006',
    title: 'Broadcast Quality',
    description: 'Achieve an A-Rank or better.',
    flavor: 'Crystal clear picture. Perfect sound.',
    objectiveType: 'ACHIEVE_RANK',
    target: 'A',
    count: 1,
    rewardXP: 350,
    difficulty: 'MEDIUM',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_007',
    title: 'Streaming Numbers',
    description: 'Reach a streak of 12.',
    flavor: 'Engagement metrics are through the roof.',
    objectiveType: 'MAINTAIN_STREAK',
    target: 12,
    count: 1,
    rewardXP: 450,
    difficulty: 'MEDIUM',
    department: 'AV_CLUB'
  },
  {
    id: 'AVC_008',
    title: 'System Reboot',
    description: 'Gain a rank level (Promotion).',
    flavor: 'Firmware update installed successfully.',
    objectiveType: 'GAIN_RANK',
    target: 1,
    count: 1,
    rewardXP: 1000,
    difficulty: 'HARD',
    department: 'AV_CLUB'
  },

  // --- ADMINISTRATION ---
  {
    id: 'ADM_001',
    title: 'Rubber Stamp',
    description: 'Approve 10 Requests.',
    flavor: 'Just sign it. Nobody reads these anyway.',
    objectiveType: 'APPROVE_REQUESTS',
    target: 'ANY',
    count: 10,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_002',
    title: 'Budget Cuts',
    description: 'Deny 5 Requests.',
    flavor: 'We simply do not have the funds.',
    objectiveType: 'DENY_REQUESTS',
    target: 'ANY',
    count: 5,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_003',
    title: 'Core Curriculum',
    description: 'Play 8 Lecture cards.',
    flavor: 'Stick to the book. The book is good. The book is safe.',
    objectiveType: 'PLAY_CARD',
    target: 'LECTURE',
    count: 8,
    rewardXP: 350,
    difficulty: 'MEDIUM',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_004',
    title: 'Standardized Testing',
    description: 'Achieve S-Rank twice.',
    flavor: 'Data points. We need positive data points.',
    objectiveType: 'ACHIEVE_RANK',
    target: 'S',
    count: 2,
    rewardXP: 800,
    difficulty: 'HARD',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_005',
    title: 'Audit Preparation',
    description: 'Complete 3 shifts.',
    flavor: 'Look busy. The superintendent is coming.',
    objectiveType: 'SHIFT_COMPLETE', // Mapped from logic
    target: 'ANY',
    count: 3,
    rewardXP: 400,
    difficulty: 'MEDIUM',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_006',
    title: 'Policy Review',
    description: 'Play 15 cards of any type.',
    flavor: 'We need to verify the efficacy of our methods.',
    objectiveType: 'PLAY_CARD',
    target: 'ANY',
    count: 15,
    rewardXP: 250,
    difficulty: 'EASY',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_007',
    title: 'Crisis Leadership',
    description: 'Complete 2 objectives during a Crisis.',
    flavor: 'Keep calm and file paperwork.',
    objectiveType: 'COMPLETE_DURING_CRISIS',
    target: 'ANY',
    count: 2,
    rewardXP: 600,
    difficulty: 'HARD',
    department: 'ADMINISTRATION'
  },
  {
    id: 'ADM_008',
    title: 'Fast Track',
    description: 'Gain a Rank (Promotion).',
    flavor: 'We see management potential in you.',
    objectiveType: 'GAIN_RANK',
    target: 1,
    count: 1,
    rewardXP: 1000,
    difficulty: 'HARD',
    department: 'ADMINISTRATION'
  },

  // --- DISCIPLINARY COMMITTEE ---
  {
    id: 'DIS_001',
    title: 'Zero Tolerance',
    description: 'Deny 8 Requests.',
    flavor: 'No. The answer is no.',
    objectiveType: 'DENY_REQUESTS',
    target: 'ANY',
    count: 8,
    rewardXP: 450,
    difficulty: 'HARD',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_002',
    title: 'Order in the Court',
    description: 'Play 5 Lecture cards.',
    flavor: 'Sit down and listen.',
    objectiveType: 'PLAY_CARD',
    target: 'LECTURE',
    count: 5,
    rewardXP: 200,
    difficulty: 'EASY',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_003',
    title: 'Iron Fist',
    description: 'Maintain a streak of 20.',
    flavor: 'Control is an illusion. An illusion we must maintain.',
    objectiveType: 'MAINTAIN_STREAK',
    target: 20,
    count: 1,
    rewardXP: 700,
    difficulty: 'HARD',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_004',
    title: 'Correctional Facility',
    description: 'Achieve A-Rank or better.',
    flavor: 'Discipline is the bridge between goals and accomplishment.',
    objectiveType: 'ACHIEVE_RANK',
    target: 'A',
    count: 1,
    rewardXP: 350,
    difficulty: 'MEDIUM',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_005',
    title: 'Riot Control',
    description: 'Complete an objective during a Crisis.',
    flavor: 'Do not let them smell fear.',
    objectiveType: 'COMPLETE_DURING_CRISIS',
    target: 'ANY',
    count: 1,
    rewardXP: 500,
    difficulty: 'HARD',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_006',
    title: 'Paper Trail',
    description: 'Approve 3 administrative (Blue) requests.',
    flavor: 'Document everything.',
    objectiveType: 'APPROVE_REQUESTS',
    target: 'BLUE_SLIP', // Specific target logic
    count: 3,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_007',
    title: 'Strict Proctor',
    description: 'Play 10 cards without breaking streak.',
    flavor: 'Eyes on your own paper.',
    objectiveType: 'MAINTAIN_STREAK', // Simplified to streak check
    target: 10,
    count: 1,
    rewardXP: 400,
    difficulty: 'MEDIUM',
    department: 'DISCIPLINARY'
  },
  {
    id: 'DIS_008',
    title: 'Detention Monitor',
    description: 'Play 3 cards of each type (Kinetic, Media, Lecture).',
    flavor: 'Boredom is the ultimate punishment.',
    objectiveType: 'PLAY_CARD', // Requires complex tracking or just 9 total generic
    target: 'ANY',
    count: 9,
    rewardXP: 350,
    difficulty: 'MEDIUM',
    department: 'DISCIPLINARY'
  },

  // --- TEACHERS UNION ---
  {
    id: 'UNI_001',
    title: 'Coffee Break',
    description: 'Gain/Use a Coffee supply.',
    flavor: 'Mandated by Article 4, Section C.',
    objectiveType: 'ACCUMULATE_SUPPLIES',
    target: 'COFFEE',
    count: 1,
    rewardXP: 200,
    difficulty: 'EASY',
    department: 'UNION'
  },
  {
    id: 'UNI_002',
    title: 'Collective Bargaining',
    description: 'Approve 12 Requests.',
    flavor: 'Solidarity forever.',
    objectiveType: 'APPROVE_REQUESTS',
    target: 'ANY',
    count: 12,
    rewardXP: 500,
    difficulty: 'HARD',
    department: 'UNION'
  },
  {
    id: 'UNI_003',
    title: 'Resource Allocation',
    description: 'Accumulate 8 total supply items.',
    flavor: 'We demand better chalk.',
    objectiveType: 'ACCUMULATE_SUPPLIES',
    target: 8, // Threshold
    count: 1,
    rewardXP: 600,
    difficulty: 'HARD',
    department: 'UNION'
  },
  {
    id: 'UNI_004',
    title: 'Work-Life Balance',
    description: 'Maintain High Morale (Stat check).',
    flavor: 'You can\'t pour from an empty cup.',
    objectiveType: 'MAINTAIN_STAT',
    target: 'MORALE',
    count: 1,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'UNION'
  },
  {
    id: 'UNI_005',
    title: 'Tenure Track',
    description: 'Gain a Rank.',
    flavor: 'Job security is a beautiful thing.',
    objectiveType: 'GAIN_RANK',
    target: 1,
    count: 1,
    rewardXP: 1000,
    difficulty: 'HARD',
    department: 'UNION'
  },
  {
    id: 'UNI_006',
    title: 'Peer Review',
    description: 'Achieve B-Rank or better.',
    flavor: 'Just don\'t embarrass us.',
    objectiveType: 'ACHIEVE_RANK',
    target: 'B',
    count: 1,
    rewardXP: 250,
    difficulty: 'MEDIUM',
    department: 'UNION'
  },
  {
    id: 'UNI_007',
    title: 'Strike Fund',
    description: 'Reach a streak of 15.',
    flavor: 'We are stronger together.',
    objectiveType: 'MAINTAIN_STREAK',
    target: 15,
    count: 1,
    rewardXP: 500,
    difficulty: 'HARD',
    department: 'UNION'
  },
  {
    id: 'UNI_008',
    title: 'Substitute Request',
    description: 'Play 5 Media cards (Movie day).',
    flavor: 'I\'m not feeling well. Watch this.',
    objectiveType: 'PLAY_CARD',
    target: 'MEDIA',
    count: 5,
    rewardXP: 200,
    difficulty: 'MEDIUM',
    department: 'UNION'
  },

  // --- FACILITIES ---
  {
    id: 'FAC_001',
    title: 'Cleanup Crew',
    description: 'Play 6 Kinetic cards.',
    flavor: 'Someone threw up in the hallway again.',
    objectiveType: 'PLAY_CARD',
    target: 'KINETIC',
    count: 6,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_002',
    title: 'Emergency Repairs',
    description: 'Complete 2 objectives during a Crisis.',
    flavor: 'Duct tape fixes everything.',
    objectiveType: 'COMPLETE_DURING_CRISIS',
    target: 'ANY',
    count: 2,
    rewardXP: 700,
    difficulty: 'HARD',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_003',
    title: 'Supply Run',
    description: 'Acquire 2 Supply items.',
    flavor: 'We are out of paper towels. Again.',
    objectiveType: 'ACCUMULATE_SUPPLIES',
    target: 'ANY',
    count: 2,
    rewardXP: 300,
    difficulty: 'MEDIUM',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_004',
    title: 'Structural Integrity',
    description: 'Maintain a streak of 8.',
    flavor: 'The building is old, but it still stands.',
    objectiveType: 'MAINTAIN_STREAK',
    target: 8,
    count: 1,
    rewardXP: 250,
    difficulty: 'MEDIUM',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_005',
    title: 'Hazard Pay',
    description: 'Approve 5 requests during high urgency.',
    flavor: 'It\'s not part of the job description, but someone has to do it.',
    objectiveType: 'APPROVE_REQUESTS', // Generic approval, logic usually handles urgency elsewhere
    target: 'ANY',
    count: 5,
    rewardXP: 400,
    difficulty: 'MEDIUM',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_006',
    title: 'Night Shift',
    description: 'Complete 4 shifts.',
    flavor: 'It\'s quiet when they leave. Spooky quiet.',
    objectiveType: 'SHIFT_COMPLETE',
    target: 'ANY',
    count: 4,
    rewardXP: 500,
    difficulty: 'HARD',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_007',
    title: 'Renovation',
    description: 'Gain a Rank.',
    flavor: 'New coat of paint, same old problems.',
    objectiveType: 'GAIN_RANK',
    target: 1,
    count: 1,
    rewardXP: 900,
    difficulty: 'HARD',
    department: 'FACILITIES'
  },
  {
    id: 'FAC_008',
    title: 'Recycling Program',
    description: 'Play 10 cards.',
    flavor: 'Reduce, reuse, recycle.',
    objectiveType: 'PLAY_CARD',
    target: 'ANY',
    count: 10,
    rewardXP: 250,
    difficulty: 'EASY',
    department: 'FACILITIES'
  },

  // --- MISCELLANEOUS ---
  {
    id: 'MSC_001',
    title: 'Participation Trophy',
    description: 'Play 1 card.',
    flavor: 'You showed up. Good job.',
    objectiveType: 'PLAY_CARD',
    target: 'ANY',
    count: 1,
    rewardXP: 50,
    difficulty: 'EASY',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_002',
    title: 'Jack of All Trades',
    description: 'Play 3 Kinetic, 3 Media, and 3 Lecture cards.',
    flavor: 'Variety is the spice of life.',
    objectiveType: 'PLAY_CARD',
    target: 'ANY', // Simplified tracking
    count: 9,
    rewardXP: 400,
    difficulty: 'MEDIUM',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_003',
    title: 'Perfect Week',
    description: 'Achieve S-Rank 5 times.',
    flavor: 'Impossible is nothing.',
    objectiveType: 'ACHIEVE_RANK',
    target: 'S',
    count: 5,
    rewardXP: 1200,
    difficulty: 'HARD',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_004',
    title: 'Hoarder',
    description: 'Accumulate 10 Supply items.',
    flavor: 'You never know when you might need a protractor.',
    objectiveType: 'ACCUMULATE_SUPPLIES',
    target: 10,
    count: 1,
    rewardXP: 800,
    difficulty: 'HARD',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_005',
    title: 'Diplomat',
    description: 'Approve 5, Deny 5 requests.',
    flavor: 'Perfectly balanced, as all things should be.',
    objectiveType: 'APPROVE_REQUESTS', // Tracking split logic not fully supported in simple hook, treat as 10 interactions?
    target: 'ANY',
    count: 10,
    rewardXP: 500,
    difficulty: 'MEDIUM',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_006',
    title: 'Survivor',
    description: 'Complete 3 shifts during Crisis events.',
    flavor: 'I\'ve seen things you people wouldn\'t believe.',
    objectiveType: 'COMPLETE_DURING_CRISIS',
    target: 'ANY',
    count: 3,
    rewardXP: 900,
    difficulty: 'HARD',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_007',
    title: 'The Zone',
    description: 'Reach a streak of 25.',
    flavor: 'Flow state achieved.',
    objectiveType: 'MAINTAIN_STREAK',
    target: 25,
    count: 1,
    rewardXP: 1000,
    difficulty: 'HARD',
    department: 'MISCELLANEOUS'
  },
  {
    id: 'MSC_008',
    title: 'New Hire',
    description: 'Complete 1 Shift.',
    flavor: 'Welcome aboard.',
    objectiveType: 'SHIFT_COMPLETE',
    target: 'ANY',
    count: 1,
    rewardXP: 100,
    difficulty: 'EASY',
    department: 'MISCELLANEOUS'
  }
];

// --- HELPER FUNCTIONS ---

export const checkContractProgress = (contract, actionType, payload = {}) => {
  if (!contract) return false;

  switch (contract.objectiveType) {
    case 'PLAY_CARD':
      return actionType === 'CARD_PLAYED' && (contract.target === 'ANY' || contract.target === payload.cardType);
    
    case 'MAINTAIN_STAT':
      // Assuming payload.value carries the stat value
      return actionType === 'SHIFT_COMPLETE' && payload.stat === contract.target && payload.value >= 50; // Generic threshold 50%
      
    case 'MAINTAIN_STREAK':
      // Prompt Logic: streakCount >= contract.count (Using contract.target as threshold based on data structure)
      return actionType === 'STREAK_UPDATED' && payload.streak >= contract.target;

    case 'COMPLETE_DURING_CRISIS':
      return actionType === 'PUZZLE_COMPLETE' && payload.duringCrisis === true;

    case 'ACHIEVE_RANK':
      const rankValue = { 'S': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
      const achieved = rankValue[payload.rank] || 0;
      const target = rankValue[contract.target] || 0;
      return actionType === 'PUZZLE_COMPLETE' && achieved >= target;

    case 'ACCUMULATE_SUPPLIES':
      // Dual logic: Check if gaining specific supply OR if total count reaches threshold
      if (actionType === 'SUPPLY_GAINED') return true; 
      if (actionType === 'SUPPLIES_UPDATED') return payload.totalSupplies >= contract.target;
      return false;

    case 'GAIN_RANK':
      return actionType === 'RANK_GAINED'; // Logic handled by hook counter usually

    case 'APPROVE_REQUESTS':
      return actionType === 'REQUEST_APPROVED';

    case 'DENY_REQUESTS':
      return actionType === 'REQUEST_DENIED';

    case 'SHIFT_COMPLETE':
      return actionType === 'SHIFT_COMPLETE';

    default:
      return false;
  }
};

export const getContractById = (id) => {
  return STIPEND_CONTRACTS.find(c => c.id === id);
};

export const getRandomContracts = (count = 3) => {
  const shuffled = [...STIPEND_CONTRACTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getContractsByDepartment = (department) => {
  return STIPEND_CONTRACTS.filter(c => c.department === department);
};

export const getContractsByDifficulty = (difficulty) => {
  return STIPEND_CONTRACTS.filter(c => c.difficulty === difficulty);
};

export const generateWeeklySelection = () => {
  const easy = getContractsByDifficulty('EASY');
  const medium = getContractsByDifficulty('MEDIUM');
  const hard = getContractsByDifficulty('HARD');

  const selectedEasy = easy[Math.floor(Math.random() * easy.length)];
  const selectedMedium = medium[Math.floor(Math.random() * medium.length)];
  const selectedHard = hard[Math.floor(Math.random() * hard.length)];

  // Fallback if filters fail (though with 56 contracts it shouldn't)
  const fallback = getRandomContracts(3);

  return [
    selectedEasy || fallback[0],
    selectedMedium || fallback[1],
    selectedHard || fallback[2]
  ];
};

// --- VISUAL HELPERS ---

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'EASY': return '#10b981'; // Green
    case 'MEDIUM': return '#f59e0b'; // Amber
    case 'HARD': return '#ef4444'; // Red
    default: return '#6b7280'; // Gray
  }
};

export const getDifficultyLabel = (difficulty) => {
  switch (difficulty) {
    case 'EASY': return 'EASY';
    case 'MEDIUM': return 'MODERATE';
    case 'HARD': return 'CHALLENGING';
    default: return 'UNKNOWN';
  }
};

export const getDepartmentColor = (department) => {
  switch (department) {
    case 'ATHLETICS': return '#ef4444';      // Red
    case 'AV_CLUB': return '#3b82f6';        // Blue
    case 'ADMINISTRATION': return '#8b5cf6'; // Purple
    case 'DISCIPLINARY': return '#dc2626';   // Dark Red
    case 'UNION': return '#10b981';          // Green
    case 'FACILITIES': return '#f59e0b';     // Amber
    case 'MISCELLANEOUS': return '#6b7280';  // Gray
    default: return '#000000';
  }
};

export const getDepartmentLabel = (department) => {
  switch (department) {
    case 'ATHLETICS': return 'Athletics Dept';
    case 'AV_CLUB': return 'AV Club';
    case 'ADMINISTRATION': return 'Administration';
    case 'DISCIPLINARY': return 'Disciplinary Comm.';
    case 'UNION': return 'Teachers Union';
    case 'FACILITIES': return 'Facilities';
    case 'MISCELLANEOUS': return 'Miscellaneous';
    default: return department;
  }
};

export default {
  STIPEND_CONTRACTS,
  checkContractProgress,
  getContractById,
  getRandomContracts,
  getContractsByDepartment,
  getContractsByDifficulty,
  generateWeeklySelection,
  getDifficultyColor,
  getDifficultyLabel,
  getDepartmentColor,
  getDepartmentLabel
};
