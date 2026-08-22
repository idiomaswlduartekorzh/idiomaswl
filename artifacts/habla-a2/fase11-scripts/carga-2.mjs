// Contador canónico de la simulación del escenario 2 (fase 11).
// UN SOLO CRITERIO: se cuenta en bruto todo lo que sale por la boca —inglés, español,
// muletillas, números y lo leído en voz alta [L]—. No se cuentan: la etiqueta del turno,
// las marcas entre corchetes, el cronómetro (NN s), las acotaciones en cita (>),
// las tablas ni el texto de diagnóstico.
import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? new URL('../fase11-simulacion-2.md', import.meta.url).pathname;
const lines = readFileSync(file, 'utf8').split('\n');

const TURNO = /^\*\*([AB])(\d+)\*\*\s*(.*)$/;
let sec = null;
const secs = new Map();

for (const raw of lines) {
  const h = raw.match(/^## (.+)$/);
  if (h) {
    sec = h[1].trim();
    if (/^\d|^§/.test(sec)) secs.set(sec, { A: 0, B: 0, tA: 0, tB: 0, es: [], leido: { A: 0, B: 0 }, seg: 0 });
    else sec = null;
    continue;
  }
  const m = raw.match(TURNO);
  if (!m || !sec || !secs.has(sec)) continue;
  const rol = m[1];
  let t = m[3];
  const es = /\[ES\]/.test(t);
  const leido = /\[L\]/.test(t);
  const segs = [...t.matchAll(/\((\d+)\s*s\)/g)].map(x => +x[1]);
  t = t.replace(/`\[[^\]]*\]`/g, ' ');          // marcas
  t = t.replace(/\*\*\(\d+\s*s\)\*\*/g, ' ');    // cronómetro
  t = t.replace(/\(\d+\s*s\)/g, ' ');
  t = t.replace(/[`*_>«»"]/g, ' ');
  const pal = t.split(/[\s—–·]+/).filter(w => /[\p{L}\p{N}]/u.test(w));
  const s = secs.get(sec);
  s[rol] += pal.length;
  s['t' + rol] += 1;
  s.seg += segs.reduce((a, b) => a + b, 0);
  if (leido) s.leido[rol] += pal.length;
  if (es) s.es.push(rol + m[2]);
}

console.log('| sección | turnos A/B | pal. A | pal. B | reparto A/B | lado menor | 40 % | leído A/B | s de habla | [ES] |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const [n, s] of secs) {
  if (!s.tA && !s.tB) continue;
  const tot = s.A + s.B;
  const pa = (100 * s.A / tot), pb = 100 - pa;
  const menor = Math.min(pa, pb);
  const mm = Math.floor(s.seg / 60), ss = s.seg % 60;
  console.log(`| ${n} | ${s.tA}/${s.tB} | ${s.A} | ${s.B} | ${pa.toFixed(1)}/${pb.toFixed(1)} | ${menor.toFixed(1)} % | ${menor >= 40 ? 'PASA' : 'NO PASA'} | ${s.leido.A}/${s.leido.B} | ${mm}:${String(ss).padStart(2, '0')} | ${s.es.join(', ') || '—'} |`);
}
