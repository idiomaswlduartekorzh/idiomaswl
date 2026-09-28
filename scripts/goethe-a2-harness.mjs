#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { createGoetheA2WorkOrder, emptyGoetheA2Run, loadGoetheA2Harness, validateGoetheA2Harness } from './lib/goethe-a2-harness-core.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/, '').split('=');
  return [key, value.length ? value.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['mode', 'set', 'run', 'output'].includes(key), `Unknown flag: ${key}`);
const mode = args.mode ?? 'inventory';
assert.ok(['inventory', 'scaffold'].includes(mode), `Unknown mode: ${mode}`);

const harness = loadGoetheA2Harness(root);
const failures = validateGoetheA2Harness(harness);
if (failures.length) {
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

if (mode === 'inventory') {
  console.log(JSON.stringify({
    targetSets: harness.ledger.sets.length,
    currentRelease: harness.release.sets.map(row => ({ id: row.id, state: row.state, published: row.published })),
    agents: harness.blueprint.agentStages.map(stage => ({ id: stage.id, gate: stage.gate })),
    audioGeneration: harness.blueprint.audioPolicy.generationDefault,
  }, null, 2));
  process.exit(0);
}

const set = Number(args.set);
const run = args.run ?? 'round-1';
assert.ok(Number.isInteger(set) && set >= 1 && set <= 10, 'scaffold mode requires --set=1..10');
const baseCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const order = createGoetheA2WorkOrder(harness, set, run, baseCommit);
const output = path.resolve(args.output ?? path.join(root, 'artifacts/goethe-a2-harness', `set-${set}`, run));
const allowedRoot = path.join(root, 'artifacts/goethe-a2-harness');
const relative = path.relative(allowedRoot, output);
assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'output must stay inside artifacts/goethe-a2-harness');
assert.ok(!fs.existsSync(output), `refusing to overwrite existing run: ${output}`);
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'work-order.json'), `${JSON.stringify(order, null, 2)}\n`);
fs.writeFileSync(path.join(output, 'run.json'), `${JSON.stringify(emptyGoetheA2Run(order, harness.blueprint), null, 2)}\n`);
console.log(JSON.stringify({ output, set, run, state: 'NEEDS_DRAFT', releaseTarget: 'AUDIO_BLOCKED' }, null, 2));
