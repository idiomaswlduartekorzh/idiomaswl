#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);
const has = flag => args.includes(flag);
const value = flag => has(flag) ? args[args.indexOf(flag) + 1] : null;
const outputPath = path.join(repoRoot, 'docs', 'ielts-audio-cache-reuse-2026-08-28.json');
const plan = readJson(path.join(repoRoot, 'docs', 'ielts-2026-audio-generation-plan-2026-08-28.json'));
const casting = readJson(path.join(scriptDir, 'ielts-2026-voice-casting.json'));
const pilot = readJson(path.join(scriptDir, 'ielts-2026-audio-pilot-acceptance.json'));
const set5Candidate = readJson(path.join(scriptDir, 'ielts-2026-audio-set5-candidate.json'));
const cacheRoot = value('--cache-root') ?? process.env.IELTS_AUDIO_CACHE_ROOT ?? null;

const SOURCES = [
  {
    artifactId: 'accepted-set-4-pilot-segments',
    setId: 'set-4',
    generationManifestSha256: '024680660790cf1ac6e3431f4ad379c09b73e52cb67e2847484606956dbde187',
    sourcePlanCommit: 'a6f431b9ffe6320eb634e0b767a5996281383a26',
    sourcePlanRepoPath: 'docs/ielts-2026-audio-generation-plan-2026-08-25.json',
  },
  {
    artifactId: 'rejected-set-5-master-preserved-segments',
    setId: 'set-5',
    generationManifestSha256: 'a3b8302fb89f491ba00388c845346cc08ed40a283963d446e3b5148b9c0bccea',
    sourcePlanCommit: '720fcb4023935e8c6090e756515b32bd8ac5b938',
    sourcePlanRepoPath: 'docs/ielts-2026-audio-generation-plan-2026-08-25.json',
  },
];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function segmentKey(segment) {
  return `${segment.profile}|${segment.textSha256}`;
}

function segmentSourceSha256(row) {
  return sha256(JSON.stringify(row.segments.map(segment => ({
    profile: segment.profile,
    textSha256: segment.textSha256,
  }))));
}

function isAudio(filePath) {
  const probe = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'stream=codec_type', '-of', 'default=nw=1:nk=1', filePath,
  ], { encoding: 'utf8' });
  return probe.status === 0 && probe.stdout.trim().split(/\s+/).includes('audio');
}

function cacheRelative(...parts) {
  return path.join(...parts).split(path.sep).join('/');
}

function historicalPlan(source) {
  const revision = `${source.sourcePlanCommit}:${source.sourcePlanRepoPath}`;
  const shown = spawnSync('git', ['show', revision], { cwd: repoRoot, encoding: 'utf8' });
  assert.equal(shown.status, 0, `cannot read pinned historical plan ${revision}: ${shown.stderr}`);
  const parsed = JSON.parse(shown.stdout);
  assert.equal(parsed.manifestSha256, source.generationManifestSha256, `${source.setId} pinned source plan manifest changed`);
  return { parsed, revision, fileSha256: sha256(shown.stdout) };
}

function currentVoiceConfigurationSha256() {
  return sha256(JSON.stringify({
    modelId: casting.model_id,
    voiceSettings: casting.voice_settings,
    roleVoice: casting.role_voice,
    voiceIds: Object.fromEntries(Object.entries(casting.voices).map(([accent, roles]) => [
      accent,
      Object.fromEntries(Object.entries(roles).map(([role, voice]) => [role, voice.voice_id])),
    ])),
    intermediateOutputFormat: casting.target.intermediate_output_format,
  }));
}

