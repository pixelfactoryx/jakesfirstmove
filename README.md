# First step — Jake's days off

A small calendar app that suggests one **first step** for each of Jake’s days off (Wednesday and Friday). He works 8am–4pm Monday, Tuesday, and Thursday at Pixel; this app focuses on Mon–Fri and nudges him with a single, doable idea on free days.

## Run it

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## What it does

- **Week view** — Monday–Friday with time slots (6am–8pm).
- **Work blocks** — Mon, Tue, Thu 8–4 are shown as “Pixel” (grey).
- **Days off** — Wed and Fri show a random **first step** in the top slot (e.g. “Go for a 15 min walk”, “Text one friend”, “Read one chapter”).
- **Shuffle** — Click the ↻ on a first step to get a new suggestion for that day.
- **Navigation** — “Today” and ‹ › to move between weeks; mini calendar in the sidebar shows the current week.

First steps are light nudges, not a to‑do list — one idea per day off to help get moving.
