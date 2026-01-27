
import { useState, useEffect, useCallback } from 'react';

// --- Constants & Database ---
// --- Narrative Sequels & Event Chains ---
// These are the "Next Steps" that requests point to.

const NARRATIVE_SEQUELS = {
  // === THE MEDICAL ARC (Shared by Hygiene requests) ===
  MED_WAITING_ROOM: {
    text: "The nurse is out to lunch. Can I just lie on the cold floor for a bit?",
    urgency: "medium",
    category: "HYGIENE",
    type: "pink",
    nextStep: "MED_MIRACLE"
  },
  MED_MIRACLE: {
    text: "The cold floor healed me. I am spiritually renewed.",
    urgency: "low",
    category: "HYGIENE",
    type: "pink",
    xpReward: 30,
    moraleImpact: 10
  },

  // === THE PETTY WAR ARC (Shared by Conflict/Petty requests) ===
  CONFLICT_ESCALATION: {
    text: "The situation has escalated. We are now building a fort out of textbooks.",
    urgency: "high",
    category: "CONFLICT",
    type: "pink", // Student elevating the issue
    nextStep: "CONFLICT_TRUCE"
  },
  CONFLICT_TRUCE: {
    text: "Peace treaty signed. We agreed to share the item on alternate Tuesdays.",
    urgency: "low",
    category: "CONFLICT",
    type: "blue", // Admin resolution
    xpReward: 50
  },

  // === THE "GLITCH" ARC (Shared by Weird requests) ===
  REALITY_CHECK: {
    text: "Actually, nevermind. The walls stopped breathing. We're good.",
    urgency: "low",
    category: "WEIRD",
    type: "pink",
    xpReward: 10
  },
  DINO_TRANSFORMATION: {
    text: "ROAR. (Translation: I cannot complete the assignment because my arms are too short.)",
    urgency: "medium",
    category: "WEIRD",
    type: "pink",
    xpReward: 100 // Big reward for indulging the madness
  },

  // === THE IT/ADMIN LOOP ===
  TICKET_SUBMISSION: {
    text: "To fix this, please submit Ticket #404 to authorize Ticket #405.",
    urgency: "medium",
    category: "IT",
    type: "blue",
    nextStep: "TICKET_VOID"
  },
  TICKET_VOID: {
    text: "Ticket #404 denied. Reason: Form was filled out in the wrong shade of black ink.",
    urgency: "critical",
    category: "HR",
    type: "blue",
    moraleImpact: -20 // The pain of bureaucracy
  },

  // === GENERIC RESOLUTIONS ===
  SILENT_RESOLVE: {
    text: "Update: Problem solved itself. I found it in my other pocket.",
    urgency: "low",
    category: "ACADEMIC",
    type: "pink",
    xpReward: 5
  },
  GHOST_FRIEND: {
    text: "The ghost says 'Hi' and fixed the leaking faucet. He's actually chill.",
    urgency: "low",
    category: "WEIRD",
    type: "pink",
    xpReward: 40
  }
};
const STUDENT_NAMES = [
  "Liam Smith", "Noah Johnson", "Oliver Williams", "Elijah Brown", 
  "James Jones", "William Garcia", "Benjamin Miller", "Lucas Davis", 
  "Henry Rodriguez", "Theodore Martinez", "Emma Hernandez", "Charlotte Lopez", 
  "Amelia Gonzalez", "Sophia Wilson", "Isabella Anderson", "Ava Thomas", 
  "Mia Taylor", "Evelyn Moore", "Luna Jackson", "Harper Martin"
];
const REQUEST_DATABASE = {
  PINK_SLIPS: {
    HYGIENE: [
      { text: "My nose is bleeding everywhere.", urgency: "critical", nextStep: "MED_WAITING_ROOM" },
      { text: "I think I'm gonna throw up.", urgency: "critical", nextStep: "MED_WAITING_ROOM" },
      { text: "My tooth fell out and I swallowed it.", urgency: "high", nextStep: "MED_WAITING_ROOM" },
      { text: "I have gum stuck in my hair.", urgency: "high", nextStep: "MED_WAITING_ROOM" },
      { text: "I need a band-aid for a papercut.", urgency: "medium", nextStep: "SILENT_RESOLVE" },
      { text: "My hands are sticky.", urgency: "low" },
      { text: "Can I go to the bathroom?", urgency: "low" },
      { text: "My shoe is untied and wet.", urgency: "medium" },
      { text: "I spilled juice on my pants.", urgency: "high" },
      { text: "My eye is twitching weirdly.", urgency: "medium", nextStep: "MED_WAITING_ROOM" },
      { text: "I got marker on my face.", urgency: "low" },
      { text: "My stomach makes weird noises.", urgency: "medium", nextStep: "MED_WAITING_ROOM" },
      { text: "I feel dizzy.", urgency: "high", nextStep: "MED_WAITING_ROOM" },
      { text: "My head hurts a lot.", urgency: "high", nextStep: "MED_WAITING_ROOM" },
      { text: "I need a tissue.", urgency: "low", nextStep: "SILENT_RESOLVE" },
      { text: "There's dirt on my desk.", urgency: "low" },
      { text: "My water bottle leaked.", urgency: "medium" },
      { text: "I have a splinter.", urgency: "medium" },
      { text: "My ear itches inside.", urgency: "low" },
      { text: "I bit my tongue.", urgency: "medium" },
      { text: "My leg is asleep.", urgency: "low" },
      { text: "I smell something burning (it's my eraser).", urgency: "high", nextStep: "CONFLICT_ESCALATION" }
    ],
    CONFLICT: [
      { text: "He keeps looking at me.", urgency: "low" },
      { text: "She stole my favorite pencil.", urgency: "medium", nextStep: "CONFLICT_ESCALATION" },
      { text: "They are kicking my chair.", urgency: "medium", nextStep: "CONFLICT_ESCALATION" },
      { text: "He called me a 'poo-poo head'.", urgency: "medium" },
      { text: "She won't share the glue.", urgency: "low", nextStep: "CONFLICT_ESCALATION" },
      { text: "They are whispering about me.", urgency: "medium" },
      { text: "He threw an eraser at me.", urgency: "high", nextStep: "CONFLICT_ESCALATION" },
      { text: "She drew on my notebook.", urgency: "high" },
      { text: "He pushed me in line.", urgency: "high" },
      { text: "They won't let me play.", urgency: "medium" },
      { text: "She said my drawing is ugly.", urgency: "medium" },
      { text: "He is making fun of my shoes.", urgency: "medium" },
      { text: "She took my spot on the rug.", urgency: "low", nextStep: "CONFLICT_ESCALATION" },
      { text: "He is copying my work.", urgency: "high" },
      { text: "They are making faces at me.", urgency: "low" },
      { text: "She ripped my paper.", urgency: "high" },
      { text: "He is humming to annoy me.", urgency: "low" },
      { text: "She hid my backpack.", urgency: "high", nextStep: "CONFLICT_ESCALATION" },
      { text: "He poked me with a ruler.", urgency: "high" },
      { text: "They are hoarding the markers.", urgency: "medium", nextStep: "CONFLICT_ESCALATION" },
      { text: "She said she's not my friend anymore.", urgency: "medium" },
      { text: "He is breathing too loud.", urgency: "low" }
    ],
    ACADEMIC: [
      { text: "I don't understand anything.", urgency: "high" },
      { text: "My pencil broke again.", urgency: "low", nextStep: "SILENT_RESOLVE" },
      { text: "I lost my homework.", urgency: "medium", nextStep: "SILENT_RESOLVE" },
      { text: "Can you tie my shoe?", urgency: "low" },
      { text: "Is this for a grade?", urgency: "medium" },
      { text: "When is lunch?", urgency: "low" },
      { text: "Can I sharpen my pencil?", urgency: "low" },
      { text: "I finished. What now?", urgency: "medium" },
      { text: "My computer isn't working.", urgency: "high", nextStep: "TICKET_SUBMISSION" },
      { text: "I left my book at home.", urgency: "medium" },
      { text: "Can I work with a partner?", urgency: "low" },
      { text: "Do we have to write in cursive?", urgency: "low" },
      { text: "I can't read this word.", urgency: "low" },
      { text: "My glue stick is dried out.", urgency: "low" },
      { text: "I need more paper.", urgency: "low" },
      { text: "How do you spell 'the'?", urgency: "medium" },
      { text: "Can I draw instead?", urgency: "low" },
      { text: "This is too hard.", urgency: "high" },
      { text: "My eraser doesn't erase.", urgency: "low" },
      { text: "Can I read a book?", urgency: "low" },
      { text: "I forgot my login.", urgency: "high", nextStep: "TICKET_SUBMISSION" },
      { text: "What page are we on?", urgency: "medium" }
    ],
    WEIRD: [
      { text: "My imaginary friend is sad.", urgency: "low", nextStep: "REALITY_CHECK" },
      { text: "The clock is looking at me.", urgency: "medium", nextStep: "REALITY_CHECK" },
      { text: "I think I can fly.", urgency: "high", nextStep: "REALITY_CHECK" },
      { text: "My dog ate my shoes.", urgency: "medium" },
      { text: "The floor is lava, really.", urgency: "medium", nextStep: "CONFLICT_ESCALATION" },
      { text: "Aliens took my homework.", urgency: "medium", nextStep: "SILENT_RESOLVE" },
      { text: "I can smell colors.", urgency: "medium", nextStep: "REALITY_CHECK" },
      { text: "My hands are turning into paws.", urgency: "high", nextStep: "DINO_TRANSFORMATION" },
      { text: "The lights are humming a song.", urgency: "low" },
      { text: "I forgot my own name.", urgency: "high", nextStep: "TICKET_SUBMISSION" },
      { text: "There is a ghost in the bathroom.", urgency: "medium", nextStep: "GHOST_FRIEND" },
      { text: "My shadow ran away.", urgency: "low", nextStep: "REALITY_CHECK" },
      { text: "Can I be a dinosaur today?", urgency: "low", nextStep: "DINO_TRANSFORMATION" }
    ]
  },
  BLUE_SLIPS: {
    HR: [
      { text: "Mandatory diversity training incomplete.", urgency: "high", nextStep: "TICKET_SUBMISSION" },
      { text: "Payroll discrepancy notification.", urgency: "critical", nextStep: "TICKET_SUBMISSION" },
      { text: "Update emergency contact info.", urgency: "medium" },
      { text: "Benefits enrollment period ending.", urgency: "high" },
      { text: "Submit time-off request forms.", urgency: "medium", nextStep: "TICKET_VOID" },
      { text: "Annual performance review scheduled.", urgency: "high" },
      { text: "Missing tax documentation.", urgency: "critical", nextStep: "TICKET_VOID" },
      { text: "Sign updated code of conduct.", urgency: "medium" },
      { text: "Complete wellness survey.", urgency: "low" },
      { text: "Verify certification status.", urgency: "high" },
      { text: "Submit sick leave justification.", urgency: "medium", nextStep: "MED_WAITING_ROOM" },
      { text: "Acknowledge new dress code policy.", urgency: "low" },
      { text: "Review retirement plan options.", urgency: "low" },
      { text: "Staff photo day reminder.", urgency: "low" },
      { text: "Grievance filed against you.", urgency: "critical", nextStep: "CONFLICT_TRUCE" }
    ],
    IT: [
      { text: "Smartboard software update required.", urgency: "medium", nextStep: "TICKET_SUBMISSION" },
      { text: "Network maintenance scheduled.", urgency: "low" },
      { text: "Suspicious login attempt detected.", urgency: "critical", nextStep: "TICKET_VOID" },
      { text: "Printer toner low (again).", urgency: "medium", nextStep: "TICKET_SUBMISSION" },
      { text: "Submit laptop for re-imaging.", urgency: "high" },
      { text: "Email quota exceeded.", urgency: "high" },
      { text: "Projector bulb replacement denied.", urgency: "medium", nextStep: "CONFLICT_ESCALATION" }, // Fighting IT
      { text: "WiFi credentials expiring.", urgency: "high" },
      { text: "Firewall blocked educational site.", urgency: "medium", nextStep: "TICKET_VOID" },
      { text: "Tablet cart inventory missing.", urgency: "high" },
      { text: "Software license audit pending.", urgency: "medium" },
      { text: "Phishing test failed.", urgency: "high", nextStep: "TICKET_SUBMISSION" },
      { text: "Cable management violation.", urgency: "low" },
      { text: "Submit ticket for broken mouse.", urgency: "low", nextStep: "TICKET_VOID" },
      { text: "System outage expected.", urgency: "high" }
    ],
    PETTY: [
      { text: "Stop using the 'good' stapler.", urgency: "low", nextStep: "CONFLICT_ESCALATION" },
      { text: "Someone ate my yogurt.", urgency: "medium", nextStep: "CONFLICT_ESCALATION" },
      { text: "Your class is too loud in halls.", urgency: "medium" },
      { text: "Return the borrowed scissors.", urgency: "medium", nextStep: "SILENT_RESOLVE" },
      { text: "Don't park in my spot.", urgency: "high", nextStep: "CONFLICT_ESCALATION" },
      { text: "Clean the microwave after use.", urgency: "medium" },
      { text: "Who left the coffee pot empty?", urgency: "high", nextStep: "CONFLICT_ESCALATION" },
      { text: "Stop sending students to nurse.", urgency: "medium" },
      { text: "Your bulletin board is crooked.", urgency: "low" },
      { text: "Submit lunch count on time.", urgency: "medium" },
      { text: "Don't use all the laminator film.", urgency: "high", nextStep: "CONFLICT_ESCALATION" },
      { text: "Your line spacing is incorrect.", urgency: "low" },
      { text: "Return the library cart.", urgency: "medium" },
      { text: "You didn't sign my birthday card.", urgency: "low", nextStep: "CONFLICT_ESCALATION" }, // Petty revenge
      { text: "Stop whistling in the lounge.", urgency: "low" }
    ]
  }
};

