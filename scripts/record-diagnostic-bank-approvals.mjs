#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, renameSync, writeFileSync } from 'node:fs';
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
  buildDiagnosticBankApprovalProposal,
  recordDiagnosticBankApprovalProposal,
} from './lib/diagnostic-bank-approval-record.mjs';
import {
  compileDiagnosticApprovals,
  validateCompletedDiagnosticReviewPacket,
} from './lib/diagnostic-review-workflow.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const privateRoot = path.resolve(root, '.diagnostic-private');
const cli = process.argv.slice(2);
const value = flag => {
  const argument = cli.find(row => row.startsWith(`${flag}=`));
  return argument ? argument.slice(flag.length + 1) : '';
};
for (const argument of cli.filter(row => row.startsWith('--'))) {
  assert.ok(['--manifest=', '--manifest-version=', '--confirm=', '--applied-by='].some(prefix => argument.startsWith(prefix))
    || argument === '--write', `Unknown flag: ${argument}`);
}

const receiptArguments = cli.filter(argument => !argument.startsWith('--'));
assert.ok(receiptArguments.length >= 2, 'Provide at least two independent completed review receipts');
const receiptPaths = receiptArguments.map(argument => {
  const resolved = path.resolve(root, argument);
  const relative = path.relative(privateRoot, resolved);
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative),
    'Completed review receipts must stay below .diagnostic-private/.');
  assert.ok(path.basename(resolved).endsWith('.completed.json'),
    'Completed review receipt filenames must end in .completed.json.');
  return resolved;
});
assert.equal(new Set(receiptPaths).size, receiptPaths.length, 'Completed review receipt paths must be unique');

const defaultManifestPath = path.resolve(root, 'config/diagnostic/english-bank-approvals.json');
const manifestArgument = value('--manifest');
const manifestPath = manifestArgument ? path.resolve(root, manifestArgument) : defaultManifestPath;
if (manifestPath !== defaultManifestPath) {
  const relative = path.relative(privateRoot, manifestPath);
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative),
    'A custom approval manifest may only be written below .diagnostic-private/.');
}
const manifestVersion = value('--manifest-version');
assert.ok(manifestVersion, '--manifest-version is required and must identify this approval revision');
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
assert.equal(workingTree, '', 'Recording diagnostic bank approvals requires a clean working tree.');

const objectiveCandidates = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];
const receiptEntries = receiptPaths.map(file => {
  const bytes = readFileSync(file);
  const packet = JSON.parse(bytes.toString('utf8'));
  return {
    file: path.basename(file),
    sha256: createHash('sha256').update(bytes).digest('hex'),
    packet,
  };
});
const signatures = receiptEntries.map(entry => validateCompletedDiagnosticReviewPacket(
  entry.packet,
  objectiveCandidates,
  ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES,
));
const compiled = compileDiagnosticApprovals(signatures);
assert.equal(compiled.incomplete.length, 0, `Incomplete independent reviews: ${JSON.stringify(compiled.incomplete)}`);
assert.equal(compiled.changesRequested.length, 0, `Changes requested: ${compiled.changesRequested.join(', ')}`);
assert.ok(compiled.objectiveApprovals.length + compiled.writingApprovals.length > 0, 'No complete approvals were found');

const existing = JSON.parse(readFileSync(manifestPath, 'utf8'));
const built = buildDiagnosticBankApprovalProposal({
  existingManifest: existing,
  compiled,
  manifestVersion,
  receiptReferences: receiptEntries.map(entry => ({
    file: entry.file,
    sha256: entry.sha256,
    packetId: entry.packet.packetId,
    role: entry.packet.role,
    reviewerId: entry.packet.reviewer.id.trim(),
  })),
});
const candidateManifest = recordDiagnosticBankApprovalProposal({
  proposal: built.proposal,
  proposalSha256: built.proposalSha256,
  appliedAt: new Date().toISOString(),
  appliedBy: value('--applied-by') || 'dry-run-placeholder',
});
releaseApprovedObjectiveBank(objectiveCandidates, candidateManifest);
releaseApprovedWritingBank(ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES, candidateManifest);
const confirmation = `APPLY_DIAGNOSTIC_BANK_APPROVALS:${built.proposalSha256}:${built.receiptSetSha256}`;
const summary = {
  decision: 'VALID_BANK_APPROVALS_READY_TO_APPLY',
  manifest: path.relative(root, manifestPath),
  manifestVersion: built.proposal.manifestVersion,
  proposalSha256: built.proposalSha256,
  receiptSetSha256: built.receiptSetSha256,
  sourceReceiptCount: built.proposal.sourceReceipts.length,
  addedObjectiveApprovals: built.addedObjectiveApprovals,
  addedWritingApprovals: built.addedWritingApprovals,
  totalObjectiveApprovals: built.proposal.objectiveApprovals.length,
  totalWritingApprovals: built.proposal.writingApprovals.length,
};
if (!cli.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To apply, add --write --applied-by=<operator> --confirm=${confirmation}\n`);
  process.exit(0);
}
assert.equal(value('--confirm'), confirmation, 'Bank approval confirmation does not match the exact proposal and receipt set.');
assert.ok(value('--applied-by'), '--applied-by is required when writing diagnostic bank approvals.');
const appliedAt = new Date().toISOString();
const manifest = recordDiagnosticBankApprovalProposal({
  proposal: built.proposal,
  proposalSha256: built.proposalSha256,
  appliedAt,
  appliedBy: value('--applied-by'),
});
releaseApprovedObjectiveBank(objectiveCandidates, manifest);
releaseApprovedWritingBank(ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES, manifest);
const temporaryPath = `${manifestPath}.tmp-${process.pid}`;
writeFileSync(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx' });
renameSync(temporaryPath, manifestPath);
process.stdout.write(`${JSON.stringify({
  ...summary, decision: 'APPLIED', appliedAt, appliedBy: value('--applied-by'),
}, null, 2)}\n`);
