import { createHash } from 'node:crypto';

export const DIAGNOSTIC_A1_AUDIO_PILOT_SCOPE = 'diagnostic-a1-audio-pilot-v1';
export const DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS = [
  'en-a1-listening-original-01',
  'en-a1-listening-original-02',
  'en-a1-listening-original-04',
];
export const DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT = 1_424;
export const DIAGNOSTIC_A1_AUDIO_PILOT_BILLABLE_CHARACTERS = 712;

const SHA256 = /^[a-f0-9]{64}$/u;
const REVIEWER = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
const APPROVAL_CHECKS = [
  'voicesReviewed',
  'scopeLimitedToThreeFiles',
  'maximumCreditDebitAccepted',
  'privateStagingOnly',
  'noPublicationAuthorized',
];

function canonicalIso(value, label) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))
    || new Date(Date.parse(value)).toISOString() !== value) {
    throw new Error(`${label} is not a canonical ISO timestamp.`);
  }
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonical(child)]));
  }
  return value;
}

export function assertDiagnosticA1AudioPilotInvoice(invoice) {
  if (invoice?.files !== 3
    || invoice.requestSegments !== 6
    || invoice.billableCharacters !== DIAGNOSTIC_A1_AUDIO_PILOT_BILLABLE_CHARACTERS
    || invoice.estimatedMaximumCreditDebit !== DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT
    || !SHA256.test(invoice.packageSha256 ?? '')
    || !Array.isArray(invoice.profiles)
    || invoice.profiles.length !== 4) {
    throw new Error('A1 audio pilot invoice changed outside its authorized scope.');
  }
  return invoice;
}

export function diagnosticA1AudioPilotAuthorization(invoice) {
  assertDiagnosticA1AudioPilotInvoice(invoice);
  return `GENERATE_DIAGNOSTIC_A1_AUDIO_PILOT:${invoice.packageSha256}:FILES_3:MAX_CREDITS_${DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT}`;
}

export function diagnosticA1AudioPilotProposal(casting, invoice) {
  assertDiagnosticA1AudioPilotInvoice(invoice);
  const profiles = invoice.profiles.map(profile => {
    const configured = casting?.profiles?.[profile];
    if (!configured || typeof configured.voiceId !== 'string' || !configured.voiceId
      || typeof configured.voiceName !== 'string' || !configured.voiceName
      || typeof configured.sourceProfile !== 'string' || !configured.sourceProfile) {
      throw new Error(`A1 audio pilot casting profile ${profile} is incomplete.`);
    }
    return {
      profile,
      voiceId: configured.voiceId,
      voiceName: configured.voiceName,
      sourceProfile: configured.sourceProfile,
    };
  });
  const proposal = {
    scopeVersion: DIAGNOSTIC_A1_AUDIO_PILOT_SCOPE,
    castingVersion: casting.castingVersion,
    packageSha256: invoice.packageSha256,
    modelId: invoice.modelId,
    mediaIds: DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS,
    files: invoice.files,
    requestSegments: invoice.requestSegments,
    billableCharacters: invoice.billableCharacters,
    maximumCreditDebit: DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT,
    outputFormat: casting.outputFormat,
    target: casting.target,
    profiles,
    constraints: {
      privateStagingOnly: true,
      publicationAuthorized: false,
      fullCastingApprovalGranted: false,
    },
  };
  return {
    proposal,
    proposalSha256: createHash('sha256').update(JSON.stringify(canonical(proposal))).digest('hex'),
  };
}

export function buildDiagnosticA1AudioPilotApprovalPacket({ casting, invoice, generatedAt }) {
  canonicalIso(generatedAt, 'audio pilot approval generatedAt');
  const { proposal, proposalSha256 } = diagnosticA1AudioPilotProposal(casting, invoice);
  return {
    receiptVersion: 'diagnostic-a1-audio-pilot-owner-review-v1',
    scopeVersion: DIAGNOSTIC_A1_AUDIO_PILOT_SCOPE,
    proposalSha256,
    generatedAt,
    role: 'owner',
    reviewerId: null,
    decision: null,
    reviewedAt: null,
    attestation: false,
    checks: Object.fromEntries(APPROVAL_CHECKS.map(check => [check, false])),
    comments: null,
    proposal,
    instructions: [
      'Listen to or otherwise verify the four proposed voice identities for this diagnostic cata.',
      'APPROVE authorizes only the exact three-file private A1 pilot and its 1,424-credit ceiling.',
      'This receipt never approves publication or the full 36-recording casting.',
      'Set attestation=true only under a stable owner identity.',
    ],
  };
}

