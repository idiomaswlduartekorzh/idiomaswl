#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { toPublicIeltsMock } from '../src/data/mocks/ielts-public-payload.ts';

const ROOT = process.cwd();
const REPORT_AS_OF = '2026-08-28';
const CLOSURE_PATH = path.join(ROOT, 'docs', 'ielts-non-audio-closure-2026-08-28.json');
const SET_NUMBERS = Array.from({ length: 20 }, (_, index) => index + 1);
const AUDIO_READY_SETS = [];
const SHARED_INPUTS = [
  'scripts/lib/audit-ielts-golden-content.mjs',
  'src/data/mocks/ielts-academic-2026.ts',
  'src/data/mocks/ielts-golden-standard.ts',
  'src/data/mocks/ielts-listening-expansions.ts',
  'src/data/mocks/ielts-reading-supplements.ts',
  'src/data/mocks/ielts-public-payload.ts',
];

const responseCount = (question) => question.qRange
  ? question.qRange[1] - question.qRange[0] + 1
  : 1;

function keyCount(question) {
  let count = Number('answer' in question) + Number('answers' in question);
  if ('blanks' in question) count += question.blanks.filter((item) => 'answers' in item).length;
  if ('rows' in question) count += question.rows.flat().filter((item) => typeof item === 'object' && item && 'answers' in item).length;
  if ('items' in question) count += question.items.filter((item) => 'answer' in item).length;
  return count;
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function hashFiles(relativePaths) {
  const hash = createHash('sha256');
  for (const relativePath of [...relativePaths].sort()) {
    const absolutePath = path.join(ROOT, relativePath);
    assert(existsSync(absolutePath), `Missing closure input: ${relativePath}`);
    hash.update(relativePath);
    hash.update('\0');
    hash.update(readFileSync(absolutePath));
    hash.update('\0');
  }
  return hash.digest('hex');
}

function runSetAudit(setNumber) {
  const script = `scripts/audit-ielts-golden-set${setNumber}.mjs`;
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types',
    '--no-warnings',
    script,
  ], { cwd: ROOT, encoding: 'utf8' });
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  assert.equal(result.status, 0, `Set ${setNumber} live audit failed:\n${output}`);
  const match = output.match(new RegExp(`IELTS Golden Set ${setNumber}: (\\d+) content/contract checks passed`));
  assert(match, `Set ${setNumber} live audit did not expose its control count.`);
  return Number(match[1]);
}

