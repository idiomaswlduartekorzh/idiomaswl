import assert from 'node:assert/strict';
import test from 'node:test';
import set4 from '../src/data/mocks/ielts-set-4.ts';
import set13 from '../src/data/mocks/ielts-set-13.ts';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';

function countAnswerKeys(mock) {
  return JSON.stringify(mock).match(/"answers?":/g)?.length ?? 0;
}

test('Sets 4–20 receive the explicit computer-delivered IELTS Academic 2026 contract', () => {
  const mock = withIeltsAcademic2026Blueprint(set4);
  assert.equal(mock.format, 'ielts-academic-2026');
  assert.equal(mock.timeMinutes, 164);
  assert.deepEqual(
    mock.ieltsAcademic2026Blueprint.sections.map(section => [section.skill, section.timeLimitSeconds]),
    [['listening', 1800], ['reading', 3600], ['writing', 3600], ['speaking', 840]],
  );
  assert.match(mock.ieltsAcademic2026Blueprint.disclosure, /original de WeLearn/);
  assert.match(mock.ieltsAcademic2026Blueprint.disclosure, /No es material oficial/);
});

test('the Server Component projection removes every objective answer key', () => {
  const privateMock = withIeltsAcademic2026Blueprint(set4);
  assert.ok(countAnswerKeys(privateMock) > 0);
  assert.equal(countAnswerKeys(toPublicIeltsMock(privateMock)), 0);
});

test('sets whose integral Listening media is absent are visibly blocked, not silently broken', () => {
  const mock = withIeltsAcademic2026Blueprint(set13);
  assert.equal(mock.ieltsAcademic2026Blueprint.listeningMediaStatus, 'script-ready-audio-blocked');
  const listening = mock.sections.filter(section => section.skill === 'listening');
  assert.equal(listening.length, 4);
  assert.ok(listening.every(section => section.comingSoon && !section.audioUrl));
});
