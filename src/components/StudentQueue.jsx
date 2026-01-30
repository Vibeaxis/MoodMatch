import React, { useState, useEffect } from 'react';
import './StudentQueue.css'; // We will make this next

const STUDENT_TYPES = ['🧍', '🧍‍♀️', '🚶', '🏃‍♀️', '🎒']; 

const StudentQueue = ({ onNextStudent }) => {
  // Generate a random line of 5 students
  const [queue, setQueue] = useState(() => 
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      sprite: STUDENT_TYPES[Math.floor(Math.random() * STUDENT_TYPES.length)],
      color: `hsl(${Math.random() * 360}, 70%, 80%)` // Random shirt color
    }))
  );

  const [isMoving, setIsMoving] = useState(false);

  // Call this function whenever you finish a folder in the main game!
  const advanceQueue = () => {
    setIsMoving(true);
    
    // Wait for the animation (500ms), then update the data
    setTimeout(() => {
      setQueue(prev => {
        const newStudent = {
          id: Date.now(),
          sprite: STUDENT_TYPES[Math.floor(Math.random() * STUDENT_TYPES.length)],
          color: `hsl(${Math.random() * 360}, 70%, 80%)`
        };
        // Remove the first one, add a new one at the end
        return [...prev.slice(1), newStudent];
      });
      setIsMoving(false);
    }, 500);
  };

  // Expose the advance function to parent (or use a prop trigger)
  // For now, let's just simulate it automatically on a prop change if you prefer
  useEffect(() => {
    if (onNextStudent) { 
        advanceQueue(); 
    }
  }, [onNextStudent]);

  return (
    <div className="hallway-container">
      <div className={`student-line ${isMoving ? 'walking' : 'idle'}`}>
        {queue.map((student, index) => (
          <div key={student.id} className="student-sprite">
            <div 
              className="student-body" 
              style={{ backgroundColor: student.color }}
            >
              {student.sprite}
            </div>
             {/* Simple shadow to ground them */}
            <div className="shadow"></div>
          </div>
        ))}
      </div>
      
      {/* The Door Frame (Overlay) */}
      <div className="door-frame">
        <div className="door-sign">OFFICE</div>
      </div>
    </div>
  );
};

export default StudentQueue;