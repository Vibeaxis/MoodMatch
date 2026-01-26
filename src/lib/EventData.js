
// Event data for memos, modifiers, and supplies

export const CRISIS_EVENTS = [
  // --- XP Penalties ---
  { 
    id: 'BUDGET_AUDIT', 
    type: 'CRISIS', 
    name: 'District Budget Audit', 
    text: 'Financial Freeze', 
    description: 'Auditors are scrutinizing every paperclip. XP gain reduced by 30%.', 
    flavor: 'Do not make eye contact with the people in suits.', 
    impact: 'XP Gain Reduced',
    modifier: { xpMultiplier: 0.7 },
    severity: 'High',
    theme: 'Bureaucracy'
  },
  { 
    id: 'UNION_STRIKE', 
    type: 'CRISIS', 
    name: 'Support Staff Strike', 
    text: 'Solo Operation', 
    description: 'Custodians and aides are picketing. You are on your own. XP gain halved.', 
    flavor: 'The trash cans are overflowing and the copier is lonely.', 
    impact: 'XP Gain Halved',
    modifier: { xpMultiplier: 0.5 },
    severity: 'High',
    theme: 'Political'
  },
  { 
    id: 'MONDAY_BLUES', 
    type: 'CRISIS', 
    name: 'Severe Monday Blues', 
    text: 'Collective Lethargy', 
    description: 'The weekend was too short. Everyone is moving at 50% speed. XP gain reduced.', 
    flavor: 'Coffee is ineffective. Send help.', 
    impact: 'XP Gain Reduced',
    modifier: { xpMultiplier: 0.9 },
    severity: 'Low',
    theme: 'Mood'
  },
  { 
    id: 'GRANT_REJECTION', 
    type: 'CRISIS', 
    name: 'Grant Rejection', 
    text: 'Funding Denied', 
    description: 'The "Fun & Learning" grant was denied. Morale is low. XP gain reduced.', 
    flavor: 'Back to using cardboard boxes for desks.', 
    impact: 'XP Gain Reduced',
    modifier: { xpMultiplier: 0.8 },
    severity: 'Medium',
    theme: 'Bureaucracy'
  },
  { 
    id: 'SUPPLY_SHORTAGE', 
    type: 'CRISIS', 
    name: 'Supply Chain Failure', 
    text: 'Materials Missing', 
    description: 'Basic materials are backordered until 2028. XP gain reduced.', 
    flavor: 'We are rationing staples. One per student.', 
    impact: 'XP Gain Reduced',
    modifier: { xpMultiplier: 0.75 },
    severity: 'Medium',
    theme: 'Resource'
  },
  { 
    id: 'COFFEE_SHORTAGE', 
    type: 'CRISIS', 
    name: 'Coffee Shortage', 
    text: 'Caffeine Levels Critical', 
    description: 'The staff lounge is out of coffee. Morale is plummeting. XP gain halved.', 
    flavor: 'Emergency Alert: The bean juice reserves are empty.', 
    impact: 'XP Gain Halved',
    modifier: { xpMultiplier: 0.5 },
    severity: 'High',
    theme: 'Resource'
  },

  // --- Media/Tech Blocks ---
  { 
    id: 'PROJECTOR_EXPLOSION', 
    type: 'CRISIS', 
    name: 'Projector Meltdown', 
    text: 'Tech Hazard', 
    description: 'The projector bulb exploded with dramatic flair. Media lessons disabled.', 
    flavor: 'It smelled like burning plastic and disappointment.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'Medium',
    theme: 'Tech'
  },
  { 
    id: 'RANSOMWARE_ATTACK', 
    type: 'CRISIS', 
    name: 'District Ransomware', 
    text: 'System Locked', 
    description: 'All screens display a skull and crossbones. Media lessons disabled.', 
    flavor: 'They want 500 Bitcoin or they delete the grades.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'High',
    theme: 'Tech'
  },
  { 
    id: 'POWER_OUTAGE', 
    type: 'CRISIS', 
    name: 'Rolling Blackout', 
    text: 'Darkness Falls', 
    description: 'The grid has failed. No electricity means no Media lessons.', 
    flavor: 'Analog teaching mode engaged.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'High',
    theme: 'Infrastructure'
  },
  { 
    id: 'WIFI_COLLAPSE', 
    type: 'CRISIS', 
    name: 'Wi-Fi Collapse', 
    text: 'Connection Lost', 
    description: 'The router is smoking. Internet is gone. Media lessons disabled.', 
    flavor: 'The dinosaur game is the only curriculum now.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'Medium',
    theme: 'Tech'
  },
  { 
    id: 'SMARTBOARD_MALFUNCTION', 
    type: 'CRISIS', 
    name: 'Smartboard Glitch', 
    text: 'Calibration Error', 
    description: 'The board thinks your finger is three feet to the left. Media disabled.', 
    flavor: 'It has developed a personality. A hostile one.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'Low',
    theme: 'Tech'
  },
  { 
    id: 'COMPUTER_LAB_VIRUS', 
    type: 'CRISIS', 
    name: 'Lab Virus Outbreak', 
    text: 'Digital Infection', 
    description: 'Every computer is playing polka music loudly. Media lessons disabled.', 
    flavor: 'Unplugging them only makes it louder.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'Medium',
    theme: 'Tech'
  },
  { 
    id: 'TECH_FAILURE', 
    type: 'CRISIS', 
    name: 'Tech Failure', 
    text: 'Equipment Malfunction', 
    description: 'General technology strike. Machines refuse to work. Media disabled.', 
    flavor: 'The machines are rising up.', 
    impact: 'Media Disabled',
    modifier: { blockType: 'Media' },
    severity: 'Medium',
    theme: 'Tech'
  },

  // --- Kinetic Blocks ---
  { 
    id: 'GYM_FLOOR_WAXING', 
    type: 'CRISIS', 
    name: 'Gym Floor Waxing', 
    text: 'Slippery Surfaces', 
    description: 'The gym is a friction-free zone. Kinetic lessons disabled.', 
    flavor: 'One step and you slide into next week.', 
    impact: 'Kinetic Disabled',
    modifier: { blockType: 'Kinetic' },
    severity: 'Medium',
    theme: 'Facility'
  },
  { 
    id: 'LICE_OUTBREAK', 
    type: 'CRISIS', 
    name: 'Lice Outbreak', 
    text: 'Parasitic Event', 
    description: 'Strict "No Touching" policy in effect. Kinetic lessons disabled.', 
    flavor: 'Everyone is scratching. Even you.', 
    impact: 'Kinetic Disabled',
    modifier: { blockType: 'Kinetic' },
    severity: 'High',
    theme: 'Health'
  },
  { 
    id: 'HEAT_WAVE', 
    type: 'CRISIS', 
    name: 'Heat Wave', 
    text: 'Thermal Warning', 
    description: 'AC is broken. Physical exertion is dangerous. Kinetic lessons disabled.', 
    flavor: 'We are melting. Literally melting.', 
    impact: 'Kinetic Disabled',
    modifier: { blockType: 'Kinetic' },
    severity: 'High',
    theme: 'Environment'
  },
  { 
    id: 'ASBESTOS_INSPECTION', 
    type: 'CRISIS', 
    name: 'Asbestos Check', 
    text: 'Particulate Hazard', 
    description: 'Men in hazmat suits are in the gym. Kinetic lessons disabled.', 
    flavor: 'Take a deep breath... actually, don\'t.', 
    impact: 'Kinetic Disabled',
    modifier: { blockType: 'Kinetic' },
    severity: 'High',
    theme: 'Safety'
  },
  { 
    id: 'FLOODED_GYMNASIUM', 
    type: 'CRISIS', 
    name: 'Gym Flood', 
    text: 'Aquatic Center', 
    description: 'A pipe burst. The basketball court is now a pool. Kinetic disabled.', 
    flavor: 'Bring your floaties.', 
    impact: 'Kinetic Disabled',
    modifier: { blockType: 'Kinetic' },
    severity: 'Medium',
    theme: 'Facility'
  },
  { 
    id: 'MOLD_REMEDIATION', 
    type: 'CRISIS', 
    name: 'Mold Discovery', 
    text: 'Fungal Incursion', 
    description: 'A sentient mold colony claimed the activity corner. Kinetic disabled.', 
    flavor: 'We named it "Steve". Steve is aggressive.', 
    impact: 'Kinetic Disabled',
    modifier: { blockType: 'Kinetic' },
    severity: 'Medium',
    theme: 'Health'
  },

  // --- Constraint Focus ---
  { 
    id: 'ACCREDITATION_REVIEW', 
    type: 'CRISIS', 
    name: 'Accreditation Visit', 
    text: 'Compliance Check', 
    description: 'External observers are watching. Constraint matching is 2x important.', 
    flavor: 'Smile and nod. But mostly comply.', 
    impact: 'Constraint Focus x2',
    modifier: { constraintMultiplier: 2.0 },
    severity: 'High',
    theme: 'Bureaucracy'
  },
  { 
    id: 'SCHOOL_BOARD_VISIT', 
    type: 'CRISIS', 
    name: 'Board Walkthrough', 
    text: 'VIP on Site', 
    description: 'The School Board is touring. Constraint matching is 1.5x important.', 
    flavor: 'Hide the non-approved textbooks.', 
    impact: 'Constraint Focus x1.5',
    modifier: { constraintMultiplier: 1.5 },
    severity: 'High',
    theme: 'Political'
  },
  { 
    id: 'GRANT_EVALUATION', 
    type: 'CRISIS', 
    name: 'Grant Evaluator', 
    text: 'Funding Review', 
    description: 'They want to see if we follow the rules. Constraints are key (1.5x).', 
    flavor: 'Show them we deserve the money.', 
    impact: 'Constraint Focus x1.5',
    modifier: { constraintMultiplier: 1.5 },
    severity: 'Medium',
    theme: 'Bureaucracy'
  },
  { 
    id: 'PARENT_COMPLAINT_SURGE', 
    type: 'CRISIS', 
    name: 'Parent Email Surge', 
    text: 'Inbox Explosion', 
    description: 'Parents are micromanaging via email. Constraints are vital (1.8x).', 
    flavor: 'They have formed a Facebook group about you.', 
    impact: 'Constraint Focus x1.8',
    modifier: { constraintMultiplier: 1.8 },
    severity: 'Medium',
    theme: 'Social'
  },
  { 
    id: 'SAFETY_INSPECTION', 
    type: 'CRISIS', 
    name: 'OSHA Inspection', 
    text: 'Safety Protocol', 
    description: 'Inspectors are checking for hazards. Follow constraints or else (1.5x).', 
    flavor: 'Tape down those extension cords.', 
    impact: 'Constraint Focus x1.5',
    modifier: { constraintMultiplier: 1.5 },
    severity: 'High',
    theme: 'Safety'
  },
  { 
    id: 'PARENT_COMPLAINT', 
    type: 'CRISIS', 
    name: 'Parent Complaint', 
    text: 'Specific Grievance', 
    description: 'A loud parent demands specific outcomes. Constraints are crucial (1.5x).', 
    flavor: 'Re: Your teaching methods.', 
    impact: 'Constraint Focus x1.5',
    modifier: { constraintMultiplier: 1.5 },
    severity: 'Medium',
    theme: 'Social'
  },

  // --- Double Shifts ---
  { 
    id: 'FLU_SEASON', 
    type: 'CRISIS', 
    name: 'Staff Flu Epidemic', 
    text: 'Skeleton Crew', 
    description: 'Half the staff is out. You are covering two classes. 2 puzzles required.', 
    flavor: 'Wash your hands. Don\'t breathe.', 
    impact: 'Double Shift',
    modifier: { puzzlesRequired: 2 },
    severity: 'High',
    theme: 'Health'
  },
  { 
    id: 'JURY_DUTY', 
    type: 'CRISIS', 
    name: 'Jury Duty Coverage', 
    text: 'Civic Duty', 
    description: 'Mr. Henderson is at court. You have his class too. 2 puzzles required.', 
    flavor: 'He claims it\'s a murder trial. It\'s probably traffic court.', 
    impact: 'Double Shift',
    modifier: { puzzlesRequired: 2 },
    severity: 'Medium',
    theme: 'Civic'
  },
  { 
    id: 'STAFF_RETREAT_FORGOTTEN', 
    type: 'CRISIS', 
    name: 'Admin Error', 
    text: 'Scheduling Snafu', 
    description: 'Everyone else is at a retreat you weren\'t invited to. 2 puzzles required.', 
    flavor: 'Enjoy the peace and quiet. Just kidding, it\'s chaos.', 
    impact: 'Double Shift',
    modifier: { puzzlesRequired: 2 },
    severity: 'Medium',
    theme: 'Bureaucracy'
  },
  { 
    id: 'SUBSTITUTE_NO_SHOW', 
    type: 'CRISIS', 
    name: 'Sub Ghosted', 
    text: 'Coverage Gap', 
    description: 'The sub never showed up. You\'re absorbing the class. 2 puzzles required.', 
    flavor: 'Room 204 is now your problem.', 
    impact: 'Double Shift',
    modifier: { puzzlesRequired: 2 },
    severity: 'High',
    theme: 'Staffing'
  },
  { 
    id: 'FIELD_TRIP_EMERGENCY', 
    type: 'CRISIS', 
    name: 'Field Trip Backup', 
    text: 'Chaperone Duty', 
    description: 'You stayed behind to manage the remaining students. 2 puzzles required.', 
    flavor: 'Why didn\'t you get to go to the zoo?', 
    impact: 'Double Shift',
    modifier: { puzzlesRequired: 2 },
    severity: 'Medium',
    theme: 'Staffing'
  },
  { 
    id: 'STAFF_ABSENCE', 
    type: 'CRISIS', 
    name: 'Staff Absence', 
    text: 'Substitute Shortage', 
    description: 'Covering an extra class during prep. 2 puzzles required.', 
    flavor: 'There goes your lunch break.', 
    impact: 'Double Shift',
    modifier: { puzzlesRequired: 2 },
    severity: 'High',
    theme: 'Staffing'
  },

  // --- Difficulty Increases ---
  { 
    id: 'STANDARDIZED_TEST_PREP', 
    type: 'CRISIS', 
    name: 'Testing Season', 
    text: 'High Stakes', 
    description: 'State testing preparation. Grading is stricter (Threshold +0.1).', 
    flavor: 'Bubbling in answers is an art form.', 
    impact: 'Difficulty Up',
    modifier: { gradeThresholdIncrease: 0.1 },
    severity: 'Medium',
    theme: 'Academic'
  },
  { 
    id: 'PRINCIPAL_OBSERVATION', 
    type: 'CRISIS', 
    name: 'Formal Observation', 
    text: 'Performance Review', 
    description: 'The Principal is in the back of the room. General difficulty increased.', 
    flavor: 'Don\'t sweat. They can smell fear.', 
    impact: 'Difficulty Up',
    modifier: { difficultyIncrease: 1 },
    severity: 'High',
    theme: 'Career'
  },
  { 
    id: 'DISTRICT_AUDIT', 
    type: 'CRISIS', 
    name: 'Curriculum Audit', 
    text: 'Alignment Check', 
    description: 'Checking every lesson for standard alignment. Grading stricter (+0.2).', 
    flavor: 'Is this aligned with Common Core 7.4.2(b)?', 
    impact: 'Difficulty Up',
    modifier: { gradeThresholdIncrease: 0.2 },
    severity: 'High',
    theme: 'Bureaucracy'
  },
  { 
    id: 'GIFTED_PROGRAM_SCREENING', 
    type: 'CRISIS', 
    name: 'GATE Screening', 
    text: 'Advanced Placement', 
    description: 'Identifying gifted students requires precision. Grading stricter (+0.15).', 
    flavor: 'Every child is special. Some are just more special on paper.', 
    impact: 'Difficulty Up',
    modifier: { gradeThresholdIncrease: 0.15 },
    severity: 'Medium',
    theme: 'Academic'
  },
  { 
    id: 'FIRE_DRILL', 
    type: 'CRISIS', 
    name: 'Fire Drill', 
    text: 'Emergency Drill', 
    description: 'Disruptions expected. General difficulty increased.', 
    flavor: 'Single file. Quietly.', 
    impact: 'Difficulty Up',
    modifier: { difficultyIncrease: 1 },
    severity: 'Medium',
    theme: 'Safety'
  },
  { 
    id: 'STUDENT_INCIDENT', 
    type: 'CRISIS', 
    name: 'Student Incident', 
    text: 'Cafeteria Fight', 
    description: 'Tensions are high. Grading threshold increased (+0.2).', 
    flavor: 'Tater tots everywhere.', 
    impact: 'Difficulty Up',
    modifier: { gradeThresholdIncrease: 0.2 },
    severity: 'Medium',
    theme: 'Discipline'
  },

  // --- Streak Breaks ---
  { 
    id: 'BELOVED_TEACHER_RETIREMENT', 
    type: 'CRISIS', 
    name: 'Ms. Frizzle Retiring', 
    text: 'Emotional Farewell', 
    description: 'Everyone is crying. Focus is shattered. Failure breaks streak.', 
    flavor: 'The end of an era.', 
    impact: 'Streak Break on F',
    modifier: { streakBreak: true },
    severity: 'Low',
    theme: 'Emotional'
  },
  { 
    id: 'BUDGET_CUTS_ANNOUNCED', 
    type: 'CRISIS', 
    name: 'Severe Cuts Memo', 
    text: 'Fiscal Cliff', 
    description: 'Morale is at rock bottom. One mistake will ruin the day. Failure breaks streak.', 
    flavor: 'There goes the art program.', 
    impact: 'Streak Break on F',
    modifier: { streakBreak: true },
    severity: 'High',
    theme: 'Morale'
  },
  { 
    id: 'SCHOOL_SHOOTING_LOCKDOWN', 
    type: 'CRISIS', 
    name: 'Emergency Lockdown', 
    text: 'Code Red', 
    description: 'High stress environment. One mistake is fatal to momentum. Failure breaks streak.', 
    flavor: 'This is not a drill. Stay silent.', 
    impact: 'Streak Break on F',
    modifier: { streakBreak: true },
    severity: 'High',
    theme: 'Safety'
  },
  { 
    id: 'TEACHER_SCANDAL', 
    type: 'CRISIS', 
    name: 'Faculty Rumor Mill', 
    text: 'Gossip Storm', 
    description: 'Everyone is distracted by the drama. Failure breaks streak.', 
    flavor: 'Did you hear what happened in the lounge?', 
    impact: 'Streak Break on F',
    modifier: { streakBreak: true },
    severity: 'Medium',
    theme: 'Social'
  },
  { 
    id: 'STUDENT_TRAGEDY', 
    type: 'CRISIS', 
    name: 'Somber Announcement', 
    text: 'Heavy Hearts', 
    description: 'A difficult day for the community. Failure breaks streak.', 
    flavor: 'Flags are at half-mast.', 
    impact: 'Streak Break on F',
    modifier: { streakBreak: true },
    severity: 'High',
    theme: 'Emotional'
  },
  { 
    id: 'OBSERVATION_DAY', 
    type: 'CRISIS', 
    name: 'Observation Day', 
    text: 'Admin Eyes', 
    description: 'The Principal is watching. Failure breaks streak.', 
    flavor: 'Clipboards ready.', 
    impact: 'Streak Break on F',
    modifier: { streakBreak: true },
    severity: 'High',
    theme: 'Career'
  }
];

