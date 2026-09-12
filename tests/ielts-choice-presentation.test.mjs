import assert from 'node:assert/strict';
import test from 'node:test';
import set8 from '../src/data/mocks/ielts-set-8.ts';
import { IELTS_CHOICE_PRESENTATION_VERSION, withIeltsBalancedChoicePositions } from '../src/data/mocks/ielts-choice-presentation.ts';

const fixed = options => ['TRUE|FALSE|NOT GIVEN', 'YES|NO|NOT GIVEN'].includes(options.join('|'));

test('IELTS choice presentation balances positions without changing keyed meaning', () => {
  const presented = withIeltsBalancedChoicePositions(set8);
  const original = set8.sections.flatMap(section => section.questions).filter(question => question.type === 'mcq' || question.type === 'dialog');
  const changed = presented.sections.flatMap(section => section.questions).filter(question => question.type === 'mcq' || question.type === 'dialog');
  assert.equal(changed.length, original.length);
  for (let index = 0; index < original.length; index += 1) {
    assert.equal(changed[index].options[changed[index].answer], original[index].options[original[index].answer]);
    assert.deepEqual([...changed[index].options].sort(), [...original[index].options].sort());
    if (fixed(original[index].options)) assert.deepEqual(changed[index], original[index]);
  }
  assert.match(IELTS_CHOICE_PRESENTATION_VERSION, /^balanced-positions-v\d+$/u);
});
