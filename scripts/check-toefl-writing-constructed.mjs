import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { TOEFL_WRITING_CONSTRUCTED_SET1 } from '../src/data/toefl/writing-constructed-set-1.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const [email, discussion] = TOEFL_WRITING_CONSTRUCTED_SET1.tasks;

assert.equal(TOEFL_WRITING_CONSTRUCTED_SET1.tasks.length, 2, 'Set 1 needs exactly Email and Discussion.');
assert.equal(email.kind, 'email'); assert.equal(email.timeLimitSeconds, 420); assert.equal(email.recommendedMinimumWords, undefined);
assert.equal(discussion.kind, 'academic-discussion'); assert.equal(discussion.timeLimitSeconds, 600); assert.equal(discussion.recommendedMinimumWords, 100);
for (const task of TOEFL_WRITING_CONSTRUCTED_SET1.tasks) {
  assert.ok(task.stimulus.length > 200 && task.prompt.length > 100, `${task.id} needs complete context and instructions.`);
  assert.equal(task.rubric.length, 6, `${task.id} needs six local review criteria.`);
  assert.equal(new Set(task.rubric.map((item) => item.id)).size, 6, `${task.id} rubric IDs must be unique.`);
}

const component = await read('src/components/toefl/TimedWritingTask.tsx');
const contract = await read('src/lib/toefl/writing-time-contract.ts');
const emailPage = await read('src/app/(site)/practica/toefl/writing/write-an-email/page.tsx');
const discussionPage = await read('src/app/(site)/practica/toefl/writing/academic-discussion/page.tsx');
const mock = await read('src/data/mocks/toefl-set-1.ts');
const client = await read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx');

assert.match(component, /localStorage/, 'Timed tasks must persist locally.');
assert.match(component, /deadlineMs/, 'Timed tasks need a durable deadline.');
assert.match(component, /spellCheck=\{false\}/, 'Spell check must be disabled.');
assert.ok(!component.includes('fetch('), 'Anonymous writing drafts must not be sent to a server.');
assert.match(contract, /reconcileTimedWritingState/, 'Reload and expiry must share a pure reconciliation contract.');
assert.match(emailPage, /TimedWritingTask/, 'Email route must expose the timed pilot.');
assert.match(discussionPage, /TimedWritingTask/, 'Discussion route must expose the timed pilot.');
assert.ok(!mock.includes('80–120'), 'Email must not invent an official 80–120 word target.');
assert.match(mock, /timeLimitSeconds/, 'Set 1 data must retain task deadlines.');
assert.doesNotMatch(client, /SelfAssessModal|speakBands|wBand/, 'Constructed Writing must not become a self-awarded band.');
assert.match(client, /No se calculó banda 1–6/, 'The final report must disclose that no official section band was calculated.');
assert.match(client, /useWritingAssessment\('toefl'/, 'Constructed Writing enters the verified correction pipeline.');
assert.match(client, /estimaciones pedagógicas por tarea/, 'Task feedback stays distinct from an official ETS score.');

for (let setNumber = 2; setNumber <= 20; setNumber += 1) {
  const source = await read(`src/data/mocks/toefl-set-${setNumber}.ts`);
  const tasks = [...source.matchAll(/\{\s*type:\s*'write',[\s\S]*?evaluationDisclosure:\s*'[^']*not_evaluated[^']*'\s*,?\s*\}/g)]
    .map((match) => match[0]);
  const [setEmail, setDiscussion] = tasks;

  assert.equal(tasks.length, 2, `Set ${setNumber} needs exactly Email and Discussion.`);
  assert.match(setEmail, /taskNumber:\s*1/, `Set ${setNumber} Email must be task 1.`);
  assert.match(setEmail, /timeLimitSeconds:\s*420/, `Set ${setNumber} Email needs 420 seconds.`);
  assert.match(setEmail, /minWords:\s*0/, `Set ${setNumber} Email cannot invent a word minimum.`);
  assert.match(setEmail, /minimumWordsPolicy:\s*'none-published'/);
  assert.ok(!setEmail.includes('80–120'), `Set ${setNumber} still exposes the invented Email range.`);
  assert.match(setEmail, /complete sentences/i);

  assert.match(setDiscussion, /taskNumber:\s*2/, `Set ${setNumber} Discussion must be task 2.`);
  assert.match(setDiscussion, /timeLimitSeconds:\s*600/, `Set ${setNumber} Discussion needs 600 seconds.`);
  assert.match(setDiscussion, /minWords:\s*100/, `Set ${setNumber} Discussion needs the recommended 100 words.`);
  assert.match(setDiscussion, /minimumWordsPolicy:\s*'recommended-100'/);
}

console.log('✓ TOEFL 2026 Writing: all 20 sets use honest clocks/word policies and task-only pedagogical correction.');
