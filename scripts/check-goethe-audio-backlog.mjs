import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { GOETHE_B1_MASTER_1_BLUEPRINT } from '../src/data/mocks/goethe-b1-master-set-1.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const json = relative => JSON.parse(readFileSync(path.join(root, relative), 'utf8'));
const backlog = json('config/goethe-audio/backlog.json');
const a1Release = json('src/data/mocks/goethe-a1-audio-release.json');
const b1Release = json('src/data/mocks/goethe-b1-release.json');

assert.equal(backlog.schemaVersion, 1);
assert.deepEqual(backlog.a1.releasedSets, a1Release.releasedSets, 'A1 released-set inventory drifted');
assert.deepEqual(backlog.a1.pendingSets.map(entry => entry.set), [8, 9, 10]);
assert.equal(backlog.a1.publicOutputsPerPendingSet.count, 19);

for (const expected of backlog.a1.pendingSets) {
  const run = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings',
    '--experimental-loader', './tests/ts-paths-loader.mjs',
    'scripts/generate-goethe-a1-set2-audio.mjs', `--set=${expected.set}`,
  ], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr || `A1 Set ${expected.set} dry run failed`);
  const field = label => run.stdout.match(new RegExp(`^\\s*${label}:\\s*(\\S+)`, 'm'))?.[1];
  assert.equal(Number(field('jobs')), expected.sourceClips, `A1 Set ${expected.set} clip count drifted`);
  assert.equal(Number(field('characters')), expected.billableCharacters, `A1 Set ${expected.set} character count drifted`);
  assert.equal(field('manifest'), expected.sourceManifestHash, `A1 Set ${expected.set} manifest drifted`);
  assert.equal(expected.estimatedCreditsAtCurrentModel, Math.ceil(expected.billableCharacters * backlog.a1.generation.creditMultiplier));
  assert.equal(existsSync(path.join(root, `public/audio/goethe/a1-${expected.set}/hoeren-komplett.mp3`)), false, `A1 Set ${expected.set} is pending but already has an untracked master`);
}

assert.equal(backlog.a2.sets.length, 10);
let a2Characters = 0;
for (const expected of backlog.a2.sets) {
  const plan = json(`src/data/mocks/goethe-a2-set-${expected.set}-audio.json`);
  const scripts = plan.sequence.flatMap(part => part.scripts);
  const turns = scripts.flatMap(script => script.turns);
  const frozenCharacters = plan.outro.length + plan.sequence.reduce((sum, part) => (
    sum + part.instruction.length + part.scripts.flatMap(script => script.turns).reduce((partSum, turn) => partSum + turn.text.length, 0)
  ), 0);
  const sequenceHash = createHash('sha256').update(JSON.stringify({ sequence: plan.sequence, outro: plan.outro })).digest('hex').slice(0, 16);
  assert.equal(plan.status, 'script-ready-audio-blocked');
  assert.equal(scripts.length, expected.scriptUnits, `A2 Set ${expected.set} script-unit count drifted`);
  assert.equal(turns.length, expected.turns, `A2 Set ${expected.set} turn count drifted`);
  assert.equal(frozenCharacters, expected.frozenCharacters, `A2 Set ${expected.set} character count drifted`);
  assert.equal(sequenceHash, expected.sequenceHash, `A2 Set ${expected.set} sequence hash drifted`);
  assert.equal(plan.candidateFingerprint.startsWith(expected.candidateFingerprint), true, `A2 Set ${expected.set} candidate fingerprint drifted`);
  assert.equal(plan.master.path, `/audio/goethe/a2-${expected.set}/goethe-a2-${expected.set}-master.mp3`);
  assert.equal(existsSync(path.join(root, plan.master.path.slice(1))), false, `A2 Set ${expected.set} remains blocked but already has an untracked master`);
  a2Characters += frozenCharacters;
}
assert.equal(a2Characters, backlog.a2.frozenCharacterTotal);

const b1 = backlog.b1.listeningContract;
const sourceB1 = GOETHE_B1_MASTER_1_BLUEPRINT.modules.listening;
assert.equal(sourceB1.status, 'AUDIO_BLOCKED');
assert.equal(sourceB1.scriptsReady, false);
assert.equal(sourceB1.audioReady, false);
assert.equal(sourceB1.itemCount, b1.itemsPerSet);
assert.equal(sourceB1.minutesApprox, b1.minutesApprox);
assert.deepEqual(sourceB1.parts.map(part => ({
  part: part.part,
  family: part.family,
  scriptUnits: part.part === 1 ? 5 : 1,
  items: part.items,
  plays: part.plays,
})), b1.parts);
assert.equal(b1Release.sets.length, 10);
assert.equal(b1Release.sets.every(set => set.state === 'AUDIO_BLOCKED' && set.audioReady === false && set.published === false), true);
for (const set of backlog.b1.sets) {
  assert.equal(existsSync(path.join(root, `public/audio/goethe/b1-${set}/goethe-b1-${set}-hoeren-master.mp3`)), false, `B1 Set ${set} remains blocked but already has an untracked master`);
}

const documentation = readFileSync(path.join(root, 'docs/GOETHE-AUDIO-PENDIENTE-A1-B1.md'), 'utf8');
assert.match(documentation, /A1 1–7 ya están liberados/);
assert.match(documentation, /A2 Set 1/);
assert.match(documentation, /faltan los guiones completos de Hören/);
assert.match(documentation, /No se generan, no se copian y no se usan/);

console.log('Goethe audio backlog verified: A1 8–10 executable; A2 1–10 script-frozen; B1 1–10 correctly blocked before script authoring.');