export const FLAVOR_MEMOS = [
  // --- Micro-Horror ---
  { id: 'BASEMENT_DOOR_UNLOCKED', type: 'FLAVOR', text: 'Security Alert', description: 'The basement door was found unlocked from the inside.', category: 'micro-horror', tone: 'unsettling' },
  { id: 'MYSTERIOUS_STAIN', type: 'FLAVOR', text: 'Custodial Notice', description: 'The stain in the hallway is shifting. Do not touch it.', category: 'micro-horror', tone: 'eerie' },
  { id: 'MISSING_STUDENT_FOUND', type: 'FLAVOR', text: 'Student Update', description: 'The student missing since 1994 has been marked present today.', category: 'micro-horror', tone: 'unsettling' },
  { id: 'VOICE_IN_WALLS', type: 'FLAVOR', text: 'Maintenance Log', description: 'Repairs on the vents delayed. The voices are too loud.', category: 'micro-horror', tone: 'eerie' },
  { id: 'YEARBOOK_GHOST', type: 'FLAVOR', text: 'Yearbook Edit', description: 'Please ignore the extra figure in the class photo.', category: 'micro-horror', tone: 'unsettling' },
  { id: 'BATHROOM_MIRROR', type: 'FLAVOR', text: 'Facility Issue', description: 'The bathroom mirrors have been removed for your safety.', category: 'micro-horror', tone: 'eerie' },
  { id: 'LOCKER_CONTENTS', type: 'FLAVOR', text: 'Locker Check', description: 'Locker 666 contained an infinite void. It has been sealed.', category: 'micro-horror', tone: 'absurd' },
  { id: 'BELL_SCHEDULE_GLITCH', type: 'FLAVOR', text: 'Schedule Error', description: 'The bell is ringing in Morse code. It spells "RUN".', category: 'micro-horror', tone: 'unsettling' },

  // --- Bureaucracy ---
  { id: 'FORM_27B_6', type: 'FLAVOR', text: 'Paperwork Update', description: 'Form 27B-6 must now be filed in triplicate.', category: 'bureaucracy', tone: 'frustrated' },
  { id: 'MEMO_CHAIN', type: 'FLAVOR', text: 'Re: Re: Re: Re:', description: 'Please stop replying all to the "Lost Tupperware" email.', category: 'bureaucracy', tone: 'frustrated' },
  { id: 'PARKING_PERMIT_RENEWAL', type: 'FLAVOR', text: 'Parking Permits', description: 'Expired permits will result in immediate towing.', category: 'bureaucracy', tone: 'stressful' },
  { id: 'COMPLIANCE_AUDIT', type: 'FLAVOR', text: 'Compliance Audit', description: 'Ensure your stapler is regulation size.', category: 'bureaucracy', tone: 'tense' },
  { id: 'POLICY_CHANGE_RETROACTIVE', type: 'FLAVOR', text: 'Policy Update', description: 'The new grading policy applies retroactively to last year.', category: 'bureaucracy', tone: 'absurd' },
  { id: 'MEETING_ABOUT_MEETING', type: 'FLAVOR', text: 'Meeting Invite', description: 'Pre-meeting to discuss the agenda for the next meeting.', category: 'bureaucracy', tone: 'frustrated' },
  { id: 'FORM_SUBMISSION_ERROR', type: 'FLAVOR', text: 'System Error', description: 'Your leave request was denied due to font size violation.', category: 'bureaucracy', tone: 'stressful' },
  { id: 'BUDGET_SPREADSHEET', type: 'FLAVOR', text: 'Budget Correction', description: 'Please recalculate your needs using the new imaginary currency.', category: 'bureaucracy', tone: 'absurd' },
  { id: 'SIGNATURE_REQUIRED', type: 'FLAVOR', text: 'Action Required', description: 'Please sign the acknowledgment that you read the previous acknowledgment.', category: 'bureaucracy', tone: 'frustrated' },
  { id: 'POLICY_CLARIFICATION', type: 'FLAVOR', text: 'Clarification', description: 'The previous clarification was unclear. This clarifies it.', category: 'bureaucracy', tone: 'absurd' },

  // --- Student Weirdness ---
  { id: 'TIME_TRAVELER_CLAIM', type: 'FLAVOR', text: 'Student Report', description: 'A kindergartner claims to be from the year 2050.', category: 'student-weirdness', tone: 'absurd' },
  { id: 'STUDENT_SPEAKS_BACKWARDS', type: 'FLAVOR', text: 'Observation', description: 'Timmy is only speaking backwards today.', category: 'student-weirdness', tone: 'eerie' },
  { id: 'STUDENT_IDENTICAL_TWINS', type: 'FLAVOR', text: 'Roster Confusion', description: 'There are now three identical twins in your class.', category: 'student-weirdness', tone: 'absurd' },
  { id: 'STUDENT_ONLY_WHISPERS', type: 'FLAVOR', text: 'Behavior Note', description: 'Sarah is only communicating via aggressive whispering.', category: 'student-weirdness', tone: 'unsettling' },
  { id: 'STUDENT_COLLECTS_PENCILS', type: 'FLAVOR', text: 'Lost & Found', description: 'We found a hoard of 4,000 pencils in a locker.', category: 'student-weirdness', tone: 'absurd' },
  { id: 'STUDENT_KNOWS_FUTURE', type: 'FLAVOR', text: 'Prediction', description: 'A student predicted the fire drill to the second.', category: 'student-weirdness', tone: 'eerie' },
  { id: 'STUDENT_SPEAKS_ONLY_QUESTIONS', type: 'FLAVOR', text: 'Language Issue', description: 'Why is everyone only speaking in questions?', category: 'student-weirdness', tone: 'frustrated' },
  { id: 'STUDENT_INVISIBLE_FRIEND', type: 'FLAVOR', text: 'Extra Student', description: 'Please set a desk for "Mr. Nobody".', category: 'student-weirdness', tone: 'unsettling' },
  { id: 'STUDENT_WRITES_BACKWARDS', type: 'FLAVOR', text: 'Handwriting', description: 'All essays submitted in mirror writing.', category: 'student-weirdness', tone: 'absurd' },
  { id: 'STUDENT_HUMS_CONSTANTLY', type: 'FLAVOR', text: 'Noise Complaint', description: 'The collective humming is vibrating the floor.', category: 'student-weirdness', tone: 'unsettling' },

  // --- Faculty Drama ---
  { id: 'REPLY_ALL_POTLUCK', type: 'FLAVOR', text: 'Potluck Disaster', description: 'Please stop replying all about the potato salad.', category: 'faculty-drama', tone: 'frustrated' },
  { id: 'COFFEE_MACHINE_BROKEN', type: 'FLAVOR', text: 'Lounge Alert', description: 'The coffee machine is broken. Anarchy is imminent.', category: 'faculty-drama', tone: 'stressful' },
  { id: 'PARKING_LOT_INCIDENT', type: 'FLAVOR', text: 'Parking War', description: 'The English Dept declared war on the Science Dept over Spot 42.', category: 'faculty-drama', tone: 'tense' },
  { id: 'MICROWAVE_FOOD_THEFT', type: 'FLAVOR', text: 'Thief Alert', description: 'Whoever stole the lasagna, we have footage.', category: 'faculty-drama', tone: 'tense' },
  { id: 'BATHROOM_GRAFFITI', type: 'FLAVOR', text: 'Vandalism', description: 'Graffiti in the staff bathroom critiques the curriculum.', category: 'faculty-drama', tone: 'absurd' },
  { id: 'DEPARTMENT_FEUD', type: 'FLAVOR', text: 'Turf War', description: 'Math and History are fighting over the good copier.', category: 'faculty-drama', tone: 'tense' },
  { id: 'SUPPLY_CLOSET_HOARDING', type: 'FLAVOR', text: 'Hoarding', description: 'Someone is stockpiling construction paper.', category: 'faculty-drama', tone: 'frustrated' },
  { id: 'MEETING_ROOM_BOOKING_WAR', type: 'FLAVOR', text: 'Scheduling Conflict', description: 'Passive aggressive notes left on Conference Room B.', category: 'faculty-drama', tone: 'tense' },
  { id: 'ANONYMOUS_COMPLAINT', type: 'FLAVOR', text: 'Complaint Box', description: 'The box is full of complaints about the complaint box.', category: 'faculty-drama', tone: 'absurd' },
  { id: 'FACULTY_CLIQUE_DRAMA', type: 'FLAVOR', text: 'Social Update', description: 'The cool teachers table is now "reservation only".', category: 'faculty-drama', tone: 'frustrated' },

  // --- Positive/Quirky ---
  { id: 'STUDENT_ACHIEVEMENT', type: 'FLAVOR', text: 'Good News', description: 'A student actually read the syllabus!', category: 'positive', tone: 'uplifting' },
  { id: 'SURPRISE_PIZZA', type: 'FLAVOR', text: 'Lunch Treat', description: 'Leftover pizza in the lounge. Run.', category: 'positive', tone: 'uplifting' },
  { id: 'TEACHER_APPRECIATION_DAY', type: 'FLAVOR', text: 'Appreciation', description: 'Here is a rock that says "You Rock".', category: 'positive', tone: 'absurd' },
  { id: 'RANDOM_ACT_OF_KINDNESS', type: 'FLAVOR', text: 'Kudos', description: 'Someone refilled the copier paper.', category: 'positive', tone: 'uplifting' },
  { id: 'SCHOOL_SPIRIT_DAY', type: 'FLAVOR', text: 'Spirit Week', description: 'Today is "Dress Like a Lamp" day.', category: 'positive', tone: 'absurd' },
  { id: 'SUCCESSFUL_FUNDRAISER', type: 'FLAVOR', text: 'Fundraiser', description: 'We sold enough chocolate to buy one (1) iPad.', category: 'positive', tone: 'uplifting' },
  { id: 'STUDENT_TALENT_SHOW', type: 'FLAVOR', text: 'Talent Show', description: 'Prepare for 40 renditions of "Let It Go".', category: 'positive', tone: 'uplifting' },
  { id: 'TEACHER_COLLABORATION', type: 'FLAVOR', text: 'Teamwork', description: 'Co-planning actually worked today.', category: 'positive', tone: 'uplifting' },

  // --- Weather/Seasonal ---
  { id: 'SNOW_DAY', type: 'FLAVOR', text: 'Weather Alert', description: 'Forecast predicts snow. Hope is dangerous.', category: 'weather', tone: 'tense' },
  { id: 'HEAT_ADVISORY', type: 'FLAVOR', text: 'Heat Warning', description: 'Hydrate or diedrate.', category: 'weather', tone: 'stressful' },
  { id: 'TORNADO_WARNING', type: 'FLAVOR', text: 'Drill Alert', description: 'Please assume the crash position.', category: 'weather', tone: 'tense' },
  { id: 'FIRST_DAY_OF_SPRING', type: 'FLAVOR', text: 'Seasonal Shift', description: 'The pollening has begun.', category: 'weather', tone: 'frustrated' },
  { id: 'EARLY_DISMISSAL', type: 'FLAVOR', text: 'Schedule Change', description: 'Release the hounds (students) early today.', category: 'weather', tone: 'uplifting' }
];

