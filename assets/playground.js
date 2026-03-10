/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

/* ──────────────────────────────────────────────────────────────────
   Language examples — one per supported human language.
   Keywords follow the USM defined in resources/usm/keywords.json.
────────────────────────────────────────────────────────────────── */
const EXAMPLES = {
  en: `# English — arithmetic and loops
let a = 10
let b = 3

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a / b)
print("a % b =", a % b)

for i in range(1, 5):
    print(i, "squared =", i * i)
`,
  fr: `# Français — arithmétique et boucles
soit a = 10
soit b = 3

afficher("a + b =", a + b)
afficher("a - b =", a - b)
afficher("a * b =", a * b)
afficher("a / b =", a / b)
afficher("a % b =", a % b)

pour i dans intervalle(1, 5):
    afficher(i, "au carré =", i * i)
`,
  es: `# Español — aritmética y bucles
sea a = 10
sea b = 3

imprimir("a + b =", a + b)
imprimir("a - b =", a - b)
imprimir("a * b =", a * b)
imprimir("a / b =", a / b)
imprimir("a % b =", a % b)

para i en rango(1, 5):
    imprimir(i, "al cuadrado =", i * i)
`,
  de: `# Deutsch — Arithmetik und Schleifen
sei a = 10
sei b = 3

ausgeben("a + b =", a + b)
ausgeben("a - b =", a - b)
ausgeben("a * b =", a * b)
ausgeben("a / b =", a / b)
ausgeben("a % b =", a % b)

für i in bereich(1, 5):
    ausgeben(i, "Quadrat =", i * i)
`,
  it: `# Italiano — aritmetica e cicli
sia a = 10
sia b = 3

stampa("a + b =", a + b)
stampa("a - b =", a - b)
stampa("a * b =", a * b)
stampa("a / b =", a / b)
stampa("a % b =", a % b)

per x in intervallo(1, 5):
    stampa(x, "al quadrato =", x * x)
`,
  pt: `# Português — aritmética e ciclos
seja a = 10
seja b = 3

imprima("a + b =", a + b)
imprima("a - b =", a - b)
imprima("a * b =", a * b)
imprima("a / b =", a / b)
imprima("a % b =", a % b)

para x em intervalo(1, 5):
    imprima(x, "ao quadrado =", x * x)
`,
  nl: `# Nederlands — rekenen en lussen
laat a = 10
laat b = 3

afdrukken("a + b =", a + b)
afdrukken("a - b =", a - b)
afdrukken("a * b =", a * b)
afdrukken("a / b =", a / b)
afdrukken("a % b =", a % b)

voor x in bereik(1, 5):
    afdrukken(x, "kwadraat =", x * x)
`,
  pl: `# Polski — arytmetyka i pętle
niech a = 10
niech b = 3

drukuj("a + b =", a + b)
drukuj("a - b =", a - b)
drukuj("a * b =", a * b)
drukuj("a / b =", a / b)
drukuj("a % b =", a % b)

dla x w zakres(1, 5):
    drukuj(x, "kwadrat =", x * x)
`,
  sv: `# Svenska — aritmetik och loopar
lat a = 10
lat b = 3

skriv("a + b =", a + b)
skriv("a - b =", a - b)
skriv("a * b =", a * b)
skriv("a / b =", a / b)
skriv("a % b =", a % b)

for x i intervall(1, 5):
    skriv(x, "i kvadrat =", x * x)
`,
  da: `# Dansk — aritmetik og løkker
lad a = 10
lad b = 3

skriv("a + b =", a + b)
skriv("a - b =", a - b)
skriv("a * b =", a * b)
skriv("a / b =", a / b)
skriv("a % b =", a % b)

for x i interval(1, 5):
    skriv(x, "i anden =", x * x)
`,
  fi: `# Suomi — aritmetiikka ja silmukat
olkoon a = 10
olkoon b = 3

tulosta("a + b =", a + b)
tulosta("a - b =", a - b)
tulosta("a * b =", a * b)
tulosta("a / b =", a / b)
tulosta("a % b =", a % b)

jokaiselle x sisalla vali(1, 5):
    tulosta(x, "toiseen =", x * x)
`,
  hi: `# हिन्दी — अंकगणित और लूप
मान a = 10
मान b = 3

छापो("a + b =", a + b)
छापो("a - b =", a - b)
छापो("a * b =", a * b)
छापो("a / b =", a / b)
छापो("a % b =", a % b)

के_लिए x में परास(1, 5):
    छापो(x, "वर्ग =", x * x)
`,
  ar: `# العربية — الحساب والحلقات
ليكن a = 10
ليكن b = 3

اطبع("a + b =", a + b)
اطبع("a - b =", a - b)
اطبع("a * b =", a * b)
اطبع("a / b =", a / b)
اطبع("a % b =", a % b)

لكل x في مدى(1, 5):
    اطبع(x, "تربيع =", x * x)
`,
  bn: `# বাংলা — গাণিতিক হিসাব ও লুপ
ধরি a = 10
ধরি b = 3

ছাপাও("a + b =", a + b)
ছাপাও("a - b =", a - b)
ছাপাও("a * b =", a * b)
ছাপাও("a / b =", a / b)
ছাপাও("a % b =", a % b)

জন্য x মধ্যে পরিসর(1, 5):
    ছাপাও(x, "বর্গ =", x * x)
`,
  ta: `# தமிழ் — கணக்கீடு மற்றும் சுழல்கள்
இருக்கட்டும் a = 10
இருக்கட்டும் b = 3

அச்சிடு("a + b =", a + b)
அச்சிடு("a - b =", a - b)
அச்சிடு("a * b =", a * b)
அச்சிடு("a / b =", a / b)
அச்சிடு("a % b =", a % b)

ஒவ்வொரு x இல் வரம்பு(1, 5):
    அச்சிடு(x, "வர்க்கம் =", x * x)
`,
  zh: `# 中文 — 算术运算和循环
令 a = 10
令 b = 3

打印("a + b =", a + b)
打印("a - b =", a - b)
打印("a * b =", a * b)
打印("a / b =", a / b)
打印("a % b =", a % b)

对于 x 里 范围(1, 5):
    打印(x, "的平方 =", x * x)
`,
  ja: `# 日本語 — 算術演算とループ
変数 a = 10
変数 b = 3

表示("a + b =", a + b)
表示("a - b =", a - b)
表示("a * b =", a * b)
表示("a / b =", a / b)
表示("a % b =", a % b)

毎 x 中 範囲(1, 5):
    表示(x, "の2乗 =", x * x)
`,
};

