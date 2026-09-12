import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import set1 from '../src/data/mocks/ielts-set-1.ts';
import set13 from '../src/data/mocks/ielts-set-13.ts';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import { auditListeningEvidenceArtifact, auditSet1ListeningEvidenceArtifact, sha256Bytes } from '../scripts/lib/ielts-listening-audible-evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

test('the listening evidence manifest contains 760 supported question units', () => {
  const manifest = readJson(path.join(root, 'config/ielts-harness/listening-evidence/manifest.json'));
  const { manifestSha256, ...core } = manifest;
  assert.equal(sha256Bytes(JSON.stringify(core)), manifestSha256);
  assert.deepEqual(manifest.sets.map(row => row.set), Array.from({ length: 19 }, (_, index) => index + 2));
  assert.deepEqual(manifest.summary, { sets: 19, questions: 760, supported: 760, unresolved: 0 });
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

test('Set 1 owner-approved evidence is hash-bound and covers all 40 audible answers', () => {
  const artifact = readJson(path.join(root, 'config/ielts-harness/listening-evidence/set-1-listening-evidence.json'));
  const effectiveSet1 = withIeltsListeningLegacyReplacementTranscript(withIeltsListeningProductionTranscript(set1));
  assert.deepEqual(auditSet1ListeningEvidenceArtifact({ root, mock: effectiveSet1, artifact }),
    { set: 1, status: 'PASS', questions: 40 });
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
  const { artifactSha256: _old, ...core } = timeDrift;
  timeDrift.artifactSha256 = sha256Bytes(JSON.stringify(core));
  assert.throws(() => auditListeningEvidenceArtifact({ root, mock, academicReview, artifact: timeDrift }), /exact segment timecode/u);
});