export const MINOR_BOONS = [
  { id: 'KINETIC_BOOST', type: 'BOON', text: 'Kinetic Boost', description: 'All Kinetic activities get a grade bump today.', targetType: 'Kinetic' },
  { id: 'MEDIA_BOOST', type: 'BOON', text: 'Media Boost', description: 'All Media activities get a grade bump today.', targetType: 'Media' },
  { id: 'DISCIPLINE_BOOST', type: 'BOON', text: 'Discipline Boost', description: 'All Discipline activities get a grade bump today.', targetType: 'Discipline' },
  { id: 'LECTURE_BOOST', type: 'BOON', text: 'Lecture Boost', description: 'All Lecture activities get a grade bump today.', targetType: 'Lecture' },
  { id: 'INDOOR_BOOST', type: 'BOON', text: 'Indoor Expert', description: 'All Indoor activities get a grade bump today.', targetTag: 'Indoor' },
  { id: 'OUTDOOR_BOOST', type: 'BOON', text: 'Outdoor Expert', description: 'All Outdoor activities get a grade bump today.', targetTag: 'Outdoor' },
  { id: 'ACTIVE_BOOST', type: 'BOON', text: 'High Energy', description: 'All Active activities get a grade bump today.', targetTag: 'Active' },
  { id: 'QUIET_BOOST', type: 'BOON', text: 'Shhh!', description: 'All Quiet activities get a grade bump today.', targetTag: 'Quiet' }
];