async function inspectSet(setNumber) {
  const sourcePath = `src/data/mocks/ielts-set-${setNumber}.ts`;
  const auditPath = `scripts/audit-ielts-golden-set${setNumber}.mjs`;
  const reportPath = `docs/ielts-golden-set${setNumber}-audit-${REPORT_AS_OF}.json`;
  const reportAbsolutePath = path.join(ROOT, reportPath);
  assert(existsSync(reportAbsolutePath), `Set ${setNumber} has no checked-in Golden report.`);

  const controls = runSetAudit(setNumber);
  const imported = await import(pathToFileURL(path.join(ROOT, sourcePath)).href);
  const mock = withIeltsAcademic2026Blueprint(imported.default);
  const report = JSON.parse(readFileSync(reportAbsolutePath, 'utf8'));
  const listening = mock.sections.filter((section) => section.skill === 'listening');
  const reading = mock.sections.filter((section) => section.skill === 'reading');
  const writing = mock.sections.flatMap((section) => section.skill === 'writing' ? section.questions : []);
  const speaking = mock.sections.flatMap((section) => section.skill === 'speaking' ? section.questions : []);
  const publicKeys = toPublicIeltsMock(mock).sections
    .flatMap((section) => section.questions)
    .reduce((sum, question) => sum + keyCount(question), 0);
  const task1 = writing.find((question) => question.type === 'write' && question.taskNumber === 1);
  const task1Asset = task1?.imageUrl?.replace(/^\//, '');
  assert(task1Asset, `Set ${setNumber} has no Task 1 visual.`);

  const metrics = {
    listeningParts: listening.length,
    listeningResponses: listening.flatMap((section) => section.questions).reduce((sum, question) => sum + responseCount(question), 0),
    readingPassages: reading.length,
    readingResponses: reading.flatMap((section) => section.questions).reduce((sum, question) => sum + responseCount(question), 0),
    writingTasks: writing.filter((question) => question.type === 'write').length,
    speakingParts: new Set(speaking.filter((question) => question.type === 'speak').map((question) => question.partNumber)).size,
    publicKeys,
  };

  assert.equal(report.set, setNumber, `Set ${setNumber} report identity drift.`);
  assert.notEqual(report.status, 'blocked', `Set ${setNumber} report is blocked.`);
  assert.deepEqual(report.failures, [], `Set ${setNumber} report contains failures.`);
  assert.equal(report.metrics.listeningResponses, 40, `Set ${setNumber} report Listening count drift.`);
  assert.equal(report.metrics.readingResponses, 40, `Set ${setNumber} report Reading count drift.`);
  assert.equal(report.metrics.publicKeys, 0, `Set ${setNumber} report exposes public keys.`);
  assert(report.provenanceSearch?.phrasesChecked?.length >= 3, `Set ${setNumber} lacks provenance-search evidence.`);
  assert(report.factualSources?.length >= 1, `Set ${setNumber} lacks factual sources.`);
  assert(Array.isArray(report.deferred), `Set ${setNumber} report has no deferred register.`);
  assert(report.deferred.every((item) => /listening|audio/i.test(item)), `Set ${setNumber} still defers non-audio work.`);
  assert.deepEqual(metrics, {
    listeningParts: 4,
    listeningResponses: 40,
    readingPassages: 3,
    readingResponses: 40,
    writingTasks: 2,
    speakingParts: 3,
    publicKeys: 0,
  }, `Set ${setNumber} runtime contract drift.`);

  const expectedMediaStatus = setNumber >= 4 && setNumber <= 12
      ? 'legacy-audio-under-review'
      : 'script-ready-audio-blocked';
  assert.equal(mock.ieltsAcademic2026Blueprint.listeningMediaStatus, expectedMediaStatus, `Set ${setNumber} media truth drift.`);

  const inputPaths = [...SHARED_INPUTS, sourcePath, auditPath, `public/${task1Asset}`];
  return {
    set: setNumber,
    status: 'non-audio-ready',
    controls,
    metrics,
    listeningMediaStatus: expectedMediaStatus,
    deferred: report.deferred,
    task1Asset: `/${task1Asset}`,
    inputSha256: hashFiles(inputPaths),
    reportSha256: sha256(readFileSync(reportAbsolutePath)),
  };
}

const sets = [];
for (const setNumber of SET_NUMBERS) {
  const result = await inspectSet(setNumber);
  sets.push(result);
  console.log(`✓ Set ${setNumber}: ${result.controls} live controls; non-audio closure pinned.`);
}

const closureBody = {
  schemaVersion: 1,
  reportAsOf: REPORT_AS_OF,
  status: 'non-audio-ready-audio-release-pending',
  sets: sets.length,
  nonAudioReadySets: sets.filter((set) => set.status === 'non-audio-ready').map((set) => set.set),
  audioReadySets: AUDIO_READY_SETS,
  audioReleasePendingSets: SET_NUMBERS.filter((setNumber) => !AUDIO_READY_SETS.includes(setNumber)),
  totalLiveControls: sets.reduce((sum, set) => sum + set.controls, 0),
  sharedInputsSha256: hashFiles(SHARED_INPUTS),
  setEvidence: sets,
};
const closure = {
  ...closureBody,
  closureSha256: sha256(JSON.stringify(closureBody)),
};

assert.deepEqual(closure.nonAudioReadySets, SET_NUMBERS, 'Non-audio closure does not cover Sets 1–20 exactly.');
assert.deepEqual(closure.audioReadySets, [], 'No set may be audio-ready until it passes the calibrated timing gate.');
assert.equal(closure.totalLiveControls, 4784, 'Golden control-count drift requires an explicit closure refresh.');

if (process.argv.includes('--write')) {
  writeFileSync(CLOSURE_PATH, `${JSON.stringify(closure, null, 2)}\n`);
  console.log(`Wrote ${path.relative(ROOT, CLOSURE_PATH)}`);
} else {
  assert(existsSync(CLOSURE_PATH), 'Missing pinned non-audio closure manifest; run with --write after a full review.');
  const pinned = JSON.parse(readFileSync(CLOSURE_PATH, 'utf8'));
  assert.deepEqual(closure, pinned, 'Pinned non-audio closure does not match the live audits and current inputs.');
}

console.log(`✓ IELTS non-audio closure: 20/20 sets, ${closure.totalLiveControls} live controls, SHA ${closure.closureSha256}`);
