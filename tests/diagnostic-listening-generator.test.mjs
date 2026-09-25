import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { diagnosticListeningAudioInvoice } from '../scripts/generate-diagnostic-listening-audio.mjs';

const scriptPath = new URL('../scripts/generate-diagnostic-listening-audio.mjs', import.meta.url);
const source = await readFile(scriptPath, 'utf8');

test('diagnostic audio invoice is deterministic and reports unresolved voice approvals', () => {
  const invoice = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.slice(0, 2));
  const repeated = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.slice(0, 2));
  assert.deepEqual(invoice, repeated);
  assert.equal(invoice.files, 2);
  assert.ok(invoice.billableCharacters > 100);
  assert.ok(invoice.unresolvedProfiles.length > 0);
  assert.ok(invoice.unapprovedProfiles.length > 0);
  assert.equal(invoice.generationAuthorized, false);
});

test('default command is a dry run with no credential requirement or file output', () => {
  const output = execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings', scriptPath.pathname, '--levels', 'A1'], {
    cwd: new URL('..', import.meta.url), encoding: 'utf8', env: { ...process.env, ELEVENLABS_API_KEY: '' },
  });
  const invoice = JSON.parse(output);
  assert.equal(invoice.files, 6);
  assert.equal(invoice.generationAuthorized, false);
  assert.match(invoice.note, /No API call, secret read, credit spend or audio write/);
});

test('generation path requires package approval, capped characters, credit reserve and seed', () => {
  assert.match(source, /--approve-package/);
  assert.match(source, /--max-billable-characters/);
  assert.match(source, /--min-remaining-credits/);
  assert.match(source, /--seed-salt/);
  assert.match(source, /refusing to overwrite/);
  assert.match(source, /private-pending-human-qa/);
});
