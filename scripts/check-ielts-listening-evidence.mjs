#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import { auditListeningEvidenceArtifact, auditSet1ListeningEvidenceArtifact, sha256Bytes } from './lib/ielts-listening-audible-evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const effective = async set => {
  const authored = (await import(new URL(`../src/data/mocks/ielts-set-${set}.ts`, import.meta.url))).default;
  if (set <= 7) return withIeltsListeningLegacyReplacementTranscript(withIeltsListeningProductionTranscript(authored));
  if ([8, 10, 11, 12].includes(set)) return withIeltsListeningLegacyReplacementTranscript(authored);
  if (set >= 13) return withIeltsListeningProductionTranscript(authored);
  return authored;
};
const manifestFile = path.join(root, 'config/ielts-harness/listening-evidence/manifest.json');
const manifest = readJson(manifestFile);
const { manifestSha256, ...manifestCore } = manifest;
assert.equal(sha256Bytes(JSON.stringify(manifestCore)), manifestSha256, 'Listening evidence manifest digest is stale');
assert.deepEqual(manifest.summary, { sets: 19, questions: 760, supported: 760, unresolved: 0 });
const set1Artifact = readJson(path.join(root, 'config/ielts-harness/listening-evidence/set-1-listening-evidence.json'));
auditSet1ListeningEvidenceArtifact({ root, mock: await effective(1), artifact: set1Artifact });
for (const row of manifest.sets) {
  const artifactFile = path.join(root, row.artifactPath);
  const artifact = readJson(artifactFile);
  assert.equal(sha256Bytes(fs.readFileSync(artifactFile)), row.artifactFileSha256, `Set ${row.set}: artifact file changed`);
  assert.equal(artifact.artifactSha256, row.artifactSha256, `Set ${row.set}: artifact digest changed`);
  const academicReview = readJson(path.join(root, artifact.academicReview.path));
  auditListeningEvidenceArtifact({ root, mock: await effective(row.set), academicReview, artifact });
}
console.log(JSON.stringify({ status: 'PASS', sets: 20, questions: 800, manifestSha256 }, null, 2));
