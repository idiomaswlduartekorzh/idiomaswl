import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { auditIeltsListeningPrivateCandidates } from '../scripts/lib/ielts-listening-private-candidate-readiness.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ZERO_SHA256 = '0'.repeat(64);

function privateFixtureTranscript(part) {
  return {
    2: 'Visitors follow the western corridor from the repair desk before locating separate rooms for tools textiles testing and refreshments.',
    3: 'Music students compare two rehearsal recordings before discussing how timing and balance changed during the second ensemble performance.',
    4: 'Textile researchers photograph fabric samples under controlled lighting before comparing how fibre clusters form detach and remain visible.',
  }[part];
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function candidateArtifacts(part, number = '001') {
  const practiceId = `welearn-listening-part-${part}-${number}`;
  const frame = Buffer.alloc(417);
  Buffer.from([0xff, 0xfb, 0x90, 0xc0]).copy(frame);
  frame.write(practiceId, 64);
  return {
    audio: Buffer.concat([frame, frame]),
    asr: Buffer.from(JSON.stringify({ text: privateFixtureTranscript(part), language: 'en',
      segments: [{ start: 0, end: 0.05, text: privateFixtureTranscript(part) }] })),
    map: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><title>Private ${practiceId} map</title><desc>Three lettered areas.</desc><rect data-option-key="A"/><rect data-option-key="B"/><rect data-option-key="C"/></svg>`),
  };
}

function writeFixture(root, relativePath, value) {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, value);
  return absolutePath;
}

function sourceModule(part, number = '001') {
  const practiceId = `welearn-listening-part-${part}-${number}`;
  const start = ((part - 1) * 10) + 1;
  const end = part * 10;
  const questions = Array.from({ length: 10 }, (_, index) => {
    const questionNumber = start + index;
    const answerKey = ['A', 'B', 'C'][index % 3];
    return `        {
          number: ${questionNumber},
          prompt: 'Private fixture prompt ${questionNumber}',
          options: [
            { key: 'A', label: 'First option' },
            { key: 'B', label: 'Second option' },
            { key: 'C', label: 'Third option' },
          ],
          correctOptionKey: '${answerKey}',
          expected: '${answerKey}',
          explanation: 'PRIVATE SECRET ANSWER ${questionNumber}',
        }`;
  }).join(',\n');
  return `import 'server-only';

import { resolveAudioUrl } from '@/lib/examAudio';
import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  type IeltsListeningPracticeSource,
} from '@/lib/ielts/listening-practice-contract';

const SOURCE: IeltsListeningPracticeSource = {
  id: '${practiceId}',
  contentVersion: '2026-09-01.draft.1',
  part: ${part},
  practiceNumber: ${Number(number)},
  title: 'PRIVATE SECRET TITLE',
  scenario: 'Private fixture scenario.',
  instructions: 'Answer Questions ${start}–${end}.',
  transcript: \`${privateFixtureTranscript(part)}\`,
  audio: {
    localPath: '/audio/ielts/listening/${practiceId}.mp3',
    durationSeconds: 0,
    sha256: '${ZERO_SHA256}',
  },
  groups: [
    {
      type: 'single-choice',
      id: 'private-fixture-group',
      questionRange: [${start}, ${end}],
      instruction: 'Select one option.',
      questions: [
${questions}
      ],
    },
  ],
};

export function getIeltsListeningPart${part}Practice() {
  const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;
  return projectIeltsListeningPractice(SOURCE, resolved);
}

export function getIeltsListeningPart${part}Identity() {
  return {
    id: SOURCE.id,
    contentVersion: SOURCE.contentVersion,
    part: SOURCE.part,
    practiceNumber: SOURCE.practiceNumber,
  } as const;
}

export function getIeltsListeningPart${part}QuestionNumbers() {
  return ieltsListeningQuestionNumbers(SOURCE);
}

export function getIeltsListeningPart${part}ResponseSpecs() {
  return ieltsListeningResponseSpecs(SOURCE);
}

export function scoreIeltsListeningPart${part}Practice(responses: Readonly<Record<string, string>>) {
  return scoreIeltsListeningPractice(SOURCE, responses);
}

export function scoreIeltsListeningPart${part}Registration(responses: Readonly<Record<string, string>>) {
  return {
    identity: getIeltsListeningPart${part}Identity(),
    result: scoreIeltsListeningPart${part}Practice(responses),
  } as const;
}
`;
}

function manifest(part, number = '001') {
  const practiceId = `welearn-listening-part-${part}-${number}`;
  const artifacts = candidateArtifacts(part, number);
  return {
    schemaVersion: 1,
    practiceId,
    contentVersion: '2026-09-01.draft.1',
    audio: {
      candidatePath: `docs/ielts-superhub/candidates/${practiceId}/${practiceId}.mp3`,
      bytes: artifacts.audio.length,
      sha256: sha256(artifacts.audio),
      durationSeconds: 2304 / 44100,
      channels: 1,
      sampleRateHz: 44100,
      targetBitRate: 128000,
    },
    automatedAsrAudit: {
      path: `docs/ielts-superhub/candidates/${practiceId}/asr/${practiceId}.json`,
      bytes: artifacts.asr.length,
      sha256: sha256(artifacts.asr),
      inputAudioSha256: sha256(artifacts.audio),
      language: 'en',
    },
    release: {
      status: 'draft',
      blockers: ['PRIVATE SECRET HUMAN BLOCKER'],
      approvedBy: null,
      approvedAt: null,
    },
  };
}

function installFixtureMap(root) {
  const sourcePath = path.join(root, 'src/data/ielts/listening-part2-welearn-001.server.ts');
  fs.writeFileSync(sourcePath, fs.readFileSync(sourcePath, 'utf8').replace(
    "type: 'single-choice',", "type: 'map-labelling',\n      map: { width: 100, height: 60, areaKeys: ['A', 'B', 'C'] },",
  ));
  const manifestPath = path.join(root, 'docs/ielts-superhub/originality/welearn-listening-part-2-001.json');
  const declaration = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const buffer = candidateArtifacts(2).map;
  declaration.map = {
    candidatePath: 'docs/ielts-superhub/candidates/welearn-listening-part-2-001/welearn-listening-part-2-001-map.svg',
    bytes: buffer.length,
    sha256: sha256(buffer),
    width: 100,
    height: 60,
    areaKeys: ['A', 'B', 'C'],
  };
  fs.writeFileSync(manifestPath, JSON.stringify(declaration));
  writeFixture(root, declaration.map.candidatePath, buffer);
  return { manifestPath, declaration };
}

function replaceArtifactWithUpdatedHash(root, part, role, value) {
  const manifestPath = path.join(root, `docs/ielts-superhub/originality/welearn-listening-part-${part}-001.json`);
  const declaration = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const metadata = declaration[role];
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  writeFixture(root, metadata.candidatePath ?? metadata.path, buffer);
  metadata.bytes = buffer.length;
  metadata.sha256 = sha256(buffer);
  if (role === 'audio') declaration.automatedAsrAudit.inputAudioSha256 = metadata.sha256;
  fs.writeFileSync(manifestPath, JSON.stringify(declaration));
}

function createPrivateCandidateFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-private-readiness-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'public'), { recursive: true });
  for (const part of [2, 3, 4]) {
    const practiceId = `welearn-listening-part-${part}-001`;
    const artifacts = candidateArtifacts(part);
    writeFixture(
      root,
      `src/data/ielts/listening-part${part}-welearn-001.server.ts`,
      sourceModule(part),
    );
    writeFixture(
      root,
      `docs/ielts-superhub/originality/${practiceId}.json`,
      `${JSON.stringify(manifest(part), null, 2)}\n`,
    );
    writeFixture(
      root,
      `docs/ielts-superhub/candidates/${practiceId}/${practiceId}.mp3`,
      artifacts.audio,
    );
    writeFixture(
      root,
      `docs/ielts-superhub/candidates/${practiceId}/asr/${practiceId}.json`,
      artifacts.asr,
    );
  }
  return root;
}

