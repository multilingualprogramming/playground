/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

import { initTheme, initThemeToggle } from './theme.js';
import { editor, loadLang, loadExample, initLanguageKeywords, applyEditorHighlighting } from './editor.js';
import { setStatus, initTabs, initResizer, initShareFromUrl, initShareButton, initCopyButtons, initClearButton } from './ui.js';
import { initRuntimes, runCode } from './runtime.js';
import { applyI18n } from './i18n.js';

/* ── Theme ───────────────────────────────────────────────────────── */
initTheme();             // applies persisted / OS theme before editor exists
const resolvedTheme = document.documentElement.getAttribute('data-theme') || 'dark';
editor.setOption('theme', resolvedTheme === 'dark' ? 'dracula' : 'eclipse');
initThemeToggle(editor); // wires the toggle button with the editor reference

/* ── Keyboard shortcuts ──────────────────────────────────────────── */
editor.setOption('extraKeys', {
  'Ctrl-Enter': runCode,
  'Cmd-Enter':  runCode,
});

/* ── Home link ───────────────────────────────────────────────────── */
(function configureHomeLink() {
  const $homeLink = document.getElementById('home-link');
  if (!$homeLink) return;
  $homeLink.href = window.location.pathname.endsWith('/playground/') ? '../' : './';
})();

/* ── Language & example selectors ───────────────────────────────── */
const $lang       = document.getElementById('lang-select');
const $exampleSel = document.getElementById('example-select');
const $runBtn     = document.getElementById('run-btn');

$lang.addEventListener('change', () => {
  const lang = $lang.value;
  loadLang(lang);
  applyI18n(lang);
});
$exampleSel.addEventListener('change', () => loadExample($lang.value, $exampleSel.value));

/* ── Initialise editor content, i18n, and keyword highlighting ───── */
loadLang('en');
applyI18n('en');
initLanguageKeywords().then(() => applyEditorHighlighting($lang.value));

/* ── UI subsystems ───────────────────────────────────────────────── */
document.getElementById('output-console').setAttribute('aria-live', 'polite');
initTabs();
initResizer();
initClearButton();
initCopyButtons();
initShareButton(setStatus);
initShareFromUrl();

/* ── Run button ──────────────────────────────────────────────────── */
$runBtn.addEventListener('click', runCode);

/* ── Boot runtimes ───────────────────────────────────────────────── */
initRuntimes();
