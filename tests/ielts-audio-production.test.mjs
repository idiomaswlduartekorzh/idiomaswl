import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { buildInvoice, integerToEnglish, reviewPaddingPlan, ttsText } from '../scripts/lib/ielts-audio-production.mjs';

const manifest = JSON.parse(readFileSync('config/ielts-audio/production-manifest.json', 'utf8'));
const casting = JSON.parse(readFileSync('config/ielts-audio/voice-casting.json', 'utf8'));
const batchApproval = JSON.parse(readFileSync('config/ielts-audio/batch-quality-approval.json', 'utf8'));
const legacyDecision = JSON.parse(readFileSync('config/ielts-audio/legacy-audio-audit-decision.json', 'utf8'));
const independentReview = JSON.parse(readFileSync('config/ielts-audio/legacy-audio-independent-review.json', 'utf8'));

test('production scope preserves reusable audio and queues only known missing or mismatched sets', () => {
  assert.deepEqual(manifest.rows.filter(row => row.action === 'AUDIT_BEFORE_REUSE').map(row => row.set), [1, 5, 6, 7, 8, 9, 10, 11, 12]);
  assert.deepEqual(manifest.rows.filter(row => row.action === 'REPLACE_CONFIRMED_MISMATCH').map(row => row.set), [2, 3, 4]);
  assert.deepEqual(manifest.rows.filter(row => row.action === 'CREATE_MISSING').map(row => row.set), [13, 14, 15, 16, 17, 18, 19, 20]);
  assert.ok(manifest.rows.filter(row => ['REPLACE_CONFIRMED_MISMATCH', 'CREATE_MISSING'].includes(row.action)).every(row => row.scriptAudit.status === 'PASS'));
  assert.ok(manifest.rows.every(row => row.scriptAudit.completionSupport.every(item => item.foundInOrder === true)));
  assert.equal(casting.manifest_sha256, manifest.manifestSha256);
});

test('invoice is conservative and Flash remains cheaper than batch Multilingual', () => {
  assert.equal(manifest.invoice.requiredProduction.files, 11);
  assert.equal(manifest.invoice.requiredProduction.estimatedCredits, 105076);
  assert.equal(manifest.invoice.requiredProduction.maximumPlannedCredits, 126092);
  assert.equal(manifest.invoice.fallbackAllMultilingual.estimatedCredits, 209598);
  assert.ok(manifest.invoice.requiredProduction.estimatedCredits < manifest.invoice.fallbackAllMultilingual.estimatedCredits);
});

test('invoice fails closed when a generated segment has no character count', () => {
  const policy = {
    generation: {
      defaultModelId: 'test-model',
      creditsPerCharacter: { 'test-model': 0.5 },
      apiPriceUsdPer1000Characters: { 'test-model': 0.05 },
      budgetContingencyRatio: 0.2,
    },
  };
  assert.throws(
    () => buildInvoice([{ sourceCharacters: 10, segments: [{ text: 'missing frozen count' }] }], policy),
    /finite non-negative character count/,
  );
});

test('short assemblies distribute enough review time to enter the official duration window', () => {
  const plan = reviewPaddingPlan(1494.467, 1740, 1800, 11);
  assert.equal(plan.targetDurationSeconds, 1745);
  assert.equal(Number(plan.totalPaddingSeconds.toFixed(3)), 250.533);
  assert.ok(plan.paddingPerSlotSeconds < 23);
  assert.equal(reviewPaddingPlan(1750, 1740, 1800, 11).totalPaddingSeconds, 0);
});

test('speaker transitions use a de-click fade too short to soften speech attacks', () => {
  assert.ok(casting.target.transition_declick_fade_ms >= 5);
  assert.ok(casting.target.transition_declick_fade_ms <= 12);
});

