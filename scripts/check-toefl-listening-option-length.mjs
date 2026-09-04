#!/usr/bin/env node

// Guardián editorial transversal para los 20 sets de TOEFL Listening.
// El umbral es interno de WeLearn: no representa un estándar ETS ni reemplaza
// la revisión académica de plausibilidad y exactitud de cada opción.

import { auditItems } from '../docs/toefl-listening-length-audit-draft.mjs';
import { screen, selfTest } from '../docs/toefl-option-length-screen-draft.mjs';

const REPORT_ONLY = process.argv.includes('--report');
const MAX_EXTREME_RATE = 0.45;
const METRICS = ['words_longest', 'words_shortest', 'chars_longest', 'chars_shortest'];

function percent(value) {
  return `${(value * 100).toFixed(1)} %`;
}

function evaluate(label, items) {
  const result = screen(items);
  const failures = [];

  for (const metric of METRICS) {
    const row = result.totals[metric];
    const worstRate = Math.max(row.expectedRate, row.firstRate);
    if (worstRate > MAX_EXTREME_RATE) {
      failures.push(`${label}/${metric}: ${percent(worstRate)} > ${percent(MAX_EXTREME_RATE)}`);
    }
  }

  return { label, result, failures };
}

selfTest();

if (auditItems.length !== 680) {
  throw new Error(`El guardián encontró ${auditItems.length}/680 preguntas de Listening.`);
}
if (new Set(auditItems.map((item) => item.id)).size !== 680) {
  throw new Error('El guardián encontró IDs de Listening duplicados.');
}

const evaluations = [
  evaluate('Todos los sets', auditItems),
  ...Array.from({ length: 20 }, (_, index) => {
    const setNumber = index + 1;
    return evaluate(`Set ${String(setNumber).padStart(2, '0')}`, auditItems.filter((item) => item.set === setNumber));
  }),
];

for (const { label, result } of evaluations) {
  const summary = METRICS.map((metric) => {
    const row = result.totals[metric];
    return `${metric}=${percent(Math.max(row.expectedRate, row.firstRate))}`;
  }).join(' · ');
  console.log(`${label}: ${result.questions} ítems · ${summary}`);
}

const failures = evaluations.flatMap((evaluation) => evaluation.failures);
if (failures.length > 0 && !REPORT_ONLY) {
  console.error(`\n✗ Sesgo de longitud en TOEFL Listening: ${failures.length} incumplimiento(s).`);
  for (const failure of failures) console.error(`  · ${failure}`);
  process.exitCode = 1;
} else if (failures.length > 0) {
  console.log(`\nInforme: ${failures.length} incumplimiento(s); --report no bloquea.`);
} else {
  console.log('\n✓ Los 20 sets de TOEFL Listening pasan el guardián transversal de longitud.');
}
