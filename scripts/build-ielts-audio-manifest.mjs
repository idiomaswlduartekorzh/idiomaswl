#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { auditScript, buildInvoice, plannedSegments, releaseAction, sensitiveTokens, sha256, ttsText } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const policyPath = path.join(root, 'config/ielts-audio/production-policy.json');
const registryPath = path.join(root, 'config/ielts-harness/evidence-registry.json');
const outputPath = path.join(root, 'config/ielts-audio/production-manifest.json');
const policy = JSON.parse(readFileSync(policyPath, 'utf8'));
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const write = process.argv.includes('--write');
for (const argument of process.argv.slice(2)) assert.equal(argument, '--write', `Unknown argument: ${argument}`);

const accentRotation = ['british', 'north-american', 'australian', 'new-zealand'];
const rows = [];
for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const authoredMock = (await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)).default;
  const mock = withIeltsListeningProductionTranscript(authoredMock);
  const sourceSections = authoredMock.sections.filter(section => section.skill === 'listening').sort((a, b) => a.part - b.part);
  const sections = mock.sections.filter(section => section.skill === 'listening').sort((a, b) => a.part - b.part);
  const record = registry.sets.find(candidate => candidate.set === setNumber);
  assert.ok(record, `Registry missing Set ${setNumber}`);
  const audit = auditScript(mock, sections, policy);
  const accentTarget = accentRotation[(setNumber - 1) % accentRotation.length];
  const segments = sections.flatMap(section => plannedSegments(section, accentTarget, setNumber, policy));
  const serializedSegments = segments.map(segment => ({
    kind: segment.kind,
    part: segment.part,
    profile: segment.profile,
    characters: segment.text.length,
    billableCharacters: ttsText(segment.text).length,
    words: segment.text.trim().split(/\s+/u).filter(Boolean).length,
    textSha256: sha256(segment.text),
    pauseAfterSeconds: segment.pauseAfterSeconds,
  }));
  const audioUrls = [...new Set(sourceSections.map(section => section.audioUrl))];
  assert.equal(audioUrls.length, 1, `Set ${setNumber} must use one Listening MP3`);
  const row = {
    set: setNumber,
    setId: mock.id,
    mediaId: `media:ielts:${mock.id}:listening-integral-v3`,
    sourceRef: `src/data/mocks/ielts-set-${setNumber}.ts`,
    audioUrl: audioUrls[0],
    knownAudioStatus: record.knownAudioStatus,
    action: releaseAction(setNumber, record.knownAudioStatus),
    accentTarget,
    rawTranscriptSha256: sha256(JSON.stringify(sourceSections.map(section => ({ part: section.part, transcript: section.transcript })))),
    spokenTranscriptSha256: sha256(JSON.stringify(sections.map(section => ({ part: section.part, transcript: section.transcript })))),
    scriptAudit: audit,
    sourceCharacters: serializedSegments.reduce((total, segment) => total + segment.characters, 0),
    billableCharacters: serializedSegments.reduce((total, segment) => total + segment.billableCharacters, 0),
    requestSegments: serializedSegments.length,
    profiles: [...new Set(serializedSegments.map(segment => segment.profile))].sort(),
    sensitiveTokens: sensitiveTokens(segments),
    segments: serializedSegments,
  };
  rows.push(row);
}

const productionRows = rows.filter(row => ['REPLACE_CONFIRMED_MISMATCH', 'CREATE_MISSING'].includes(row.action));
const manifestCore = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString().slice(0, 10),
  policySha256: sha256(readFileSync(policyPath)),
  registrySha256: sha256(readFileSync(registryPath)),
  scope: 'IELTS Academic Listening Sets 1-20: reuse audit plus staged production',
  generationAuthorized: false,
  rows,
  invoice: {
    requiredProduction: buildInvoice(productionRows, policy),
    fallbackAllMultilingual: buildInvoice(productionRows, policy, policy.generation.fallbackModelId),
  },
};
const manifest = { ...manifestCore, manifestSha256: sha256(JSON.stringify(manifestCore)) };
if (write) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
} else {
  assert.ok(existsSync(outputPath), `Missing ${path.relative(root, outputPath)}; run with --write`);
  assert.deepEqual(JSON.parse(readFileSync(outputPath, 'utf8')), manifest, 'IELTS audio manifest is stale; run with --write');
}
console.log(JSON.stringify({
  manifestSha256: manifest.manifestSha256,
  sets: rows.length,
  scriptPass: rows.filter(row => row.scriptAudit.status === 'PASS').length,
  actions: Object.fromEntries([...new Set(rows.map(row => row.action))].sort().map(action => [action, rows.filter(row => row.action === action).map(row => row.set)])),
  invoice: manifest.invoice,
  write,
  note: 'Dry-run manifest only; no provider call and no audio write occurred.',
}, null, 2));
