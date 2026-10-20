import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import ieltsSet1 from '../src/data/mocks/ielts-set-1.ts';
import type { Question } from '../src/data/mocks/types.ts';
import {
  IELTS_GUIDED_SET_1_AUDIO,
  IELTS_GUIDED_SET_1_LISTENING,
  IELTS_GUIDED_SET_1_READING,
  IELTS_GUIDED_SET_1_SPEAKING,
  IELTS_GUIDED_SET_1_WRITING,
} from '../src/data/ielts/guided-set-1.ts';

type ListeningEvidence = {
  audio: { url: string };
  evidence: Array<{
    question: number;
    startSeconds: number;
    endSeconds: number;
    audiblePhrase: string;
  }>;
};

test('guided Listening clips are exact slices of the approved Set 1 evidence', async () => {
  const source = JSON.parse(await readFile(new URL('../config/ielts-harness/listening-evidence/set-1-listening-evidence.json', import.meta.url), 'utf8')) as ListeningEvidence;
  assert.equal(IELTS_GUIDED_SET_1_AUDIO, source.audio.url);
  assert.equal(new Set(IELTS_GUIDED_SET_1_LISTENING.map(item => item.number)).size, IELTS_GUIDED_SET_1_LISTENING.length);

  for (const item of IELTS_GUIDED_SET_1_LISTENING) {
    const approved = source.evidence.find(evidence => evidence.question === item.number);
    assert.ok(approved, `missing approved evidence for Listening ${item.number}`);
    assert.equal(item.startSeconds, approved.startSeconds);
    assert.equal(item.endSeconds, approved.endSeconds);
    assert.equal(item.audiblePhrase, approved.audiblePhrase);
    assert.ok(item.endSeconds > item.startSeconds);
  }
});

test('guided Reading highlights are literal and the guided keys match Set 1', () => {
  const passage = ieltsSet1.sections.find(section => section.part === 5 && section.skill === 'reading');
  assert.ok(passage?.passage);

  for (const item of IELTS_GUIDED_SET_1_READING) {
    assert.ok(passage.passage.includes(item.evidenceFocus), `Reading ${item.number} highlight is not literal`);

    if (item.kind === 'choice') {
      const question: Question | undefined = passage.questions.find(candidate => candidate.id === `r1q${item.number}`);
      assert.ok(question && question.type === 'mcq');
      assert.equal(question.options[question.answer], item.answer);
      continue;
    }

    const group = passage.questions.find(candidate => candidate.type === 'formgroup' && candidate.blanks.some(blank => blank.num === item.number));
    assert.ok(group && group.type === 'formgroup');
    const blank = group.blanks.find(candidate => candidate.num === item.number);
    assert.ok(blank?.answers.some(answer => item.accepted.includes(answer.toLowerCase())));
  }
});

test('Writing and Speaking band references are complete local teaching assets', async () => {
  const audioPlan = JSON.parse(await readFile(new URL('../config/ielts-guided-speaking-audio.json', import.meta.url), 'utf8')) as {
    engine: string;
    items: Array<{ band: '5.5' | '9.0'; text: string; publicUrl: string }>;
  };
  assert.equal(audioPlan.engine, 'ResembleAI/chatterbox');

  for (const band of ['5.5', '9.0'] as const) {
    const writing = IELTS_GUIDED_SET_1_WRITING.samples[band];
    assert.equal(writing.answer.trim().split(/\s+/).length, writing.wordCount);
    assert.ok(writing.wordCount >= 250);
    assert.equal(writing.criteria.length, 4);

    const speaking = IELTS_GUIDED_SET_1_SPEAKING.samples[band];
    assert.ok(speaking.transcript.trim().split(/\s+/).length >= 100);
    assert.equal(speaking.criteria.length, 4);
    const plannedAudio = audioPlan.items.find(item => item.band === band);
    assert.ok(plannedAudio, `missing Chatterbox plan for Speaking band ${band}`);
    assert.equal(plannedAudio.text, speaking.transcript);
    assert.equal(plannedAudio.publicUrl, speaking.audio.url);
    if (speaking.audio.ready) {
      await access(new URL(`../public${speaking.audio.url}`, import.meta.url));
    }
  }
});
