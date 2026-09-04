#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildHarnessReport, evidenceScaffold, hydrateRegistry, renderMarkdown } from './lib/ielts-harness-core.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/, '').split('=');
  return [key, value.length ? value.join('=') : 'true'];
}));
for (const key of Object.keys(args)) {
  assert.ok(['mode', 'set', 'registry', 'output-json', 'output-md', 'media'].includes(key), `Unknown flag: ${key}`);
}
const mode = args.mode ?? 'inventory';
assert.ok(['inventory', 'release', 'scaffold'].includes(mode), `Unknown mode: ${mode}`);
const setNumber = args.set ? Number(args.set) : null;
if (mode !== 'inventory') assert.ok(Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 20, `${mode} mode requires --set=1..20`);

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-'));
const inventoryPath = path.join(temporary, 'materials.json');
try {
  const materialArgs = ['--experimental-strip-types', '--no-warnings', path.join(root, 'scripts/audit-ielts-materials.mjs'), `--output=${inventoryPath}`];
  if (args.media === 'true') materialArgs.push('--media=true');
  execFileSync(process.execPath, materialArgs, { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  if (mode === 'scaffold') {
    const material = inventory.sets.find(candidate => candidate.set === setNumber);
    const scaffold = evidenceScaffold(material);
    const rendered = `${JSON.stringify(scaffold, null, 2)}\n`;
    if (args['output-json']) fs.writeFileSync(path.resolve(args['output-json']), rendered);
    else process.stdout.write(rendered);
    process.exit(0);
  }

  const registryPath = path.resolve(args.registry ?? path.join(root, 'config/ielts-harness/evidence-registry.json'));
  const registry = hydrateRegistry(JSON.parse(fs.readFileSync(registryPath, 'utf8')), root);
  const report = buildHarnessReport(inventory, registry, root);
  const selectedSets = setNumber ? report.sets.filter(set => set.set === setNumber) : report.sets;
  const selected = setNumber ? {
    ...report,
    summary: {
      total: selectedSets.length,
      releaseReady: selectedSets.filter(set => set.releaseReady).length,
      stateCounts: Object.fromEntries([...new Set(selectedSets.map(set => set.state))].map(state => [state, selectedSets.filter(set => set.state === state).length])),
    },
    sets: selectedSets,
    remediationQueue: report.remediationQueue.filter(set => set.set === setNumber),
  } : report;
  if (args['output-json']) fs.writeFileSync(path.resolve(args['output-json']), `${JSON.stringify(selected, null, 2)}\n`);
  if (args['output-md']) fs.writeFileSync(path.resolve(args['output-md']), renderMarkdown(selected));
  const summary = {
    baseCommit: selected.baseCommit,
    releaseReady: `${selected.sets.filter(set => set.releaseReady).length}/${selected.sets.length}`,
    states: selected.sets.map(set => ({ set: set.set, state: set.state, nextAction: set.nextAction })),
    outputs: { json: args['output-json'] ?? null, markdown: args['output-md'] ?? null },
  };
  console.log(JSON.stringify(summary, null, 2));
  if (mode === 'release' && selected.sets.some(set => !set.releaseReady)) process.exitCode = 1;
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
