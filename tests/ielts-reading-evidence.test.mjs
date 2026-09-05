import assert from 'node:assert/strict';
import test from 'node:test';
import { rankReadingParagraphs, readingTokens } from '../scripts/lib/ielts-reading-evidence.mjs';
import set2 from '../src/data/mocks/ielts-set-2.ts';

test('Reading evidence ranking ignores common instruction words', () => {
  assert.deepEqual(readingTokens('Choose ONE WORD ONLY from the passage for each answer.'), ['word', 'answer']);
});

test('Reading evidence normalizes inflections and controlled paraphrases', () => {
  assert.deepEqual(
    readingTokens('Comedians described situations, noises while playing, and subjective views.'),
    ['comedian', 'describ', 'situation', 'noise', 'while', 'play', 'perspective', 'perspective'],
  );
  assert.deepEqual(readingTokens('analysis status processes'), ['analysis', 'status', 'process']);
});

test('literal answers outrank merely related paragraphs', () => {
  const passage = `Researchers used several brain scans to study jokes.\n\nThe orbital prefrontal cortex is associated with evaluating information.\n\nOther experiments investigated memory and language.`;
  const ranked = rankReadingParagraphs(passage, 'Orbital prefrontal cortex is involved with evaluation', ['evaluating information']);
  assert.equal(ranked[0].paragraph, 2);
  assert.deepEqual(ranked[0].literalMatches, ['evaluating information']);
});

test('semantic overlap still proposes a paragraph when no literal answer applies', () => {
  const passage = `The first theory concerns social status.\n\nChimpanzees make a panting noise while they play.`;
  const ranked = rankReadingParagraphs(passage, 'Chimpanzees make particular noises when playing');
  assert.equal(ranked[0].paragraph, 2);
  assert.ok(ranked[0].overlappingTerms.includes('chimpanzee'));
});

test('controlled paraphrases locate matching-headings evidence without pretending approval', () => {
  const passage = `The brain has many expressive circuits.\n\nMaking a rapid emotional assessment of events is a demanding job for the brain.\n\nWhether pleasure occurs depends on a person's outlook.`;
  assert.equal(rankReadingParagraphs(passage, "One of the brain's difficult tasks is to respond instantly to whatever is happening")[0].paragraph, 2);
  assert.equal(rankReadingParagraphs(passage, 'Individual responses relate to subjective views')[0].paragraph, 3);
});

test('Set 2 Reading Q30 uses a grammatical answer copied from its passage', () => {
  const section = set2.sections.find(candidate => candidate.skill === 'reading' && candidate.part === 7);
  const group = section?.questions.find(candidate => candidate.id === 'r3-summary');
  assert.equal(group?.type, 'formgroup');
  assert.match(section?.passage ?? '', /examples come to mind/i);
  assert.match(group?.template ?? '', /examples come easily to \{\{30\}\}/i);
  assert.deepEqual(group?.blanks.find(blank => blank.num === 30)?.answers, ['mind']);
});