/* ──────────────────────────────────────────────────────────────────
   Advanced examples — function with if/elif/else in each language.
   Keywords sourced from resources/usm/keywords.json.
────────────────────────────────────────────────────────────────── */
const EXAMPLES_ADVANCED = {
  en: `# English — functions and conditionals
def grade(score):
    if score >= 90:
        return "A"
    elif score >= 70:
        return "B"
    elif score >= 50:
        return "C"
    else:
        return "F"

for i in range(4):
    score = 60 + i * 15
    print("Score", score, "->", grade(score))
`,
  fr: `# Français — fonctions et conditions
déf note(score):
    si score >= 90:
        retour "A"
    sinonsi score >= 70:
        retour "B"
    sinonsi score >= 50:
        retour "C"
    sinon:
        retour "F"

pour i dans intervalle(4):
    score = 60 + i * 15
    afficher("Score", score, "->", note(score))
`,
  es: `# Español — funciones y condicionales
def calificacion(score):
    si score >= 90:
        devolver "A"
    sinosi score >= 70:
        devolver "B"
    sinosi score >= 50:
        devolver "C"
    sino:
        devolver "F"

para i en rango(4):
    score = 60 + i * 15
    imprimir("Puntuacion", score, "->", calificacion(score))
`,
  de: `# Deutsch — Funktionen und Bedingungen
def bewertung(score):
    wenn score >= 90:
        rückgabe "A"
    sonstwenn score >= 70:
        rückgabe "B"
    sonstwenn score >= 50:
        rückgabe "C"
    sonst:
        rückgabe "F"

für i in bereich(4):
    score = 60 + i * 15
    ausgeben("Punkte", score, "->", bewertung(score))
`,
  it: `# Italiano — funzioni e condizioni
definisci voto(score):
    se score >= 90:
        ritorna "A"
    altrimentise score >= 70:
        ritorna "B"
    altrimentise score >= 50:
        ritorna "C"
    altrimenti:
        ritorna "F"

per i in intervallo(4):
    score = 60 + i * 15
    stampa("Punteggio", score, "->", voto(score))
`,
  pt: `# Português — funções e condicionais
defina nota(score):
    se score >= 90:
        retorne "A"
    senão_se score >= 70:
        retorne "B"
    senão_se score >= 50:
        retorne "C"
    senão:
        retorne "F"

para i em intervalo(4):
    score = 60 + i * 15
    imprima("Pontuacao", score, "->", nota(score))
`,
  nl: `# Nederlands — functies en voorwaarden
definieer cijfer(score):
    als score >= 90:
        retourneer "A"
    anders_als score >= 70:
        retourneer "B"
    anders_als score >= 50:
        retourneer "C"
    anders:
        retourneer "F"

voor i in bereik(4):
    score = 60 + i * 15
    afdrukken("Score", score, "->", cijfer(score))
`,
  pl: `# Polski — funkcje i warunki
funkcja ocena(score):
    jesli score >= 90:
        zwroc "A"
    inaczej_jesli score >= 70:
        zwroc "B"
    inaczej_jesli score >= 50:
        zwroc "C"
    inaczej:
        zwroc "F"

dla n w zakres(4):
    score = 60 + n * 15
    drukuj("Wynik", score, "->", ocena(score))
`,
  sv: `# Svenska — funktioner och villkor
definiera betyg(score):
    om score >= 90:
        retur "A"
    annars_om score >= 70:
        retur "B"
    annars_om score >= 50:
        retur "C"
    annars:
        retur "F"

for n i intervall(4):
    score = 60 + n * 15
    skriv("Poang", score, "->", betyg(score))
`,
  da: `# Dansk — funktioner og betingelser
definer karakter(score):
    hvis score >= 90:
        returner "A"
    ellers_hvis score >= 70:
        returner "B"
    ellers_hvis score >= 50:
        returner "C"
    ellers:
        returner "F"

for n i interval(4):
    score = 60 + n * 15
    skriv("Point", score, "->", karakter(score))
`,
  fi: `# Suomi — funktiot ja ehdot
maarittele arvosana(score):
    jos score >= 90:
        palauta "A"
    muuten_jos score >= 70:
        palauta "B"
    muuten_jos score >= 50:
        palauta "C"
    muuten:
        palauta "F"

jokaiselle n sisalla vali(4):
    score = 60 + n * 15
    tulosta("Pisteet", score, "->", arvosana(score))
`,
  hi: `# हिन्दी — फ़ंक्शन और शर्तें
परिभाषा श्रेणी(score):
    अगर score >= 90:
        वापसी "A"
    अन्यथा_अगर score >= 70:
        वापसी "B"
    अन्यथा_अगर score >= 50:
        वापसी "C"
    वरना:
        वापसी "F"

के_लिए i में परास(4):
    score = 60 + i * 15
    छापो("अंक", score, "->", श्रेणी(score))
`,
  ar: `# العربية — دوال وشروط
دالة تقدير(score):
    إذا score >= 90:
        إرجاع "A"
    وإلا_إذا score >= 70:
        إرجاع "B"
    وإلا_إذا score >= 50:
        إرجاع "C"
    وإلا:
        إرجاع "F"

لكل i في مدى(4):
    score = 60 + i * 15
    اطبع("درجة", score, "->", تقدير(score))
`,
  bn: `# বাংলা — ফাংশন এবং শর্ত
সংজ্ঞা গ্রেড(score):
    যদি score >= 90:
        ফেরত "A"
    নাহলে_যদি score >= 70:
        ফেরত "B"
    নাহলে_যদি score >= 50:
        ফেরত "C"
    নাহলে:
        ফেরত "F"

জন্য i মধ্যে পরিসর(4):
    score = 60 + i * 15
    ছাপাও("স্কোর", score, "->", গ্রেড(score))
`,
  ta: `# தமிழ் — செயல்பாடுகள் மற்றும் நிபந்தனைகள்
வரையறு தரம்(score):
    என்றால் score >= 90:
        திருப்பு "A"
    இல்லையென்றால் score >= 70:
        திருப்பு "B"
    இல்லையென்றால் score >= 50:
        திருப்பு "C"
    இல்லை:
        திருப்பு "F"

ஒவ்வொரு i இல் வரம்பு(4):
    score = 60 + i * 15
    அச்சிடு("மதிப்பெண்", score, "->", தரம்(score))
`,
  zh: `# 中文 — 函数与条件
函数 等级(score):
    如果 score >= 90:
        返回 "A"
    否则如果 score >= 70:
        返回 "B"
    否则如果 score >= 50:
        返回 "C"
    否则:
        返回 "F"

对于 i 里 范围(4):
    score = 60 + i * 15
    打印("分数", score, "->", 等级(score))
`,
  ja: `# 日本語 — 関数と条件
関数 等級(score):
    もし score >= 90:
        戻る "A"
    でなければもし score >= 70:
        戻る "B"
    でなければもし score >= 50:
        戻る "C"
    でなければ:
        戻る "F"

毎 i 中 範囲(4):
    score = 60 + i * 15
    表示("スコア", score, "->", 等級(score))
`,
};

