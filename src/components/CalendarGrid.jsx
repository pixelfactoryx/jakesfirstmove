import {
  getTimeSlots,
  isWorkHour,
  FIRST_STEP_START_HOUR,
  FIRST_STEP_SPAN_HOURS,
} from '../utils/calendar';
import FirstStepCard from './FirstStepCard';

const SLOT_HEIGHT = 48;
const HOURS_START = 6;
const HOURS_END = 20;

function isInFirstStepRange(hour) {
  return (
    hour >= FIRST_STEP_START_HOUR &&
    hour < FIRST_STEP_START_HOUR + FIRST_STEP_SPAN_HOURS
  );
}

export default function CalendarGrid({
  weekDates,
  firstStepsByDay,
  getCompletedIndices,
  onRegenerate,
  onToggleSubItem,
}) {
  const slots = getTimeSlots(HOURS_START, HOURS_END);
  const firstStepBlockHeight = FIRST_STEP_SPAN_HOURS * SLOT_HEIGHT;

  return (
    <div className="calendar-wrapper">
      <div className="calendar-scroll">
        <div className="calendar-grid">
          <div className="grid-header">
            <div className="time-col-header" />
            {weekDates.map((day) => (
              <div
                key={`${day.date.toISOString()}`}
                className={`day-col-header ${day.isDayOff ? 'day-off' : ''}`}
              >
                <span className="day-name">{day.dayName}</span>
                <span className="day-num">{day.dayNum}</span>
              </div>
            ))}
          </div>
          <div className="grid-body">
            <div className="time-col">
              {slots.map(({ hour, label }) => (
                <div
                  key={hour}
                  className="time-slot"
                  style={{ height: SLOT_HEIGHT }}
                >
                  {label}
                </div>
              ))}
            </div>
            {weekDates.map((day) => (
              <div key={day.date.toISOString()} className="day-col">
                {slots.map(({ hour }) => {
                  const isWork = isWorkHour(day.date.getDay(), hour);
                  const isFirstStepSlot =
                    day.isDayOff && hour === FIRST_STEP_START_HOUR;
                  const isFirstStepContinuation =
                    day.isDayOff &&
                    isInFirstStepRange(hour) &&
                    hour > FIRST_STEP_START_HOUR;
                  const firstStep = isFirstStepSlot
                    ? firstStepsByDay[`${day.dayName}-${day.dayNum}`]
                    : null;
                  const dayKey = firstStep
                    ? `${day.dayName}-${day.dayNum}`
                    : null;
                  const completedIndices =
                    firstStep && dayKey
                      ? getCompletedIndices(dayKey, firstStep.id)
                      : [];

                  return (
                    <div
                      key={hour}
                      className={`cell ${isWork ? 'work' : ''} ${
                        firstStep ? 'first-step-anchor' : ''
                      } ${isFirstStepContinuation ? 'first-step-continuation' : ''}`}
                      style={{ height: SLOT_HEIGHT }}
                    >
                      {firstStep && (
                        <div
                          className="first-step-block first-step-block--span"
                          style={{ height: firstStepBlockHeight }}
                        >
                          <span className="first-step-label">
                            First step · 6–11am
                          </span>
                          <FirstStepCard
                            task={firstStep}
                            dayKey={dayKey}
                            completedIndices={completedIndices}
                            onToggleSubItem={onToggleSubItem}
                            onRegenerate={() => onRegenerate(day)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
