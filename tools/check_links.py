#
# SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
#
# SPDX-License-Identifier: GPL-3.0-or-later
#

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
MARKDOWN_PATHS = sorted(ROOT.glob("*.md"))
HTML_PATHS = [ROOT / "index.html"]
MANIFEST_PATH = ROOT / "site.webmanifest"
MARKDOWN_LINK_RE = re.compile(r"\[[^\]]+\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")


def is_external(target: str) -> bool:
    return target.startswith(("http://", "https://", "mailto:", "tel:", "javascript:")) or target == ""


def normalize_manifest_path(target: str) -> str:
    if target.startswith("/playground/"):
        return target.removeprefix("/playground/")
    if target.startswith("/"):
        return target.lstrip("/")
    return target


def resolve_local_target(target: str, source_path: Path) -> tuple[Path | None, str | None]:
    parsed = urlsplit(target)
    raw_path = parsed.path
    fragment = parsed.fragment or None

    if not raw_path:
        return source_path, fragment

    if source_path == MANIFEST_PATH:
        raw_path = normalize_manifest_path(raw_path)

    if raw_path.startswith("/"):
        candidate = ROOT / raw_path.lstrip("/")
    else:
        candidate = source_path.parent / raw_path

    return candidate.resolve(), fragment


def path_exists(candidate: Path) -> bool:
    return candidate.exists() or candidate.is_dir()


def heading_slug(text: str) -> str:
    slug = text.strip().lower()
    slug = re.sub(r"[`*_]+", "", slug)
    slug = re.sub(r"[^\w\s-]", "", slug, flags=re.UNICODE)
    slug = re.sub(r"\s+", "-", slug, flags=re.UNICODE)
    slug = re.sub(r"-{2,}", "-", slug).strip("-")
    return slug


def collect_markdown_anchors(path: Path) -> set[str]:
    anchors: set[str] = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^(#{1,6})\s+(.*)$", line.strip())
        if not match:
            continue
        slug = heading_slug(match.group(2))
        if slug:
            anchors.add(slug)
    return anchors


class LinkHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
        self.anchors: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)

        if tag == "a" and attr_map.get("href"):
            self.links.append(attr_map["href"])
        if tag == "link" and attr_map.get("href"):
            self.links.append(attr_map["href"])
        if tag in {"script", "img"} and attr_map.get("src"):
            self.links.append(attr_map["src"])

        for key in ("id", "name"):
            value = attr_map.get(key)
            if value:
                self.anchors.add(value)


def collect_html_anchors(path: Path) -> set[str]:
    parser = LinkHTMLParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser.anchors


def collect_html_links(path: Path) -> list[str]:
    parser = LinkHTMLParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser.links


def extract_markdown_links(path: Path) -> list[str]:
    return [match.group(1) for match in MARKDOWN_LINK_RE.finditer(path.read_text(encoding="utf-8"))]


def validate_target(target: str, source_path: Path, errors: list[str]) -> None:
    if is_external(target):
        return

    if target.startswith("#"):
        fragment = target[1:]
        anchors = collect_markdown_anchors(source_path) if source_path.suffix == ".md" else collect_html_anchors(source_path)
        if fragment not in anchors:
            errors.append(f"{source_path.relative_to(ROOT)} -> missing local anchor #{fragment}")
        return

    candidate, fragment = resolve_local_target(target, source_path)
    if candidate is None or not path_exists(candidate):
        errors.append(f"{source_path.relative_to(ROOT)} -> missing target {target}")
        return

    if fragment:
        if candidate.suffix == ".md":
            anchors = collect_markdown_anchors(candidate)
        elif candidate.suffix in {".html", ".htm"}:
            anchors = collect_html_anchors(candidate)
        else:
            anchors = set()

        if anchors and fragment not in anchors:
            errors.append(f"{source_path.relative_to(ROOT)} -> missing anchor #{fragment} in {candidate.relative_to(ROOT)}")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")

    errors: list[str] = []

    for path in MARKDOWN_PATHS:
        for target in extract_markdown_links(path):
            validate_target(target, path, errors)

    for path in HTML_PATHS:
        for target in collect_html_links(path):
            validate_target(target, path, errors)

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    for icon in manifest.get("icons", []):
        src = icon.get("src", "")
        if src:
            validate_target(src, MANIFEST_PATH, errors)

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Link checks passed.")
    print(f"Markdown files checked: {len(MARKDOWN_PATHS)}")
    print(f"HTML files checked: {len(HTML_PATHS)}")
    print(f"Manifest icons checked: {len(manifest.get('icons', []))}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
