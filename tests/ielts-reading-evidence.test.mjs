import assert from 'node:assert/strict';
import test from 'node:test';
import { rankReadingParagraphs, readingTokens } from '../scripts/lib/ielts-reading-evidence.mjs';

test('Reading evidence ranking ignores common instruction words', () => {
  assert.deepEqual(readingTokens('Choose ONE WORD ONLY from the passage for each answer.'), ['word', 'answer']);
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
  assert.ok(ranked[0].overlappingTerms.includes('chimpanzees'));
});
