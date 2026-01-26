
// Student Taxonomy Data and Generators

export const FIRST_NAMES = [
  "Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Theodore",
  "Jack", "Levi", "Alexander", "Jackson", "Mateo", "Daniel", "Michael", "Mason", "Sebastian", "Ethan",
  "Logan", "Owen", "Samuel", "Jacob", "Asher", "Aiden", "John", "Joseph", "Wyatt", "David",
  "Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Isabella", "Ava", "Mia", "Evelyn", "Luna",
  "Harper", "Camila", "Sofia", "Scarlett", "Elizabeth", "Eleanor", "Emily", "Chloe", "Mila", "Violet",
  "Penelope", "Gianna", "Aria", "Abigail", "Ella", "Avery", "Hazel", "Nora", "Layla", "Lily"
];

export const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

export const QUIRKS = [
  "Chews on pens constantly", "Hums quietly when focusing", "Obsessed with dinosaurs", "Refuses to use blue ink",
  "Always loses their left shoe", "Speaks in memes", "Compulsive doodler", "Afraid of the pencil sharpener",
  "Hoards eraser shavings", "Wears shorts in winter", "Untied shoelaces always", "Smells like maple syrup",
  "Brings weird snacks", "Corrects teacher's grammar", "Falls asleep if room is warm", "Taps foot rhythmically",
  "Makes paper airplanes", "Draws eyes on everything", "Narrates their own life", "Pretends to be a spy",
  "Collects shiny objects", "Only walks on tiles", "Whispers answers to self", "Clicks pen incessantly",
  "Stares at the clock", "Hides in hoodies", "Organizes desk by color", "Eats paste (allegedly)",
  "Has 50 pencils", "Never has a pencil", "Mimics bird calls", "Builds forts with books",
  "Suspiciously sticky", "Laughs at nothing", "Practices signature", "Wears cape to school",
  "Talks to imaginary friend", "Counts ceiling tiles", "Quotes movies randomly", "Fears the laminator"
];

