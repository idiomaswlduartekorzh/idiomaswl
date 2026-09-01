import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  validateIeltsListeningResponses,
} from '../src/lib/ielts/listening-practice-contract.ts';
import { readBoundedJson } from '../src/lib/http/read-bounded-json.ts';
import {
  ieltsListeningPublicQuestionNumbers,
  ieltsListeningPublicResponseSpecs,
  ieltsListeningStorageKey,
} from '../src/lib/ielts/listening-public-contract.ts';
import { createIeltsListeningScoreResponse } from '../src/lib/ielts/listening-score-route-contract.ts';
import {
  assertIeltsListeningRegistrationBundle,
  assertIeltsListeningRegistryCatalog,
  assertIeltsListeningRegistryEntries,
  assertIeltsListeningScoringIdentity,
} from '../src/lib/ielts/listening-registry-contract.ts';
import { validateListeningReleaseApproval } from '../scripts/lib/ielts-listening-release-approval.mjs';
import {
  assertListeningReleaseMarkerStructure,
  extractListeningReleaseBlocks,
} from '../scripts/lib/ielts-listening-release-scope.mjs';
import { IELTS_LISTENING_QUESTION_TYPE_ENTITIES } from '../src/data/ielts/listening-question-type-entities.ts';

const root = process.cwd();
const fixture = {
  id: 'welearn-listening-part-1-999',
  contentVersion: 'test-v1',
  part: 1,
  practiceNumber: 999,
  title: 'Original test fixture',
  scenario: 'A booking conversation.',
  instructions: 'Listen and answer.',
  transcript: 'Private transcript with every answer.',
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-1-999.mp3',
    durationSeconds: 120,
    sha256: 'a'.repeat(64),
  },
  groups: [
    {
      type: 'form',
      id: 'form',
      questionRange: [1, 6],
      instruction: 'Complete the form.',
      title: 'Booking',
      template: '{{1}} {{2}} {{3}} {{4}} {{5}} {{6}}',
      blanks: Array.from({ length: 6 }, (_, index) => ({
        number: index + 1,
        acceptedAnswers: [`value-${index + 1}`],
        expected: `value-${index + 1}`,
        explanation: `Evidence for question ${index + 1}.`,
        maxWords: 1,
      })),
    },
    {
      type: 'table',
      id: 'table',
      questionRange: [7, 10],
      instruction: 'Complete the table.',
      headers: ['Item', 'Value'],
      rows: Array.from({ length: 4 }, (_, index) => [
        { type: 'text', text: `Row ${index + 1}` },
        { number: index + 7, acceptedAnswers: [`value-${index + 7}`], expected: `value-${index + 7}`, explanation: `Evidence for question ${index + 7}.`, maxWords: 1, type: 'blank' },
      ]),
    },
  ],
};

const partTwoChoiceFixture = {
  id: 'welearn-listening-part-2-998',
  contentVersion: 'test-v2',
  part: 2,
  practiceNumber: 998,
  title: 'Original Part 2 contract fixture',
  scenario: 'One speaker explains a fictional community venue.',
  instructions: 'Listen and answer Questions 11–20.',
  transcript: 'Private original fixture transcript with evidence in question order.',
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-2-998.mp3',
    durationSeconds: 150,
    sha256: 'b'.repeat(64),
  },
  groups: [
    {
      type: 'single-choice',
      id: 'choice',
      questionRange: [11, 15],
      instruction: 'Select one option, A, B or C, for each question.',
      questions: Array.from({ length: 5 }, (_, index) => ({
        number: index + 11,
        prompt: `Original question ${index + 11}?`,
        options: [
          { key: 'A', label: `Option A${index}` },
          { key: 'B', label: `Option B${index}` },
          { key: 'C', label: `Option C${index}` },
        ],
        correctOptionKey: ['A', 'B', 'C', 'A', 'B'][index],
        expected: ['A', 'B', 'C', 'A', 'B'][index],
        explanation: `The speaker resolves the distractors for question ${index + 11} explicitly.`,
      })),
    },
    {
      type: 'map-labelling',
      id: 'map',
      questionRange: [16, 20],
      instruction: 'Match each place to the correct letter, A–H.',
      map: {
        url: '/images/ielts/listening/welearn-listening-part-2-998-map.svg',
        width: 1000,
        height: 650,
        alt: 'North-up fictional venue plan with eight lettered candidate rooms around a central courtyard.',
        longDescription: 'The entrance is centred on the south wall. Candidate rooms A to C are along the north side, D and E flank the courtyard, and F to H are along the south side.',
        areaKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      },
      options: Array.from({ length: 8 }, (_, index) => ({
        key: String.fromCharCode(65 + index),
        label: `Candidate ${String.fromCharCode(65 + index)} spatial description`,
      })),
      questions: Array.from({ length: 5 }, (_, index) => ({
        number: index + 16,
        prompt: `Original map place ${index + 16}`,
        correctOptionKey: ['H', 'F', 'A', 'E', 'C'][index],
        expected: ['H', 'F', 'A', 'E', 'C'][index],
        explanation: `The route language identifies the location for question ${index + 16} without ambiguity.`,
      })),
    },
  ],
};

