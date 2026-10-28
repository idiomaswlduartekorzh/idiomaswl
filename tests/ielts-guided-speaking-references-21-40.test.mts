import assert from 'node:assert/strict';
import test from 'node:test';
import { getIeltsGuidedSpeakingReference } from '../src/data/ielts/guided-speaking-references.ts';

const BANDS = ['5.5', '9.0'] as const;
const CRITERIA = [
  'Fluency & Coherence',
  'Lexical Resource',
  'Grammatical Range & Accuracy',
  'Pronunciation',
];

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalized(value: string) {
  return value.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

test('staged Speaking references cover Sets 21-40 without exposing unreviewed audio', async () => {
  const transcripts = new Set<string>();
  const feedbackNotes = new Set<string>();

  for (let setNumber = 21; setNumber <= 40; setNumber += 1) {
    const reference = getIeltsGuidedSpeakingReference(setNumber);
    const mock = (await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)).default;
    const speaking = mock.sections.find((section: { skill: string }) => section.skill === 'speaking');
    const part2 = speaking?.questions.find((question: { id: string }) => question.id === 's-part-2');
    assert.ok(part2?.cueCard, `Set ${setNumber}: canonical cue card missing`);
    assert.equal(reference.fullCueCard, part2.cueCard, `Set ${setNumber}: cue card binding drift`);
    assert.equal(reference.bullets.length, 4, `Set ${setNumber}: cue card bullets incomplete`);

    for (const band of BANDS) {
      const sample = reference.samples[band];
      assert.ok(wordCount(sample.transcript) >= (band === '5.5' ? 95 : 160));
      assert.ok(!transcripts.has(sample.transcript), `Set ${setNumber} band ${band}: duplicate transcript`);
      transcripts.add(sample.transcript);
      assert.deepEqual(sample.criteria.map(([criterion]) => criterion), CRITERIA);
      assert.ok(sample.criteria.every(([, note]) => note.length > 45));
      assert.ok(sample.criteria.every(([, note]) => note.includes('«') && note.includes('»')),
        `Set ${setNumber} band ${band}: feedback must cite observable transcript evidence`);
      for (const [, note] of sample.criteria) {
        for (const match of note.matchAll(/«([^»]+)»/g)) {
          const quotedEvidence = normalized(match[1].replace(/…$/, ''));
          assert.ok(normalized(sample.transcript).includes(quotedEvidence),
            `Set ${setNumber} band ${band}: quoted feedback evidence is not in transcript: ${match[1]}`);
        }
      }
      assert.ok(sample.criteria.every(([, note]) => !/presenta reinicios|se repiten antes/i.test(note)),
        `Set ${setNumber} band ${band}: feedback must not invent delivery features`);
      for (const [, note] of sample.criteria) {
        assert.ok(!feedbackNotes.has(note), `Set ${setNumber} band ${band}: duplicated feedback note`);
        feedbackNotes.add(note);
      }
      assert.ok(sample.verdict.length > 60);
      assert.equal(sample.audio.ready, false);
      assert.equal(sample.audio.url, null);
      assert.equal(sample.audio.durationSeconds, null);
    }
  }

  assert.equal(transcripts.size, 40);
});
