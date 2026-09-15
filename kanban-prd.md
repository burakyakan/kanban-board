# Product Requirements Document (PRD): Kanban Task Management App

## 1. Overview

Build a Kanban-style task management app (boards → columns → tasks → subtasks) with drag-and-drop, theme switching, and responsive layouts, based on the widely-used [Frontend Mentor Kanban challenge](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Unlike a pure frontend build, this version persists data to a real hosted database instead of `localStorage`, and is deployed live rather than run only on `localhost`.

The point of this project isn't the Kanban app itself — it's a vehicle for practicing the skills around building one: non-trivial React state management, working against a real (if minimal) backend, and the full deploy pipeline. Treat the finished app as a portfolio piece, not a throwaway exercise.

## 2. Goals

- Practice component architecture and state management beyond `useState` (reducer/context patterns) on something with real nested state (boards → columns → tasks → subtasks).
- Get hands-on with calling a real API from React — loading states, error states, environment variables — instead of only ever hitting local mock data.
- Go through an actual deploy pipeline for both a frontend and a backend service, including the small annoyances (CORS, env vars, cold starts) that tutorials skip.
- Ship something they can put a live link to on a resume/portfolio.

## 3. Non-goals

- This is **not** a full backend engineering exercise. The API is intentionally minimal (see §5.2) so the project stays achievable regardless of the intern's backend background.
- No authentication/multi-user support in the base scope (single shared board state is fine — see Stretch Goals for multi-user).
- No automated test suite requirement in the base scope (can be a stretch goal).

## 4. Scope

### In scope

- A single Kanban board with multiple columns (e.g. Todo / Doing / Done, configurable) and draggable task cards.
- Full CRUD on boards, columns, tasks, and subtasks, done entirely in the frontend's own state.
- Light/dark theme toggle.
- Responsive layout across mobile, tablet, and desktop.
- Persisting board state to a real database via a minimal backend API, instead of `localStorage`.
- Live deployment of both frontend and backend.

### Out of scope (unless time allows — see Stretch Goals)

- Multiple simultaneous users / accounts / auth.
- Real-time sync between multiple open tabs/clients.
- A fully resource-based REST API (separate endpoints per board/column/task).
- Automated tests, CI pipeline.

## 5. Functional Requirements

### 5.1 Frontend (React)

**Board view**

- Display a board's columns side by side, each showing its task cards.
- Each column shows a task count indicator.
- Task cards show the title and a subtask completion indicator (e.g. "3 of 5 subtasks").
- Sidebar (collapsible) lists all boards and lets the user switch between them or create a new one.

**Drag and drop**

- Task cards can be dragged between columns to change status.
- Reordering within a column should also work (stretch: persist order, not just column membership).
- Use a maintained library rather than hand-rolling drag events — `@hello-pangea/dnd` (maintained fork of `react-beautiful-dnd`) or `dnd-kit` are both reasonable choices; `dnd-kit` is more actively maintained as of 2026.

**Modals**

- Add/Edit Board: name, list of columns (add/remove/rename columns).
- Add/Edit Task: title, description, list of subtasks (add/remove, each with a checkbox), and a status/column selector.
- Task Detail: view a task's full description and subtasks, toggle subtask completion, change status via dropdown, edit or delete the task.
- Delete confirmation modal for boards and tasks (destructive actions should never be a single click).

**Theme**

- Light/dark toggle, applied globally, persisted (client-side is fine — localStorage or synced to backend, intern's choice).

**Responsive behavior**

- Desktop: sidebar always visible alongside the board.
- Tablet/mobile: sidebar collapses behind a menu; board switcher becomes a dropdown/modal.

**API integration**

- On load, fetch the persisted board state from the backend (§5.2).
- Show a loading state while fetching, and a clear error state if the fetch fails (don't just show a blank/broken board).
- Save state to the backend on meaningful changes (debounced auto-save, or an explicit save action — intern's choice, but state a decision either way).

### 5.2 Backend (minimal persistence API)

Keep this intentionally thin regardless of backend experience — the frontend still owns all business logic (reordering, editing, validation). The backend's only job is to store and return a JSON blob.

- `GET /board` — returns the currently saved board state (all boards/columns/tasks/subtasks as one JSON structure).
- `PUT /board` — accepts the full board state as JSON and overwrites what's stored.
- Backed by Postgres (a single table with one JSON/JSONB column is sufficient for base scope).
- CORS configured to allow requests from the deployed frontend's domain.

## 6. Non-functional requirements

- **Performance:** no specific budget, but avoid obviously wasteful patterns (e.g. re-fetching the whole board on every keystroke).
- **Accessibility:** modals should trap focus and be dismissible via keyboard (Escape); interactive elements should be reachable via Tab. Doesn't need a full audit, but shouldn't be mouse-only.
- **Resilience:** the app shouldn't crash or show a blank screen if the backend is unreachable — show an error state instead.

## 7. Technical architecture

```
React (Vite)  ──fetch/axios──►  Express API  ──pg/Prisma──►  Postgres
   │                                  │
   ▼                                  ▼
 Vercel                        Render (or Railway)
```

- **Frontend:** React + Vite, deployed to **Vercel** (free Hobby tier, git-based auto-deploy).
- **Backend:** Node/Express (or Fastify), deployed to **Render** (free web service + free Postgres, no card required) or **Railway** (better specs via a $5 one-time trial credit, small usage cost after ~30 days).
  - Render's free Postgres expires after 30 days of the plan/inactivity — a non-issue for a 1–2 week project, but don't leave the DB as a long-term home afterward without upgrading.
- **State management:** `useReducer` + Context is the recommended default for the nested board/column/task state; a state library (Zustand, Redux Toolkit) is a reasonable stretch swap if the intern wants the practice.
- **Styling:** intern's choice (CSS Modules, Tailwind, styled-components) — not a focus area for this project.

## 8. Suggested timeline (1–2 weeks / ~8 working days)

| Day | Focus                                                                                              |
| --- | -------------------------------------------------------------------------------------------------- |
| 1   | Project scaffold (Vite + React), review design/requirements, repo setup, basic layout skeleton     |
| 2–3 | Core UI: board, columns, task cards, sidebar, theme toggle — using local/mock data                 |
| 4   | State management: reducer/context for full CRUD on boards/columns/tasks/subtasks, wire up modals   |
| 5   | Responsive pass: mobile/tablet layouts, sidebar collapse behavior, drag-and-drop                   |
| 6   | Backend: scaffold Express API, `GET`/`PUT /board`, connect to Postgres locally                     |
| 7   | Integration: point frontend at the API, replace mock data, add loading/error states, env vars      |
| 8   | Deploy: backend to Render/Railway, frontend to Vercel, end-to-end test, polish, short demo writeup |

Buffer built in — day 8 can slip to day 9-10 without derailing the "1-2 weeks" target.

## 9. Definition of done

- [ ] Board, column, task, and subtask CRUD all work end-to-end in the UI.
- [ ] Drag-and-drop moves tasks between columns.
- [ ] Light/dark theme toggle works.
- [ ] Layout is usable on mobile, tablet, and desktop widths.
- [ ] Board state persists across page reloads via the real backend (not localStorage).
- [ ] Frontend is live on a Vercel URL; backend is live on a Render/Railway URL.
- [ ] A brief README explains how to run it locally and links to the live deployment.

## 10. Stretch goals (if time allows)

- Multiple boards persisted server-side (not just one board blob).
- Expand the backend into real resource-based REST endpoints with validation, instead of one JSON blob.
- Drag-and-drop reordering _within_ a column also persists (not just column membership).
- Basic auth so the board is private to whoever's using it.
- A short automated test (one component test, one API test) as an intro to testing.

## 11. Resources

- [Frontend Mentor: Kanban task management web app](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB) — design reference and original challenge scope.
- [Render pricing](https://render.com/pricing) / [Railway pricing](https://railway.com/pricing) — current free-tier terms.
- `dnd-kit` or `@hello-pangea/dnd` docs for drag-and-drop implementation.
