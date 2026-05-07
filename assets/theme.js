/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

const THEME_KEY = 'ml-playground-theme';
const $themeToggle = document.getElementById('theme-toggle');

/**
 * Apply a theme to the page. Optionally updates the editor instance
 * if one is provided.
 */
export function applyTheme(theme, editorInstance) {
  document.documentElement.setAttribute('data-theme', theme);
  if ($themeToggle) {
    $themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    $themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
  localStorage.setItem(THEME_KEY, theme);
  if (editorInstance) {
    try {
      if (typeof editorInstance.setTheme === 'function') editorInstance.setTheme(theme);
      else if (typeof editorInstance.updateOptions === 'function') {
        editorInstance.updateOptions({ theme: theme === 'dark' ? 'ml-dark' : 'ml-light' });
      }
    } catch (_) { /* editor not yet initialized */ }
  }
}

/** Read persisted or OS-preferred theme, apply it, and return the value. */
export function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const theme = stored || preferred;
  applyTheme(theme); // editor not available yet — that's fine
  return theme;
}

export function initThemeToggle(editorInstance) {
  if (!$themeToggle) return;
  $themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark', editorInstance);
  });
}
