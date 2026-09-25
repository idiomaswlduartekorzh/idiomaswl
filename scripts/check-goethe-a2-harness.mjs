import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadGoetheA2Harness, validateGoetheA2Harness } from './lib/goethe-a2-harness-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const harness = loadGoetheA2Harness(root);
const failures = validateGoetheA2Harness(harness);

if (failures.length) {
  console.error(`Goethe A2 harness check failed (${failures.length})`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`✓ Goethe A2 harness: ${harness.ledger.sets.length} original sets, ${harness.blueprint.agentStages.length} isolated roles, all content-ready and audio-blocked`);
