import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const plan = JSON.parse(readFileSync('docs/ielts-2026-audio-generation-plan-2026-08-28.json', 'utf8'));
const casting = JSON.parse(readFileSync('scripts/ielts-2026-voice-casting.json', 'utf8'));
const pilot = JSON.parse(readFileSync('scripts/ielts-2026-audio-pilot-acceptance.json', 'utf8'));
const set5Candidate = JSON.parse(readFileSync('scripts/ielts-2026-audio-set5-candidate.json', 'utf8'));
const generatorSource = readFileSync('scripts/generate-ielts-2026-audio.mjs', 'utf8');

test('the checked-in invoice never discounts authored characters', () => {
  const sourceCharacters = plan.rows.reduce((total, row) => total + row.sourceCharacters, 0);
  assert.equal(plan.editorialGate.status, 'passed');
  assert.deepEqual(plan.rows.map(row => row.setId), Array.from({ length: 20 }, (_, index) => `set-${index + 1}`));
  assert.equal(plan.rows.find(row => row.setId === 'set-4').releaseAction, 'replace-after-editorial-and-audio-qa');
  assert.equal(plan.timingFidelityGate.status, 'passed');
  assert.equal(plan.timingFidelityGate.minimumTranscriptWordsPerSet, 2800);
  assert.equal(plan.timingFidelityGate.targetIntegralDurationSeconds[1], 1800);
  assert.equal(plan.invoice.projectedMinimumCharactersAfterEditorialGate, 358016);
  assert.equal(plan.invoice.projectedMinimumCreditsAfterEditorialGate, Math.ceil(358016 * casting.credits_per_character));
  assert.equal(casting.manifest_sha256, plan.manifestSha256);
  const pilotRow = plan.rows.find(row => row.setId === `set-${pilot.pilot_set}`);
  assert.ok(pilotRow);
  assert.notEqual(
    createHash('sha256').update(JSON.stringify(pilotRow.segments.map(segment => ({
      profile: segment.profile,
      textSha256: segment.textSha256,
    })))).digest('hex'),
    pilot.segment_source_sha256,
  );
  assert.equal(pilot.currentPlan.manifestSha256, plan.manifestSha256);
  assert.equal(pilot.currentPlan.sourceCompatible, false);
  assert.equal(casting.target.minimum_duration_seconds, 1740);
  assert.equal(casting.target.maximum_duration_seconds, 1800);
  assert.ok(casting.target.normalization_true_peak_dbfs < casting.target.max_true_peak_dbfs);
  assert.equal(casting.target.silence_between_parts_seconds, 15);
  assert.equal(pilot.status, 'accepted_by_owner');
  assert.deepEqual(casting.approval_scope.approved_sets, []);
  assert.deepEqual(casting.approval_scope.historical_approved_sets, [4, 5]);
  assert.equal(
    createHash('sha256').update(readFileSync('public/audio/ielts/ielts-listening-set-4.mp3')).digest('hex'),
    pilot.audio_sha256,
    'the public Set 4 MP3 must be the exact owner-accepted master',
  );
  for (const row of plan.rows) {
    const announcements = row.segments.filter(segment => segment.kind === 'announcer');
    assert.equal(announcements.length, 12, `${row.setId} must announce both question blocks and review time in every part`);
    assert.equal(announcements.reduce((total, segment) => total + segment.pauseAfterSeconds, 0), 300);
    assert.ok(row.profiles.includes('announcer:british'));
  }
  const set4 = plan.rows.find(row => row.setId === 'set-4');
  const set5 = plan.rows.find(row => row.setId === 'set-5');
  const acceptedSpeech = new Set(set4.segments.map(segment => `${segment.profile}|${segment.textSha256}`));
  const reusableSet5 = set5.segments.filter(segment => acceptedSpeech.has(`${segment.profile}|${segment.textSha256}`));
  assert.equal(reusableSet5.length, 12);
  assert.equal(reusableSet5.reduce((total, segment) => total + segment.characters, 0), 583);
  assert.equal(set5.transcriptWords, 2909);
  assert.equal(set5.requestSegments, 78);
  assert.ok(set5.profiles.includes('student-woman:north-american'));
  assert.ok(set5.profiles.includes('student-man:north-american'));
  assert.ok(set5.profiles.includes('tutor:north-american'));
  assert.ok(!set5.profiles.includes('speaker:north-american'), 'Meg and Ryan must never collapse into one generic voice');
  assert.equal(set5.sourceCharacters - 583, 16695, 'expanded Set 5 speech would be billable after approved byte reuse');
  assert.notEqual(set5Candidate.segmentSourceSha256, createHash('sha256').update(JSON.stringify(set5.segments.map(segment => ({
    profile: segment.profile,
    textSha256: segment.textSha256,
  })))).digest('hex'));
  assert.notEqual(set5Candidate.sourceCharacters, set5.sourceCharacters);
  assert.equal(set5Candidate.sourceCharacters, 13058);
  assert.equal(set5Candidate.billableCharacters, 12475);
  assert.equal(set5Candidate.reusedPilotCharacters, 583);
  assert.equal(set5Candidate.billableCharacters + set5Candidate.reusedPilotCharacters, set5Candidate.sourceCharacters);
  assert.equal(set5Candidate.releaseAuthorized, false);
  assert.equal(set5Candidate.status, 'rejected_timing_profile_requires_script_revision_and_reassembly');
  assert.equal(set5Candidate.timingQa.status, 'rejected');
  assert.ok(set5Candidate.timingQa.trailingSilenceSeconds > 240);
  assert.match(
    generatorSource,
    /const textSha256 = sha256\(segment\.text\);/,
    'runtime segments must be hashed before matching approved reusable speech',
  );
  assert.doesNotMatch(
    generatorSource,
    /candidate\.textSha256 === segment\.textSha256/,
    'hydrated runtime segments do not expose the plan-only textSha256 property',
  );
  const reuseOnlyGate = generatorSource.indexOf("if (has('--reuse-only'))");
  const apiSecretRead = generatorSource.indexOf('const apiKey = process.env.ELEVENLABS_API_KEY;', reuseOnlyGate);
  assert.ok(reuseOnlyGate > 0 && apiSecretRead > reuseOnlyGate, '--reuse-only must exit the gate before reading a provider secret');
  assert.match(generatorSource, /Math\.min\(providerAvailableCredits, conservativeAvailableCredits\)/);
  assert.match(generatorSource, /conservativeAvailableCredits -= Math\.ceil/);
  assert.match(
    generatorSource,
    /billableCharacters: row\.sourceCharacters - reusedPilotCharacters/,
    'prior-cache speech remains historically billable; only accepted pilot bytes are free',
  );
  assert.match(generatorSource, /sameAudioBytes\(segmentPath, approvedPilotPath\)/);
  assert.doesNotMatch(generatorSource, /apad=whole_dur/);
  assert.match(generatorSource, /assertAudioTiming\(wavPath/);
});

test('dry-run source verification is local, deterministic and non-authorizing', () => {
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs', '--verify-source',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.sourceVerified, true);
  assert.equal(output.full.files, 20);
  assert.equal(output.remainingGeneration.files, 18);
  assert.equal(output.remainingGeneration.billableCharacters, 322416);
  assert.equal(output.remainingGeneration.estimatedCredits, 161208);
  assert.equal(output.remainingGeneration.estimatedUsdBeforeTax, 16.1208);
  assert.equal(output.full.generationAuthorized, false);
  assert.match(output.note, /No API call/);
});

test('paid generation rejects the superseded approval scope before any secret or provider call', () => {
  const staleSet4Approval = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs',
    '--generate', '--sets', '4', '--approve-manifest', plan.manifestSha256,
    '--max-usd', '1', '--min-remaining-credits', '3500', '--seed-salt', 'test-only',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.notEqual(staleSet4Approval.status, 0);
  assert.match(staleSet4Approval.stderr, /set-4 does not have explicit owner approval/);
  assert.doesNotMatch(staleSet4Approval.stderr, /ELEVENLABS_API_KEY/);

  const staleSet5Approval = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs',
    '--generate', '--sets', '5', '--approve-manifest', plan.manifestSha256,
    '--max-usd', '0.75', '--min-remaining-credits', '0', '--seed-salt', 'test-only',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.notEqual(staleSet5Approval.status, 0);
  assert.match(staleSet5Approval.stderr, /set-5 does not have explicit owner approval/);
  assert.doesNotMatch(staleSet5Approval.stderr, /ELEVENLABS_API_KEY/);
  assert.equal(casting.approval_scope.minimum_remaining_credits, 0);
  assert.ok(casting.approval_scope.reserve_override_at);
  assert.equal(casting.approval, 'approved_by_owner');
  assert.equal(pilot.status, 'accepted_by_owner');
  assert.equal(pilot.timing_reassessment.release_ready_under_current_gate, false);
  assert.ok(pilot.audio_sha256);
  assert.ok(pilot.qa_report_sha256);
  assert.ok(pilot.transcript_qa_report_sha256);
  assert.ok(pilot.approved_at);

});
