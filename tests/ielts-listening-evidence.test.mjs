import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import set1 from '../src/data/mocks/ielts-set-1.ts';
import set2 from '../src/data/mocks/ielts-set-2.ts';
import set4 from '../src/data/mocks/ielts-set-4.ts';
import set13 from '../src/data/mocks/ielts-set-13.ts';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import { asrSegments, auditListeningEvidenceArtifact, auditSet1ListeningEvidenceArtifact, exactAsrSlice, sha256Bytes } from '../scripts/lib/ielts-listening-audible-evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

test('the listening evidence manifest records all 760 independently reviewed question units', () => {
  const manifest = readJson(path.join(root, 'config/ielts-harness/listening-evidence/manifest.json'));
  const { manifestSha256, ...core } = manifest;
  assert.equal(sha256Bytes(JSON.stringify(core)), manifestSha256);
  assert.deepEqual(manifest.sets.map(row => row.set), Array.from({ length: 19 }, (_, index) => index + 2));
  assert.equal(manifest.status, 'PASS');
  assert.deepEqual(manifest.summary, { sets: 19, questions: 760, supported: 760, unresolved: 0 });
  assert.equal(manifest.sets.find(row => row.set === 4)?.status, 'PASS');
  assert.equal(manifest.sets.filter(row => row.status === 'PASS').length, 19);
  for (const row of manifest.sets) {
    const file = path.join(root, row.artifactPath);
    assert.equal(sha256Bytes(fs.readFileSync(file)), row.artifactFileSha256);
  }
});

test('a full artifact is bound to audio, transcript, academic review and ASR', () => {
  const artifact = readJson(path.join(root, 'config/ielts-harness/listening-evidence/set-13-listening-evidence.json'));
  const academicReview = readJson(path.join(root, artifact.academicReview.path));
  assert.deepEqual(auditListeningEvidenceArtifact({ root, mock: withIeltsListeningProductionTranscript(set13), academicReview, artifact }),
    { set: 13, status: 'PASS', questions: 40 });
});

test('Set 1 remediation is hash-bound, exact and independently reviewed', () => {
  const artifact = readJson(path.join(root, 'config/ielts-harness/listening-evidence/set-1-listening-evidence.json'));
  const effectiveSet1 = withIeltsListeningLegacyReplacementTranscript(withIeltsListeningProductionTranscript(set1));
  assert.deepEqual(auditSet1ListeningEvidenceArtifact({ root, mock: effectiveSet1, artifact }),
    { set: 1, status: 'PASS', questions: 40 });
  const { artifactSha256, ...core } = artifact;
  assert.equal(sha256Bytes(JSON.stringify(core)), artifactSha256);
  assert.deepEqual(artifact.summary, { questions: 40, supported: 40, unresolved: 0 });
  const source = readJson(path.join(root, artifact.asr.globalSourcePath));
  const segments = asrSegments(source);
  const q11 = artifact.evidence.find(row => row.question === 11);
  const q12 = artifact.evidence.find(row => row.question === 12);
  for (const row of [q11, q12]) {
    assert.equal(row.reviewStatus, 'APPROVED');
    assert.equal(row.method, 'EXACT_ASR_SLICE');
    assert.equal(exactAsrSlice(segments, row.startSeconds, row.endSeconds), row.audiblePhrase);
  }
  assert.deepEqual([q11.startSeconds, q11.endSeconds, q12.startSeconds, q12.endSeconds], [411.98, 423.52, 381.28, 393.08]);
});

test('Set 4 repaired Part 3 evidence is exact and independently reviewed', () => {
  const artifact = readJson(path.join(root, 'config/ielts-harness/listening-evidence/set-4-listening-evidence.json'));
  const academicReview = readJson(path.join(root, artifact.academicReview.path));
  const effectiveSet4 = withIeltsListeningProductionTranscript(set4);
  assert.deepEqual(auditListeningEvidenceArtifact({ root, mock: effectiveSet4, academicReview, artifact }),
    { set: 4, status: 'PASS', questions: 40 });
  const { artifactSha256, ...core } = artifact;
  assert.equal(sha256Bytes(JSON.stringify(core)), artifactSha256);
  assert.deepEqual(artifact.summary, { questions: 40, supported: 40, unresolved: 0 });
  const source = readJson(path.join(root, artifact.asr.globalSourcePath));
  const segments = asrSegments(source);
  const repaired = artifact.evidence.filter(row => row.question >= 28 && row.question <= 30);
  assert.deepEqual(repaired.map(row => [row.question, row.responseKey, row.part]), [[28, 'l3q28', 3], [29, 'l3q29', 3], [30, 'l3q30', 3]]);
  for (const row of repaired) {
    assert.equal(row.reviewStatus, 'APPROVED');
    assert.equal(row.method, 'EXACT_ASR_SLICE');
    assert.equal(exactAsrSlice(segments, row.startSeconds, row.endSeconds), row.audiblePhrase);
  }
});

