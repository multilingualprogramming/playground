/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

import { EXAMPLES, EXAMPLES_MEDIUM, EXAMPLES_ADVANCED } from './examples.js';

const MONACO_BASE = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs';

const $lang = document.getElementById('lang-select');
const $exampleSel = document.getElementById('example-select');
const $badge = document.getElementById('lang-badge');
const $exampleLink = document.getElementById('complete-features-link');
const $editorHost = document.getElementById('code-area');
const $editorWrapper = document.getElementById('editor-wrapper');

export let editor = null;
let monacoApi = null;
let editorReadyPromise = null;
let errorDecorations = null;
let resizeObserver = null;

function loadExampleMap(level) {
  if (level === 'advanced') return EXAMPLES_ADVANCED;
  if (level === 'medium') return EXAMPLES_MEDIUM;
  return EXAMPLES;
}

function sanitizeLangCode(lang) {
  const fallback = 'en';
  const raw = typeof lang === 'string' ? lang : fallback;
  const allLangs = new Set([
    ...Object.keys(EXAMPLES || {}),
    ...Object.keys(EXAMPLES_MEDIUM || {}),
    ...Object.keys(EXAMPLES_ADVANCED || {}),
  ]);
  return allLangs.has(raw) ? raw : fallback;
}

function updateCompleteFeaturesLink(lang) {
  if (!$exampleLink) return;
  const langCode = lang || 'en';
  $exampleLink.href = `https://github.com/johnsamuelwrites/multilingual/blob/main/examples/complete_features_${langCode}.multi`;
  $exampleLink.textContent = `Complete features (${langCode})`;
}

function setEditorDirection(lang) {
  if (!$editorHost) return;
  const isRtl = lang === 'ar';
  $editorHost.dir = isRtl ? 'rtl' : 'ltr';
  $editorHost.classList.toggle('editor-rtl', isRtl);
}

function createTheme(theme) {
  if (!monacoApi) return;
  const isDark = theme === 'dark';
  monacoApi.editor.defineTheme('ml-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
      { token: 'string', foreground: '50fa7b' },
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'operator', foreground: '8be9fd' },
      { token: 'identifier', foreground: 'e2e8f0' },
    ],
    colors: {
      'editor.background': '#1c1e2e',
      'editorLineNumber.foreground': '#64748b',
      'editorLineNumber.activeForeground': '#e2e8f0',
      'editorIndentGuide.background1': '#2b3157',
      'editor.selectionBackground': '#33415588',
      'editor.inactiveSelectionBackground': '#1f293788',
    },
  });
  monacoApi.editor.defineTheme('ml-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'c2185b', fontStyle: 'bold' },
      { token: 'string', foreground: '166534' },
      { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
      { token: 'number', foreground: '7c3aed' },
      { token: 'operator', foreground: '0891b2' },
      { token: 'identifier', foreground: '1e293b' },
    ],
    colors: {
      'editor.background': '#fefefe',
      'editorLineNumber.foreground': '#94a3b8',
      'editorLineNumber.activeForeground': '#1e293b',
      'editorIndentGuide.background1': '#dbe4ff',
      'editor.selectionBackground': '#c7d2fe80',
      'editor.inactiveSelectionBackground': '#e2e8f080',
    },
  });
  monacoApi.editor.setTheme(isDark ? 'ml-dark' : 'ml-light');
}

function loadMonaco() {
  if (monacoApi) return Promise.resolve(monacoApi);
  if (window.monaco?.editor) {
    monacoApi = window.monaco;
    return Promise.resolve(monacoApi);
  }
  return new Promise((resolve, reject) => {
    if (typeof window.require !== 'function') {
      reject(new Error('Monaco loader is unavailable.'));
      return;
    }
    window.require.config({ paths: { vs: MONACO_BASE } });
    window.require(['vs/editor/editor.main'], () => {
      monacoApi = window.monaco;
      resolve(monacoApi);
    }, reject);
  });
}

