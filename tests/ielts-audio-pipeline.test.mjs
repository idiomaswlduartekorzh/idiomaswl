import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const plan = JSON.parse(readFileSync('docs/ielts-2026-audio-generation-plan-2026-08-25.json', 'utf8'));
const casting = JSON.parse(readFileSync('scripts/ielts-2026-voice-casting.json', 'utf8'));
const pilot = JSON.parse(readFileSync('scripts/ielts-2026-audio-pilot-acceptance.json', 'utf8'));

test('the checked-in invoice never discounts authored characters', () => {
  const sourceCharacters = plan.rows.reduce((total, row) => total + row.sourceCharacters, 0);
  assert.equal(plan.editorialGate.status, 'passed');
  assert.equal(plan.invoice.projectedMinimumCharactersAfterEditorialGate, sourceCharacters);
  assert.equal(plan.invoice.projectedMinimumCreditsAfterEditorialGate, Math.ceil(sourceCharacters * casting.credits_per_character));
  assert.equal(casting.manifest_sha256, plan.manifestSha256);
  assert.equal(pilot.manifest_sha256, plan.manifestSha256);
  assert.equal(casting.target.minimum_duration_seconds, 1625);
  assert.ok(casting.target.normalization_true_peak_dbfs < casting.target.max_true_peak_dbfs);
  assert.equal(casting.target.silence_between_parts_seconds, 7);
  for (const row of plan.rows) {
    const announcements = row.segments.filter(segment => segment.kind === 'announcer');
    assert.equal(announcements.length, 12, `${row.setId} must announce both question blocks and review time in every part`);
    assert.equal(announcements.reduce((total, segment) => total + segment.pauseAfterSeconds, 0), 570);
    assert.ok(row.profiles.includes('announcer:british'));
  }
});

test('dry-run source verification is local, deterministic and non-authorizing', () => {
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs', '--verify-source',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.sourceVerified, true);
  assert.equal(output.full.files, 17);
  assert.equal(output.full.generationAuthorized, false);
  assert.match(output.note, /No API call/);
});

test('paid generation cannot exceed the owner-approved ceiling before any secret or provider call', () => {
  const excessiveCap = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs',
    '--generate', '--sets', '4', '--approve-manifest', plan.manifestSha256,
    '--max-usd', '1', '--min-remaining-credits', '3500', '--seed-salt', 'test-only',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.notEqual(excessiveCap.status, 0);
  assert.match(excessiveCap.stderr, /exceeds owner-approved 0.75/);

  const insufficientReserve = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs',
    '--generate', '--sets', '4', '--approve-manifest', plan.manifestSha256,
    '--max-usd', '0.75', '--min-remaining-credits', '3499', '--seed-salt', 'test-only',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.notEqual(insufficientReserve.status, 0);
  assert.match(insufficientReserve.stderr, /below owner-approved 3500/);
  assert.equal(casting.approval, 'approved_by_owner');
  assert.equal(pilot.status, 'technical_and_transcript_qa_passed_pending_owner_listening_review');
  assert.ok(pilot.audio_sha256);
  assert.ok(pilot.qa_report_sha256);
  assert.ok(pilot.transcript_qa_report_sha256);
  assert.equal(pilot.approved_at, null);
});
