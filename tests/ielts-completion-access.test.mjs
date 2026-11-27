import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import test from 'node:test';

const ports = {
  '@/lib/supabase/admin': ['createAdminClient'],
  '@/lib/supabase/server': ['createClient'],
  '@/lib/xpress-commerce/submission-access.server': ['recordXpressSubmissionAccess'],
  '@/lib/labs/exam-bridge/ielts': ['loadIeltsMock', 'getIeltsWritingAssignment', 'getIeltsSpeakingAssignment'],
  '@/lib/exams/score-access.server': ['hasExamScoreAccess'],
  './rate-limit.server': ['consumeIeltsRateLimit'],
};
// Exercise the HTTP handler and its real signed receipt, with in-memory Supabase rows and no outbound requests.
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only') return { shortCircuit: true, url: 'data:text/javascript,export{}' };
  if (Object.hasOwn(ports, specifier)) {
    const exports = ports[specifier].map(name =>
      `export const ${name} = (...args) => globalThis.ieltsCompletionTest.${name}(...args);`).join('\n');
    return { shortCircuit: true, url: 'data:text/javascript,' + encodeURIComponent(exports) };
  }
  if (specifier.startsWith('./') && context.parentURL?.endsWith('/submission.server.ts')) {
    const url = new URL(specifier + '.ts', context.parentURL);
    if (existsSync(url)) return nextResolve(url.href, context);
  }
  return nextResolve(specifier, context);
} });
const { handleIeltsSubmissionRequest } = await import('../src/lib/ielts/submission.server.ts');
const { createIeltsSubmissionToken } = await import('../src/lib/ielts/submission-token.server.ts');

const attemptId = '15b529fb-e57c-4a2e-a1be-1f87d4359315';
const owner = { id: 'student-a', email_confirmed_at: '2026-08-10T08:00:00Z' };

function makeFixture({ mockId = 'set-2', userId = owner.id, status = 'submitted' } = {}) {
  const submission = {
    id: attemptId, exam_slug: 'ielts', mock_id: mockId, mock_title: 'IELTS Academic Set '+mockId.slice(4),
    user_id: userId, submission_status: status, skills: [{ skill: 'Listening', raw: '20/40 correct' }, { skill: 'Reading', raw: '26/40 correct' }],
    speaking_audio_paths: { sp1: mockId+'/'+attemptId+'/sp1.webm' }, speaking_audio_metadata: { sp1: { size: 3200 } },
  };
  const tables = { exam_submissions: [submission], exam_access_code_redemptions: [] };
  const fixture = {
    submission, tables, viewer: owner, plan: 'public', mockLoads: 0, storageChecks: 0,
    createAdminClient() {
      return {
        from(table) {
          assert.ok(Object.hasOwn(tables, table), table);
          const filters = {};
          let update;
          return {
            select() { return this; },
            eq(key, value) { filters[key] = value; return this; },
            update(values) { update = values; return this; },
            async maybeSingle() {
              if (table === 'exam_access_code_redemptions' && fixture.ledgerUnavailable) return { data: null, error: { code: 'unavailable' } };
              if (table === 'exam_submissions' && update && fixture.otherConfirmationWon) submission.submission_status = 'submitted';
              const data = tables[table].find(row => Object.entries(filters).every(([key, value]) => row[key] === value));
              if (data && update) Object.assign(data, update);
              return { data: data ?? null, error: null };
            },
          };
        },
        storage: { from() { return { async list() {
          fixture.storageChecks++;
          return { data: [{ name: 'sp1.webm', metadata: { size: 3200 } }], error: null };
        } }; } },
      };
    },
    createClient() { return { auth: { getUser: async () => ({ data: { user: fixture.viewer } }) } }; },
    async recordXpressSubmissionAccess() { return { access: fixture.plan, detailedResults: fixture.plan !== 'public' }; },
    async loadIeltsMock(id) { fixture.mockLoads++; return { id, sections: [] }; },
  };
  globalThis.ieltsCompletionTest = fixture;
  const receipt = createIeltsSubmissionToken(attemptId);
  fixture.complete = (token = receipt) => handleIeltsSubmissionRequest(new Request('http://localhost/submissions', {
    method: 'POST', body: JSON.stringify({ action: 'complete', submissionId: attemptId, completionToken: token }),
  }), mockId);
  return fixture;
}

