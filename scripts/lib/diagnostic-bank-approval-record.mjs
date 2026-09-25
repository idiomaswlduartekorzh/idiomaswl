import { createHash } from 'node:crypto';
import { posix } from 'node:path';

const SHA256 = /^[a-f0-9]{64}$/u;
const OPERATOR = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonical(child)]));
  }
  return value;
}

function hash(value) {
  return createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
}

function canonicalIso(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} is not a canonical ISO timestamp.`);
  }
}

function mergeApprovals(current, additions) {
  const byId = new Map((current ?? []).map(approval => [approval.itemId, approval]));
  for (const approval of additions ?? []) byId.set(approval.itemId, approval);
  return [...byId.values()].sort((left, right) => left.itemId.localeCompare(right.itemId));
}

export function isSafeDiagnosticReceiptReferencePath(value) {
  return typeof value === 'string'
    && value.length > 0
    && !value.includes('\\')
    && !posix.isAbsolute(value)
    && posix.normalize(value) === value
    && value.split('/').every(segment => segment && segment !== '.' && segment !== '..')
    && value.endsWith('.completed.json');
}

export function buildDiagnosticBankApprovalProposal({
  existingManifest,
  compiled,
  manifestVersion,
  receiptReferences,
}) {
  if (!manifestVersion?.trim() || manifestVersion.trim() === existingManifest?.manifestVersion) {
    throw new Error('A new diagnostic bank approval manifest version is required.');
  }
  if (!Array.isArray(receiptReferences) || receiptReferences.length < 2
    || new Set(receiptReferences.map(reference => reference.file)).size !== receiptReferences.length
    || new Set(receiptReferences.map(reference => reference.packetId)).size !== receiptReferences.length
    || receiptReferences.some(reference => !isSafeDiagnosticReceiptReferencePath(reference.file)
      || !SHA256.test(reference.sha256 ?? '')
      || typeof reference.packetId !== 'string' || !reference.packetId
      || typeof reference.role !== 'string' || !reference.role
      || typeof reference.reviewerId !== 'string' || !reference.reviewerId)) {
    throw new Error('Completed diagnostic review receipt references are incomplete, unsafe or duplicated.');
  }
  if (!compiled || compiled.incomplete?.length || compiled.changesRequested?.length
    || ((compiled.objectiveApprovals?.length ?? 0) + (compiled.writingApprovals?.length ?? 0) < 1)) {
    throw new Error('Only complete approval decisions can form a diagnostic bank proposal.');
  }
  const compiledApprovals = [...(compiled.objectiveApprovals ?? []), ...(compiled.writingApprovals ?? [])];
  if (compiledApprovals.some(approval => !SHA256.test(approval.contentSha256 ?? '')
    || !SHA256.test(approval.reviewBasisSha256 ?? ''))) {
    throw new Error('Diagnostic bank approvals must bind content and the current review basis.');
  }
  const receiptSetSha256 = hash([...receiptReferences].sort((left, right) => left.file.localeCompare(right.file)));
  const proposal = {
    proposalVersion: 'diagnostic-bank-approval-proposal-v1',
    manifestVersion: manifestVersion.trim(),
    previousManifestVersion: existingManifest?.manifestVersion ?? null,
    objectiveApprovals: mergeApprovals(existingManifest?.objectiveApprovals, compiled.objectiveApprovals),
    writingApprovals: mergeApprovals(existingManifest?.writingApprovals, compiled.writingApprovals),
    receiptSetSha256,
    sourceReceipts: [...receiptReferences].sort((left, right) => left.file.localeCompare(right.file)),
  };
  return {
    proposal,
    proposalSha256: hash(proposal),
    receiptSetSha256,
    addedObjectiveApprovals: compiled.objectiveApprovals.length,
    addedWritingApprovals: compiled.writingApprovals.length,
  };
}

export function recordDiagnosticBankApprovalProposal({ proposal, proposalSha256, appliedAt, appliedBy }) {
  if (proposal?.proposalVersion !== 'diagnostic-bank-approval-proposal-v1'
    || !SHA256.test(proposalSha256 ?? '')
    || hash(proposal) !== proposalSha256
    || !SHA256.test(proposal.receiptSetSha256 ?? '')
    || !Array.isArray(proposal.sourceReceipts)
    || proposal.sourceReceipts.length < 2) {
    throw new Error('Diagnostic bank approval proposal is invalid or changed.');
  }
  canonicalIso(appliedAt, 'diagnostic bank approval appliedAt');
  if (!OPERATOR.test(appliedBy ?? '')) throw new Error('A stable diagnostic bank approval operator identity is required.');
  return {
    manifestVersion: proposal.manifestVersion,
    updatedAt: appliedAt,
    objectiveApprovals: proposal.objectiveApprovals,
    writingApprovals: proposal.writingApprovals,
    application: {
      applicationVersion: 'diagnostic-bank-approval-application-v1',
      previousManifestVersion: proposal.previousManifestVersion,
      proposalSha256,
      receiptSetSha256: proposal.receiptSetSha256,
      sourceReceipts: proposal.sourceReceipts,
      appliedAt,
      appliedBy,
    },
  };
}