test('Set 2 Q21 has one defensible keyed change and four natural options', () => {
  const effectiveSet2 = withIeltsListeningProductionTranscript(set2);
  const question = effectiveSet2.sections
    .find(section => section.skill === 'listening' && section.part === 3)
    ?.questions.find(item => item.id === 'l3q21');
  assert.deepEqual(question, {
    type: 'mcq',
    id: 'l3q21',
    part: 3,
    text: 'What change does Sarah propose to strengthen the wind energy discussion?',
    options: [
      'Replace the solar-power discussion.',
      'Add real-world case studies.',
      'Shorten the section substantially.',
      'Move the section into the conclusion.',
    ],
    answer: 1,
  });
});

test('remediated Listening rows cannot retain stale academic provenance or nested artifact hashes', () => {
  const targets = new Map([
    [2, [21, 23, 24]],
    [13, [13]],
    [17, [22, 26]],
    [19, [21, 23]],
  ]);
  for (const [setNumber, questions] of targets) {
    const academicPath = path.join(root, `config/ielts-harness/academic-reviews/set-${setNumber}-objective-review.json`);
    const audiblePath = path.join(root, `config/ielts-harness/listening-evidence/set-${setNumber}-listening-evidence.json`);
    const consolidatedPath = path.join(root, `config/ielts-harness/evidence/set-${setNumber}.json`);
    const academicReview = readJson(academicPath);
    const audible = readJson(audiblePath);
    const consolidated = readJson(consolidatedPath);
    assert.equal(consolidated.listening.machineAlignment.evidenceSha256, sha256Bytes(fs.readFileSync(audiblePath)));
    for (const question of questions) {
      const academic = academicReview.evidence.find(row => row.skill === 'listening' && row.question === question);
      const evidence = audible.evidence.find(row => row.question === question);
      assert.ok(academic, `Set ${setNumber} Q${question}: academic row missing`);
      assert.ok(evidence, `Set ${setNumber} Q${question}: audible row missing`);
      assert.equal(evidence.academicEvidenceSha256, sha256Bytes(JSON.stringify(academic)));
      assert.equal(evidence.academicExcerptSha256, academic.sourceExcerptSha256);
      assert.equal(academic.sourceExcerptSha256, sha256Bytes(academic.sourceExcerpt));
      assert.equal(evidence.reviewStatus, 'APPROVED');
      assert.notEqual(evidence.reviewer?.id, 'codex-listening-evidence-q1-q40');
    }
  }
});

test('content and evidence mutations fail closed', () => {
  const artifact = readJson(path.join(root, 'config/ielts-harness/listening-evidence/set-13-listening-evidence.json'));
  const academicReview = readJson(path.join(root, artifact.academicReview.path));
  const mock = withIeltsListeningProductionTranscript(set13);
  const transcriptDrift = structuredClone(mock);
  transcriptDrift.sections.find(section => section.skill === 'listening').transcript += ' drift';
  assert.throws(() => auditListeningEvidenceArtifact({ root, mock: transcriptDrift, academicReview, artifact }));
  const evidenceDrift = structuredClone(artifact);
  evidenceDrift.evidence[0].audiblePhrase += ' drift';
  assert.throws(() => auditListeningEvidenceArtifact({ root, mock, academicReview, artifact: evidenceDrift }), /digest is stale/u);
  const timeDrift = structuredClone(artifact);
  timeDrift.evidence[0].startSeconds += 0.01;
  const core = { ...timeDrift };
  delete core.artifactSha256;
  timeDrift.artifactSha256 = sha256Bytes(JSON.stringify(core));
  assert.throws(() => auditListeningEvidenceArtifact({ root, mock, academicReview, artifact: timeDrift }), /exact segment timecode/u);
});