/* ──────────────────────────────────────────────────────────────────
   Theme toggle
────────────────────────────────────────────────────────────────── */
const THEME_KEY = 'ml-playground-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-toggle').textContent = 'Theme';
  document.getElementById('theme-toggle').setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
  localStorage.setItem(THEME_KEY, theme);
  // Switch CodeMirror theme. Guard with try/catch because applyTheme() is
  // called by initTheme() before `const editor` is initialized (TDZ).
  // CodeMirror reads data-theme from the DOM on creation, so skipping
  // setOption() during init is safe — it only matters for live toggles.
  try {
    editor.setOption('theme', theme === 'dark' ? 'dracula' : 'eclipse');
  } catch (_) { /* editor not yet initialized */ }
}

(function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(stored || preferred);
})();

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ──────────────────────────────────────────────────────────────────
   DOM refs
────────────────────────────────────────────────────────────────── */
const $lang = document.getElementById('lang-select');
const $exampleSel = document.getElementById('example-select');
const $runBtn = document.getElementById('run-btn');
const $clearBtn = document.getElementById('clear-btn');
const $shareBtn = document.getElementById('share-btn');
const $dot = document.getElementById('status-dot');
const $status = document.getElementById('status-text');
const $badge = document.getElementById('lang-badge');
const $outCon = document.getElementById('output-console');
const $pyView = document.getElementById('python-view');
const $watView = document.getElementById('wat-view');
const $wasmCon = document.getElementById('wasm-exec-console');
const $rustView = document.getElementById('rust-view');
const $rustRunCon = document.getElementById('rust-run-console');
const $exampleLink = document.getElementById('complete-features-link');
const $packageVersion = document.getElementById('package-version');
const $homeLink = document.getElementById('home-link');
const $main = document.getElementById('main');
const $resizer = document.getElementById('resizer');
const $tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
const $tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
const splitMediaQuery = window.matchMedia('(max-width: 800px)');
const SPLIT_RATIO_KEY = 'ml-playground-split-ratio';