test('owner batch-quality approval is hash-bound and excludes legacy audio', () => {
  const { approvalSha256, ...core } = batchApproval;
  assert.equal(createHash('sha256').update(JSON.stringify(core)).digest('hex'), approvalSha256);
  assert.equal(batchApproval.productionManifestSha256, manifest.manifestSha256);
  assert.deepEqual(batchApproval.includedSets, [1, 2, 3, 4, 9, 13, 14, 15, 16, 17, 18, 19, 20]);
  assert.deepEqual(batchApproval.excludedLegacySets, [5, 6, 7, 8, 10, 11, 12]);
  assert.equal(batchApproval.files.length, 13);
  assert.equal(batchApproval.releaseAuthorized, false);
});

test('legacy reuse candidates stay blocked until their scripts meet production length', () => {
  const legacyRows = manifest.rows.filter(row => [5, 6, 7, 8, 10, 11, 12].includes(row.set));
  assert.equal(legacyRows.length, 7);
  assert.ok(legacyRows.every(row => row.action === 'AUDIT_BEFORE_REUSE'));
  assert.ok(legacyRows.every(row => row.scriptAudit.status === 'FAIL'));
  assert.ok(legacyRows.every(row => row.scriptAudit.totalWords < 2800));
  assert.ok(legacyRows.every(row => row.scriptAudit.partWords.every(part => part.words < 680)));
  assert.ok(legacyRows.every(row => row.scriptAudit.completionSupport.every(item => item.foundInOrder === true)));
});

test('legacy replacement decision is hash-bound and cannot authorize release', () => {
  const { decisionSha256, ...core } = legacyDecision;
  assert.equal(createHash('sha256').update(JSON.stringify(core)).digest('hex'), decisionSha256);
  assert.equal(legacyDecision.productionManifestSha256, manifest.manifestSha256);
  assert.deepEqual(legacyDecision.sets.map(row => row.set), [5, 6, 7, 8, 10, 11, 12]);
  assert.ok(legacyDecision.sets.every(row => row.recommendation === 'REPLACE' && row.severity === 'HIGH'));
  assert.equal(legacyDecision.releaseAuthorized, false);
});

test('independent legacy review covers non-completion keys and current audio hashes', () => {
  const { reviewSha256, ...core } = independentReview;
  assert.equal(createHash('sha256').update(JSON.stringify(core)).digest('hex'), reviewSha256);
  assert.equal(independentReview.productionManifestSha256, manifest.manifestSha256);
  assert.deepEqual(independentReview.audioHashes,
    Object.fromEntries(legacyDecision.sets.map(row => [row.set, row.audioSha256])));
  assert.equal(independentReview.semanticReview.correctAnswerPointsSupportedByTranscript, 49);
  assert.equal(independentReview.semanticReview.distractorsDismissible, 91);
  assert.equal(independentReview.semanticReview.ambiguousKeys, 0);
  assert.equal(independentReview.conclusion, 'REPLACE_ALL_SEVEN_MASTERS');
  assert.equal(independentReview.releaseAuthorized, false);
});

test('Flash text normalization makes numbers, phones, currency and spelling explicit', () => {
  assert.equal(integerToEnglish('400,000'), 'four hundred thousand');
  assert.equal(ttsText('Call 077 3352 9041 before 9 am. Pay £29.50 by 2035; target 50%.'),
    'Call zero seven seven, three three five two, nine zero four one before nine am. Pay twenty-nine pounds and fifty pence by twenty thirty-five; target fifty percent.');
  assert.equal(ttsText('Spell D-A-L-T-O-N.'), 'Spell D, A, L, T, O, N.');
});

test('dry run cannot call the provider or write audio', () => {
  const run = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', 'scripts/generate-ielts-audio.mjs'], {
    encoding: 'utf8', env: { PATH: process.env.PATH },
  });
  assert.equal(run.status, 0, run.stderr);
  const payload = JSON.parse(run.stdout);
  assert.equal(payload.requiredProduction.generationAuthorized, false);
  assert.match(payload.note, /No API call/);
});