function assertFailure(report, code) {
  assert.equal(report.integrity, 'BLOCK');
  assert.equal(report.machineReadiness, 'BLOCKED');
  assert.equal(report.publicationDecision, 'BLOCK');
  assert.equal(report.failures.some((failure) => failure.code === code), true, code);
}

test('real Parts 2–4 discover one private source, manifest and candidate directory each', () => {
  const report = auditIeltsListeningPrivateCandidates({ root: repositoryRoot });

  assert.equal(report.integrity, 'PASS');
  assert.equal(report.machineReadiness, 'BLOCKED');
  assert.equal(report.publicationDecision, 'BLOCK');
  assert.deepEqual(
    report.candidates.map(({ practiceId, part }) => [practiceId, part]),
    [
      ['welearn-listening-part-2-001', 2],
      ['welearn-listening-part-3-001', 3],
      ['welearn-listening-part-4-001', 4],
    ],
  );
  assert.deepEqual(report.failures, []);
  assert.deepEqual(
    report.machineIssues.map(({ code, practiceId }) => [code, practiceId]),
    [
      ['ASR_INPUT_AUDIO_SHA256_MISSING', 'welearn-listening-part-2-001'],
      ['ASR_INPUT_AUDIO_SHA256_MISSING', 'welearn-listening-part-3-001'],
    ],
  );
});

