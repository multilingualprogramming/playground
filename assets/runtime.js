/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

import { editor, loadLang, applyEditorHighlighting, highlightErrorLine, clearErrorLines } from './editor.js';
import { setStatus } from './ui.js';

/* ── DOM refs used by the runtime ───────────────────────────────── */
const $lang        = document.getElementById('lang-select');
const $runBtn      = document.getElementById('run-btn');
const $outCon      = document.getElementById('output-console');
const $pyView      = document.getElementById('python-view');
const $watView     = document.getElementById('wat-view');
const $wasmCon     = document.getElementById('wasm-exec-console');
const $rustView    = document.getElementById('rust-view');
const $rustRunCon  = document.getElementById('rust-run-console');
const $pkgVersion  = document.getElementById('package-version');

const SUPPORTED_LANGS = Array.from($lang.options).map(opt => opt.value);

/* ── Runtime state ───────────────────────────────────────────────── */
let pyodide = null;
let wabt    = null;
let ready   = false;

/* ── Bootstrap both runtimes in parallel ────────────────────────── */
export async function initRuntimes() {
  setStatus('Loading Pyodide and wabt.js…', 'loading');
  $runBtn.disabled = true;
  try {
    const [pyRes, wabtRes] = await Promise.allSettled([initPyodide(), initWabt()]);
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

/* ── Pyodide ─────────────────────────────────────────────────────── */
async function initPyodide() {
  pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/' });
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

  if (!installed) await micropip.install('multilingualprogramming');

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
  if ($pkgVersion) $pkgVersion.textContent = pkgVersion || 'unknown';
}

/* ── wabt.js ─────────────────────────────────────────────────────── */
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
  if (existingFactory) { wabt = await existingFactory(); return; }

  const cdnCandidates = [
    'https://cdn.jsdelivr.net/npm/wabt@1.0.38/index.js',
    'https://unpkg.com/wabt@1.0.38/index.js',
  ];
  for (const src of cdnCandidates) {
    try {
      await loadExternalScript(src);
      const factory = getWabtFactory();
      if (factory) { wabt = await factory(); return; }
    } catch (err) {
      console.warn('Unable to load wabt.js from', src, err);
    }
  }
  throw new Error('Could not load wabt.js from available CDNs');
}

/* ── Main execution pipeline ─────────────────────────────────────── */
export async function runCode() {
  if (!ready) { setStatus('Still loading...', 'loading'); return; }

  const code = editor.getValue().replace(/\r\n/g, '\n');
  $runBtn.disabled = true;
  setStatus('Running...', 'loading');

  $outCon.className   = 'console';  $outCon.textContent   = '';
  $pyView.textContent = '';
  $watView.textContent = '';
  $wasmCon.className  = 'console';  $wasmCon.textContent  = '';
  $rustView.textContent = '';
  $rustRunCon.className = 'console'; $rustRunCon.textContent = '';

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

    const out          = pyodide.globals.get('_out');
    const psrc         = pyodide.globals.get('_psrc');
    const errs         = pyodide.globals.get('_errs');
    const ok           = pyodide.globals.get('_ok');
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

/* ── WAT → WASM execution ────────────────────────────────────────── */
async function runWat(watText) {
  const dec = new TextDecoder();
  const wasmLines = [];
  let wasmErr = '';

  const memory = { buffer: null };
  const printBuf = [];
  const imports = {
    env: {
      print_str:  (ptr, len) => { if (!memory.buffer) return; printBuf.push(dec.decode(new Uint8Array(memory.buffer, ptr, len))); },
      print_f64:  (val) => { printBuf.push(Number.isInteger(val) ? String(val) : String(val)); },
      print_bool: (val) => { printBuf.push(val ? 'True' : 'False'); },
      print_sep:  ()    => { printBuf.push(' '); },
      print_newline: () => { wasmLines.push(printBuf.join('')); printBuf.length = 0; },
      pow_f64: (base, exp) => Math.pow(base, exp),
    },
  };

  function summarizeParseWatError(message) {
    if (!message || !message.includes('parseWat failed')) return '';
    const undefinedFunctions = new Set();
    const undefinedLocals    = new Set();
    let firstLocation = '';
    message.split('\n').forEach(line => {
      const locMatch = line.match(/module\.wat:\d+:\d+:/);
      if (!firstLocation && locMatch) firstLocation = locMatch[0];
      const fnMatch = line.match(/undefined function variable "\$([^"]+)"/);
      if (fnMatch) undefinedFunctions.add(fnMatch[1]);
      const localMatch = line.match(/undefined local variable "\$([^"]+)"/);
      if (localMatch) undefinedLocals.add(localMatch[1]);
    });
    if (!undefinedFunctions.size && !undefinedLocals.size) return '';
    const fnList    = Array.from(undefinedFunctions).slice(0, 8).join(', ');
    const localList = Array.from(undefinedLocals).slice(0, 8).join(', ');
    const fnMore    = undefinedFunctions.size > 8 ? '...' : '';
    const localMore = undefinedLocals.size > 8 ? '...' : '';
    let summary = 'WAT contains unresolved symbols and cannot be compiled to WASM.';
    if (firstLocation) summary += `\nFirst parser location: ${firstLocation}`;
    if (undefinedFunctions.size) summary += `\nUndefined functions (${undefinedFunctions.size}): ${fnList}${fnMore}`;
    if (undefinedLocals.size)    summary += `\nUndefined locals (${undefinedLocals.size}): ${localList}${localMore}`;
    summary += '\nThis usually happens when the generated WAT includes high-level constructs not lowered to plain WAT.';
    return summary;
  }

  try {
    const wabtModule = wabt.parseWat('module.wat', watText, {
      mutable_globals: true, sat_float_to_int: true,
      sign_extension: true,  bulk_memory: false,
    });
    wabtModule.resolveNames();
    wabtModule.validate();
    const { buffer: wasmBytes } = wabtModule.toBinary({ log: false, write_debug_names: true });
    const compiled  = await WebAssembly.compile(wasmBytes);
    const instance  = await WebAssembly.instantiate(compiled, imports);
    if (instance.exports.memory) memory.buffer = instance.exports.memory.buffer;
    if (instance.exports.__main) {
      instance.exports.__main();
      if (printBuf.length) { wasmLines.push(printBuf.join('')); printBuf.length = 0; }
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
    if (concise) console.warn('Full parseWat error details:\n' + wasmErr);
  } else if (wasmLines.length) {
    $wasmCon.textContent = wasmLines.join('\n');
  } else {
    $wasmCon.className = 'console empty';
    $wasmCon.textContent = '(no output from WASM execution)';
  }
}
