# playground
Interactive playground for the [Multilingual Programming Language](https://github.com/johnsamuelwrites/multilingual).

Current playground release: `0.1.0`

This `0.1.0` release is the first tagged release of the browser playground.

## Current baseline

This repo is aligned with `multilingualprogramming` `0.6.0`.

The first release line highlights the expanded browser-facing WAT/WASM coverage in `multilingualprogramming` `0.6.0`:

- stateful classes and inherited method dispatch
- `with`, `try/except`, `lambda`, `match/case`, and `async/await`
- `@property` accessors and bytes literals
- browser execution for examples across 17 human-language frontends

The UI reads the installed package version at runtime so the page does not need a hardcoded release string.

## Live demo

Open [index.html](index.html) locally or publish the repository on GitHub Pages at `https://multilingualprogramming.github.io/playground/`.

## How it works

The playground runs entirely in the browser:

- **Pyodide** - CPython 3.12 compiled to WASM; runs the full interpreter
- **wabt.js** - WABT on WASM; compiles generated WAT to binary WASM in the browser
- **CodeMirror 5** - editor with syntax highlighting and dark/light theme toggle

No server is required. The page prefers a local wheel from `assets/wheel_info.json` when present, then falls back to installing `multilingualprogramming` from PyPI via `micropip`.

The main document is a thin shell. Playground styles live in `assets/playground.css`, and the application logic is split across `assets/main.js`, `assets/editor.js`, `assets/runtime.js`, `assets/ui.js`, `assets/theme.js`, `assets/i18n.js`, and `assets/examples.js`.

## Release validation

The pinned CI baseline lives in `requirements-build.txt`.

This release line is checked in two ways:

- `python tools/check_examples.py` executes all bundled example programs in each supported source language.
- GitHub Actions runs `.github/workflows/example-executability.yml` on pushes and pull requests.
- A scheduled compatibility workflow also checks the pinned baseline, the latest published package, and upstream `main`.

## Content maintenance

- Keep the language dropdown, language examples, and keyword source aligned with `../multilingual/multilingualprogramming/resources/usm/keywords.json`.
- Avoid hardcoded supported-language lists in multiple places. The runtime fallback list is derived from the language selector.
- When playground copy changes, refresh sitemap metadata in `sitemap.xml` as part of the same update.

Run `python tools/check_release.py --expected-date YYYY-MM-DD` before publishing a release update. Then run `python tools/check_examples.py` to confirm that all shipped examples still execute in their declared languages.
