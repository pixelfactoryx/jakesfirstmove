import { useState } from 'react';

export default function FirstStepCard({
  task,
  dayKey,
  completedIndices = [],
  onToggleSubItem,
  onRegenerate,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = task.subItems.length;
  const completed = completedIndices.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleHeaderClick = () => {
    setIsExpanded((e) => !e);
  };

  const handleToggle = (e, index) => {
    e.stopPropagation();
    onToggleSubItem(dayKey, task.id, index);
  };

  return (
    <div className="first-step-card">
      <button
        type="button"
        className="first-step-card__header"
        onClick={handleHeaderClick}
        aria-expanded={isExpanded}
      >
        <span className="first-step-card__title">{task.title}</span>
        <span className="first-step-card__meta">
          {task.category.replace(/\s+/g, ' · ')}
        </span>
        <div className="first-step-card__progress-wrap">
          <div className="first-step-card__progress-track">
            <div
              className="first-step-card__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="first-step-card__progress-text">
            {completed}/{total}
          </span>
        </div>
        <span className="first-step-card__chevron" aria-hidden>
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>
      {isExpanded && (
        <div className="first-step-card__body">
          {task.description && (
            <p className="first-step-card__description">{task.description}</p>
          )}
          <ul className="first-step-card__list">
            {task.subItems.map((label, index) => {
              const isChecked = completedIndices.includes(index);
              return (
                <li key={index} className="first-step-card__item">
                  <label className="first-step-card__label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleToggle(e, index)}
                      onClick={(e) => e.stopPropagation()}
                      className="first-step-card__checkbox"
                    />
                    <span
                      className={`first-step-card__label-text ${isChecked ? 'is-done' : ''}`}
                    >
                      {label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="first-step-card__actions">
            <button
              type="button"
              className="btn-shuffle"
              onClick={(e) => {
                e.stopPropagation();
                onRegenerate();
              }}
              title="Get another idea"
            >
              ↻ New idea
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
