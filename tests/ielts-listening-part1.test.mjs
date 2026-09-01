import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  ieltsListeningQuestionNumbers,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  validateIeltsListeningResponses,
} from '../src/lib/ielts/listening-practice-contract.ts';
import { readBoundedJson } from '../src/lib/http/read-bounded-json.ts';
import { validateListeningReleaseApproval } from '../scripts/lib/ielts-listening-release-approval.mjs';

const root = process.cwd();
const fixture = {
  id: 'welearn-listening-part-1-test',
  contentVersion: 'test-v1',
  title: 'Original test fixture',
  scenario: 'A booking conversation.',
  instructions: 'Listen and answer.',
  transcript: 'Private transcript with every answer.',
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-1-test.mp3',
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

function forbiddenPaths(value, pathName = '$') {
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => {
    const childPath = `${pathName}.${key}`;
    return [
      ...(['answer', 'answers', 'acceptedAnswers', 'transcript'].includes(key) ? [childPath] : []),
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
  assert.deepEqual(ieltsListeningQuestionNumbers(fixture), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('scores on the server contract without returning a band or accepted values', () => {
  const responses = Object.fromEntries(Array.from({ length: 10 }, (_, index) => [String(index + 1), `VALUE-${index + 1}`]));
  const result = scoreIeltsListeningPractice(fixture, responses);
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.equal('band' in result, false);
  assert.equal(result.transcript, fixture.transcript);
  assert.deepEqual(forbiddenPaths(result).filter((entry) => !entry.endsWith('.transcript')), []);

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
  assert.equal(validateIeltsListeningResponses(complete, ieltsListeningQuestionNumbers(fixture)), true);
  assert.equal(validateIeltsListeningResponses({ ...complete, 11: 'extra' }, ieltsListeningQuestionNumbers(fixture)), false);
  assert.equal(validateIeltsListeningResponses({ ...complete, 5: '' }, ieltsListeningQuestionNumbers(fixture)), false);
  assert.equal(validateIeltsListeningResponses({ ...complete, 5: 'x'.repeat(81) }, ieltsListeningQuestionNumbers(fixture)), false);
});

test('fails closed on structural and private-answer mutations', () => {
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
  assert.throws(() => projectIeltsListeningPractice(duplicateId, '/audio.mp3'), /duplicate group/i);

  const placeholder = structuredClone(fixture);
  placeholder.groups[0].template = '{{1}} {{2}} {{3}} {{4}} {{5}} {{5}}';
  assert.throws(() => projectIeltsListeningPractice(placeholder, '/audio.mp3'), /placeholders/i);

  const emptyAcceptedAnswers = structuredClone(fixture);
  emptyAcceptedAnswers.groups[0].blanks[0].acceptedAnswers = [];
  assert.throws(() => projectIeltsListeningPractice(emptyAcceptedAnswers, '/audio.mp3'), /model response/i);

  const invalidWordLimit = structuredClone(fixture);
  invalidWordLimit.groups[0].blanks[0].maxWords = 0;
  assert.throws(() => projectIeltsListeningPractice(invalidWordLimit, '/audio.mp3'), /model response/i);

  const unevenTable = structuredClone(fixture);
  unevenTable.groups[1].rows[0].push({ type: 'text', text: 'Unexpected third cell' });
  assert.throws(() => projectIeltsListeningPractice(unevenTable, '/audio.mp3'), /table rows/i);
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
    releaseMode: true,
  });

  assert.deepEqual(validate(), []);
  assert.match(validate({ release: { ...release, approvedBy: null } }).join('\n'), /human reviewer/i);
  assert.match(validate({ release: { ...release, approvedAt: null } }).join('\n'), /approval timestamp/i);
  assert.match(validate({ editorialState: 'pilot' }).join('\n'), /editorial state/i);
  assert.match(validate({ publicFiles: [{ path: 'part-1.tsx', contents: 'Release-gated pilot' }] }).join('\n'), /pilot labels/i);
  assert.match(validate({ release: { ...release, status: 'pilot' }, editorialState: 'pilot' }).join('\n'), /release approval is pilot/i);
});

test('the real source is server-only and uses a dedicated original asset', () => {
  const source = fs.readFileSync(path.join(root, 'src/data/ielts/listening-part1-welearn-001.server.ts'), 'utf8');
  const route = fs.readFileSync(path.join(root, 'src/app/api/practica/ielts/listening/score/route.ts'), 'utf8');
  assert.match(source, /^import 'server-only';/);
  assert.match(source, /welearn-listening-part-1-001\.mp3/);
  assert.doesNotMatch(source, /ielts-set-1|data\/mocks\/index|getMock|loadIeltsMock/);
  assert.match(route, /Cache-Control.*private, no-store/);
  assert.match(route, /X-Robots-Tag.*noindex, nofollow, noarchive/);
  assert.doesNotMatch(route, /acceptedAnswers|transcript/);
  assert.match(route, /getIeltsListeningPart1Identity/);
  assert.doesNotMatch(route, /const CONTENT_VERSION/);
  assert.match(route, /readBoundedJson\(request, MAX_BODY_BYTES\)/);
  assert.doesNotMatch(route, /request\.json\(\)/);
  assert.match(source, /'16th'/);
  assert.match(source, /'2\.5 hours'/);
  assert.match(source, /'44 pounds'/);
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
