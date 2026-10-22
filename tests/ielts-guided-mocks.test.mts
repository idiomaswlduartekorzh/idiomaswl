import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getIeltsGuidedEvidence } from '../src/data/ielts/guided-evidence.ts';
import {
  buildIeltsGuidedMock,
  getIeltsGuidedCorrectItemIds,
  IELTS_GUIDED_MOCK_IDS,
  sanitizeIeltsGuidedIndex,
} from '../src/data/ielts/guided-mock.ts';
import { getMock } from '../src/data/mocks/index.ts';

test('all 20 IELTS guided mocks bind complete objective evidence and chronological verified audio segments', () => {
  assert.equal(IELTS_GUIDED_MOCK_IDS.length, 20);

  for (const mockId of IELTS_GUIDED_MOCK_IDS) {
    const mock = getMock('ielts', mockId);
    assert.ok(mock, `${mockId}: missing canonical mock`);
    const artifact = getIeltsGuidedEvidence(mockId);
    const guided = buildIeltsGuidedMock(mock, artifact);
    const listening = guided.listeningUnits.flatMap(unit => unit.items);
    const reading = guided.readingUnits.flatMap(unit => unit.items);

    assert.equal(guided.listeningUnits.length, 8, `${mockId}: Listening must expose two blocks per part`);
    assert.equal(guided.readingUnits.length, 6, `${mockId}: Reading must expose two blocks per passage`);
    assert.equal(listening.length, 40, `${mockId}: incomplete Listening guide`);
    assert.equal(reading.length, 40, `${mockId}: incomplete Reading guide`);
    assert.equal(new Set(listening.map(item => item.number)).size, 40, `${mockId}: duplicate Listening number`);
    assert.equal(new Set(reading.map(item => item.number)).size, 40, `${mockId}: duplicate Reading number`);
    for (let part = 1; part <= 4; part += 1) {
      const partUnits = guided.listeningUnits.filter(unit => unit.part === part);
      assert.equal(partUnits.length, 2, `${mockId} Part ${part}: expected exactly two practice blocks`);
      assert.ok(partUnits.every(unit => unit.items.length > 0), `${mockId} Part ${part}: practice blocks must be non-empty`);
    }

    for (const item of listening) {
      if (item.evidence.status === 'pending-independent-review') {
        assert.equal(item.audioClip, undefined, `${mockId} Listening ${item.number}: pending clip leaked`);
        assert.equal(item.evidence.focus, '', `${mockId} Listening ${item.number}: pending excerpt leaked`);
      } else {
        assert.ok(item.audioClip, `${mockId} Listening ${item.number}: missing approved clip`);
        assert.ok(item.audioClip.endSeconds > item.audioClip.startSeconds, `${mockId} Listening ${item.number}: invalid clip`);
        assert.equal(item.evidence.focus, item.audioClip.audiblePhrase, `${mockId} Listening ${item.number}: clip/excerpt drift`);
      }
    }
    for (const unit of guided.listeningUnits) {
      const segments = unit.practiceSegments ?? [];
      assert.ok(segments.length > 0, `${mockId} ${unit.id}: missing verified practice segments`);
      segments.forEach((segment, index) => {
        assert.equal(segment.basis, 'approved-evidence-slice');
        assert.ok(segment.startSeconds > 0, `${mockId} ${unit.id}: practice must not restart the full recording at 0`);
        assert.ok(segment.endSeconds > segment.startSeconds, `${mockId} ${unit.id}: invalid segment`);
        assert.ok(segment.endSeconds - segment.startSeconds <= 60, `${mockId} ${unit.id}: segment exceeds 60 seconds`);
        if (index > 0) assert.ok(segment.startSeconds > segments[index - 1].endSeconds, `${mockId} ${unit.id}: segments regress or overlap`);
      });
      for (const item of unit.items.filter(current => current.audioClip)) {
        assert.ok(segments.some(segment => segment.startSeconds <= item.audioClip!.startSeconds && segment.endSeconds >= item.audioClip!.endSeconds), `${mockId} Listening ${item.number}: approved clip is outside practice segments`);
      }
    }
    guided.listeningUnits.forEach((unit, index) => {
      if (index === 0) return;
      const previousSegments = guided.listeningUnits[index - 1].practiceSegments ?? [];
      const segments = unit.practiceSegments ?? [];
      assert.ok(segments[0].startSeconds > previousSegments.at(-1)!.endSeconds,
        `${mockId} ${guided.listeningUnits[index - 1].id} → ${unit.id}: practice blocks regress or overlap`);
    });
    for (const item of reading) {
      assert.ok(item.evidence.focus.trim(), `${mockId} Reading ${item.number}: missing approved excerpt`);
      assert.equal(item.evidence.status, 'approved-excerpt');
    }

    const unitByItem = new Map([...guided.listeningUnits, ...guided.readingUnits].flatMap(unit => unit.items.map(item => [item.id, unit.id] as const)));
    for (const item of [...listening, ...reading]) {
      if (!item.scoringGroup) continue;
      assert.ok(item.scoringGroup.itemIds.every(itemId => unitByItem.get(itemId) === unitByItem.get(item.id)), `${mockId} ${item.scoringGroup.id}: scoring group split across practice blocks`);
    }

    const allItems = [...listening, ...reading];
    const scoringGroups = new Map(allItems.flatMap(item => item.scoringGroup ? [[item.scoringGroup.id, item.scoringGroup] as const] : []));
    for (const group of scoringGroups.values()) {
      const reversedTargets = [...group.targets].reverse();
      const permutedAnswers = Object.fromEntries(group.itemIds.map((itemId, index) => [itemId, reversedTargets[index][0]]));
      const permutedCorrect = getIeltsGuidedCorrectItemIds(allItems, permutedAnswers);
      assert.equal(group.itemIds.filter(itemId => permutedCorrect.has(itemId)).length, group.itemIds.length, `${mockId} ${group.id}: a valid permutation lost marks`);

      const duplicatedAnswers = Object.fromEntries(group.itemIds.map(itemId => [itemId, group.targets[0][0]]));
      const duplicatedCorrect = getIeltsGuidedCorrectItemIds(allItems, duplicatedAnswers);
      assert.equal(group.itemIds.filter(itemId => duplicatedCorrect.has(itemId)).length, 1, `${mockId} ${group.id}: one response was reused for multiple marks`);
    }
  }
});

