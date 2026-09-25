#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import {
  auditDiagnosticItemCues,
  diagnosticItemCueAuditAggregate,
} from '../src/server/diagnostic/bank/cue-audit.ts';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = realpathSync(resolve(root, '.diagnostic-private'));
const args = process.argv.slice(2);
assert.ok(args.every(argument => argument.startsWith('--output=')), 'Only --output=<private-json-path> is supported.');
assert.ok(args.filter(argument => argument.startsWith('--output=')).length <= 1, '--output may be provided once.');

const candidates = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
].filter(record => record.exposure === 'reserved' && record.status === 'reserved');
const aggregate = diagnosticItemCueAuditAggregate(candidates);
const outputArgument = args[0]?.slice('--output='.length);
let privateOutput = null;
if (outputArgument) {
  assert.equal(isAbsolute(outputArgument), false, '--output must be relative to the repository.');
  const outputPath = resolve(root, outputArgument);
  const privateRelative = relative(privateRoot, outputPath);
  assert.ok(privateRelative && privateRelative !== '..' && !privateRelative.startsWith(`..${sep}`),
    '--output must stay below .diagnostic-private/.');
  assert.equal(existsSync(outputPath), false, `Refusing to overwrite private cue audit: ${outputArgument}`);
  let existingAncestor = dirname(outputPath);
  while (!existsSync(existingAncestor)) existingAncestor = dirname(existingAncestor);
  const realAncestor = realpathSync(existingAncestor);
  const realAncestorRelative = relative(privateRoot, realAncestor);
  assert.ok(realAncestorRelative === ''
    || (realAncestorRelative !== '..' && !realAncestorRelative.startsWith(`..${sep}`)),
  '--output cannot traverse a symlink outside .diagnostic-private/.');
  const detail = {
    reportVersion: 'diagnostic-private-item-cue-audit-v1',
    privacy: 'PRIVATE_ASSESSMENT_MATERIAL_DO_NOT_COMMIT_OR_PUBLISH',
    aggregate,
    items: [...candidates]
      .sort((left, right) => left.publicItem.id.localeCompare(right.publicItem.id))
      .map(record => ({
        itemId: record.publicItem.id,
        contentVersion: record.publicItem.contentVersion,
        level: record.publicItem.levelCandidate,
        skill: record.publicItem.skill,
        audit: auditDiagnosticItemCues(record),
      })),
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  const realParentRelative = relative(privateRoot, realpathSync(dirname(outputPath)));
  assert.ok(realParentRelative === ''
    || (realParentRelative !== '..' && !realParentRelative.startsWith(`..${sep}`)),
  '--output parent escaped .diagnostic-private/.');
  writeFileSync(outputPath, `${JSON.stringify(detail, null, 2)}\n`, { mode: 0o600 });
  privateOutput = outputArgument;
}

process.stdout.write(`${JSON.stringify({
  reportVersion: 'diagnostic-item-cue-audit-aggregate-v1',
  privacy: 'AGGREGATE_ONLY_NO_ITEM_IDS_CONTENT_KEYS_OR_RATIONALES',
  ...aggregate,
  privateOutput,
}, null, 2)}\n`);
