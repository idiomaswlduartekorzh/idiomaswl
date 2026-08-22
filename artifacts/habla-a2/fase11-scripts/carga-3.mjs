// Contador canónico de la simulación del escenario 3 (fase 11).
// UN SOLO CRITERIO: se cuenta en bruto todo lo que sale por la boca —inglés, español,
// muletillas, números y lo leído en voz alta [L]—. No se cuentan: la etiqueta del turno,
// las marcas entre corchetes, las acotaciones en cita (>) ni el texto de diagnóstico.
import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? new URL('../fase11-simulacion-3.md', import.meta.url).pathname;
const lines = readFileSync(file, 'utf8').split('\n');

const turno = /^\*\*([AB])(\d+)\*\*\s*[—-]\s*(.*)$/;
let seccion = null;
const secciones = new Map();

for (const line of lines) {
  const h = line.match(/^#\s+(.*)$/);
  if (h) { seccion = h[1].trim(); secciones.set(seccion, { A: 0, B: 0, tA: 0, tB: 0, es: [] }); continue; }
  const m = line.match(turno);
  if (!m || !seccion) continue;
  const rol = m[1];
  let texto = m[3];
  const tieneES = /\[ES\]/.test(texto);
  texto = texto.replace(/`\[[^\]]*\]`/g, ' ').replace(/\[[A-Z!⚠][^\]]*\]/g, ' ');
  texto = texto.replace(/[`*_>]/g, ' ');
  const palabras = texto.split(/[\s—–·]+/).filter(w => /[\p{L}\p{N}]/u.test(w));
  const s = secciones.get(seccion);
  s[rol] += palabras.length;
  s['t' + rol] += 1;
  if (tieneES) s.es.push(rol + m[2]);
}

let total = { A: 0, B: 0 };
console.log('sección | turnos A | turnos B | palabras A | palabras B | reparto A/B | turnos con [ES]');
for (const [nombre, s] of secciones) {
  if (!s.tA && !s.tB) continue;
  const tot = s.A + s.B;
  const pa = Math.round((s.A / tot) * 100);
  console.log(`${nombre} | ${s.tA} | ${s.tB} | ${s.A} | ${s.B} | ${pa}/${100 - pa} | ${s.es.join(', ') || '—'}`);
  total.A += s.A; total.B += s.B;
}
console.log(`TOTAL | | | ${total.A} | ${total.B} |`);
