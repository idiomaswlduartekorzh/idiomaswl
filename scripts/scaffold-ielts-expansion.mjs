#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const blueprint = JSON.parse(fs.readFileSync(path.join(root, 'config/ielts-harness/factory-blueprint.json'), 'utf8'));
const output = path.resolve(root, process.argv.find(argument => argument.startsWith('--output='))?.slice(9)
  ?? 'output/ielts-expansion-sets-21-40.json');
assert.equal(blueprint.schemaVersion, 1);
const [first, last] = blueprint.nextRange;
const sets = Array.from({ length: last - first + 1 }, (_, index) => ({
  set: first + index,
  state: 'CONTENT_NOT_STARTED',
  referenceSet: blueprint.referenceSet,
  gates: Object.fromEntries(blueprint.agentStages.map(stage => [stage.gate, 'PENDING'])),
  estimatedCharacters: blueprint.audioEconomics.planningCharactersPerSet,
  estimatedCredits: blueprint.audioEconomics.planningCreditsPerSet,
  audioGenerationAuthorized: false,
}));
const plan = { schemaVersion: 1, generatedAt: new Date().toISOString(), blueprint: 'config/ielts-harness/factory-blueprint.json',
  sets, summary: { sets: sets.length, range: [first, last], generationAuthorized: false } };
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({ status: 'PASS', output, sets: sets.length, generationAuthorized: false }, null, 2));
