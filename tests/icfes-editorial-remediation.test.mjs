import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { CURRENT_PART_SEVEN } from '../src/data/mocks/icfes-current-part-seven.ts';
import {
  SIMULACROS,
  getIcfesPaidDetailAvailability,
  getSimulacroForPaidDetail,
} from '../src/data/mocks/icfes-simulacros.ts';

const moduleIds = ['01', '02', '03', '04', '06', '08', '10', '11', '12', '13', '15', '16', '17', '18', '19', '20', '22', '23'];
const mocks = new Map(await Promise.all(moduleIds.map(async (id) => {
  const mock = (await import(`../src/data/mocks/icfes-mock-${id}.ts`)).default;
  return [mock.id, mock];
})));

function section(mockId, part) {
  const result = mocks.get(mockId)?.sections.find((candidate) => candidate.part === part);
  assert.ok(result, `${mockId}: missing Part ${part}`);
  return result;
}

function question(mockId, part, id) {
  const result = section(mockId, part).questions.find((candidate) => candidate.id === id);
  assert.ok(result, `${mockId}: missing ${id}`);
  return result;
}

function sourceKey(finding) {
  return `${finding.resourceId}::${finding.questionId}::${finding.severity}`;
}

test('all 26 high/medium findings have a terminal machine-readable disposition', () => {
  const source = JSON.parse(readFileSync('artifacts/icfes-audit/icfes-editorial-multiagent-2026-09-08.json', 'utf8'));
  const ledger = JSON.parse(readFileSync('artifacts/icfes-audit/icfes-editorial-remediation-2026-09-08.json', 'utf8'));
  const findings = source.findings.filter(({ severity }) => severity === 'high' || severity === 'medium');

  assert.equal(findings.length, 26);
  assert.equal(ledger.findings.length, 26);
  assert.deepEqual(new Set(ledger.findings.map(({ sourceKey: key }) => key)), new Set(findings.map(sourceKey)));
  assert.equal(new Set(ledger.findings.map(({ sourceKey: key }) => key)).size, 26);

  for (const entry of ledger.findings) {
    assert.ok(['safe-correction', 'safe-block', 'false-positive'].includes(entry.classification));
    assert.ok(!/pending|unhandled|open/i.test(entry.status), `${entry.sourceKey}: non-terminal status`);
    assert.ok(entry.action.length >= 24);
    assert.ok(entry.evidence.length >= 1);
  }

  const highKeys = new Set(findings.filter(({ severity }) => severity === 'high').map(sourceKey));
  const unresolvedHigh = ledger.findings.filter((entry) => highKeys.has(entry.sourceKey) && /pending|unhandled|open/i.test(entry.status));
  assert.deepEqual(unresolvedHigh, []);
});

test('high-severity cloze ambiguities have one preserved intended key', () => {
  const expected = [
    ['mock-01', 'p4q1', 'system', ['service', 'network']],
    ['mock-01', 'p4q7', 'crowded', ['busy']],
    ['mock-02', 'p4q3', 'families', ['tourists', 'workers']],
    ['mock-02', 'p4q6', 'rent', ['buy']],
    ['mock-04', 'p4q1', 'students', ['children']],
    ['mock-04', 'p4q5', 'regions', ['districts', 'zones']],
    ['mock-04', 'p4q6', 'university', ['college']],
    ['mock-11', 'p4q6', 'determination', ['support']],
    ['mock-11', 'p4q7', 'teams', ['sports', 'events']],
    ['mock-17', 'p4q1', 'structures', ['systems']],
    ['mock-18', 'p4q8', 'results', ['scores', 'marks', 'grades']],
    ['mock-20', 'p4q8', 'part', ['corner']],
    ['mock-22', 'p4q5', 'everyone', ['anyone']],
    ['mock-23', 'p4q1', 'during', ['in']],
  ];

  for (const [mockId, id, key, removed] of expected) {
    const item = question(mockId, 4, id);
    assert.equal(item.options[item.answer], key, `${mockId}:${id}`);
    for (const distractor of removed) assert.ok(!item.options.includes(distractor), `${mockId}:${id} still contains ${distractor}`);
  }
});

