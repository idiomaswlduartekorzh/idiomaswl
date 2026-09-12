import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const sha256 = value => createHash('sha256').update(value).digest('hex');
const readJson = file => JSON.parse(readFileSync(file, 'utf8'));
const sameSets = (actual, expected, label) => {
  assert.deepEqual(actual, expected, `${label} set list differs from the frozen replacement manifest`);
  assert.equal(new Set(actual).size, actual.length, `${label} contains duplicate sets`);
};

const verifyDigest = (document, field, label) => {
  const { [field]: recorded, ...core } = document;
  assert.equal(sha256(JSON.stringify(core)), recorded, `${label} digest is stale`);
  return recorded;
};

export function verifyIeltsLegacyPublicationDocuments({
  manifest,
  castingSha256,
  approval,
  receipt,
  publicAudioSha256ByUrl,
}) {
  const { manifestSha256, ...manifestCore } = manifest;
  assert.equal(sha256(JSON.stringify(manifestCore)), manifestSha256, 'Legacy replacement manifest digest is stale');

  const { approvalSha256, ...approvalCore } = approval;
  assert.equal(sha256(JSON.stringify(approvalCore)), approvalSha256, 'Legacy replacement quality approval digest is stale');
  assert.equal(approval.status, 'APPROVED', 'Legacy replacement quality approval is not approved');
  assert.equal(approval.manifestSha256, manifestSha256, 'Legacy replacement approval belongs to another manifest');
  assert.equal(approval.castingSha256, castingSha256, 'Legacy replacement approval belongs to another casting policy');
  assert.equal(approval.releaseAuthorized, false, 'Quality approval must remain separate from publication authorization');

  const { receiptSha256, ...receiptCore } = receipt;
  assert.equal(sha256(JSON.stringify(receiptCore)), receiptSha256, 'Legacy replacement publish receipt digest is stale');
  assert.equal(receipt.status, 'PUBLISHED', 'Legacy replacement publish receipt is not final');
  assert.equal(receipt.manifestSha256, manifestSha256, 'Legacy replacement receipt belongs to another manifest');
  assert.equal(receipt.castingSha256, castingSha256, 'Legacy replacement receipt belongs to another casting policy');
  assert.equal(receipt.qualityApprovalSha256, approvalSha256, 'Legacy replacement receipt belongs to another quality approval');
  assert.equal(receipt.releaseAuthorized, true, 'Legacy replacement receipt lacks publication authorization');
  assert.equal(receipt.authorization?.kind, 'human', 'Legacy replacement publication requires human authorization');

  const manifestSets = manifest.rows.map(row => row.set);
  sameSets(approval.includedSets, manifestSets, 'Quality approval');
  sameSets(approval.files.map(file => file.set), manifestSets, 'Quality approval files');
  sameSets(receipt.files.map(file => file.set), manifestSets, 'Publish receipt files');
  assert.equal(receipt.authorization.approvedCopyCount, manifestSets.length, 'Approved publication count is stale');

  const publicationBySet = new Map();
  for (const row of manifest.rows) {
    const approved = approval.files.find(file => file.set === row.set);
    const published = receipt.files.find(file => file.set === row.set);
    assert.ok(approved && published, `Set ${row.set}: publication chain is incomplete`);
    assert.equal(approved.source, 'STAGED_LEGACY_REPLACEMENT', `Set ${row.set}: unexpected approved source`);
    assert.equal(approved.technicalStatus, 'PASS', `Set ${row.set}: technical QA was not approved`);
    assert.equal(approved.asrStatus, 'PASS', `Set ${row.set}: ASR QA was not approved`);
    const coverage = approved.completionEvidence?.match(/^(\d+)\/(\d+)$/u);
    assert.ok(coverage && coverage[1] === coverage[2] && Number(coverage[2]) > 0, `Set ${row.set}: completion coverage is incomplete`);
    assert.equal(published.result, 'PUBLISHED', `Set ${row.set}: receipt does not record a completed copy`);
    assert.equal(published.audioUrl, row.audioUrl, `Set ${row.set}: receipt targets a different public route`);
    assert.equal(published.audioSha256, approved.audioSha256, `Set ${row.set}: published hash differs from approved staging`);
    assert.equal(publicAudioSha256ByUrl.get(row.audioUrl), published.audioSha256, `Set ${row.set}: public MP3 differs from its receipt`);
    publicationBySet.set(row.set, {
      status: 'PUBLISHED_HASH_VERIFIED',
      source: approved.source,
      audioUrl: row.audioUrl,
      audioSha256: published.audioSha256,
      previousSha256: published.previousSha256,
      manifestSha256,
      qualityApprovalSha256: approvalSha256,
      publishReceiptSha256: receiptSha256,
      automaticQa: {
        technicalStatus: approved.technicalStatus,
        asrStatus: approved.asrStatus,
        completionEvidence: approved.completionEvidence,
      },
      humanQualityApproval: true,
      fullQ40Evidence: false,
      releaseReady: false,
    });
  }
  return publicationBySet;
}

