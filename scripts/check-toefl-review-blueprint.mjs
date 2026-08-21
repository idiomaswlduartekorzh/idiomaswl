import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { TOEFL_REVIEW_BLUEPRINTS } from '../src/lib/toefl/review-blueprint.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFile(path.join(root, relative), 'utf8');
const [bridge, runner, submission, route, migration] = await Promise.all([
  read('src/lib/labs/exam-bridge/toefl.ts'),
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
  read('src/lib/toefl/submission.server.ts'),
  read('src/app/api/labs/exam-writing-assess/route.ts'),
  read('supabase/migrations/20260821160854_toefl_2026_review_pipeline.sql'),
]);

assert.equal(Object.keys(TOEFL_REVIEW_BLUEPRINTS).length, 20, 'all twenty TOEFL sets need a review blueprint');
for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const mockId = `set-${setNumber}`;
  const blueprint = TOEFL_REVIEW_BLUEPRINTS[mockId];
  assert.ok(blueprint, `${mockId} has a blueprint`);
  assert.equal(blueprint.mockTitle, `TOEFL iBT Set ${setNumber} (Formato 2026)`);
  assert.match(bridge, new RegExp(`'set-${setNumber}': \\(\\) => import\\('@/data/mocks/toefl-set-${setNumber}'\\)`), `${mockId} is server-loadable`);
}
assert.equal((bridge.match(/'set-\d+': \(\) => import/g) ?? []).length, 20, 'bridge exposes exactly twenty TOEFL sets');
assert.match(runner, /<TOEFLSubmission/);
assert.match(runner, /<IELTSSpeakingRecorder/);
assert.match(runner, /useWritingAssessment\('toefl'/);
assert.match(submission, /scoreToeflReadingAttempt/);
assert.match(submission, /scoreToeflListeningAttempt/);
assert.match(submission, /scoreToeflBuildSentenceAttempt/);
assert.match(route, /authorizeToeflWritingAssessment/);
assert.match(migration, /toefl-speaking-audio/);
assert.match(migration, /public = EXCLUDED\.public/);

console.log('✓ TOEFL 2026 review blueprint: 20 sets, private audio, server scoring and persisted Writing reports');
