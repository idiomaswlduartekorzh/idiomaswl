#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expandIeltsListeningLegacyReplacement, IELTS_LISTENING_LEGACY_REPLACEMENT_SETS } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import { auditScript, buildInvoice, plannedSegments, sensitiveTokens, sha256, ttsText } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const policyPath = path.join(root, 'config/ielts-audio/production-policy.json');
const sourceManifestPath = path.join(root, 'config/ielts-audio/production-manifest.json');
const decisionPath = path.join(root, 'config/ielts-audio/legacy-audio-audit-decision.json');
const reviewPath = path.join(root, 'config/ielts-audio/legacy-audio-independent-review.json');
const outputPath = path.join(root, 'config/ielts-audio/legacy-replacement-manifest.json');
const write = process.argv.includes('--write');
for (const argument of process.argv.slice(2)) assert.equal(argument, '--write', `Unknown argument: ${argument}`);

const policy = JSON.parse(readFileSync(policyPath, 'utf8'));
const sourceManifest = JSON.parse(readFileSync(sourceManifestPath, 'utf8'));
const decision = JSON.parse(readFileSync(decisionPath, 'utf8'));
const review = JSON.parse(readFileSync(reviewPath, 'utf8'));
const targetSets = [...IELTS_LISTENING_LEGACY_REPLACEMENT_SETS].sort((a, b) => a - b);

assert.equal(decision.status, 'REPLACE_RECOMMENDED');
assert.equal(decision.productionManifestSha256, sourceManifest.manifestSha256);
assert.equal(review.productionManifestSha256, sourceManifest.manifestSha256);
assert.equal(review.conclusion, 'REPLACE_ALL_SEVEN_MASTERS');
assert.deepEqual(decision.sets.map(row => row.set), targetSets);
assert.deepEqual(Object.keys(review.audioHashes).map(Number).sort((a, b) => a - b), targetSets);

