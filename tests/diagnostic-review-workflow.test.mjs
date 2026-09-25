import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import {
  compileDiagnosticApprovals,
  createDiagnosticReviewPacket,
  validateCompletedDiagnosticReviewPacket,
} from '../scripts/lib/diagnostic-review-workflow.mjs';
import {
  buildDiagnosticBankApprovalProposal,
  isSafeDiagnosticReceiptReferencePath,
  recordDiagnosticBankApprovalProposal,
} from '../scripts/lib/diagnostic-bank-approval-record.mjs';
import { auditDiagnosticBankReviewProgress } from '../scripts/lib/diagnostic-review-progress.mjs';

const generatedAt = '2026-09-25T12:00:00.000Z';
const reading = ENGLISH_DIAGNOSTIC_READING_CANDIDATES.slice(0, 1);
const writing = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.slice(0, 1);

function complete(packet, reviewerId) {
  return {
    ...packet,
    reviewer: { id: reviewerId, affiliation: 'Independent review', attestsIndependentHumanReview: true },
    reviewedAt: generatedAt,
    entries: packet.entries.map(entry => ({
      ...entry,
      decision: 'APPROVED',
      checklist: Object.fromEntries(Object.keys(entry.checklist).map(key => [key, true])),
      comments: 'Reviewed against the declared construct.',
    })),
  };
}

function packet(role, objectiveCandidates = reading, writingCandidates = writing) {
  return createDiagnosticReviewPacket({ role, packetId: `fixture:${role}`, generatedAt, objectiveCandidates, writingCandidates });
}

function progressPacket(role, skill = 'reading') {
  return createDiagnosticReviewPacket({
    role,
    packetId: `english-bank-draft-1:A1:${skill}:${role}`,
    generatedAt,
    objectiveCandidates: skill === 'writing' ? [] : reading,
    writingCandidates: skill === 'writing' ? writing : [],
  });
}

function progressReport(skill, artifacts) {
  return auditDiagnosticBankReviewProgress({
    packageId: 'english-bank-draft-1',
    levels: ['A1'],
    skills: [skill],
    objectiveCandidates: reading,
    writingCandidates: writing,
    recordedListeningCandidates: [],
    artifacts,
  });
}

test('role packets expose only the evidence each independent reviewer needs', () => {
  const linguistic = packet('linguistic-reviewer');
  const assessment = packet('assessment-reviewer');
  assert.equal(linguistic.entries.length, 2);
  assert.equal('scoring' in linguistic.entries[0].material, false);
  assert.equal('rationale' in linguistic.entries[0].material, false);
  assert.equal('scoring' in assessment.entries[0].material, true);
  assert.equal(assessment.entries[0].decision, 'PENDING');
  assert.equal(assessment.reviewer.attestsIndependentHumanReview, false);
});

test('completed receipts remain bound to current version and hash', () => {
  const completed = complete(packet('linguistic-reviewer'), 'linguist-1');
  assert.equal(validateCompletedDiagnosticReviewPacket(completed, reading, writing).length, 2);
  const tampered = structuredClone(completed);
  tampered.entries[0].contentSha256 = '0'.repeat(64);
  assert.throws(() => validateCompletedDiagnosticReviewPacket(tampered, reading, writing), /content hash mismatch/);
  const deceptiveMaterial = structuredClone(completed);
  deceptiveMaterial.entries[0].material.publicItem.prompt = 'A different prompt shown to the reviewer';
  assert.throws(() => validateCompletedDiagnosticReviewPacket(deceptiveMaterial, reading, writing), /review material mismatch/);
});

test('approval compilation requires complete checklists and independent roles', () => {
  const linguistic = complete(packet('linguistic-reviewer'), 'linguist-1');
  const assessment = complete(packet('assessment-reviewer'), 'assessor-1');
  const signatures = [linguistic, assessment].map(receipt => validateCompletedDiagnosticReviewPacket(receipt, reading, writing));
  const compiled = compileDiagnosticApprovals(signatures);
  assert.equal(compiled.objectiveApprovals.length, 1);
  assert.equal(compiled.writingApprovals.length, 1);
  assert.equal(compiled.incomplete.length, 0);

  const samePerson = complete(packet('assessment-reviewer'), 'linguist-1');
  assert.throws(() => compileDiagnosticApprovals([
    signatures[0],
    validateCompletedDiagnosticReviewPacket(samePerson, reading, writing),
  ]), /independent identities/);
});