export const JACKPOT_EVENTS = [
  { id: 'FREE_PASS', type: 'JACKPOT', text: 'Superintendent Approval', description: 'Automatic S-Rank on all activities today!' },
  { id: 'DOUBLE_XP', type: 'JACKPOT', text: 'Grant Funding', description: 'Earn double XP for every correct answer today!' },
  { id: 'STREAK_SAVER', type: 'JACKPOT', text: 'Forgiveness Policy', description: 'Your streak will not break on the next mistake.' }
];

export const SUPPLIES_SHOP = [
  // Desk Decor
  { id: 'newtons_cradle', category: 'Desk Decor', name: 'Newton\'s Cradle', cost: 4, description: 'Click... clack... click... clack...', icon: 'ball', flavor: 'Physics in motion.', unlocked: false },
  { id: 'globe', category: 'Desk Decor', name: 'Vintage Globe', cost: 5, description: 'The world at your fingertips.', icon: 'globe', flavor: 'Some borders may be outdated.', unlocked: false },
  { id: 'potted_plant', category: 'Desk Decor', name: 'Succulent', cost: 2, description: 'Hard to kill. Hopefully.', icon: 'plant', flavor: 'Adds oxygen.', unlocked: false },
  { id: 'photo_frame', category: 'Desk Decor', name: 'Family Photo', cost: 1, description: 'Reminds you why you do this.', icon: 'frame', flavor: 'Or a stock photo.', unlocked: false },
  { id: 'desk_lamp', category: 'Desk Decor', name: 'Banker\'s Lamp', cost: 4, description: 'Classic green glass shade.', icon: 'lamp', flavor: 'Illuminating.', unlocked: false },
  { id: 'pencil_holder', category: 'Desk Decor', name: 'Novelty Mug', cost: 1, description: 'World\'s Okayest Teacher.', icon: 'cup', flavor: 'Holds pens.', unlocked: false },
  { id: 'desk_clock', category: 'Desk Decor', name: 'Analog Clock', cost: 3, description: 'Ticking away the seconds.', icon: 'clock', flavor: 'Don\'t watch it too closely.', unlocked: false },
  { id: 'calendar', category: 'Desk Decor', name: 'Daily Calendar', cost: 2, description: 'A new quote every day.', icon: 'calendar', flavor: 'Today is the day.', unlocked: false },

  // Classroom Supplies
  { id: 'markers', category: 'Classroom Supplies', name: 'Premium Markers', cost: 3, description: 'Low odor, high vibrancy.', icon: 'pen', flavor: 'Do not sniff.', unlocked: false },
  { id: 'stapler', category: 'Classroom Supplies', name: 'Red Stapler', cost: 4, description: 'Heavy duty. Iconic.', icon: 'stapler', flavor: 'Don\'t take my stapler.', unlocked: false },
  { id: 'paper_clips', category: 'Classroom Supplies', name: 'Colorful Clips', cost: 1, description: 'Holding it all together.', icon: 'clip', flavor: 'Rainbow assortment.', unlocked: false },
  { id: 'tape_dispenser', category: 'Classroom Supplies', name: 'Tape Dispenser', cost: 2, description: 'Weighted base for one-hand use.', icon: 'tape', flavor: 'Stick with it.', unlocked: false },
  { id: 'calculator', category: 'Classroom Supplies', name: 'Big Calc', cost: 3, description: 'Large buttons for angry math.', icon: 'calc', flavor: '80085', unlocked: false },
  { id: 'sticky_notes', category: 'Classroom Supplies', name: 'Sticky Notes', cost: 2, description: 'Yellow squares of memory.', icon: 'sticky', flavor: 'Post it everywhere.', unlocked: false },
  { id: 'scissors', category: 'Classroom Supplies', name: 'Good Scissors', cost: 3, description: 'Sharp. Teacher use only.', icon: 'scissors', flavor: 'Not for running.', unlocked: false },
  { id: 'ruler', category: 'Classroom Supplies', name: 'Metal Ruler', cost: 2, description: 'Straight edge, cold steel.', icon: 'ruler', flavor: 'Measures up.', unlocked: false },

  // Comfort & Wellness
  { id: 'stress_ball', category: 'Comfort & Wellness', name: 'Stress Ball', cost: 1, description: 'Squeeze the rage away.', icon: 'ball_soft', flavor: 'Squishy.', unlocked: false },
  { id: 'hand_sanitizer', category: 'Comfort & Wellness', name: 'Sanitizer Pump', cost: 2, description: 'Kills 99.9% of germs.', icon: 'bottle', flavor: 'Hygiene theater.', unlocked: false },
  { id: 'tissues', category: 'Comfort & Wellness', name: 'Soft Tissues', cost: 2, description: 'For tears and sneezes.', icon: 'tissue', flavor: 'Extra ply.', unlocked: false },
  { id: 'water_bottle', category: 'Comfort & Wellness', name: 'Hydration Flask', cost: 4, description: 'Keeps water cold for 24h.', icon: 'flask', flavor: 'Stay hydrated.', unlocked: false },
  { id: 'tea_box', category: 'Comfort & Wellness', name: 'Herbal Tea', cost: 3, description: 'Calming chamomile blend.', icon: 'tea', flavor: 'Zen moments.', unlocked: false },
  { id: 'snack_bowl', category: 'Comfort & Wellness', name: 'Emergency Chocolate', cost: 3, description: 'Break glass in case of breakdown.', icon: 'bowl', flavor: 'Hidden drawer stash.', unlocked: false },
  { id: 'cushion', category: 'Comfort & Wellness', name: 'Ergo Cushion', cost: 5, description: 'Your back will thank you.', icon: 'cushion', flavor: 'Sit in luxury.', unlocked: false },
  { id: 'desk_fan', category: 'Comfort & Wellness', name: 'Mini Fan', cost: 3, description: 'For when the AC breaks.', icon: 'fan', flavor: 'Breezy.', unlocked: false },

  // Classroom Pets & Companions
  { id: 'goldfish', category: 'Pets & Companions', name: 'Class Goldfish', cost: 2, description: 'Named "Jaws".', icon: 'fish', flavor: 'Bubbles.', unlocked: false },
  { id: 'hamster', category: 'Pets & Companions', name: 'Hamster Habitat', cost: 5, description: 'Nocturnal scratching sounds.', icon: 'hamster', flavor: 'Escapes weekly.', unlocked: false },
  { id: 'rock_pet', category: 'Pets & Companions', name: 'Pet Rock', cost: 1, description: 'Low maintenance.', icon: 'rock', flavor: 'Solid companion.', unlocked: false },
  { id: 'cactus', category: 'Pets & Companions', name: 'Cactus', cost: 2, description: 'Prickly personality.', icon: 'cactus', flavor: 'Don\'t touch.', unlocked: false },
  { id: 'ant_farm', category: 'Pets & Companions', name: 'Ant Farm', cost: 4, description: 'Industry in motion.', icon: 'bug', flavor: 'Tunnel vision.', unlocked: false },
  { id: 'robo_dog', category: 'Pets & Companions', name: 'Robo-Pup', cost: 6, description: 'Barks in 8-bit.', icon: 'robot', flavor: 'No cleanup required.', unlocked: false },
  { id: 'tamagotchi', category: 'Pets & Companions', name: 'Digital Pet', cost: 3, description: 'Keep it alive.', icon: 'game', flavor: 'Beep beep.', unlocked: false },

  // Tech & Gadgets
  { id: 'tablet', category: 'Tech & Gadgets', name: 'Tablet', cost: 6, description: 'For grading apps.', icon: 'tablet', flavor: 'Screen time.', unlocked: false },
  { id: 'clicker', category: 'Tech & Gadgets', name: 'Slide Clicker', cost: 3, description: 'PowerPoint power.', icon: 'mouse', flavor: 'Next slide please.', unlocked: false },
  { id: 'laser_pointer', category: 'Tech & Gadgets', name: 'Laser Pointer', cost: 2, description: 'Point at things.', icon: 'laser', flavor: 'Cats love it.', unlocked: false },
  { id: 'headphones', category: 'Tech & Gadgets', name: 'Noise Cancelling', cost: 5, description: 'Silence the chaos.', icon: 'headphone', flavor: 'Blissful quiet.', unlocked: false },
  { id: 'usb_fan', category: 'Tech & Gadgets', name: 'RGB USB Hub', cost: 3, description: 'More ports, more lights.', icon: 'usb', flavor: 'Gamer aesthetic.', unlocked: false },
  { id: 'digital_timer', category: 'Tech & Gadgets', name: 'Big Red Timer', cost: 2, description: 'Visual countdown.', icon: 'timer', flavor: 'Time is money.', unlocked: false },
  { id: 'voice_amp', category: 'Tech & Gadgets', name: 'Voice Amp', cost: 4, description: 'Save your vocal cords.', icon: 'mic', flavor: 'Hear me now?', unlocked: false }
];