test('AST values defeat audio placeholder comments used as decoys', (t) => {
  const root = createPrivateCandidateFixture(t);
  const sourcePath = path.join(root, 'src/data/ielts/listening-part2-welearn-001.server.ts');
  const mutated = fs.readFileSync(sourcePath, 'utf8')
    .replace('durationSeconds: 0,', 'durationSeconds: 231,\n    // durationSeconds: 0,')
    .replace(
      `sha256: '${ZERO_SHA256}',`,
      `sha256: '${'a'.repeat(64)}',\n    // sha256: '${ZERO_SHA256}',`,
    );
  fs.writeFileSync(sourcePath, mutated);

  assertFailure(
    auditIeltsListeningPrivateCandidates({ root }),
    'SOURCE_AUDIO_NOT_PRIVATE_PLACEHOLDER',
  );
});

test('AST identity, exact ranges and canonical source adapters fail closed', (t) => {
  const identityRoot = createPrivateCandidateFixture(t);
  const identityPath = path.join(identityRoot, 'src/data/ielts/listening-part2-welearn-001.server.ts');
  fs.writeFileSync(
    identityPath,
    fs.readFileSync(identityPath, 'utf8').replace('practiceNumber: 1,', 'practiceNumber: 2,'),
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: identityRoot }),
    'SOURCE_IDENTITY_MISMATCH',
  );

  const rangeRoot = createPrivateCandidateFixture(t);
  const rangePath = path.join(rangeRoot, 'src/data/ielts/listening-part2-welearn-001.server.ts');
  fs.writeFileSync(
    rangePath,
    fs.readFileSync(rangePath, 'utf8').replace('questionRange: [11, 20],', 'questionRange: [11, 19],'),
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: rangeRoot }),
    'SOURCE_QUESTION_RANGE_MISMATCH',
  );

  const adapterRoot = createPrivateCandidateFixture(t);
  const adapterPath = path.join(adapterRoot, 'src/data/ielts/listening-part2-welearn-001.server.ts');
  fs.writeFileSync(
    adapterPath,
    fs.readFileSync(adapterPath, 'utf8').replace(
      'return ieltsListeningQuestionNumbers(SOURCE);',
      'return ieltsListeningQuestionNumbers({ ...SOURCE });',
    ),
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: adapterRoot }),
    'SOURCE_AST_INVALID',
  );
});

test('orphaned manifests and duplicate source identities fail discovery cardinality', (t) => {
  const orphanRoot = createPrivateCandidateFixture(t);
  fs.rmSync(path.join(
    orphanRoot,
    'docs/ielts-superhub/originality/welearn-listening-part-3-001.json',
  ));
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: orphanRoot }),
    'PRIVATE_CANDIDATE_MANIFEST_CARDINALITY',
  );

  const duplicateRoot = createPrivateCandidateFixture(t);
  writeFixture(
    duplicateRoot,
    'src/data/ielts/listening-part2-welearn-999.server.ts',
    sourceModule(2),
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: duplicateRoot }),
    'PRIVATE_CANDIDATE_SOURCE_CARDINALITY',
  );
});

test('any private candidate module or ID reference elsewhere in src is blocked', (t) => {
  const root = createPrivateCandidateFixture(t);
  writeFixture(
    root,
    'src/app/api/neutral/route.ts',
    "export { scoreIeltsListeningPart3Practice } from '@/data/ielts/listening-part3-welearn-001.server';\n",
  );

  assertFailure(
    auditIeltsListeningPrivateCandidates({ root }),
    'PRIVATE_CANDIDATE_REFERENCE_IN_SRC',
  );
});

