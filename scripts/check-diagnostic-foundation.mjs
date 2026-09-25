#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { ENGLISH_DIAGNOSTIC_BLUEPRINT, validateDiagnosticBlueprint } from '../src/lib/diagnostic/blueprint.ts';

const baseline = JSON.parse(readFileSync('docs/nivel-radar-baseline-2026-09-24.json', 'utf8'));
const source = readFileSync(baseline.source, 'utf8');
const digest = createHash('sha256').update(source).digest('hex');

assert.equal(digest, baseline.sourceSha256, 'Nivel Radar legacy changed: recapture or retire the audited baseline');
assert.match(source, /answer:\s*number/u, 'legacy baseline no longer exposes the answer contract captured by the audit');
assert.match(source, /return atLevel\[0\]/u, 'legacy question selection changed: recapture the baseline');
assert.match(source, /nextPosition >= minimumEvidence && nextErrors >= 2/u, 'legacy stop rule changed: recapture the baseline');
assert.doesNotMatch(source, /skill:\s*'writing'/u, 'legacy baseline unexpectedly gained a writing skill');
assert.equal(baseline.pool.totalItems, 76);
assert.equal(baseline.pool.byLevelAndSkill.A1.listening, 0);
assert.equal(baseline.pool.byLevelAndSkill.A2.listening, 0);
assert.equal(baseline.pool.toeflC1ImportedItems, 0);
assert.equal(baseline.delivery.answerKeysDeliveredToBrowser, true);
assert.equal(baseline.delivery.writingMeasured, false);

const blueprintErrors = validateDiagnosticBlueprint(ENGLISH_DIAGNOSTIC_BLUEPRINT);
assert.deepEqual(blueprintErrors, [], `diagnostic blueprint invalid: ${blueprintErrors.join('; ')}`);

console.log(JSON.stringify({
  status: 'PASS',
  baselineSha256: digest,
  blueprint: ENGLISH_DIAGNOSTIC_BLUEPRINT.id,
  dimensions: ENGLISH_DIAGNOSTIC_BLUEPRINT.dimensions.map(item => item.skill),
}, null, 2));
