import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getMock } from '../src/data/mocks/index.ts';
import { selectToeflListeningPractice } from '../src/data/toefl/sectional-listening-adapter.ts';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url));
const json = path => JSON.parse(read(path));
const hash = value => createHash('sha256').update(value).digest('hex');
const contractPath = 'docs/toefl-sectional-hr06-length-review-candidate-20260904.json';
const contractHash = '5943893930224895b1d0878abbb075a61460030442a2888ffa3bb8eddaf6a820';

test('all 680 Listening option lists match the exact human-approved candidates', () => {
  assert.equal(hash(read(contractPath)), contractHash);
  const tracker = json('docs/toefl-listening-length-correction-tracker-20260904.json');
  const trackerBySet = new Map(tracker.sets.map(entry => [entry.set, entry]));
  const reviews = json('docs/toefl-sectional-review-log.json').reviews;

  for (const [gateId, reviewer] of [
    ['HR-06-LENGTH-CANDIDATES-EXECUTIVE', 'David Duarte'],
    ['HR-06-LENGTH-CANDIDATES-ACADEMIC', 'Zhanna Korzh'],
  ]) {
    const review = reviews.find(entry => entry.gateId === gateId);
    assert.equal(review?.decision, 'approved');
    assert.equal(review.reviewer, reviewer);
    assert.equal(review.contentDigest, contractHash);
  }

  let total = 0;
  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const candidatePath = `docs/toefl-listening-set${setNumber}-options-candidate.json`;
    const candidate = json(candidatePath);
    if (setNumber > 1) assert.equal(hash(read(candidatePath)), trackerBySet.get(setNumber)?.candidateSha256);

    const source = getMock('toefl', `set-${setNumber}`);
    const practice = selectToeflListeningPractice(source);
    assert.ok(practice, `set-${setNumber} must expose sectional Listening`);
    const actual = practice.sections.flatMap(section => section.questions).map(question => ({
      id: question.id,
      options: question.options.map(option => option.text),
    }));
    const expected = candidate.items.map(({ id, options }) => ({ id, options }));
    assert.deepEqual(actual, expected, `set-${setNumber}`);
    total += actual.length;
  }
  assert.equal(total, 680);
});
