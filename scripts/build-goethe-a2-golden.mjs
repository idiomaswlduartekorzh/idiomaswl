import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import golden from '../src/data/mocks/goethe-a2-golden-set-1.ts';
import { buildGoldenAudioPlan, buildGoldenCandidate, validateGoldenSet } from './lib/goethe-a2-golden-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = validateGoldenSet(golden, root);
if (failures.length) {
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

const candidate = buildGoldenCandidate(golden);
const audioPlan = buildGoldenAudioPlan(golden, candidate.candidateFingerprint);
if (process.argv.includes('--write')) {
  const artifactRoot = path.join(root, 'artifacts/goethe-a2-harness/set-1/golden-1');
  const audioRoot = path.join(root, 'public/audio/goethe/a2-1');
  fs.mkdirSync(audioRoot, { recursive: true });
  fs.writeFileSync(path.join(artifactRoot, 'candidate.json'), `${JSON.stringify(candidate, null, 2)}\n`);
  fs.writeFileSync(path.join(artifactRoot, 'audio-plan.json'), `${JSON.stringify(audioPlan, null, 2)}\n`);
  fs.writeFileSync(path.join(root, 'src/data/mocks/goethe-a2-set-1-audio.json'), `${JSON.stringify(audioPlan, null, 2)}\n`);
  fs.writeFileSync(path.join(audioRoot, 'manifest.json'), `${JSON.stringify(audioPlan, null, 2)}\n`);
}
console.log(`✓ Goethe A2 golden set: 13 parts · 45 responses · ${golden.media.assets.length} visual assets · audio blocked`);