test('dialogue and notice corrections preserve the intended answer and remove audited wording', () => {
  assert.equal(question('mock-03', 1, 'p1q2').options[1], 'Clean the equipment after using it');
  assert.match(question('mock-12', 1, 'p1q4').options[0], /vaccinated.*certified veterinarian/);
  assert.equal(question('mock-13', 1, 'p1q2').options[0], 'Latecomers must wait until the interval before entering');
  assert.equal(question('mock-19', 1, 'p1q5').options[1], 'The item was donated and its sale supports charity');

  const dialogueTargets = [
    ['mock-02', 'p3q4'], ['mock-03', 'p3q3'], ['mock-03', 'p3q4'], ['mock-03', 'p3q5'],
    ['mock-04', 'p3q1'], ['mock-04', 'p3q3'], ['mock-06', 'p3q3'], ['mock-08', 'p3q5'],
    ['mock-10', 'p3q3'], ['mock-11', 'p3q2'], ['mock-11', 'p3q5'], ['mock-13', 'p3q3'],
    ['mock-16', 'p3q3'], ['mock-17', 'p3q1'], ['mock-19', 'p3q3'],
  ];
  for (const [mockId, id] of dialogueTargets) {
    const item = question(mockId, 3, id);
    assert.ok(item.stimulus?.trim());
    assert.ok(item.options[item.answer]?.trim());
    assert.equal(new Set(item.options).size, 3);
  }
  assert.match(question('mock-03', 3, 'p3q5').options[2], /label|pharmacist/i);
  assert.doesNotMatch(question('mock-03', 3, 'p3q5').options.join(' '), /take them now/i);
});

test('mock-15 and mock-16 expose monotonic Part 4 markers aligned to prompts', () => {
  for (const mockId of ['mock-15', 'mock-16']) {
    const part = section(mockId, 4);
    const passageMarkers = [...part.passage.matchAll(/\((\d+)\) ___/g)].map((match) => Number(match[1]));
    const promptMarkers = part.questions.map(({ text }) => Number(text.match(/\((\d+)\)/)?.[1]));
    assert.deepEqual(passageMarkers, [16, 17, 18, 19, 20, 21, 22, 23], `${mockId}: passage order`);
    assert.deepEqual(promptMarkers, passageMarkers, `${mockId}: prompt mapping`);
  }
});

test('medium factual and wording repairs match their local evidence', () => {
  const bogota = section('mock-13', 5);
  assert.match(bogota.passage, /UNESCO World Book Capital for 2007/);
  assert.equal(question('mock-13', 5, 'p5q4').options[1], 'It was named UNESCO World Book Capital for 2007.');

  const murals = section('mock-13', 6);
  assert.doesNotMatch(murals.passage, /reductions? in crime/i);
  assert.equal(question('mock-13', 6, 'p6q2').options[2], 'To give communities ownership and pride in their surroundings.');
  assert.equal(question('mock-17', 6, 'p6q5').options[1], 'More research, including sample-return missions, will be needed');
  assert.equal(question('mock-20', 5, 'p5q3').text, 'What do some universities require students to do before graduating?');
  assert.match(section('mock-23', 5).passage, /letters preserve the history.*more meaningful over time/);
});

test('runtime Part 7 corrections are applied to the shared source', () => {
  const recovery = CURRENT_PART_SEVEN['mock-11'];
  const birds = CURRENT_PART_SEVEN['mock-17'];
  assert.equal(recovery.questions[0].options[recovery.questions[0].answer], 'recover');
  assert.match(recovery.passage, /Muscles need time to \(36\) ___/);
  assert.match(birds.passage, /record \(37\) ___ bird species/);
  assert.equal(birds.questions[1].options[birds.questions[1].answer], 'which');
  assert.ok(!birds.questions[1].options.includes('what'));
});

test('official metadata is honest and all official paid detail is policy-blocked', () => {
  for (const exam of SIMULACROS) {
    assert.equal(exam.partMapping.status, 'local-canonical-source-map-unverified');
    assert.equal(exam.partMapping.sourcePartRanges, null);
    assert.deepEqual(exam.partMapping.canonicalSkillPartRanges, exam.partRanges);
    assert.equal(exam.provenance.status, 'local-bank-only-not-independently-verified');
    assert.equal(exam.provenance.items.length, exam.questions.length);
    assert.ok(Object.isFrozen(exam.provenance));
    assert.ok(Object.isFrozen(exam.provenance.items));
    assert.ok(exam.provenance.items.every((item) => Number.isInteger(item.canonicalSkillPart)
      && item.sourcePart === null
      && item.officialUrl === null
      && item.localSourceHash === null
      && item.sourcePageOrItemCode === null
      && item.officialAnswerKey === null
      && item.transcriptionStatus === 'unverified'
      && item.adaptationStatus === 'unknown'));

    const availability = getIcfesPaidDetailAvailability(exam.id);
    assert.equal(availability.eligible, false);
    assert.equal(availability.scope, 'resource');
    assert.equal(getSimulacroForPaidDetail(exam.id), undefined);
  }

  const tyt = SIMULACROS.find(({ id }) => id === 'icfes-tyt');
  assert.equal(tyt.questions.find(({ n }) => n === 1).stem, 'You use this to watch videos.');
});
