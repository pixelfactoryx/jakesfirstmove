import { useState, useMemo, useEffect } from 'react';
import { getMonday, getWeekDates } from './utils/calendar';
import { getRandomPlaybookItem, getPlaybookItemById } from './data/playbook';
import { loadState, saveState } from './utils/storage';
import Sidebar from './components/Sidebar';
import CalendarGrid from './components/CalendarGrid';
import './App.css';

function buildInitialSteps(weekDates) {
  const byDay = {};
  weekDates.forEach((day) => {
    if (day.isDayOff) {
      const key = `${day.dayName}-${day.dayNum}`;
      byDay[key] = getRandomPlaybookItem();
    }
  });
  return byDay;
}

function rehydrateFirstSteps(weekDates, storedIds) {
  const byDay = {};
  weekDates.forEach((day) => {
    if (!day.isDayOff) return;
    const key = `${day.dayName}-${day.dayNum}`;
    const id = storedIds[key];
    const item = id != null ? getPlaybookItemById(Number(id)) : null;
    byDay[key] = item || getRandomPlaybookItem();
  });
  return byDay;
}

function getInitialState(weekDates) {
  const stored = loadState();
  if (!stored) {
    return {
      firstStepsByDay: buildInitialSteps(weekDates),
      completedSubItems: {},
    };
  }
  const firstStepsByDay = rehydrateFirstSteps(
    weekDates,
    stored.firstStepsByDay || {}
  );
  const completedSubItems =
    stored.completedSubItems && typeof stored.completedSubItems === 'object'
      ? stored.completedSubItems
      : {};
  return { firstStepsByDay, completedSubItems };
}

const initialWeekDates = getWeekDates(getMonday(new Date()));
const { firstStepsByDay: initialSteps, completedSubItems: initialCompleted } =
  getInitialState(initialWeekDates);

function App() {
  const today = useMemo(() => new Date(), []);
  const [weekStart, setWeekStart] = useState(() => getMonday(today));
  const weekDates = useMemo(() => getWeekDates(weekStart), [weekStart]);
  const [firstStepsByDay, setFirstStepsByDay] = useState(() => initialSteps);
  const [completedSubItems, setCompletedSubItems] = useState(
    () => initialCompleted
  );

  useEffect(() => {
    setFirstStepsByDay((prev) => {
      const next = { ...prev };
      weekDates.forEach((day) => {
        if (day.isDayOff) {
          const key = `${day.dayName}-${day.dayNum}`;
          if (!next[key]) next[key] = getRandomPlaybookItem();
        }
      });
      return next;
    });
  }, [weekStart]);

  useEffect(() => {
    saveState({
      firstStepsByDay: Object.fromEntries(
        Object.entries(firstStepsByDay).map(([k, v]) => [k, v.id])
      ),
      completedSubItems,
    });
  }, [firstStepsByDay, completedSubItems]);

  const goToToday = () => setWeekStart(getMonday(new Date()));

  const regenerateStep = (day) => {
    const dayKey = `${day.dayName}-${day.dayNum}`;
    const current = firstStepsByDay[dayKey];
    setFirstStepsByDay((prev) => ({
      ...prev,
      [dayKey]: getRandomPlaybookItem(current ? [current.id] : undefined),
    }));
    setCompletedSubItems((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${dayKey}-`)) delete next[k];
      });
      return next;
    });
  };

  const toggleSubItem = (dayKey, taskId, subIndex) => {
    const key = `${dayKey}-${taskId}`;
    setCompletedSubItems((prev) => {
      const arr = prev[key] || [];
      const set = new Set(arr);
      if (set.has(subIndex)) set.delete(subIndex);
      else set.add(subIndex);
      const nextArr = [...set].sort((a, b) => a - b);
      const next = { ...prev };
      if (nextArr.length === 0) delete next[key];
      else next[key] = nextArr;
      return next;
    });
  };

  const getCompletedIndices = (dayKey, taskId) => {
    return completedSubItems[`${dayKey}-${taskId}`] || [];
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">First step</h1>
        <p className="app-subtitle">Jake’s Momentum Playbook — pick one, do it before 10am</p>
      </header>
      <div className="app-main">
        <Sidebar
          weekStart={weekStart}
          onWeekChange={setWeekStart}
          onToday={goToToday}
          today={today}
        />
        <CalendarGrid
          weekDates={weekDates}
          firstStepsByDay={firstStepsByDay}
          completedSubItems={completedSubItems}
          getCompletedIndices={getCompletedIndices}
          onRegenerate={regenerateStep}
          onToggleSubItem={toggleSubItem}
        />
      </div>
    </div>
  );
}

export default App;
