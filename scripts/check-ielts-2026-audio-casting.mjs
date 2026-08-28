#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const plan = JSON.parse(readFileSync(path.join(root, 'docs', 'ielts-2026-audio-generation-plan-2026-08-28.json'), 'utf8'));
const casting = JSON.parse(readFileSync(path.join(root, 'scripts', 'ielts-2026-voice-casting.json'), 'utf8'));
const pilot = JSON.parse(readFileSync(path.join(root, 'scripts', 'ielts-2026-audio-pilot-acceptance.json'), 'utf8'));
const set5Candidate = JSON.parse(readFileSync(path.join(root, 'scripts', 'ielts-2026-audio-set5-candidate.json'), 'utf8'));

const segmentSourceSha256 = row => createHash('sha256').update(JSON.stringify(row.segments.map(segment => ({
  profile: segment.profile,
  textSha256: segment.textSha256,
})))).digest('hex');

assert.equal(casting.manifest_sha256, plan.manifestSha256, 'casting belongs to a stale IELTS audio manifest');
assert.equal(casting.model_id, 'eleven_flash_v2_5');
assert.equal(casting.credits_per_character, plan.invoice.creditsPerCharacter);
assert.deepEqual(casting.approval_scope.approved_sets, [4, 5]);
assert.ok(casting.approval_scope.approved_max_usd_before_tax >= 0.7185);
assert.equal(casting.approval_scope.minimum_remaining_credits, 0);
assert.ok(casting.approval_scope.reserve_override_at);
const set5Row = plan.rows.find(row => row.setId === 'set-5');
assert.ok(set5Row);
assert.equal(set5Candidate.segmentSourceSha256, segmentSourceSha256(set5Row));
assert.equal(set5Candidate.sourceCharacters, set5Row.sourceCharacters);
assert.equal(set5Candidate.billableCharacters + set5Candidate.reusedPilotCharacters, set5Row.sourceCharacters);
assert.equal(set5Candidate.releaseAuthorized, false);

const usedProfiles = [...new Set(plan.rows.flatMap(row => row.profiles))].sort();
const resolved = usedProfiles.map(profile => {
  const separator = profile.lastIndexOf(':');
  const role = profile.slice(0, separator);
  const accent = profile.slice(separator + 1);
  const voiceRole = casting.role_voice[role];
  const voice = casting.voices[accent]?.[voiceRole];
  assert.ok(voiceRole, `missing role mapping for ${role}`);
  assert.ok(voice?.voice_id, `missing voice for ${profile}`);
  assert.equal(voice.credit_multiplier, 1, `${profile} must keep the approved cost multiplier`);
  return { profile, voiceRole, voiceId: voice.voice_id, voiceName: voice.voice_name };
});

const requiredCredits = plan.invoice.projectedMinimumCreditsAfterEditorialGate;
const pilotCredits = Math.ceil(
  plan.rows.find(row => row.setId === 'set-4').sourceCharacters * casting.credits_per_character,
);
const postPilotCredits = requiredCredits - pilotCredits;
const preservedSourceCharacters = plan.rows.find(row => row.setId === 'set-4').sourceCharacters
  + set5Row.sourceCharacters;
const preservedSourceCreditEquivalent = Math.ceil(preservedSourceCharacters * casting.credits_per_character);
const providerBillableCharactersForPreservedSynthesis = plan.rows.find(row => row.setId === 'set-4').sourceCharacters
  + set5Candidate.billableCharacters;
const estimatedProviderCreditsConsumed = Math.ceil(
  providerBillableCharactersForPreservedSynthesis * casting.credits_per_character,
);
const remainingGenerationCharacters = plan.invoice.projectedMinimumCharactersAfterEditorialGate
  - plan.rows.find(row => row.setId === 'set-4').sourceCharacters
  - set5Row.sourceCharacters;
const remainingGenerationCredits = requiredCredits - preservedSourceCreditEquivalent;
const remainingGenerationUsdBeforeTax = Number(
  (remainingGenerationCharacters / 1000 * casting.api_price_usd_per_1000_characters).toFixed(4),
);
const availableCredits = casting.account_snapshot.available_credits;
const resetCreditLimit = casting.account_snapshot.character_limit;
const blockers = [];
if (casting.approval !== 'approved_by_owner') blockers.push('voice casting is pending explicit owner approval');
if (!pilot.audio_sha256 && availableCredits < pilotCredits) blockers.push(`account has ${availableCredits} credits; Set 4 pilot requires ${pilotCredits}`);
if (resetCreditLimit < remainingGenerationCredits) blockers.push(`post-reset limit is ${resetCreditLimit}; Sets 1-3 and 6-20 require ${remainingGenerationCredits}`);

console.log(JSON.stringify({
  manifestSha256: plan.manifestSha256,
  profiles: resolved.length,
  uniqueVoices: [...new Set(resolved.map(item => item.voiceId))].length,
  accents: Object.keys(casting.voices),
  estimatedUsdBeforeTax: plan.invoice.projectedMinimumUsdBeforeTax,
  requiredCredits,
  pilotCredits,
  postPilotCredits,
  preservedSourceCharacters,
  preservedSourceCreditEquivalent,
  providerBillableCharactersForPreservedSynthesis,
  estimatedProviderCreditsConsumed,
  remainingGenerationCharacters,
  remainingGenerationCredits,
  remainingGenerationUsdBeforeTax,
  availableCredits,
  resetCreditLimit,
  nextResetLocal: casting.account_snapshot.next_reset_local,
  approval: casting.approval,
  approvalScope: casting.approval_scope,
  set5CandidateStatus: set5Candidate.status,
  status: blockers.length
    ? 'BLOCKED'
    : pilot.status === 'technical_and_transcript_qa_passed_pending_owner_listening_review'
      ? 'PILOT_QA_PASSED_PENDING_OWNER_LISTENING_REVIEW'
      : pilot.status === 'accepted_by_owner'
        ? 'PILOT_ACCEPTED_POST_RESET_BATCH_PENDING'
        : 'READY_FOR_SET_4_PILOT',
  blockers,
}, null, 2));

if (blockers.length) process.exitCode = 1;
