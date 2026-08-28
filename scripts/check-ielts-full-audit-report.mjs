#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = relativePath => readFileSync(path.join(root, relativePath), 'utf8');
const json = relativePath => JSON.parse(read(relativePath));
const report = read('docs/ielts-academic-2026-full-audit-2026-08-28.md');
const plan = json('docs/ielts-2026-audio-generation-plan-2026-08-28.json');
const closure = json('docs/ielts-non-audio-closure-2026-08-28.json');
const cache = json('docs/ielts-audio-cache-reuse-2026-08-28.json');

function testsIn(relativePath) {
  return [...read(relativePath).matchAll(/^test\(/gm)].length;
}

function thousands(value) {
  return new Intl.NumberFormat('es-CO').format(value);
}

const listeningWords = plan.rows.map(row => row.transcriptWords);
const firstThreeWords = plan.rows.slice(0, 3).map(row => row.transcriptWords);
const academicTests = testsIn('tests/ielts-academic-2026-contract.test.mjs');
const reviewTests = testsIn('tests/ielts-review-scoring.test.mjs');
const fullstackTests = testsIn('tests/ielts-fullstack-results.test.mjs');
const audioPipelineTests = testsIn('tests/ielts-audio-pipeline.test.mjs');
const audioTimingTests = testsIn('tests/ielts-audio-timing.test.mjs');

assert.equal(plan.rows.length, 20);
assert.equal(closure.nonAudioReadySets.length, 20);
assert.equal(closure.audioReadySets.length, 0);
assert.equal(cache.currentManifestSha256, plan.manifestSha256);

const requiredEvidence = [
  '**APROBADO en contenido, UI/UX y full-stack; BLOQUEADO para release IELTS completo por 23 gates de audio**',
  `| Palabras por guion Listening | ${thousands(Math.min(...listeningWords))}–${thousands(Math.max(...listeningWords))} |`,
  `Sets 1–3: los guiones ya pasan el proxy temporal con ${thousands(Math.min(...firstThreeWords))}–${thousands(Math.max(...firstThreeWords))} palabras`,
  `su guion vigente ya tiene ${thousands(plan.rows.find(row => row.setId === 'set-4').transcriptWords)} palabras`,
  `Set 5: el guion de referencia ya tiene ${thousands(plan.rows.find(row => row.setId === 'set-5').transcriptWords)} palabras`,
  `| Full-stack | ${academicTests} contratos Academic 2026, ${reviewTests} de scoring/review y ${fullstackTests} de entrega/privacidad | ${academicTests + reviewTests + fullstackTests}/${academicTests + reviewTests + fullstackTests} |`,
  `test:ielts-academic-2026    ${academicTests}/${academicTests}`,
  `test:ielts-review           ${reviewTests}/${reviewTests}`,
  `test:ielts-fullstack        ${fullstackTests}/${fullstackTests}`,
  `test:ielts-audio-pipeline    ${audioPipelineTests}/${audioPipelineTests}`,
  `test:ielts-audio-timing      ${audioTimingTests}/${audioTimingTests}`,
  `${thousands(closure.totalLiveControls)} controles`,
  closure.closureSha256,
  plan.manifestSha256,
  `${thousands(cache.invoice.reusableCharacters)} caracteres`,
  `${thousands(cache.invoice.incrementalCredits)} tras redondear cada solicitud`,
  `${thousands(cache.capacitySnapshot.incrementalCreditsExceedSingleResetLimitBy)} créditos por debajo`,
  '`fieldset`/`legend` y radios nativos',
  '`aria-busy` y regiones live',
];

for (const evidence of requiredEvidence) {
  assert.ok(report.includes(evidence), `stale or missing IELTS full-audit evidence: ${evidence}`);
}

console.log(JSON.stringify({
  status: 'PASS',
  report: 'docs/ielts-academic-2026-full-audit-2026-08-28.md',
  manifestSha256: plan.manifestSha256,
  nonAudioReadySets: closure.nonAudioReadySets.length,
  audioReadySets: closure.audioReadySets.length,
  totalLiveControls: closure.totalLiveControls,
  tests: {
    academic: academicTests,
    review: reviewTests,
    fullstack: fullstackTests,
    audioPipeline: audioPipelineTests,
    audioTiming: audioTimingTests,
  },
}, null, 2));
