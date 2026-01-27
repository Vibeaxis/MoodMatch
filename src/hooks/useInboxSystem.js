
import { useState, useEffect, useCallback } from 'react';

// --- Constants & Database ---

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
      { text: "My nose is bleeding everywhere.", urgency: "critical" },
      { text: "I think I'm gonna throw up.", urgency: "critical" },
      { text: "My tooth fell out and I swallowed it.", urgency: "high" },
      { text: "I have gum stuck in my hair.", urgency: "high" },
      { text: "I need a band-aid for a papercut.", urgency: "medium" },
      { text: "My hands are sticky.", urgency: "low" },
      { text: "Can I go to the bathroom?", urgency: "low" },
      { text: "My shoe is untied and wet.", urgency: "medium" },
      { text: "I spilled juice on my pants.", urgency: "high" },
      { text: "My eye is twitching weirdly.", urgency: "medium" },
      { text: "I got marker on my face.", urgency: "low" },
      { text: "My stomach makes weird noises.", urgency: "medium" },
      { text: "I feel dizzy.", urgency: "high" },
      { text: "My head hurts a lot.", urgency: "high" },
      { text: "I need a tissue.", urgency: "low" },
      { text: "There's dirt on my desk.", urgency: "low" },
      { text: "My water bottle leaked.", urgency: "medium" },
      { text: "I have a splinter.", urgency: "medium" },
      { text: "My ear itches inside.", urgency: "low" },
      { text: "I bit my tongue.", urgency: "medium" },
      { text: "My leg is asleep.", urgency: "low" },
      { text: "I smell something burning (it's my eraser).", urgency: "high" }
    ],
    CONFLICT: [
      { text: "He keeps looking at me.", urgency: "low" },
      { text: "She stole my favorite pencil.", urgency: "medium" },
      { text: "They are kicking my chair.", urgency: "medium" },
      { text: "He called me a 'poo-poo head'.", urgency: "medium" },
      { text: "She won't share the glue.", urgency: "low" },
      { text: "They are whispering about me.", urgency: "medium" },
      { text: "He threw an eraser at me.", urgency: "high" },
      { text: "She drew on my notebook.", urgency: "high" },
      { text: "He pushed me in line.", urgency: "high" },
      { text: "They won't let me play.", urgency: "medium" },
      { text: "She said my drawing is ugly.", urgency: "medium" },
      { text: "He is making fun of my shoes.", urgency: "medium" },
      { text: "She took my spot on the rug.", urgency: "low" },
      { text: "He is copying my work.", urgency: "high" },
      { text: "They are making faces at me.", urgency: "low" },
      { text: "She ripped my paper.", urgency: "high" },
      { text: "He is humming to annoy me.", urgency: "low" },
      { text: "She hid my backpack.", urgency: "high" },
      { text: "He poked me with a ruler.", urgency: "high" },
      { text: "They are hoarding the markers.", urgency: "medium" },
      { text: "She said she's not my friend anymore.", urgency: "medium" },
      { text: "He is breathing too loud.", urgency: "low" }
    ],
    ACADEMIC: [
      { text: "I don't understand anything.", urgency: "high" },
      { text: "My pencil broke again.", urgency: "low" },
      { text: "I lost my homework.", urgency: "medium" },
      { text: "Can you tie my shoe?", urgency: "low" },
      { text: "Is this for a grade?", urgency: "medium" },
      { text: "When is lunch?", urgency: "low" },
      { text: "Can I sharpen my pencil?", urgency: "low" },
      { text: "I finished. What now?", urgency: "medium" },
      { text: "My computer isn't working.", urgency: "high" },
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
      { text: "I forgot my login.", urgency: "high" },
      { text: "What page are we on?", urgency: "medium" }
    ],
    WEIRD: [
      { text: "My imaginary friend is sad.", urgency: "low" },
      { text: "The clock is looking at me.", urgency: "medium" },
      { text: "I think I can fly.", urgency: "high" },
      { text: "My dog ate my shoes.", urgency: "medium" },
      { text: "The floor is lava, really.", urgency: "medium" },
      { text: "Aliens took my homework.", urgency: "medium" },
      { text: "I can smell colors.", urgency: "medium" },
      { text: "My hands are turning into paws.", urgency: "high" },
      { text: "The lights are humming a song.", urgency: "low" },
      { text: "I forgot my own name.", urgency: "high" },
      { text: "There is a ghost in the bathroom.", urgency: "medium" },
      { text: "My shadow ran away.", urgency: "low" },
      { text: "Can I be a dinosaur today?", urgency: "low" }
    ]
  },
  BLUE_SLIPS: {
    HR: [
      { text: "Mandatory diversity training incomplete.", urgency: "high" },
      { text: "Payroll discrepancy notification.", urgency: "critical" },
      { text: "Update emergency contact info.", urgency: "medium" },
      { text: "Benefits enrollment period ending.", urgency: "high" },
      { text: "Submit time-off request forms.", urgency: "medium" },
      { text: "Annual performance review scheduled.", urgency: "high" },
      { text: "Missing tax documentation.", urgency: "critical" },
      { text: "Sign updated code of conduct.", urgency: "medium" },
      { text: "Complete wellness survey.", urgency: "low" },
      { text: "Verify certification status.", urgency: "high" },
      { text: "Submit sick leave justification.", urgency: "medium" },
      { text: "Acknowledge new dress code policy.", urgency: "low" },
      { text: "Review retirement plan options.", urgency: "low" },
      { text: "Staff photo day reminder.", urgency: "low" },
      { text: "Grievance filed against you.", urgency: "critical" }
    ],
    IT: [
      { text: "Smartboard software update required.", urgency: "medium" },
      { text: "Network maintenance scheduled.", urgency: "low" },
      { text: "Suspicious login attempt detected.", urgency: "critical" },
      { text: "Printer toner low (again).", urgency: "medium" },
      { text: "Submit laptop for re-imaging.", urgency: "high" },
      { text: "Email quota exceeded.", urgency: "high" },
      { text: "Projector bulb replacement denied.", urgency: "medium" },
      { text: "WiFi credentials expiring.", urgency: "high" },
      { text: "Firewall blocked educational site.", urgency: "medium" },
      { text: "Tablet cart inventory missing.", urgency: "high" },
      { text: "Software license audit pending.", urgency: "medium" },
      { text: "Phishing test failed.", urgency: "high" },
      { text: "Cable management violation.", urgency: "low" },
      { text: "Submit ticket for broken mouse.", urgency: "low" },
      { text: "System outage expected.", urgency: "high" }
    ],
    PETTY: [
      { text: "Stop using the 'good' stapler.", urgency: "low" },
      { text: "Someone ate my yogurt.", urgency: "medium" },
      { text: "Your class is too loud in halls.", urgency: "medium" },
      { text: "Return the borrowed scissors.", urgency: "medium" },
      { text: "Don't park in my spot.", urgency: "high" },
      { text: "Clean the microwave after use.", urgency: "medium" },
      { text: "Who left the coffee pot empty?", urgency: "high" },
      { text: "Stop sending students to nurse.", urgency: "medium" },
      { text: "Your bulletin board is crooked.", urgency: "low" },
      { text: "Submit lunch count on time.", urgency: "medium" },
      { text: "Don't use all the laminator film.", urgency: "high" },
      { text: "Your line spacing is incorrect.", urgency: "low" },
      { text: "Return the library cart.", urgency: "medium" },
      { text: "You didn't sign my birthday card.", urgency: "low" },
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

  const generateRequest = useCallback(() => {
    const isPink = Math.random() < 0.6; // 60% Pink, 40% Blue
    
    let type, category, template, studentName;

    if (isPink) {
      type = 'PINK_SLIPS';
      const categories = Object.keys(REQUEST_DATABASE.PINK_SLIPS);
      category = getRandomItem(categories);
      template = getRandomItem(REQUEST_DATABASE.PINK_SLIPS[category]);
      studentName = getRandomItem(STUDENT_NAMES);
    } else {
      type = 'BLUE_SLIPS';
      const categories = Object.keys(REQUEST_DATABASE.BLUE_SLIPS);
      category = getRandomItem(categories);
      template = getRandomItem(REQUEST_DATABASE.BLUE_SLIPS[category]);
      studentName = "Administration";
    }

    const impact = calculateImpact(template.urgency);

    return {
      id: Date.now() + Math.random(),
      type: isPink ? 'pink' : 'blue', // Using simple string for CSS classes
      category: category,
      text: template.text,
      urgency: template.urgency,
      student: studentName,
      timestamp: Date.now(),
      xpReward: impact.xp,
      moraleImpact: impact.morale
    };
  }, []);

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
