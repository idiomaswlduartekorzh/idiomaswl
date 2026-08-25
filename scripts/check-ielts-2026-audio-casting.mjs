#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const plan = JSON.parse(readFileSync(path.join(root, 'docs', 'ielts-2026-audio-generation-plan-2026-08-25.json'), 'utf8'));
const casting = JSON.parse(readFileSync(path.join(root, 'scripts', 'ielts-2026-voice-casting.json'), 'utf8'));

assert.equal(casting.manifest_sha256, plan.manifestSha256, 'casting belongs to a stale IELTS audio manifest');
assert.equal(casting.model_id, 'eleven_flash_v2_5');
assert.equal(casting.credits_per_character, plan.invoice.creditsPerCharacter);

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
const availableCredits = casting.account_snapshot.available_credits;
const resetCreditLimit = casting.account_snapshot.character_limit;
const blockers = [];
if (casting.approval !== 'approved_by_owner') blockers.push('voice casting is pending explicit owner approval');
if (availableCredits < pilotCredits) blockers.push(`account has ${availableCredits} credits; Set 4 pilot requires ${pilotCredits}`);
if (resetCreditLimit < postPilotCredits) blockers.push(`post-reset limit is ${resetCreditLimit}; Sets 5-20 require ${postPilotCredits}`);

console.log(JSON.stringify({
  manifestSha256: plan.manifestSha256,
  profiles: resolved.length,
  uniqueVoices: [...new Set(resolved.map(item => item.voiceId))].length,
  accents: Object.keys(casting.voices),
  estimatedUsdBeforeTax: plan.invoice.projectedMinimumUsdBeforeTax,
  requiredCredits,
  pilotCredits,
  postPilotCredits,
  availableCredits,
  resetCreditLimit,
  nextResetLocal: casting.account_snapshot.next_reset_local,
  approval: casting.approval,
  status: blockers.length ? 'BLOCKED' : 'READY_FOR_SET_4_PILOT',
  blockers,
}, null, 2));

if (blockers.length) process.exitCode = 1;
