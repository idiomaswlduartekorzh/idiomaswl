import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const inventory = JSON.parse(readFileSync(new URL('../config/diagnostic/objective-candidate-inventory.json', import.meta.url)));

test('candidate inventory is explicitly non-operational and contains no answer payloads', () => {
  assert.equal(inventory.policy.operationalUseAllowed, false);
  assert.equal(inventory.summary.candidates, inventory.candidates.length);
  assert.ok(inventory.candidates.length >= 800);
  assert.equal(JSON.stringify(inventory).includes('correct_answer'), false);
  assert.equal(JSON.stringify(inventory).includes('"answer"'), false);
  assert.equal(JSON.stringify(inventory).includes('"answers"'), false);
});

test('candidate ids and content fingerprints are stable and unique', () => {
  const ids = inventory.candidates.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const item of inventory.candidates) {
    assert.match(item.source.contentSha256, /^[a-f0-9]{64}$/);
    assert.equal(item.disposition.linguisticReview, 'pending');
    assert.equal(item.disposition.psychometricCalibration, 'absent');
    assert.equal(item.exposure.content, 'public-practice');
  }
});

test('source taxonomy corrects the old Cambridge all-grammar misclassification', () => {
  const cambridge = inventory.candidates.filter((item) => item.source.family === 'cambridge-b2-practice');
  assert.ok(cambridge.some((item) => item.target.skill === 'vocabulary' && item.target.subdomain === 'collocation-and-lexical-choice'));
  assert.ok(cambridge.some((item) => item.target.skill === 'grammar' && item.target.subdomain === 'sentence-transformation'));
  assert.ok(cambridge.some((item) => item.target.skill === 'reading' && item.target.subdomain === 'multiple-choice-comprehension'));
  assert.ok(cambridge.some((item) => item.target.skill === 'listening'));
  assert.deepEqual([...new Set(cambridge.map((item) => item.target.levelRange.join('-')))], ['B2-B2']);
});

test('TOEFL candidates preserve server-only key provenance but remain public-content rewrites', () => {
  const toefl = inventory.candidates.filter((item) => item.source.family === 'toefl-reading-2026');
  assert.equal(toefl.length, 125);
  assert.ok(toefl.every((item) => item.exposure.scoringKey === 'server-only'));
  assert.ok(toefl.every((item) => item.disposition.status === 'rewrite-required'));
});

test('all Cambridge listening audio is present, fingerprinted, and quarantined for segmentation', () => {
  const listening = inventory.candidates.filter((item) => item.source.family === 'cambridge-b2-practice' && item.target.skill === 'listening');
  assert.ok(listening.length >= 300);
  assert.equal(inventory.summary.uniqueAudioFiles, 40);
  assert.equal(inventory.summary.availableAudioFiles, 40);
  assert.equal(inventory.summary.audioFilesRequiringSegmentation, 40);
  for (const item of listening) {
    assert.equal(item.stimulus.kind, 'audio');
    assert.equal(item.stimulus.audio.exists, true);
    assert.match(item.stimulus.audio.sha256, /^[a-f0-9]{64}$/);
    assert.ok(item.stimulus.audio.durationSeconds > 60);
    assert.equal(item.stimulus.audio.requiresSegmentation, true);
  }
});

