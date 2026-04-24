# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Patrona is a **UI prototype** for a geriatric care management (GCM) platform. It's a single-page React app that runs entirely in the browser with no build step — React 18, ReactDOM, and Babel Standalone are loaded from CDNs, and JSX files are transpiled client-side via `<script type="text/babel">`.

## Running

**Basic (mock data only):**
```
node server.js
# open http://localhost:8080
```

**With real AI generation:**
```
ANTHROPIC_API_KEY=sk-ant-... node server.js
# Then set window.PATRONA_CONFIG.useMockData = false in ai.jsx
```

`server.js` serves static files and proxies `/api/generate` to the Anthropic Messages API. Opening `index.html` directly via `file://` will fail because browsers block local script loading. There is no build system, bundler, or package manager. No tests exist.

`Fern-source.html` and `Fern-standalone.html` are earlier/alternate versions of the prototype (Fern was the previous product name before Patrona).

## Architecture

All state lives in-memory (no backend, no persistence beyond `localStorage` for the active view). Data is hardcoded in `data.jsx` and exposed on `window`.

**Script load order matters** (defined in `index.html`):
1. `data.jsx` — Client personas, transcript script, activity timeline, tasks, time entries, intake data, post-visit notes, mock AI outputs (`VISIT_GENERATED`, `POST_VISIT_NOTES`). All exported to `window.*`.
2. `ai.jsx` — AI generation layer. Exports `window.patronaGenerate(flow, payload)` and `window.PATRONA_CONFIG`. Contains system prompts, Claude tool schemas, and message builders for all 3 generation flows. Returns `null` in mock mode (caller falls back to hardcoded data).
3. `icons.jsx` — `Icon` component (SVG line icons) and `PatronaMark` logo. Exported to `window.*`.
4. `shell.jsx` — Layout components: `Sidebar`, `FamilySidebar`, `TopBar`. Exported to `window.*`.
5. `capture.jsx` — `CallCapture` view (the hero feature): simulated live call with real-time transcript, AI side panel insights, and auto-generated case notes/tasks. Exported to `window.CallCapture`.
6. `intake.jsx` — `IntakeView`: paste-or-dictate intake notes, AI generates case summary/care plan/tasks with source citations. Exported to `window.IntakeView`.
7. `views.jsx` — Remaining views: `TodayView`, `TimelineView`, `CarePlanView`, `TasksView`, `TimeView`, `FamilyView` (family portal variants), `ClientNotesView` (per-client notes/summary). Exported to `window.*`.
8. `app.jsx` — Root `App` component, `TweaksPanel` (design-time controls), `ReactDOM.createRoot` render call.

Components communicate via props drilled from `App`. No state management library.

## AI Generation

Three flows use `window.patronaGenerate(flow, payload)` from `ai.jsx`:

- **`visit-note`** — ClientNotesView post-visit notes → `{ caseNote, todos[] }`. Used in `views.jsx`.
- **`call-capture`** — Call transcript → `{ summary, keyFacts[], tasks[] }`. Used in `capture.jsx`. `GeneratedNotes` component renders summary/keyFacts from a data prop (not hardcoded).
- **`intake`** — Intake notes → `{ summary, carePlan[], tasks[] }`. Used in `intake.jsx`. `IntakeSummary` and `IntakePlan` accept data props with fallback to `window.INTAKE_GENERATED`.

All flows use Claude's `tool_use` for structured JSON output. When `PATRONA_CONFIG.useMockData` is `true` (default), `patronaGenerate` returns `null` and callers use hardcoded mock data from `data.jsx`. When `false`, it POSTs to `/api/generate` which `server.js` proxies to the Anthropic API.

## Key Concepts

- **Two modes**: GCM (care manager) and Family (family member portal), toggled via `tweaks.familyMode`.
- **Tweaks panel**: A floating config panel (bottom-right) for switching theme accent color, GCM/Family mode, AI side panel toggle, and active client persona. Activated via `postMessage` edit-mode handshake (designed to be embedded in an iframe).
- **Client personas**: 5 hardcoded clients in `data.jsx` with varying statuses (stable, needs attention, urgent, intake pending). `Edith Holloway` (intake: 'pending') triggers the intake flow; others show the standard views with `ClientNotesView` as the default landing.
- **Client page (tabbed)**: Clicking a client opens a tabbed page (`ClientPage` in views.jsx) with four tabs: **Notes** (post-visit notes + AI generation + summary + tasks), **Call capture**, **Timeline**, and **Care plan**. These embed the existing `ClientNotesView`, `CallCapture`, `TimelineView`, and `CarePlanView` components.
- **Sidebar structure**: "Overview" has Today. "Clients" is the roster. "Workspace" has care manager-level tools only: Tasks, Time & billing, Calendar, Inbox. Per-client views (notes, capture, timeline, care plan) live inside the client page tabs, not the sidebar.
- **Today dashboard**: The "Today" view is the GCM's home screen — shows flags, upcoming calls, a clickable client roster table (navigates to that client's page), draft messages, and automation stats.
- **View routing**: Clicking a client in the sidebar or the Today dashboard sets the view to 'notes' which renders `ClientPage`. The intake gate (`client.intake === 'pending'`) overrides this for Edith Holloway.
- **Call capture simulation**: In `capture.jsx`, clicking "Start call" plays a scripted transcript (`TRANSCRIPT_SCRIPT`) with timed reveals. The AI side panel (`RealtimeInsights`) shows progressive insights keyed to transcript line count. Currently themed around Margaret Okafor / Dana Okafor.
- **`/*EDITMODE-BEGIN*/` / `/*EDITMODE-END*/`** markers in `app.jsx` around `TWEAKS_DEFAULTS` — used by an external editor/bundler tool to inject tweaks state.

## Styling

All styles are in `styles.css`. Design tokens use `oklch()` color space. Four theme variants (default/terracotta, sage, indigo, plum) are applied via `[data-theme]` attribute on `<html>`. Typography uses Geist (sans), Geist Mono, and Newsreader (serif, loaded but aliased to `--serif` which currently points to Geist).

## Mobile / Responsive

The app is responsive down to 320px. The breakpoint is `768px` (`@media (max-width: 768px)` in `styles.css`).

- **Sidebar**: Becomes a slide-out overlay (fixed, `transform: translateX`) toggled by a hamburger button in the top bar. A backdrop overlay (`sidebar-backdrop`) dims the content behind it. Sidebar auto-closes on navigation.
- **Mobile menu state**: `mobileMenuOpen` state lives in `App` (app.jsx). Sidebar and FamilySidebar accept `mobileOpen` and `onClose` props. TopBar accepts `onMenuToggle`.
- **Client sub-nav**: Switches from a 160px vertical sidebar to horizontal scrolling tabs (`flex-direction: row`, `overflow-x: auto`). The parent `.client-body` switches from row to column layout.
- **Grid layouts**: Multi-column grids use CSS class names (e.g., `today-pair`, `grid-2col`, `grid-4col`, `careplan-layout`, `stat-grid`, `info-3col`, `auto-stat-grid`) so that `@media` queries can override inline `gridTemplateColumns` with `!important`.
- **Data tables**: Roster, time entries, and medication tables use wrapper classes (`roster-table`, `time-table`, `med-table`) that enable horizontal scroll on mobile with min-width on header/row children.
- **Call capture**: The transcript + AI panel split (`capture-split`) stacks vertically. The call control bar (`call-control`) stacks to column layout.
- **Messages**: Thread list (`messages-thread-list`) stacks above the detail pane with a max-height constraint.
- **Search overlay**: Uses `search-overlay-content` class to shrink to viewport width minus margins.