function expectedObjectiveBindings(mock: NonNullable<ReturnType<typeof getMock>>, skill: 'listening' | 'reading') {
  const rows: { question: number; responseKey: string; part: number }[] = [];
  for (const section of mock.sections.filter(candidate => candidate.skill === skill)) {
    for (const question of section.questions) {
      if (question.type === 'formgroup') {
        question.blanks.forEach(blank => rows.push({ question: blank.num, responseKey: `${question.id}__${blank.num}`, part: section.part }));
      } else if (question.type === 'tablegroup') {
        question.rows.flatMap(row => row.filter(cell => typeof cell !== 'string')).forEach(blank => rows.push({ question: blank.num, responseKey: `${question.id}__${blank.num}`, part: section.part }));
      } else if (question.type === 'matching') {
        question.items.forEach(item => rows.push({ question: item.num, responseKey: `${question.id}__${item.num}`, part: section.part }));
      } else if (question.type === 'multiselect') {
        for (let number = question.qRange[0]; number <= question.qRange[1]; number += 1) rows.push({ question: number, responseKey: question.id, part: section.part });
      } else {
        const number = Number(question.id.match(/(?:q|question|blank)[-_]?(\d{1,2})$/i)?.[1]);
        assert.ok(Number.isInteger(number), `${mock.id}:${skill}:${question.id}: cannot derive question number`);
        rows.push({ question: number, responseKey: question.id, part: section.part });
      }
    }
  }
  return rows.sort((left, right) => left.question - right.question);
}

