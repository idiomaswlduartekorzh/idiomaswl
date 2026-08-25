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

test('paid generation is closed before any secret or provider call', () => {
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-2026-audio.mjs',
    '--generate', '--sets', '4', '--approve-manifest', plan.manifestSha256,
    '--max-usd', '1', '--min-remaining-credits', '1000', '--seed-salt', 'test-only',
  ], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /voice casting still needs explicit owner approval/);
  assert.equal(casting.approval, 'pending_owner_approval');
  assert.equal(pilot.status, 'pending_generation_and_owner_listening_review');
});
