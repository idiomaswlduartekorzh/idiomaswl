import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { validateListeningReleaseApproval } from './lib/ielts-listening-release-approval.mjs';
import { extractListeningReleaseBlocks } from './lib/ielts-listening-release-scope.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseMode = process.argv.includes('--release');
const failures = [];
const candidates = [];
const declaredAudioPaths = new Set();
const declaredManifestPaths = new Set();
const declaredSourcePaths = new Set();

function resolveRepoPath(relativePath, label) {
  if (typeof relativePath !== 'string' || !relativePath.trim() || path.isAbsolute(relativePath)) {
    failures.push(`${label} must be a non-empty repository-relative path.`);
    return null;
  }
  const resolved = path.resolve(repoRoot, relativePath);
  if (!resolved.startsWith(`${repoRoot}${path.sep}`)) {
    failures.push(`${label} escapes the repository: ${relativePath}.`);
    return null;
  }
  return resolved;
}

function readRequiredText(relativePath, label) {
  const resolved = resolveRepoPath(relativePath, label);
  if (!resolved || !fs.existsSync(resolved)) {
    failures.push(`Missing ${label}: ${relativePath ?? 'undefined'}.`);
    return '';
  }
  return fs.readFileSync(resolved, 'utf8');
}

function readRequiredJson(relativePath, label) {
  const contents = readRequiredText(relativePath, label);
  if (!contents) return null;
  try {
    return JSON.parse(contents);
  } catch {
    failures.push(`Invalid JSON in ${label}: ${relativePath}.`);
    return null;
  }
}

const catalog = readRequiredJson('config/ielts-listening-practices.json', 'IELTS Listening public catalog');
const harnessConfig = readRequiredJson('config/ielts-superhub-harness.json', 'IELTS superhub harness config');
const registry = readRequiredText(
  'src/data/ielts/listening-practice-registry.server.ts',
  'IELTS Listening practice registry',
);