const rows = [];
for (const setNumber of targetSets) {
  const authored = (await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)).default;
  const sourceRow = sourceManifest.rows.find(row => row.set === setNumber);
  const decisionRow = decision.sets.find(row => row.set === setNumber);
  assert.ok(sourceRow && decisionRow, `Missing frozen source evidence for Set ${setNumber}`);
  assert.equal(decisionRow.audioSha256, review.audioHashes[String(setNumber)], `Independent audio hash differs for Set ${setNumber}`);

  const sourceSections = authored.sections.filter(section => section.skill === 'listening').sort((a, b) => a.part - b.part);
  assert.equal(sourceSections.length, 4, `Set ${setNumber} must have four Listening parts`);
  assert.equal(
    sha256(JSON.stringify(sourceSections.map(section => ({ part: section.part, transcript: section.transcript })))),
    sourceRow.rawTranscriptSha256,
    `Set ${setNumber} base transcript changed after the legacy decision`,
  );
  const audioUrls = [...new Set(sourceSections.map(section => section.audioUrl))];
  assert.deepEqual(audioUrls, [sourceRow.audioUrl], `Set ${setNumber} audio URL changed`);
  const publicAudioPath = path.join(root, 'public', sourceRow.audioUrl.replace(/^\//u, ''));
  assert.ok(existsSync(publicAudioPath), `Set ${setNumber} current public audio is missing`);
  assert.equal(sha256(readFileSync(publicAudioPath)), decisionRow.audioSha256, `Set ${setNumber} public audio changed after audit`);

  const expandedSections = sourceSections.map(section => ({
    ...section,
    transcript: expandIeltsListeningLegacyReplacement(setNumber, section.part, section.transcript),
  }));
  const expandedMock = {
    ...authored,
    sections: authored.sections.map(section => section.skill === 'listening'
      ? expandedSections.find(candidate => candidate.part === section.part)
      : section),
  };
  const scriptAudit = auditScript(expandedMock, expandedSections, policy);
  assert.equal(scriptAudit.status, 'PASS', `Set ${setNumber} script gate failed: ${scriptAudit.failures.join('; ')}`);
  const segments = expandedSections.flatMap(section => plannedSegments(section, sourceRow.accentTarget, setNumber, policy));
  const serializedSegments = segments.map(segment => ({
    kind: segment.kind,
    part: segment.part,
    profile: segment.profile,
    text: segment.text,
    characters: segment.text.length,
    billableCharacters: ttsText(segment.text).length,
    words: segment.text.trim().split(/\s+/u).filter(Boolean).length,
    textSha256: sha256(segment.text),
    pauseAfterSeconds: segment.pauseAfterSeconds,
  }));

  rows.push({
    set: setNumber,
    setId: authored.id,
    mediaId: `media:ielts:${authored.id}:listening-legacy-replacement-v1`,
    sourceRef: `src/data/mocks/ielts-set-${setNumber}.ts`,
    expansionRef: setNumber <= 6
      ? 'src/data/mocks/ielts-listening-legacy-expansions-5-6.ts'
      : setNumber <= 8
        ? 'src/data/mocks/ielts-listening-legacy-expansions-7-8.ts'
        : 'src/data/mocks/ielts-listening-legacy-expansions-10-12.ts',
    audioUrl: sourceRow.audioUrl,
    action: 'REPLACE_AFTER_AUDIT',
    recommendationSeverity: decisionRow.severity,
    replacesAudioSha256: decisionRow.audioSha256,
    accentTarget: sourceRow.accentTarget,
    rawTranscriptSha256: sourceRow.rawTranscriptSha256,
    spokenTranscriptSha256: sha256(JSON.stringify(expandedSections.map(section => ({ part: section.part, transcript: section.transcript })))),
    scriptAudit,
    sourceCharacters: serializedSegments.reduce((total, segment) => total + segment.characters, 0),
    billableCharacters: serializedSegments.reduce((total, segment) => total + segment.billableCharacters, 0),
    requestSegments: serializedSegments.length,
    profiles: [...new Set(serializedSegments.map(segment => segment.profile))].sort(),
    sensitiveTokens: sensitiveTokens(segments),
    segments: serializedSegments,
  });
}

const manifestCore = {
  schemaVersion: 1,
  generatedAt: decision.generatedAt.slice(0, 10),
  sourceProductionManifestSha256: sourceManifest.manifestSha256,
  policySha256: sha256(readFileSync(policyPath)),
  legacyAudioAuditDecisionSha256: decision.decisionSha256,
  independentReviewSha256: review.reviewSha256,
  scope: 'IELTS Academic Listening Sets 5, 6, 7, 8, 10, 11 and 12: audited full-master replacements',
  outputNamespace: 'ielts-audio-legacy-replacements',
  generationAuthorized: false,
  releaseAuthorized: false,
  rows,
  invoice: {
    requiredProduction: buildInvoice(rows, policy),
    fallbackAllMultilingual: buildInvoice(rows, policy, policy.generation.fallbackModelId),
  },
};
const manifest = { ...manifestCore, manifestSha256: sha256(JSON.stringify(manifestCore)) };

if (write) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
} else {
  assert.ok(existsSync(outputPath), `Missing ${path.relative(root, outputPath)}; run with --write`);
  assert.deepEqual(JSON.parse(readFileSync(outputPath, 'utf8')), manifest, 'Legacy replacement manifest is stale; run with --write');
}

console.log(JSON.stringify({
  manifestSha256: manifest.manifestSha256,
  sets: rows.map(row => ({ set: row.set, words: row.scriptAudit.totalWords, parts: row.scriptAudit.partWords, segments: row.requestSegments })),
  scriptPass: rows.filter(row => row.scriptAudit.status === 'PASS').length,
  invoice: manifest.invoice,
  write,
  note: 'Frozen staging plan only; no provider call, audio write or publication occurred.',
}, null, 2));