test('IELTS completion resolves a receipt and its institutional grant, independently of a free account', async t => {
  const previousKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const previousFlag = process.env.IELTS_MOCK1_FREE_ENABLED;
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'local-ielts-receipt-test-key';
  process.env.IELTS_MOCK1_FREE_ENABLED = '0';
  t.after(() => {
    if (previousKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY; else process.env.SUPABASE_SERVICE_ROLE_KEY = previousKey;
    if (previousFlag === undefined) delete process.env.IELTS_MOCK1_FREE_ENABLED; else process.env.IELTS_MOCK1_FREE_ENABLED = previousFlag;
    delete globalThis.ieltsCompletionTest;
  });

  const f = makeFixture({ status: 'uploading' });
  const grants = f.tables.exam_access_code_redemptions;
  grants.push({ id: 'another-attempt', exam_slug: 'ielts', attempt_ref: 'a-different-attempt' });
  grants.push({ id: 'another-exam', exam_slug: 'toefl', attempt_ref: attemptId });
  const basic = await f.complete();
  assert.equal(basic.status, 200);
  assert.deepEqual(await basic.json(), { ok: true, submissionId: attemptId, reviewMock: null, basicScore: '46/80', xpressAccess: 'public' });
  assert.equal(f.submission.submission_status, 'submitted');
  assert.equal(f.storageChecks, 1);
  assert.equal(f.mockLoads, 0);

  grants.push({ id: 'this-attempt', exam_slug: 'ielts', attempt_ref: attemptId });
  assert.equal((await f.complete('invalid-receipt')).status, 403);
  for (const viewer of [null, { ...owner, id: 'student-b' }, { ...owner, email_confirmed_at: null }]) {
    f.viewer = viewer;
    assert.equal((await f.complete()).status, 403);
  }
  assert.equal(f.mockLoads, 0);
  f.viewer = owner;
  for (let i = 0; i < 2; i++) {
    const retry = await f.complete();
    assert.equal(retry.status, 200);
    const result = await retry.json();
    assert.equal(result.submissionId, attemptId);
    assert.equal(result.xpressAccess, 'access-code');
    assert.equal(result.reviewMock.id, 'set-2');
    assert.equal(result.basicScore, '46/80');
    assert.match(retry.headers.get('cache-control'), /private, no-store/);
  }
  assert.equal(f.storageChecks, 1);

  const concurrent = makeFixture({ status: 'uploading' });
  concurrent.otherConfirmationWon = true;
  assert.equal((await concurrent.complete()).status, 200);
  assert.equal(concurrent.storageChecks, 1);
  assert.equal(concurrent.mockLoads, 0);

  const unsettled = makeFixture({ status: 'unrecognised' });
  assert.equal((await unsettled.complete()).status, 409);
  assert.equal(unsettled.mockLoads, 0);
  const unavailable = makeFixture();
  unavailable.ledgerUnavailable = true;
  assert.equal((await unavailable.complete()).status, 503);
  assert.equal(unavailable.mockLoads, 0);

  const incompleteSkills = makeFixture();
  incompleteSkills.submission.skills = [{ skill: 'Reading', raw: '0/40 correct' }, { skill: 'Listening', max: 9, score: 5 }];
  assert.equal((await (await incompleteSkills.complete()).json()).basicScore, 'Resultado guardado');

  const historical = makeFixture({ userId: null });
  historical.viewer = null;
  historical.tables.exam_access_code_redemptions.push({ id: 'historic', exam_slug: 'ielts', attempt_ref: attemptId });
  assert.equal((await (await historical.complete()).json()).xpressAccess, 'access-code');

  const paid = makeFixture();
  for (const plan of ['single-credit', 'membership', 'welearn']) {
    paid.plan = plan;
    const result = await (await paid.complete()).json();
    assert.equal(result.xpressAccess, plan);
    assert.equal(result.reviewMock.id, 'set-2');
  }
  process.env.IELTS_MOCK1_FREE_ENABLED = '1';
  const pilot = makeFixture({ mockId: 'set-1', userId: null });
  const result = await (await pilot.complete()).json();
  assert.equal(result.xpressAccess, 'free-sample');
  assert.equal(result.reviewMock.id, 'set-1');
});