export function verifyIeltsApprovedBatchPublicationDocuments({
  manifest,
  repairManifest,
  castingSha256,
  approval,
  baseline,
  receipt,
  publicAudioSha256ByUrl,
}) {
  const manifestSha256 = verifyDigest(manifest, 'manifestSha256', 'Production manifest');
  const repairManifestSha256 = verifyDigest(repairManifest, 'repairManifestSha256', 'Repair manifest');
  const approvalSha256 = verifyDigest(approval, 'approvalSha256', 'Batch quality approval');
  const baselineSha256 = verifyDigest(baseline, 'baselineSha256', 'Pre-publication baseline');
  const receiptSha256 = verifyDigest(receipt, 'receiptSha256', 'Approved batch publish receipt');

  assert.equal(approval.status, 'APPROVED', 'Batch quality approval is not approved');
  assert.equal(approval.reviewer?.kind, 'human', 'Batch quality approval requires a human reviewer');
  assert.equal(approval.productionManifestSha256, manifestSha256, 'Batch approval belongs to another production manifest');
  assert.equal(approval.repairManifestSha256, repairManifestSha256, 'Batch approval belongs to another repair manifest');
  assert.equal(approval.castingSha256, castingSha256, 'Batch approval belongs to another casting policy');
  assert.equal(approval.releaseAuthorized, false, 'Batch quality approval must remain separate from publication authorization');

  assert.equal(baseline.productionManifestSha256, manifestSha256, 'Pre-publication baseline belongs to another production manifest');
  assert.equal(baseline.releaseAuthorized, false, 'Pre-publication baseline cannot authorize release');

  assert.equal(receipt.status, 'PUBLISHED', 'Approved batch publish receipt is not final');
  assert.equal(receipt.productionManifestSha256, manifestSha256, 'Approved batch receipt belongs to another production manifest');
  assert.equal(receipt.repairManifestSha256, repairManifestSha256, 'Approved batch receipt belongs to another repair manifest');
  assert.equal(receipt.castingSha256, castingSha256, 'Approved batch receipt belongs to another casting policy');
  assert.equal(receipt.qualityApprovalSha256, approvalSha256, 'Approved batch receipt belongs to another quality approval');
  assert.equal(receipt.releaseAuthorized, true, 'Approved batch receipt lacks publication authorization');
  assert.equal(receipt.authorization?.kind, 'human', 'Approved batch publication requires human authorization');

  const approvedSets = approval.includedSets;
  sameSets(approval.files.map(file => file.set), approvedSets, 'Batch quality approval files');
  sameSets(baseline.rows.map(row => row.set), approvedSets, 'Pre-publication baseline');
  sameSets(receipt.files.map(file => file.set), approvedSets, 'Approved batch publish receipt');
  assert.equal(receipt.authorization.approvedCopyCount, approvedSets.length, 'Approved batch publication count is stale');

  const publicationBySet = new Map();
  for (const approved of approval.files) {
    const manifestRow = manifest.rows.find(row => row.set === approved.set);
    const previous = baseline.rows.find(row => row.set === approved.set);
    const published = receipt.files.find(row => row.set === approved.set);
    assert.ok(manifestRow && previous && published, `Set ${approved.set}: approved publication chain is incomplete`);
    assert.ok(['STAGED_NEW', 'STAGED_REPAIR'].includes(approved.source), `Set ${approved.set}: unsupported approved source`);
    assert.ok(['PUBLISHED', 'ALREADY_PUBLISHED'].includes(published.result), `Set ${approved.set}: receipt does not record a completed copy`);
    assert.equal(published.source, approved.source, `Set ${approved.set}: receipt source differs from approval`);
    assert.equal(published.audioUrl, manifestRow.audioUrl, `Set ${approved.set}: receipt targets a different public route`);
    assert.equal(published.previousSha256, previous.audioSha256, `Set ${approved.set}: receipt differs from the frozen public baseline`);
    assert.equal(published.audioSha256, approved.audioSha256, `Set ${approved.set}: published hash differs from approved staging`);
    assert.equal(publicAudioSha256ByUrl.get(published.audioUrl), published.audioSha256, `Set ${approved.set}: public MP3 differs from its receipt`);
    publicationBySet.set(approved.set, {
      status: 'PUBLISHED_HASH_VERIFIED',
      source: approved.source,
      audioUrl: published.audioUrl,
      audioSha256: published.audioSha256,
      previousSha256: published.previousSha256,
      manifestSha256,
      repairManifestSha256,
      qualityApprovalSha256: approvalSha256,
      publishReceiptSha256: receiptSha256,
      publicBaselineSha256: baselineSha256,
      automaticQa: {
        technicalStatus: 'PASS_AT_PUBLICATION_GATE',
        asrStatus: 'PASS_AT_PUBLICATION_GATE',
        completionEvidence: 'COMPLETE_AT_PUBLICATION_GATE',
      },
      humanQualityApproval: true,
      fullQ40Evidence: false,
      releaseReady: false,
    });
  }
  return publicationBySet;
}