function configureHomeLink() {
  if (!$homeLink) return;
  const path = window.location.pathname || '';
  if (path.endsWith('/playground/')) {
    $homeLink.href = '../';
  } else {
    $homeLink.href = './';
  }
}
configureHomeLink();

/* ──────────────────────────────────────────────────────────────────
   CodeMirror editor
────────────────────────────────────────────────────────────────── */
const currentTheme = document.documentElement.getAttribute('data-theme');
const editor = CodeMirror.fromTextArea(
  document.getElementById('code-area'),
  {
    mode: 'python',
    theme: currentTheme === 'dark' ? 'dracula' : 'eclipse',
    lineNumbers: true,
    indentUnit: 4, tabSize: 4, indentWithTabs: false,
    lineWrapping: false, autofocus: true,
    extraKeys: { 'Ctrl-Enter': runCode, 'Cmd-Enter': runCode },
  }
);

editor.getWrapperElement().setAttribute('role', 'textbox');
editor.getWrapperElement().setAttribute('aria-multiline', 'true');
editor.getWrapperElement().setAttribute('aria-labelledby', 'editor-pane-title');
editor.getInputField().setAttribute('aria-label', 'Source code editor');
$outCon.setAttribute('aria-live', 'polite');

function resizeEditor() {
  const w = document.getElementById('editor-wrapper');
  editor.setSize('100%', w.clientHeight);
}
window.addEventListener('resize', resizeEditor);
setTimeout(resizeEditor, 60);

/* ──────────────────────────────────────────────────────────────────
   Drag-to-resize split pane
────────────────────────────────────────────────────────────────── */
function clampSplitRatio(value) {
  return Math.max(20, Math.min(80, Number(value) || 50));
}

function isMobileSplitLayout() {
  return splitMediaQuery.matches;
}

function persistSplitRatio(value) {
  localStorage.setItem(SPLIT_RATIO_KEY, String(Math.round(value)));
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
  if (persist) {
    persistSplitRatio(ratio);
  }
  resizeEditor();
}

(function initResizer() {
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
    if (isMobileSplitLayout()) {
      return ((event.clientY - rect.top) / rect.height) * 100;
    }
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

  $resizer.addEventListener('pointermove', event => {
    if (!dragging) return;
    applySplitRatio(pointerToRatio(event));
  });

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
    splitMediaQuery.addEventListener('change', () => applySplitRatio(Number($resizer.getAttribute('aria-valuenow') || '50'), false));
  } else {
    splitMediaQuery.addListener(() => applySplitRatio(Number($resizer.getAttribute('aria-valuenow') || '50'), false));
  }
})();

/* ──────────────────────────────────────────────────────────────────
   Language selection
────────────────────────────────────────────────────────────────── */
function loadExample(lang, level) {
  const map = level === 'advanced' ? EXAMPLES_ADVANCED : EXAMPLES;
  editor.setValue(map[lang] || map.en);
}

function loadLang(lang) {
  const level = $exampleSel ? $exampleSel.value : 'basics';
  loadExample(lang, level);
  $badge.textContent = lang;
  editor.getWrapperElement().style.direction = lang === 'ar' ? 'rtl' : 'ltr';
  editor.setOption('lineWrapping', lang === 'ar');
  applyEditorHighlighting(lang);
  updateCompleteFeaturesLink(lang);
  editor.refresh();
}
$lang.addEventListener('change', () => loadLang($lang.value));
$exampleSel.addEventListener('change', () => loadExample($lang.value, $exampleSel.value));

function updateCompleteFeaturesLink(lang) {
  if (!$exampleLink) return;
  const langCode = lang || 'en';
  $exampleLink.href = `https://github.com/johnsamuelwrites/multilingual/blob/main/examples/complete_features_${langCode}.ml`;
  $exampleLink.textContent = `📘 Complete features (${langCode}) ✨`;
}

let languageKeywords = new Map();
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
    } catch (_) {
      /* try next candidate */
    }
  }
  return null;
}

function buildKeywordOverlay(keywords) {
  const sorted = keywords.slice().sort((a, b) => b.length - a.length);

  return {
    token(stream) {
      const line = stream.string;
      const start = stream.pos;
      const prev = start > 0 ? line.charAt(start - 1) : '';
      if (isWordChar(prev)) {
        stream.next();
        return null;
      }

      for (const keyword of sorted) {
        if (!line.startsWith(keyword, start)) continue;
        const next = line.charAt(start + keyword.length);
        if (!isWordChar(next)) {
          stream.pos += keyword.length;
          return 'keyword';
        }
      }

      stream.next();
      return null;
    },
  };
}

