import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { getMock } from '../src/data/mocks/index.ts';
import { selectToeflListeningPractice, TOEFL_SECTIONAL_LISTENING_SET_IDS } from '../src/data/toefl/sectional-listening-adapter.ts';

// Local-only audit: never silently POST test responses to production.
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:3026');
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname), 'A local preview is required.');
assert.equal(base.protocol, 'http:');
const libraryPath = '/practica/toefl/listening/simulacros';
const request = (pathname, init = {}) => fetch(new URL(pathname, base), {
  ...init, redirect: 'error', signal: AbortSignal.timeout(60000),
});
const library = await request(libraryPath);
assert.equal(library.status, 200);
const libraryHtml = await library.text();
const rows = [];
for (const mockId of TOEFL_SECTIONAL_LISTENING_SET_IDS) {
  const mock = getMock('toefl', mockId);
  assert.ok(mock);
  const practice = selectToeflListeningPractice(mock);
  assert.ok(practice);
  const source = mock.sections.filter((section) => section.skill === 'listening');
  assert.deepEqual(practice.sections, source);
  const questions = practice.sections.flatMap((section) => section.questions);
  const pathname = `${libraryPath}/practica/${mockId}`;
  assert.ok(libraryHtml.includes(`href="${pathname}"`), `Missing library link: ${mockId}`);
  const page = await request(pathname);
  assert.equal(page.status, 200, mockId);
  const html = await page.text();
  assert.match(html, /name="robots" content="noindex, follow"/);
  const payload = {
    objectId: practice.objectId,
    attemptId: `hr06-audit:${mockId}`,
    closeId: `hr06-audit-close:${mockId}`,
    presentedItemIds: questions.map((question) => question.id),
    responses: Object.fromEntries(questions.map((question) => [question.id, null])),
  };
  const scoreResponse = await request('/api/practica/toefl/listening/score', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
  });
  assert.equal(scoreResponse.status, 200, mockId);
  const score = await scoreResponse.json();
  assert.equal(score.correct, 0);
  assert.equal(score.denominator, questions.length);
  assert.deepEqual(score.outcomes.map((outcome) => outcome.itemId), payload.presentedItemIds);
  assert.ok(score.outcomes.every((outcome) => outcome.status === 'unanswered'));
  const media = new Map();
  for (const section of practice.sections) {
    if (section.audioUrl) media.set(section.mediaId, section.audioUrl);
    for (const question of section.questions) {
      if (question.audioUrl) media.set(question.mediaId, question.audioUrl);
    }
  }
  rows.push({ mockId, routeStatus: page.status, scoreStatus: scoreResponse.status,
    sections: source.length, questions: questions.length, media: media.size,
    sourceParitySha256: createHash('sha256').update(JSON.stringify(source)).digest('hex') });
}
const invalidRoutes = [];
for (const mockId of ['set-0', 'set-01', 'set-21', 'set-99']) {
  const response = await request(`${libraryPath}/practica/${mockId}`);
  assert.equal(response.status, 404, mockId);
  await response.arrayBuffer();
  invalidRoutes.push({ mockId, status: response.status });
}
const invalidScore = await request('/api/practica/toefl/listening/score', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
});
assert.equal(invalidScore.status, 400);
console.log(JSON.stringify({ auditedAtUtc: new Date().toISOString(), baseUrl: base.origin,
  libraryStatus: library.status, rows, invalidRoutes, invalidScoreStatus: invalidScore.status }, null, 2));