export const STUDENT_ARCHETYPES = [
  {
    id: 'ARCHETYPE_CLASS_CLOWN',
    name: 'Class Clown',
    riskLevel: 'High',
    riskColor: '#ef4444',
    description: 'Highly energetic entity focused on disrupting equilibrium for social approval.',
    weakness: 'Requires constant audience validation.',
    behavior: 'Will attempt to derail lessons with humor if engagement drops below 50%.',
    interventionStrategy: 'Assign "Helper" tasks to channel energy constructively.',
    observationNotes: 'Subject produced 14 puns in a single period. The class laughed; productivity ceased.',
    icon: 'Laugh',
    activityPreference: ['Interactive', 'Group Work', 'Drama'],
    activityAvoidance: ['Silent Reading', 'Test', 'Lecture'],
    streakImpact: 'Can randomly break combo streaks with "Prank" events.'
  },
  {
    id: 'ARCHETYPE_SLEEPER',
    name: 'The Sleeper',
    riskLevel: 'Low',
    riskColor: '#3b82f6',
    description: 'Subject appears to be in a state of perpetual hibernation.',
    weakness: 'Cannot resist a comfortable surface or warm room temperature.',
    behavior: 'Zero participation unless directly stimulated. Drool risk: High.',
    interventionStrategy: 'Sudden loud noises or "Kinetic" activities.',
    observationNotes: 'Subject built a pillow out of binders. Ingenious, but unauthorized.',
    icon: 'Moon',
    activityPreference: ['Silent Reading', 'Video', 'Lecture'],
    activityAvoidance: ['Kinetic', 'Discussion', 'Sport'],
    streakImpact: 'Reduces XP gain by 10% due to non-participation.'
  },
  {
    id: 'ARCHETYPE_GIFTED_KID',
    name: 'Gifted Kid',
    riskLevel: 'Medium',
    riskColor: '#a855f7',
    description: 'Intellectually advanced but prone to existential boredom.',
    weakness: 'Repetitive tasks cause immediate disengagement.',
    behavior: 'Finishes work in 3 minutes, then invents problems.',
    interventionStrategy: 'Provide "Enrichment" modifiers immediately.',
    observationNotes: 'Corrected the textbook typo on page 42. Then corrected my spelling on the whiteboard.',
    icon: 'Lightbulb',
    activityPreference: ['Challenge', 'Independent Study', 'Project'],
    activityAvoidance: ['Repetition', 'Basic Review', 'Group Work'],
    streakImpact: 'Boosts XP for S-Rank lessons.'
  },
  {
    id: 'ARCHETYPE_TATTLETALE',
    name: 'The Tattletale',
    riskLevel: 'Medium',
    riskColor: '#f59e0b',
    description: 'Self-appointed guardian of the rules. The administration\'s unintentional spy.',
    weakness: 'Cannot function in an environment of anarchy.',
    behavior: 'Reports all minor infractions. Alienates peers.',
    interventionStrategy: 'Acknowledge receipt of information, then file in trash.',
    observationNotes: 'Submitted a 3-page report on another student chewing gum. Gum was not found.',
    icon: 'Siren',
    activityPreference: ['Rules Review', 'Test', 'Quiet Work'],
    activityAvoidance: ['Chaos', 'Free Time', 'Unstructured Play'],
    streakImpact: 'Increases risk of "Administrative Audit" events.'
  },
  {
    id: 'ARCHETYPE_TROUBLEMAKER',
    name: 'Troublemaker',
    riskLevel: 'Critical',
    riskColor: '#b91c1c',
    description: 'Agent of entropy. Goals unclear. Methods chaotic.',
    weakness: 'Authority figures (sometimes).',
    behavior: 'Actively sabotages lesson flow. Crisis generator.',
    interventionStrategy: 'Direct supervision. Do not blink.',
    observationNotes: ' managed to unscrew a desk leg without tools during a 5-minute quiz.',
    icon: 'Bomb',
    activityPreference: ['Kinetic', 'Hands-on', 'Outdoor'],
    activityAvoidance: ['Lecture', 'Rules Review', 'Silent Reading'],
    streakImpact: 'High chance to instantly fail a lesson.'
  },
  {
    id: 'ARCHETYPE_QUIET_GENIUS',
    name: 'Quiet Genius',
    riskLevel: 'Low',
    riskColor: '#10b981',
    description: 'Silent observer. Absorbs information without outputting noise.',
    weakness: 'Public speaking or forced social interaction.',
    behavior: 'Perfect grades, zero verbal participation.',
    interventionStrategy: 'Allow written responses instead of oral presentations.',
    observationNotes: 'Has not spoken since September. Maintained a 98% average.',
    icon: 'Brain',
    activityPreference: ['Independent Study', 'Writing', 'Reading'],
    activityAvoidance: ['Public Speaking', 'Drama', 'Debate'],
    streakImpact: 'Stabilizes combo streaks (prevents reset once per day).'
  },
  {
    id: 'ARCHETYPE_ATHLETE',
    name: 'The Athlete',
    riskLevel: 'Medium',
    riskColor: '#f97316',
    description: 'Kinetic energy containment failure imminent.',
    weakness: 'Sitting still for > 15 minutes.',
    behavior: 'Taps, bounces, throws objects into trash cans from distance.',
    interventionStrategy: 'Incorporate movement. "Trashketball" review games.',
    observationNotes: 'Did pushups while waiting for the bell. Sweat levels concerning.',
    icon: 'Trophy',
    activityPreference: ['Kinetic', 'Competition', 'Teamwork'],
    activityAvoidance: ['Reading', 'Lecture', 'Sedentary'],
    streakImpact: 'Boosts effectiveness of Kinetic cards.'
  },
  {
    id: 'ARCHETYPE_ARTIST',
    name: 'The Artist',
    riskLevel: 'Low',
    riskColor: '#ec4899',
    description: 'Views every surface as a canvas. Hands permanently stained.',
    weakness: 'Math class.',
    behavior: 'Doodles in margins. Doodles on desk. Doodles on peers.',
    interventionStrategy: 'Allow creative interpretation of assignments.',
    observationNotes: 'Turned a math worksheet into an origami swan. Answer was still wrong.',
    icon: 'Palette',
    activityPreference: ['Visual', 'Project', 'Creative'],
    activityAvoidance: ['Math', 'Drill', 'Standardized Test'],
    streakImpact: 'Can convert supplies into Morale bonuses.'
  },
  {
    id: 'ARCHETYPE_PARENT_NIGHTMARE',
    name: 'Parent Nightmare',
    riskLevel: 'High',
    riskColor: '#7f1d1d',
    description: 'Student is fine. Parent is the threat. Email inbox capacity at risk.',
    weakness: 'Grade dropping below A-.',
    behavior: 'Threatens to "call my mom/dad" if disciplined.',
    interventionStrategy: 'Document everything. Lawyer up.',
    observationNotes: 'Parent emailed at 3AM asking why their child got a 99 instead of 100.',
    icon: 'MailWarning',
    activityPreference: ['Graded Work', 'Test', 'Review'],
    activityAvoidance: ['Ungraded', 'Group Work', 'Subjective Art'],
    streakImpact: 'Increases stress/burnout accumulation.'
  },
  {
    id: 'ARCHETYPE_PERFECT_STUDENT',
    name: 'Perfect Student',
    riskLevel: 'Low',
    riskColor: '#fbbf24',
    description: 'The unicorn. Does the work. Helps others. Suspiciously good.',
    weakness: 'Perfectionism. Mental breakdown risk if they make one mistake.',
    behavior: 'Raises hand. Follows instructions. The teacher\'s only solace.',
    interventionStrategy: 'Protect at all costs.',
    observationNotes: 'Organized the bookshelf without being asked. I might cry.',
    icon: 'Star',
    activityPreference: ['Everything'],
    activityAvoidance: ['Failure', 'Chaos'],
    streakImpact: 'Passive XP multiplier.'
  }
];

// --- Generators ---

export const generateStudentName = () => {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
};

export const generateStudentQuirk = () => {
  return QUIRKS[Math.floor(Math.random() * QUIRKS.length)];
};

export const generateStudentProfile = (archetypeId) => {
  const archetype = STUDENT_ARCHETYPES.find(a => a.id === archetypeId);
  if (!archetype) return null;

  return {
    ...archetype,
    name: generateStudentName(),
    quirk: generateStudentQuirk(),
    generatedId: Date.now() + Math.random().toString(36).substr(2, 9)
  };
};

export default {
  FIRST_NAMES,
  LAST_NAMES,
  QUIRKS,
  STUDENT_ARCHETYPES,
  generateStudentName,
  generateStudentQuirk,
  generateStudentProfile
};
