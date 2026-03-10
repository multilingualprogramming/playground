#
# SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
#
# SPDX-License-Identifier: GPL-3.0-or-later
#

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from multilingualprogramming.codegen.executor import ProgramExecutor


ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "index.html"
README_PATH = ROOT / "README.md"
EXAMPLES_PATH = ROOT / "assets" / "examples.js"
EXAMPLE_MAPS = ("EXAMPLES", "EXAMPLES_MEDIUM", "EXAMPLES_ADVANCED")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def expect_match(pattern: str, text: str, label: str) -> str:
    match = re.search(pattern, text, re.MULTILINE)
    if not match:
        raise ValueError(f"Could not find {label}.")
    return match.group(1)


def parse_language_options(index_text: str) -> list[str]:
    return re.findall(r'<option value="([a-z]{2})">', index_text)


def parse_example_map(script_text: str, const_name: str) -> dict[str, str]:
    block_match = re.search(
        rf"export const {const_name} = \{{(.*?)^\}};",
        script_text,
        re.MULTILINE | re.DOTALL,
    )
    if not block_match:
        raise ValueError(f"Could not parse {const_name} from assets/examples.js.")

    entries = re.findall(
        r"^\s*([a-z]{2}):\s*`(.*?)`,?$",
        block_match.group(1),
        re.MULTILINE | re.DOTALL,
    )
    if not entries:
        raise ValueError(f"No entries found in {const_name}.")
    return {lang: code for lang, code in entries}


def parse_all_examples(script_text: str) -> dict[str, dict[str, str]]:
    return {const_name: parse_example_map(script_text, const_name) for const_name in EXAMPLE_MAPS}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate that all playground examples execute in their declared source language."
    )
    parser.add_argument(
        "--map",
        dest="maps",
        action="append",
        choices=EXAMPLE_MAPS,
        help="Validate only a specific example map. Can be passed multiple times.",
    )
    return parser.parse_args()


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")

    args = parse_args()
    selected_maps = tuple(args.maps or EXAMPLE_MAPS)
    errors: list[str] = []

    try:
        index_text = read_text(INDEX_PATH)
        readme_text = read_text(README_PATH)
        script_text = read_text(EXAMPLES_PATH)
    except Exception as exc:
        print(f"example check failed to read repository files: {exc}", file=sys.stderr)
        return 1

    try:
        baseline_version = expect_match(
            r"This repo is aligned with `multilingualprogramming` `([^`]+)`\.",
            readme_text,
            "README baseline version",
        )
        language_options = parse_language_options(index_text)
        examples_by_map = parse_all_examples(script_text)
    except ValueError as exc:
        print(f"example check setup failed: {exc}", file=sys.stderr)
        return 1

    expected_languages = set(language_options)
    total_checked = 0

    for map_name in selected_maps:
        example_map = examples_by_map[map_name]
        actual_languages = set(example_map)
        if actual_languages != expected_languages:
            errors.append(
                f"{map_name} languages do not match index.html options: "
                f"options={sorted(expected_languages)}, examples={sorted(actual_languages)}."
            )
            continue

        for language in language_options:
            code = example_map[language]
            total_checked += 1
            executor = ProgramExecutor(language=language)
            result = executor.execute(code)
            if not result.success:
                joined_errors = " | ".join(result.errors or ["unknown execution failure"])
                errors.append(f"{map_name}/{language} failed: {joined_errors}")
                continue
            if not result.python_source.strip():
                errors.append(f"{map_name}/{language} failed: generated Python source is empty.")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Example execution checks passed.")
    print(f"Baseline package version: {baseline_version}")
    print(f"Languages validated: {len(language_options)}")
    print(f"Example sets validated: {', '.join(selected_maps)}")
    print(f"Programs executed: {total_checked}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
