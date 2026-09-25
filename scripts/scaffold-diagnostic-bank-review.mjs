#!/usr/bin/env node

import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';
import { ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening-recorded.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import { createDiagnosticReviewPacket, DIAGNOSTIC_REVIEW_ROLES } from './lib/diagnostic-review-workflow.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['output', 'level', 'skill', 'kind', 'role'].includes(key), `Unknown flag: ${key}`);

const privateRoot = path.join(root, '.diagnostic-private');
const output = path.resolve(args.output ?? path.join(privateRoot, 'review-packets', 'english-bank-draft-1'));
const relativeOutput = path.relative(privateRoot, output);
assert.ok(relativeOutput && !relativeOutput.startsWith('..') && !path.isAbsolute(relativeOutput), '--output must stay inside .diagnostic-private');
assert.ok(!existsSync(output), `Refusing to overwrite an existing review packet directory: ${output}`);

const allObjective = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];
const objectiveCandidates = allObjective.filter(record =>
  (!args.level || record.publicItem.levelCandidate === args.level)
  && (!args.skill || record.publicItem.skill === args.skill)
  && (!args.kind || args.kind === 'objective'));
const writingCandidates = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.filter(record =>
  (!args.level || record.publicPrompt.levelCandidate === args.level)
  && (!args.skill || args.skill === 'writing')
  && (!args.kind || args.kind === 'writing'));
const roles = args.role ? [args.role] : DIAGNOSTIC_REVIEW_ROLES;
for (const role of roles) assert.ok(DIAGNOSTIC_REVIEW_ROLES.includes(role), `Unsupported role: ${role}`);

mkdirSync(output, { recursive: true });
const generatedAt = new Date().toISOString();
const files = [];
for (const role of roles) {
  const packet = createDiagnosticReviewPacket({
    role,
    packetId: `english-bank-draft-1:${args.level ?? 'all'}:${args.skill ?? args.kind ?? 'all'}:${role}`,
    generatedAt,
    objectiveCandidates,
    writingCandidates,
  });
  if (packet.entries.length === 0) continue;
  const file = path.join(output, `${role}.template.json`);
  writeFileSync(file, `${JSON.stringify(packet, null, 2)}\n`);
  files.push({ role, file, entries: packet.entries.length });
}
assert.ok(files.length > 0, 'No reserved review candidates matched the requested filters');
writeFileSync(path.join(output, 'README.txt'), [
  'PRIVATE REVIEW MATERIAL — DO NOT COMMIT OR PUBLISH',
  '',
  'Rename each completed *.template.json file to *.completed.json.',
  'Do not edit item material, IDs, versions, or hashes inside a receipt.',
  'Complete reviewer identity, review date, attestation, every decision, checklist and required comment.',
  'Compile independent completed receipts with scripts/record-diagnostic-bank-approvals.mjs.',
  '',
].join('\n'));
process.stdout.write(`${JSON.stringify({ output, files }, null, 2)}\n`);
