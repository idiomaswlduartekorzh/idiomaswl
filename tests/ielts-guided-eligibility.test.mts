import assert from 'node:assert/strict';
import test from 'node:test';
import eligibility from '../config/ielts-guided-eligibility.json' with { type: 'json' };
import {
  IELTS_GUIDED_ELIGIBILITY,
  IELTS_GUIDED_MOCK_IDS,
  isIeltsGuidedMockEligible,
} from '../src/data/ielts/guided-eligibility.ts';

test('guided eligibility is explicit and fail-closed while Sets 21-40 are staged', () => {
  assert.equal(eligibility.policy.failClosed, true);
  assert.deepEqual(eligibility.eligibleSets, Array.from({ length: 20 }, (_, index) => index + 1));
  assert.deepEqual(eligibility.stagedSets, Array.from({ length: 20 }, (_, index) => index + 21));
  assert.deepEqual(IELTS_GUIDED_MOCK_IDS, Array.from({ length: 20 }, (_, index) => `set-${index + 1}`));
  assert.deepEqual(IELTS_GUIDED_ELIGIBILITY.stagedSets, eligibility.stagedSets);
  assert.equal(new Set([...eligibility.eligibleSets, ...eligibility.stagedSets]).size, 40);

  for (let setNumber = 1; setNumber <= 40; setNumber += 1) {
    assert.equal(isIeltsGuidedMockEligible(`set-${setNumber}`), setNumber <= 20);
  }
});

test('the eligibility manifest declares all gates needed before a staged set can be routed', () => {
  assert.deepEqual(IELTS_GUIDED_ELIGIBILITY.requiredGates, [
    'canonical-mock',
    'listening-evidence-40-approved',
    'reading-evidence-40-approved',
    'writing-band-5.5-and-9',
    'speaking-band-5.5-and-9',
  ]);
  assert.equal(IELTS_GUIDED_ELIGIBILITY.stagedStatus, 'PENDING_EVIDENCE_REFERENCES_AND_INDEPENDENT_REVIEW');
});
