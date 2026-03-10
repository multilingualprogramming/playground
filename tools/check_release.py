#
# SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
#
# SPDX-License-Identifier: GPL-3.0-or-later
#

from __future__ import annotations

import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "index.html"
README_PATH = ROOT / "README.md"
MANIFEST_PATH = ROOT / "site.webmanifest"
ROBOTS_PATH = ROOT / "robots.txt"
SITEMAP_PATH = ROOT / "sitemap.xml"
PLAYGROUND_JS_PATH = ROOT / "assets" / "playground.js"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def expect_match(pattern: str, text: str, label: str) -> str:
    match = re.search(pattern, text, re.MULTILINE)
    if not match:
        raise ValueError(f"Could not find {label}.")
    return match.group(1)


def parse_const_keys(script: str, const_name: str) -> set[str]:
    match = re.search(rf"const {const_name} = \{{(.*?)^\}};", script, re.MULTILINE | re.DOTALL)
    if not match:
        raise ValueError(f"Could not parse {const_name} from assets/playground.js.")
    return set(re.findall(r"^\s*([a-z]{2}):\s*`", match.group(1), re.MULTILINE))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate release metadata for the playground.")
    parser.add_argument(
        "--expected-date",
        help="Require sitemap.xml <lastmod> to match this ISO date (YYYY-MM-DD).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    errors: list[str] = []

    try:
        index_text = read_text(INDEX_PATH)
        readme_text = read_text(README_PATH)
        manifest = json.loads(read_text(MANIFEST_PATH))
        robots_text = read_text(ROBOTS_PATH)
        sitemap_root = ET.fromstring(read_text(SITEMAP_PATH))
        playground_js = read_text(PLAYGROUND_JS_PATH)
    except Exception as exc:
        print(f"release check failed to read repository files: {exc}", file=sys.stderr)
        return 1

    try:
        canonical_url = expect_match(r'<link rel="canonical" href="([^"]+)">', index_text, "canonical URL")
        og_url = expect_match(r'<meta property="og:url" content="([^"]+)">', index_text, "Open Graph URL")
        og_image = expect_match(r'<meta property="og:image" content="([^"]+)">', index_text, "Open Graph image URL")
        theme_color = expect_match(r'<meta name="theme-color" content="([^"]+)">', index_text, "theme color")
        manifest_href = expect_match(r'<link rel="manifest" href="([^"]+)">', index_text, "manifest href")
        readme_version = expect_match(
            r"This repo is aligned with `multilingualprogramming` `([^`]+)`\.",
            readme_text,
            "README baseline version",
        )
        index_version = expect_match(
            r"<strong>([^<]+) backend note:</strong>",
            index_text,
            "index backend note version",
        )
        robots_sitemap = expect_match(r"^Sitemap:\s*(\S+)\s*$", robots_text, "robots sitemap URL")
    except ValueError as exc:
        errors.append(str(exc))
        canonical_url = og_url = og_image = theme_color = manifest_href = readme_version = index_version = robots_sitemap = ""

    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_loc = sitemap_root.findtext("sm:url/sm:loc", default="", namespaces=ns)
    sitemap_lastmod = sitemap_root.findtext("sm:url/sm:lastmod", default="", namespaces=ns)

    if canonical_url and canonical_url != og_url:
        errors.append(f"Canonical URL mismatch: index canonical is {canonical_url}, og:url is {og_url}.")

    expected_og_image = canonical_url.rstrip("/") + "/assets/images/og-image.svg" if canonical_url else ""
    if expected_og_image and og_image != expected_og_image:
        errors.append(f"Open Graph image mismatch: expected {expected_og_image}, found {og_image}.")

    if manifest_href != "./site.webmanifest":
        errors.append(f"Manifest href should be ./site.webmanifest, found {manifest_href}.")

    if manifest.get("start_url") != "/playground/":
        errors.append(f"Manifest start_url should be /playground/, found {manifest.get('start_url')}.")

    if manifest.get("scope") != "/playground/":
        errors.append(f"Manifest scope should be /playground/, found {manifest.get('scope')}.")

    if manifest.get("theme_color") != theme_color:
        errors.append(
            f"Theme color mismatch: manifest has {manifest.get('theme_color')}, index meta has {theme_color}."
        )

    expected_sitemap = canonical_url.rstrip("/") + "/sitemap.xml" if canonical_url else ""
    if sitemap_loc != canonical_url:
        errors.append(f"Sitemap <loc> should match canonical URL {canonical_url}, found {sitemap_loc}.")

    if robots_sitemap and expected_sitemap and robots_sitemap != expected_sitemap:
        errors.append(f"robots.txt sitemap should be {expected_sitemap}, found {robots_sitemap}.")

    if args.expected_date and sitemap_lastmod != args.expected_date:
        errors.append(f"sitemap.xml lastmod should be {args.expected_date}, found {sitemap_lastmod}.")

    if readme_version != index_version:
        errors.append(
            f"Version mismatch: README baseline is {readme_version}, index backend note is {index_version}."
        )

    for required_rel_path in [
        Path("assets/playground.css"),
        Path("assets/playground.js"),
        Path("assets/images/og-image.svg"),
        Path("assets/images/logo.svg"),
        Path("apple-touch-icon.png"),
        Path("favicon.ico"),
    ]:
        if not (ROOT / required_rel_path).exists():
            errors.append(f"Missing required asset: {required_rel_path.as_posix()}.")

    for icon in manifest.get("icons", []):
        src = icon.get("src", "")
        normalized = src.removeprefix("/playground/").lstrip("/")
        if normalized and not (ROOT / normalized).exists():
            errors.append(f"Manifest icon source does not exist: {src}.")

    language_options = set(re.findall(r'<option value="([a-z]{2})">', index_text))
    basic_examples = parse_const_keys(playground_js, "EXAMPLES")
    advanced_examples = parse_const_keys(playground_js, "EXAMPLES_ADVANCED")

    if language_options != basic_examples:
        errors.append(
            "Language dropdown values do not match EXAMPLES keys: "
            f"options={sorted(language_options)}, examples={sorted(basic_examples)}."
        )

    if language_options != advanced_examples:
        errors.append(
            "Language dropdown values do not match EXAMPLES_ADVANCED keys: "
            f"options={sorted(language_options)}, advanced={sorted(advanced_examples)}."
        )

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Release checks passed.")
    print(f"Canonical URL: {canonical_url}")
    print(f"Version: {readme_version}")
    print(f"Languages validated: {len(language_options)}")
    if sitemap_lastmod:
        print(f"Sitemap lastmod: {sitemap_lastmod}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