function stagedEvidenceBySet(root, manifest, castingSha256) {
  const outputRoot = path.join(root, 'output', manifest.outputNamespace, manifest.manifestSha256);
  if (!existsSync(outputRoot)) return new Map();
  const staged = new Map();
  for (const name of readdirSync(outputRoot)) {
    const batch = path.join(outputRoot, name);
    const generationPath = path.join(batch, 'generation-log.json');
    const technicalPath = path.join(batch, 'technical-qa.json');
    if (!existsSync(generationPath) || !existsSync(technicalPath)) continue;
    const generation = readJson(generationPath);
    const technical = readJson(technicalPath);
    for (const file of generation.files ?? []) {
      const technicalFile = technical.files?.find(candidate => candidate.setId === file.setId);
      const setDirectory = path.join(batch, file.setId);
      const qaPath = path.join(setDirectory, `staged-asr-qa-set-${file.set}.json`);
      const audioPath = path.join(setDirectory, path.basename(file.path));
      const qa = existsSync(qaPath) ? readJson(qaPath) : null;
      const audioSha256 = existsSync(audioPath) ? sha256(readFileSync(audioPath)) : null;
      const technicalChecks = technicalFile?.checks ? Object.values(technicalFile.checks).every(Boolean) : false;
      staged.set(file.set, {
        available: Boolean(audioSha256 && qa && technicalFile),
        audioSha256,
        generationHashMatches: audioSha256 === file.audioSha256,
        castingMatches: generation.castingSha256 === castingSha256
          && technical.castingSha256 === castingSha256
          && qa?.castingSha256 === castingSha256,
        manifestMatches: generation.manifestSha256 === manifest.manifestSha256
          && technical.manifestSha256 === manifest.manifestSha256
          && qa?.manifestSha256 === manifest.manifestSha256,
        technicalPassed: technical.status === 'technical_qa_passed_pending_transcript_and_owner_listening_review'
          && technicalFile.audioSha256 === file.audioSha256
          && technicalChecks,
        asrPassed: qa?.status === 'PASS'
          && qa.audioSha256 === file.audioSha256
          && qa.effectiveCompletionEvidence === '33/33',
      });
    }
  }
  return staged;
}

