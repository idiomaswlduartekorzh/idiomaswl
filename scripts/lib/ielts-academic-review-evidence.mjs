import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { objectiveRows } from './ielts-answer-key-audit.mjs';
import { ieltsAnswerUnits } from './ielts-text-metrics.mjs';

export const sha256 = value => createHash('sha256').update(value).digest('hex');

export const normalizeAcademicEvidence = value => String(value).toLowerCase().normalize('NFKC')
  .replace(/[’']/gu, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim();

export function ieltsAcademicMaterialBinding(mock) {
  const objective = objectiveRows(mock);
  const listening = mock.sections.filter(section => section.skill === 'listening').map(section => ({
    part: section.part,
    title: section.title,
    transcript: section.transcript,
    questions: section.questions,
  }));
  const reading = mock.sections.filter(section => section.skill === 'reading').map(section => ({
    part: section.part,
    title: section.title,
    passage: section.passage,
    questions: section.questions,
  }));
  const objectiveSha256 = sha256(JSON.stringify(objective));
  const listeningMaterialSha256 = sha256(JSON.stringify(listening));
  const readingMaterialSha256 = sha256(JSON.stringify(reading));
  return {
    objectiveSha256,
    listeningMaterialSha256,
    readingMaterialSha256,
    objectiveMaterialSha256: sha256(JSON.stringify({
      objectiveSha256,
      listeningMaterialSha256,
      readingMaterialSha256,
    })),
  };
}

export function auditIeltsAcademicReview(mock, review) {
  const { reviewSha256, ...reviewCore } = review;
  assert.equal(sha256(JSON.stringify(reviewCore)), reviewSha256, `Set ${review.set}: review digest is stale`);
  assert.equal(review.schemaVersion, 1, `Set ${review.set}: unsupported review schema`);
  assert.equal(review.status, 'APPROVED', `Set ${review.set}: academic review is not approved`);
  assert.equal(review.reviewer?.kind, 'academic-agent', `Set ${review.set}: reviewer kind is not identified`);
  assert.ok(review.reviewer?.id, `Set ${review.set}: reviewer id is missing`);
  assert.deepEqual(review.binding, ieltsAcademicMaterialBinding(mock), `Set ${review.set}: objective material changed after review`);

  const rows = objectiveRows(mock);
  assert.deepEqual(review.objectiveRows, rows, `Set ${review.set}: pinned objective key, response IDs or options changed`);
  assert.equal(rows.reduce((sum, row) => sum + row.weight, 0), 80, `Set ${review.set}: expected 80 objective points`);
  assert.equal(review.evidence.length, rows.length, `Set ${review.set}: evidence must cover every response row`);
  assert.equal(new Set(review.evidence.map(entry => entry.responseKey)).size, rows.length, `Set ${review.set}: duplicate or missing evidence keys`);

  let approvedPoints = 0;
  for (const row of rows) {
    const evidence = review.evidence.find(entry => entry.responseKey === row.key);
    assert.ok(evidence, `Set ${review.set} ${row.skill} Q${row.number}: evidence is missing`);
    assert.equal(evidence.skill, row.skill, `Set ${review.set} ${row.key}: evidence skill drift`);
    assert.equal(evidence.question, row.number, `Set ${review.set} ${row.key}: evidence number drift`);
    assert.equal(evidence.kind, row.kind, `Set ${review.set} ${row.key}: evidence kind drift`);
    assert.equal(evidence.points, row.weight, `Set ${review.set} ${row.key}: evidence weight drift`);
    assert.deepEqual(evidence.acceptedAnswers, row.accepted, `Set ${review.set} ${row.key}: accepted answers changed`);
    assert.equal(evidence.verdict, 'SUPPORTED', `Set ${review.set} ${row.key}: evidence is not approved`);
    assert.ok(Number.isInteger(evidence.sourcePart), `Set ${review.set} ${row.key}: source part is missing`);
    assert.ok(typeof evidence.sourceExcerpt === 'string' && evidence.sourceExcerpt.trim().length >= 20,
      `Set ${review.set} ${row.key}: source excerpt is insufficient`);
    assert.equal(evidence.sourceExcerptSha256, sha256(evidence.sourceExcerpt),
      `Set ${review.set} ${row.key}: source excerpt digest is stale`);
    const sourceSection = mock.sections.find(section => section.skill === row.skill && section.part === evidence.sourcePart);
    const sourceMaterial = row.skill === 'listening' ? sourceSection?.transcript : sourceSection?.passage;
    assert.ok(sourceMaterial?.includes(evidence.sourceExcerpt),
      `Set ${review.set} ${row.key}: cited excerpt is absent from the effective material`);
    assert.ok(typeof evidence.rationale === 'string' && evidence.rationale.trim().length >= 20,
      `Set ${review.set} ${row.key}: rationale is insufficient`);
    if (evidence.evidenceClass === 'completion') {
      const excerpt = ` ${normalizeAcademicEvidence(evidence.sourceExcerpt)} `;
      assert.ok(typeof evidence.sourceAnswerForm === 'string' && evidence.sourceExcerpt.includes(evidence.sourceAnswerForm),
        `Set ${review.set} ${row.key}: cited source answer form is absent from its excerpt`);
      assert.deepEqual(evidence.acceptedAnswerEvidence?.map(item => item.answer), row.accepted,
        `Set ${review.set} ${row.key}: accepted-answer evidence is incomplete`);
      assert.ok(evidence.acceptedAnswerEvidence.every(item => [
        'LITERAL', 'ORTHOGRAPHIC_VARIANT', 'NUMERIC_EQUIVALENT', 'GRAMMATICAL_VARIANT', 'SEMANTIC_EQUIVALENT',
      ].includes(item.basis) && item.rationale?.length >= 12),
      `Set ${review.set} ${row.key}: accepted-answer rationale is incomplete`);
      assert.ok(row.accepted.some(answer => excerpt.includes(` ${normalizeAcademicEvidence(answer)} `))
        || evidence.acceptedAnswerEvidence.some(item => item.basis === 'NUMERIC_EQUIVALENT'),
      `Set ${review.set} ${row.key}: completion lacks literal or documented numeric evidence`);
      assert.ok(Number.isInteger(evidence.maxWords) && evidence.maxWords > 0,
        `Set ${review.set} ${row.key}: completion limit is missing`);
      assert.ok(row.accepted.every(answer => ieltsAnswerUnits(answer) <= evidence.maxWords),
        `Set ${review.set} ${row.key}: accepted answer exceeds its stated limit`);
      assert.equal(evidence.limitStatus, 'PASS', `Set ${review.set} ${row.key}: completion exceeds its stated limit`);
    }
    if (['selection', 'matching'].includes(evidence.evidenceClass)) {
      assert.ok(Array.isArray(evidence.distractors) && evidence.distractors.length > 0,
        `Set ${review.set} ${row.key}: distractor review is missing`);
      assert.ok(evidence.distractors.every(item => item.verdict === 'DISMISSED' && item.rationale?.length >= 12),
        `Set ${review.set} ${row.key}: distractor review is incomplete`);
    }
    if (evidence.evidenceClass === 'judgement') {
      assert.ok(['TRUE', 'FALSE', 'NOT GIVEN', 'YES', 'NO'].includes(row.accepted[0]),
        `Set ${review.set} ${row.key}: judgement key is invalid`);
    }
    approvedPoints += row.weight;
  }
  assert.equal(approvedPoints, 80, `Set ${review.set}: approved evidence does not total 80 points`);
  assert.deepEqual(review.summary, {
    responseRows: rows.length,
    objectivePoints: 80,
    listeningPoints: 40,
    readingPoints: 40,
    supportedPoints: 80,
    ambiguousPoints: 0,
  }, `Set ${review.set}: summary drift`);
  return { set: review.set, status: 'PASS', responseRows: rows.length, objectivePoints: approvedPoints };
}
