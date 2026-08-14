// ─── Guardián de las Historias ────────────────────────────────────────────────
//
// Comprueba lo que no se ve revisando pregunta por pregunta: el sesgo del
// conjunto. Importa el registro real —el mismo que consumen las páginas— para
// medir sobre lo que de verdad ve el alumno, ya balanceado, y no sobre lo que
// dicen los archivos de contenido.
//
//   node scripts/check-historias.mjs
//
// Falla (exit 1) si:
//   • una posición concentra más del 40 % de las respuestas correctas
//   • alguna posición se queda por debajo del 10 %
//   • una historia no tiene la forma esperada (2–4 voces, ~5 preguntas cada una)
//   • hay opciones repetidas dentro de una pregunta
//   • una explicación se refiere a una opción por su letra (el reparto la movería)

import { registerHooks } from 'node:module';

// Node lee TypeScript, pero no resuelve los imports sin extensión que usa el
// proyecto. Mismo gancho que scripts/audit-icfes-guided-55.mjs.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const { HISTORIA_LANG_KEYS, HISTORIAS_BY_LANG } = await import('../src/data/practica/historias/index.ts');

// ─── Sesgo de longitud ────────────────────────────────────────────────────────
//
// Medido el 13 de agosto de 2026: en las 17 historias, la respuesta correcta era
// la más larga en el 87 % de las 328 preguntas. Marcar siempre la más larga
// aprobaba todas, sin leer. Es el mismo tipo de defecto que el sesgo de posición
// —una propiedad del conjunto, invisible pregunta a pregunta— y ya había mordido
// antes en IELTS Writing Task 1.
//
// Se arregla ALARGANDO LOS DISTRACTORES, desarrollando el error de cada uno.
// Nunca recortando la correcta: ahí vive la precisión que enseña la lección.
//
// DEUDA SALDADA — 14 de agosto de 2026. Las 16 historias anteriores se
// reescribieron distractor a distractor, en los ocho idiomas, y bajaron del 79-89 %
// al 26 %. Esta lista existía para que no se olvidaran; ya está vacía, y lo que
// queda es la exigencia: cualquier historia que entre a partir de ahora tiene que
// cumplir el umbral desde el primer commit.
//
// NO VOLVER A LLENARLA para meter una historia nueva con prisa. Se creó para
// saldar una deuda ya contraída, no para permitir contraerla otra vez: es más
// barato equilibrar las cuatro opciones mientras se escriben —que es lo que se
// hizo en `the-cash-bar` (21 %) y `the-interpreter` (13 %)— que reescribir 300
// distractores después. `node scripts/review-historia.mjs <idioma>/<slug>` da la
// cifra antes de commitear.
const DEUDA_LONGITUD = new Set([]);

/** En coreano y japonés se mide en caracteres: cada uno vale por una sílaba. */
const largo = (s, lang) =>
  lang === 'coreano' || lang === 'japones' ? [...s.trim()].length : s.trim().split(/\s+/).length;

const problems = [];
const deuda = [];
const posCount = [0, 0, 0, 0];
let totalQ = 0;

const LETTER_REF = /\bopci[óo]n(es)?\s+[A-D]\b|\bla\s+[A-D]\)|ninguna de las anteriores|todas las anteriores/i;

