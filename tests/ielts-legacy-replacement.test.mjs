import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import {
  loadVerifiedIeltsAudioPublications,
  loadVerifiedIeltsLegacyPublications,
  verifyIeltsApprovedBatchPublicationDocuments,
  verifyIeltsLegacyPublicationDocuments,
} from '../scripts/lib/ielts-audio-publication.mjs';

const sha256 = value => createHash('sha256').update(value).digest('hex');
const production = JSON.parse(readFileSync('config/ielts-audio/production-manifest.json', 'utf8'));
const manifest = JSON.parse(readFileSync('config/ielts-audio/legacy-replacement-manifest.json', 'utf8'));
const casting = JSON.parse(readFileSync('config/ielts-audio/legacy-replacement-casting.json', 'utf8'));
const decision = JSON.parse(readFileSync('config/ielts-audio/legacy-audio-audit-decision.json', 'utf8'));
const approval = JSON.parse(readFileSync('config/ielts-audio/legacy-replacement-quality-approval.json', 'utf8'));
const receipt = JSON.parse(readFileSync('config/ielts-audio/legacy-replacement-publish-receipt.json', 'utf8'));

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

test('owner quality approval is hash-bound to every staged replacement and cannot publish', () => {
  const { approvalSha256, ...core } = approval;
  assert.equal(sha256(JSON.stringify(core)), approvalSha256);
  assert.equal(approval.status, 'APPROVED');
  assert.equal(approval.manifestSha256, manifest.manifestSha256);
  assert.equal(approval.castingSha256, sha256(readFileSync('config/ielts-audio/legacy-replacement-casting.json')));
  assert.deepEqual(approval.includedSets, [5, 6, 7, 8, 10, 11, 12]);
  assert.deepEqual(approval.files.map(file => file.set), approval.includedSets);
  assert.ok(approval.files.every(file => file.source === 'STAGED_LEGACY_REPLACEMENT'));
  assert.ok(approval.files.every(file => /^[a-f0-9]{64}$/u.test(file.audioSha256)));
  assert.ok(approval.files.every(file => file.technicalStatus === 'PASS'
    && file.asrStatus === 'PASS'
    && file.completionEvidence === '33/33'));
  assert.equal(approval.releaseAuthorized, false);
});

