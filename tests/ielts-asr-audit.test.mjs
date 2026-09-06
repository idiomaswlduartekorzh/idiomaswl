import assert from 'node:assert/strict';
import test from 'node:test';
import { auditAsrAlignment, editDistance, normalizedWords } from '../scripts/lib/ielts-asr-audit.mjs';

test('ASR normalization handles common IELTS number and spelling variants', () => {
  assert.deepEqual(normalizedWords("One adviser at the centre can't attend."), ['1', 'adviser', 'at', 'the', 'center', 'cannot', 'attend']);
  assert.equal(editDistance(['a', 'b', 'c'], ['a', 'x', 'c']), 1);
  assert.deepEqual(normalizedWords('07700-900-318'), ['0', '7', '7', '0', '0', '9', '0', '0', '3', '1', '8']);
  assert.deepEqual(normalizedWords('£11.50'), normalizedWords('11 pounds 50'));
});

test('reuse mode records conservative fuzzy matches for ASR spelling errors', () => {
  const report = auditAsrAlignment({
    expectedText: 'The scientist was Huygens.',
    segments: [{ start: 1, end: 2, text: 'The scientist was Hoigens.' }],
    objectiveRows: [{ number: 36, key: 'q36', kind: 'fill', accepted: ['Huygens'] }],
    allowFuzzySingleWords: true,
    maximumWordErrorRate: 1,
  });
  assert.equal(report.status, 'PASS');
  assert.equal(report.completionEvidence[0].matchKind, 'fuzzy-single-word');
});

test('ASR-only variants are reported separately from scored answers', () => {
  const report = auditAsrAlignment({
    expectedText: "The exhibit is a ship's bell.",
    segments: [{ start: 1, end: 2, text: 'The exhibit is a ship spell.' }],
    objectiveRows: [{
      number: 14,
      key: 'q14',
      kind: 'fill',
      canonicalAccepted: ['bell'],
      asrRecognitionVariants: ['ship spell'],
      accepted: ['bell', 'ship spell'],
    }],
    maximumWordErrorRate: 1,
  });
  assert.equal(report.status, 'PASS');
  assert.deepEqual(report.completionEvidence[0].candidateAcceptedAnswers, ['bell']);
  assert.deepEqual(report.completionEvidence[0].asrRecognitionVariants, ['ship spell']);
});

test('repair mode can gate answer coverage while reporting non-enforced WER', () => {
  const report = auditAsrAlignment({
    expectedText: 'This canonical transcript is intentionally much shorter.',
    segments: [{ start: 1, end: 3, text: 'Extra spoken material still contains free entry.' }],
    objectiveRows: [{ number: 17, key: 'q17', kind: 'fill', accepted: ['free entry'] }],
    enforceWordErrorRate: false,
  });
  assert.equal(report.status, 'PASS');
  assert.equal(report.wordErrorRateEnforced, false);
  assert.ok(report.wordErrorRate > report.maximumWordErrorRate);
});

test('alignment reports WER and ordered completion evidence without approving release', () => {
  const result = auditAsrAlignment({
    expectedText: 'The booking costs one pound. The room is called Cedar Hall.',
    segments: [
      { start: 1, end: 4, text: 'The booking costs 1 pound.' },
      { start: 5, end: 9, text: 'The room is called Cedar Hall.' },
    ],
    objectiveRows: [
      { number: 1, kind: 'fill', key: 'l1__1', accepted: ['one pound', '1 pound'] },
      { number: 2, kind: 'fill', key: 'l1__2', accepted: ['Cedar Hall'] },
      { number: 3, kind: 'mcq', key: 'l1q3', accepted: [1] },
    ],
  });
  assert.equal(result.status, 'PASS');
  assert.equal(result.wordErrorRate, 0);
  assert.equal(result.completionEvidenceFound, 2);
  assert.deepEqual(result.completionEvidence.map(item => item.startSeconds), [1, 5]);
});

test('missing accepted phrases fail the automatic alignment gate', () => {
  const result = auditAsrAlignment({
    expectedText: 'The answer is expansion.',
    segments: [{ start: 1, end: 3, text: 'The answer is expand.' }],
    objectiveRows: [{ number: 40, kind: 'fill', key: 'l4__40', accepted: ['expansion'] }],
  });
  assert.equal(result.status, 'FAIL');
  assert.deepEqual(result.completionEvidence.filter(item => !item.found).map(item => item.question), [40]);
});

test('a phrase found only before the current cursor is diagnostic, not ordered evidence', () => {
  const result = auditAsrAlignment({
    expectedText: 'Alpha is followed by beta.',
    segments: [
      { start: 1, end: 2, text: 'Beta appears too early.' },
      { start: 3, end: 4, text: 'Alpha appears later.' },
    ],
    objectiveRows: [
      { number: 1, kind: 'fill', key: 'l1__1', accepted: ['alpha'] },
      { number: 2, kind: 'fill', key: 'l1__2', accepted: ['beta'] },
    ],
    maximumWordErrorRate: 1,
  });
  assert.equal(result.status, 'FAIL');
  assert.equal(result.completionEvidence[1].found, false);
  assert.equal(result.completionEvidence[1].foundOutOfOrder, true);
  assert.equal(result.completionEvidence[1].diagnosticStartSeconds, 1);
});

test('speaker labels are excluded from WER and completion phrases may cross ASR segments', () => {
  const result = auditAsrAlignment({
    expectedText: 'TUTOR: Meet in Cedar Hall.',
    segments: [
      { start: 1, end: 2, text: 'Meet in Cedar' },
      { start: 2, end: 3, text: 'Hall.' },
    ],
    objectiveRows: [{ number: 1, kind: 'fill', key: 'l1__1', accepted: ['Cedar Hall'] }],
  });
  assert.equal(result.status, 'PASS');
  assert.equal(result.wordErrorRate, 0);
  assert.equal(result.completionEvidence[0].startSeconds, 1);
  assert.equal(result.completionEvidence[0].endSeconds, 3);
});

test('silent Whisper bookkeeping segments do not invalidate otherwise usable ASR', () => {
  const report = auditAsrAlignment({
    expectedText: 'HOST: The answer is river path.',
    segments: [
      { start: 0, end: 0, text: '' },
      { start: 1, end: 2, text: 'The answer is river path.' },
    ],
    objectiveRows: [{ number: 1, key: 'q1', kind: 'fill', accepted: ['river path'] }],
  });
  assert.equal(report.status, 'PASS');
  assert.equal(report.completionEvidenceFound, 1);
});
