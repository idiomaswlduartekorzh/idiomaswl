// Contador único de la simulación del escenario 4 (fase 13).
// MISMO CRITERIO que fase11-scripts/carga-4.mjs, sin una sola variación:
// BRUTO. Todo lo que sale por la boca — inglés, español, muletillas, repeticiones
// y lo leído en voz alta de la ficha. NO cuenta: la etiqueta del turno, las marcas
// entre corchetes, los segundos entre paréntesis, ni ninguna línea que no sea un turno.
// Suma además los segundos declarados por turno, para el modelo de minutos.
import { readFileSync } from 'node:fs';

const FILE = new URL('../fase13-simulacion-4.md', import.meta.url);
const lines = readFileSync(FILE, 'utf8').split('\n');

const TURN = /^\*\*(FAB|AST)-(\d+)\*\*\s*(.*)$/;
const secs = [];
let cur = null;

for (const raw of lines) {
  const h2 = raw.match(/^## (\d+[a-z]?) · (.+)$/);
  const h3 = raw.match(/^### (5b) · (.+)$/);
  if (h2 || h3) {
    const m = h2 || h3;
    cur = { id: m[1], name: m[2], FAB: 0, AST: 0, tFAB: 0, tAST: 0, sFAB: 0, sAST: 0, read: { FAB: 0, AST: 0 }, es: { FAB: 0, AST: 0 } };
    secs.push(cur);
    continue;
  }
  if (raw.startsWith('## D ·') || raw.startsWith('## E ·')) cur = null;
  const m = raw.match(TURN);
  if (!m || !cur) continue;
  const who = m[1];
  let text = m[3];
  const isRead = /\[L\]/.test(text);
  const nEs = (text.match(/\[ES\]/g) || []).length;
  const sec = (text.match(/\((\d+)\s*s\)/) || [0, 0])[1];
  text = text.replace(/`\[[A-Z!]{1,2}\]`/g, ' ');   // marcas
  text = text.replace(/\((\d+)\s*s\)/g, ' ');        // segundos
  text = text.replace(/[*_`»«]/g, ' ');
  const words = text.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w));
  cur[who] += words.length;
  cur['t' + who] += 1;
  cur['s' + who] += Number(sec);
  cur.es[who] += nEs;
  if (isRead) cur.read[who] += words.length;
}

const pct = (a, b) => (100 * a / (a + b));
const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
console.log('| # | conversación | turnos A/B | palabras FAB (A) | palabras AST (B) | total | reparto A/B |');
console.log('|---|---|---|---|---|---|---|');
for (const s of secs) {
  const tot = s.FAB + s.AST;
  console.log(`| ${s.id} | ${s.name} | ${s.tFAB}/${s.tAST} | ${s.FAB} | ${s.AST} | ${tot} | ${pct(s.FAB, s.AST).toFixed(1)} / ${pct(s.AST, s.FAB).toFixed(1)} |`);
}
console.log('');
for (const s of secs) {
  const minor = Math.min(s.FAB, s.AST), tot = s.FAB + s.AST;
  console.log(`${s.id}: lado menor = ${(100 * minor / tot).toFixed(1)} %  ${100 * minor / tot >= 40 ? 'PASA 40%' : 'NO PASA 40%'}   habla=${mmss(s.sFAB + s.sAST)} (FAB ${s.sFAB}s · AST ${s.sAST}s)  [ES]: FAB ${s.es.FAB} · AST ${s.es.AST}  leído: FAB ${s.read.FAB} · AST ${s.read.AST}`);
}