test('legacy publisher requires the exact release gate and validates every QA layer before copying', () => {
  const source = readFileSync('scripts/publish-ielts-legacy-replacements.mjs', 'utf8');
  assert.match(source, /assert\.deepEqual\(process\.argv\.slice\(2\), \['--approve-copy=7'\]/u);
  assert.match(source, /Quality approval digest is stale/u);
  assert.match(source, /technical checks are incomplete/u);
  assert.match(source, /ASR answer coverage is incomplete/u);
  assert.match(source, /public audio changed outside this release/u);
  assert.match(source, /copy changed before atomic publish/u);
  assert.match(source, /releaseAuthorized: true/u);
});

test('publish receipt is hash-bound and every public MP3 matches its approved master', () => {
  const { receiptSha256, ...core } = receipt;
  assert.equal(sha256(JSON.stringify(core)), receiptSha256);
  assert.equal(receipt.status, 'PUBLISHED');
  assert.equal(receipt.manifestSha256, manifest.manifestSha256);
  assert.equal(receipt.castingSha256, approval.castingSha256);
  assert.equal(receipt.qualityApprovalSha256, approval.approvalSha256);
  assert.deepEqual(receipt.files.map(file => file.set), [5, 6, 7, 8, 10, 11, 12]);
  for (const file of receipt.files) {
    const publicPath = `public${file.audioUrl}`;
    assert.equal(sha256(readFileSync(publicPath)), file.audioSha256, `Set ${file.set} public audio is stale`);
    assert.equal(file.audioSha256, approval.files.find(item => item.set === file.set).audioSha256);
  }
  assert.equal(receipt.releaseAuthorized, true);
});

test('runtime Listening transcripts match the frozen spoken transcript hashes', async () => {
  for (const row of manifest.rows) {
    const authored = (await import(`../src/data/mocks/ielts-set-${row.set}.ts`)).default;
    const rawListening = authored.sections.filter(section => section.skill === 'listening')
      .map(section => ({ part: section.part, transcript: section.transcript }));
    assert.equal(sha256(JSON.stringify(rawListening)), row.rawTranscriptSha256, `Set ${row.set} base transcript changed`);

    const runtime = withIeltsListeningLegacyReplacementTranscript(authored);
    const spokenListening = runtime.sections.filter(section => section.skill === 'listening')
      .map(section => ({ part: section.part, transcript: section.transcript }));
    assert.equal(sha256(JSON.stringify(spokenListening)), row.spokenTranscriptSha256, `Set ${row.set} runtime transcript differs from published audio script`);
  }
});

test('central mock registry and exam bridge apply the published legacy transcript overlay', () => {
  const registrySource = readFileSync('src/data/mocks/index.ts', 'utf8');
  const bridgeSource = readFileSync('src/lib/labs/exam-bridge/ielts.ts', 'utf8');

  assert.match(registrySource, /import \{ withIeltsListeningLegacyReplacementTranscript \} from '\.\/ielts-listening-legacy-replacement';/u);
  for (const set of [5, 6, 7, 8, 10, 11, 12]) {
    assert.match(
      registrySource,
      new RegExp(`'ielts:set-${set}':\\s+withIeltsListeningLegacyReplacementTranscript\\(ieltsSet${set}\\)`, 'u'),
      `Set ${set} is not wired to the published transcript in the central registry`,
    );
  }

  assert.match(bridgeSource, /import \{ withIeltsListeningLegacyReplacementTranscript \} from '@\/data\/mocks\/ielts-listening-legacy-replacement';/u);
  assert.match(
    bridgeSource,
    /return withIeltsListeningLegacyReplacementTranscript\(withIeltsListeningProductionTranscript\(authored\)\);/u,
  );
});

test('publication audit recognizes exactly the seven hash-bound public replacements', () => {
  const root = process.cwd();
  const audit = loadVerifiedIeltsLegacyPublications(root);
  assert.equal(audit.manifestSha256, manifest.manifestSha256);
  assert.equal(audit.receiptSha256, receipt.receiptSha256);
  assert.deepEqual([...audit.publicationBySet.keys()], [5, 6, 7, 8, 10, 11, 12]);
  for (const publication of audit.publicationBySet.values()) {
    assert.equal(publication.status, 'PUBLISHED_HASH_VERIFIED');
    assert.equal(publication.automaticQa.technicalStatus, 'PASS');
    assert.equal(publication.automaticQa.asrStatus, 'PASS');
    assert.equal(publication.automaticQa.completionEvidence, '33/33');
    assert.equal(publication.humanQualityApproval, true);
    assert.equal(publication.fullQ40Evidence, false);
    assert.equal(publication.releaseReady, false);
  }
});

test('publication audit rejects a public hash that differs from the receipt', () => {
  const publicAudioSha256ByUrl = new Map(receipt.files.map(file => [file.audioUrl, file.audioSha256]));
  publicAudioSha256ByUrl.set(receipt.files[0].audioUrl, '0'.repeat(64));
  assert.throws(() => verifyIeltsLegacyPublicationDocuments({
    manifest,
    castingSha256: sha256(readFileSync('config/ielts-audio/legacy-replacement-casting.json')),
    approval,
    receipt,
    publicAudioSha256ByUrl,
  }), /public MP3 differs from its receipt/u);
});

test('combined publication audit recognizes all twenty public audio routes without granting full release', () => {
  const audit = loadVerifiedIeltsAudioPublications(process.cwd());
  assert.deepEqual([...audit.publicationBySet.keys()].sort((left, right) => left - right), Array.from({ length: 20 }, (_, index) => index + 1));
  for (const publication of audit.publicationBySet.values()) {
    assert.equal(publication.status, 'PUBLISHED_HASH_VERIFIED');
    assert.equal(publication.fullQ40Evidence, false);
    assert.equal(publication.releaseReady, false);
  }
});

test('approved batch audit rejects a public hash that differs from its receipt', () => {
  const productionManifest = JSON.parse(readFileSync('config/ielts-audio/production-manifest.json', 'utf8'));
  const repairManifest = JSON.parse(readFileSync('config/ielts-audio/repair-manifest.json', 'utf8'));
  const batchApproval = JSON.parse(readFileSync('config/ielts-audio/batch-quality-approval.json', 'utf8'));
  const baseline = JSON.parse(readFileSync('config/ielts-audio/approved-batch-public-baseline.json', 'utf8'));
  const batchReceipt = JSON.parse(readFileSync('config/ielts-audio/approved-batch-publish-receipt.json', 'utf8'));
  const publicAudioSha256ByUrl = new Map(batchReceipt.files.map(file => [file.audioUrl, file.audioSha256]));
  publicAudioSha256ByUrl.set(batchReceipt.files[0].audioUrl, '0'.repeat(64));
  assert.throws(() => verifyIeltsApprovedBatchPublicationDocuments({
    manifest: productionManifest,
    repairManifest,
    castingSha256: sha256(readFileSync('config/ielts-audio/voice-casting.json')),
    approval: batchApproval,
    baseline,
    receipt: batchReceipt,
    publicAudioSha256ByUrl,
  }), /public MP3 differs from its receipt/u);
});
