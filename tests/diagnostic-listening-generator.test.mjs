import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import castingFixture from '../config/diagnostic/english-listening-voice-casting.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import {
  DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT,
  DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS,
  diagnosticA1AudioPilotAuthorization,
  diagnosticListeningAudioInvoice,
} from '../scripts/generate-diagnostic-listening-audio.mjs';
import {
  buildDiagnosticA1AudioPilotApprovalPacket,
  diagnosticA1AudioPilotCastingReadiness,
  recordDiagnosticA1AudioPilotApproval,
  validateDiagnosticA1AudioPilotApprovalReceipt,
} from '../scripts/lib/diagnostic-a1-audio-pilot.mjs';

const scriptPath = new URL('../scripts/generate-diagnostic-listening-audio.mjs', import.meta.url);
const source = await readFile(scriptPath, 'utf8');
const scaffoldSource = await readFile(new URL('../scripts/scaffold-diagnostic-a1-audio-pilot-approval.mjs', import.meta.url), 'utf8');
const recorderSource = await readFile(new URL('../scripts/record-diagnostic-a1-audio-pilot-approval.mjs', import.meta.url), 'utf8');
const pilotBriefs = ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS
  .filter(brief => DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS.includes(brief.id));
const pilotInvoice = diagnosticListeningAudioInvoice(pilotBriefs);
const ownerPacket = () => buildDiagnosticA1AudioPilotApprovalPacket({
  casting: structuredClone(castingFixture), invoice: pilotInvoice, generatedAt: '2026-09-25T14:00:00.000Z',
});

function approvedOwnerReceipt() {
  const receipt = ownerPacket();
  return {
    ...receipt,
    reviewerId: 'welearn-owner',
    decision: 'APPROVE',
    reviewedAt: '2026-09-25T14:30:00.000Z',
    attestation: true,
    checks: Object.fromEntries(Object.keys(receipt.checks).map(check => [check, true])),
  };
}

test('diagnostic audio invoice is deterministic and reports unresolved voice approvals', () => {
  const invoice = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.slice(0, 2));
  const repeated = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS.slice(0, 2));
  assert.deepEqual(invoice, repeated);
  assert.equal(invoice.files, 2);
  assert.ok(invoice.billableCharacters > 100);
  assert.equal(invoice.estimatedMaximumCreditDebit, invoice.billableCharacters * 2);
  assert.deepEqual(invoice.unresolvedProfiles, []);
  assert.ok(invoice.unapprovedProfiles.length > 0);
  assert.equal(invoice.preproductionReady, false);
  assert.equal(invoice.preproductionApprovedBriefs, 0);
  assert.equal(invoice.preproductionRequiredBriefs, 2);
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
  assert.equal(invoice.pilotCastingReady, false);
  assert.ok(invoice.pilotCastingBlockers.includes('PILOT_CAST_NOT_APPROVED_BY_OWNER'));
  assert.deepEqual(invoice.profiles, ['narrator_a', 'narrator_b', 'speaker_a', 'speaker_b']);
  assert.equal(invoice.preproductionReady, false);
  assert.ok(invoice.preproductionBlockers.includes('PREPRODUCTION_APPROVALS_INCOMPLETE'));
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

test('owner review starts blank and limits approval to the exact private A1 cata', () => {
  const receipt = ownerPacket();
  assert.equal(receipt.decision, null);
  assert.equal(receipt.reviewerId, null);
  assert.equal(receipt.attestation, false);
  assert.equal(receipt.proposal.files, 3);
  assert.equal(receipt.proposal.billableCharacters, 712);
  assert.equal(receipt.proposal.maximumCreditDebit, 1_424);
  assert.deepEqual(receipt.proposal.mediaIds, DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS);
  assert.equal(receipt.proposal.constraints.privateStagingOnly, true);
  assert.equal(receipt.proposal.constraints.publicationAuthorized, false);
  assert.equal(receipt.proposal.constraints.fullCastingApprovalGranted, false);
  assert.deepEqual(receipt.proposal.profiles.map(profile => profile.voiceName), [
    'Daniel - Steady Broadcaster', 'Matilda - Knowledgable, Professional',
    'Jessica - Playful, Bright, Warm', 'Will - Relaxed Optimist',
  ]);
});

test('scoped owner approval readies only the A1 cata and preserves full-cast proposals', () => {
  const casting = structuredClone(castingFixture);
  const receipt = approvedOwnerReceipt();
  validateDiagnosticA1AudioPilotApprovalReceipt({ receipt, casting, invoice: pilotInvoice });
  const next = recordDiagnosticA1AudioPilotApproval({
    casting, invoice: pilotInvoice, receipt, receiptSha256: 'a'.repeat(64),
    appliedAt: '2026-09-25T14:31:00.000Z', appliedBy: 'release-operator',
  });
  assert.equal(diagnosticA1AudioPilotCastingReadiness(next, pilotInvoice).ready, true);
  assert.equal(next.pilotApproval.publicationAuthorized, false);
  assert.equal(next.pilotApproval.privateStagingOnly, true);
  assert.equal(Object.values(next.profiles)
    .every(profile => profile.approval === 'proposed_from_separately_approved_cast'), true);
});

test('scoped owner approval rejects missing checks and becomes stale after a voice change', () => {
  const casting = structuredClone(castingFixture);
  const receipt = approvedOwnerReceipt();
  assert.throws(() => validateDiagnosticA1AudioPilotApprovalReceipt({
    receipt: { ...receipt, checks: { ...receipt.checks, noPublicationAuthorized: false } },
    casting, invoice: pilotInvoice,
  }), /requires every scope and safety check/);
  const next = recordDiagnosticA1AudioPilotApproval({
    casting, invoice: pilotInvoice, receipt, receiptSha256: 'a'.repeat(64),
    appliedAt: '2026-09-25T14:31:00.000Z', appliedBy: 'release-operator',
  });
  next.profiles.narrator_a.voiceId = 'changed-voice';
  const readiness = diagnosticA1AudioPilotCastingReadiness(next, pilotInvoice);
  assert.equal(readiness.ready, false);
  assert.ok(readiness.blockers.includes('PILOT_CAST_APPROVAL_STALE'));
});

test('owner approval tooling keeps packets private and recording confirmation-bound', () => {
  assert.match(scaffoldSource, /\.diagnostic-private\/listening-pilot-a1/);
  assert.match(scaffoldSource, /Refusing to overwrite existing owner review/);
  assert.match(recorderSource, /requires a clean working tree/);
  assert.match(recorderSource, /APPLY_DIAGNOSTIC_A1_AUDIO_PILOT_APPROVAL/);
  assert.match(recorderSource, /--write/);
  assert.match(recorderSource, /--applied-by/);
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
  assert.match(source, /listening preproduction review is incomplete/);
});
