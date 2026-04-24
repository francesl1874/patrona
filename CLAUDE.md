# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patrona is a geriatric care management platform. This repo has two parts:

- **`index.html`** (root) — The marketing/landing page. A single-page static site hosted at `getpatrona.com`. Loads Geist font from Google Fonts, uses `oklch()` color tokens, no JS framework.
- **`prototype/`** — The product prototype. A multi-file React app served at `getpatrona.com/prototype`.

## Landing Page (`index.html`)

A standalone static HTML page with inline CSS and minimal JS (FAQ toggle, email form). Uses Geist + Geist Mono from Google Fonts. Design tokens use `oklch()` color space with a warm cream/terracotta palette. Responsive at 720px breakpoint.

Sections: sticky nav, hero with app preview mock, feature list (numbered, with "In prototype" / "In design" status), who-it's-for, about (key/value grid), FAQ (expandable), footer.

Just open `index.html` in a browser. No build step, no package manager, no dependencies beyond Google Fonts.

## Prototype App (`prototype/`)

A single-page React app (React 18 + Babel Standalone, JSX transpiled client-side). No build step or bundler.

### Running

```
cd demo && node server.js
# open http://localhost:8080
```

`server.js` serves static files and proxies `/api/generate` to the Anthropic API. Opening `prototype/index.html` directly via `file://` will fail because browsers block local script loading.

### Script load order (defined in `prototype/index.html`)

1. `data.jsx` — Client personas, transcript scripts, mock AI outputs. All exported to `window.*`.
2. `ai.jsx` — AI generation layer. `window.patronaGenerate(flow, payload)`.
3. `icons.jsx` — `Icon` component (SVG line icons) and `PatronaMark` logo.
4. `shell.jsx` — Layout: `Sidebar`, `FamilySidebar`, `TopBar`.
5. `capture.jsx` — `CallCapture` view (simulated live call with real-time transcript).
6. `intake.jsx` — `IntakeView` (paste-or-dictate intake notes, AI generates case summary).
7. `views.jsx` — Remaining views: Today, Timeline, CarePlan, Tasks, Time, Family, ClientNotes.
8. `app.jsx` — Root `App` component, render call.

### Styling

All styles in `prototype/styles.css`. Uses `oklch()` color tokens. Four theme variants (terracotta, sage, indigo, plum) via `[data-theme]` attribute. Responsive down to 320px (breakpoint at 768px).