async function registerLanguage() {
  const monaco = await loadMonaco();
  if (monaco.languages.getLanguages().some(lang => lang.id === 'multilingual')) return monaco;

  monaco.languages.register({ id: 'multilingual' });

  const response = await fetch('./assets/monarch.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Could not load monarch.json (${response.status})`);
  const grammar = await response.json();
  if (!grammar || typeof grammar.tokenizer !== 'object' || grammar.tokenizer === null) {
    throw new Error('Invalid monarch.json: missing tokenizer object.');
  }
  monaco.languages.setMonarchTokensProvider('multilingual', grammar);
  monaco.languages.setLanguageConfiguration('multilingual', {
    comments: { lineComment: '#' },
    brackets: grammar.brackets || [['(', ')'], ['[', ']'], ['{', '}']],
    autoClosingPairs: (grammar.autoClosingPairs || []).map(pair =>
      Array.isArray(pair) ? { open: pair[0], close: pair[1] } : pair),
    surroundingPairs: (grammar.surroundingPairs || []).map(pair =>
      Array.isArray(pair) ? { open: pair[0], close: pair[1] } : pair),
  });
  return monaco;
}

function attachResizeObserver() {
  if (!$editorWrapper || resizeObserver || !editor) return;
  resizeObserver = new ResizeObserver(() => resizeEditor());
  resizeObserver.observe($editorWrapper);
  window.addEventListener('resize', resizeEditor);
}

export async function initEditor() {
  if (editorReadyPromise) return editorReadyPromise;
  editorReadyPromise = (async () => {
    const monaco = await registerLanguage();
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    createTheme(theme);
    editor = monaco.editor.create($editorHost, {
      value: '',
      language: 'multilingual',
      automaticLayout: false,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 13.5,
      lineHeight: 22,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'off',
      tabSize: 4,
      insertSpaces: true,
      renderWhitespace: 'selection',
      padding: { top: 10, bottom: 10 },
      unicodeHighlight: {
        ambiguousCharacters: false,
        invisibleCharacters: false,
      },
      theme: theme === 'dark' ? 'ml-dark' : 'ml-light',
    });
    editor.onDidChangeModelContent(() => clearErrorLines());
    errorDecorations = editor.createDecorationsCollection([]);
    attachResizeObserver();
    loadLang('en');
    resizeEditor();
    return editor;
  })();
  return editorReadyPromise;
}

export function resizeEditor() {
  if (!editor || !$editorWrapper) return;
  const width = $editorWrapper.clientWidth || 0;
  const height = $editorWrapper.clientHeight || 0;
  if (width > 0 && height > 0) editor.layout({ width, height });
}

export function loadExample(lang, level) {
  if (!editor) return;
  const map = loadExampleMap(level);
  editor.setValue(map[lang] || map.en || '');
}

export function loadLang(lang) {
  const safeLang = sanitizeLangCode(lang);
  const level = $exampleSel ? $exampleSel.value : 'basics';
  loadExample(safeLang, level);
  if ($badge) $badge.textContent = safeLang;
  setEditorDirection(safeLang);
  updateCompleteFeaturesLink(safeLang);
  applyEditorHighlighting(safeLang);
  resizeEditor();
}

export function applyEditorHighlighting(_lang) {
  if (!editor || !monacoApi) return;
  const model = editor.getModel();
  if (model) monacoApi.editor.setModelLanguage(model, 'multilingual');
}

export function applyEditorTheme(theme) {
  createTheme(theme);
}

export function setRunShortcut(handler) {
  if (!editor || !monacoApi) return;
  editor.addCommand(monacoApi.KeyMod.CtrlCmd | monacoApi.KeyCode.Enter, handler);
}

export function clearErrorLines() {
  if (errorDecorations) errorDecorations.clear();
}

export function highlightErrorLine(errText) {
  clearErrorLines();
  if (!editor || !monacoApi || !errorDecorations) return;
  const match = errText.match(/line[:\s]+(\d+)/i)
    || errText.match(/at line (\d+)/i)
    || errText.match(/:(\d+):/);
  if (!match) return;
  const lineNumber = parseInt(match[1], 10);
  const model = editor.getModel();
  if (!model || lineNumber < 1 || lineNumber > model.getLineCount()) return;
  errorDecorations.set([{
    range: new monacoApi.Range(lineNumber, 1, lineNumber, model.getLineMaxColumn(lineNumber)),
    options: {
      isWholeLine: true,
      className: 'error-line',
      linesDecorationsClassName: 'error-glyph-margin',
    },
  }]);
  editor.revealLineInCenter(lineNumber);
}