function buildReport(root) {
  assert.ok(root, 'pass --cache-root or IELTS_AUDIO_CACHE_ROOT to audit physical cache files');
  const resolvedRoot = path.resolve(root);
  const cacheIndex = new Map();
  const artifacts = [];
  const historicalSourcePlans = [];
  let physicalSegmentFiles = 0;
  let physicalSegmentBytes = 0;

  for (const source of SOURCES) {
    const sourcePlan = historicalPlan(source);
    const sourceRow = sourcePlan.parsed.rows.find(row => row.setId === source.setId);
    assert.ok(sourceRow, `source plan has no ${source.setId}`);
    if (source.setId === 'set-4') {
      assert.equal(segmentSourceSha256(sourceRow), pilot.segment_source_sha256, 'Set 4 cache descriptors do not match the accepted pilot');
    } else if (source.setId === 'set-5') {
      assert.equal(segmentSourceSha256(sourceRow), set5Candidate.segmentSourceSha256, 'Set 5 cache descriptors do not match the preserved candidate');
    }
    historicalSourcePlans.push({
      setId: source.setId,
      manifestSha256: sourcePlan.parsed.manifestSha256,
      gitRevision: sourcePlan.revision,
      fileSha256: sourcePlan.fileSha256,
    });
    const scope = `sets-${source.setId.replace('set-', '')}`;
    const generationLogRelativePath = cacheRelative(source.generationManifestSha256, scope, 'generation-log.json');
    const generationLogPath = path.join(resolvedRoot, generationLogRelativePath);
    assert.ok(existsSync(generationLogPath), `generation log is missing: ${generationLogPath}`);
    const generationLog = readJson(generationLogPath);
    assert.equal(generationLog.manifestSha256, source.generationManifestSha256, `${source.setId} generation manifest changed`);
    assert.equal(generationLog.modelId, casting.model_id, `${source.setId} used another synthesis model`);
    assert.equal(generationLog.status, 'complete_pending_qa', `${source.setId} cache is incomplete`);
    const fileLog = generationLog.files.find(file => file.setId === source.setId);
    assert.ok(fileLog, `${source.setId} generation log has no completed file`);
    assert.equal(fileLog.sourceCharacters ?? fileLog.billableCharacters, sourceRow.sourceCharacters, `${source.setId} source character count changed`);

    const segmentsRelativeDir = cacheRelative(source.generationManifestSha256, scope, source.setId, '.segments');
    const segmentEntries = [];
    for (const [segmentIndex, segment] of sourceRow.segments.entries()) {
      const filename = `segment-${String(segmentIndex + 1).padStart(3, '0')}.mp3`;
      const relativePath = cacheRelative(segmentsRelativeDir, filename);
      const filePath = path.join(resolvedRoot, relativePath);
      assert.ok(existsSync(filePath), `cache segment is missing: ${filePath}`);
      assert.ok(isAudio(filePath), `cache segment is not valid audio: ${filePath}`);
      const bytes = statSync(filePath).size;
      assert.ok(bytes > 0, `cache segment is empty: ${filePath}`);
      const entry = {
        profile: segment.profile,
        textSha256: segment.textSha256,
        characters: segment.characters,
        sourceArtifactId: source.artifactId,
        sourceSetId: source.setId,
        sourceSegmentNumber: segmentIndex + 1,
        relativePath,
        bytes,
        audioSha256: sha256(readFileSync(filePath)),
      };
      segmentEntries.push(entry);
      physicalSegmentFiles += 1;
      physicalSegmentBytes += bytes;
      if (!cacheIndex.has(segmentKey(entry))) cacheIndex.set(segmentKey(entry), entry);
    }
    artifacts.push({
      ...source,
      sourceCharacters: sourceRow.sourceCharacters,
      sourceSegments: sourceRow.segments.length,
      generationLogRelativePath,
      generationLogSha256: sha256(readFileSync(generationLogPath)),
      segmentsRelativeDir,
      segmentBytes: segmentEntries.reduce((total, entry) => total + entry.bytes, 0),
    });
  }

  const perSet = plan.rows.map(row => {
    const matches = row.segments.filter(segment => cacheIndex.has(segmentKey(segment)));
    const unmatched = row.segments.filter(segment => !cacheIndex.has(segmentKey(segment)));
    const reusedCharacters = matches.reduce((total, segment) => total + segment.characters, 0);
    return {
      setId: row.setId,
      sourceSegments: row.segments.length,
      reusableSegmentOccurrences: matches.length,
      incrementalSegmentRequests: unmatched.length,
      sourceCharacters: row.sourceCharacters,
      reusableCharacters: reusedCharacters,
      incrementalCharacters: row.sourceCharacters - reusedCharacters,
      incrementalCredits: unmatched.reduce((total, segment) => (
        total + Math.ceil(segment.characters * plan.invoice.creditsPerCharacter)
      ), 0),
    };
  });
  const reusableSegmentOccurrences = perSet.reduce((total, row) => total + row.reusableSegmentOccurrences, 0);
  const reusableCharacters = perSet.reduce((total, row) => total + row.reusableCharacters, 0);
  const incrementalCharacters = plan.invoice.projectedMinimumCharactersAfterEditorialGate - reusableCharacters;
  const incrementalCharacterEquivalentCredits = Math.ceil(incrementalCharacters * plan.invoice.creditsPerCharacter);
  const incrementalCredits = perSet.reduce((total, row) => total + row.incrementalCredits, 0);
  const fullRequestRoundedCredits = plan.rows.reduce((total, row) => total + row.segments.reduce((rowTotal, segment) => (
    rowTotal + Math.ceil(segment.characters * plan.invoice.creditsPerCharacter)
  ), 0), 0);
  const avoidedRequestRoundedCredits = fullRequestRoundedCredits - incrementalCredits;
  const reusableUsdBeforeTax = Number((reusableCharacters / 1000 * plan.invoice.priceUsdPer1000Characters).toFixed(4));
  const incrementalUsdBeforeTax = Number((incrementalCharacters / 1000 * plan.invoice.priceUsdPer1000Characters).toFixed(4));
  const resetCreditLimit = casting.account_snapshot.character_limit;
  const waveSetIds = [
    Array.from({ length: 14 }, (_, index) => `set-${index + 4}`),
    ['set-18', 'set-19', 'set-20', 'set-1', 'set-2', 'set-3'],
  ];
  const recommendedProductionWaves = waveSetIds.map((setIds, index) => {
    const rows = setIds.map(setId => perSet.find(row => row.setId === setId));
    const waveCharacters = rows.reduce((total, row) => total + row.incrementalCharacters, 0);
    const waveCredits = rows.reduce((total, row) => total + row.incrementalCredits, 0);
    return {
      wave: index + 1,
      setIds,
      incrementalSegmentRequests: rows.reduce((total, row) => total + row.incrementalSegmentRequests, 0),
      incrementalCharacters: waveCharacters,
      conservativeCredits: waveCredits,
      usdBeforeTax: Number((waveCharacters / 1000 * plan.invoice.priceUsdPer1000Characters).toFixed(4)),
      singleResetHeadroomCredits: resetCreditLimit - waveCredits,
      generationAuthorized: false,
    };
  });
  assert.ok(recommendedProductionWaves[0].singleResetHeadroomCredits > 0, 'recommended first wave exceeds one reset');

  return {
    schemaVersion: 1,
    auditedAsOf: '2026-08-28',
    currentManifestSha256: plan.manifestSha256,
    currentVoiceConfigurationSha256: currentVoiceConfigurationSha256(),
    cacheRootPolicy: 'external; resolve relativePath entries against --cache-root or IELTS_AUDIO_CACHE_ROOT',
    historicalSourcePlans,
    artifacts,
    integrity: {
      physicalSegmentFiles,
      validAudioSegmentFiles: physicalSegmentFiles,
      physicalSegmentBytes,
      uniqueReusableSourceSegments: cacheIndex.size,
    },
    invoice: {
      fullCharacters: plan.invoice.projectedMinimumCharactersAfterEditorialGate,
      fullCharacterEquivalentCredits: plan.invoice.projectedMinimumCreditsAfterEditorialGate,
      fullRequestRoundedCredits,
      fullUsdBeforeTax: plan.invoice.projectedMinimumUsdBeforeTax,
      reusableSegmentOccurrences,
      reusableCharacters,
      avoidedRequestRoundedCredits,
      reusableUsdBeforeTax,
      incrementalCharacters,
      incrementalCharacterEquivalentCredits,
      incrementalCredits,
      incrementalUsdBeforeTax,
      retryContingencyNotIncluded: true,
    },
    capacitySnapshot: {
      capturedAt: casting.account_snapshot.captured_at,
      availableCredits: casting.account_snapshot.available_credits,
      resetCreditLimit,
      nextResetLocal: casting.account_snapshot.next_reset_local,
      incrementalCreditsExceedCurrentBalanceBy: Math.max(0, incrementalCredits - casting.account_snapshot.available_credits),
      incrementalCreditsExceedSingleResetLimitBy: Math.max(0, incrementalCredits - resetCreditLimit),
      smallestCompleteSet: {
        setId: 'set-4',
        conservativeCredits: perSet.find(row => row.setId === 'set-4').incrementalCredits,
        currentBalanceDeficit: Math.max(0, perSet.find(row => row.setId === 'set-4').incrementalCredits - casting.account_snapshot.available_credits),
      },
    },
    recommendedProductionWaves,
    perSet,
    cacheEntries: [...cacheIndex.values()],
  };
}

