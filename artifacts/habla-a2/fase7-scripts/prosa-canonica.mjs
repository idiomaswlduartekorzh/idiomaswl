// El contador de prosa. UNO, y este.
//
// Existe porque en la ronda del 21 ago 2026 las ocho fichas declaraban cumplir el techo de §11
// con SEIS contadores distintos, y el auditor de conjunto midió 9 de 16 por encima mientras que
// otro medía 15. La discrepancia no era del contenido: era de que nadie contaba igual.
//
// Reglas, y no se cambian sin cambiar el blueprint:
//  - Una ficha empieza en una cabecera `## ROLE A` o `## ROLE B` AL PRINCIPIO DE LÍNEA y termina
//    en la siguiente cabecera de nivel 2. Ojo: «## The card — separate screen · ROLE B only» NO
//    es una ficha, y contarla como tal es lo que produjo la asimetría de 444 contra 133.
//  - No cuentan las filas de tabla (empiezan por `|`) ni los bloques de código: una tabla se
//    consulta, un párrafo se lee entero, y §11 mide lectura.
//
// Uso: node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const DIR = new URL('..', import.meta.url).pathname;
const TECHO = 450;   // §11: medido, no deseado. Ver la nota del blueprint.

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

// Los ocho vivos, nombrados uno a uno. Antes esto era un regex sobre fase7-fichas-*.md y
// medía el escenario RETIRADO (el reclamo de la factura) mientras dejaba fuera al que lo
// sustituyó, que vive en fase8-. El guardián lo cazó el 22 ago 2026: un contador que mide lo
// que no se publica y no mide lo que sí, mintiendo en las dos direcciones a la vez.
const archivos = [
  'fase7-fichas-1-the-bike-in-the-parking-lot.md',
  'fase7-fichas-2-no-appointment-until-thursday.md',
  'fase7-modelo-ficha-en.md',                        // escenario 3, el molde
  'fase8-fichas-4nuevo.md',                          // escenario 4, el que sustituyó al retirado
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
process.exit(pasan === total ? 0 : 1);
