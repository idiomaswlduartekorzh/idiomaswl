// LAS TRES REGLAS DE TABLA DE §11 (commit ed220acf), sobre los DIECISÉIS roles a la vez.
//   R1 · filas ≤ techo de la banda de turnos que declara la propia ficha (si es banda, el techo)
//   R2 · la fila que concede, ni primera ni última en el alfabético
//   R3 · ninguna etiqueta que nombre un momento de la conversación
// Y de propina la premisa sin la cual R2 no significa nada: que la tabla esté ordenada
// alfabéticamente por función. Los turnos declarados se leen de la cabecera DE CADA ROL.
import { readFileSync } from 'node:fs';
import { leer } from './actos-conjunto.mjs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = { 1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md', 2: 'fase7-fichas-2-no-appointment-until-thursday.md', 3: 'fase7-modelo-ficha-en.md', 4: 'fase8-fichas-4nuevo.md', 5: 'fase7-fichas-5-late-again-on-monday.md', 6: 'fase7-fichas-6-the-cousin-on-the-sofa.md', 7: 'fase7-fichas-7-two-more-people-for-the-trip.md', 8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md' };

// techo de turnos declarado EN LA CABECERA DEL ROL
function turnosRol(e, rol) {
  const t = readFileSync(DIR + F[e], 'utf8');
  const iA = t.indexOf('\n## ROLE A'), iB = t.indexOf('\n## ROLE B'), iC = t.indexOf('\n## ', iB + 5);
  const s = rol === 'A' ? t.slice(iA, iB) : t.slice(iB, iC);
  const cab = s.split('\n').filter(l => l.startsWith('>')).join(' ');
  let m = cab.match(/(\d+)\s*-\s*(\d+)\s+turns/i);       // banda -> techo
  if (m) return { txt: `${m[1]}-${m[2]}`, techo: +m[2] };
  m = cab.match(/(?:About\s+)?(\d+)\s+turns/i);
  if (m) return { txt: m[1], techo: +m[1] };
  return { txt: '?', techo: NaN };
}

// una fila "concede": su etiqueta o su forma otorgan algo a cambio de una condición
const CONCEDE = /granting|grant it|only if|but only|I can do it, but|putting a price on a yes|something for something|moving the deal|offering another way|saying no with a door open/i;
// una etiqueta nombra un MOMENTO si dice cuándo, no qué
const MOMENTO = /\b(first|last|second|third|finally|then|before you leave|at the end|to close|to end|the closing line|last thing|at the start|to begin)\b/i;

const roles = leer();
console.log('=== R1 · FILAS ≤ TECHO DE TURNOS DECLARADO POR EL PROPIO ROL ===');
console.log('| rol | turnos declarados | techo | filas | margen | veredicto |');
console.log('|---|---|---|---|---|---|');
let f1 = 0, alTecho = 0;
for (const r of roles) {
  const t = turnosRol(r.n, r.rol);
  const ok = r.exp.length <= t.techo;
  if (!ok) f1++;
  if (r.exp.length === t.techo) alTecho++;
  console.log(`| ${r.n}${r.rol} | ${t.txt} | ${t.techo} | ${r.exp.length} | ${t.techo - r.exp.length} | ${ok ? 'ok' : '**FALLA**'} |`);
}
console.log(`R1: ${16 - f1}/16 cumplen · ${alTecho}/16 están EXACTAMENTE en el techo (margen 0)`);
console.log('También §11 pide 6-9 filas en A1-A2: ' + (roles.every(r => r.exp.length >= 6 && r.exp.length <= 9) ? '16/16 dentro' : 'FALLA'));

console.log('\n=== premisa de R2 · ¿la tabla está ordenada alfabéticamente por función? ===');
let desorden = 0;
for (const r of roles) {
  const fn = r.exp.map(e => e.fn.toLowerCase());
  const ord = [...fn].sort((a, b) => a.localeCompare(b, 'en'));
  const ok = fn.every((x, i) => x === ord[i]);
  if (!ok) { desorden++; console.log(`  ${r.n}${r.rol}: NO alfabético · disco [${fn.join(' | ')}] · ordenado [${ord.join(' | ')}]`); }
}
console.log(`  ${16 - desorden}/16 alfabéticas`);

console.log('\n=== R2 · LA FILA QUE CONCEDE, NI PRIMERA NI ÚLTIMA ===');
console.log('| rol | fila(s) que conceden | posición / total | veredicto |');
console.log('|---|---|---|---|');
let f2 = 0;
for (const r of roles) {
  const hits = r.exp.map((e, i) => ({ i: i + 1, fn: e.fn, hit: CONCEDE.test(e.fn) || CONCEDE.test(e.form) })).filter(x => x.hit);
  if (!hits.length) { console.log(`| ${r.n}${r.rol} | — ninguna | — | n/a |`); continue; }
  const mal = hits.filter(h => h.i === 1 || h.i === r.exp.length);
  if (mal.length) f2++;
  console.log(`| ${r.n}${r.rol} | ${hits.map(h => `\`${h.fn}\``).join(' · ')} | ${hits.map(h => h.i + '/' + r.exp.length).join(' · ')} | ${mal.length ? '**FALLA**' : 'ok'} |`);
}
console.log(`R2: ${f2 === 0 ? '16/16 ok' : f2 + ' roles fallan'}`);

console.log('\n=== R3 · NINGUNA ETIQUETA NOMBRA UN MOMENTO ===');
let f3 = 0;
for (const r of roles) {
  for (const [i, e] of r.exp.entries()) {
    if (MOMENTO.test(e.fn)) { f3++; console.log(`  ${r.n}${r.rol} fila ${i + 1}/${r.exp.length}: \`${e.fn}\`  ← la palabra que nombra el momento: «${e.fn.match(MOMENTO)[0]}»`); }
  }
}
console.log(`R3: ${f3 === 0 ? '0 etiquetas con momento' : f3 + ' etiqueta(s) con momento'}`);
console.log('  (revisar a mano, el detector no juzga: «again», «now», «tonight», «at one» son horas de la ficción, no del turno)');
for (const r of roles) for (const [i, e] of r.exp.entries()) if (/\b(again|now|tonight|later|when|after)\b/i.test(e.fn) && !MOMENTO.test(e.fn)) console.log(`    ~ ${r.n}${r.rol} ${i + 1}: \`${e.fn}\``);

console.log('\n=== EXTRA · ¿las dos fichas del mismo escenario repiten etiqueta? ===');
for (let n = 1; n <= 8; n++) {
  const A = roles.find(r => r.n === n && r.rol === 'A').exp.map(e => e.fn.toLowerCase());
  const B = roles.find(r => r.n === n && r.rol === 'B').exp.map(e => e.fn.toLowerCase());
  const comun = A.filter(x => B.includes(x));
  console.log(`  esc ${n}: ${comun.length}/${Math.min(A.length, B.length)} etiquetas idénticas en A y B${comun.length ? '  → ' + comun.map(x => `\`${x}\``).join(', ') : ''}`);
}

console.log('\n=== EXTRA · etiquetas que se repiten ENTRE escenarios distintos ===');
const todas = new Map();
for (const r of roles) for (const e of r.exp) { const k = e.fn.toLowerCase(); if (!todas.has(k)) todas.set(k, []); todas.get(k).push(r.n + r.rol); }
for (const [k, v] of [...todas].filter(([, v]) => new Set(v.map(x => x[0])).size > 1)) console.log(`  \`${k}\` → ${v.join(', ')}`);
console.log(`  etiquetas distintas en el set: ${todas.size} sobre ${roles.reduce((a, r) => a + r.exp.length, 0)} filas`);