test('listening approval additionally requires an audio-alignment reviewer', () => {
  const recycled = ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[0];
  const reserved = { ...recycled, exposure: 'reserved', status: 'reserved', review: { status: 'draft' } };
  const candidates = [reserved];
  const linguistic = complete(packet('linguistic-reviewer', candidates, []), 'linguist-1');
  const assessment = complete(packet('assessment-reviewer', candidates, []), 'assessor-1');
  const firstTwo = [linguistic, assessment].map(receipt => validateCompletedDiagnosticReviewPacket(receipt, candidates, []));
  const incomplete = compileDiagnosticApprovals(firstTwo);
  assert.equal(incomplete.objectiveApprovals.length, 0);
  assert.deepEqual(incomplete.incomplete[0].missingRoles, ['audio-alignment-reviewer']);

  const audio = complete(packet('audio-alignment-reviewer', candidates, []), 'audio-1');
  const compiled = compileDiagnosticApprovals([
    ...firstTwo,
    validateCompletedDiagnosticReviewPacket(audio, candidates, []),
  ]);
  assert.equal(compiled.objectiveApprovals.length, 1);
  assert.equal(compiled.objectiveApprovals[0].reviewers.length, 3);
});

test('changes requested never compile into an approval', () => {
  const linguistic = complete(packet('linguistic-reviewer'), 'linguist-1');
  linguistic.entries[0] = { ...linguistic.entries[0], decision: 'CHANGES_REQUESTED', comments: 'The target level is not defensible.' };
  const assessment = complete(packet('assessment-reviewer'), 'assessor-1');
  const compiled = compileDiagnosticApprovals([
    validateCompletedDiagnosticReviewPacket(linguistic, reading, writing),
    validateCompletedDiagnosticReviewPacket(assessment, reading, writing),
  ]);
  assert.deepEqual(compiled.changesRequested, ['objective:en-a1-reading-01-q1']);
  assert.equal(compiled.objectiveApprovals.length, 0);
  assert.equal(compiled.writingApprovals.length, 1);
});

test('bank approval proposal binds completed private receipts and merges without silent loss', () => {
  const objectiveApproval = {
    itemId: 'new-objective', contentVersion: 'v1', contentSha256: 'a'.repeat(64), reviewedAt: generatedAt,
    reviewers: [{ id: 'linguist-1', role: 'linguistic-reviewer' }, { id: 'assessor-1', role: 'assessment-reviewer' }],
  };
  const writingApproval = {
    itemId: 'new-writing', contentVersion: 'v1', contentSha256: 'b'.repeat(64), reviewedAt: generatedAt,
    reviewers: [{ id: 'linguist-1', role: 'linguistic-reviewer' }, { id: 'assessor-1', role: 'assessment-reviewer' }],
  };
  const receiptReferences = [
    { file: 'review-packets/a1-reading/linguistic.completed.json', sha256: '1'.repeat(64), packetId: 'packet:linguistic', role: 'linguistic-reviewer', reviewerId: 'linguist-1' },
    { file: 'review-packets/a1-reading/assessment.completed.json', sha256: '2'.repeat(64), packetId: 'packet:assessment', role: 'assessment-reviewer', reviewerId: 'assessor-1' },
  ];
  const built = buildDiagnosticBankApprovalProposal({
    existingManifest: {
      manifestVersion: 'previous-v1', objectiveApprovals: [{ ...objectiveApproval, itemId: 'existing-objective' }], writingApprovals: [],
    },
    compiled: { objectiveApprovals: [objectiveApproval], writingApprovals: [writingApproval], incomplete: [], changesRequested: [] },
    manifestVersion: 'next-v2',
    receiptReferences,
  });
  assert.equal(built.proposal.objectiveApprovals.length, 2);
  assert.equal(built.proposal.writingApprovals.length, 1);
  assert.equal(built.proposal.sourceReceipts.length, 2);
  assert.match(built.proposalSha256, /^[a-f0-9]{64}$/u);
  assert.match(built.receiptSetSha256, /^[a-f0-9]{64}$/u);
  const manifest = recordDiagnosticBankApprovalProposal({
    proposal: built.proposal,
    proposalSha256: built.proposalSha256,
    appliedAt: '2026-09-25T13:00:00.000Z',
    appliedBy: 'release-operator',
  });
  assert.equal(manifest.manifestVersion, 'next-v2');
  assert.equal(manifest.application.proposalSha256, built.proposalSha256);
  assert.equal(manifest.application.appliedBy, 'release-operator');
});

