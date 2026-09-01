import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { validateListeningReleaseApproval } from './lib/ielts-listening-release-approval.mjs';
import { extractListeningReleaseBlocks } from './lib/ielts-listening-release-scope.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseMode = process.argv.includes('--release');
const manifestPath = path.join(repoRoot, 'docs/ielts-superhub/originality/welearn-listening-part-1-001.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const harnessConfig = JSON.parse(fs.readFileSync(path.join(repoRoot, 'config/ielts-superhub-harness.json'), 'utf8'));
const failures = [];

const publicRegistryResult = spawnSync(process.execPath, [
  path.join(repoRoot, 'scripts/check-ielts-listening-public-registry.mjs'),
  ...(releaseMode ? ['--release'] : []),
], {
  cwd: repoRoot,
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});
if (publicRegistryResult.stdout) process.stdout.write(publicRegistryResult.stdout);
if (publicRegistryResult.stderr) process.stderr.write(publicRegistryResult.stderr);
if (publicRegistryResult.status !== 0) failures.push('The scalable IELTS Listening public registry gate failed.');

const audioPath = path.join(repoRoot, manifest.audio.path);
if (!fs.existsSync(audioPath)) {
  failures.push(`Missing original audio: ${manifest.audio.path}`);
} else {
  const buffer = fs.readFileSync(audioPath);
  const sha256 = createHash('sha256').update(buffer).digest('hex');
  if (buffer.length !== manifest.audio.bytes) failures.push(`Audio size drift: ${buffer.length} != ${manifest.audio.bytes}.`);
  if (sha256 !== manifest.audio.sha256) failures.push(`Audio checksum drift: ${sha256} != ${manifest.audio.sha256}.`);
}

for (const relativePath of [
  'src/app/(site)/practica/ielts/listening/page.tsx',
  'src/app/(site)/practica/ielts/listening/part-1/page.tsx',
  'src/app/(site)/practica/ielts/listening/sesion/page.tsx',
  'src/app/api/practica/ielts/listening/score/route.ts',
  'src/data/ielts/listening-practice-registry.server.ts',
  'src/data/ielts/listening-part1-welearn-001.server.ts',
]) {
  if (!fs.existsSync(path.join(repoRoot, relativePath))) failures.push(`Missing release path: ${relativePath}.`);
}

const source = fs.readFileSync(path.join(repoRoot, 'src/data/ielts/listening-part1-welearn-001.server.ts'), 'utf8');
const registry = fs.readFileSync(path.join(repoRoot, 'src/data/ielts/listening-practice-registry.server.ts'), 'utf8');
const generator = fs.readFileSync(path.join(repoRoot, manifest.audio.generator), 'utf8');
const attributionRelativePath = manifest.audio.rightsReview?.attributionLocation;
const attributionPath = attributionRelativePath ? path.join(repoRoot, attributionRelativePath) : null;
const attributionPage = attributionPath && fs.existsSync(attributionPath)
  ? fs.readFileSync(attributionPath, 'utf8')
  : '';
if (!source.startsWith("import 'server-only';")) failures.push('The scoring source lost its server-only boundary.');
if (!registry.startsWith("import 'server-only';")) failures.push('The practice registry lost its server-only boundary.');
if (/ielts-set-\d+|data\/mocks\/index|getMock|loadIeltsMock/.test(source)) failures.push('The original practice imports the legacy mock bank.');
if (/import\s*\(|ielts-set-\d+|data\/mocks\/index|getMock|loadIeltsMock|toefl/i.test(registry)) {
  failures.push('The practice registry uses a dynamic or forbidden assessment source.');
}
if (!source.includes(`contentVersion: '${manifest.contentVersion}'`)) {
  failures.push(`Source contentVersion does not match manifest version ${manifest.contentVersion}.`);
}
if (!source.includes(`sha256: '${manifest.audio.sha256}'`)) {
  failures.push('Source audio checksum does not match the originality manifest.');
}
if (manifest.ownership.borrowedQuestions || manifest.ownership.borrowedTranscript || manifest.ownership.borrowedAudio) {
  failures.push('The originality manifest declares borrowed assessment material.');
}
if (manifest.audio.rightsReview?.status !== 'documented-open-licence') {
  failures.push('The audio has no documented open-licence rights review.');
}
if (manifest.audio.voiceModel?.datasetLicense !== 'CC-BY-4.0' || !manifest.audio.voiceModel?.modelCard) {
  failures.push('The voice model is missing its CC BY 4.0 model-card evidence.');
}
if (
  manifest.audio.engine?.license !== 'GPL-3.0-or-later'
  || !/^[a-f0-9]{40}$/.test(manifest.audio.voiceModel?.repositoryCommit ?? '')
  || !manifest.audio.voiceModel?.modelCard.includes(manifest.audio.voiceModel.repositoryCommit)
  || !/^[a-f0-9]{64}$/.test(manifest.audio.voiceModel?.modelCardSha256 ?? '')
  || !Number.isInteger(manifest.audio.voiceModel?.modelCardBytes)
  || manifest.audio.voiceModel.modelCardBytes <= 0
) {
  failures.push('The Piper engine SPDX or commit-pinned model-card evidence is incomplete.');
}
if (/run\(['"]say['"]|voiceByRole|['"]Daniel['"]|['"]Karen['"]/.test(generator)) {
  failures.push('The audio generator still references restricted macOS system voices.');
}
if (!attributionPage) failures.push('The public voice-model attribution page is missing.');
if (!attributionPage.includes(manifest.audio.voiceModel.modelCard) || !attributionPage.includes(manifest.audio.voiceModel.licenseUrl)) {
  failures.push('The public Part 1 page is missing the required voice-model attribution links.');
}

const publicReleaseFiles = [
  'src/app/(site)/practica/ielts/IELTSHubClient.tsx',
  'src/app/(site)/practica/ielts/listening/page.tsx',
  'src/app/(site)/practica/ielts/listening/part-1/page.tsx',
].map((relativePath) => ({
  path: relativePath,
  contents: extractListeningReleaseBlocks(
    fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'),
    manifest.practiceId,
  ).join('\n'),
}));
for (const publicFile of publicReleaseFiles) {
  if (!publicFile.contents) failures.push(`Legacy release surface has no scoped marker: ${publicFile.path}.`);
}
failures.push(...validateListeningReleaseApproval({
  release: manifest.release,
  editorialState: harnessConfig.editorialState?.['original-listening-part-1'],
  publicFiles: publicReleaseFiles,
  releaseMode,
}));

if (failures.length) {
  console.error(`IELTS Listening Part 1 ${releaseMode ? 'release' : 'candidate'} gate: BLOCK`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`IELTS Listening Part 1 ${releaseMode ? 'release' : 'candidate'} gate: PASS`);
  console.log(`- ${manifest.practiceId} · ${manifest.audio.durationSeconds}s · ${manifest.audio.sha256.slice(0, 12)}…`);
}