function forbiddenPaths(value, pathName = '$') {
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => {
    const childPath = `${pathName}.${key}`;
    return [
      ...(['answer', 'answers', 'acceptedAnswers', 'correctOptionKey', 'expected', 'explanation', 'transcript'].includes(key) ? [childPath] : []),
      ...forbiddenPaths(child, childPath),
    ];
  });
}

function listFilesRecursively(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFilesRecursively(absolutePath) : [absolutePath];
  });
}

test('projects a serializable allowlist DTO with no private transcript or answer keys', () => {
  const before = structuredClone(fixture);
  const dto = projectIeltsListeningPractice(fixture, '/resolved/audio.mp3');
  assert.deepEqual(forbiddenPaths(dto), []);
  assert.deepEqual(JSON.parse(JSON.stringify(dto)), dto);
  assert.deepEqual(fixture, before);
  assert.equal(dto.questionCount, 10);
  assert.equal(dto.part, 1);
  assert.equal(dto.practiceNumber, 999);
  assert.deepEqual(dto.questionRange, [1, 10]);
  assert.deepEqual(ieltsListeningQuestionNumbers(fixture), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('derives an exact contiguous ten-question window from the declared part', () => {
  const partTwo = structuredClone(fixture);
  partTwo.id = 'welearn-listening-part-2-999';
  partTwo.part = 2;
  partTwo.audio.localPath = '/audio/ielts/listening/welearn-listening-part-2-999.mp3';
  for (const group of partTwo.groups) {
    group.questionRange = [group.questionRange[0] + 10, group.questionRange[1] + 10];
    if (group.type === 'form') {
      group.template = group.template.replace(/\{\{(\d+)\}\}/g, (_, value) => `{{${Number(value) + 10}}}`);
      for (const blank of group.blanks) blank.number += 10;
    } else {
      for (const row of group.rows) {
        for (const cell of row) if (cell.type === 'blank') cell.number += 10;
      }
    }
  }
  const dto = projectIeltsListeningPractice(partTwo, '/audio.mp3');
  assert.equal(dto.part, 2);
  assert.deepEqual(dto.questionRange, [11, 20]);
  assert.deepEqual(ieltsListeningQuestionNumbers(partTwo), [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

  const wrongWindow = structuredClone(fixture);
  wrongWindow.id = 'welearn-listening-part-2-999';
  wrongWindow.part = 2;
  wrongWindow.audio.localPath = '/audio/ielts/listening/welearn-listening-part-2-999.mp3';
  assert.throws(() => projectIeltsListeningPractice(wrongWindow, '/audio.mp3'), /exact question sequence 11–20/i);
  assert.throws(() => scoreIeltsListeningPractice(wrongWindow, {}), /exact question sequence 11–20/i);
});

test('projects and scores exact-option Part 2 MCQ and map groups without leaking keys', () => {
  const dto = projectIeltsListeningPractice(partTwoChoiceFixture, '/resolved/part-2.mp3');
  assert.deepEqual(forbiddenPaths(dto), []);
  assert.deepEqual(ieltsListeningPublicQuestionNumbers(dto), [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  const publicSpecs = ieltsListeningPublicResponseSpecs(dto);
  const sourceSpecs = ieltsListeningResponseSpecs(partTwoChoiceFixture);
  assert.deepEqual(publicSpecs, sourceSpecs);
  assert.deepEqual(publicSpecs[0], { number: 11, kind: 'choice', allowedValues: ['A', 'B', 'C'] });
  assert.deepEqual(publicSpecs[5], { number: 16, kind: 'choice', allowedValues: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] });

  const answers = { 11: 'A', 12: 'B', 13: 'C', 14: 'A', 15: 'B', 16: 'H', 17: 'F', 18: 'A', 19: 'E', 20: 'C' };
  assert.equal(validateIeltsListeningResponses(answers, sourceSpecs), true);
  assert.equal(scoreIeltsListeningPractice(partTwoChoiceFixture, answers).correct, 10);
  assert.equal(validateIeltsListeningResponses({ ...answers, 11: 'a' }, sourceSpecs), false);
  assert.equal(validateIeltsListeningResponses({ ...answers, 16: 'Z' }, sourceSpecs), false);
  assert.equal(scoreIeltsListeningPractice(partTwoChoiceFixture, { ...answers, 11: 'a' }).correct, 9);

  const invalidChoice = structuredClone(partTwoChoiceFixture);
  invalidChoice.groups[0].questions[0].options.pop();
  assert.throws(() => projectIeltsListeningPractice(invalidChoice, '/audio.mp3'), /exact option sequence A, B, C/i);
  const unknownChoice = structuredClone(partTwoChoiceFixture);
  unknownChoice.groups[0].questions[0].correctOptionKey = 'H';
  assert.throws(() => projectIeltsListeningPractice(unknownChoice, '/audio.mp3'), /unknown correct option/i);
  const contradictoryChoice = structuredClone(partTwoChoiceFixture);
  contradictoryChoice.groups[0].questions[0].expected = 'B';
  assert.throws(() => projectIeltsListeningPractice(contradictoryChoice, '/audio.mp3'), /model response contradicts/i);
  const invalidMap = structuredClone(partTwoChoiceFixture);
  invalidMap.groups[1].map.url = '/images/ielts/listening/wrong-map.svg';
  assert.throws(() => projectIeltsListeningPractice(invalidMap, '/audio.mp3'), /map asset metadata/i);
  const duplicateMapOption = structuredClone(partTwoChoiceFixture);
  duplicateMapOption.groups[1].options[1].key = 'A';
  assert.throws(() => projectIeltsListeningPractice(duplicateMapOption, '/audio.mp3'), /unique non-empty option/i);
  const mismatchedAreaKeys = structuredClone(partTwoChoiceFixture);
  mismatchedAreaKeys.groups[1].map.areaKeys[7] = 'G';
  assert.throws(() => projectIeltsListeningPractice(mismatchedAreaKeys, '/audio.mp3'), /matching contiguous area keys/i);
  const contradictoryMap = structuredClone(partTwoChoiceFixture);
  contradictoryMap.groups[1].questions[0].expected = 'A';
  assert.throws(() => projectIeltsListeningPractice(contradictoryMap, '/audio.mp3'), /model response contradicts/i);
});

test('the server registry contract rejects crossed and duplicate identities', () => {
  const first = {
    key: 'welearn-listening-part-1-001',
    identity: { id: 'welearn-listening-part-1-001', contentVersion: 'v1', part: 1, practiceNumber: 1 },
  };
  const second = {
    key: 'welearn-listening-part-2-001',
    identity: { id: 'welearn-listening-part-2-001', contentVersion: 'v1', part: 2, practiceNumber: 1 },
  };
  assert.doesNotThrow(() => assertIeltsListeningRegistryEntries([first, second]));
  assert.throws(() => assertIeltsListeningRegistryEntries([]), /cannot be empty/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([{ ...first, key: 'crossed' }]), /key mismatch/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([first, first]), /duplicate.*key/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([first, { ...second, identity: { ...second.identity, id: first.identity.id } }]), /key mismatch/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([first, {
    key: 'welearn-listening-part-1-002',
    identity: { id: 'welearn-listening-part-1-002', contentVersion: 'v2', part: 1, practiceNumber: 1 },
  }]), /duplicate.*part\/practice/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([{ ...first, identity: { ...first.identity, contentVersion: '' } }]), /content version/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([{ ...first, identity: { ...first.identity, part: 5 } }]), /invalid part/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([{ ...first, identity: { ...first.identity, practiceNumber: 0 } }]), /invalid practice number/i);
  assert.throws(() => assertIeltsListeningRegistryEntries([{
    ...first,
    key: 'welearn-listening-part-1-002',
    identity: { ...first.identity, id: 'welearn-listening-part-1-002' },
  }]), /identity must be/i);
});

test('the registry reconciles public DTO, question range, scorer and release catalog', () => {
  const identity = { id: 'welearn-listening-part-2-001', contentVersion: 'v2', part: 2, practiceNumber: 1 };
  const bundle = {
    key: identity.id,
    identity,
    publicPractice: { ...identity, questionCount: 10, questionRange: [11, 20] },
    publicQuestionNumbers: Array.from({ length: 10 }, (_, index) => index + 11),
    questionNumbers: Array.from({ length: 10 }, (_, index) => index + 11),
    publicResponseSpecs: Array.from({ length: 10 }, (_, index) => ({ number: index + 11, kind: 'text' })),
    responseSpecs: Array.from({ length: 10 }, (_, index) => ({ number: index + 11, kind: 'text' })),
    scoreProbe: {
      total: 10,
      outcomes: Array.from({ length: 10 }, (_, index) => ({ number: index + 11 })),
    },
  };
  const registry = [{ key: identity.id, identity }];
  const catalog = [{
    practiceId: identity.id,
    contentVersion: identity.contentVersion,
    part: identity.part,
    practiceNumber: identity.practiceNumber,
    publication: 'public',
  }];

  assert.doesNotThrow(() => assertIeltsListeningRegistrationBundle(bundle));
  assert.doesNotThrow(() => assertIeltsListeningRegistryCatalog(registry, catalog));
  assert.doesNotThrow(() => assertIeltsListeningScoringIdentity(identity, identity));
  assert.throws(() => assertIeltsListeningScoringIdentity(identity, { ...identity, practiceNumber: 2 }), /scorer identity mismatch/i);
  assert.throws(() => assertIeltsListeningRegistrationBundle({
    ...bundle,
    publicPractice: { ...bundle.publicPractice, part: 1 },
  }), /public projection mismatch/i);
  assert.throws(() => assertIeltsListeningRegistrationBundle({
    ...bundle,
    publicQuestionNumbers: Array.from({ length: 10 }, (_, index) => index + 1),
  }), /public group questions.*11–20/i);
  assert.throws(() => assertIeltsListeningRegistrationBundle({
    ...bundle,
    questionNumbers: Array.from({ length: 10 }, (_, index) => index + 1),
  }), /scorer question range.*11–20/i);
  assert.throws(() => assertIeltsListeningRegistrationBundle({
    ...bundle,
    responseSpecs: bundle.responseSpecs.map((spec, index) => index === 0
      ? { number: spec.number, kind: 'choice', allowedValues: ['A', 'B', 'C'] }
      : spec),
  }), /response spec mismatch/i);
  assert.throws(() => assertIeltsListeningRegistrationBundle({
    ...bundle,
    scoreProbe: { total: 10, outcomes: Array.from({ length: 10 }, (_, index) => ({ number: index + 1 })) },
  }), /scorer outcomes.*11–20/i);
  assert.throws(() => assertIeltsListeningRegistryCatalog(registry, []), /catalog cannot be empty/i);
  assert.throws(() => assertIeltsListeningRegistryCatalog(registry, [{ ...catalog[0], contentVersion: 'crossed' }]), /catalog identity mismatch/i);
  assert.throws(() => assertIeltsListeningRegistryCatalog(registry, [catalog[0], catalog[0]]), /duplicate.*catalog/i);
});

test('scores on the server contract without returning a band or accepted values', () => {
  const responses = Object.fromEntries(Array.from({ length: 10 }, (_, index) => [String(index + 1), `VALUE-${index + 1}`]));
  const result = scoreIeltsListeningPractice(fixture, responses);
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.deepEqual(Object.keys(result).sort(), ['correct', 'disclosure', 'outcomes', 'total', 'transcript']);
  assert.equal(result.disclosure, 'WeLearn practice result. It is not an official IELTS band score.');
  assert.ok(result.outcomes.every((outcome) =>
    JSON.stringify(Object.keys(outcome).sort()) === JSON.stringify(['correct', 'expected', 'explanation', 'number'])));
  assert.deepEqual(forbiddenPaths(result).filter((entry) => !/\.(?:transcript|expected|explanation)$/.test(entry)), []);
  assert.deepEqual((function findBandKeys(value, pathName = '$') {
    if (!value || typeof value !== 'object') return [];
    return Object.entries(value).flatMap(([key, child]) => [
      ...(/band/i.test(key) ? [`${pathName}.${key}`] : []),
      ...findBandKeys(child, `${pathName}.${key}`),
    ]);
  })(result), []);
  assert.equal(result.transcript, fixture.transcript);

  const nearMiss = { ...responses, 4: 'different' };
  assert.equal(scoreIeltsListeningPractice(fixture, nearMiss).correct, 9);
});

test('accepts reasonable number-and-word variants allowed by the displayed instruction', () => {
  const variantFixture = structuredClone(fixture);
  variantFixture.groups[0].blanks[3].acceptedAnswers = ['16', '16th'];
  variantFixture.groups[1].rows[0][1].acceptedAnswers = ['2.5', '2.5 hours'];
  variantFixture.groups[1].rows[2][1].acceptedAnswers = ['44', '44 pounds'];
  const responses = Object.fromEntries(Array.from({ length: 10 }, (_, index) => [String(index + 1), `value-${index + 1}`]));
  responses['4'] = '16th';
  responses['7'] = '2.5 hours';
  responses['9'] = '44 pounds';
  assert.equal(scoreIeltsListeningPractice(variantFixture, responses).correct, 10);
});

test('accepts only a complete bounded response map for questions 1–10', () => {
  const complete = Object.fromEntries(Array.from({ length: 10 }, (_, index) => [String(index + 1), 'response']));
  const responseSpecs = ieltsListeningResponseSpecs(fixture);
  assert.equal(validateIeltsListeningResponses(complete, responseSpecs), true);
  assert.equal(validateIeltsListeningResponses({ ...complete, 11: 'extra' }, responseSpecs), false);
  assert.equal(validateIeltsListeningResponses({ ...complete, 5: '' }, responseSpecs), false);
  assert.equal(validateIeltsListeningResponses({ ...complete, 5: 'x'.repeat(81) }, responseSpecs), false);
});

test('fails closed on structural and private-answer mutations', () => {
  const invalidPracticeNumber = structuredClone(fixture);
  invalidPracticeNumber.practiceNumber = 0;
  assert.throws(() => projectIeltsListeningPractice(invalidPracticeNumber, '/audio.mp3'), /positive integer/i);

  const mismatchedId = structuredClone(fixture);
  mismatchedId.id = 'welearn-listening-part-1-998';
  assert.throws(() => projectIeltsListeningPractice(mismatchedId, '/audio.mp3'), /practice ID/i);

  const gap = structuredClone(fixture);
  gap.groups[0].blanks[5].number = 7;
  assert.throws(() => projectIeltsListeningPractice(gap, '/audio.mp3'), /exact question sequence/i);

  const crossedRanges = structuredClone(fixture);
  crossedRanges.groups[0].blanks[5].number = 7;
  crossedRanges.groups[1].rows[0][1].number = 6;
  crossedRanges.groups[0].template = '{{1}} {{2}} {{3}} {{4}} {{5}} {{7}}';
  assert.throws(() => projectIeltsListeningPractice(crossedRanges, '/audio.mp3'), /question range/i);

  const duplicateId = structuredClone(fixture);
  duplicateId.groups[1].id = 'form';
  assert.throws(() => projectIeltsListeningPractice(duplicateId, '/audio.mp3'), /unique.*group IDs/i);

  const placeholder = structuredClone(fixture);
  placeholder.groups[0].template = '{{1}} {{2}} {{3}} {{4}} {{5}} {{5}}';
  assert.throws(() => projectIeltsListeningPractice(placeholder, '/audio.mp3'), /placeholders/i);

  const emptyAcceptedAnswers = structuredClone(fixture);
  emptyAcceptedAnswers.groups[0].blanks[0].acceptedAnswers = [];
  assert.throws(() => projectIeltsListeningPractice(emptyAcceptedAnswers, '/audio.mp3'), /model response/i);

  const invalidWordLimit = structuredClone(fixture);
  invalidWordLimit.groups[0].blanks[0].maxWords = 0;
  assert.throws(() => projectIeltsListeningPractice(invalidWordLimit, '/audio.mp3'), /invalid word limit/i);

  const unevenTable = structuredClone(fixture);
  unevenTable.groups[1].rows[0].push({ type: 'text', text: 'Unexpected third cell' });
  assert.throws(() => projectIeltsListeningPractice(unevenTable, '/audio.mp3'), /table rows/i);

  const unknownGroup = structuredClone(fixture);
  unknownGroup.groups[1] = { type: 'multiple-choice', id: 'unsupported', questionRange: [7, 10] };
  assert.throws(() => projectIeltsListeningPractice(unknownGroup, '/audio.mp3'), /unsupported.*group type/i);
});

test('bounds streamed JSON even when no Content-Length header is available', async () => {
  const valid = await readBoundedJson(new Request('https://example.test', {
    method: 'POST',
    body: JSON.stringify({ ok: true }),
  }), 64);
  assert.deepEqual(valid, { ok: true, value: { ok: true } });

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"chunk":"'));
      controller.enqueue(new TextEncoder().encode('too-long"}'));
      controller.close();
    },
  });
  const oversized = await readBoundedJson(new Request('https://example.test', {
    method: 'POST',
    body: stream,
    duplex: 'half',
  }), 12);
  assert.deepEqual(oversized, { ok: false, code: 'payload_too_large', status: 413 });
});

test('the executable score handler freezes private headers and fail-closed routing', async () => {
  const questionNumbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const responses = Object.fromEntries(questionNumbers.map((number) => [String(number), `answer-${number}`]));
  const scoreResult = {
    correct: 0,
    total: 10,
    transcript: 'Released only after a complete submission.',
    outcomes: questionNumbers.map((number) => ({
      number,
      correct: false,
      expected: `expected-${number}`,
      explanation: `explanation-${number}`,
    })),
    disclosure: 'Not an official band score.',
  };
  const responseSpecs = questionNumbers.map((number) => ({ number, kind: 'text' }));
  const lookup = (practiceId) => practiceId === 'welearn-listening-part-1-001'
    ? { identity: { contentVersion: 'v1' }, questionNumbers, responseSpecs, score: () => scoreResult }
    : null;
  const request = (body, contentType = 'application/json') => new Request('https://example.test/api/practica/ielts/listening/score', {
    method: 'POST',
    headers: { 'content-type': contentType },
    body: JSON.stringify(body),
  });

  const unknown = await createIeltsListeningScoreResponse(request({
    practiceId: 'unknown', contentVersion: 'v1', responses,
  }), lookup);
  assert.equal(unknown.status, 404);
  assert.deepEqual(await unknown.json(), { code: 'unknown_practice' });
  assert.equal(unknown.headers.get('cache-control'), 'private, no-store, max-age=0');
  assert.equal(unknown.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
  assert.equal(unknown.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');

  const crossed = await createIeltsListeningScoreResponse(request({
    practiceId: 'welearn-listening-part-1-001', contentVersion: 'crossed', responses,
  }), lookup);
  assert.equal(crossed.status, 404);

  const valid = await createIeltsListeningScoreResponse(request({
    practiceId: 'welearn-listening-part-1-001', contentVersion: 'v1', responses,
  }), lookup);
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), scoreResult);

  const unsupported = await createIeltsListeningScoreResponse(request({}, 'text/plain'), lookup);
  assert.equal(unsupported.status, 415);
});

test('release approval mutations fail closed', () => {
  const release = {
    status: 'approved',
    blocker: '',
    approvedBy: 'Editorial reviewer',
    approvedAt: '2026-09-01T08:00:00.000Z',
  };
  const publicFiles = [{ path: 'part-1.tsx', contents: 'Published listening practice' }];
  const validate = (overrides = {}) => validateListeningReleaseApproval({
    release: overrides.release ?? release,
    editorialState: overrides.editorialState ?? 'published',
    publicFiles: overrides.publicFiles ?? publicFiles,
    forbiddenApprovedLabels: overrides.forbiddenApprovedLabels,
    releaseMode: true,
  });

  assert.deepEqual(validate(), []);
  assert.match(validate({ release: { ...release, approvedBy: null } }).join('\n'), /human reviewer/i);
  assert.match(validate({ release: { ...release, approvedAt: null } }).join('\n'), /approval timestamp/i);
  assert.match(validate({ editorialState: 'pilot' }).join('\n'), /editorial state/i);
  assert.match(validate({ publicFiles: [{ path: 'part-1.tsx', contents: 'Release-gated pilot' }] }).join('\n'), /pilot labels/i);
  assert.match(validate({
    publicFiles: [{ path: 'part-1.tsx', contents: 'A newly worded pilot badge' }],
    forbiddenApprovedLabels: ['Old exact label'],
  }).join('\n'), /pilot labels/i);
  const sharedSurface = [
    '// ielts-listening-release:welearn-listening-part-1-001:start',
    'Published listening practice',
    '// ielts-listening-release:welearn-listening-part-1-001:end',
    '// ielts-listening-release:welearn-listening-part-1-002:start',
    'Second practice pilot',
    '// ielts-listening-release:welearn-listening-part-1-002:end',
  ].join('\n');
  const firstBlocks = extractListeningReleaseBlocks(sharedSurface, 'welearn-listening-part-1-001');
  const secondBlocks = extractListeningReleaseBlocks(sharedSurface, 'welearn-listening-part-1-002');
  assert.equal(firstBlocks.length, 1);
  assert.match(firstBlocks[0], /Published listening practice/);
  assert.doesNotMatch(firstBlocks[0], /pilot/i);
  assert.deepEqual(validate({ publicFiles: [{ path: 'shared.tsx', contents: firstBlocks.join('\n') }] }), []);
  assert.match(validate({ publicFiles: [{ path: 'shared.tsx', contents: secondBlocks.join('\n') }] }).join('\n'), /pilot labels/i);
  assert.throws(() => assertListeningReleaseMarkerStructure(`${sharedSurface}\nielts-listening-release:welearn-listening-part-1-001:start`), /orphan.*start/i);
  assert.throws(() => assertListeningReleaseMarkerStructure(`ielts-listening-release:welearn-listening-part-1-001:end\n${sharedSurface}`), /orphan.*end/i);
  assert.throws(() => assertListeningReleaseMarkerStructure([
    'ielts-listening-release:welearn-listening-part-1-001:start',
    'ielts-listening-release:welearn-listening-part-2-001:start',
    'nested',
    'ielts-listening-release:welearn-listening-part-1-001:end',
    'ielts-listening-release:welearn-listening-part-2-001:end',
  ].join('\n')), /nested|crossed/i);
  assert.throws(() => assertListeningReleaseMarkerStructure([
    'ielts-listening-release:welearn-listening-part-1-001:start',
    'ielts-listening-release:welearn-listening-part-1-001:end',
  ].join('')), /empty.*block/i);
  assert.match(validate({ release: { ...release, status: 'pilot' }, editorialState: 'pilot' }).join('\n'), /release approval is pilot/i);
});

test('the real source is server-only and uses a dedicated original asset', () => {
  const source = fs.readFileSync(path.join(root, 'src/data/ielts/listening-part1-welearn-001.server.ts'), 'utf8');
  const registry = fs.readFileSync(path.join(root, 'src/data/ielts/listening-practice-registry.server.ts'), 'utf8');
  const route = fs.readFileSync(path.join(root, 'src/app/api/practica/ielts/listening/score/route.ts'), 'utf8');
  const scoreHandler = fs.readFileSync(path.join(root, 'src/lib/ielts/listening-score-route-contract.ts'), 'utf8');
  const releaseGate = fs.readFileSync(path.join(root, 'scripts/check-ielts-listening-release.mjs'), 'utf8');
  const sessionPage = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/listening/sesion/page.tsx'), 'utf8');
  const sessionClient = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/listening/sesion/ListeningSession.tsx'), 'utf8');
  assert.match(source, /^import 'server-only';/);
  assert.match(registry, /^import 'server-only';/);
  assert.match(registry, /new Map<string, ValidatedServerPracticeRegistration>/);
  assert.match(registry, /\['welearn-listening-part-1-001'/);
  assert.match(registry, /registration\.identity\.id !== practiceId/);
  assert.match(registry, /assertIeltsListeningRegistrationBundle/);
  assert.match(registry, /assertIeltsListeningRegistryCatalog/);
  assert.match(registry, /assertIeltsListeningScoringIdentity/);
  assert.match(releaseGate, /spawnSync\(process\.execPath/);
  assert.match(releaseGate, /check-ielts-listening-public-registry\.mjs/);
  assert.match(releaseGate, /extractListeningReleaseBlocks/);
  assert.doesNotMatch(registry, /import\s*\(|ielts-set-|data\/mocks|toefl|getMock/);
  assert.match(source, /welearn-listening-part-1-001\.mp3/);
  assert.doesNotMatch(source, /ielts-set-1|data\/mocks\/index|getMock|loadIeltsMock/);
  assert.match(scoreHandler, /Cache-Control.*private, no-store/);
  assert.match(scoreHandler, /X-Robots-Tag.*noindex, nofollow, noarchive/);
  assert.doesNotMatch(route + scoreHandler, /acceptedAnswers|transcript/);
  assert.match(route, /getIeltsListeningScorer/);
  assert.doesNotMatch(route, /getIeltsListeningPart1|listening-part1-welearn/);
  assert.doesNotMatch(route, /const CONTENT_VERSION/);
  assert.match(scoreHandler, /readBoundedJson\(request, MAX_BODY_BYTES\)/);
  assert.doesNotMatch(route + scoreHandler, /request\.json\(\)/);
  assert.match(source, /'16th'/);
  assert.match(source, /'2\.5 hours'/);
  assert.match(source, /'44 pounds'/);
  assert.match(sessionPage, /getIeltsListeningPracticeForSession/);
  assert.match(sessionPage, /getIeltsListeningPracticeIdentityForSession/);
  assert.doesNotMatch(sessionPage, /getIeltsListeningPart1|listening-part1-welearn/);
  assert.equal(
    ieltsListeningStorageKey({
      id: 'welearn-listening-part-1-001',
      contentVersion: '2026-09-01.1',
      part: 1,
    }),
    'welearn:ielts:listening:part1:welearn-listening-part-1-001:2026-09-01.1',
  );
  assert.deepEqual(ieltsListeningPublicQuestionNumbers(projectIeltsListeningPractice(fixture, '/audio.mp3')), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.match(sessionClient, /part-\$\{practice\.part\}/);
  assert.doesNotMatch(sessionClient, /Part 1 guide|Listening Practice 001|Submit 10 answers|Complete all ten/);
  assert.match(sessionClient, /switch \(group\.type\)/);
  assert.match(sessionClient, /case 'single-choice'/);
  assert.match(sessionClient, /case 'map-labelling'/);
  assert.match(sessionClient, /<fieldset/);
  assert.match(sessionClient, /<legend>/);
  assert.match(sessionClient, /type="radio"/);
  assert.match(sessionClient, /<input\s+type="radio"\s+autoComplete="off"/);
  assert.match(sessionClient, /<select/);
  assert.match(sessionClient, /<select[\s\S]{0,160}autoComplete="off"/);
  assert.match(sessionClient, /Text description of the floor plan/);
  assert.match(sessionClient, /alt=\{group\.map\.alt\}/);
  assert.doesNotMatch(sessionClient, /dangerouslySetInnerHTML|foreignObject/);
  const clientRegistryImports = listFilesRecursively(path.join(root, 'src'))
    .filter((filePath) => /\.(?:ts|tsx)$/.test(filePath))
    .filter((filePath) => fs.readFileSync(filePath, 'utf8').includes("'use client'"))
    .filter((filePath) => fs.readFileSync(filePath, 'utf8').includes('listening-practice-registry.server'));
  assert.deepEqual(clientRegistryImports, []);
});

test('indexable landings make truthful, non-cannibalizing search promises', () => {
  const listeningRoot = path.join(root, 'src/app/(site)/practica/ielts/listening');
  const hub = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/listening/page.tsx'), 'utf8');
  const partOne = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/listening/part-1/page.tsx'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const sectionAliasPages = listFilesRecursively(listeningRoot)
    .map((filePath) => path.relative(listeningRoot, filePath).split(path.sep).join('/'))
    .filter((filePath) => /^section-\d+\/page\.tsx$/.test(filePath));
  assert.match(hub, /IELTS Listening Practice with Audio: Part 1 \+ Format Guide/);
  assert.match(hub, /transcript after submission/);
  assert.doesNotMatch(hub, /Parts 1–4 with Audio/);
  assert.equal(IELTS_LISTENING_QUESTION_TYPE_ENTITIES.length, 6);
  for (const title of ['Multiple choice', 'Matching', 'Plan, map or diagram labelling', 'Form, note, table, flow-chart or summary completion', 'Sentence completion', 'Short-answer questions']) {
    assert.equal(IELTS_LISTENING_QUESTION_TYPE_ENTITIES.some((questionType) => questionType.officialName === title), true);
  }
  assert.match(hub, /IELTS_LISTENING_QUESTION_TYPE_ENTITIES\.map\(\(questionType\) =>/);
  assert.match(hub, /SCORE_GUIDE\.map\(\(row\) =>/);
  assert.match(hub, /href=\{IELTS_SCORE_URL\}/);
  assert.match(hub, /Each correct answer receives one mark/);
  assert.match(hub, /precise raw mark needed for a band can vary slightly/);
  for (const row of ["{ band: '5', averageCorrect: '16' }", "{ band: '6', averageCorrect: '23' }", "{ band: '7', averageCorrect: '30' }", "{ band: '8', averageCorrect: '35' }"]) {
    assert.match(hub, new RegExp(row.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(hub, /ielts-scoring-in-detail/);
  assert.match(hub, /A 10-question practice is not a band calculator/);
  const scoreContract = fs.readFileSync(path.join(root, 'src/lib/ielts/listening-practice-contract.ts'), 'utf8');
  const sessionClient = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/listening/sesion/ListeningSession.tsx'), 'utf8');
  assert.doesNotMatch(scoreContract, /estimatedBand|predictedBand|convertedBand|bandScore/);
  assert.doesNotMatch(sessionClient, /estimatedBand|predictedBand|convertedBand|bandScore/);
  assert.match(partOne, /const URL = 'https:\/\/www\.idiomaswl\.com\/practica\/ielts\/listening\/part-1'/);
  assert.match(partOne, /alternates: { canonical: URL }/);
  assert.match(partOne, /Is IELTS Listening Part 1 the same as Section 1\?/);
  assert.match(partOne, /keeps both names on one canonical URL/);
  assert.match(partOne, /answers, explanations and transcript after submission/);
  assert.deepEqual(sectionAliasPages, []);
  assert.doesNotMatch(sitemap, /\/practica\/ielts\/listening\/section-\d+/);
});

test('the audited audio file matches the server manifest', () => {
  const audioPath = path.join(root, 'public/audio/ielts/listening/welearn-listening-part-1-001.mp3');
  const source = fs.readFileSync(path.join(root, 'src/data/ielts/listening-part1-welearn-001.server.ts'), 'utf8');
  const generator = fs.readFileSync(path.join(root, 'scripts/generate-ielts-listening-part1-audio.mjs'), 'utf8');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/ielts-superhub/originality/welearn-listening-part-1-001.json'), 'utf8'));
  assert.equal(fs.existsSync(audioPath), true);
  assert.equal(fs.statSync(audioPath).size, 1_613_052);
  assert.equal(createHash('sha256').update(fs.readFileSync(audioPath)).digest('hex'), '1c31df90a3a64751bd7842c03f4e778584e8fdec1119f114ee6ef7308ba4cb8a');
  assert.match(source, /durationSeconds: 134\.325578/);
  assert.match(source, /1c31df90a3a64751bd7842c03f4e778584e8fdec1119f114ee6ef7308ba4cb8a/);
  assert.doesNotMatch(generator, /run\(['"]say['"]|voiceByRole|['"]Daniel['"]|['"]Karen['"]/);
  assert.equal(manifest.audio.voiceModel.datasetLicense, 'CC-BY-4.0');
  assert.equal(manifest.audio.engine.license, 'GPL-3.0-or-later');
  assert.match(manifest.audio.voiceModel.repositoryCommit, /^[a-f0-9]{40}$/);
  assert.match(manifest.audio.voiceModel.modelCard, new RegExp(manifest.audio.voiceModel.repositoryCommit));
  assert.match(manifest.audio.voiceModel.modelCardSha256, /^[a-f0-9]{64}$/);
  assert.equal(manifest.audio.voiceModel.modelCardBytes, 326);
  assert.equal(manifest.audio.rightsReview.status, 'documented-open-licence');
});