test('bank approval proposal rejects templates, incomplete decisions and post-review tampering', () => {
  const compiled = {
    objectiveApprovals: [{
      itemId: 'objective', contentVersion: 'v1', contentSha256: 'a'.repeat(64), reviewedAt: generatedAt,
      reviewers: [{ id: 'linguist-1', role: 'linguistic-reviewer' }, { id: 'assessor-1', role: 'assessment-reviewer' }],
    }],
    writingApprovals: [], incomplete: [], changesRequested: [],
  };
  const base = {
    existingManifest: { manifestVersion: 'previous-v1', objectiveApprovals: [], writingApprovals: [] },
    compiled,
    manifestVersion: 'next-v2',
    receiptReferences: [
      { file: 'linguistic.completed.json', sha256: '1'.repeat(64), packetId: 'p1', role: 'linguistic-reviewer', reviewerId: 'linguist-1' },
      { file: 'assessment.completed.json', sha256: '2'.repeat(64), packetId: 'p2', role: 'assessment-reviewer', reviewerId: 'assessor-1' },
    ],
  };
  assert.throws(() => buildDiagnosticBankApprovalProposal({
    ...base,
    receiptReferences: [{ ...base.receiptReferences[0], file: 'linguistic.template.json' }, base.receiptReferences[1]],
  }), /incomplete, unsafe or duplicated/);
  assert.throws(() => buildDiagnosticBankApprovalProposal({
    ...base, compiled: { ...compiled, incomplete: [{ identity: 'objective', missingRoles: ['assessment-reviewer'] }] },
  }), /Only complete approval decisions/);
  const built = buildDiagnosticBankApprovalProposal(base);
  assert.throws(() => recordDiagnosticBankApprovalProposal({
    proposal: { ...built.proposal, manifestVersion: 'tampered' }, proposalSha256: built.proposalSha256,
    appliedAt: '2026-09-25T13:00:00.000Z', appliedBy: 'release-operator',
  }), /invalid or changed/);
});

test('bank approval recorder is private, clean-tree, dry-run and confirmation bound', () => {
  const source = readFileSync(new URL('../scripts/record-diagnostic-bank-approvals.mjs', import.meta.url), 'utf8');
  assert.match(source, /Completed review receipts must stay below \.diagnostic-private/);
  assert.match(source, /\.completed\.json/);
  assert.match(source, /requires a clean working tree/);
  assert.match(source, /Dry run only/);
  assert.match(source, /APPLY_DIAGNOSTIC_BANK_APPROVALS/);
  assert.match(source, /--write/);
  assert.match(source, /--applied-by/);
  assert.match(source, /--review-root/);
  assert.match(source, /report-diagnostic-bank-review-progress\.mjs/);
  assert.match(source, /--strict/);
  assert.match(source, /argument !== '--'/);
  assert.match(source, /renameSync/);
});

test('receipt references permit unique private subpaths but reject traversal and platform escapes', () => {
  assert.equal(isSafeDiagnosticReceiptReferencePath('review-packets/a1-reading/linguistic.completed.json'), true);
  assert.equal(isSafeDiagnosticReceiptReferencePath('linguistic.completed.json'), true);
  assert.equal(isSafeDiagnosticReceiptReferencePath('../outside.completed.json'), false);
  assert.equal(isSafeDiagnosticReceiptReferencePath('/absolute.completed.json'), false);
  assert.equal(isSafeDiagnosticReceiptReferencePath('review-packets\\escape.completed.json'), false);
  assert.equal(isSafeDiagnosticReceiptReferencePath('review-packets/a/../escape.completed.json'), false);
  assert.equal(isSafeDiagnosticReceiptReferencePath('review-packets/a.template.json'), false);
});

test('review progress counts current templates without treating them as completed receipts', () => {
  const artifacts = ['linguistic-reviewer', 'assessment-reviewer'].map(role => ({
    level: 'A1', skill: 'reading', role, state: 'template', packet: progressPacket(role),
  }));
  const report = progressReport('reading', artifacts);
  assert.equal(report.decision, 'REVIEW_IN_PROGRESS');
  assert.equal(report.summary.expectedBatches, 1);
  assert.equal(report.summary.currentTemplates, 2);
  assert.equal(report.summary.currentCompletedReceipts, 0);
  assert.equal(report.summary.missingCompletedReceipts, 2);
  assert.equal(report.summary.batchesReadyToCompile, 0);
  assert.equal(report.listening.status, 'NOT_BATCHABLE_RECORDED_CANDIDATES_MISSING');
});

