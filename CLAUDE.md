# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patrona is a geriatric care management platform. This repo has two parts:

- **`index.html`** (root) — The marketing/landing page. A bundled single-file app (~230KB) you can open directly in a browser, no server needed. Hosted at `getpatrona.com`.
- **`prototype/`** — The product prototype. A multi-file React app served at `getpatrona.com/prototype`.

## Landing Page (`index.html`)

A bundled single-file app with embedded `<script>` blocks:

- **Bootstrapper script**: Vanilla JS loader that fires on DOMContentLoaded. Reads the manifest, decodes base64 assets (handles gzip via DecompressionStream if needed), turns them into blob URLs, and swaps them into the template HTML.
- **`__bundler/manifest`** script tag: JSON blob with all the assets (fonts, etc.), their MIME types, and base64-encoded data.
- **`__bundler/template`** script tag: JSON-encoded string of the full app HTML/CSS/JS. UUIDs in the template get replaced with blob URLs at runtime.
- **`__bundler/ext_resources`** script tag: Maps resource IDs to UUIDs, exposed as `window.__resources`.

The app runs React with Babel standalone (`text/babel` script tags) for client-side JSX transformation. After the document gets replaced, scripts are re-created with `createElement` so they actually execute, and `Babel.transformScriptTags()` gets called manually.

Just open `index.html` in a browser (`file://` works fine). No build step, no package manager.

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
