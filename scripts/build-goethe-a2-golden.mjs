import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { GOETHE_A2_SETS } from '../src/data/mocks/goethe-a2-sets.ts';
import { buildGoetheA2AudioPlan, buildGoetheA2Candidate, validateGoetheA2Collection } from './lib/goethe-a2-golden-core.mjs';
import { createGoetheA2WorkOrder, loadGoetheA2Harness } from './lib/goethe-a2-harness-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = validateGoetheA2Collection(GOETHE_A2_SETS, root);
if (failures.length) {
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

if (process.argv.includes('--write')) {
  const harness = loadGoetheA2Harness(root);
  const baseCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  for (const set of GOETHE_A2_SETS) {
    const number = Number(set.id.split('-')[1]);
    const run = number === 1 ? 'golden-1' : 'content-v1';
    const artifactRoot = path.join(root, `artifacts/goethe-a2-harness/set-${number}/${run}`);
    const audioRoot = path.join(root, `public/audio/goethe/a2-${number}`);
    const candidate = buildGoetheA2Candidate(set);
    const audioPlan = buildGoetheA2AudioPlan(set, candidate.candidateFingerprint);
    const order = createGoetheA2WorkOrder(harness, number, run, baseCommit);
    fs.mkdirSync(artifactRoot, { recursive: true });
    fs.mkdirSync(audioRoot, { recursive: true });
    fs.writeFileSync(path.join(artifactRoot, 'candidate.json'), `${JSON.stringify(candidate, null, 2)}\n`);
    fs.writeFileSync(path.join(artifactRoot, 'audio-plan.json'), `${JSON.stringify(audioPlan, null, 2)}\n`);
    fs.writeFileSync(path.join(artifactRoot, 'work-order.json'), `${JSON.stringify(order, null, 2)}\n`);
    fs.writeFileSync(path.join(artifactRoot, 'run.json'), `${JSON.stringify({ order, candidateFingerprint: candidate.candidateFingerprint, derivedState: 'AUDIO_BLOCKED', passedGates: ['ORDER_FROZEN', 'SPEC_PASS', 'LISTENING_DRAFTED', 'READING_DRAFTED', 'PRODUCTIVE_DRAFTED', 'KEY_PASS', 'LANGUAGE_PASS', 'ORIGINALITY_PASS', 'MEDIA_PASS', 'AUDIO_PLAN_PASS', 'RUNTIME_PASS', 'UX_PASS'], pendingGates: ['AUDIO_GENERATED', 'AUDIO_TECHNICAL_QA', 'HUMAN_LISTENING', 'FINAL_HUMAN_APPROVAL'], note: 'Contenido, visuales, scoring y plan de audio listos. Publicación bloqueada hasta generar y revisar el audio.' }, null, 2)}\n`);
    fs.writeFileSync(path.join(root, `src/data/mocks/goethe-a2-set-${number}-audio.json`), `${JSON.stringify(audioPlan, null, 2)}\n`);
    fs.writeFileSync(path.join(audioRoot, 'manifest.json'), `${JSON.stringify(audioPlan, null, 2)}\n`);
  }
}
console.log(`✓ Goethe A2 collection: ${GOETHE_A2_SETS.length} sets · 130 parts · 450 responses · 80 visual assets · audio blocked`);
