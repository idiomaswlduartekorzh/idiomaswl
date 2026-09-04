import assert from 'node:assert/strict';
import test from 'node:test';
import { auditAsrAlignment, editDistance, normalizedWords } from '../scripts/lib/ielts-asr-audit.mjs';

test('ASR normalization handles common IELTS number and spelling variants', () => {
  assert.deepEqual(normalizedWords("One adviser at the centre can't attend."), ['1', 'adviser', 'at', 'the', 'center', 'cannot', 'attend']);
  assert.equal(editDistance(['a', 'b', 'c'], ['a', 'x', 'c']), 1);
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
