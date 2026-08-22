// Contador canónico de la simulación del escenario 1 (fase 11).
// UN SOLO CRITERIO, el mismo en las cinco parejas, en la contraprueba y en el lector:
// BRUTO. Todo lo que sale por la boca — inglés, español, muletillas, repeticiones,
// nombres, números — y TAMBIÉN lo que el jugador lee en voz alta de su ficha ([L]).
// NO cuenta: la etiqueta del turno, las marcas entre corchetes, el cronómetro y
// cualquier acotación entre paréntesis (son escena, no habla), ni las líneas '>',
// las tablas y los diagnósticos, que no son turnos.
import { readFileSync } from 'node:fs';

const FILE = new URL('../fase11-simulacion-1.md', import.meta.url);
const lines = readFileSync(FILE, 'utf8').split('\n');

const TURN = /^\*\*([AB])(\d+)\*\*\s*(.*)$/;
const secs = [];
let cur = null;

for (const raw of lines) {
  const h = raw.match(/^## (?:(\d)|§([CL])) · (.+)$/);
  if (h) {
    cur = { id: h[1] || '§' + h[2], name: h[3], A: 0, B: 0, tA: 0, tB: 0, read: { A: 0, B: 0 } };
    secs.push(cur);
    continue;
  }
  if (/^## Diagn/.test(raw)) cur = null;
  const m = raw.match(TURN);
  if (!m || !cur) continue;
  const who = m[1];
  let text = m[3];
  const isRead = /\[L\]/.test(text);
  text = text.replace(/`\[[A-Z!]{1,2}\]`/g, ' '); // marcas de turno
  text = text.replace(/\([^)]*\)/g, ' ');          // cronómetro y acotaciones
  text = text.replace(/[*_`»«"]/g, ' ');
  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  cur[who] += words.length;
  cur['t' + who] += 1;
  if (isRead) cur.read[who] += words.length;
}

const pct = (a, b) => (100 * a) / (a + b);
console.log('| # | conversación | turnos A/B | palabras A | palabras B | total | reparto A/B |');
console.log('|---|---|---|---|---|---|---|');
for (const s of secs) {
  console.log(
    `| ${s.id} | ${s.name} | ${s.tA}/${s.tB} | ${s.A} | ${s.B} | ${s.A + s.B} | ${pct(s.A, s.B).toFixed(1)} / ${pct(s.B, s.A).toFixed(1)} |`,
  );
}
console.log('');
for (const s of secs) {
  const minor = Math.min(s.A, s.B);
  const tot = s.A + s.B;
  const q = (100 * minor) / tot;
  console.log(
    `${s.id}: lado menor = ${q.toFixed(1)} %  ${q >= 40 ? 'PASA 40%' : 'NO PASA 40%'}   (leído en voz alta: A ${s.read.A} · B ${s.read.B})`,
  );
}