function applyKeywordOnlyMode(lang, keywords) {
  const modeName = `ml-keywords-${lang}`;
  if (!CodeMirror.modes[modeName]) {
    const keywordSet = new Set(keywords);
    const isDigit = (ch) => !!ch && ch >= '0' && ch <= '9';
    const isOperator = (ch) => !!ch && /[+\-*/%=<>!&|^~:,.[\](){}]/.test(ch);
    CodeMirror.defineMode(modeName, () => ({
      token(stream) {
        const ch = stream.peek();
        if (!ch) return null;
        if (/\s/.test(ch)) {
          stream.next();
          return null;
        }
        if (ch === '#') {
          stream.skipToEnd();
          return 'comment';
        }
        if (ch === '"' || ch === "'") {
          const quote = stream.next();
          let escaped = false;
          while (!stream.eol()) {
            const c = stream.next();
            if (escaped) {
              escaped = false;
              continue;
            }
            if (c === '\\') {
              escaped = true;
              continue;
            }
            if (c === quote) break;
          }
          return 'string';
        }
        if (isDigit(ch)) {
          stream.eatWhile(/[0-9._]/);
          return 'number';
        }
        if (isWordChar(ch)) {
          let word = '';
          while (!stream.eol() && isWordChar(stream.peek())) {
            word += stream.next();
          }
          return keywordSet.has(word) ? 'keyword' : null;
        }
        if (isOperator(ch)) {
          stream.next();
          return 'operator';
        }
        stream.next();
        return null;
      },
    }));
  }
  editor.setOption('mode', modeName);
  editor.refresh();
}

function applyEditorHighlighting(lang) {
  const keywords = languageKeywords.get(lang);

  if (!keywords || !keywords.length || lang === 'en') {
    editor.setOption('mode', 'python');
    editor.refresh();
    return;
  }

  // Use a dedicated mode for multilingual keywords to avoid overlay edge cases.
  applyKeywordOnlyMode(lang, keywords);
}

async function initLanguageKeywords() {
  const spec = await fetchKeywordSpec();
  if (!spec) {
    console.warn('Could not load keywords.json; using default python highlighting.');
    return;
  }

  ($lang ? Array.from($lang.options).map(opt => opt.value) : []).forEach(code => {
    languageKeywords.set(code, extractKeywordsForLanguage(spec, code));
  });
}

loadLang('en');
initLanguageKeywords().then(() => applyEditorHighlighting($lang.value));

/* ──────────────────────────────────────────────────────────────────
   Status helpers
────────────────────────────────────────────────────────────────── */
function setStatus(msg, state) {
  $status.textContent = msg;
  $dot.className = 'dot ' + state;
}

/* ──────────────────────────────────────────────────────────────────
   Tab switching
────────────────────────────────────────────────────────────────── */
function setActiveTab(tabName, moveFocus = false) {
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
    if (active && moveFocus) {
      panel.focus({ preventScroll: true });
    }
  });
}

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
    } else {
      return;
    }

    event.preventDefault();
    $tabButtons[nextIndex].focus();
    setActiveTab($tabButtons[nextIndex].dataset.tab);
  });
});

setActiveTab('output');

/* ──────────────────────────────────────────────────────────────────
   Runtime state
────────────────────────────────────────────────────────────────── */
let pyodide = null;
let wabt = null;
let ready = false;
const SUPPORTED_LANGS = Array.from($lang.options).map(opt => opt.value);

/* ──────────────────────────────────────────────────────────────────
   Initialise both runtimes in parallel
────────────────────────────────────────────────────────────────── */
async function initRuntimes() {
  setStatus('Loading Pyodide and wabt.js…', 'loading');
  $runBtn.disabled = true;

  try {
    const [pyRes, wabtRes] = await Promise.allSettled([
      initPyodide(),
      initWabt(),
    ]);

    if (pyRes.status === 'rejected') throw new Error('Pyodide: ' + pyRes.reason);
    if (wabtRes.status === 'rejected') console.warn('wabt.js failed:', wabtRes.reason);

    ready = true;
    $runBtn.disabled = false;
    const wabtNote = wabt ? '' : ' (wabt unavailable - WAT execution disabled)';
    setStatus('Ready ✓  Pyodide + wabt.js' + wabtNote, 'ready');
  } catch (err) {
    setStatus('Init error: ' + err.message, 'error');
    console.error(err);
  }
}

/* ── Pyodide init ──────────────────────────────────────────────── */
async function initPyodide() {
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
  });
  setStatus('Pyodide ready - installing packages...', 'loading');
  await pyodide.loadPackage('micropip');
  const micropip = pyodide.pyimport('micropip');
  await micropip.install('roman');
  await micropip.install('python-dateutil');

  let installed = false;
  try {
    const resp = await fetch('./assets/wheel_info.json');
    if (resp.ok) {
      const info = await resp.json();
      const url = new URL('./assets/' + info.wheel, window.location.href).href;
      await micropip.install(url);
      installed = true;
    }
  } catch (_) { /* wheel_info.json not present */ }

  if (!installed) {
    await micropip.install('multilingualprogramming');
  }

  await pyodide.runPythonAsync(`
from multilingualprogramming.version import __version__
from multilingualprogramming.codegen.executor import ProgramExecutor
from multilingualprogramming.codegen.wat_generator import WATCodeGenerator
from multilingualprogramming.codegen.wasm_generator import WasmCodeGenerator
from multilingualprogramming.lexer.lexer import Lexer
from multilingualprogramming.parser.parser import Parser
_pkg_version = __version__
`);

  const pkgVersion = pyodide.globals.get('_pkg_version');
  if ($packageVersion) {
    $packageVersion.textContent = pkgVersion || 'unknown';
  }
}