test('Unicode-escaped module references and fonetica files cannot hide private candidates', (t) => {
  const escapedRoot = createPrivateCandidateFixture(t);
  writeFixture(
    escapedRoot,
    'src/lib/neutral.ts',
    String.raw`export * from '@/data/ielts/listening-part3-welearn-\u003001.server';`,
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: escapedRoot }),
    'PRIVATE_CANDIDATE_REFERENCE_IN_SRC',
  );

  const foneticaRoot = createPrivateCandidateFixture(t);
  writeFixture(
    foneticaRoot,
    'src/data/fonetica/private-dictionary.txt',
    'welearn-listening-part-2-001',
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: foneticaRoot }),
    'PRIVATE_CANDIDATE_REFERENCE_IN_SRC',
  );
});

test('neutral src and public files cannot expose transcript fragments or the answer bank', (t) => {
  const transcriptRoot = createPrivateCandidateFixture(t);
  const transcriptFragment = privateFixtureTranscript(3).split(' ').slice(0, 12).join(' ');
  writeFixture(
    transcriptRoot,
    'src/lib/neutral-copy.ts',
    `export const neutralCopy = '${transcriptFragment}';\n`,
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: transcriptRoot }),
    'PRIVATE_TRANSCRIPT_FRAGMENT_IN_SRC',
  );

  const answerRoot = createPrivateCandidateFixture(t);
  writeFixture(
    answerRoot,
    'public/content/neutral.txt',
    'A B C A B C A B C A',
  );
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: answerRoot }),
    'PRIVATE_ANSWER_BANK_IN_PUBLIC',
  );
});

test('a byte-identical candidate artifact is blocked anywhere under public', (t) => {
  const root = createPrivateCandidateFixture(t);
  const candidateAudio = fs.readFileSync(path.join(
    root,
    'docs/ielts-superhub/candidates/welearn-listening-part-4-001/welearn-listening-part-4-001.mp3',
  ));
  writeFixture(root, 'public/assets/neutral.bin', candidateAudio);

  assertFailure(
    auditIeltsListeningPrivateCandidates({ root }),
    'PRIVATE_CANDIDATE_ARTIFACT_COPIED_TO_PUBLIC',
  );
});

test('artifact roles, map presence, bytes, checksums and ASR audio ownership fail closed', (t) => {
  const aliasRoot = createPrivateCandidateFixture(t);
  const aliasManifestPath = path.join(
    aliasRoot,
    'docs/ielts-superhub/originality/welearn-listening-part-3-001.json',
  );
  const aliasManifest = JSON.parse(fs.readFileSync(aliasManifestPath, 'utf8'));
  aliasManifest.automatedAsrAudit.path = aliasManifest.audio.candidatePath;
  fs.writeFileSync(aliasManifestPath, `${JSON.stringify(aliasManifest, null, 2)}\n`);
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: aliasRoot }),
    'CANDIDATE_ARTIFACT_ROLE_ALIAS',
  );

  const evidenceRoot = createPrivateCandidateFixture(t);
  const evidenceManifestPath = path.join(
    evidenceRoot,
    'docs/ielts-superhub/originality/welearn-listening-part-4-001.json',
  );
  const evidenceManifest = JSON.parse(fs.readFileSync(evidenceManifestPath, 'utf8'));
  evidenceManifest.automatedAsrAudit.bytes += 1;
  evidenceManifest.automatedAsrAudit.sha256 = 'f'.repeat(64);
  evidenceManifest.automatedAsrAudit.inputAudioSha256 = 'e'.repeat(64);
  fs.writeFileSync(evidenceManifestPath, `${JSON.stringify(evidenceManifest, null, 2)}\n`);
  const evidenceReport = auditIeltsListeningPrivateCandidates({ root: evidenceRoot });
  assertFailure(evidenceReport, 'CANDIDATE_ARTIFACT_BYTES_MISMATCH');
  assertFailure(evidenceReport, 'CANDIDATE_ARTIFACT_SHA256_MISMATCH');
  assertFailure(evidenceReport, 'ASR_INPUT_AUDIO_SHA256_MISMATCH');

  const mapRoot = createPrivateCandidateFixture(t);
  const { manifestPath: mapManifestPath, declaration: mapManifest } = installFixtureMap(mapRoot);
  assert.equal(auditIeltsListeningPrivateCandidates({ root: mapRoot }).integrity, 'PASS');
  delete mapManifest.map;
  fs.writeFileSync(mapManifestPath, `${JSON.stringify(mapManifest, null, 2)}\n`);
  fs.rmSync(path.join(
    mapRoot,
    'docs/ielts-superhub/candidates/welearn-listening-part-2-001/welearn-listening-part-2-001-map.svg',
  ));
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: mapRoot }),
    'CANDIDATE_MAP_REQUIRED',
  );
});

