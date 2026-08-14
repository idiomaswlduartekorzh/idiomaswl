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
assert.match(client, /Continuar sin inventar score/, 'Constructed Writing must not become a self-awarded band.');
assert.match(client, /not_evaluated/, 'Constructed Writing must report its honest outcome.');

console.log('✓ TOEFL 2026 Writing T17: 7/10-minute deadlines, local persistence, honest rubric and no invented Writing band verified.');
