# playground
Interactive playground for the [Multilingual Programming Language](https://github.com/johnsamuelwrites/multilingual).

Current playground release: `0.1.0`

## Current baseline

This repo is aligned with `multilingualprogramming` `0.6.0`.

The current playground content highlights the expanded browser-facing WAT/WASM coverage in 0.6.0:

- stateful classes and inherited method dispatch
- `with`, `try/except`, `lambda`, `match/case`, and `async/await`
- `@property` accessors and bytes literals

The UI reads the installed package version at runtime so the page does not need a hardcoded release string.

## Live demo

Open [index.html](index.html) locally or publish the repository on GitHub Pages at `https://multilingualprogramming.github.io/playground/`.

## How it works

The playground runs entirely in the browser:

- **Pyodide** - CPython 3.12 compiled to WASM; runs the full interpreter
- **wabt.js** - WABT on WASM; compiles generated WAT to binary WASM in the browser
- **CodeMirror 5** - editor with syntax highlighting and dark/light theme toggle

No server is required. The page prefers a local wheel from `assets/wheel_info.json` when present, then falls back to installing `multilingualprogramming` from PyPI via `micropip`.

The main document is now a thin shell. Playground styles live in `assets/playground.css` and the application logic lives in `assets/playground.js`.

## Content maintenance

- Keep the language dropdown, language examples, and keyword source aligned with `../multilingual/multilingualprogramming/resources/usm/keywords.json`.
- Avoid hardcoded supported-language lists in multiple places. The runtime fallback list is derived from the language selector.
- When playground copy changes, refresh sitemap metadata in `sitemap.xml` as part of the same update.

Run `python tools/check_release.py --expected-date YYYY-MM-DD` before publishing a release update. The checker validates canonical metadata, sitemap/robots/manifest consistency, version references, extracted asset presence, and language/example coverage.
