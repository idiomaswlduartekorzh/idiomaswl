import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  diagnosticListeningTranscriptSha256,
} from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import {
  ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
} from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import {
  ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
} from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';
import {
  ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES,
  materializeRecordedListeningCandidates,
} from '../src/server/diagnostic/bank/listening-recorded.en.ts';
import { buildDiagnosticListeningProductionPackage } from '../scripts/lib/diagnostic-listening-production.mjs';

const lowerBriefs = ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS;
const midBriefs = ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS;
const advancedBriefs = ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS;
const briefs = [...lowerBriefs, ...midBriefs, ...advancedBriefs];
const wordCount = value => value.trim().split(/\s+/u).length;

test('production plans have six original testlets and twelve decisions at every CEFR level', () => {
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const levelBriefs = briefs.filter(brief => brief.level === level);
    assert.equal(levelBriefs.length, 6);
    assert.equal(levelBriefs.flatMap(brief => brief.questions).length, 12);
    assert.equal(new Set(levelBriefs.map(brief => brief.id)).size, 6);
  }
});

test('production briefs remain non-selectable until immutable audio and human QA exist', () => {
  for (const brief of briefs) {
    assert.equal(brief.exposure, 'reserved');
    assert.equal(brief.status, 'production-brief');
    assert.equal(brief.audioArtifact.status, 'not-recorded');
    assert.equal(brief.audioArtifact.sha256, null);
    assert.equal(brief.audioArtifact.durationSeconds, null);
    assert.equal(brief.audioArtifact.transcriptReview, 'pending');
    assert.equal(brief.audioArtifact.alignmentReview, 'pending');
    assert.doesNotMatch(brief.audioArtifact.privateObjectPath, /^\/|public\//u);
  }
});

test('scripts fit their declared recording envelopes', () => {
  for (const brief of briefs) {
    const words = wordCount(brief.recording.turns.map(turn => turn.text).join(' '));
    const [minimumDuration, maximumDuration] = brief.recording.targetDurationSeconds;
    const [minimumPace, maximumPace] = brief.recording.paceWordsPerMinute;
    const fastestDuration = words / maximumPace * 60;
    const slowestDuration = words / minimumPace * 60;
    assert.ok(fastestDuration <= maximumDuration, `${brief.id} cannot fit its maximum duration`);
    assert.ok(slowestDuration >= minimumDuration * 0.72, `${brief.id} is too short for its duration envelope`);
    assert.ok(brief.recording.turns.every(turn => turn.text.trim() && !/[{}<>]/u.test(turn.text)));
  }
});

test('questions have balanced keys, complete rationales and listening construct coverage', () => {
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const questions = briefs.filter(brief => brief.level === level).flatMap(brief => brief.questions);
    const keyCounts = [0, 1, 2].map(index => questions.filter(question => question.correctIndex === index).length);
    assert.ok(Math.max(...keyCounts) - Math.min(...keyCounts) <= 1, `${level} answer positions are imbalanced`);
    assert.ok(new Set(questions.map(question => question.subdomain)).size >= 3);
    for (const question of questions) {
      assert.equal(question.options.length, 3);
      assert.equal(new Set(question.options).size, 3);
      assert.ok(question.rationale.trim().length >= 20);
      assert.equal(question.distractorRationales.length, 2);
      assert.ok(question.distractorRationales.every(rationale => rationale.trim().length >= 15));
    }
  }
});

test('recovered audio is used only as an aggregate production benchmark', () => {
  for (const brief of briefs) {
    assert.equal(brief.benchmark.source, 'aggregate-legacy-duration-profile');
    assert.doesNotMatch(JSON.stringify(brief), /legacy-listening-|audio-sha256|welearn-legacy/);
  }
});

test('private recording package contains scripts and delivery metadata but no assessment content', () => {
  const productionPackage = buildDiagnosticListeningProductionPackage(briefs);
  assert.equal(productionPackage.media.length, 36);
  assert.match(productionPackage.packageSha256, /^[a-f0-9]{64}$/u);
  for (const medium of productionPackage.media) {
    assert.deepEqual(Object.keys(medium).sort(), [
      'delivery', 'level', 'mediaId', 'paceWordsPerMinute', 'privateObjectPath',
      'productionVersion', 'speakers', 'targetDurationSeconds', 'transcript', 'transcriptSha256',
    ]);
    const brief = briefs.find(candidate => candidate.id === medium.mediaId);
    assert.ok(brief);
    assert.equal(medium.transcriptSha256, diagnosticListeningTranscriptSha256(brief));
    assert.match(medium.transcript, /^(?:narrator|speaker-a|speaker-b): /u);
  }
});

test('the committed publication manifest creates no selectable or reviewable candidate', () => {
  assert.equal(ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES.length, 0);
});

test('a verified recording materializes only as a reserved draft bound to audio and transcript hashes', () => {
  const brief = briefs[0];
  const publication = {
    mediaId: brief.audioArtifact.mediaId,
    productionVersion: brief.productionVersion,
    audioSha256: 'a'.repeat(64), transcriptSha256: diagnosticListeningTranscriptSha256(brief), durationSeconds: 25,
    transcriptReviewerId: 'transcript-reviewer-1', alignmentReviewerId: 'alignment-reviewer-1',
    reviewedAt: '2026-09-25T12:00:00.000Z',
  };
  const candidates = materializeRecordedListeningCandidates([brief], {
    manifestVersion: 'fixture-v1', updatedAt: publication.reviewedAt, publications: [publication],
  });
  assert.equal(candidates.length, 2);
  assert.equal(candidates.every(record => record.status === 'reserved' && record.exposure === 'reserved'), true);
  assert.equal(candidates.every(record => record.review.status === 'draft'), true);
  assert.equal(candidates.every(record => record.publicItem.stimulus.kind === 'audio'), true);
  assert.equal(candidates[0].source.reference,
    `fixture-v1:${brief.audioArtifact.mediaId}:audio-sha256:${'a'.repeat(64)}:transcript-sha256:${publication.transcriptSha256}`);
});

test('recording materialization rejects stale versions, invalid duration and non-independent audio QA', () => {
  const brief = briefs[0];
  const base = {
    mediaId: brief.audioArtifact.mediaId, productionVersion: brief.productionVersion,
    audioSha256: 'a'.repeat(64), transcriptSha256: diagnosticListeningTranscriptSha256(brief), durationSeconds: 25,
    transcriptReviewerId: 'reviewer-1', alignmentReviewerId: 'reviewer-2', reviewedAt: '2026-09-25T12:00:00.000Z',
  };
  const manifest = publication => ({ manifestVersion: 'fixture-v1', updatedAt: base.reviewedAt, publications: [publication] });
  assert.throws(() => materializeRecordedListeningCandidates([brief], manifest({ ...base, productionVersion: 'stale' })), /version mismatch/);
  assert.throws(() => materializeRecordedListeningCandidates([brief], manifest({ ...base, transcriptSha256: 'b'.repeat(64) })), /transcript hash mismatch/);
  assert.throws(() => materializeRecordedListeningCandidates([brief], manifest({ ...base, durationSeconds: 200 })), /duration outside/);
  assert.throws(() => materializeRecordedListeningCandidates([brief], manifest({ ...base, alignmentReviewerId: 'reviewer-1' })), /must be independent/);
});
