import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const sha256 = value => createHash('sha256').update(value).digest('hex');
const production = JSON.parse(readFileSync('config/ielts-audio/production-manifest.json', 'utf8'));
const manifest = JSON.parse(readFileSync('config/ielts-audio/legacy-replacement-manifest.json', 'utf8'));
const casting = JSON.parse(readFileSync('config/ielts-audio/legacy-replacement-casting.json', 'utf8'));
const decision = JSON.parse(readFileSync('config/ielts-audio/legacy-audio-audit-decision.json', 'utf8'));

test('legacy replacement plan is hash-bound and leaves the published manifest unchanged', () => {
  const { manifestSha256, ...core } = manifest;
  assert.equal(sha256(JSON.stringify(core)), manifestSha256);
  assert.equal(manifest.sourceProductionManifestSha256, production.manifestSha256);
  assert.equal(manifest.legacyAudioAuditDecisionSha256, decision.decisionSha256);
  assert.deepEqual(manifest.rows.map(row => row.set), [5, 6, 7, 8, 10, 11, 12]);
  assert.ok(production.rows.filter(row => manifest.rows.some(candidate => candidate.set === row.set))
    .every(row => row.action === 'AUDIT_BEFORE_REUSE'));
  assert.equal(manifest.releaseAuthorized, false);
});

test('every replacement freezes a complete script that passes editorial gates', () => {
  assert.ok(manifest.rows.every(row => row.action === 'REPLACE_AFTER_AUDIT'));
  assert.ok(manifest.rows.every(row => row.scriptAudit.status === 'PASS'));
  assert.ok(manifest.rows.every(row => row.scriptAudit.questions === 40));
  assert.ok(manifest.rows.every(row => row.scriptAudit.totalWords >= 2800));
  assert.ok(manifest.rows.every(row => row.scriptAudit.partWords.every(part => part.words >= 680)));
  assert.ok(manifest.rows.every(row => row.scriptAudit.completionSupport.length === 33));
  assert.ok(manifest.rows.every(row => row.scriptAudit.completionSupport.every(item => item.foundInOrder)));
  assert.ok(manifest.rows.every(row => row.segments.every(segment => typeof segment.text === 'string'
    && sha256(segment.text) === segment.textSha256)));
});

test('Set 10 Q21 correction is explicit and dismisses both known distractors', () => {
  const partThree = manifest.rows.find(row => row.set === 10).segments
    .filter(segment => segment.part === 3 && segment.kind === 'content').map(segment => segment.text).join(' ');
  assert.match(partThree, /community library/iu);
  assert.match(partThree, /sports hall/iu);
  assert.match(partThree, /railway station/iu);
  assert.match(partThree, /Neither of those is your design proposal/iu);
});

test('casting uses the approved economical model and preserves production quality limits', () => {
  assert.equal(casting.manifest_sha256, manifest.manifestSha256);
  assert.equal(casting.model_id, 'eleven_flash_v2_5');
  assert.deepEqual(casting.approval_scope.approved_sets, [5, 6, 7, 8, 10, 11, 12]);
  assert.equal(casting.approval_scope.minimum_remaining_credits, 5000);
  assert.equal(casting.target.transition_declick_fade_ms, 10);
  assert.equal(casting.target.playback_speed_by_set['6'], 0.992);
  assert.ok(Object.values(casting.voices).flatMap(Object.values).every(voice => voice.credit_multiplier === 1));
});

test('invoice is bounded and Flash costs less than an all-Multilingual fallback', () => {
  assert.equal(manifest.invoice.requiredProduction.files, 7);
  assert.equal(manifest.invoice.requiredProduction.estimatedCredits, 69600);
  assert.equal(manifest.invoice.requiredProduction.estimatedUsdBeforeTax, 6.9412);
  assert.ok(manifest.invoice.requiredProduction.estimatedCredits < manifest.invoice.fallbackAllMultilingual.estimatedCredits);
  assert.ok(manifest.invoice.requiredProduction.estimatedUsdBeforeTax <= casting.approval_scope.approved_max_usd_before_tax);
});

test('custom-manifest dry run remains non-billable and selects only replacement actions', () => {
  const run = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-audio.mjs',
    '--manifest-file', 'config/ielts-audio/legacy-replacement-manifest.json',
    '--casting-file', 'config/ielts-audio/legacy-replacement-casting.json'], { encoding: 'utf8', env: { PATH: process.env.PATH } });
  assert.equal(run.status, 0, run.stderr);
  const payload = JSON.parse(run.stdout);
  assert.deepEqual(payload.actions.REPLACE_AFTER_AUDIT, [5, 6, 7, 8, 10, 11, 12]);
  assert.match(payload.note, /No API call/);
});
