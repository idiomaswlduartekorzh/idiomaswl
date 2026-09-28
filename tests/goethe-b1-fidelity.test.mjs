import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import master from '../src/data/mocks/goethe-b1-master-set-1.ts';
import { GOETHE_B1_ORIGINAL_SETS } from '../src/data/mocks/goethe-b1-original-sets.ts';

const contract = JSON.parse(readFileSync(new URL('../config/goethe-b1-harness/fidelity-contract.json', import.meta.url), 'utf8'));
const allSets = [master, ...Object.values(GOETHE_B1_ORIGINAL_SETS)];
const wordTokens = value => value.match(/[A-Za-zÄÖÜäöüß]+(?:[-’][A-Za-zÄÖÜäöüß]+)*/gu) ?? [];
const sentenceCount = value => Math.max(1, (value.match(/[.!?]+(?=\s|$)/gu) ?? []).length);
const trigramSet = value => {
  const words = wordTokens(value.toLocaleLowerCase('de-DE'));
  return new Set(words.slice(0, -2).map((_, index) => words.slice(index, index + 3).join(' ')));
};
const jaccard = (left, right) => {
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
};
const pattern = questions => questions.map(question => question.type === 'mcq' ? question.answer : '').join('');

test('all B1 reading modules stay inside the official adult volume and language bands', () => {
  for (const mock of allSets) {
    const reading = mock.sections.filter(section => section.skill === 'reading');
    const counts = reading.map(section => wordTokens(section.passage ?? '').length);
    contract.reading.parts.forEach((part, index) => {
      assert.ok(counts[index] >= part.wordRange[0] && counts[index] <= part.wordRange[1], `${mock.id}: Teil ${part.part} has ${counts[index]} words`);
    });
    const fullText = reading.map(section => section.passage ?? '').join(' ');
    const words = wordTokens(fullText);
    assert.ok(words.length >= contract.reading.totalWordRange[0] && words.length <= contract.reading.totalWordRange[1], `${mock.id}: total reading volume ${words.length}`);
    const averageSentenceWords = words.length / sentenceCount(fullText);
    const averageTokenLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    assert.ok(averageSentenceWords >= contract.reading.averageSentenceWordRange[0] && averageSentenceWords <= contract.reading.averageSentenceWordRange[1], `${mock.id}: sentence density ${averageSentenceWords}`);
    assert.ok(averageTokenLength >= contract.reading.averageTokenLengthRange[0] && averageTokenLength <= contract.reading.averageTokenLengthRange[1], `${mock.id}: token length ${averageTokenLength}`);
  }
});

test('no reading task family collapses into a shared template across mocks', () => {
  for (let part = 0; part < 5; part += 1) {
    for (let left = 0; left < allSets.length; left += 1) {
      for (let right = left + 1; right < allSets.length; right += 1) {
        const leftSection = allSets[left].sections.filter(section => section.skill === 'reading')[part];
        const rightSection = allSets[right].sections.filter(section => section.skill === 'reading')[part];
        const similarity = jaccard(trigramSet(leftSection.passage ?? ''), trigramSet(rightSection.passage ?? ''));
        assert.ok(similarity <= contract.reading.maximumCrossSetTrigramJaccard, `${allSets[left].id}/${allSets[right].id} Teil ${part + 1}: trigram similarity ${similarity}`);
      }
    }
  }
});

test('answer keys are valid, balanced and non-repeating across the ten-set bank', () => {
  const trueFalsePatterns = [];
  const opinionPatterns = [];
  const matchingPatterns = [];
  const threeChoicePatterns = [];
  for (const mock of allSets) {
    const reading = mock.sections.filter(section => section.skill === 'reading');
    trueFalsePatterns.push(pattern(reading[0].questions));
    opinionPatterns.push(pattern(reading[3].questions));
    const matching = reading[2].questions[0];
    assert.equal(matching.type, 'matching');
    matchingPatterns.push(matching.items.map(item => item.answer).join(''));
    const threeChoice = reading.flatMap(section => section.questions).filter(question => question.type === 'mcq' && question.options.length === 3);
    threeChoicePatterns.push(pattern(threeChoice));
    assert.deepEqual(new Set(threeChoice.map(question => question.answer)), new Set([0, 1, 2]), `${mock.id}: three-choice balance`);
  }
  for (const [label, values] of Object.entries({ trueFalsePatterns, opinionPatterns, matchingPatterns, threeChoicePatterns })) {
    assert.equal(new Set(values).size, allSets.length, `${label} must be unique across all mocks`);
  }
});

test('Schreiben and Sprechen reproduce the official production contract without thin prompts', () => {
  for (const mock of allSets) {
    const writing = mock.sections.filter(section => section.skill === 'writing');
    const speaking = mock.sections.filter(section => section.skill === 'speaking');
    assert.deepEqual(writing.map(section => section.questions[0].minWords), contract.writing.targetWords, `${mock.id}: writing targets`);
    assert.ok(wordTokens(writing[1].questions[0].stimulus ?? '').length >= contract.writing.minimumForumStimulusWords, `${mock.id}: forum stimulus`);
    assert.match(speaking[1].instructions, /circa drei Minuten/u, `${mock.id}: official presentation duration`);
    const cue = speaking[1].questions[0].cueCard ?? '';
    for (let slide = 1; slide <= contract.speaking.presentationSlides; slide += 1) assert.match(cue, new RegExp(`Folie ${slide}\\b`, 'u'), `${mock.id}: Folie ${slide}`);
  }
});

test('Hören remains fail-closed until scripts and approved audio exist', () => {
  assert.equal(contract.listening.state, 'AUDIO_BLOCKED');
  for (const mock of allSets) assert.equal(mock.sections.some(section => section.skill === 'listening'), false, mock.id);
});
