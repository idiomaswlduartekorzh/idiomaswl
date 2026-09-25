import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import {
  DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT,
  DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS,
  diagnosticA1AudioPilotAuthorization,
  diagnosticListeningAudioInvoice,
} from '../scripts/generate-diagnostic-listening-audio.mjs';

const scriptPath = new URL('../scripts/generate-diagnostic-listening-audio.mjs', import.meta.url);
const source = await readFile(scriptPath, 'utf8');

test('diagnostic audio invoice is deterministic and reports unresolved voice approvals', () => {
  const invoice = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.slice(0, 2));
  const repeated = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.slice(0, 2));
  assert.deepEqual(invoice, repeated);
  assert.equal(invoice.files, 2);
  assert.ok(invoice.billableCharacters > 100);
  assert.equal(invoice.estimatedMaximumCreditDebit, invoice.billableCharacters * 2);
  assert.deepEqual(invoice.unresolvedProfiles, []);
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

test('A1 pilot preset is exactly three diverse files and cannot exceed 1,424 credits', () => {
  const output = execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings', scriptPath.pathname, '--pilot-a1'], {
    cwd: new URL('..', import.meta.url), encoding: 'utf8', env: { ...process.env, ELEVENLABS_API_KEY: '' },
  });
  const invoice = JSON.parse(output);
  assert.deepEqual(DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS, [
    'en-a1-listening-original-01', 'en-a1-listening-original-02', 'en-a1-listening-original-04',
  ]);
  assert.equal(invoice.files, 3);
  assert.equal(invoice.requestSegments, 6);
  assert.equal(invoice.billableCharacters, 712);
  assert.equal(invoice.estimatedMaximumCreditDebit, DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT);
  assert.equal(invoice.estimatedMaximumCreditDebit, 1_424);
  assert.equal(invoice.selectionScope, 'diagnostic-a1-audio-pilot-v1');
  assert.equal(invoice.authorizationPhrase, diagnosticA1AudioPilotAuthorization(invoice));
  assert.deepEqual(invoice.profiles, ['narrator_a', 'narrator_b', 'speaker_a', 'speaker_b']);
  assert.equal(invoice.generationAuthorized, false);
  assert.match(invoice.note, /No API call, secret read, credit spend or audio write/);
});

test('A1 pilot generation requires an exact hash-bound scope authorization', () => {
  let failure;
  try {
    execFileSync(process.execPath, [
      '--experimental-strip-types', '--no-warnings', scriptPath.pathname, '--pilot-a1', '--generate',
      '--approve-package', '98708152b86de8a5481afbb8e004a5a64d5f31711cc6cfbac41f4ce4e566f9d2',
    ], {
      cwd: new URL('..', import.meta.url), encoding: 'utf8', env: { ...process.env, ELEVENLABS_API_KEY: '' },
      stdio: 'pipe',
    });
  } catch (cause) {
    failure = cause;
  }
  assert.ok(failure);
  assert.match(`${failure.stderr}`, /--authorize-pilot GENERATE_DIAGNOSTIC_A1_AUDIO_PILOT/);
});

test('generation path requires package approval, capped characters, credit reserve and seed', () => {
  assert.match(source, /--approve-package/);
  assert.match(source, /--max-billable-characters/);
  assert.match(source, /--max-credit-debit/);
  assert.match(source, /--min-remaining-credits/);
  assert.match(source, /--seed-salt/);
  assert.match(source, /A1 pilot requires --max-credit-debit/);
  assert.match(source, /refusing to overwrite/);
  assert.match(source, /private-pending-human-qa/);
});