test('valid synthetic MPEG, ASR and SVG fixtures pass without publication approval', (t) => {
  const root = createPrivateCandidateFixture(t);
  installFixtureMap(root);
  replaceArtifactWithUpdatedHash(root, 4, 'automatedAsrAudit', JSON.stringify({
    text: 'First phrase. Second phrase.', language: 'en', segments: [
      { start: 0, end: 0.025000000000000002, text: 'First phrase.' },
      { start: 0.025, end: 0.05, text: 'Second phrase.' },
    ],
  }));
  const report = auditIeltsListeningPrivateCandidates({ root });
  assert.equal(report.integrity, 'PASS', JSON.stringify(report.failures));
  assert.equal(report.machineReadiness, 'READY');
  assert.equal(report.publicationDecision, 'BLOCK');
});

test('fake MP3 and invalid metadata cannot be blessed by updating the checksum', (t) => {
  const root = createPrivateCandidateFixture(t);
  replaceArtifactWithUpdatedHash(root, 4, 'audio', 'not MPEG audio');
  assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'CANDIDATE_AUDIO_FORMAT_INVALID');

  const metadataRoot = createPrivateCandidateFixture(t);
  const manifestPath = path.join(metadataRoot, 'docs/ielts-superhub/originality/welearn-listening-part-3-001.json');
  const declaration = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  declaration.audio.durationSeconds += 1;
  declaration.audio.channels = 2;
  declaration.audio.targetBitRate = 96000;
  fs.writeFileSync(manifestPath, JSON.stringify(declaration));
  assertFailure(auditIeltsListeningPrivateCandidates({ root: metadataRoot }), 'CANDIDATE_AUDIO_METADATA_MISMATCH');
});

test('malformed ASR objects and segments fail even with exact bytes and SHA', (t) => {
  const invalidValues = ['not JSON', '[]', '{}', JSON.stringify({ text: 'Some text', language: 'es', segments: [] }),
    JSON.stringify({ text: 'Some text', language: 'en', segments: [{ start: 5, end: 1, text: 'Some text' }] })];
  for (const value of invalidValues) {
    const root = createPrivateCandidateFixture(t);
    replaceArtifactWithUpdatedHash(root, 3, 'automatedAsrAudit', value);
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'CANDIDATE_ASR_FORMAT_INVALID');
  }
});

test('unsafe SVG, dimensions and area keys fail even with updated checksums', (t) => {
  const validSvg = candidateArtifacts(2).map.toString('utf8');
  for (const svg of [
    '<svg/>',
    validSvg.replace('</desc>', '</title>'),
    validSvg.replace('<desc>', '<script>alert(1)</script><desc>'),
    validSvg.replace('<rect ', '<rect onload="alert(1)" '),
    validSvg.replace('<rect ', '<rect href="https://example.test/private" '),
    validSvg.replace('<desc>', '<style>@import "https://example.test/private";</style><desc>'),
    validSvg.replace('<desc>', '<style>.x {fill:url(https://example.test/private);}</style><desc>'),
  ]) {
    const root = createPrivateCandidateFixture(t);
    installFixtureMap(root);
    replaceArtifactWithUpdatedHash(root, 2, 'map', svg);
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'CANDIDATE_MAP_FORMAT_INVALID');
  }
  for (const svg of [validSvg.replace('100 60', '101 60'), validSvg.replace('data-option-key="C"', 'data-option-key="A"')]) {
    const root = createPrivateCandidateFixture(t);
    installFixtureMap(root);
    replaceArtifactWithUpdatedHash(root, 2, 'map', svg);
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'CANDIDATE_MAP_METADATA_MISMATCH');
  }
  const sourceRoot = createPrivateCandidateFixture(t);
  installFixtureMap(sourceRoot);
  const sourcePath = path.join(sourceRoot, 'src/data/ielts/listening-part2-welearn-001.server.ts');
  fs.writeFileSync(sourcePath, fs.readFileSync(sourcePath, 'utf8').replace('width: 100, height: 60', 'width: 101, height: 60'));
  assertFailure(auditIeltsListeningPrivateCandidates({ root: sourceRoot }), 'CANDIDATE_MAP_METADATA_MISMATCH');
});

