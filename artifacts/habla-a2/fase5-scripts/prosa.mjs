#!/usr/bin/env node
// Cuenta la prosa de una ficha de habla, aparte de las tablas (§11 del blueprint).
//
// Regla, escrita una sola vez y ejecutable (antes vivía en un párrafo y no salía
// dos veces igual):
//   - se cuenta dentro de la sección de cada rol: desde la línea `## ROLE X` hasta
//     la siguiente línea que empiece por `## `;
//   - NO cuentan las filas de tabla (empiezan por `|`) ni los encabezados (`#`);
//   - las líneas `>` de cabecera del rol SÍ cuentan;
//   - `*`, `·`, `→`, `—`, `=` y los backticks no son palabras;
//   - la carta y el cierre compartido van aparte: no se cargan a ninguna ficha.
// Variante `--con-h3`: además cuenta el texto de los encabezados `###`.
//
// Uso: node prosa.mjs <ficha.md> [--con-h3]

import { readFileSync } from 'node:fs';

const file = process.argv[2];
const conH3 = process.argv.includes('--con-h3');
if (!file) { console.error('uso: node prosa.mjs <ficha.md> [--con-h3]'); process.exit(1); }

const lines = readFileSync(file, 'utf8').split('\n');

const NO_PALABRAS = /[*·→—=`>|]/g;
const contar = (linea) =>
  linea.replace(NO_PALABRAS, ' ').split(/\s+/).filter((t) => /[A-Za-zÀ-ÿ0-9]/.test(t)).length;

const secciones = [];
let actual = null;
for (const linea of lines) {
  if (/^## /.test(linea)) {
    actual = /^## ROLE /.test(linea) ? { nombre: linea.replace(/^##\s*/, ''), prosa: 0, tablas: {} } : null;
    if (actual) secciones.push(actual);
    continue;
  }
  if (!actual) continue;
  if (/^\s*\|/.test(linea)) {
    const clave = actual.tablaActual || 'tabla';
    actual.tablas[clave] = (actual.tablas[clave] || 0) + 1;
    continue;
  }
  if (/^###\s/.test(linea)) {
    actual.tablaActual = linea.replace(/^###\s*/, '').toLowerCase();
    if (conH3) actual.prosa += contar(linea.replace(/^###\s*/, ''));
    continue;
  }
  if (/^#/.test(linea)) continue;
  actual.prosa += contar(linea);
}

const TOPE = 350;
for (const s of secciones) {
  const filas = Object.entries(s.tablas)
    .map(([k, v]) => `${k}: ${Math.max(0, v - 2)} filas`)
    .join(' · ');
  console.log(`${s.prosa.toString().padStart(4)}  ${s.prosa > TOPE ? 'SE PASA' : '  ok   '}  ${s.nombre}`);
  console.log(`      ${filas}`);
}