function getWabtFactory() {
  if (typeof globalThis.WabtModule === 'function') return globalThis.WabtModule;
  if (typeof globalThis.wabt === 'function') return globalThis.wabt;
  return null;
}

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function initWabt() {
  const existingFactory = getWabtFactory();
  if (existingFactory) {
    wabt = await existingFactory();
    return;
  }

  const cdnCandidates = [
    'https://cdn.jsdelivr.net/npm/wabt@1.0.38/index.js',
    'https://unpkg.com/wabt@1.0.38/index.js',
  ];

  for (const src of cdnCandidates) {
    try {
      await loadExternalScript(src);
      const factory = getWabtFactory();
      if (factory) {
        wabt = await factory();
        return;
      }
    } catch (err) {
      console.warn('Unable to load wabt.js from', src, err);
    }
  }

  throw new Error('Could not load wabt.js from available CDNs');
}

async function runCode() {
  if (!ready) {
    setStatus('Still loading...', 'loading');
    return;
  }

  const code = editor.getValue().replace(/\r\n/g, '\n');
  $runBtn.disabled = true;
  setStatus('Running...', 'loading');

  $outCon.className = 'console';
  $outCon.textContent = '';
  $pyView.textContent = '';
  $watView.textContent = '';
  $wasmCon.className = 'console';
  $wasmCon.textContent = '';
  $rustView.textContent = '';
  $rustRunCon.className = 'console';
  $rustRunCon.textContent = '';

  const lang = $lang.value;

  try {
    pyodide.globals.set('_user_code', code);
    pyodide.globals.set('_user_lang', lang);
    pyodide.globals.set('_supported_langs', SUPPORTED_LANGS);

    await pyodide.runPythonAsync(`
from multilingualprogramming.codegen.executor import ProgramExecutor
from multilingualprogramming.codegen.runtime_builtins import make_exec_globals
import ast
import contextlib
import io

_ALL_LANGS = list(_supported_langs)

class _AsyncioRunRewriter(ast.NodeTransformer):
    def __init__(self):
        self.changed = False

    def visit_Call(self, node):
        self.generic_visit(node)
        if (
            isinstance(node.func, ast.Attribute)
            and isinstance(node.func.value, ast.Name)
            and node.func.value.id == 'asyncio'
            and node.func.attr == 'run'
            and len(node.args) == 1
            and not node.keywords
        ):
            self.changed = True
            return ast.copy_location(ast.Await(value=node.args[0]), node)
        return node

async def _execute_with_top_level_await(_python_source, _language):
    from pyodide.code import eval_code_async

    _tree = ast.parse(_python_source, filename='<multilingual>', mode='exec')
    _rewriter = _AsyncioRunRewriter()
    _tree = _rewriter.visit(_tree)
    ast.fix_missing_locations(_tree)
    _stdout = io.StringIO()
    _globals = make_exec_globals(_language)

    with contextlib.redirect_stdout(_stdout):
        if _rewriter.changed:
            await eval_code_async(ast.unparse(_tree), globals=_globals)
        else:
            exec(compile(_python_source, '<multilingual>', 'exec'), _globals)

    return _stdout.getvalue()

_exec = ProgramExecutor(language=_user_lang)
_result = _exec.execute(_user_code)
_detected_lang = _user_lang

if not _result.success and _result.errors and any('ParseError' in str(e) for e in _result.errors):
    for _try_lang in _ALL_LANGS:
        if _try_lang == _user_lang:
            continue
        _try_exec = ProgramExecutor(language=_try_lang)
        _try_result = _try_exec.execute(_user_code)
        if _try_result.success:
            _result = _try_result
            _detected_lang = _try_lang
            break

_psrc = _result.python_source or ''
if (
    not _result.success
    and _psrc
    and _result.errors
    and any('asyncio.run() cannot be called from a running event loop' in str(e)
            for e in _result.errors)
):
    try:
        _out = await _execute_with_top_level_await(_psrc, _detected_lang)
        _errs = ''
        _ok = True
    except Exception as _async_exc:
        _out = _result.output or ''
        _errs = '\\n'.join(_result.errors + [f'{type(_async_exc).__name__}: {_async_exc}'])
        _ok = False
else:
    _out = _result.output or ''
    _errs = '\\n'.join(_result.errors) if _result.errors else ''
    _ok = _result.success
`);

    const out = pyodide.globals.get('_out');
    const psrc = pyodide.globals.get('_psrc');
    const errs = pyodide.globals.get('_errs');
    const ok = pyodide.globals.get('_ok');
    const detectedLang = pyodide.globals.get('_detected_lang');

    if (detectedLang && detectedLang !== lang) {
      $lang.value = detectedLang;
      loadLang(detectedLang);
      $outCon.className = 'console has-warning';
      $outCon.textContent =
        `Language auto-detected as '${detectedLang}' (was '${lang}'). ` +
        `Language selector updated.\n\n` + (out || '(no output)');
      $pyView.textContent = psrc || '(no Python source generated)';
    } else if (!ok && errs) {
      $outCon.className = 'console has-error';
      $outCon.textContent = 'Warning: ' + errs;
      $pyView.textContent = psrc || '(no Python source generated)';
      highlightErrorLine(errs);
    } else if (out) {
      $outCon.textContent = out;
      $pyView.textContent = psrc || '(no Python source generated)';
    } else {
      $outCon.className = 'console empty';
      $outCon.textContent = '(no output)';
      $pyView.textContent = psrc || '(no Python source generated)';
    }

    await pyodide.runPythonAsync(`
from multilingualprogramming.codegen.wat_generator import WATCodeGenerator
from multilingualprogramming.lexer.lexer import Lexer
from multilingualprogramming.parser.parser import Parser

try:
    _lex = Lexer(_user_code, language=_detected_lang)
    _toks = _lex.tokenize()
    _par = Parser(_toks, source_language=_detected_lang)
    _prog = _par.parse()
    _wgen = WATCodeGenerator()
    _wat = _wgen.generate(_prog)
    _wat_err = ''
except Exception as _we:
    _wat = ''
    _wat_err = str(_we)
`);

    const watSrc = pyodide.globals.get('_wat');
    const watErr = pyodide.globals.get('_wat_err');

    if (watErr && !watSrc) {
      $watView.textContent = ';; WATCodeGenerator error:\n;; ' + watErr;
      $wasmCon.className = 'console has-error';
      $wasmCon.textContent = 'WAT generation failed: ' + watErr;
    } else {
      $watView.textContent = watSrc;
      if (wabt && watSrc) {
        await runWat(watSrc);
      } else if (!wabt) {
        $wasmCon.className = 'console has-error';
        $wasmCon.textContent = 'wabt.js did not load - WAT execution unavailable.\n'
          + 'You can paste the WAT above into https://webassembly.github.io/wabt/demo/wat2wasm/';
      }
    }

    await pyodide.runPythonAsync(`
from multilingualprogramming.codegen.wasm_generator import WasmCodeGenerator
from multilingualprogramming.lexer.lexer import Lexer
from multilingualprogramming.parser.parser import Parser

try:
    _lex_r = Lexer(_user_code, language=_detected_lang)
    _toks_r = _lex_r.tokenize()
    _par_r = Parser(_toks_r, source_language=_detected_lang)
    _prog_r = _par_r.parse()
    _rgen = WasmCodeGenerator()
    _rust = _rgen.generate(_prog_r)
    _rust_err = ''
except Exception as _re:
    _rust = ''
    _rust_err = str(_re)
`);

    const rustSrc = pyodide.globals.get('_rust');
    const rustErr = pyodide.globals.get('_rust_err');

    if (rustErr && !rustSrc) {
      $rustView.textContent = '// Rust generator error:\n// ' + rustErr;
      $rustRunCon.className = 'console has-error';
      $rustRunCon.textContent = 'Rust bridge generation failed: ' + rustErr;
    } else if (rustSrc) {
      $rustView.textContent = rustSrc;
      $rustRunCon.className = 'console';
      $rustRunCon.textContent =
        `How to run with Wasmtime locally:\n` +
        `1. Save this Rust source as src/lib.rs in a Rust crate.\n` +
        `2. Build to WASM:\n   cargo build --release --target wasm32-unknown-unknown\n` +
        `3. Run with Wasmtime (example exported symbol):\n` +
        `   wasmtime run --invoke __multilingual_wasm_version target/wasm32-unknown-unknown/release/<crate_name>.wasm\n\n` +
        `Note: this generated Rust is a bridge scaffold (function bodies are placeholders).`;
    } else {
      $rustView.textContent = '(no Rust source generated)';
      $rustRunCon.className = 'console empty';
      $rustRunCon.textContent = 'Local run instructions will appear here.';
    }

    clearErrorLines();
    setStatus('Done', 'ready');
  } catch (err) {
    $outCon.className = 'console has-error';
    $outCon.textContent = 'Warning: ' + err.message;
    highlightErrorLine(err.message);
    setStatus('Error', 'error');
    console.error(err);
  } finally {
    $runBtn.disabled = false;
  }
}
async function runWat(watText) {
  const dec = new TextDecoder();
  const wasmLines = [];
  let wasmErr = '';

  const memory = { buffer: null };
  const printBuf = [];
  const imports = {
    env: {
      print_str: (ptr, len) => {
        if (!memory.buffer) return;
        const bytes = new Uint8Array(memory.buffer, ptr, len);
        printBuf.push(dec.decode(bytes));
      },
      print_f64: (val) => {
        printBuf.push(Number.isInteger(val) ? String(val) : String(val));
      },
      print_bool: (val) => {
        printBuf.push(val ? 'True' : 'False');
      },
      print_sep: () => {
        printBuf.push(' ');
      },
      print_newline: () => {
        wasmLines.push(printBuf.join(''));
        printBuf.length = 0;
      },
      pow_f64: (base, exp) => Math.pow(base, exp),
    },
  };

  function summarizeParseWatError(message) {
    if (!message || !message.includes('parseWat failed')) return '';

    const undefinedFunctions = new Set();
    const undefinedLocals = new Set();
    let firstLocation = '';

    message.split('\n').forEach(line => {
      const locMatch = line.match(/module\.wat:\d+:\d+:/);
      if (!firstLocation && locMatch) {
        firstLocation = locMatch[0];
      }
      const fnMatch = line.match(/undefined function variable "\$([^"]+)"/);
      if (fnMatch) undefinedFunctions.add(fnMatch[1]);
      const localMatch = line.match(/undefined local variable "\$([^"]+)"/);
      if (localMatch) undefinedLocals.add(localMatch[1]);
    });

    if (!undefinedFunctions.size && !undefinedLocals.size) return '';

    const fnList = Array.from(undefinedFunctions).slice(0, 8).join(', ');
    const localList = Array.from(undefinedLocals).slice(0, 8).join(', ');
    const fnMore = undefinedFunctions.size > 8 ? '...' : '';
    const localMore = undefinedLocals.size > 8 ? '...' : '';

    let summary = 'WAT contains unresolved symbols and cannot be compiled to WASM.';
    if (firstLocation) summary += `\nFirst parser location: ${firstLocation}`;
    if (undefinedFunctions.size) {
      summary += `\nUndefined functions (${undefinedFunctions.size}): ${fnList}${fnMore}`;
    }
    if (undefinedLocals.size) {
      summary += `\nUndefined locals (${undefinedLocals.size}): ${localList}${localMore}`;
    }
    summary += '\nThis usually happens when the generated WAT includes high-level constructs not lowered to plain WAT.';
    return summary;
  }

  try {
    const wabtModule = wabt.parseWat('module.wat', watText, {
      mutable_globals: true, sat_float_to_int: true,
      sign_extension: true, bulk_memory: false,
    });
    wabtModule.resolveNames();
    wabtModule.validate();

    const { buffer: wasmBytes } = wabtModule.toBinary({ log: false, write_debug_names: true });
    const compiled = await WebAssembly.compile(wasmBytes);
    const instance = await WebAssembly.instantiate(compiled, imports);

    if (instance.exports.memory) {
      memory.buffer = instance.exports.memory.buffer;
    }

    if (instance.exports.__main) {
      instance.exports.__main();
      if (printBuf.length) {
        wasmLines.push(printBuf.join(''));
        printBuf.length = 0;
      }
    } else {
      wasmLines.push('(module exported no __main — define top-level statements or functions)');
    }
  } catch (err) {
    wasmErr = err.message;
  }

  if (wasmErr) {
    const concise = summarizeParseWatError(wasmErr);
    $wasmCon.className = 'console has-error';
    $wasmCon.textContent = '⚠ WASM error: ' + (concise || wasmErr)
      + '\n\nNote: strings, classes, imports and other high-level constructs\n'
      + 'are not representable as plain WAT — see the Output tab for full execution.';
    if (concise) {
      console.warn('Full parseWat error details:\n' + wasmErr);
    }
  } else if (wasmLines.length) {
    $wasmCon.textContent = wasmLines.join('\n');
  } else {
    $wasmCon.className = 'console empty';
    $wasmCon.textContent = '(no output from WASM execution)';
  }
}

