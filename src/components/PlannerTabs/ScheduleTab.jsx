
import React from 'react';
import { 
  AlertTriangle, 
  Zap, 
  Star, 
  Coffee, 
  TrendingUp, 
  Eye, 
  Clock, 
  Users, 
  Check,
  CalendarDays
} from 'lucide-react';
import './ScheduleTab.css';

const EVENT_ICONS = {
  'CRISIS': AlertTriangle,
  'MODIFIER': Clock,
  'BOON': Zap,
  'JACKPOT': Star,
  'NORMAL': Coffee,
  'FLAVOR': Coffee
};

function ScheduleTab({ weeklySchedule, currentDayIndex, weekNumber }) {
  if (!weeklySchedule || weeklySchedule.length === 0) {
    return (
      <div className="schedule-tab-empty">
        <p>Schedule loading or unavailable...</p>
      </div>
    );
  }

  const getMechanicsTags = (day) => {
    const tags = [];
    const mechanics = day.event?.modifier || {};
    
    if (mechanics.xpMultiplier) tags.push(`XP x${mechanics.xpMultiplier}`);
    if (mechanics.blockType) tags.push(`${mechanics.blockType} Blocked`);
    if (mechanics.constraintMultiplier) tags.push(`Constraints x${mechanics.constraintMultiplier}`);
    if (mechanics.puzzlesRequired) tags.push(`${mechanics.puzzlesRequired}x Puzzles`);
    if (mechanics.gradeThresholdIncrease) tags.push(`Strict Grading`);
    if (mechanics.streakBreak) tags.push(`Fragile Streak`);
    
    // Check Boons/Jackpots which might not be in 'modifier' object
    if (day.type === 'BOON') tags.push('Bonus Effect');
    if (day.type === 'JACKPOT') tags.push('Legendary Effect');

    return tags;
  };

  return (
    <div className="schedule-tab">
      <div className="schedule-title">
        WEEK {weekNumber} OVERVIEW
      </div>

      <div className="schedule-grid planner-scrollbar">
        {weeklySchedule.map((day, index) => {
          const isPast = index < currentDayIndex;
          const isToday = index === currentDayIndex;
          const EventIcon = EVENT_ICONS[day.type] || Coffee;
          const mechanicsTags = getMechanicsTags(day);

          return (
            <div 
              key={day.day} 
              className={`schedule-card type-${day.type.toLowerCase()} ${isPast ? 'past' : ''} ${isToday ? 'today' : ''}`}
            >
              {isToday && <div className="schedule-badge">ACTIVE</div>}
              {isPast && (
                <div className="schedule-checkmark">
                  <Check size={16} strokeWidth={4} />
                </div>
              )}

              <div className="schedule-day-header">
                <span className="schedule-day-name">{day.day}</span>
                <span className="schedule-event-type">{day.type.replace('_', ' ')}</span>
              </div>

              <div className="schedule-event-content">
                <div className="schedule-event-header">
                  <div className="schedule-icon-wrapper">
                    <EventIcon size={20} />
                  </div>
                  <span className="schedule-event-name">{day.event?.name || day.event?.text || 'Standard Day'}</span>
                </div>
                
                <p className="schedule-description">
                  {day.event?.description || day.event?.flavor || "No special events scheduled."}
                </p>

                {mechanicsTags.length > 0 && (
                  <div className="mechanics-row">
                    {mechanicsTags.map((tag, i) => (
                      <span key={i} className="mechanic-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="schedule-footer">
        <p className="schedule-tip">
          <CalendarDays className="inline w-4 h-4 mr-1 mb-1" />
          <strong>Pro Tip:</strong> Wednesdays are notoriously chaotic, while Fridays often bring rewards. Plan your supplies accordingly!
        </p>
      </div>
    </div>
  );
}

export default ScheduleTab;
