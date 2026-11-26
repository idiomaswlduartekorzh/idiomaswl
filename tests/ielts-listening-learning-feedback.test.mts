import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getIeltsGuidedEvidence } from '../src/data/ielts/guided-evidence.ts';
import { buildIeltsGuidedMock, IELTS_GUIDED_MOCK_IDS, type IeltsGuidedObjectiveItem } from '../src/data/ielts/guided-mock.ts';
import { getListeningLearningFeedback } from '../src/data/ielts/listening-learning-feedback.ts';
import { getMock } from '../src/data/mocks/index.ts';

const guide = readFileSync(new URL('../src/app/(site)/practica/ielts/listening/page.tsx', import.meta.url), 'utf8');
const sets = IELTS_GUIDED_MOCK_IDS.map(id => buildIeltsGuidedMock(getMock('ielts', id)!, getIeltsGuidedEvidence(id)));
function item(set: number, number: number) {
  return sets[set - 1].listeningUnits.flatMap(unit => unit.items).find(row => row.number === number)!;
}

test('all 800 approved listening items provide a grounded correction, a retry and a real lesson destination', () => {
  let total = 0;
  for (const set of sets) {
    for (const unit of set.listeningUnits) {
      for (const row of unit.items) {
        assert.equal(row.evidence.status, 'approved-excerpt');
        const typed = row.scoringGroup ? row.scoringGroup.targets[0][0] : row.accepted[0];
        const good = getListeningLearningFeedback(row, typed, true, set.setNumber);
        const bad = getListeningLearningFeedback(row, 'wrong response', false, set.setNumber);
        assert.ok(good && bad, `Set ${set.setNumber} Q${row.number}`);
        assert.ok(good.reason.length > 65 && bad.retry.length > 35);
        assert.match(bad.reason, /wrong response/);
        assert.match(good.link.href, /^\/practica\/ielts\/listening#[a-z-]+$/);
        const anchor = good.link.href.split('#')[1];
        assert.ok(guide.includes(`id="${anchor}"`) || guide.includes(`id: '${anchor}'`));
        total++;
      }
    }
  }
  assert.equal(total, 800);
});

test('a blank attempt, Reading item or unverified audio produces no key or feedback', () => {
  const row = item(2, 21);
  for (const change of [
    { evidence: { ...row.evidence, status: 'pending-independent-review' as const } },
    { audioClip: undefined },
    { audioClip: { ...row.audioClip!, startSeconds: Number.NaN } },
    { audioClip: { ...row.audioClip!, endSeconds: row.audioClip!.startSeconds } },
    { audioClip: { ...row.audioClip!, audiblePhrase: 'Another phrase' } },
    { id: 'reading-5-an-item' },
  ]) assert.equal(getListeningLearningFeedback({ ...row, ...change }, 'A', false, 2), null);
  assert.equal(getListeningLearningFeedback(row, '   ', false, 2), null);
});

test('Set 2 Q21 uses the published option text and its independent dismissal after reordering', () => {
  const row = item(2, 21);
  const dossier = JSON.parse(readFileSync(new URL('../config/ielts-harness/academic-reviews/set-2-objective-review.json', import.meta.url), 'utf8'));
  const academic = dossier.evidence.find((e: { question: number; skill: string }) => e.question === 21 && e.skill === 'listening');
  assert.equal(academic.independentReview.verdict, 'PASS');
  const cues: Record<string, RegExp> = {
    'Replace the solar-power discussion.': /gustó la parte solar/,
    'Shorten the section substantially.': /no propone recortarla/,
    'Move the section into the conclusion.': /la conclusión por separado/,
  };
  assert.deepEqual(academic.distractors.map((r: { text: string }) => r.text).sort(), Object.keys(cues).sort());
  for (const reviewed of academic.distractors) {
    assert.equal(reviewed.verdict, 'DISMISSED');
    const published = row.options!.find(option => option.endsWith(reviewed.text));
    assert.ok(published);
    for (const entry of [reviewed.text, published, published.split(' · ')[0]]) {
      assert.match(getListeningLearningFeedback(row, entry, false, 2)!.reason, cues[reviewed.text]);
    }
  }
  assert.equal(row.options![0], 'A · Add real-world case studies.');
  assert.ok(!Object.values(cues).some(cue => cue.test(getListeningLearningFeedback(row, 'A', true, 2)!.reason)));
  assert.ok(!Object.values(cues).some(cue => cue.test(getListeningLearningFeedback(row, 'X · Replace the solar-power discussion.', false, 2)!.reason)));
});

test('two decisions can share a clip while requiring different evidence, and a partial clip never purports to prove an answer', () => {
  const a = item(4, 28);
  const b = item(4, 29);
  assert.equal(a.audioClip!.audiblePhrase, b.audioClip!.audiblePhrase);
  assert.match(getListeningLearningFeedback(a, 'A', false, 4)!.retry, /Antes de ese giro/);
  assert.match(getListeningLearningFeedback(b, 'A', false, 4)!.retry, /tres variables/);
  assert.match(getListeningLearningFeedback(item(2, 3), '3', false, 2)!.reason, /Ninguna de esas cifras cuenta a los jugadores/);
  assert.match(getListeningLearningFeedback(item(2, 9), '30 minutes', false, 2)!.reason, /clip termina en esa pregunta/);
  assert.match(getListeningLearningFeedback(item(20, 3), '10', false, 20)!.retry, /audio completo/);
});

test('Set 1 Q8 explains the third included item when the guide prints the first two and handles the older broad frame', () => {
  const source = item(1, 8);
  const framed = { ...source, frame: 'Trip One · Includes: accommodation, car rental and a _____' };
  assert.match(getListeningLearningFeedback(framed, 'accommodation', false, 1)!.reason, /tercer elemento/);
  const broad = { ...source, frame: 'Trip One · 12 days · Includes: _____' };
  assert.match(getListeningLearningFeedback(broad, 'accommodation', false, 1)!.reason, /permite entender más de una/);
});

test('unordered choices award a matching answer in either slot and explain repeated credit', () => {
  const a = item(1, 11);
  const b = item(1, 12);
  assert.equal(a.scoringGroup!.id, b.scoringGroup!.id);
  assert.match(getListeningLearningFeedback(a, 'C', true, 1)!.reason, /orden de tus respuestas es libre/);
  assert.match(getListeningLearningFeedback(b, 'C', false, 1)!.reason, /solo suma una vez/);
  assert.doesNotMatch(getListeningLearningFeedback(b, 'D', false, 1)!.reason, /es una respuesta válida del grupo/);
});

test('word limits, grammatical endings, nearby heard details, visual locations and matching get different advice', () => {
  const fill = item(6, 17);
  assert.match(getListeningLearningFeedback(fill, 'small young children and toddlers', false, 6)!.reason, /límite de palabras/);
  assert.match(getListeningLearningFeedback(fill, 'toddler', false, 6)!.reason, /terminación/);
  const typo = getListeningLearningFeedback(fill, 'todlders', false, 6)!;
  assert.match(typo.reason, /grafía/);
  const numberForm = { ...fill, prompt: 'Write ONE WORD AND/OR A NUMBER for each answer.', maxWords: 1 };
  assert.doesNotMatch(getListeningLearningFeedback(numberForm, '1 hour', false, 6)!.reason, /supera el límite/);
  const choice: IeltsGuidedObjectiveItem = { ...item(2, 23), number: 99, prompt: 'Label the map below.', frame: 'Boat shelter', visual: { url: '/map.svg', alt: 'Site map' } };
  assert.match(getListeningLearningFeedback(choice, 'C', false, 2)!.link.href, /#map-labelling$/);
  const matching: IeltsGuidedObjectiveItem = { ...choice, questionType: 'matching', prompt: 'Match each speaker with an opinion.', frame: 'Rachel', visual: undefined };
  assert.match(getListeningLearningFeedback(matching, 'C', false, 2)!.link.href, /#matching$/);
});
