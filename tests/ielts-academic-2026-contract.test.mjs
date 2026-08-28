import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import set1 from '../src/data/mocks/ielts-set-1.ts';
import set3 from '../src/data/mocks/ielts-set-3.ts';
import set4 from '../src/data/mocks/ielts-set-4.ts';
import set5 from '../src/data/mocks/ielts-set-5.ts';
import set6 from '../src/data/mocks/ielts-set-6.ts';
import set7 from '../src/data/mocks/ielts-set-7.ts';
import set8 from '../src/data/mocks/ielts-set-8.ts';
import set9 from '../src/data/mocks/ielts-set-9.ts';
import set10 from '../src/data/mocks/ielts-set-10.ts';
import set11 from '../src/data/mocks/ielts-set-11.ts';
import set12 from '../src/data/mocks/ielts-set-12.ts';
import set13 from '../src/data/mocks/ielts-set-13.ts';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';
import { IELTS_EDITORIAL_STATUS_2026 } from '../src/data/mocks/ielts-editorial-status.ts';

function countAnswerKeys(mock) {
  return JSON.stringify(mock).match(/"answers?":/g)?.length ?? 0;
}

function words(value = '') {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalizedEvidenceText(value = '') {
  return ` ${value.toLowerCase().replaceAll('’', "'").replace(/[^a-z0-9£]+/g, ' ').trim()} `;
}

function evidencePositions(source, answers) {
  const positions = new Set();
  for (const answer of answers) {
    const needle = normalizedEvidenceText(answer);
    let position = source.indexOf(needle);
    while (position >= 0) {
      positions.add(position);
      position = source.indexOf(needle, position + 1);
    }
  }
  return [...positions].sort((a, b) => a - b);
}

function completionBlanks(section) {
  return section.questions.flatMap(question => (
    question.type === 'formgroup'
      ? question.blanks
      : question.type === 'tablegroup'
        ? question.rows.flat().filter(cell => typeof cell !== 'string')
        : []
  )).sort((a, b) => a.num - b.num);
}

function questionNumbers(question) {
  if ('qRange' in question && question.qRange) {
    return Array.from(
      { length: question.qRange[1] - question.qRange[0] + 1 },
      (_, index) => question.qRange[0] + index,
    );
  }
  const suffix = question.id.match(/q(\d+)$/i);
  return suffix ? [Number(suffix[1])] : [];
}

async function loadAuditedSets() {
  return Promise.all(Array.from({ length: 17 }, async (_, index) => {
    const setNumber = index + 4;
    const { default: authoredMock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
    return withIeltsAcademic2026Blueprint(authoredMock);
  }));
}

test('Sets 4–20 receive the explicit computer-delivered IELTS Academic 2026 contract', () => {
  const mock = withIeltsAcademic2026Blueprint(set4);
  assert.equal(mock.format, 'ielts-academic-2026');
  assert.equal(mock.timeMinutes, 164);
  assert.deepEqual(
    mock.ieltsAcademic2026Blueprint.sections.map(section => [section.skill, section.timeLimitSeconds]),
    [['listening', 1800], ['reading', 3600], ['writing', 3600], ['speaking', 840]],
  );
  assert.match(mock.ieltsAcademic2026Blueprint.disclosure, /original de WeLearn/);
  assert.match(mock.ieltsAcademic2026Blueprint.disclosure, /No es material oficial/);
});

test('all 20 sets have an explicit editorial certification state', () => {
  assert.deepEqual(Object.keys(IELTS_EDITORIAL_STATUS_2026).map(Number), Array.from({ length: 20 }, (_, index) => index + 1));
  assert.equal(IELTS_EDITORIAL_STATUS_2026[1].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[1].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[2].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[2].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[3].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[3].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[4].contentCertified, true);
  assert.equal(IELTS_EDITORIAL_STATUS_2026[5].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[6].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[6].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[7].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[7].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[8].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[8].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[9].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[9].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[10].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[10].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[11].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[11].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[12].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[12].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[13].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[13].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[14].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[14].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[15].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[15].provenance, 'audited-original-welearn');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[16].certification, 'certified-golden-content');
  assert.equal(IELTS_EDITORIAL_STATUS_2026[16].provenance, 'audited-original-welearn');
  for (let setNumber = 17; setNumber <= 20; setNumber += 1) {
    assert.equal(IELTS_EDITORIAL_STATUS_2026[setNumber].certification, 'pending-golden-audit');
  }
});

test('the Server Component projection removes every objective answer key', () => {
  const privateMock = withIeltsAcademic2026Blueprint(set4);
  assert.ok(countAnswerKeys(privateMock) > 0);
  assert.equal(countAnswerKeys(toPublicIeltsMock(privateMock)), 0);
});

test('sets whose integral Listening media is absent are visibly blocked, not silently broken', () => {
  const replacedSet = withIeltsAcademic2026Blueprint(set1);
  assert.equal(replacedSet.ieltsAcademic2026Blueprint.listeningMediaStatus, 'script-ready-audio-blocked');
  assert.ok(replacedSet.sections.filter(section => section.skill === 'listening').every(section => section.comingSoon && !section.audioUrl));

  const thirdGoldenSet = withIeltsAcademic2026Blueprint(set3);
  assert.equal(thirdGoldenSet.ieltsAcademic2026Blueprint.listeningMediaStatus, 'script-ready-audio-blocked');
  assert.ok(thirdGoldenSet.sections.filter(section => section.skill === 'listening').every(section => section.comingSoon && !section.audioUrl));

  const mock = withIeltsAcademic2026Blueprint(set13);
  assert.equal(mock.ieltsAcademic2026Blueprint.listeningMediaStatus, 'script-ready-audio-blocked');
  const listening = mock.sections.filter(section => section.skill === 'listening');
  assert.equal(listening.length, 4);
  assert.ok(listening.every(section => section.comingSoon && !section.audioUrl));
});

test('only owner-accepted Listening media is marked ready', () => {
  const acceptedPilot = withIeltsAcademic2026Blueprint(set4);
  const legacyAudio = withIeltsAcademic2026Blueprint(set5);
  assert.equal(acceptedPilot.ieltsAcademic2026Blueprint.listeningMediaStatus, 'ready-existing');
  assert.ok(acceptedPilot.sections.filter(section => section.skill === 'listening').every(section => section.mediaStatus === 'ready-existing'));
  assert.equal(legacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const nextLegacyAudio = withIeltsAcademic2026Blueprint(set6);
  assert.equal(nextLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const auditedLegacyAudio = withIeltsAcademic2026Blueprint(set7);
  assert.equal(auditedLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const nextAuditedLegacyAudio = withIeltsAcademic2026Blueprint(set8);
  assert.equal(nextAuditedLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const ninthAuditedLegacyAudio = withIeltsAcademic2026Blueprint(set9);
  assert.equal(ninthAuditedLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const tenthAuditedLegacyAudio = withIeltsAcademic2026Blueprint(set10);
  assert.equal(tenthAuditedLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const eleventhAuditedLegacyAudio = withIeltsAcademic2026Blueprint(set11);
  assert.equal(eleventhAuditedLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
  const twelfthAuditedLegacyAudio = withIeltsAcademic2026Blueprint(set12);
  assert.equal(twelfthAuditedLegacyAudio.ieltsAcademic2026Blueprint.listeningMediaStatus, 'legacy-audio-under-review');
});

test('all 17 Academic Reading papers contain 40 responses and 2,150–2,750 words', async () => {
  for (const mock of await loadAuditedSets()) {
    const reading = mock.sections.filter(section => section.skill === 'reading');
    const wordCount = reading.reduce((total, section) => total + words(section.passage), 0);
    const responseCount = reading.flatMap(section => section.questions).reduce((total, question) => (
      total + ('qRange' in question && question.qRange ? question.qRange[1] - question.qRange[0] + 1 : 1)
    ), 0);
    assert.ok(wordCount >= 2150 && wordCount <= 2750, `${mock.id} has ${wordCount} Reading words`);
    assert.equal(responseCount, 40, `${mock.id} Reading response count`);
  }
});

test('all 17 Listening papers preserve authored evidence and pass the full-density gate', async () => {
  const fingerprints = new Set();
  const fiftyWordShingleOwners = new Map();
  for (let setNumber = 4; setNumber <= 20; setNumber += 1) {
    const { default: authoredMock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
    const mock = withIeltsAcademic2026Blueprint(authoredMock);
    const authored = authoredMock.sections.filter(section => section.skill === 'listening');
    const listening = mock.sections.filter(section => section.skill === 'listening');
    assert.equal(listening.length, 4, `${mock.id} Listening parts`);
    assert.ok(listening.reduce((total, section) => total + words(section.transcript), 0) >= 2200, `${mock.id} Listening density`);
    for (const [index, section] of listening.entries()) {
      const expectedNumbers = Array.from({ length: 10 }, (_, offset) => index * 10 + offset + 1);
      assert.deepEqual(
        section.questions.flatMap(questionNumbers),
        expectedNumbers,
        `${mock.id} Part ${section.part} must contain its exact ten-question range`,
      );
      const partWords = words(section.transcript);
      assert.ok(partWords >= 540 && partWords <= 620, `${mock.id} Part ${section.part} has ${partWords} words`);
      for (const block of authored[index].transcript.trim().split(/\n{2,}/)) {
        assert.ok(section.transcript.includes(block.trim()), `${mock.id} Part ${section.part} must preserve authored block`);
      }
      if (section.part === 1 || section.part === 3) {
        for (const block of section.transcript.trim().split(/\n{2,}/)) {
          assert.match(block, /^[A-Z][A-Z -]{1,30}:\s+/, `${mock.id} Part ${section.part} speaker label`);
        }
      }
      const fingerprint = section.transcript.toLowerCase().replace(/\s+/g, ' ').trim();
      assert.equal(fingerprints.has(fingerprint), false, `${mock.id} Part ${section.part} duplicates another transcript`);
      fingerprints.add(fingerprint);
      const normalizedWords = section.transcript.toLowerCase().split(/[^a-z0-9-]+/).filter(Boolean);
      for (let offset = 0; offset + 50 <= normalizedWords.length; offset += 1) {
        const shingle = normalizedWords.slice(offset, offset + 50).join(' ');
        const owner = fiftyWordShingleOwners.get(shingle);
        assert.ok(!owner || owner === mock.id, `${mock.id} Part ${section.part} repeats 50 words from ${owner}`);
        fiftyWordShingleOwners.set(shingle, mock.id);
      }
    }
  }
});

test('Sets 4–20 are directly accessible from the public IELTS catalog', () => {
  const catalogSource = readFileSync(new URL('../src/data/exams.ts', import.meta.url), 'utf8');
  for (let setNumber = 4; setNumber <= 20; setNumber += 1) {
    assert.match(
      catalogSource,
      new RegExp(`\\{ id: 'set-${setNumber}',[^\\n]+free: true`),
      `set-${setNumber} must not render a Pro subscription lock`,
    );
  }
});

test('Writing and Speaking preserve the complete Academic task contract', async () => {
  for (const mock of await loadAuditedSets()) {
    const writing = mock.sections.filter(section => section.skill === 'writing').flatMap(section => section.questions);
    const task1 = writing.find(question => question.type === 'write' && question.taskNumber === 1);
    const task2 = writing.find(question => question.type === 'write' && question.taskNumber === 2);
    assert.equal(task1?.minWords, 150, `${mock.id} Task 1 minimum`);
    assert.equal(task2?.minWords, 250, `${mock.id} Task 2 minimum`);
    assert.ok(task1?.imageUrl, `${mock.id} Task 1 visual`);
    assert.ok(existsSync(new URL(`../public${task1.imageUrl}`, import.meta.url)), `${mock.id} Task 1 asset exists`);
    assert.ok((task2?.stimulus ?? '').trim().length >= 80, `${mock.id} Task 2 prompt is substantive`);

    const speaking = mock.sections.filter(section => section.skill === 'speaking').flatMap(section => section.questions);
    const part1 = speaking.filter(question => question.type === 'speak' && question.partNumber === 1);
    const part2 = speaking.find(question => question.type === 'speak' && question.partNumber === 2);
    const part3 = speaking.filter(question => question.type === 'speak' && question.partNumber === 3);
    const part1QuestionCount = part1.reduce((total, question) => total + (question.text.match(/\?/g)?.length ?? 0) + (question.followUp?.length ?? 0), 0);
    const part3QuestionCount = part3.reduce((total, question) => total + (question.text.match(/\?/g)?.length ?? 0) + (question.followUp?.length ?? 0), 0);
    assert.ok(part1QuestionCount >= 4, `${mock.id} Speaking Part 1 needs at least 4 questions`);
    assert.ok(part2?.cueCard?.includes('explain'), `${mock.id} Speaking Part 2 needs a complete cue card`);
    assert.ok((part2?.cueCard?.match(/•/g)?.length ?? 0) >= 3, `${mock.id} Speaking Part 2 cue points`);
    assert.ok(part3QuestionCount >= 4, `${mock.id} Speaking Part 3 needs at least 4 questions`);
  }
});

test('completion keys are supported verbatim by their Listening transcript or Reading passage', async () => {
  for (const mock of await loadAuditedSets()) {
    for (const section of mock.sections.filter(item => item.skill === 'listening' || item.skill === 'reading')) {
      const source = (section.transcript || section.passage || '').toLowerCase().replaceAll('’', "'");
      for (const question of section.questions) {
        const constrainedChoice = question.type === 'formgroup' && /(?:TRUE.+FALSE|YES.+NO).+NOT GIVEN/i.test(question.groupLabel);
        if (constrainedChoice) continue;
        const blanks = question.type === 'formgroup'
          ? question.blanks
          : question.type === 'tablegroup'
            ? question.rows.flat().filter(cell => typeof cell !== 'string')
            : [];
        for (const blank of blanks) {
          assert.ok(
            blank.answers.some(answer => source.includes(answer.toLowerCase().replaceAll('’', "'"))),
            `${mock.id} ${section.skill} ${question.id} Q${blank.num}: accepted answer must occur in source`,
          );
        }
      }
    }
  }
});

test('all Listening completion evidence follows question order in authored and expanded tapescripts', async () => {
  for (let setNumber = 4; setNumber <= 20; setNumber += 1) {
    const { default: authoredMock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
    const expandedMock = withIeltsAcademic2026Blueprint(authoredMock);
    const authoredListening = authoredMock.sections.filter(section => section.skill === 'listening');
    const expandedListening = expandedMock.sections.filter(section => section.skill === 'listening');
    for (const [index, authoredSection] of authoredListening.entries()) {
      for (const sourceText of [authoredSection.transcript, expandedListening[index].transcript]) {
        const source = normalizedEvidenceText(sourceText);
        let previousPosition = -1;
        for (const blank of completionBlanks(authoredSection)) {
          const positions = evidencePositions(source, blank.answers);
          const position = positions.find(candidate => candidate >= previousPosition);
          assert.notEqual(
            position,
            undefined,
            `set-${setNumber} Part ${authoredSection.part} Q${blank.num} evidence must follow Q${blank.num - 1}`,
          );
          previousPosition = position;
        }
      }
    }
  }
});

test('Listening includes matching and an original plan-labelling task', async () => {
  const sets = await loadAuditedSets();
  const listeningQuestions = sets.flatMap(mock => mock.sections)
    .filter(section => section.skill === 'listening')
    .flatMap(section => section.questions);
  assert.ok(listeningQuestions.some(question => question.type === 'matching'));
  assert.ok(listeningQuestions.some(question => (
    question.type === 'formgroup'
    && question.taskFamily === 'plan-map-diagram-labelling'
    && question.imageUrl?.endsWith('.svg')
  )));
});

test('the plan graphic does not reveal any accepted answer in text or alt copy', async () => {
  const set7 = (await loadAuditedSets()).find(mock => mock.id === 'set-7');
  const plan = set7.sections.flatMap(section => section.questions).find(question => (
    question.type === 'formgroup' && question.taskFamily === 'plan-map-diagram-labelling'
  ));
  assert.ok(plan?.imageUrl);
  const svg = readFileSync(new URL(`../public${plan.imageUrl}`, import.meta.url), 'utf8').toLowerCase();
  const exposedCopy = `${svg}\n${plan.imageAlt ?? ''}`.toLowerCase();
  for (const blank of plan.blanks) {
    for (const answer of blank.answers) {
      const escaped = answer.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
      assert.ok(!new RegExp(`\\b${escaped}\\b`).test(exposedCopy), `plan leaks answer: ${answer}`);
    }
  }
});

test('MCQ answer positions and option lengths do not expose the key statistically', async () => {
  const sets = await loadAuditedSets();
  for (const skill of ['listening', 'reading']) {
    const questions = sets.flatMap(mock => mock.sections)
      .filter(section => section.skill === skill)
      .flatMap(section => section.questions)
      .filter(question => question.type === 'mcq' || question.type === 'dialog');
    const positions = [0, 0, 0, 0];
    let uniquelyLongest = 0;
    for (const question of questions) {
      positions[question.answer] += 1;
      const lengths = question.options.map(words);
      const correctLength = lengths[question.answer];
      if (correctLength === Math.max(...lengths) && lengths.filter(length => length === correctLength).length === 1) {
        uniquelyLongest += 1;
      }
    }
    if (skill === 'reading') assert.ok(positions.every(position => position / questions.length >= 0.15));
    assert.ok(uniquelyLongest / questions.length <= 0.35, `${skill}: ${uniquelyLongest}/${questions.length}`);
  }
});
