import assert from 'node:assert/strict';
import test from 'node:test';
import { getIeltsGuidedEvidence } from '../src/data/ielts/guided-evidence.ts';
import { buildIeltsGuidedMock, getIeltsGuidedCorrectItemIds } from '../src/data/ielts/guided-mock.ts';
import { getReadingLearningFeedback } from '../src/data/ielts/reading-learning-feedback.ts';
import { getMock } from '../src/data/mocks/index.ts';

function readingSet(setNumber: number) {
  const id = `set-${setNumber}`;
  const mock = getMock('ielts', id);
  assert.ok(mock);
  return buildIeltsGuidedMock(mock, getIeltsGuidedEvidence(id)).readingUnits.flatMap(unit => unit.items);
}

test('all 800 approved Reading items coach an attempted answer with a verbatim cue and a focused practice route', () => {
  let count = 0;
  let openClaims = 0;
  let contradictions = 0;
  const routes = new Set<string>();
  for (let set = 1; set <= 20; set++) {
    for (const item of readingSet(set)) {
      for (const [submitted, correct] of [[item.accepted[0], true], ['respuesta de prueba', false]] as const) {
        const feedback = getReadingLearningFeedback(item, submitted, correct, set);
        assert.ok(feedback, `${set}/${item.number}`);
        const quotes = Array.from(feedback.reason.matchAll(/«([^»]+)»/gu), match => match[1]);
        assert.ok(quotes.some(quote => item.evidence.focus.includes(quote)), `No verbatim cue for ${set}/${item.number}`);
        assert.ok(feedback.retry.length > 35);
        assert.match(feedback.link.href, /^\/practica\/ielts\/reading\/tipos-de-preguntas\//u);
        routes.add(feedback.link.href);
        if (correct && /(?:^|· )NOT GIVEN$/u.test(item.answer)) {
          assert.match(feedback.reason, /NOT GIVEN/u);
          assert.match(feedback.reason, /resto del pasaje/u);
          assert.doesNotMatch(feedback.reason, /Para resolver «/u, 'Each current NOT GIVEN has an authored missing relationship');
          openClaims++;
        }
        if (correct && /(?:^|· )(?:FALSE|NO)$/u.test(item.answer)) {
          assert.doesNotMatch(feedback.reason, /(?:La afirmación|La postura) que debes comprobar es/u, 'Each current FALSE or NO names the particular conflict');
          contradictions++;
        }
      }
      count++;
    }
  }
  assert.equal(count, 800);
  assert.equal(openClaims, 29);
  assert.equal(contradictions, 93);
  assert.equal(routes.size, 12);
});

test('an empty attempt, an unapproved excerpt, missing evidence or a different skill leaves feedback closed', () => {
  const item = readingSet(1)[0];
  for (const answer of ['', '  \n\t']) assert.equal(getReadingLearningFeedback(item, answer, false, 1), null);
  assert.equal(getReadingLearningFeedback({ ...item, evidence: { ...item.evidence, status: 'pending-independent-review' } }, 'answer', true, 1), null);
  assert.equal(getReadingLearningFeedback({ ...item, evidence: { ...item.evidence, focus: ' ' } }, 'answer', false, 1), null);
  assert.equal(getReadingLearningFeedback({ ...item, id: 'listening-test' }, 'answer', false, 1), null);
});

test('unordered responses follow the scorer and distinguish a duplicated valid target from a wrong target', () => {
  const set = readingSet(1);
  for (const [firstNumber, secondNumber] of [[9, 10], [30, 31]]) {
    const first = set.find(item => item.number === firstNumber)!;
    const second = set.find(item => item.number === secondNumber)!;
    const swapped = { [first.id]: second.accepted[0], [second.id]: first.accepted[0] };
    assert.equal(getIeltsGuidedCorrectItemIds([first, second], swapped).size, 2);
    assert.match(getReadingLearningFeedback(first, swapped[first.id], true, 1)!.reason, /cualquier orden|orden es libre/u);
    const duplicate = { [first.id]: first.accepted[0], [second.id]: first.accepted[0] };
    assert.equal(getIeltsGuidedCorrectItemIds([first, second], duplicate).size, 1);
    const feedback = getReadingLearningFeedback(second, duplicate[second.id], false, 1)!;
    assert.match(feedback.retry, /Repetir una misma respuesta válida/u);
  }
});

test('a limited source window is identified honestly and a submitted option letter resolves to the real choice', () => {
  const earlyReception = readingSet(1).find(item => item.number === 12)!;
  const feedback = getReadingLearningFeedback(earlyReception, 'A', false, 1)!;
  assert.match(feedback.reason, /recepción comercial/u);
  assert.doesNotMatch(feedback.reason, /«erial»/u);
  const netflix = readingSet(12).find(item => item.number === 26)!;
  assert.match(getReadingLearningFeedback(netflix, 'series', true, 12)!.reason, /párrafo G/u);
  const language = readingSet(18).find(item => item.number === 40)!;
  assert.match(getReadingLearningFeedback(language, 'language', true, 18)!.reason, /únicamente el título/u);
  const mcq = readingSet(12).find(item => item.number === 27)!;
  const chosen = mcq.options!.find(choice => !mcq.accepted.includes(choice.split(' · ')[0].toLowerCase()))!;
  const [letter, text] = chosen.split(' · ');
  const alternative = getReadingLearningFeedback(mcq, letter, false, 12)!;
  assert.ok(alternative.retry.includes(text));
  const literal = readingSet(1)[0];
  assert.match(getReadingLearningFeedback(literal, 'a piece of wax', false, 1)!.retry, /4 palabras/u);
});
