#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  evaluateSet, evidenceScaffold, hasCurrentFinalApproval, hydrateRegistry, INDEPENDENT_LISTENING_REVIEW_METHOD,
  requiresIndependentListeningReview, verifyTechnicalAudioEvidence,
} from './lib/ielts-harness-core.mjs';
import { loadVerifiedIeltsAudioPublications } from './lib/ielts-audio-publication.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const hash = value => createHash('sha256').update(value).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const fileSha = file => hash(fs.readFileSync(file));
const relative = file => path.relative(root, file);
const reviewedAt = '2026-09-12';
const evidenceDirectory = path.join(root, 'config/ielts-harness/evidence');
const pendingFiles = new Map();
function stageJson(file, document) {
  if (fs.existsSync(file) && isDeepStrictEqual(readJson(file), document)) return;
  pendingFiles.set(file, JSON.stringify(document, null, 2) + '\n');
}

function loadInventory(includeMedia = false) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-evidence-'));
  const inventoryFile = path.join(temporary, 'materials.json');
  const args = ['--experimental-strip-types', '--no-warnings', path.join(root, 'scripts/audit-ielts-materials.mjs'),
    `--output=${inventoryFile}`];
  if (includeMedia) args.push('--media=true');
  try {
    execFileSync(process.execPath, args, { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return readJson(inventoryFile);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}
const inventory = loadInventory();
assert.equal(inventory.sets.length, 20);
const baseRegistryFile = path.join(root, 'config/ielts-harness/evidence-registry.json');
const registryDocument = readJson(baseRegistryFile);
const baseRegistry = hydrateRegistry({ ...registryDocument, sets: registryDocument.sets.map(record => {
  const canonical = `config/ielts-harness/evidence/set-${record.set}.json`;
  if (requiresIndependentListeningReview(record.set) && record.evidencePath === canonical
    && !fs.existsSync(path.join(root, canonical))) return { ...record, evidencePath: undefined };
  return record;
}) }, root);
const baseBySet = new Map(baseRegistry.sets.map(row => [row.set, row]));
const writingFile = path.join(root, 'config/ielts-harness/writing-task1-visual-review.json');
const speakingFile = path.join(root, 'config/ielts-harness/speaking-semantic-review.json');
const writingReview = readJson(writingFile);
const speakingReview = readJson(speakingFile);
const coverageBySet = new Map(inventory.sets.map(material => {
  const base = baseBySet.get(material.set);
  const { coverage } = evaluateSet(material, base, root);
  return [material.set, coverage];
}));

const technicalBySet = new Map();
const listeningToRebuild = inventory.sets.filter(material =>
  !requiresIndependentListeningReview(material.set) && !coverageBySet.get(material.set).listening);
for (const material of listeningToRebuild) {
  const receipt = baseBySet.get(material.set).listening?.technicalQa;
  const audioSha256 = material.audio[0].sha256;
  if (receipt?.status === 'PASS' && receipt.audioSha256 === audioSha256
    && verifyTechnicalAudioEvidence(root, receipt, audioSha256)) {
    technicalBySet.set(material.set, receipt);
  }
}
if (technicalBySet.size < listeningToRebuild.length) {
  const publications = loadVerifiedIeltsAudioPublications(root).publicationBySet;
  const technicalCore = {
    schemaVersion: 1,
    status: 'PASS',
    reviewedAt,
    reviewer: { kind: 'qa-agent', id: 'codex-media-integrity-audit' },
    releaseAuthorized: false,
    sets: loadInventory(true).sets.map(material => {
      const audio = material.audio[0];
      const publication = publications.get(material.set);
      const checks = {
        publicFileExists: audio.exists === true,
        decodePassed: audio.decode === 'PASS',
        exactlyOneAudioStream: audio.streams?.length === 1,
        plausibleExamDuration: audio.seconds >= 20 * 60 && audio.seconds <= 35 * 60,
        nontrivialFileSize: audio.bytes >= 1_000_000,
        publishedHashMatches: publication?.audioSha256 === audio.sha256,
      };
      assert.ok(Object.values(checks).every(Boolean), `Set ${material.set}: technical audio verification failed`);
      return { set: material.set, status: 'PASS', audioUrl: audio.url, audioSha256: audio.sha256,
        bytes: audio.bytes, seconds: audio.seconds, streams: audio.streams, probe: audio.probe, checks };
    }),
  };
  const report = { ...technicalCore, reportSha256: hash(JSON.stringify(technicalCore)) };
  // Existing dossiers can continue to verify their original technical report.
  const file = path.join(root, `config/ielts-harness/audio-technical-verification-${report.reportSha256}.json`);
  stageJson(file, report);
  const evidenceSha256 = hash(JSON.stringify(report, null, 2) + '\n');
  for (const row of report.sets) {
    if (!technicalBySet.has(row.set)) technicalBySet.set(row.set, { status: 'PASS', audioSha256: row.audioSha256,
      evidencePath: relative(file), evidenceSha256 });
  }
}

function academicReadingQuestions(review) {
  return review.evidence.filter(entry => entry.skill === 'reading').flatMap(entry =>
    Array.from({ length: entry.points }, (_, unitIndex) => ({
      question: entry.question + unitIndex,
      responseKey: entry.responseKey,
      responseKind: entry.kind,
      passagePart: entry.sourcePart - 4,
      paragraph: `Reviewed passage ${entry.sourcePart - 4}`,
      sourceExcerpt: entry.sourceExcerpt,
      rationale: entry.rationale,
      status: 'APPROVED',
      reviewer: review.reviewer,
      reviewedAt: review.reviewedAt,
    })));
}

function pendingListeningReason(set, listening, currentBinding) {
  if (!listening) return 'LISTENING_DOSSIER_MISSING';
  if (!isDeepStrictEqual(listening.binding, currentBinding)) return 'LISTENING_MATERIAL_CHANGED';
  const alignment = listening.machineAlignment;
  if (alignment?.method !== INDEPENDENT_LISTENING_REVIEW_METHOD) return 'INDEPENDENT_METHOD_MISSING';
  const canonical = `config/ielts-harness/listening-evidence/set-${set}-listening-evidence.json`;
  if (alignment.evidencePath === canonical) {
    const file = path.join(root, canonical);
    if (!fs.existsSync(file)) return 'INDEPENDENT_PACKAGE_MISSING';
    if (fileSha(file) !== alignment.evidenceSha256) return 'INDEPENDENT_PACKAGE_HASH_CHANGED';
  }
  return 'INDEPENDENT_REVIEW_OR_AUDIO_QA_INCOMPLETE';
}

const dossiers = [];
const pendingIndependentListening = [];
for (const material of inventory.sets) {
  const set = material.set;
  const scaffold = evidenceScaffold(material);
  const base = baseBySet.get(set);
  const valid = coverageBySet.get(set);
  const hasIndependentListening = requiresIndependentListeningReview(set);
  if (hasIndependentListening) {
    const currentBinding = scaffold.listening.binding;
    if (base.listening) scaffold.listening = base.listening;
    if (!valid.listening || base.listening?.machineAlignment?.method !== INDEPENDENT_LISTENING_REVIEW_METHOD) {
      if (valid.listening) scaffold.listening = { ...base.listening,
        machineAlignment: { ...base.listening.machineAlignment, status: 'PENDING' } };
      pendingIndependentListening.push({ set, reason: pendingListeningReason(set, base.listening, currentBinding) });
    }
  } else if (valid.listening) {
    scaffold.listening = base.listening;
  } else {
    const listeningFile = path.join(root, `config/ielts-harness/listening-evidence/set-${set}-listening-evidence.json`);
    const artifact = readJson(listeningFile);
    const audioSha256 = material.audio[0].sha256;
    assert.equal(artifact.status, 'PASS', `Set ${set}: unapproved Listening artifact`);
    assert.equal(artifact.set, set);
    assert.equal(artifact.audio.sha256, audioSha256);
    assert.equal(artifact.transcript.harnessTranscriptSha256, material.listeningTranscriptSha256);
    assert.deepEqual(artifact.summary, { questions: 40, supported: 40, unresolved: 0 });
    scaffold.listening.technicalQa = technicalBySet.get(set);
    scaffold.listening.machineAlignment = { status: 'PASS', method: 'Q1_Q40_AUDIBLE_EVIDENCE',
      audioSha256, transcriptSha256: material.listeningTranscriptSha256,
      evidencePath: relative(listeningFile), evidenceSha256: fileSha(listeningFile) };
    scaffold.listening.questions = artifact.evidence.map(item => ({
      question: item.question, responseKey: item.responseKey, part: item.part,
      startSeconds: item.startSeconds, endSeconds: item.endSeconds, audiblePhrase: item.audiblePhrase,
      rationale: item.rationale, status: 'APPROVED', reviewer: { kind: 'qa-agent', id: 'codex-listening-evidence-q1-q40' }, reviewedAt,
    }));
  }

  if (valid.reading) scaffold.reading = base.reading;
  if (valid.objectiveKey) scaffold.objectiveKey = base.objectiveKey;
  if (!hasIndependentListening && (!valid.reading || !valid.objectiveKey)) {
    const reviewFile = path.join(root, `config/ielts-harness/academic-reviews/set-${set}-objective-review.json`);
    const review = readJson(reviewFile);
    assert.equal(review.binding.objectiveSha256, material.objectiveSha256, `Set ${set}: stale objective review`);
    if (!valid.reading) scaffold.reading.questions = academicReadingQuestions(review);
    if (!valid.objectiveKey) scaffold.objectiveKey = { status: 'APPROVED', objectiveSha256: material.objectiveSha256,
      evidencePath: relative(reviewFile), evidenceSha256: fileSha(reviewFile), reviewer: review.reviewer,
      reviewedAt: review.reviewedAt };
  }

  if (valid.writing) {
    scaffold.writing = base.writing;
  } else if (!hasIndependentListening) {
    const writing = writingReview.sets.find(row => row.set === set);
    scaffold.writing.tasks = [
      { task: 1, checks: writing.task1Checks, status: 'APPROVED', reviewer: writingReview.reviewer,
        reviewedAt: writingReview.reviewedAt, notes: writing.findings.join('; ') || 'No findings.' },
      { task: 2, checks: writing.task2.checks, status: 'APPROVED', reviewer: writingReview.reviewer,
        reviewedAt: writingReview.reviewedAt, notes: 'Prompt semantics and response mode reviewed.' },
    ];
  }
  if (valid.speaking) {
    scaffold.speaking = base.speaking;
  } else if (set !== 1) {
    const speaking = speakingReview.sets.find(row => row.set === set);
    if (speaking?.semanticStatus === 'APPROVED' && speaking.speakingSha256 === material.speakingContentSha256) {
      scaffold.speaking = { status: 'APPROVED', binding: { speakingSha256: speaking.speakingSha256 },
        checks: speaking.checks, reviewer: speakingReview.reviewer, reviewedAt: speakingReview.reviewedAt,
        evidencePath: relative(speakingFile), evidenceSha256: fileSha(speakingFile) };
    }
  }

  // A material audit cannot perform a browser session or grant human release.
  const ux = base.ux;
  if (valid.ux || (ux?.status === 'PENDING' && ux.binding?.contentSha256 === material.contentSha256)) {
    scaffold.ux = ux;
  }
  const fingerprint = scaffold.generatedFrom.releaseFingerprintSha256;
  const approval = base.releaseApproval;
  if (hasCurrentFinalApproval(root, approval, set, fingerprint)
    || (approval?.status === 'PENDING' && approval.releaseFingerprintSha256 === fingerprint)) {
    scaffold.releaseApproval = approval;
  }

  const metadata = registryDocument.sets.find(row => row.set === set);
  const evidenceFile = metadata.evidencePath
    ? path.resolve(root, metadata.evidencePath)
    : path.join(evidenceDirectory, `set-${set}.json`);
  stageJson(evidenceFile, scaffold);
  if (!metadata.evidencePath) metadata.evidencePath = relative(evidenceFile);
  dossiers.push(scaffold);
}

stageJson(baseRegistryFile, registryDocument);
for (const [file, bytes] of pendingFiles) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const pending = `${file}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(pending, bytes, { flag: 'wx' });
    fs.renameSync(pending, file);
  } finally {
    fs.rmSync(pending, { force: true });
  }
}
const pendingSets = new Set(pendingIndependentListening.map(row => row.set));
console.log(JSON.stringify({ status: pendingSets.size ? 'PENDING_INDEPENDENT_LISTENING' : 'PASS',
  sets: dossiers.length, changedFiles: pendingFiles.size, pendingIndependentListening,
  listeningQuestions: dossiers.filter(item => !pendingSets.has(item.set))
    .reduce((count, item) => count + item.listening.questions.filter(row => row.status === 'APPROVED').length, 0),
  readingQuestions: dossiers.reduce((count, item) => count + item.reading.questions.filter(row => row.status === 'APPROVED').length, 0),
  writingTasks: dossiers.reduce((count, item) => count + item.writing.tasks.filter(row => row.status === 'APPROVED').length, 0),
  speakingReviews: dossiers.filter(item => item.speaking.status === 'APPROVED').length,
  uxReviews: dossiers.filter(item => item.ux.status === 'APPROVED').length,
  registry: relative(baseRegistryFile) }, null, 2));
