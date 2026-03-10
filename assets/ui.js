/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

import { editor, resizeEditor, loadLang, applyEditorHighlighting } from './editor.js';
import { t } from './i18n.js';

/* ── DOM refs ────────────────────────────────────────────────────── */
const $dot        = document.getElementById('status-dot');
const $status     = document.getElementById('status-text');
const $lang       = document.getElementById('lang-select');
const $main       = document.getElementById('main');
const $resizer    = document.getElementById('resizer');
const $shareBtn   = document.getElementById('share-btn');
const $clearBtn   = document.getElementById('clear-btn');
const $outCon     = document.getElementById('output-console');
const $pyView     = document.getElementById('python-view');
const $watView    = document.getElementById('wat-view');
const $wasmCon    = document.getElementById('wasm-exec-console');
const $rustView   = document.getElementById('rust-view');
const $rustRunCon = document.getElementById('rust-run-console');
const $tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
const $tabPanels  = Array.from(document.querySelectorAll('.tab-panel'));
const splitMediaQuery  = window.matchMedia('(max-width: 800px)');
const SPLIT_RATIO_KEY  = 'ml-playground-split-ratio';

/* ── Status bar ──────────────────────────────────────────────────── */
export function setStatus(msg, state) {
  $status.textContent = msg;
  $dot.className = 'dot ' + state;
}

/* ── Tab switching ───────────────────────────────────────────────── */
export function setActiveTab(tabName, moveFocus = false) {
  $tabButtons.forEach(btn => {
    const active = btn.dataset.tab === tabName;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.setAttribute('tabindex', active ? '0' : '-1');
  });
  $tabPanels.forEach(panel => {
    const active = panel.id === `panel-${tabName}`;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
    if (active && moveFocus) panel.focus({ preventScroll: true });
  });
}

export function initTabs() {
  $tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
    btn.addEventListener('keydown', event => {
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % $tabButtons.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + $tabButtons.length) % $tabButtons.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = $tabButtons.length - 1;
      else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveTab(btn.dataset.tab, true);
        return;
      } else return;
      event.preventDefault();
      $tabButtons[nextIndex].focus();
      setActiveTab($tabButtons[nextIndex].dataset.tab);
    });
  });
  setActiveTab('output');
}

/* ── Drag-to-resize split pane ───────────────────────────────────── */
function clampSplitRatio(value) {
  return Math.max(20, Math.min(80, Number(value) || 50));
}

function isMobileSplitLayout() {
  return splitMediaQuery.matches;
}

function updateResizerAria(value) {
  $resizer.setAttribute('aria-valuenow', String(Math.round(value)));
  $resizer.setAttribute('aria-orientation', isMobileSplitLayout() ? 'horizontal' : 'vertical');
}

function applySplitRatio(value, persist = true) {
  const ratio = clampSplitRatio(value);
  if (isMobileSplitLayout()) {
    $main.style.gridTemplateColumns = '1fr';
    $main.style.gridTemplateRows = `${ratio}fr 12px ${100 - ratio}fr`;
  } else {
    $main.style.gridTemplateRows = '';
    $main.style.gridTemplateColumns = `${ratio}fr 4px ${100 - ratio}fr`;
  }
  updateResizerAria(ratio);
  if (persist) localStorage.setItem(SPLIT_RATIO_KEY, String(Math.round(ratio)));
  resizeEditor();
}

