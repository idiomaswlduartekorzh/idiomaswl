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
const cacheReuse = JSON.parse(readFileSync(path.join(root, 'docs', 'ielts-audio-cache-reuse-2026-08-28.json'), 'utf8'));
const cacheReuseBytes = readFileSync(path.join(root, 'docs', 'ielts-audio-cache-reuse-2026-08-28.json'));

const segmentSourceSha256 = row => createHash('sha256').update(JSON.stringify(row.segments.map(segment => ({
  profile: segment.profile,
  textSha256: segment.textSha256,
})))).digest('hex');

assert.equal(casting.manifest_sha256, plan.manifestSha256, 'casting belongs to a stale IELTS audio manifest');
assert.equal(casting.model_id, 'eleven_flash_v2_5');
assert.equal(casting.credits_per_character, plan.invoice.creditsPerCharacter);
assert.equal(cacheReuse.currentManifestSha256, plan.manifestSha256);
assert.equal(casting.proposed_production_waves.status, 'pending_owner_authorization');
assert.equal(casting.proposed_production_waves.provider_calls_made, false);
assert.equal(casting.proposed_production_waves.cache_reuse_report_sha256, createHash('sha256').update(cacheReuseBytes).digest('hex'));
assert.deepEqual(casting.proposed_production_waves.waves.map(wave => ({
  wave: wave.wave,
  setIds: wave.sets.map(setNumber => `set-${setNumber}`),
  incrementalCharacters: wave.incremental_characters,
  conservativeCredits: wave.conservative_credits,
  usdBeforeTax: wave.max_usd_before_tax,
})), cacheReuse.recommendedProductionWaves.map(wave => ({
  wave: wave.wave,
  setIds: wave.setIds,
  incrementalCharacters: wave.incrementalCharacters,
  conservativeCredits: wave.conservativeCredits,
  usdBeforeTax: wave.usdBeforeTax,
})));
for (const wave of casting.proposed_production_waves.waves) {
  assert.equal(wave.generation_authorized, false);
  assert.ok(wave.minimum_remaining_credits >= 0);
}
assert.deepEqual(casting.approval_scope.approved_sets, []);
assert.deepEqual(casting.approval_scope.historical_approved_sets, [4, 5]);
assert.ok(casting.approval_scope.approved_max_usd_before_tax >= 0.7185);
assert.equal(casting.approval_scope.minimum_remaining_credits, 0);
assert.ok(casting.approval_scope.reserve_override_at);
const set5Row = plan.rows.find(row => row.setId === 'set-5');
assert.ok(set5Row);
assert.notEqual(set5Candidate.segmentSourceSha256, segmentSourceSha256(set5Row));
assert.equal(set5Candidate.currentPlan.sourceCompatible, false);
assert.equal(set5Candidate.billableCharacters + set5Candidate.reusedPilotCharacters, set5Candidate.sourceCharacters);
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
const pilotCredits = Math.ceil(pilot.source_characters * casting.credits_per_character);
const postPilotCredits = requiredCredits - pilotCredits;
const preservedSourceCharacters = pilot.source_characters + set5Candidate.sourceCharacters;
const preservedSourceCreditEquivalent = Math.ceil(preservedSourceCharacters * casting.credits_per_character);
const providerBillableCharactersForPreservedSynthesis = pilot.source_characters
  + set5Candidate.billableCharacters;
const estimatedProviderCreditsConsumed = Math.ceil(
  providerBillableCharactersForPreservedSynthesis * casting.credits_per_character,
);
const reusableCharacters = cacheReuse.invoice.reusableCharacters;
const avoidedRequestRoundedCredits = cacheReuse.invoice.avoidedRequestRoundedCredits;
const incrementalGenerationCharacters = cacheReuse.invoice.incrementalCharacters;
const incrementalGenerationCredits = cacheReuse.invoice.incrementalCredits;
const incrementalGenerationUsdBeforeTax = cacheReuse.invoice.incrementalUsdBeforeTax;
const availableCredits = casting.account_snapshot.available_credits;
const resetCreditLimit = casting.account_snapshot.character_limit;
const blockers = [];
if (casting.approval !== 'approved_by_owner') blockers.push('voice casting is pending explicit owner approval');
if (casting.approval_scope.approved_sets.length === 0) blockers.push('the expanded current manifest has no owner-approved generation scope');
if (plan.timingFidelityGate?.status !== 'passed') blockers.push(`Listening scripts need ${plan.rows.reduce((total, row) => total + row.timingAdditionalWordsRequired, 0)} additional words before paid synthesis`);
if (pilot.timing_reassessment?.release_ready_under_current_gate === false) blockers.push('Set 4 historical master fails the current timing-fidelity gate');
if (set5Candidate.timingQa?.status === 'rejected') blockers.push('Set 5 candidate fails the current timing-fidelity gate');
if (availableCredits < incrementalGenerationCredits) blockers.push(`account snapshot has ${availableCredits} credits; exact-hash incremental work requires ${incrementalGenerationCredits}`);
if (resetCreditLimit < incrementalGenerationCredits) blockers.push(`post-reset limit is ${resetCreditLimit}; exact-hash incremental work requires ${incrementalGenerationCredits}`);

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
  reusableCharacters,
  avoidedRequestRoundedCredits,
  incrementalGenerationCharacters,
  incrementalGenerationCredits,
  incrementalGenerationUsdBeforeTax,
  availableCredits,
  resetCreditLimit,
  nextResetLocal: casting.account_snapshot.next_reset_local,
  approval: casting.approval,
  approvalScope: casting.approval_scope,
  proposedProductionWaves: casting.proposed_production_waves,
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
