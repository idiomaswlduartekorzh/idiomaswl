#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readdirSync, readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening-recorded.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import {
  auditDiagnosticBankReviewProgress,
  DIAGNOSTIC_BATCH_REVIEW_ROLES,
} from './lib/diagnostic-review-progress.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const privateRoot = realpathSync(path.resolve(root, '.diagnostic-private'));
const cli = process.argv.slice(2);
for (const argument of cli.filter(value => value.startsWith('--'))) {
  assert.ok(argument === '--strict' || argument.startsWith('--root='), `Unknown flag: ${argument}`);
}
const rootArgument = cli.find(argument => argument.startsWith('--root='))?.slice('--root='.length);
const reviewRoot = realpathSync(path.resolve(root, rootArgument
  || '.diagnostic-private/review-packets/english-bank-draft-1-batches'));
const relativeRoot = path.relative(privateRoot, reviewRoot);
assert.ok(relativeRoot && !relativeRoot.startsWith('..') && !path.isAbsolute(relativeRoot),
  '--root must stay inside .diagnostic-private/.');

const packageId = 'english-bank-draft-1';
const skills = ['reading', 'grammar', 'vocabulary', 'writing'];
const expectedDirectories = new Set(CEFR_LEVELS.flatMap(level => skills.map(skill =>
  `${level.toLowerCase()}-${skill}`)));
const artifacts = [];
for (const directoryEntry of readdirSync(reviewRoot, { withFileTypes: true })) {
  assert.ok(directoryEntry.isDirectory(), `Unexpected file at review package root: ${directoryEntry.name}`);
  assert.ok(expectedDirectories.has(directoryEntry.name), `Unexpected review batch directory: ${directoryEntry.name}`);
  const match = directoryEntry.name.match(/^(a1|a2|b1|b2|c1|c2)-(reading|grammar|vocabulary|writing)$/u);
  assert.ok(match, `Invalid review batch directory: ${directoryEntry.name}`);
  const level = match[1].toUpperCase();
  const skill = match[2];
  const directory = path.join(reviewRoot, directoryEntry.name);
  for (const fileEntry of readdirSync(directory, { withFileTypes: true })) {
    assert.ok(fileEntry.isFile(), `Unexpected nested review artifact: ${directoryEntry.name}/${fileEntry.name}`);
    if (fileEntry.name === 'README.txt') continue;
    const fileMatch = fileEntry.name.match(/^(linguistic-reviewer|assessment-reviewer)\.(template|completed)\.json$/u);
    assert.ok(fileMatch, `Unexpected review artifact: ${directoryEntry.name}/${fileEntry.name}`);
    const [, role, state] = fileMatch;
    assert.ok(DIAGNOSTIC_BATCH_REVIEW_ROLES.includes(role), `Unexpected review role: ${role}`);
    const file = path.join(directory, fileEntry.name);
    try {
      artifacts.push({ level, skill, role, state, packet: JSON.parse(readFileSync(file, 'utf8')) });
    } catch {
      artifacts.push({ level, skill, role, state, parseError: true });
    }
  }
}

const objectiveCandidates = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];
const report = auditDiagnosticBankReviewProgress({
  packageId,
  levels: CEFR_LEVELS,
  skills,
  objectiveCandidates,
  writingCandidates: ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES,
  recordedListeningCandidates: ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES,
  artifacts,
});
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (cli.includes('--strict') && report.decision !== 'READY_TO_COMPILE') process.exitCode = 1;
