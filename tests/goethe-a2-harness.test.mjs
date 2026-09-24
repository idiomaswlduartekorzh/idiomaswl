import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  createGoetheA2WorkOrder,
  fingerprint,
  harnessFingerprints,
  loadGoetheA2Harness,
  stableStringify,
  validateGoetheA2Harness,
} from '../scripts/lib/goethe-a2-harness-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const harness = loadGoetheA2Harness(root);

test('official A2 shape, scoring and audio repetitions are frozen', () => {
  assert.deepEqual(validateGoetheA2Harness(harness), []);
  const contract = harness.blueprint.officialContract;
  assert.equal(contract.parts, 13);
  assert.equal(contract.totalResponses, 45);
  assert.equal(contract.skills.reading.scoredItems, 20);
  assert.equal(contract.skills.listening.scoredItems, 20);
  assert.deepEqual(contract.skills.listening.playsByPart, [2, 1, 1, 2]);
  assert.deepEqual(contract.passRules, { totalMinimum: 60, writtenMinimum: 45, writtenMaximum: 75, oralMinimum: 15, oralMaximum: 25 });
});

test('all five legacy A2 sets are fail-closed', () => {
  assert.equal(harness.release.sets.length, 5);
  for (const row of harness.release.sets) {
    assert.equal(row.state, 'LEGACY_HOLD');
    assert.equal(row.published, false);
    for (const capability of harness.blueprint.releaseCapabilities.filter(value => value !== 'published')) assert.equal(row[capability], false);
  }
});

test('audio needs authorization and can never publish as a generation side effect', () => {
  const policy = harness.blueprint.audioPolicy;
  assert.equal(policy.generationDefault, 'blocked');
  assert.equal(policy.generationRequiresFreshCreditSnapshot, true);
  assert.equal(policy.generationRequiresExplicitHumanAuthorization, true);
  assert.equal(policy.generationNeverPublishes, true);
  assert.equal(policy.technicalQaRequired, true);
  assert.equal(policy.humanListeningRequired, true);
});

test('visual policy records the exam-editorial look and rejects AI-looking photography', () => {
  const policy = harness.blueprint.visualPolicy;
  assert.equal(policy.style, 'functional-exam-editorial');
  assert.equal(policy.deterministicLayoutPreferred, true);
  assert.ok(policy.forbiddenLooks.some(value => value.includes('generative-AI')));
  assert.ok(policy.preferredAssets.includes('classified card'));
});

test('topic ledger covers ten distinct sets without repeated domains or interactions', () => {
  assert.deepEqual(harness.ledger.sets.map(row => row.set), [1,2,3,4,5,6,7,8,9,10]);
  const domains = harness.ledger.sets.flatMap(row => row.domains);
  const interactions = harness.ledger.sets.map(row => row.interaction);
  assert.equal(new Set(domains).size, domains.length);
  assert.equal(new Set(interactions).size, interactions.length);
});

test('work orders bind one set to source, blueprint, ledger, prompts and harness fingerprints', () => {
  const order = createGoetheA2WorkOrder(harness, 1, 'golden-1', 'abcdef1234567890');
  assert.equal(order.set, 1);
  assert.equal(order.releaseTarget, 'AUDIO_BLOCKED');
  assert.equal(order.requiredStages.length, 13);
  for (const value of Object.values(order.fingerprints)) assert.match(value, /^[a-f0-9]{64}$/);
  assert.deepEqual(order.fingerprints, harnessFingerprints(harness));
});

test('fingerprints are stable and invalidate when policy changes', () => {
  assert.equal(stableStringify({ b: 2, a: 1 }), stableStringify({ a: 1, b: 2 }));
  assert.equal(fingerprint({ b: 2, a: 1 }), fingerprint({ a: 1, b: 2 }));
  const changed = structuredClone(harness);
  changed.blueprint.audioPolicy.generationDefault = 'allowed';
  assert.notEqual(harnessFingerprints(changed).blueprint, harnessFingerprints(harness).blueprint);
  assert.ok(validateGoetheA2Harness(changed).some(failure => failure.includes('audio must remain blocked')));
});
