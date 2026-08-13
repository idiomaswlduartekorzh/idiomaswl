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
//   • una historia no tiene 19 preguntas, o alguna no tiene 4 opciones
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

const problems = [];
const posCount = [0, 0, 0, 0];
let totalQ = 0;

const LETTER_REF = /\bopci[óo]n(es)?\s+[A-D]\b|\bla\s+[A-D]\)|ninguna de las anteriores|todas las anteriores/i;

for (const lang of HISTORIA_LANG_KEYS) {
  for (const h of HISTORIAS_BY_LANG[lang]) {
    const id = `${lang}/${h.slug}`;
    const groups = [
      ['narrador', h.narrator.questions],
      [h.voices[0].name, h.voices[0].questions],
      [h.voices[1].name, h.voices[1].questions],
      ['final', h.finalQuestions],
    ];
    const n = groups.reduce((acc, [, qs]) => acc + qs.length, 0);
    if (n !== 19) problems.push(`${id}: ${n} preguntas (esperadas 19)`);

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

if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s):`);
  for (const p of problems) console.error(`  · ${p}`);
  process.exit(1);
}
console.log('\n✓ Historias íntegras: reparto equilibrado y estructura correcta.');