test('artifact symlinks and symlink parents cannot escape the canonical candidate root', (t) => {
  for (const target of ['welearn-listening-part-4-001.mp3', 'asr']) {
    const root = createPrivateCandidateFixture(t);
    const candidateRoot = path.join(root, 'docs/ielts-superhub/candidates/welearn-listening-part-4-001');
    const original = path.join(candidateRoot, target);
    const outside = path.join(root, `outside-${target}`);
    fs.renameSync(original, outside);
    fs.symlinkSync(outside, original);
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'CANDIDATE_PATH_SYMLINK');
  }
  const root = createPrivateCandidateFixture(t);
  const candidateBase = path.join(root, 'docs/ielts-superhub/candidates');
  const outside = path.join(root, 'outside-candidates');
  fs.renameSync(candidateBase, outside);
  fs.symlinkSync(outside, candidateBase);
  assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'CANDIDATE_PATH_SYMLINK');
});

test('candidate-looking directory names are validated before entry type', (t) => {
  for (const kind of ['file', 'symlink']) {
    for (const suffix of ['', '-backup']) {
      const root = createPrivateCandidateFixture(t);
      const candidateBase = path.join(root, 'docs/ielts-superhub/candidates');
      const original = path.join(candidateBase, 'welearn-listening-part-3-001');
      const outside = path.join(root, 'private-outside');
      fs.renameSync(original, outside);
      if (kind === 'file') fs.writeFileSync(`${original}${suffix}`, 'PRIVATE SECRET');
      else fs.symlinkSync(outside, `${original}${suffix}`);
      assertFailure(auditIeltsListeningPrivateCandidates({ root }), suffix
        ? 'CANDIDATE_DIRECTORY_NAME_INVALID' : 'CANDIDATE_DIRECTORY_TYPE_INVALID');
    }
  }
});

test('numbered answer keys are detected in neutral public and src content', (t) => {
  const answers = ['surface', 'friction', 'ball', 'attached', 'detach', 'strength', 'contrast', 'lighting', 'procedure', 'balance'];
  for (const relativePath of ['public/neutral.txt', 'src/lib/neutral.txt']) {
    const root = createPrivateCandidateFixture(t);
    const sourcePath = path.join(root, 'src/data/ielts/listening-part4-welearn-001.server.ts');
    let index = 0;
    fs.writeFileSync(sourcePath, fs.readFileSync(sourcePath, 'utf8').replace(/expected: '[ABC]'/g, () => `expected: '${answers[index++]}'`));
    writeFixture(root, relativePath, answers.map((answer, offset) => `${31 + offset}: ${answer}`).join('\n'));
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), relativePath.startsWith('public')
      ? 'PRIVATE_ANSWER_BANK_IN_PUBLIC' : 'PRIVATE_ANSWER_BANK_IN_SRC');
  }
});

test('TypeScript AST resolves escaped and line-continuation specifiers for all import forms', (t) => {
  const specifier = "@/data/ielts/listening-part3-welearn-00\\\n1.server";
  for (const statement of [
    `import { anything } from '${specifier}';`,
    `export * from '${specifier}';`,
    `const candidate = import('${specifier}');`,
    `const candidate = require('${specifier}');`,
    `import candidate = require('${specifier}');`,
  ]) {
    const root = createPrivateCandidateFixture(t);
    writeFixture(root, 'src/lib/neutral.ts', statement);
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'PRIVATE_CANDIDATE_REFERENCE_IN_SRC');
  }
});

test('extensionless, webmanifest, VTT, YAML and misleading binary suffixes cannot expose transcript text', (t) => {
  for (const suffix of ['', '.webmanifest', '.vtt', '.yaml', '.bin']) {
    const root = createPrivateCandidateFixture(t);
    writeFixture(root, `public/transcript${suffix}`, privateFixtureTranscript(4));
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'PRIVATE_TRANSCRIPT_FRAGMENT_IN_PUBLIC');
  }
});

