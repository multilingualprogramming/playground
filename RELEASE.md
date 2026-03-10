# Release Notes Process

This repository publishes a browser-only playground for `multilingualprogramming`.

## Release scope

Prepare a playground release when at least one of these changes:

- the aligned `multilingualprogramming` version
- supported languages or keyword coverage
- example content or release copy
- browser runtime behavior, accessibility, or mobile behavior
- site metadata used by GitHub Pages

## Release checklist

1. Confirm the target `multilingualprogramming` version.
2. Update [`README.md`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/README.md) baseline text if the aligned version changed.
3. Update visible release copy in [`index.html`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/index.html), especially the backend note in the WAT / WASM tab.
4. Refresh examples and language metadata in [`assets/playground.js`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/assets/playground.js) if language coverage changed.
5. Verify metadata files:
   [`sitemap.xml`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/sitemap.xml),
   [`robots.txt`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/robots.txt),
   [`site.webmanifest`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/site.webmanifest).
6. Run:
   `python tools/check_release.py --expected-date YYYY-MM-DD`
7. Open [`index.html`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/index.html) in a browser and smoke-test:
   language switching, example switching, run/clear/share, output tabs, theme toggle, keyboard navigation, and narrow-screen layout.
8. Update [`CHANGELOG.md`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/CHANGELOG.md).
9. Prepare outward-facing release notes using the template below.

## Release note template

Use this for GitHub release text or a release PR summary.

```md
## Summary

- Align playground with `multilingualprogramming` `X.Y.Z`
- Highlight key browser-visible language/runtime improvements
- Refresh metadata and release validation checks

## User-visible changes

- Added:
- Changed:
- Fixed:

## Maintenance

- Updated docs:
- Updated metadata:
- Validation:
```

## Current release summary

Current playground release: `0.1.0`

The current baseline aligns this playground with `multilingualprogramming` `0.6.0`.

Highlights in the current release line:

- expanded browser-facing WAT/WASM coverage
- stateful classes and inherited method dispatch
- `with`, `try/except`, `lambda`, `match/case`, and `async/await`
- `@property` accessors and bytes literals
- extracted `index.html` into [`assets/playground.css`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/assets/playground.css) and [`assets/playground.js`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/assets/playground.js)
- improved accessibility and mobile behavior
- added release validation with [`tools/check_release.py`](/c:/Users/john.samuel/Documents/Research/Workspace/playground/tools/check_release.py)
