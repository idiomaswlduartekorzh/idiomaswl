#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { expandIeltsListeningTranscript } from '../src/data/mocks/ielts-listening-expansions.ts';

assert.ok(process.argv[2], 'usage: audit-ielts-transcript-alignment.mjs <generation-directory> <set-number> <whisper-txt>');
const generationRoot = path.resolve(process.argv[2]);
const setNumber = Number(process.argv[3]);
assert.ok(Number.isInteger(setNumber) && setNumber >= 4 && setNumber <= 20, 'set number must be within 4-20');
const asrPath = path.resolve(process.argv[4] ?? path.join(generationRoot, 'whisper-small-en.txt'));
const logPath = path.join(generationRoot, 'generation-log.json');
assert.ok(existsSync(logPath), `missing generation log: ${logPath}`);
assert.ok(existsSync(asrPath), `missing ASR transcript: ${asrPath}`);

const log = JSON.parse(readFileSync(logPath, 'utf8'));
const plan = JSON.parse(readFileSync(path.resolve('docs/ielts-2026-audio-generation-plan-2026-08-25.json'), 'utf8'));
assert.equal(log.manifestSha256, plan.manifestSha256, 'generation log belongs to a stale manifest');
const entry = log.files.find(file => file.setId === `set-${setNumber}`);
assert.ok(entry, `generation log has no Set ${setNumber} file`);
assert.ok(existsSync(entry.path), `missing generated audio: ${entry.path}`);

const { default: mock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
const listening = mock.sections.filter(section => section.skill === 'listening');
assert.equal(listening.length, 4, `Set ${setNumber} must have four Listening parts`);

const PART_NAMES = ['One', 'Two', 'Three', 'Four'];
function spokenBlocks(section) {
  return expandIeltsListeningTranscript(setNumber, section.part, section.transcript)
    .trim().split(/\n{2,}/).map(block => block.trim()).filter(Boolean)
    .map(block => section.part === 1 || section.part === 3
      ? block.replace(/^[A-Z][A-Z -]{1,30}:\s*/, '')
      : block);
}

const expectedParts = listening.flatMap(section => {
  const blocks = spokenBlocks(section);
  const split = Math.max(1, Math.ceil(blocks.length / 2));
  const first = (section.part - 1) * 10 + 1;
  const midpoint = first + 4;
  const final = first + 9;
  const partName = PART_NAMES[section.part - 1];
  return [
    `Part ${partName}. First, review Questions ${first} to ${midpoint}.`,
    ...blocks.slice(0, split),
    `Now review Questions ${midpoint + 1} to ${final} before the recording continues.`,
    ...blocks.slice(split),
    `Part ${partName} is complete. Check your answers.`,
  ];
});

function normalizedWords(value) {
  return value.toLowerCase().replace(/£/g, ' pounds ').replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);
}

function editDistance(left, right) {
  let previous = Uint32Array.from({ length: right.length + 1 }, (_, index) => index);
  let current = new Uint32Array(right.length + 1);
  for (let row = 1; row <= left.length; row += 1) {
    current[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        previous[column] + 1,
        current[column - 1] + 1,
        previous[column - 1] + Number(left[row - 1] !== right[column - 1]),
      );
    }
    [previous, current] = [current, previous];
  }
  return previous[right.length];
}

function completionBlanks(section) {
  return section.questions.flatMap(question => (
    question.type === 'formgroup'
      ? question.blanks
      : question.type === 'tablegroup'
        ? question.rows.flat().filter(cell => typeof cell !== 'string')
        : []
  )).sort((left, right) => left.num - right.num);
}

const asrText = readFileSync(asrPath, 'utf8').replace(/\[(?:BLANK_AUDIO|silence)\]/gi, ' ');
const expectedWords = normalizedWords(expectedParts.join(' '));
const recognizedWords = normalizedWords(asrText);
const distance = editDistance(expectedWords, recognizedWords);
const wordErrorRate = distance / expectedWords.length;
const normalizedAsr = ` ${recognizedWords.join(' ')} `;
const completionEvidence = [];
let previousEvidencePosition = -1;
for (const section of listening) {
  for (const blank of completionBlanks(section)) {
    const positions = blank.answers.flatMap(answer => {
      const needle = ` ${normalizedWords(answer).join(' ')} `;
      const found = [];
      let position = normalizedAsr.indexOf(needle);
      while (position >= 0) {
        found.push(position);
        position = normalizedAsr.indexOf(needle, position + 1);
      }
      return found;
    }).sort((left, right) => left - right);
    const position = positions.find(candidate => candidate >= previousEvidencePosition);
    completionEvidence.push({ question: blank.num, accepted: blank.answers, foundInOrder: position !== undefined });
    if (position !== undefined) previousEvidencePosition = position;
  }
}

const failures = [];
if (wordErrorRate > 0.08) failures.push(`word error rate ${(wordErrorRate * 100).toFixed(2)}% exceeds 8%`);
const missingEvidence = completionEvidence.filter(item => !item.foundInOrder);
if (missingEvidence.length) failures.push(`missing ordered completion evidence: ${missingEvidence.map(item => item.question).join(', ')}`);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const reportCore = {
  schemaVersion: 1,
  auditedAt: new Date().toISOString(),
  manifestSha256: plan.manifestSha256,
  setNumber,
  audioSha256: entry.audioSha256,
  asrEngine: 'whisper.cpp',
  asrModel: 'small.en',
  asrTranscriptSha256: sha256(readFileSync(asrPath)),
  expectedWords: expectedWords.length,
  recognizedWords: recognizedWords.length,
  editDistance: distance,
  wordErrorRate: Number(wordErrorRate.toFixed(4)),
  maximumWordErrorRate: 0.08,
  completionEvidenceTotal: completionEvidence.length,
  completionEvidenceFoundInOrder: completionEvidence.length - missingEvidence.length,
  completionEvidence,
  status: failures.length ? 'rejected' : 'transcript_alignment_passed_pending_owner_listening_review',
  releaseAuthorized: false,
  failures,
};
const report = { ...reportCore, reportSha256: sha256(JSON.stringify(reportCore)) };
const reportPath = path.join(generationRoot, `transcript-qa-set-${setNumber}.json`);
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  reportPath,
  reportSha256: report.reportSha256,
  status: report.status,
  wordErrorRate: report.wordErrorRate,
  completionEvidence: `${report.completionEvidenceFoundInOrder}/${report.completionEvidenceTotal}`,
  failures,
}, null, 2));
if (failures.length) process.exitCode = 1;
