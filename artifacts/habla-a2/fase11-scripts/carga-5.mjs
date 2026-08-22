// Contador canónico de la simulación del escenario 5 (fase 11).
// UN SOLO CRITERIO: bruto. Todo lo que sale por la boca — inglés, español,
// muletillas, y lo leído en voz alta de la ficha ([L]). NO cuenta: la etiqueta
// del turno, las marcas entre corchetes, las acotaciones [entre corchetes],
// los segundos, ni ninguna línea que no sea un turno.
import { readFileSync } from 'node:fs';

const FILE = new URL('../fase11-simulacion-5.md', import.meta.url);
const lines = readFileSync(FILE, 'utf8').split('\n');

const TURN = /^\*\*(CAM|AMP)-(\d+)\*\*\s*(.*)$/;
const secs = [];
let cur = null;

for (const raw of lines) {
  const h2 = raw.match(/^## (\d+[a-z]?) · (.+)$/);
  const h3 = raw.match(/^### (5b|5c) · (.+)$/);
  if (h2 || h3) {
    const m = h2 || h3;
    cur = { id: m[1], name: m[2], CAM: 0, AMP: 0, tCAM: 0, tAMP: 0, read: { CAM: 0, AMP: 0 } };
    secs.push(cur);
    continue;
  }
  if (raw.startsWith('## D ·') || raw.startsWith('## E ·')) cur = null;
  const m = raw.match(TURN);
  if (!m || !cur) continue;
  const who = m[1];
  let text = m[3];
  const isRead = /\[L\]/.test(text);
  // El comentario de diagnóstico que va en la MISMA línea del turno no es habla.
  // Se corta en el primer ' — **', ' — *(' o ' ⚠ '.
  const cut = [' — **', ' — *(', ' ⚠ '].map(t => text.indexOf(t)).filter(i => i >= 0);
  if (cut.length) text = text.slice(0, Math.min(...cut));
  text = text.replace(/`\[[A-Z!]{1,2}\]`/g, ' ');          // marcas de turno
  text = text.replace(/\[[^\]]*\]/g, ' ');                  // acotaciones escénicas
  text = text.replace(/\((\d+)\s*s\)/g, ' ');               // segundos
  text = text.replace(/—[^*]*$/, (s) => s);                 // no-op
  text = text.replace(/[*_`»«]/g, ' ');
  const words = text.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w));
  cur[who] += words.length;
  cur['t' + who] += 1;
  if (isRead) cur.read[who] += words.length;
}

const pct = (a, b) => (100 * a / (a + b));
console.log('| # | conversación | turnos A/B | palabras CAM (A) | palabras AMP (B) | total | reparto A/B |');
console.log('|---|---|---|---|---|---|---|');
for (const s of secs) {
  const tot = s.CAM + s.AMP;
  console.log(`| ${s.id} | ${s.name} | ${s.tCAM}/${s.tAMP} | ${s.CAM} | ${s.AMP} | ${tot} | ${pct(s.CAM, s.AMP).toFixed(1)} / ${pct(s.AMP, s.CAM).toFixed(1)} |`);
}
console.log('');
for (const s of secs) {
  const minor = Math.min(s.CAM, s.AMP), tot = s.CAM + s.AMP;
  const p = 100 * minor / tot;
  console.log(`${s.id}: lado menor = ${p.toFixed(1)} %  ${p >= 40 ? 'PASA 40%' : 'NO PASA 40%'}   (leido en voz alta: CAM ${s.read.CAM} · AMP ${s.read.AMP})`);
}
