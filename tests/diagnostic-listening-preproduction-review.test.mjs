import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import approvals from '../config/diagnostic/english-listening-preproduction-approvals.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import {
  compileDiagnosticListeningPreproductionApprovals,
  createDiagnosticListeningPreproductionReviewPacket,
  diagnosticListeningPreproductionReadiness,
  validateDiagnosticListeningPreproductionReviewPacket,
} from '../scripts/lib/diagnostic-listening-preproduction-review.mjs';

const briefs = ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.filter(brief => brief.level === 'A1');

function completed(role, reviewerId) {
  const packet = createDiagnosticListeningPreproductionReviewPacket({
    role,
    level: 'A1',
    briefs,
    generatedAt: '2026-09-25T08:00:00.000Z',
  });
  packet.reviewer = { id: reviewerId, affiliation: 'independent-review', attestsIndependentHumanReview: true };
  packet.reviewedAt = '2026-09-25T09:00:00.000Z';
  packet.entries = packet.entries.map(entry => ({
    ...entry,
    decision: 'APPROVED',
    checklist: Object.fromEntries(Object.keys(entry.checklist).map(key => [key, true])),
  }));
  return packet;
}

test('preproduction packets separate linguistic material from answer-key review', () => {
  const linguistic = createDiagnosticListeningPreproductionReviewPacket({
    role: 'linguistic-reviewer', level: 'A1', briefs, generatedAt: '2026-09-25T08:00:00.000Z',
  });
  const assessment = createDiagnosticListeningPreproductionReviewPacket({
    role: 'assessment-reviewer', level: 'A1', briefs, generatedAt: '2026-09-25T08:00:00.000Z',
  });
  assert.equal(linguistic.entries.length, 6);
  assert.doesNotMatch(JSON.stringify(linguistic), /correctIndex|distractorRationales/);
  assert.match(JSON.stringify(assessment), /correctIndex/);
  assert.equal(linguistic.privacy, 'PRIVATE_ASSESSMENT_REVIEW_MATERIAL_DO_NOT_PUBLISH');
});

test('two independent complete reviews produce exact hash-bound approvals', () => {
  const packets = [completed('linguistic-reviewer', 'linguist-01'), completed('assessment-reviewer', 'assessor-02')];
  packets.forEach(packet => assert.equal(validateDiagnosticListeningPreproductionReviewPacket(packet, briefs).length, 6));
  const manifest = compileDiagnosticListeningPreproductionApprovals({ briefs, packets });
  assert.equal(manifest.approvals.length, 6);
  assert.equal(diagnosticListeningPreproductionReadiness(briefs, manifest).ready, true);
  assert.ok(manifest.approvals.every(approval => approval.reviewers.length === 2));
});

test('preproduction fails closed on shared identities, changed content and empty committed approvals', () => {
  assert.throws(() => compileDiagnosticListeningPreproductionApprovals({
    briefs,
    packets: [completed('linguistic-reviewer', 'same-reviewer'), completed('assessment-reviewer', 'same-reviewer')],
  }), /must be independent/);

  const stale = completed('assessment-reviewer', 'assessor-02');
  stale.entries[0].material.questions[0].prompt = 'Changed after review';
  assert.throws(() => validateDiagnosticListeningPreproductionReviewPacket(stale, briefs), /changed or stale/);

  const readiness = diagnosticListeningPreproductionReadiness(briefs, approvals);
  assert.equal(readiness.ready, false);
  assert.equal(readiness.approvedBriefs, 0);
  assert.ok(readiness.blockers.includes('PREPRODUCTION_APPROVALS_INCOMPLETE'));
});

test('preproduction tooling keeps review material private and recording generation gated', async () => {
  const scaffold = await readFile(new URL('../scripts/scaffold-diagnostic-listening-preproduction-review.mjs', import.meta.url), 'utf8');
  const recorder = await readFile(new URL('../scripts/record-diagnostic-listening-preproduction-approvals.mjs', import.meta.url), 'utf8');
  const generator = await readFile(new URL('../scripts/generate-diagnostic-listening-audio.mjs', import.meta.url), 'utf8');
  assert.match(scaffold, /\.diagnostic-private/);
  assert.match(scaffold, /Refusing to overwrite/);
  assert.match(recorder, /RECORD_DIAGNOSTIC_LISTENING_PREPRODUCTION/);
  assert.match(recorder, /--applied-by/);
  assert.match(generator, /listening preproduction review is incomplete/);
  assert.match(generator, /preproductionReady/);
});