function assertCheckedInReport(report) {
  assert.equal(report.currentManifestSha256, plan.manifestSha256, 'cache-reuse report belongs to a stale current manifest');
  assert.equal(report.currentVoiceConfigurationSha256, currentVoiceConfigurationSha256(), 'cache-reuse report belongs to a stale casting configuration');
  assert.equal(report.invoice.fullCharacters, plan.invoice.projectedMinimumCharactersAfterEditorialGate);
  assert.equal(report.invoice.fullCharacterEquivalentCredits, plan.invoice.projectedMinimumCreditsAfterEditorialGate);
  assert.equal(report.invoice.incrementalCharacters, report.invoice.fullCharacters - report.invoice.reusableCharacters);
  assert.equal(report.invoice.incrementalCharacterEquivalentCredits, Math.ceil(report.invoice.incrementalCharacters * plan.invoice.creditsPerCharacter));
  assert.equal(report.invoice.incrementalCredits, report.perSet.reduce((total, row) => total + row.incrementalCredits, 0));
  assert.equal(report.invoice.incrementalUsdBeforeTax, Number((report.invoice.incrementalCharacters / 1000 * plan.invoice.priceUsdPer1000Characters).toFixed(4)));
  assert.equal(report.cacheEntries.length, report.integrity.uniqueReusableSourceSegments);
  assert.equal(report.perSet.length, 20);
  assert.equal(report.perSet.reduce((total, row) => total + row.reusableCharacters, 0), report.invoice.reusableCharacters);
  assert.equal(report.recommendedProductionWaves.flatMap(wave => wave.setIds).length, 20);
  assert.equal(report.recommendedProductionWaves.reduce((total, wave) => total + wave.conservativeCredits, 0), report.invoice.incrementalCredits);
}

