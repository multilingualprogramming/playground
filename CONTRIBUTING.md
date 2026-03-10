# Contributing

## Scope

This repository is a static browser playground for the Multilingual Programming Language. It is intentionally small: one HTML entry point, static assets, and a lightweight release check script.

## Before you change anything

1. Read [`README.md`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/README.md).
2. Keep this repo aligned with the current target `multilingualprogramming` version.
3. Prefer small, reviewable changes over broad rewrites.

## Project structure

- [`index.html`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/index.html): page shell and static markup
- [`assets/playground.css`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/assets/playground.css): site styling
- [`assets/playground.js`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/assets/playground.js): runtime logic, examples, and UI behavior
- [`tools/check_release.py`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/tools/check_release.py): release validation

## Development expectations

- Preserve the browser-only deployment model. Do not introduce a server dependency unless explicitly intended.
- Keep language options and examples aligned. If you add or remove a supported language, update both the selector in [`index.html`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/index.html) and the example maps in [`assets/playground.js`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/assets/playground.js).
- Keep metadata coherent. If copy or publish URLs change, review [`sitemap.xml`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/sitemap.xml), [`robots.txt`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/robots.txt), and [`site.webmanifest`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/site.webmanifest).
- Prefer ASCII in comments and UI chrome unless non-ASCII text is user content, a language example, or a real requirement.

## Validation

Run this before opening a release-oriented change:

```bash
python tools/check_release.py --expected-date YYYY-MM-DD
```

Also do a manual browser pass on:

- language switching
- example switching
- run / clear / share actions
- Python, WAT / WASM, and Rust tabs
- theme toggle
- keyboard navigation
- mobile or narrow-screen layout

## Changelog and release docs

- Update [`CHANGELOG.md`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/CHANGELOG.md) for user-visible or maintenance-significant changes.
- Use [`RELEASE.md`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/RELEASE.md) when preparing a release summary or publish checklist.

## Pull request guidance

Include:

- what changed
- why it changed
- how you validated it
- whether metadata or release docs were updated
