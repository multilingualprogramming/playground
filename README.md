# playground
Interactive playground for the [Multilingual Programming Language](https://github.com/johnsamuelwrites/multilingual).

## Live Demo

Hosted on GitHub Pages — open [index.html](index.html) in your browser or visit the published URL once GitHub Pages is enabled.

## How it works

The playground runs entirely in the browser:

- **Pyodide** — CPython 3.12 compiled to WASM; runs the full interpreter
- **wabt.js** — WABT on WASM; compiles WAT → binary
- **CodeMirror 5** — editor with syntax highlighting and dark/light theme toggle

No server required. The `multilingualprogramming` package is installed at runtime via `micropip` from PyPI.

## GitHub Pages setup

1. Go to **Settings → Pages** in this repository
2. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
3. Save — GitHub will publish the playground at `https://<your-username>.github.io/playground/`