if (has('--write')) {
  const report = buildReport(cacheRoot);
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
}

assert.ok(existsSync(outputPath), `missing checked-in cache-reuse report: ${outputPath}`);
const checkedIn = readJson(outputPath);
assertCheckedInReport(checkedIn);
if (cacheRoot) assert.deepEqual(buildReport(cacheRoot), checkedIn, 'physical IELTS cache differs from the checked-in reuse report');

console.log(JSON.stringify({
  manifestSha256: checkedIn.currentManifestSha256,
  physicalSegmentFiles: checkedIn.integrity.physicalSegmentFiles,
  uniqueReusableSourceSegments: checkedIn.integrity.uniqueReusableSourceSegments,
  reusableSegmentOccurrences: checkedIn.invoice.reusableSegmentOccurrences,
  reusableCharacters: checkedIn.invoice.reusableCharacters,
  incrementalCharacters: checkedIn.invoice.incrementalCharacters,
  incrementalCredits: checkedIn.invoice.incrementalCredits,
  incrementalUsdBeforeTax: checkedIn.invoice.incrementalUsdBeforeTax,
  singleResetCreditDeficit: checkedIn.capacitySnapshot.incrementalCreditsExceedSingleResetLimitBy,
  physicalCacheVerified: Boolean(cacheRoot),
}, null, 2));
