# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patrona is a geriatric care management app. The whole thing lives in a single `index.html` file (~230KB) that you can open directly in a browser, no server needed.

## Architecture

`index.html` is a bundled single-file app. It has a few embedded `<script>` blocks that work together:

- **Bootstrapper script**: Vanilla JS loader that fires on DOMContentLoaded. It reads the manifest, decodes base64 assets (handles gzip via DecompressionStream if needed), turns them into blob URLs, and swaps them into the template HTML.
- **`__bundler/manifest`** script tag: JSON blob with all the assets (fonts, etc.), their MIME types, and base64-encoded data.
- **`__bundler/template`** script tag: JSON-encoded string of the full app HTML/CSS/JS. UUIDs in the template get replaced with blob URLs at runtime.
- **`__bundler/ext_resources`** script tag: Maps resource IDs to UUIDs, exposed as `window.__resources`.

The app runs React with Babel standalone (`text/babel` script tags) for client-side JSX transformation. After the document gets replaced, scripts are re-created with `createElement` so they actually execute, and `Babel.transformScriptTags()` gets called manually.

## Development

- Just open `index.html` in a browser (`file://` works fine). No build step.
- No package manager or dependencies. Everything is in the one HTML file.
- No test framework set up yet.
