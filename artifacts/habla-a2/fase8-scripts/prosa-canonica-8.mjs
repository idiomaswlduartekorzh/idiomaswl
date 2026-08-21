// MISMA función de conteo que fase7-scripts/prosa-canonica.mjs, palabra por palabra.
// Lo único que cambia es la LISTA DE ARCHIVOS: composición nueva (el 4 viejo retirado,
// el 4 nuevo dentro). El contador no se toca: cambiarlo a mitad de auditoría es lo que
// produjo las seis contabilidades de la ronda anterior.
import { readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const TECHO = 450;
const prosa = (t) =>
  t.split('\n')
    .filter((l) => !l.trim().startsWith('|') && !l.trim().startsWith('```'))
    .join(' ').split(/\s+/).filter(Boolean).length;
function fichas(texto) {
  const heads = [...texto.matchAll(/^## .*$/gm)].map((m) => [m.index, m[0]]);
  const out = {};
  heads.forEach(([pos, h], i) => {
    const end = i + 1 < heads.length ? heads[i + 1][0] : texto.length;
    const m = /^## ROLE ([AB])\b/i.exec(h);
    if (m) out[m[1].toUpperCase()] = prosa(texto.slice(pos, end));
  });
  return out;
}
const archivos = [
 'fase7-fichas-1-the-bike-in-the-parking-lot.md',
 'fase7-fichas-2-no-appointment-until-thursday.md',
 'fase7-modelo-ficha-en.md',
 'fase8-fichas-4nuevo.md',
 'fase7-fichas-5-late-again-on-monday.md',
 'fase7-fichas-6-the-cousin-on-the-sofa.md',
 'fase7-fichas-7-two-more-people-for-the-trip.md',
 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md',
];
let total = 0, pasan = 0;
const cifras = [];
console.log(`${'ficha'.padEnd(46)} ${'A'.padStart(5)} ${'B'.padStart(5)}`);
console.log('-'.repeat(60));
for (const f of archivos) {
  const d = fichas(readFileSync(join(DIR, f), 'utf8'));
  for (const v of [d.A, d.B]) if (v) { total++; cifras.push(v); if (v <= TECHO) pasan++; }
  const mark = (v) => (v ? String(v) + (v > TECHO ? '*' : ' ') : '  — ');
  console.log(`  ${basename(f).slice(0, 44).padEnd(44)} ${mark(d.A).padStart(5)} ${mark(d.B).padStart(5)}`);
}
const media = Math.round(cifras.reduce((a, b) => a + b, 0) / cifras.length);
console.log(`\n  dentro del techo (${TECHO}): ${pasan}/${total} · media ${media} · peor ${Math.max(...cifras)}`);
console.log(`  * = se pasa`);
