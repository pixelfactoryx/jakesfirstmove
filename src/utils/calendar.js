const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Jake works 8–4 Mon, Tue, Thu at Pixel. Wed & Fri are days off (Mon–Fri scope).
const WORK_DAYS = [1, 2, 4]; // Monday=1, Tuesday=2, Thursday=4
const WORK_START = 8;
const WORK_END = 16;

export function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function getWeekDates(weekStartMonday) {
  const dates = [];
  const start = new Date(weekStartMonday);
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < 5; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dayOfWeek = d.getDay();
    const isWorkDay = WORK_DAYS.includes(dayOfWeek);
    dates.push({
      date: d,
      dayName: DAY_NAMES[dayOfWeek],
      dayNum: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      isWorkDay,
      isDayOff: !isWorkDay,
    });
  }
  return dates;
}

export function isWorkHour(dayOfWeek, hour) {
  if (!WORK_DAYS.includes(dayOfWeek)) return false;
  return hour >= WORK_START && hour < WORK_END;
}

export function formatMonthYear(date) {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDayKey(date) {
  const d = new Date(date);
  return `${DAY_NAMES[d.getDay()]}-${d.getDate()}`;
}

export function addWeeks(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n * 7);
  return d;
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getTimeSlots(startHour = 6, endHour = 20) {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    const label = h === 0 ? '12 am' : h < 12 ? `${h} am` : h === 12 ? '12 pm' : `${h - 12} pm`;
    slots.push({ hour: h, label });
  }
  return slots;
}

// First-step block on days off: first 4–5 hours to encourage getting out early
export const FIRST_STEP_START_HOUR = 6;
export const FIRST_STEP_SPAN_HOURS = 5;

export { DAY_NAMES, WORK_START, WORK_END, WORK_DAYS };
