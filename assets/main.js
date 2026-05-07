/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

import { initTheme, initThemeToggle } from './theme.js';
import { initEditor, editor, loadLang, loadExample, applyEditorHighlighting, applyEditorTheme, setRunShortcut } from './editor.js';
import { setStatus, initTabs, initResizer, initShareFromUrl, initShareButton, initCopyButtons, initClearButton } from './ui.js';
import { initRuntimes, runCode } from './runtime.js';
import { applyI18n } from './i18n.js';

async function bootstrap() {
  initTheme();
  await initEditor();

  const themeBridge = {
    setTheme(theme) {
      applyEditorTheme(theme);
    },
  };

  initThemeToggle(themeBridge);
  applyEditorTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  setRunShortcut(runCode);

  (function configureHomeLink() {
    const $homeLink = document.getElementById('home-link');
    if (!$homeLink) return;
    $homeLink.href = window.location.pathname.endsWith('/playground/') ? '../' : './';
  })();

  const $lang = document.getElementById('lang-select');
  const $exampleSel = document.getElementById('example-select');
  const $runBtn = document.getElementById('run-btn');

  $lang.addEventListener('change', () => {
    const lang = $lang.value;
    loadLang(lang);
    applyI18n(lang);
  });
  $exampleSel.addEventListener('change', () => loadExample($lang.value, $exampleSel.value));

  applyI18n('en');
  applyEditorHighlighting('en');

  document.getElementById('output-console').setAttribute('aria-live', 'polite');
  initTabs();
  initResizer();
  initClearButton();
  initCopyButtons();
  initShareButton(setStatus);
  initShareFromUrl();

  $runBtn.addEventListener('click', runCode);
  initRuntimes();
}

bootstrap().catch(err => {
  console.error(err);
  setStatus('Editor init error: ' + err.message, 'error');
  const runBtn = document.getElementById('run-btn');
  if (runBtn) runBtn.disabled = true;
  if (editor) editor.updateOptions({ readOnly: true });
});