export function initResizer() {
  let dragging = false;

  function updateCursor() {
    document.body.style.cursor = isMobileSplitLayout() ? 'row-resize' : 'col-resize';
  }

  function stopDragging() {
    if (!dragging) return;
    dragging = false;
    $resizer.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  function pointerToRatio(event) {
    const rect = $main.getBoundingClientRect();
    if (isMobileSplitLayout()) return ((event.clientY - rect.top) / rect.height) * 100;
    return ((event.clientX - rect.left) / rect.width) * 100;
  }

  function startDragging(event) {
    dragging = true;
    $resizer.classList.add('dragging');
    updateCursor();
    document.body.style.userSelect = 'none';
    if (event.pointerId !== undefined && $resizer.setPointerCapture) {
      $resizer.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  }

  $resizer.addEventListener('pointerdown', startDragging);
  $resizer.addEventListener('pointermove', event => { if (dragging) applySplitRatio(pointerToRatio(event)); });
  $resizer.addEventListener('pointerup', stopDragging);
  $resizer.addEventListener('pointercancel', stopDragging);

  document.addEventListener('keydown', event => {
    if (document.activeElement !== $resizer) return;
    const step = event.shiftKey ? 10 : 5;
    const current = Number($resizer.getAttribute('aria-valuenow') || '50');
    let next = null;
    if (event.key === 'Home') next = 20;
    if (event.key === 'End') next = 80;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = current - step;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = current + step;
    if (next === null) return;
    event.preventDefault();
    applySplitRatio(next);
  });

  const stored = localStorage.getItem(SPLIT_RATIO_KEY);
  applySplitRatio(stored ? Number(stored) : 50, false);

  if (splitMediaQuery.addEventListener) {
    splitMediaQuery.addEventListener('change', () =>
      applySplitRatio(Number($resizer.getAttribute('aria-valuenow') || '50'), false));
  } else {
    splitMediaQuery.addListener(() =>
      applySplitRatio(Number($resizer.getAttribute('aria-valuenow') || '50'), false));
  }
}

/* ── Share / permalink ───────────────────────────────────────────── */
export function initShareFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  const code = params.get('code');
  if (!lang || !code) return;
  try {
    const decoded = decodeURIComponent(escape(atob(code)));
    const opt = $lang.querySelector(`option[value="${CSS.escape(lang)}"]`);
    if (opt) {
      $lang.value = lang;
      loadLang(lang);
      editor.setValue(decoded);
      applyEditorHighlighting(lang);
    }
  } catch (_) { /* ignore malformed share URL */ }
}

export function initShareButton(setStatusFn) {
  if (!$shareBtn) return;
  $shareBtn.addEventListener('click', () => {
    const code = editor.getValue();
    const lang = $lang.value;
    let encoded;
    try {
      encoded = btoa(unescape(encodeURIComponent(code)));
    } catch (_) {
      setStatusFn(t('share_failed', lang), 'error');
      return;
    }
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set('lang', lang);
    url.searchParams.set('code', encoded);
    navigator.clipboard.writeText(url.toString()).then(() => {
      const prev = $shareBtn.textContent;
      $shareBtn.textContent = t('copied', lang);
      setTimeout(() => { $shareBtn.textContent = prev; }, 2000);
    }).catch(() => { prompt('Copy this link:', url.toString()); });
  });
}

/* ── Copy buttons ────────────────────────────────────────────────── */
export function initCopyButtons() {
  document.querySelectorAll('.copy-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const text = target.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        const prev = btn.textContent;
        btn.textContent = t('copied', $lang.value);
        setTimeout(() => { btn.classList.remove('copied'); btn.textContent = prev; }, 1800);
      }).catch(() => { prompt('Copy this text:', text); });
    });
  });
}

/* ── Clear button ────────────────────────────────────────────────── */
export function initClearButton() {
  if (!$clearBtn) return;
  $clearBtn.addEventListener('click', () => {
    const lang = $lang.value;
    $outCon.className = 'console empty';
    $outCon.textContent = t('out_empty', lang);
    $pyView.textContent = t('out_python_placeholder', lang);
    $watView.textContent = t('out_wat_placeholder', lang);
    $wasmCon.className = 'console empty';
    $wasmCon.textContent = t('out_wasm_placeholder', lang);
    $rustView.textContent = t('out_rust_placeholder', lang);
    $rustRunCon.className = 'console empty';
    $rustRunCon.textContent = t('out_run_hints_placeholder', lang);
    editor.focus();
  });
}