if (catalog?.schemaVersion !== 1 || !Array.isArray(catalog?.practices) || !catalog.practices.length) {
  failures.push('IELTS Listening public catalog must contain at least one schema v1 practice.');
}
if (!registry.startsWith("import 'server-only';")) failures.push('The practice registry lost its server-only boundary.');
if (/import\s*\(|ielts-set-\d+|data\/mocks\/index|getMock|loadIeltsMock|toefl/i.test(registry)) {
  failures.push('The practice registry uses a dynamic or forbidden assessment source.');
}
if (
  !registry.includes('assertIeltsListeningRegistrationBundle')
  || !registry.includes('assertIeltsListeningRegistryCatalog')
  || !registry.includes('assertIeltsListeningScoringIdentity')
) {
  failures.push('The practice registry no longer reconciles adapters and the public release catalog.');
}

const registeredIds = [...registry.matchAll(/\['(welearn-listening-part-[1-4]-\d{3,})',\s*\{/g)]
  .map((match) => match[1]);
const catalogIds = Array.isArray(catalog?.practices)
  ? catalog.practices.map((practice) => practice?.practiceId).filter((id) => typeof id === 'string')
  : [];
const sitemap = readRequiredText('src/app/sitemap.ts', 'application sitemap');
if (
  new Set(registeredIds).size !== registeredIds.length
  || new Set(catalogIds).size !== catalogIds.length
  || registeredIds.length !== catalogIds.length
  || registeredIds.some((id) => !catalogIds.includes(id))
) {
  failures.push('The runtime registry and public release catalog are not one-to-one.');
}

for (const practice of Array.isArray(catalog?.practices) ? catalog.practices : []) {
  const practiceId = practice?.practiceId ?? 'unknown-practice';
  if (practice?.publication !== 'public') {
    failures.push(`Runtime catalog practice ${practiceId} must be public; drafts cannot enter the runtime registry.`);
  }
  if (![1, 2, 3, 4].includes(practice?.part) || !Number.isInteger(practice?.practiceNumber) || practice.practiceNumber <= 0) {
    failures.push(`Catalog identity is invalid for ${practiceId}.`);
  }
  const expectedId = `welearn-listening-part-${practice?.part}-${String(practice?.practiceNumber).padStart(3, '0')}`;
  if (practiceId !== expectedId) failures.push(`Catalog practice ID must be ${expectedId}.`);
  if (practice?.guideRoute !== `/practica/ielts/listening/part-${practice?.part}`) {
    failures.push(`Guide route is invalid for ${practiceId}.`);
  }
  const expectedGuidePath = `src/app/(site)/practica/ielts/listening/part-${practice?.part}/page.tsx`;
  if (practice?.guidePath !== expectedGuidePath) failures.push(`Guide path must be ${expectedGuidePath} for ${practiceId}.`);
  const expectedManifestPath = `docs/ielts-superhub/originality/${practiceId}.json`;
  if (practice?.manifestPath !== expectedManifestPath) failures.push(`Manifest path must be ${expectedManifestPath}.`);
  const expectedSessionRoute = `/practica/ielts/listening/sesion?practice=${practiceId}&part=${practice?.part}`;
  if (practice?.sessionRoute !== expectedSessionRoute) failures.push(`Session route is invalid for ${practiceId}.`);

  const manifest = readRequiredJson(practice?.manifestPath, `originality manifest for ${practiceId}`);
  const source = readRequiredText(practice?.sourcePath, `server source for ${practiceId}`);
  const guide = readRequiredText(practice?.guidePath, `guide page for ${practiceId}`);
  if (!manifest) continue;
  for (const [declaredPath, paths, label] of [
    [practice.manifestPath, declaredManifestPaths, 'manifest'],
    [practice.sourcePath, declaredSourcePaths, 'source'],
  ]) {
    if (paths.has(declaredPath)) failures.push(`Duplicate ${label} path in public catalog: ${declaredPath}.`);
    paths.add(declaredPath);
  }
  const sourceImport = typeof practice?.sourcePath === 'string' && practice.sourcePath.startsWith('src/')
    ? `@/${practice.sourcePath.slice(4).replace(/\.ts$/, '')}`
    : '';
  if (!sourceImport || !registry.includes(`from '${sourceImport}'`)) {
    failures.push(`Runtime registry does not statically import the catalog source for ${practiceId}.`);
  }
  if (manifest.practiceId !== practiceId || manifest.contentVersion !== practice?.contentVersion) {
    failures.push(`Catalog and manifest identity mismatch for ${practiceId}.`);
  }
  if (!source.startsWith("import 'server-only';")) failures.push(`The scoring source lost its server-only boundary for ${practiceId}.`);
  if (/ielts-set-\d+|data\/mocks\/index|getMock|loadIeltsMock|toefl/i.test(source)) {
    failures.push(`The source for ${practiceId} imports a forbidden assessment bank.`);
  }
  if (!source.includes(`id: '${practiceId}'`) || !source.includes(`contentVersion: '${manifest.contentVersion}'`)) {
    failures.push(`Source identity does not match the public catalog for ${practiceId}.`);
  }
  if (!source.includes(`part: ${practice.part}`) || !source.includes(`practiceNumber: ${practice.practiceNumber}`)) {
    failures.push(`Source part/practice number does not match the public catalog for ${practiceId}.`);
  }

  const expectedAudioPath = `public/audio/ielts/listening/${practiceId}.mp3`;
  if (manifest.audio?.path !== expectedAudioPath) failures.push(`Audio path must be ${expectedAudioPath}.`);
  if (declaredAudioPaths.has(manifest.audio?.path)) failures.push(`Duplicate audio path in public catalog: ${manifest.audio?.path}.`);
  declaredAudioPaths.add(manifest.audio?.path);
  const audioPath = resolveRepoPath(manifest.audio?.path, `audio path for ${practiceId}`);
  if (!audioPath || !fs.existsSync(audioPath)) {
    failures.push(`Missing original audio for ${practiceId}: ${manifest.audio?.path ?? 'undefined'}.`);
  } else {
    const buffer = fs.readFileSync(audioPath);
    const sha256 = createHash('sha256').update(buffer).digest('hex');
    if (buffer.length !== manifest.audio?.bytes) failures.push(`Audio size drift for ${practiceId}: ${buffer.length} != ${manifest.audio?.bytes}.`);
    if (sha256 !== manifest.audio?.sha256) failures.push(`Audio checksum drift for ${practiceId}: ${sha256} != ${manifest.audio?.sha256}.`);
  }

  const generator = readRequiredText(manifest.audio?.generator, `audio generator for ${practiceId}`);
  const renderer = readRequiredText(manifest.audio?.renderer, `audio renderer for ${practiceId}`);
  if (!generator || !renderer) failures.push(`Audio generation chain is incomplete for ${practiceId}.`);
  if (generator && /run\(['"]say['"]|voiceByRole|['"]Daniel['"]|['"]Karen['"]/.test(generator)) {
    failures.push(`The audio generator for ${practiceId} references restricted macOS system voices.`);
  }
  const expectedSourceAudioPath = expectedAudioPath.replace(/^public/, '');
  if (!source.includes(`localPath: '${expectedSourceAudioPath}'`)) failures.push(`Source audio path does not match the manifest for ${practiceId}.`);
  if (!source.includes(`sha256: '${manifest.audio?.sha256}'`)) failures.push(`Source audio checksum does not match the manifest for ${practiceId}.`);
  if (manifest.ownership?.borrowedQuestions || manifest.ownership?.borrowedTranscript || manifest.ownership?.borrowedAudio) {
    failures.push(`The originality manifest declares borrowed assessment material for ${practiceId}.`);
  }
  if (manifest.audio?.rightsReview?.status !== 'documented-open-licence') {
    failures.push(`The audio has no documented open-licence rights review for ${practiceId}.`);
  }
  if (manifest.audio?.voiceModel?.datasetLicense !== 'CC-BY-4.0' || !manifest.audio?.voiceModel?.modelCard) {
    failures.push(`The voice model is missing its CC BY 4.0 model-card evidence for ${practiceId}.`);
  }
  if (
    manifest.audio?.engine?.license !== 'GPL-3.0-or-later'
    || !/^[a-f0-9]{40}$/.test(manifest.audio?.voiceModel?.repositoryCommit ?? '')
    || !manifest.audio?.voiceModel?.modelCard?.includes(manifest.audio?.voiceModel?.repositoryCommit)
    || !/^[a-f0-9]{64}$/.test(manifest.audio?.voiceModel?.modelCardSha256 ?? '')
    || !Number.isInteger(manifest.audio?.voiceModel?.modelCardBytes)
    || manifest.audio.voiceModel.modelCardBytes <= 0
  ) {
    failures.push(`The Piper engine SPDX or commit-pinned model-card evidence is incomplete for ${practiceId}.`);
  }

  const attributionRelativePath = manifest.audio?.rightsReview?.attributionLocation;
  const attributionPage = readRequiredText(attributionRelativePath, `public attribution page for ${practiceId}`);
  if (attributionRelativePath !== practice?.guidePath) {
    failures.push(`Manifest attribution location and catalog guide differ for ${practiceId}.`);
  }
  if (
    !attributionPage.includes(manifest.audio?.voiceModel?.modelCard ?? '__missing_model_card__')
    || !attributionPage.includes(manifest.audio?.voiceModel?.licenseUrl ?? '__missing_license_url__')
  ) {
    failures.push(`The public guide is missing required voice-model attribution links for ${practiceId}.`);
  }
  if (!guide.includes(practiceId)) failures.push(`The public guide does not link its registered practice ${practiceId}.`);
  if (!sitemap.includes(practice.guideRoute)) failures.push(`The sitemap is missing the guide route for ${practiceId}.`);

  const publicFiles = Array.isArray(practice?.publicSurfacePaths)
    ? practice.publicSurfacePaths.map((relativePath) => {
      const contents = readRequiredText(relativePath, `public release surface for ${practiceId}`);
      const releaseBlocks = extractListeningReleaseBlocks(contents, practiceId);
      if (!releaseBlocks.length) {
        failures.push(`Public release surface ${relativePath} has no scoped marker for ${practiceId}.`);
      }
      return { path: relativePath, contents: releaseBlocks.join('\n') };
    })
    : [];
  if (!publicFiles.length) failures.push(`No public release surfaces are declared for ${practiceId}.`);
  if (!practice?.publicSurfacePaths?.includes(practice?.guidePath)) {
    failures.push(`Public release surfaces do not contain the guide for ${practiceId}.`);
  }
  failures.push(...validateListeningReleaseApproval({
    release: manifest.release,
    editorialState: harnessConfig?.editorialState?.[practice?.editorialStateKey],
    publicFiles,
    forbiddenApprovedLabels: practice?.forbiddenApprovedLabels,
    releaseMode,
  }).map((failure) => `${practiceId}: ${failure}`));

  candidates.push({
    practiceId,
    durationSeconds: manifest.audio?.durationSeconds,
    sha256: manifest.audio?.sha256 ?? '',
  });
}

if (failures.length) {
  console.error(`IELTS Listening public registry ${releaseMode ? 'release' : 'candidate'} gate: BLOCK`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`IELTS Listening public registry ${releaseMode ? 'release' : 'candidate'} gate: PASS`);
  for (const candidate of candidates) {
    console.log(`- ${candidate.practiceId} · ${candidate.durationSeconds}s · ${candidate.sha256.slice(0, 12)}…`);
  }
}