export function MEMO_POOL() {
  const roll = Math.random();
  
  if (roll < 0.15) {
    // 15% Chance for Crisis
    const item = CRISIS_EVENTS[Math.floor(Math.random() * CRISIS_EVENTS.length)];
    return { ...item, isCrisis: true };
  } else if (roll < 0.20) {
    // 5% Chance for Jackpot (0.15 to 0.20)
    const item = JACKPOT_EVENTS[Math.floor(Math.random() * JACKPOT_EVENTS.length)];
    return { ...item, flavor: "URGENT NOTICE: Special Administrative Action Required." };
  } else if (roll < 0.35) {
    // 15% Chance for Minor Boon (0.20 to 0.35)
    const item = MINOR_BOONS[Math.floor(Math.random() * MINOR_BOONS.length)];
    return { ...item, flavor: "Department Memo: Temporary policy adjustment effective immediately." };
  } else {
    // 65% Chance for Flavor
    const item = FLAVOR_MEMOS[Math.floor(Math.random() * FLAVOR_MEMOS.length)];
    return { 
      id: item.id || 'FLAVOR', 
      type: 'FLAVOR', 
      text: item.text, 
      description: item.description, 
      flavor: `To: All Staff\nRe: ${item.category.replace('-', ' ').toUpperCase()}`,
      category: item.category,
      tone: item.tone
    };
  }
}

export default { CRISIS_EVENTS, FLAVOR_MEMOS };