// --- Helper Functions ---

const calculateImpact = (urgency) => {
  switch (urgency) {
    case 'critical': return { xp: -50, morale: -30 }; // Or range -50 to -40
    case 'high': return { xp: -25, morale: -15 };
    case 'medium': return { xp: -10, morale: -5 };
    case 'low': return { xp: 0, morale: 0 };
    default: return { xp: 0, morale: 0 };
  }
};

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// --- Hook Implementation ---
export const useInboxSystem = () => {
  const [requests, setRequests] = useState([]);
  const [isToppled, setIsToppled] = useState(false);
  // Tracks: { "Liam Smith": "RESEARCH_2" }
  const [pendingChains, setPendingChains] = useState({}); 

  const generateRequest = useCallback(() => {
    // 1. Check for a story follow-up first
    const chainStudents = Object.keys(pendingChains);
    if (chainStudents.length > 0 && Math.random() > 0.4) {
      const studentName = chainStudents[0];
      const nextStepId = pendingChains[studentName];
      const stepData = NARRATIVE_DATABASE[nextStepId];

      // Remove from pending so it doesn't duplicate
      setPendingChains(prev => {
        const next = { ...prev };
        delete next[studentName];
        return next;
      });

      return {
        id: Date.now() + Math.random(),
        type: stepData.type, // 'pink' or 'blue'
        category: stepData.category,
        text: stepData.text,
        urgency: stepData.urgency,
        student: studentName,
        timestamp: Date.now(),
        xpReward: stepData.xpReward || 0,
        nextStep: stepData.nextStep || null // Link to the next part
      };
    }

    // 2. Default Random Logic (Your existing code)
    const isPink = Math.random() < 0.6;
    let type, category, template, studentName;

    if (isPink) {
      type = 'PINK_SLIPS';
      category = getRandomItem(Object.keys(REQUEST_DATABASE.PINK_SLIPS));
      template = getRandomItem(REQUEST_DATABASE.PINK_SLIPS[category]);
      studentName = getRandomItem(STUDENT_NAMES);
    } else {
      type = 'BLUE_SLIPS';
      category = getRandomItem(Object.keys(REQUEST_DATABASE.BLUE_SLIPS));
      template = getRandomItem(REQUEST_DATABASE.BLUE_SLIPS[category]);
      studentName = "Administration";
    }

    return {
      id: Date.now() + Math.random(),
      type: isPink ? 'pink' : 'blue',
      category: category,
      text: template.text,
      urgency: template.urgency,
      student: studentName,
      timestamp: Date.now(),
      xpReward: calculateImpact(template.urgency).xp,
      nextStep: template.nextStep || null // Starters need a nextStep key
    };
  }, [pendingChains]);

  // Spawn loop
  useEffect(() => {
    // Initial request
    if (requests.length === 0) {
      const timer = setTimeout(() => {
         setRequests([generateRequest()]);
      }, 12000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      if (requests.length < 8 && !isToppled) {
        // 40% chance to spawn a request every check interval
        if (Math.random() > 0.6) {
           setRequests(prev => [...prev, generateRequest()]);
        }
      }
    }, 8000); // Check every 8s

    return () => clearInterval(interval);
  }, [requests.length, isToppled, generateRequest]);

 const handleApprove = (id) => {
    const req = requests.find(r => r.id === id);
    
    if (req?.nextStep) {
      setPendingChains(prev => ({
        ...prev,
        [req.student]: req.nextStep
      }));
    }

    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleDeny = (id) => {
    // Denying usually kills the chain, making choices matter.
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleDeny = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleTopple = () => {
    setIsToppled(true);
    setTimeout(() => {
      setRequests([]);
      setIsToppled(false);
    }, 1000);
  };

  return { requests, isToppled, handleApprove, handleDeny, handleTopple };
};
