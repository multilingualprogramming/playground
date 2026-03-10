/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

import { EXAMPLES, EXAMPLES_MEDIUM, EXAMPLES_ADVANCED } from './examples.js';

/* ── DOM refs used by the editor module ─────────────────────────── */
const $lang        = document.getElementById('lang-select');
const $exampleSel  = document.getElementById('example-select');
const $badge       = document.getElementById('lang-badge');
const $exampleLink = document.getElementById('complete-features-link');

/* ── CodeMirror instance ─────────────────────────────────────────── */
const currentTheme = document.documentElement.getAttribute('data-theme');
export const editor = CodeMirror.fromTextArea(
  document.getElementById('code-area'),
  {
    mode: 'python',
    theme: currentTheme === 'dark' ? 'dracula' : 'eclipse',
    lineNumbers: true,
    indentUnit: 4, tabSize: 4, indentWithTabs: false,
    lineWrapping: false, autofocus: true,
    // extraKeys (Ctrl-Enter / Cmd-Enter) are wired in main.js to avoid
    // a circular import with runtime.js.
  }
);

editor.getWrapperElement().setAttribute('role', 'textbox');
editor.getWrapperElement().setAttribute('aria-multiline', 'true');
editor.getWrapperElement().setAttribute('aria-labelledby', 'editor-pane-title');
editor.getInputField().setAttribute('aria-label', 'Source code editor');

export function resizeEditor() {
  const w = document.getElementById('editor-wrapper');
  editor.setSize('100%', w.clientHeight);
}
window.addEventListener('resize', resizeEditor);
setTimeout(resizeEditor, 60);

/* ── Example loading ─────────────────────────────────────────────── */
export function loadExample(lang, level) {
  const map = level === 'advanced' ? EXAMPLES_ADVANCED
            : level === 'medium'   ? EXAMPLES_MEDIUM
            : EXAMPLES;
  editor.setValue(map[lang] || map.en);
}

export function loadLang(lang) {
  const level = $exampleSel ? $exampleSel.value : 'basics';
  loadExample(lang, level);
  $badge.textContent = lang;
  const isRtl = lang === 'ar';
  editor.getWrapperElement().style.direction = isRtl ? 'rtl' : 'ltr';
  editor.setOption('direction', isRtl ? 'rtl' : 'ltr');
  editor.setOption('lineWrapping', isRtl);
  applyEditorHighlighting(lang);
  updateCompleteFeaturesLink(lang);
  editor.refresh();
}

function updateCompleteFeaturesLink(lang) {
  if (!$exampleLink) return;
  const langCode = lang || 'en';
  $exampleLink.href = `https://github.com/johnsamuelwrites/multilingual/blob/main/examples/complete_features_${langCode}.ml`;
  $exampleLink.textContent = `📘 Complete features (${langCode}) ✨`;
}

/* ── Keyword highlighting ────────────────────────────────────────── */
export let languageKeywords = new Map();
let unicodeWordRegex = null;

try {
  unicodeWordRegex = new RegExp('[\\p{L}\\p{M}\\p{N}_]', 'u');
} catch (_) {
  unicodeWordRegex = null;
}

function isWordChar(ch) {
  if (!ch) return false;
  if (unicodeWordRegex) return unicodeWordRegex.test(ch);
  return /[A-Za-z0-9_]/.test(ch) || (ch.codePointAt(0) > 127 && !/\s/.test(ch));
}

function normalizeKeywordEntry(value) {
  if (Array.isArray(value)) return value;
  return typeof value === 'string' ? [value] : [];
}

function extractKeywordsForLanguage(keywordSpec, lang) {
  const collected = new Set();
  const categories = keywordSpec && keywordSpec.categories ? keywordSpec.categories : {};
  Object.values(categories).forEach(group => {
    Object.values(group).forEach(mapping => {
      normalizeKeywordEntry(mapping[lang]).forEach(word => {
        if (typeof word === 'string') {
          const trimmed = word.trim();
          if (trimmed) collected.add(trimmed);
        }
      });
    });
  });
  return [...collected].sort((a, b) => b.length - a.length);
}

async function fetchKeywordSpec() {
  const candidates = [
    './assets/keywords.json',
    '../assets/keywords.json',
    'assets/keywords.json',
    '../multilingualprogramming/resources/usm/keywords.json',
    './multilingualprogramming/resources/usm/keywords.json',
    'https://raw.githubusercontent.com/johnsamuelwrites/multilingual/main/multilingualprogramming/resources/usm/keywords.json',
  ];
  for (const url of candidates) {
    try {
      const resp = await fetch(url, { cache: 'no-cache' });
      if (!resp.ok) continue;
      return await resp.json();
    } catch (_) { /* try next candidate */ }
  }
  return null;
}

function applyKeywordOnlyMode(lang, keywords) {
  const modeName = `ml-keywords-${lang}`;
  if (!CodeMirror.modes[modeName]) {
    const keywordSet = new Set(keywords);
    const isDigit    = (ch) => !!ch && ch >= '0' && ch <= '9';
    const isOperator = (ch) => !!ch && /[+\-*/%=<>!&|^~:,.[\](){}]/.test(ch);
    CodeMirror.defineMode(modeName, () => ({
      token(stream) {
        const ch = stream.peek();
        if (!ch) return null;
        if (/\s/.test(ch)) { stream.next(); return null; }
        if (ch === '#') { stream.skipToEnd(); return 'comment'; }
        if (ch === '"' || ch === "'") {
          const quote = stream.next();
          let escaped = false;
          while (!stream.eol()) {
            const c = stream.next();
            if (escaped) { escaped = false; continue; }
            if (c === '\\') { escaped = true; continue; }
            if (c === quote) break;
          }
          return 'string';
        }
        if (isDigit(ch)) { stream.eatWhile(/[0-9._]/); return 'number'; }
        if (isWordChar(ch)) {
          let word = '';
          while (!stream.eol() && isWordChar(stream.peek())) word += stream.next();
          return keywordSet.has(word) ? 'keyword' : null;
        }
        if (isOperator(ch)) { stream.next(); return 'operator'; }
        stream.next();
        return null;
      },
    }));
  }
  editor.setOption('mode', modeName);
  editor.refresh();
}

export function applyEditorHighlighting(lang) {
  const keywords = languageKeywords.get(lang);
  if (!keywords || !keywords.length || lang === 'en') {
    editor.setOption('mode', 'python');
    editor.refresh();
    return;
  }
  applyKeywordOnlyMode(lang, keywords);
}

export async function initLanguageKeywords() {
  const spec = await fetchKeywordSpec();
  if (!spec) {
    console.warn('Could not load keywords.json; using default python highlighting.');
    return;
  }
  ($lang ? Array.from($lang.options).map(opt => opt.value) : []).forEach(code => {
    languageKeywords.set(code, extractKeywordsForLanguage(spec, code));
  });
}

/* ── Error line highlighting ─────────────────────────────────────── */
export function clearErrorLines() {
  for (let i = 0; i < editor.lineCount(); i++) {
    editor.removeLineClass(i, 'background', 'error-line');
  }
}

export function highlightErrorLine(errText) {
  clearErrorLines();
  const m = errText.match(/line[:\s]+(\d+)/i)
    || errText.match(/at line (\d+)/i)
    || errText.match(/:(\d+):/);
  if (!m) return;
  const lineNum = parseInt(m[1], 10) - 1;
  if (lineNum >= 0 && lineNum < editor.lineCount()) {
    editor.addLineClass(lineNum, 'background', 'error-line');
    editor.scrollIntoView({ line: lineNum, ch: 0 }, 80);
  }
}

editor.on('change', clearErrorLines);
