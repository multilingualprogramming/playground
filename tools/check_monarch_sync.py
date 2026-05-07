#
# SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
#
# SPDX-License-Identifier: GPL-3.0-or-later
#

from __future__ import annotations

import argparse
import difflib
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PLAYGROUND_MONARCH_PATH = ROOT / "assets" / "monarch.json"
DEFAULT_TREE_SITTER_ROOT = ROOT.parent / "tree-sitter-multilingual"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Validate that playground/assets/monarch.json matches the generated "
            "Monarch tokenizer from tree-sitter-multilingual."
        )
    )
    parser.add_argument(
        "--tree-sitter-root",
        default=str(DEFAULT_TREE_SITTER_ROOT),
        help=(
            "Path to a checkout of tree-sitter-multilingual. "
            f"Default: {DEFAULT_TREE_SITTER_ROOT}"
        ),
    )
    parser.add_argument(
        "--show-diff",
        action="store_true",
        help="Print a unified diff when the files differ.",
    )
    return parser.parse_args()


def read_json(path: Path) -> object:
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> int:
    args = parse_args()
    tree_sitter_root = Path(args.tree_sitter_root).resolve()
    upstream_monarch_path = tree_sitter_root / "generated" / "monarch.json"

    if not PLAYGROUND_MONARCH_PATH.exists():
        print(f"ERROR: playground tokenizer is missing: {PLAYGROUND_MONARCH_PATH}", file=sys.stderr)
        return 1

    if not tree_sitter_root.exists():
        print(
            "ERROR: tree-sitter-multilingual checkout not found at "
            f"{tree_sitter_root}",
            file=sys.stderr,
        )
        return 1

    if not upstream_monarch_path.exists():
        print(
            "ERROR: upstream generated tokenizer not found at "
            f"{upstream_monarch_path}",
            file=sys.stderr,
        )
        return 1

    try:
        playground_json = read_json(PLAYGROUND_MONARCH_PATH)
        upstream_json = read_json(upstream_monarch_path)
    except Exception as exc:
        print(f"ERROR: failed to parse Monarch JSON: {exc}", file=sys.stderr)
        return 1

    playground_normalized = json.dumps(playground_json, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
    upstream_normalized = json.dumps(upstream_json, ensure_ascii=False, indent=2, sort_keys=True) + "\n"

    if playground_normalized != upstream_normalized:
        print(
            "ERROR: assets/monarch.json is out of sync with "
            f"{upstream_monarch_path}",
            file=sys.stderr,
        )
        print(
            "Refresh it from tree-sitter-multilingual/generated/monarch.json "
            "and commit the updated tokenizer.",
            file=sys.stderr,
        )
        if args.show_diff:
            diff = difflib.unified_diff(
                upstream_normalized.splitlines(),
                playground_normalized.splitlines(),
                fromfile=str(upstream_monarch_path),
                tofile=str(PLAYGROUND_MONARCH_PATH),
                lineterm="",
            )
            for line in diff:
                print(line, file=sys.stderr)
        return 1

    print("Monarch tokenizer sync check passed.")
    print(f"Playground tokenizer: {PLAYGROUND_MONARCH_PATH}")
    print(f"Grammar tokenizer: {upstream_monarch_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
