# Changelog

All notable changes to this playground will be documented in this file.

The format is loosely based on Keep a Changelog.

## [0.1.0] - 2026-03-10

First tagged release of the browser playground.

### Added

- Release validation via [`tools/check_release.py`](tools/check_release.py).
- Example executability validation via [`tools/check_examples.py`](tools/check_examples.py) and GitHub Actions in [`.github/workflows/example-executability.yml`](.github/workflows/example-executability.yml).
- Keyboard-accessible output tabs and split-pane resizing.
- Release process documentation in [`RELEASE.md`](RELEASE.md) and contribution guidance in [`CONTRIBUTING.md`](CONTRIBUTING.md).

### Changed

- Aligned the playground with `multilingualprogramming` `0.6.0`.
- Highlighted broader browser-facing WAT/WASM coverage for classes, control flow, async features, properties, and bytes literals.
- Kept the page shell in [`index.html`](index.html) and organized the client logic across [`assets/main.js`](assets/main.js), [`assets/editor.js`](assets/editor.js), [`assets/runtime.js`](assets/runtime.js), [`assets/ui.js`](assets/ui.js), and [`assets/examples.js`](assets/examples.js).
- Improved keyboard focus handling, live status announcements, and narrow-screen behavior.
- Normalized source comments and visible UI copy to reduce encoding-risky decorative characters.

### Fixed

- Reduced maintenance risk from a monolithic inline HTML document.
- Tightened metadata consistency checks across sitemap, manifest, robots, and canonical page metadata.
- Corrected shipped example programs so the bundled corpus executes cleanly across all 17 supported languages.

## Unreleased

- No entries yet.
