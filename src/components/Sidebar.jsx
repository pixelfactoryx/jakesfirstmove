import {
  getWeekDates,
  addWeeks,
  formatMonthYear,
  isSameDay,
} from '../utils/calendar';
import { DAY_NAMES } from '../utils/calendar';

export default function Sidebar({
  weekStart,
  onWeekChange,
  onToday,
  today,
}) {
  const weekDates = getWeekDates(weekStart);

  return (
    <aside className="sidebar">
      <button type="button" className="btn-today" onClick={onToday}>
        Today
      </button>
      <div className="week-nav">
        <button
          type="button"
          className="btn-nav"
          onClick={() => onWeekChange(addWeeks(weekStart, -1))}
          aria-label="Previous week"
        >
          ‹
        </button>
        <span className="week-label">{formatMonthYear(weekStart)}</span>
        <button
          type="button"
          className="btn-nav"
          onClick={() => onWeekChange(addWeeks(weekStart, 1))}
          aria-label="Next week"
        >
          ›
        </button>
      </div>
      <div className="mini-calendar">
        <div className="mini-cal-header">
          {DAY_NAMES.slice(1, 6).map((d) => (
            <span key={d} className="mini-day-name">{d.slice(0, 2)}</span>
          ))}
        </div>
        <div className="mini-cal-grid">
          {weekDates.map((day) => {
            const todayCell = isSameDay(day.date, today);
            return (
              <div
                key={day.date.toISOString()}
                className={`mini-day ${todayCell ? 'today' : ''} ${day.isDayOff ? 'day-off' : ''}`}
              >
                {day.dayNum}
              </div>
            );
          })}
        </div>
      </div>
      <div className="legend">
        <div className="legend-item work">
          <span className="legend-dot" /> Pixel (Mon, Tue, Thu 8–4)
        </div>
        <div className="legend-item off">
          <span className="legend-dot" /> Day off — first step
        </div>
      </div>
      <p className="sidebar-hint">
        First steps are random each time. Use them as a nudge, not a to‑do.
      </p>
    </aside>
  );
}