for (const lang of HISTORIA_LANG_KEYS) {
  for (const h of HISTORIAS_BY_LANG[lang]) {
    const id = `${lang}/${h.slug}`;
    const groups = [
      ['narrador', h.narrator.questions],
      ...h.voices.map(v => [v.name, v.questions]),
      ['final', h.finalQuestions],
    ];
    const n = groups.reduce((acc, [, qs]) => acc + qs.length, 0);

    // El número de preguntas ya no es fijo: depende de cuántas voces tenga la
    // historia. Lo que sí es fijo es la forma — narrador y cierre con cuatro o
    // cinco, y cada voz con cinco — porque de ahí sale el equilibrio del
    // ejercicio. Una voz con dos preguntas sería una voz decorativa.
    if (h.voices.length < 2 || h.voices.length > 4) {
      problems.push(`${id}: ${h.voices.length} voces (el motor admite de 2 a 4)`);
    }
    const esperadas = 4 + h.voices.length * 5 + 5;
    if (n < esperadas - 1 || n > esperadas + 1) {
      problems.push(`${id}: ${n} preguntas para ${h.voices.length} voces (se esperan ~${esperadas})`);
    }
    for (const [grupo, qs] of groups) {
      if (qs.length < 4) problems.push(`${id} · ${grupo}: solo ${qs.length} preguntas (mínimo 4)`);
    }
    const claves = h.voices.map(v => v.key);
    if (new Set(claves).size !== claves.length) problems.push(`${id}: claves de voz repetidas (${claves.join(', ')})`);
    if (claves.join('') !== ['a', 'b', 'c', 'd'].slice(0, claves.length).join('')) {
      problems.push(`${id}: las claves deben ir en orden desde 'a' — están como ${claves.join(', ')}`);
    }

    for (const [group, qs] of groups) {
      qs.forEach((q, i) => {
        const where = `${id} · ${group} #${i + 1}`;
        if (q.opts.length !== 4) problems.push(`${where}: ${q.opts.length} opciones (esperadas 4)`);
        if (q.correct < 0 || q.correct >= q.opts.length) problems.push(`${where}: correct fuera de rango`);
        if (new Set(q.opts).size !== q.opts.length) problems.push(`${where}: opciones repetidas`);
        if (!q.explanation?.trim()) problems.push(`${where}: sin explicación`);
        if (LETTER_REF.test(q.explanation) || LETTER_REF.test(q.q)) {
          problems.push(`${where}: se refiere a una opción por su letra — el reparto la mueve`);
        }
        posCount[q.correct]++;
        totalQ++;
      });
    }

    // ── Sesgo de longitud, por historia ────────────────────────────────────
    const todas = groups.flatMap(([, qs]) => qs);
    let masLarga = 0, exceso = 0;
    for (const q of todas) {
      const ls = q.opts.map(o => largo(o, lang));
      const c = ls[q.correct];
      const maxD = Math.max(...ls.filter((_, i) => i !== q.correct));
      if (c > maxD) masLarga++;
      if (c - maxD >= 3) exceso++;
    }
    const pctLarga = (masLarga / todas.length) * 100;
    if (DEUDA_LONGITUD.has(id)) {
      deuda.push(`${id.padEnd(40)} la correcta es la más larga en el ${pctLarga.toFixed(0)} % (${exceso} con 3+ de ventaja)`);
      if (pctLarga <= 50 && exceso === 0) {
        problems.push(`${id}: ya cumple el umbral de longitud — bórralo de DEUDA_LONGITUD para que el guardián se lo exija`);
      }
    } else {
      if (pctLarga > 50) problems.push(`${id}: la correcta es la más larga en el ${pctLarga.toFixed(0)} % — marcarla sin leer aprueba`);
      if (exceso > 0) problems.push(`${id}: ${exceso} pregunta(s) donde la correcta saca 3+ al mejor distractor`);
    }
  }
}

console.log(`Historias: ${HISTORIA_LANG_KEYS.reduce((a, l) => a + HISTORIAS_BY_LANG[l].length, 0)} en ${HISTORIA_LANG_KEYS.length} idiomas · ${totalQ} preguntas\n`);
console.log('Posición de la respuesta correcta:');
posCount.forEach((count, i) => {
  const pct = (count / totalQ) * 100;
  console.log(`  ${String.fromCharCode(65 + i)}: ${String(count).padStart(3)}  ${pct.toFixed(1).padStart(5)}%  ${'█'.repeat(Math.round(pct))}`);
});

const pcts = posCount.map(c => c / totalQ);
if (Math.max(...pcts) > 0.40) problems.push(`sesgo de posición: una opción concentra el ${(Math.max(...pcts) * 100).toFixed(1)} %`);
if (Math.min(...pcts) < 0.10) problems.push(`sesgo de posición: una opción se queda en el ${(Math.min(...pcts) * 100).toFixed(1)} %`);

if (deuda.length) {
  console.log(`\nDeuda de sesgo de longitud — ${deuda.length} historias pendientes de reescribir sus distractores:`);
  for (const d of deuda) console.log(`  · ${d}`);
  console.log('  (no tumban el build; al arreglar una, bórrala de DEUDA_LONGITUD en este archivo)');
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s):`);
  for (const p of problems) console.error(`  · ${p}`);
  process.exit(1);
}
console.log('\n✓ Historias íntegras: reparto equilibrado y estructura correcta.');