export function validateDiagnosticA1AudioPilotApprovalReceipt({ receipt, casting, invoice }) {
  const { proposal, proposalSha256 } = diagnosticA1AudioPilotProposal(casting, invoice);
  if (receipt?.receiptVersion !== 'diagnostic-a1-audio-pilot-owner-review-v1'
    || receipt.scopeVersion !== DIAGNOSTIC_A1_AUDIO_PILOT_SCOPE
    || receipt.proposalSha256 !== proposalSha256
    || JSON.stringify(receipt.proposal) !== JSON.stringify(proposal)
    || receipt.role !== 'owner'
    || !REVIEWER.test(receipt.reviewerId ?? '')
    || !['APPROVE', 'REJECT'].includes(receipt.decision)
    || receipt.attestation !== true) {
    throw new Error('A1 audio pilot owner review is incomplete or belongs to another proposal.');
  }
  canonicalIso(receipt.reviewedAt, 'audio pilot reviewedAt');
  if (receipt.decision === 'APPROVE'
    && (Object.keys(receipt.checks ?? {}).sort().join('|') !== [...APPROVAL_CHECKS].sort().join('|')
      || APPROVAL_CHECKS.some(check => receipt.checks[check] !== true))) {
    throw new Error('A1 audio pilot approval requires every scope and safety check.');
  }
  if (receipt.decision === 'REJECT'
    && (typeof receipt.comments !== 'string' || receipt.comments.trim().length < 10)) {
    throw new Error('A1 audio pilot rejection requires concrete comments.');
  }
  return { receipt, proposalSha256 };
}

export function recordDiagnosticA1AudioPilotApproval({
  casting,
  invoice,
  receipt,
  receiptSha256,
  appliedAt,
  appliedBy,
}) {
  const validated = validateDiagnosticA1AudioPilotApprovalReceipt({ receipt, casting, invoice });
  if (receipt.decision !== 'APPROVE') throw new Error('A rejected A1 audio pilot review cannot be applied.');
  if (!SHA256.test(receiptSha256 ?? '')) throw new Error('A1 audio pilot approval receipt hash is invalid.');
  canonicalIso(appliedAt, 'audio pilot appliedAt');
  if (!REVIEWER.test(appliedBy ?? '')) throw new Error('A stable audio pilot operator identity is required.');
  return {
    ...casting,
    pilotApproval: {
      scopeVersion: DIAGNOSTIC_A1_AUDIO_PILOT_SCOPE,
      status: 'approved_by_owner',
      proposalSha256: validated.proposalSha256,
      packageSha256: invoice.packageSha256,
      approvedProfiles: [...invoice.profiles],
      maximumCreditDebit: DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT,
      privateStagingOnly: true,
      publicationAuthorized: false,
      approvalReceiptSha256: receiptSha256,
      approvedAt: receipt.reviewedAt,
      approvedBy: receipt.reviewerId,
      appliedAt,
      appliedBy,
    },
  };
}

export function diagnosticA1AudioPilotCastingReadiness(casting, invoice) {
  let proposalSha256 = null;
  try {
    proposalSha256 = diagnosticA1AudioPilotProposal(casting, invoice).proposalSha256;
  } catch (cause) {
    return { ready: false, proposalSha256, blockers: [cause instanceof Error ? cause.message : 'invalid proposal'] };
  }
  const approval = casting?.pilotApproval;
  const blockers = [];
  if (approval?.scopeVersion !== DIAGNOSTIC_A1_AUDIO_PILOT_SCOPE) blockers.push('PILOT_CAST_SCOPE_NOT_APPROVED');
  if (approval?.status !== 'approved_by_owner') blockers.push('PILOT_CAST_NOT_APPROVED_BY_OWNER');
  if (approval?.proposalSha256 !== proposalSha256
    || approval?.packageSha256 !== invoice.packageSha256) blockers.push('PILOT_CAST_APPROVAL_STALE');
  if (approval?.maximumCreditDebit !== DIAGNOSTIC_A1_AUDIO_PILOT_MAX_CREDIT_DEBIT
    || approval?.privateStagingOnly !== true
    || approval?.publicationAuthorized !== false) blockers.push('PILOT_CAST_SCOPE_INVALID');
  if (JSON.stringify(approval?.approvedProfiles) !== JSON.stringify(invoice.profiles)) {
    blockers.push('PILOT_CAST_PROFILE_SET_MISMATCH');
  }
  if (!SHA256.test(approval?.approvalReceiptSha256 ?? '')) blockers.push('PILOT_CAST_RECEIPT_MISSING');
  try {
    canonicalIso(approval?.approvedAt, 'audio pilot approvedAt');
    canonicalIso(approval?.appliedAt, 'audio pilot appliedAt');
  } catch {
    blockers.push('PILOT_CAST_APPROVAL_DATE_INVALID');
  }
  if (!REVIEWER.test(approval?.approvedBy ?? '') || !REVIEWER.test(approval?.appliedBy ?? '')) {
    blockers.push('PILOT_CAST_APPROVER_INVALID');
  }
  return { ready: blockers.length === 0, proposalSha256, blockers: [...new Set(blockers)] };
}