test('known public text extensions cannot hide behind NUL or invalid UTF-8 prefixes', (t) => {
  for (const prefix of [Buffer.from([0]), Buffer.from([0xff, 0xfe, 0xff])]) {
    const root = createPrivateCandidateFixture(t);
    writeFixture(root, 'public/neutral.html', Buffer.concat([
      prefix, Buffer.from(`<html><body>${privateFixtureTranscript(4)}</body></html>`),
    ]));
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), 'PRIVATE_TRANSCRIPT_FRAGMENT_IN_PUBLIC');
  }
  const utf16Root = createPrivateCandidateFixture(t);
  writeFixture(utf16Root, 'public/neutral.txt', Buffer.concat([
    Buffer.from([0xff, 0xfe]), Buffer.from(privateFixtureTranscript(4), 'utf16le'),
  ]));
  assertFailure(auditIeltsListeningPrivateCandidates({ root: utf16Root }), 'PRIVATE_TRANSCRIPT_FRAGMENT_IN_PUBLIC');
});

test('source and manifest files or their parents cannot depend on external symlinks', (t) => {
  const targets = [
    ['src/data/ielts/listening-part3-welearn-001.server.ts', 'SOURCE_PATH_SYMLINK'],
    ['src/data/ielts', 'SOURCE_PATH_SYMLINK'],
    ['src/data', 'SOURCE_PATH_SYMLINK'],
    ['docs/ielts-superhub/originality/welearn-listening-part-3-001.json', 'MANIFEST_PATH_SYMLINK'],
    ['docs/ielts-superhub/originality', 'MANIFEST_PATH_SYMLINK'],
    ['docs/ielts-superhub', 'MANIFEST_PATH_SYMLINK'],
  ];
  for (const [relativePath, code] of targets) {
    const root = createPrivateCandidateFixture(t);
    const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-readiness-external-'));
    t.after(() => fs.rmSync(externalRoot, { recursive: true, force: true }));
    const original = path.join(root, relativePath);
    const external = path.join(externalRoot, 'external-source');
    fs.renameSync(original, external);
    fs.symlinkSync(external, original);
    assertFailure(auditIeltsListeningPrivateCandidates({ root }), code);
  }
});

test('manifest-controlled paths never enter reports and candidate backup directories block', (t) => {
  const pathRoot = createPrivateCandidateFixture(t);
  const manifestPath = path.join(
    pathRoot,
    'docs/ielts-superhub/originality/welearn-listening-part-2-001.json',
  );
  const mutatedManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  mutatedManifest.audio.candidatePath = 'PRIVATE SECRET CANDIDATE PATH/answer-bank.mp3';
  fs.writeFileSync(manifestPath, `${JSON.stringify(mutatedManifest, null, 2)}\n`);
  const pathReport = auditIeltsListeningPrivateCandidates({ root: pathRoot });
  assertFailure(pathReport, 'CANDIDATE_ARTIFACT_PATH_NONCANONICAL');
  assert.doesNotMatch(JSON.stringify(pathReport), /PRIVATE SECRET CANDIDATE PATH|answer-bank/);

  const backupRoot = createPrivateCandidateFixture(t);
  fs.mkdirSync(path.join(
    backupRoot,
    'docs/ielts-superhub/candidates/welearn-listening-part-3-001-backup',
  ));
  assertFailure(
    auditIeltsListeningPrivateCandidates({ root: backupRoot }),
    'CANDIDATE_DIRECTORY_NAME_INVALID',
  );
});

test('the report is serializable and never contains private source, answer or manifest text', (t) => {
  const root = createPrivateCandidateFixture(t);
  writeFixture(
    root,
    'src/app/api/leak/route.ts',
    "import '@/data/ielts/listening-part4-welearn-001.server';\n",
  );
  const serialized = JSON.stringify(auditIeltsListeningPrivateCandidates({ root }));

  assert.doesNotMatch(serialized, /PRIVATE SECRET/);
  assert.doesNotMatch(serialized, /correctOptionKey|expected|explanation|PRIVATE SECRET HUMAN BLOCKER/i);
  assert.doesNotThrow(() => JSON.parse(serialized));
});