test('review progress becomes ready only with current complete receipts and independent identities', () => {
  const artifacts = [
    {
      level: 'A1', skill: 'writing', role: 'linguistic-reviewer', state: 'completed',
      packet: complete(progressPacket('linguistic-reviewer', 'writing'), 'linguist-private-id'),
    },
    {
      level: 'A1', skill: 'writing', role: 'assessment-reviewer', state: 'completed',
      packet: complete(progressPacket('assessment-reviewer', 'writing'), 'assessor-private-id'),
    },
  ];
  const report = progressReport('writing', artifacts);
  assert.equal(report.decision, 'READY_TO_COMPILE');
  assert.equal(report.summary.batchesReadyToCompile, 1);
  assert.equal(report.cells[0].independentReviewerIdentities, true);
  assert.doesNotMatch(JSON.stringify(report), /linguist-private-id|assessor-private-id/u);
});

test('review progress fails closed for stale content and duplicate reviewer identity', () => {
  const stale = complete(progressPacket('linguistic-reviewer'), 'reviewer-1');
  stale.entries[0].contentSha256 = '0'.repeat(64);
  const staleReport = progressReport('reading', [{
    level: 'A1', skill: 'reading', role: 'linguistic-reviewer', state: 'completed', packet: stale,
  }]);
  assert.equal(staleReport.decision, 'INVALID');
  assert.equal(staleReport.cells[0].roles[0].validationCode, 'STALE_CONTENT_HASH');

  const sameIdentityReport = progressReport('reading', [
    {
      level: 'A1', skill: 'reading', role: 'linguistic-reviewer', state: 'completed',
      packet: complete(progressPacket('linguistic-reviewer'), 'same-private-id'),
    },
    {
      level: 'A1', skill: 'reading', role: 'assessment-reviewer', state: 'completed',
      packet: complete(progressPacket('assessment-reviewer'), 'same-private-id'),
    },
  ]);
  assert.equal(sameIdentityReport.decision, 'INVALID');
  assert.equal(sameIdentityReport.cells[0].independentReviewerIdentities, false);
  assert.equal(sameIdentityReport.summary.independentIdentityViolations, 1);
  assert.doesNotMatch(JSON.stringify(sameIdentityReport), /same-private-id/u);
});

test('review progress keeps changes requested distinct from invalid receipts', () => {
  const linguistic = complete(progressPacket('linguistic-reviewer'), 'linguist-1');
  linguistic.entries[0] = {
    ...linguistic.entries[0],
    decision: 'CHANGES_REQUESTED',
    comments: 'The language demand needs a more defensible revision.',
  };
  const report = progressReport('reading', [
    { level: 'A1', skill: 'reading', role: 'linguistic-reviewer', state: 'completed', packet: linguistic },
    {
      level: 'A1', skill: 'reading', role: 'assessment-reviewer', state: 'completed',
      packet: complete(progressPacket('assessment-reviewer'), 'assessor-1'),
    },
  ]);
  assert.equal(report.decision, 'REVIEW_IN_PROGRESS');
  assert.equal(report.cells[0].status, 'CHANGES_REQUESTED');
  assert.equal(report.summary.batchesWithChangesRequested, 1);
  assert.equal(report.summary.changesRequestedEntrySignatures, 1);
});

test('review progress rejects unexpected cells and duplicate artifacts', () => {
  const artifact = {
    level: 'A1', skill: 'reading', role: 'linguistic-reviewer', state: 'template',
    packet: progressPacket('linguistic-reviewer'),
  };
  assert.throws(() => progressReport('reading', [{ ...artifact, skill: 'grammar' }]), /UNEXPECTED_REVIEW_CELL/);
  assert.throws(() => progressReport('reading', [artifact, structuredClone(artifact)]), /DUPLICATE_REVIEW_ARTIFACT/);
});

test('review progress rejects a deceptive template view even when its copied hash is current', () => {
  const deceptive = structuredClone(progressPacket('linguistic-reviewer'));
  deceptive.entries[0].material.publicItem.prompt = 'A different prompt shown to the reviewer';
  const report = progressReport('reading', [{
    level: 'A1', skill: 'reading', role: 'linguistic-reviewer', state: 'template', packet: deceptive,
  }]);
  assert.equal(report.decision, 'INVALID');
  assert.equal(report.cells[0].roles[0].validationCode, 'REVIEW_MATERIAL_MISMATCH');
});