test('evidence responseKey, part and passagePart stay bound to the canonical mock', () => {
  for (const mockId of IELTS_GUIDED_MOCK_IDS) {
    const mock = getMock('ielts', mockId);
    assert.ok(mock);
    const artifact = getIeltsGuidedEvidence(mockId);
    for (const skill of ['listening', 'reading'] as const) {
      const expected = expectedObjectiveBindings(mock, skill);
      const actual = skill === 'listening'
        ? artifact.listening.questions.map(row => ({ question: row.question, responseKey: row.responseKey, part: row.part }))
        : artifact.reading.questions.map(row => ({ question: row.question, responseKey: row.responseKey, part: row.passagePart + 4 }));
      actual.sort((left, right) => left.question - right.question);
      assert.deepEqual(actual, expected, `${mockId}: ${skill} evidence binding drift`);
    }
  }
});

test('known remediated Listening cases retain exact independently reviewed evidence', () => {
  const set1 = getIeltsGuidedEvidence('set-1').listening.questions;
  assert.deepEqual(set1.filter(row => row.question === 11 || row.question === 12).map(row => ({
    question: row.question,
    responseKey: row.responseKey,
    part: row.part,
    startSeconds: row.startSeconds,
    endSeconds: row.endSeconds,
    audiblePhrase: row.audiblePhrase,
    status: row.status,
  })), [
    { question: 11, responseKey: 'l2-multi', part: 2, startSeconds: 411.98, endSeconds: 423.52, audiblePhrase: 'Our recently refurbished fitness suite has all the latest exercise equipment, including 10 new running machines and a wide range of weight training machines.', status: 'APPROVED' },
    { question: 12, responseKey: 'l2-multi', part: 2, startSeconds: 381.28, endSeconds: 393.08, audiblePhrase: "Our greatest asset is probably our swimming pool, which at 25 meters isn't Olympic-sized, but now we've expanded it to eight lanes. It's much wider.", status: 'APPROVED' },
  ]);

  const mock4 = getMock('ielts', 'set-4');
  assert.ok(mock4);
  assert.deepEqual(mock4.sections.filter(section => section.skill === 'listening').map(section => expectedObjectiveBindings({ ...mock4, sections: [section] }, 'listening').length), [10, 10, 10, 10]);
  const set4 = getIeltsGuidedEvidence('set-4').listening.questions.filter(row => row.question >= 28 && row.question <= 30);
  assert.deepEqual(set4.map(row => [row.question, row.responseKey, row.part, row.startSeconds, row.endSeconds, row.status]), [
    [28, 'l3q28', 3, 1218.84, 1229.32, 'APPROVED'],
    [29, 'l3q29', 3, 1218.84, 1229.32, 'APPROVED'],
    [30, 'l3q30', 3, 1284.22, 1298.86, 'APPROVED'],
  ]);
  assert.match(set4[0].audiblePhrase, /survey, it's practical given our time constraints/);
  assert.match(set4[1].audiblePhrase, /baseline mental health, pre-existing conditions and offline social support/);
  assert.match(set4[2].audiblePhrase, /include both.*weekly screen time summaries/);
});

test('known false Listening alignments point to their exact answer-bearing ASR slices', () => {
  const expected = new Map([
    ['set-2:21', [921.78, 937.7, /case studies.*Real-world examples/]],
    ['set-2:23', [998.6, 1002.28, /revise.*new section/]],
    ['set-2:24', [1031.02, 1040.32, /summarized.*stronger recommendations/]],
    ['set-13:13', [567.88, 574.74, /open exactly 3 hours before departure/]],
    ['set-17:22', [917.92, 927.24, /university students.*sport competitively/]],
    ['set-17:26', [1126.86, 1137.66, /increasing your sample size/]],
    ['set-19:21', [1010.2, 1024.76, /almost impossible to arrange.*far easier to approach/]],
    ['set-19:23', [1145.0800000000002, 1162.84, /proudest of the interviews.*strongest element/]],
  ] as const);
  for (const [binding, [startSeconds, endSeconds, phrasePattern]] of expected) {
    const [mockId, questionText] = binding.split(':');
    const row = getIeltsGuidedEvidence(mockId).listening.questions.find(candidate => candidate.question === Number(questionText));
    assert.ok(row, `${binding}: missing evidence`);
    assert.equal(row.startSeconds, startSeconds);
    assert.equal(row.endSeconds, endSeconds);
    assert.match(row.audiblePhrase, phrasePattern);
  }
});

test('unordered IELTS answers accept permutations but consume each target only once', () => {
  const mock = getMock('ielts', 'set-1');
  assert.ok(mock);
  const guided = buildIeltsGuidedMock(mock, getIeltsGuidedEvidence('set-1'));
  const items = [...guided.listeningUnits.flatMap(unit => unit.items), ...guided.readingUnits.flatMap(unit => unit.items)];

  for (const [skill, questionNumbers] of [['listening', [11, 12]], ['reading', [30, 31]]] as const) {
    const groupedItems = questionNumbers.map(number => items.find(item => item.id.startsWith(`${skill}-`) && item.number === number && item.scoringGroup));
    assert.ok(groupedItems.every(Boolean), `missing unordered group ${questionNumbers.join('/')}`);
    const [first, second] = groupedItems as [NonNullable<typeof groupedItems[0]>, NonNullable<typeof groupedItems[1]>];
    const group = first.scoringGroup!;
    assert.equal(group.id, second.scoringGroup?.id);

    const swapped = {
      [first.id]: group.targets[1][0],
      [second.id]: group.targets[0][0],
    };
    const swappedCorrect = getIeltsGuidedCorrectItemIds(items, swapped);
    assert.ok(swappedCorrect.has(first.id), `${group.id}: first swapped response rejected`);
    assert.ok(swappedCorrect.has(second.id), `${group.id}: second swapped response rejected`);

    const duplicate = {
      [first.id]: group.targets[0][0],
      [second.id]: group.targets[0][0],
    };
    const duplicateCorrect = getIeltsGuidedCorrectItemIds(items, duplicate);
    assert.equal(group.itemIds.filter(itemId => duplicateCorrect.has(itemId)).length, 1, `${group.id}: duplicated response reused for two marks`);
  }
});

test('guided Reading preserves source visuals required by the questions', () => {
  const mock = getMock('ielts', 'set-1');
  assert.ok(mock);
  const guided = buildIeltsGuidedMock(mock, getIeltsGuidedEvidence('set-1'));
  const visualUrls = new Set(guided.readingUnits.flatMap(unit => unit.visuals.map(visual => visual.url)));
  assert.ok(visualUrls.has('/ielts/images/reading-set-1-bakelite-flowchart.png'));
  assert.ok(visualUrls.has('/ielts/images/reading-set-1-brain-diagram.png'));
  assert.ok(guided.readingUnits.flatMap(unit => unit.visuals).every(visual => visual.alt.trim()), 'every guided visual needs alt text');
});

test('persisted guided indexes fail closed to the first valid unit', () => {
  assert.equal(sanitizeIeltsGuidedIndex(3, 8), 3);
  for (const invalid of [-1, 8, 2.5, Number.NaN, Number.POSITIVE_INFINITY, '3', null, undefined]) {
    assert.equal(sanitizeIeltsGuidedIndex(invalid, 8), 0);
  }
});

test('unreleased IELTS guides stay out of indexing and behind the exam access boundary', async () => {
  const [sitemap, route, coach] = await Promise.all([
    readFile(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/page.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/IeltsGuidedMockCoach.tsx', import.meta.url), 'utf8'),
  ]);
  assert.ok(!sitemap.includes('IELTS_GUIDED_MOCK_IDS'), 'unapproved IELTS guide routes must not enter the sitemap');
  assert.match(route, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(route, /<ExamAccessBoundary[\s\S]*examSlug="ielts"[\s\S]*redactLockedChildren/);
  assert.match(route, /lockedFallback=\{<IeltsGuidedLockedPreview/);
  assert.match(coach, /id="guided-workspace" data-exam-start="true"/);
});
