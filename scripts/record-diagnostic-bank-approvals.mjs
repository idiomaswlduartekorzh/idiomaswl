#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';
import { ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening-recorded.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import {
  releaseApprovedObjectiveBank,
  releaseApprovedWritingBank,
} from '../src/server/diagnostic/bank/release.ts';
import {
  compileDiagnosticApprovals,
  validateCompletedDiagnosticReviewPacket,
} from './lib/diagnostic-review-workflow.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = process.argv.slice(2);
const value = flag => {
  const argument = cli.find(row => row.startsWith(`${flag}=`));
  return argument ? argument.slice(flag.length + 1) : null;
};
const receiptPaths = cli.filter(argument => !argument.startsWith('--')).map(file => path.resolve(file));
const manifestPath = path.resolve(value('--manifest') ?? path.join(root, 'config/diagnostic/english-bank-approvals.json'));
const manifestVersion = value('--manifest-version');
for (const argument of cli.filter(row => row.startsWith('--'))) {
  assert.ok(argument.startsWith('--manifest=') || argument.startsWith('--manifest-version='), `Unknown flag: ${argument}`);
}
assert.ok(receiptPaths.length >= 2, 'Provide at least two independent completed review receipts');
assert.ok(manifestVersion?.trim(), '--manifest-version is required and must identify this approval revision');

const objectiveCandidates = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];
const packets = receiptPaths.map(file => JSON.parse(readFileSync(file, 'utf8')));
const signatures = packets.map(packet => validateCompletedDiagnosticReviewPacket(
  packet,
  objectiveCandidates,
  ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES,
));
const compiled = compileDiagnosticApprovals(signatures);
assert.equal(compiled.incomplete.length, 0, `Incomplete independent reviews: ${JSON.stringify(compiled.incomplete)}`);
assert.equal(compiled.changesRequested.length, 0, `Changes requested: ${compiled.changesRequested.join(', ')}`);
assert.ok(compiled.objectiveApprovals.length + compiled.writingApprovals.length > 0, 'No complete approvals were found');

const existing = JSON.parse(readFileSync(manifestPath, 'utf8'));
assert.notEqual(manifestVersion.trim(), existing.manifestVersion, '--manifest-version must identify a new approval revision');
const merge = (current, additions) => {
  const byId = new Map(current.map(approval => [approval.itemId, approval]));
  for (const approval of additions) byId.set(approval.itemId, approval);
  return [...byId.values()].sort((left, right) => left.itemId.localeCompare(right.itemId));
};
const manifest = {
  manifestVersion: manifestVersion.trim(),
  updatedAt: new Date().toISOString(),
  objectiveApprovals: merge(existing.objectiveApprovals ?? [], compiled.objectiveApprovals),
  writingApprovals: merge(existing.writingApprovals ?? [], compiled.writingApprovals),
};
releaseApprovedObjectiveBank(objectiveCandidates, manifest);
releaseApprovedWritingBank(ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES, manifest);
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  manifest: manifestPath,
  manifestVersion: manifest.manifestVersion,
  addedObjectiveApprovals: compiled.objectiveApprovals.length,
  addedWritingApprovals: compiled.writingApprovals.length,
  totalObjectiveApprovals: manifest.objectiveApprovals.length,
  totalWritingApprovals: manifest.writingApprovals.length,
}, null, 2)}\n`);
