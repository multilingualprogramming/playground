# AGENTS.md

## Scope

This repository is a static browser playground for the Multilingual Programming Language. Keep changes small, local, and browser-first.

## Baseline

- Current playground release: `0.1.0`
- Current aligned package: `multilingualprogramming` `0.6.0`

When changing behavior, keep the playground aligned with the current target `multilingualprogramming` version documented in `README.md`.

## Project structure

- `index.html`: page shell and static markup
- `assets/playground.css`: site styling
- `assets/main.js`: browser bootstrap
- `assets/editor.js`: editor setup, language loading, example switching
- `assets/runtime.js`: Pyodide execution, WAT generation, WASM execution
- `assets/ui.js`: tabs, split panes, status, share/clear helpers
- `assets/theme.js`: theme handling
- `assets/i18n.js`: UI translations
- `assets/examples.js`: shipped example programs
- `tools/check_release.py`: release and metadata validation
- `tools/check_examples.py`: example executability validation
- `.github/workflows/example-executability.yml`: CI for example execution

## Working rules

- Preserve the browser-only deployment model. Do not add a server dependency unless explicitly requested.
- Keep the language selector in `index.html`, the example maps in `assets/examples.js`, and the keyword source from `../multilingual/multilingualprogramming/resources/usm/keywords.json` aligned.
- Prefer deriving supported-language behavior from the DOM or shared data instead of duplicating hardcoded language lists.
- Treat non-ASCII text in examples and translations as user-facing content. Do not normalize it away unless fixing a real encoding or parser issue.
- If copy, canonical URLs, or publish metadata change, review `sitemap.xml`, `robots.txt`, and `site.webmanifest`.
- Prefer targeted fixes over broad rewrites. This repo is intentionally small.

## Validation

Run these when relevant:

- `python tools/check_release.py --expected-date YYYY-MM-DD`
- `python tools/check_examples.py`

For UI-facing changes, also do a manual browser pass on:

- language switching
- example switching
- run / clear / share actions
- Python, WAT / WASM, and Rust tabs
- theme toggle
- keyboard navigation
- narrow-screen layout

## Release docs

If the change is user-visible or release-significant, update:

- `CHANGELOG.md`
- `README.md`
- `RELEASE.md`

## Collaboration

In change summaries or PR notes, include:

- what changed
- why it changed
- how it was validated
- whether release docs or metadata were updated