export function loadVerifiedIeltsLegacyPublications(root) {
  const configRoot = path.join(root, 'config/ielts-audio');
  const manifest = readJson(path.join(configRoot, 'legacy-replacement-manifest.json'));
  const castingBytes = readFileSync(path.join(configRoot, 'legacy-replacement-casting.json'));
  const castingSha256 = sha256(castingBytes);
  const approval = readJson(path.join(configRoot, 'legacy-replacement-quality-approval.json'));
  const receipt = readJson(path.join(configRoot, 'legacy-replacement-publish-receipt.json'));
  const publicAudioSha256ByUrl = new Map(manifest.rows.map(row => {
    const relative = row.audioUrl.replace(/^\/+/, '');
    assert.match(relative, /^audio\/ielts\/ielts-listening-set-\d+\.mp3$/u, `Set ${row.set}: unsafe public audio route`);
    const publicPath = path.join(root, 'public', relative);
    return [row.audioUrl, existsSync(publicPath) ? sha256(readFileSync(publicPath)) : null];
  }));
  const publicationBySet = verifyIeltsLegacyPublicationDocuments({
    manifest,
    castingSha256,
    approval,
    receipt,
    publicAudioSha256ByUrl,
  });
  const stagedBySet = stagedEvidenceBySet(root, manifest, castingSha256);
  for (const [setNumber, publication] of publicationBySet) {
    const staged = stagedBySet.get(setNumber) ?? null;
    if (staged?.available) {
      assert.equal(staged.audioSha256, publication.audioSha256, `Set ${setNumber}: staged master differs from published receipt`);
      assert.ok(staged.generationHashMatches, `Set ${setNumber}: generation hash is stale`);
      assert.ok(staged.castingMatches, `Set ${setNumber}: staged casting evidence is stale`);
      assert.ok(staged.manifestMatches, `Set ${setNumber}: staged manifest evidence is stale`);
      assert.ok(staged.technicalPassed, `Set ${setNumber}: staged technical QA is incomplete`);
      assert.ok(staged.asrPassed, `Set ${setNumber}: staged ASR QA is incomplete`);
    }
    publicationBySet.set(setNumber, {
      ...publication,
      stagingEvidenceAvailable: Boolean(staged?.available),
      stagingVerified: staged?.available ? true : null,
    });
  }
  return {
    manifestSha256: manifest.manifestSha256,
    receiptSha256: receipt.receiptSha256,
    publicationBySet,
  };
}

export function loadVerifiedIeltsAudioPublications(root) {
  const legacy = loadVerifiedIeltsLegacyPublications(root);
  const configRoot = path.join(root, 'config/ielts-audio');
  const manifest = readJson(path.join(configRoot, 'production-manifest.json'));
  const repairManifest = readJson(path.join(configRoot, 'repair-manifest.json'));
  const castingSha256 = sha256(readFileSync(path.join(configRoot, 'voice-casting.json')));
  const approval = readJson(path.join(configRoot, 'batch-quality-approval.json'));
  const baseline = readJson(path.join(configRoot, 'approved-batch-public-baseline.json'));
  const receipt = readJson(path.join(configRoot, 'approved-batch-publish-receipt.json'));
  const publicAudioSha256ByUrl = new Map(receipt.files.map(file => {
    const relative = file.audioUrl.replace(/^\/+/, '');
    assert.match(relative, /^audio\/ielts\/ielts-listening-set-\d+\.mp3$/u, `Set ${file.set}: unsafe public audio route`);
    const publicPath = path.join(root, 'public', relative);
    return [file.audioUrl, existsSync(publicPath) ? sha256(readFileSync(publicPath)) : null];
  }));
  const approvedBatch = verifyIeltsApprovedBatchPublicationDocuments({
    manifest,
    repairManifest,
    castingSha256,
    approval,
    baseline,
    receipt,
    publicAudioSha256ByUrl,
  });
  const publicationBySet = new Map([...legacy.publicationBySet, ...approvedBatch]);
  assert.deepEqual([...publicationBySet.keys()].sort((left, right) => left - right), Array.from({ length: 20 }, (_, index) => index + 1), 'Verified publication receipts do not cover IELTS Sets 1-20 exactly');
  return {
    legacyManifestSha256: legacy.manifestSha256,
    legacyReceiptSha256: legacy.receiptSha256,
    approvedBatchReceiptSha256: receipt.receiptSha256,
    publicationBySet,
  };
}
