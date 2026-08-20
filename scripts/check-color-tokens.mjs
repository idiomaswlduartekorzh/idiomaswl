#!/usr/bin/env node
/**
 * Guardián de colores: impide que vuelvan a entrar colores escritos a mano.
 *
 * El modo oscuro se arregló envolviendo cada color literal en
 * `var(--wl-…, <color de siempre>)`. Ese puente funciona, pero es un apaño: si
 * una página nueva copia a una vieja y trae otro blanco a pelo, el modo oscuro
 * se vuelve a romper ahí y nadie se entera hasta que alguien lo mira con el
 * tema encendido.
 *
 * Este guardián corre en el prebuild y falla si aparece un relleno claro o un
 * texto oscuro sin envolver, que son exactamente las dos cosas que el modo
 * oscuro tiene que invertir. No mira colores oscuros de relleno ni claros de
 * texto: esos ya funcionan sobre lienzo oscuro.
 *
 * Si te para: no bajes el umbral. Envuelve el color en el rol que le toque, o
 * mejor, usa un token del sistema y no lo escribas a mano.
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import process from 'node:process';

const SCOPE = [
  "'src/app/(site)/practica'",
  "'src/app/(site)/preparacion-icfes'",
  'src/components/exam-practice',
  'src/components/reading',
  'src/components/lesson',
].join(' ');

const NAMED = { white: [255, 255, 255], whitesmoke: [245, 245, 245], ivory: [255, 255, 240], snow: [255, 250, 250] };

const COLOUR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)|\b(?:white|whitesmoke|ivory|snow)\b/g;

function parseColour(raw) {
  const value = raw.trim().toLowerCase();
  if (NAMED[value]) return { rgb: NAMED[value], alpha: 1 };
  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join('');
    if (hex.length !== 6 && hex.length !== 8) return null;
    const rgb = [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
    if (rgb.some(Number.isNaN)) return null;
    return { rgb, alpha: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1 };
  }
  const m = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (!m) return null;
  return { rgb: [1, 2, 3].map((i) => Number(m[i])), alpha: m[4] === undefined ? 1 : Number(m[4]) };
}

const luminance = ([r, g, b]) => {
  const ch = (v) => { const n = v / 255; return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};

// Los mismos umbrales que usó el puente, para que guardián y arreglo coincidan.
const LIGHT_FILL = 0.62;
const DARK_TEXT = 0.34;
const MIN_ALPHA = 0.55;

const CSS_SURFACE = /^(background|background-color)$/i;
const CSS_TEXT = /^color$/i;
const JS_SURFACE = /^(background|backgroundColor)$/;
const JS_TEXT = /^color$/;

/** Oculta lo que ya está envuelto para no denunciarlo. */
const shield = (value) => value.replace(/var\(--[\w-]+,[^)]*\)/g, ' ');

function offendersIn(value, kind) {
  const found = [];
  for (const token of shield(value).match(COLOUR) || []) {
    const parsed = parseColour(token);
    if (!parsed || parsed.alpha < MIN_ALPHA) continue;
    const l = luminance(parsed.rgb);
    if (kind === 'surface' && l >= LIGHT_FILL) found.push(`relleno claro ${token}`);
    if (kind === 'text' && l <= DARK_TEXT) found.push(`texto oscuro ${token}`);
  }
  return found;
}

const list = (cmd) => execSync(`${cmd} || true`, { encoding: 'utf8' }).split('\n').filter(Boolean);

const problems = [];

const cssDecl = /(^|[;{}])\s*([a-zA-Z-]+)\s*:\s*([^;{}]+)/g;
for (const file of list(`grep -rl -E '(#[0-9a-fA-F]{3,8}|rgba?\\(|white)' ${SCOPE} --include='*.module.css'`)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(cssDecl)) {
    const prop = m[2];
    const kind = CSS_SURFACE.test(prop) ? 'surface' : CSS_TEXT.test(prop) ? 'text' : null;
    if (!kind) continue;
    for (const hit of offendersIn(m[3], kind)) {
      problems.push({ file, line: text.slice(0, m.index).split('\n').length, hit, prop });
    }
  }
}

const jsDecl = /\b(background|backgroundColor|color)(\s*:\s*)'([^']*)'/g;
for (const file of list(`grep -rl -E "(background|backgroundColor|color)\\s*:\\s*'" ${SCOPE} --include='*.tsx'`)) {
  if (file.endsWith('.bak')) continue;
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(jsDecl)) {
    const key = m[1];
    const kind = JS_SURFACE.test(key) ? 'surface' : JS_TEXT.test(key) ? 'text' : null;
    if (!kind) continue;
    for (const hit of offendersIn(m[3], kind)) {
      problems.push({ file, line: text.slice(0, m.index).split('\n').length, hit, prop: key });
    }
  }
}

if (!problems.length) {
  console.log('Colores íntegros: ningún relleno claro ni texto oscuro escrito a mano en práctica.');
  process.exit(0);
}

console.error(`\n${problems.length} color(es) escritos a mano que romperán el modo oscuro:\n`);
for (const p of problems.slice(0, 40)) {
  console.error(`  ${p.file}:${p.line}  ${p.prop} → ${p.hit}`);
}
if (problems.length > 40) console.error(`  … y ${problems.length - 40} más`);
console.error(`
Envuélvelo en el rol que le corresponda, por ejemplo:
    background: #f7f8fc          →  background: var(--wl-panel-raised, #f7f8fc)
    color: '#0f3d8c'             →  color: 'var(--wl-on-panel-link, #0f3d8c)'

Roles disponibles: --wl-panel-{canvas,card,raised,line,inverse},
--wl-panel-tint-{ok,alert,info,warn,purple},
--wl-on-panel{,-soft,-link,-teal,-ok,-alert,-warn,-purple}.

Ojo: si el valor se concatena en el código (por ejemplo \`\${color}12\` para dar
transparencia), una var() lo rompe. Ahí deja el color literal y arregla el
componente para que reciba el color ya compuesto.
`);
process.exit(1);
