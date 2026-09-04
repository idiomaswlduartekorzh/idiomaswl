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

// Approved Set 1 display moves must preserve the server's canonical option identities.
const orderPractice = selectToeflListeningPractice(getMock('toefl', 'set-1'));
const orderResponses = {
  'item:t1-l-cr4-fixed-v1': 'item:t1-l-cr4-fixed-v1:option-a',
  'item:t1-l-m1-cr6-v1': 'item:t1-l-m1-cr6-v1:option-c',
  'item:t1-l-m1-cr8-v1': 'item:t1-l-m1-cr8-v1:option-a',
};
const orderResponse = await request('/api/practica/toefl/listening/score', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    objectId: orderPractice.objectId,
    attemptId: 'approved-order-audit:set-1',
    closeId: 'approved-order-audit-close:set-1',
    presentedItemIds: orderPractice.sections.flatMap(section => section.questions.map(question => question.id)),
    responses: orderResponses,
  }),
});
assert.equal(orderResponse.status, 200);
const orderScore = await orderResponse.json();
assert.equal(orderScore.correct, 3);
assert.equal(orderScore.denominator, 34);
for (const [itemId, optionId] of Object.entries(orderResponses)) {
  const outcome = orderScore.outcomes.find(item => item.itemId === itemId);
  assert.equal(outcome?.status, 'scored', itemId);
  assert.equal(outcome?.selectedOptionId, optionId, itemId);
  assert.equal(outcome?.rawPoints, 1, itemId);
}
console.log(JSON.stringify({ auditedAtUtc: new Date().toISOString(), baseUrl: base.origin,
  libraryStatus: library.status, rows, invalidRoutes, invalidScoreStatus: invalidScore.status,
  approvedOrderProbe: { status: orderResponse.status, correct: orderScore.correct,
    denominator: orderScore.denominator, itemIds: Object.keys(orderResponses) },
}, null, 2));