/* ──────────────────────────────────────────────────────────────────
   Clear button
────────────────────────────────────────────────────────────────── */
$clearBtn.addEventListener('click', () => {
  $outCon.className = 'console empty';
  $outCon.textContent = 'Output will appear here after clicking ▶ Run.';
  $pyView.textContent = 'Generated Python source will appear here.';
  $watView.textContent = 'WAT source will appear here after clicking ▶ Run.';
  $wasmCon.className = 'console empty';
  $wasmCon.textContent = 'WASM execution output will appear here.';
  $rustView.textContent = 'Generated Rust source will appear here after clicking ▶ Run.';
  $rustRunCon.className = 'console empty';
  $rustRunCon.textContent = 'Local run instructions will appear here.';
  editor.focus();
});

$runBtn.addEventListener('click', runCode);

/* ──────────────────────────────────────────────────────────────────
   Error line highlighting
────────────────────────────────────────────────────────────────── */
function clearErrorLines() {
  for (let i = 0; i < editor.lineCount(); i++) {
    editor.removeLineClass(i, 'background', 'error-line');
  }
}

function highlightErrorLine(errText) {
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

/* ──────────────────────────────────────────────────────────────────
   Share / permalink
────────────────────────────────────────────────────────────────── */
function initShareFromUrl() {
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

$shareBtn.addEventListener('click', () => {
  const code = editor.getValue();
  const lang = $lang.value;
  let encoded;
  try {
    encoded = btoa(unescape(encodeURIComponent(code)));
  } catch (_) {
    setStatus('Share failed: code could not be encoded.', 'error');
    return;
  }
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('lang', lang);
  url.searchParams.set('code', encoded);
  navigator.clipboard.writeText(url.toString()).then(() => {
    const prev = $shareBtn.textContent;
    $shareBtn.textContent = '✓ Copied!';
    setTimeout(() => { $shareBtn.textContent = prev; }, 2000);
  }).catch(() => {
    prompt('Copy this link:', url.toString());
  });
});

/* ──────────────────────────────────────────────────────────────────
   Copy buttons
────────────────────────────────────────────────────────────────── */
document.querySelectorAll('.copy-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    const text = target.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const prev = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = prev;
      }, 1800);
    }).catch(() => {
      prompt('Copy this text:', text);
    });
  });
});

/* ──────────────────────────────────────────────────────────────────
   Boot
────────────────────────────────────────────────────────────────── */
initShareFromUrl();
initRuntimes();

