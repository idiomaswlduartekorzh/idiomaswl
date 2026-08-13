export const IELTS_READING_RIGHTS_REGISTRY_SCHEMA_VERSION =
  'ielts-academic-reading-rights-registry.v2' as const;

export type IeltsReadingRightsBasis =
  | 'owned-original'
  | 'licensed'
  | 'public-domain'
  | 'unknown-quarantined';

export type IeltsReadingRightsEvidenceKind =
  | 'repository-source'
  | 'module-declaration'
  | 'official-policy'
  | 'publisher-catalog'
  | 'external-identification'
  | 'authoring-record'
  | 'license-document'
  | 'public-domain-record'
  | 'factual-source'
  | 'human-review-record';

export interface IeltsReadingRightsEvidence {
  id: string;
  kind: IeltsReadingRightsEvidenceKind;
  label: string;
  url?: string;
  repositoryPath?: string;
  accessedAt: string;
  note: string;
}

export interface IeltsReadingRightsRecord {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string | null;
  moduleAssessment: {
    value: 'academic' | 'general-training' | null;
    status: 'declared' | 'inferred' | 'ambiguous';
    evidenceIds: readonly string[];
  };
  authorship: {
    status: 'unknown' | 'identified';
    authorId: string | null;
    authorName: string | null;
    evidenceIds: readonly string[];
  };
  provenanceAssessment: {
    status:
      | 'unresolved'
      | 'probable-third-party-match'
      | 'verified-owned-original'
      | 'verified-licensed'
      | 'verified-public-domain';
    observedWorkTitle: string | null;
    observedCollection: string | null;
    observedIdentifier: string | null;
    confidence: 'none' | 'low' | 'medium' | 'high';
    evidenceIds: readonly string[];
    limitation: string;
  };
  rightsAssessment: {
    basis: IeltsReadingRightsBasis;
    status: 'reviewed-unresolved' | 'verified' | 'rejected';
    rightsHolder: string | null;
    evidenceIds: readonly string[];
    authorizationEvidenceStatus:
      | 'not-reviewed'
      | 'not-located-in-reviewed-sources'
      | 'located-and-verified'
      | 'not-applicable-verified';
    limitation: string;
  };
  factualReviewRequirement: {
    policy: 'required' | 'not-applicable-allowed';
    rationale: string;
  };
  factualSourceResearch:
    | {
        status: 'not-started';
        sourceEvidenceIds: readonly [];
        limitation: string;
      }
    | {
        status: 'candidate-sources-collected';
        sourceEvidenceIds: readonly string[];
        limitation: string;
      };
  factualReview:
    | {
        status: 'not-reviewed';
        verifiedAt: null;
        sourceEvidenceIds: readonly [];
        notApplicableRationale: null;
      }
    | {
        status: 'verified';
        verifiedAt: string;
        sourceEvidenceIds: readonly string[];
        notApplicableRationale: null;
      }
    | {
        status: 'not-applicable';
        verifiedAt: string;
        sourceEvidenceIds: readonly [];
        notApplicableRationale: string;
      };
  humanReview:
    | {
        status: 'pending';
        reviewerId: null;
        reviewerName: null;
        reviewerRole: null;
        reviewedAt: null;
        decisionNote: null;
        evidenceIds: readonly [];
      }
    | {
        status: 'approved' | 'rejected';
        reviewerId: string;
        reviewerName: string;
        reviewerRole: string;
        reviewedAt: string;
        decisionNote: string;
        evidenceIds: readonly string[];
      };
  automatedTriage: {
    methodVersion: string;
    assessedAt: string;
    isHumanApproval: false;
    note: string;
  };
}

export interface IeltsReadingRightsRegistry {
  schemaVersion: typeof IELTS_READING_RIGHTS_REGISTRY_SCHEMA_VERSION;
  policyVersion: string;
  module: 'academic';
  defaultDisposition: {
    rightsBasis: 'unknown-quarantined';
    disposition: 'quarantine';
    reasonCode: 'missing-rights-registry-entry';
  };
  evidence: readonly IeltsReadingRightsEvidence[];
  entries: readonly IeltsReadingRightsRecord[];
}

export type IeltsReadingRightsBlockReason =
  | 'missing-rights-registry-entry'
  | 'registry-contract-invalid'
  | 'content-hash-mismatch'
  | 'module-not-declared'
  | 'authorship-unresolved'
  | 'provenance-not-verified'
  | 'provenance-evidence-incomplete'
  | 'rights-review-rejected'
  | 'rights-unresolved'
  | 'rights-evidence-incomplete'
  | 'factual-source-research-invalid'
  | 'factual-review-incomplete'
  | 'human-review-pending'
  | 'human-review-rejected'
  | 'human-review-incomplete'
  | 'reviewer-not-independent'
  | 'automated-triage-invalid';

export interface IeltsReadingRightsDecision {
  assetId: string;
  disposition: 'quarantine' | 'eligible-for-editorial-review';
  eligibleForPublicationPipeline: boolean;
  rightsBasis: IeltsReadingRightsBasis;
  reasonCodes: readonly IeltsReadingRightsBlockReason[];
}

const PROVENANCE_STATUS_BY_BASIS = {
  'owned-original': 'verified-owned-original',
  licensed: 'verified-licensed',
  'public-domain': 'verified-public-domain',
} as const;

const REQUIRED_EVIDENCE_KIND_BY_BASIS = {
  'owned-original': 'authoring-record',
  licensed: 'license-document',
  'public-domain': 'public-domain-record',
} as const;

const ALLOWED_RESOLVED_RIGHTS_BASES = new Set<IeltsReadingRightsBasis>([
  'owned-original',
  'licensed',
  'public-domain',
]);
const isResolvedRightsBasis = (
  basis: IeltsReadingRightsBasis,
): basis is Exclude<IeltsReadingRightsBasis, 'unknown-quarantined'> =>
  ALLOWED_RESOLVED_RIGHTS_BASES.has(basis);
const ALLOWED_EVIDENCE_KINDS = new Set<IeltsReadingRightsEvidenceKind>([
  'repository-source',
  'module-declaration',
  'official-policy',
  'publisher-catalog',
  'external-identification',
  'authoring-record',
  'license-document',
  'public-domain-record',
  'factual-source',
  'human-review-record',
]);

const nonBlank = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
const validReviewDate = (value: unknown): value is string => {
  if (!nonBlank(value)) return false;
  const calendar = /^(\d{4})-(\d{2})-(\d{2})/u.exec(value);
  if (!calendar) return false;
  const year = Number(calendar[1]);
  const month = Number(calendar[2]);
  const day = Number(calendar[3]);
  const parsedCalendar = new Date(Date.UTC(year, month - 1, day));
  const calendarIsReal = parsedCalendar.getUTCFullYear() === year &&
    parsedCalendar.getUTCMonth() === month - 1 &&
    parsedCalendar.getUTCDate() === day;
  if (!calendarIsReal) return false;
  if (value.length === 10) return /^\d{4}-\d{2}-\d{2}$/u.test(value);
  const timestamp = /^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-](\d{2}):(\d{2}))$/u.exec(value);
  if (!timestamp) return false;
  if (
    Number(timestamp[1]) > 23 ||
    Number(timestamp[2]) > 59 ||
    Number(timestamp[3]) > 59 ||
    Number(timestamp[4] ?? 0) > 23 ||
    Number(timestamp[5] ?? 0) > 59
  ) {
    return false;
  }
  return Number.isFinite(Date.parse(value));
};
const canonicalIdentity = (value: string) => value.normalize('NFKC').trim().toLocaleLowerCase('en');

function validEvidence(evidence: IeltsReadingRightsEvidence) {
  return nonBlank(evidence.id) &&
    ALLOWED_EVIDENCE_KINDS.has(evidence.kind) &&
    nonBlank(evidence.label) &&
    validReviewDate(evidence.accessedAt) &&
    nonBlank(evidence.note) &&
    ((nonBlank(evidence.url) && evidence.url.startsWith('https://')) ||
      nonBlank(evidence.repositoryPath));
}

function assessIeltsReadingRightsUnsafe(
  registry: IeltsReadingRightsRegistry,
  asset: {
    assetId: string;
    sourceObjectSha256: string;
    passageSha256: string | null;
  },
): IeltsReadingRightsDecision {
  const entries: readonly IeltsReadingRightsRecord[] = Array.isArray(registry.entries)
    ? registry.entries
    : [];
  const matchingRecords = entries.filter((entry) => entry.assetId === asset.assetId);
  const record = matchingRecords[0];
  if (!record) {
    return {
      assetId: asset.assetId,
      disposition: 'quarantine',
      eligibleForPublicationPipeline: false,
      rightsBasis: 'unknown-quarantined',
      reasonCodes: ['missing-rights-registry-entry'],
    };
  }

  const reasons = new Set<IeltsReadingRightsBlockReason>();
  const evidence: readonly IeltsReadingRightsEvidence[] = Array.isArray(registry.evidence)
    ? registry.evidence
    : [];
  const evidenceById = new Map(
    evidence.filter(validEvidence).map((evidenceRow) => [evidenceRow.id, evidenceRow]),
  );
  const validEvidenceIdArray = (value: unknown): value is readonly string[] =>
    Array.isArray(value) &&
    value.every(nonBlank) &&
    new Set(value).size === value.length;
  const evidenceExists = (evidenceIds: unknown) =>
    validEvidenceIdArray(evidenceIds) &&
    evidenceIds.length > 0 &&
    evidenceIds.every((evidenceId) => evidenceById.has(evidenceId));
  const evidenceHasKind = (
    evidenceIds: unknown,
    kind: IeltsReadingRightsEvidenceKind,
  ) => validEvidenceIdArray(evidenceIds) &&
    evidenceIds.some((evidenceId) => evidenceById.get(evidenceId)?.kind === kind);

  const evidenceIds = evidence.map((evidenceRow) => evidenceRow.id);
  if (
    registry.schemaVersion !== IELTS_READING_RIGHTS_REGISTRY_SCHEMA_VERSION ||
    registry.module !== 'academic' ||
    !nonBlank(registry.policyVersion) ||
    registry.defaultDisposition?.rightsBasis !== 'unknown-quarantined' ||
    registry.defaultDisposition?.disposition !== 'quarantine' ||
    registry.defaultDisposition?.reasonCode !== 'missing-rights-registry-entry' ||
    matchingRecords.length !== 1 ||
    evidence.some((evidenceRow) => !validEvidence(evidenceRow)) ||
    new Set(evidenceIds).size !== evidenceIds.length
  ) {
    reasons.add('registry-contract-invalid');
  }

  if (
    record.sourceObjectSha256 !== asset.sourceObjectSha256 ||
    record.passageSha256 !== asset.passageSha256
  ) {
    reasons.add('content-hash-mismatch');
  }
  if (
    record.moduleAssessment.status !== 'declared' ||
    record.moduleAssessment.value !== registry.module ||
    !evidenceExists(record.moduleAssessment.evidenceIds) ||
    !evidenceHasKind(record.moduleAssessment.evidenceIds, 'module-declaration')
  ) {
    reasons.add('module-not-declared');
  }
  if (
    record.authorship.status !== 'identified' ||
    !nonBlank(record.authorship.authorId) ||
    !nonBlank(record.authorship.authorName) ||
    !evidenceExists(record.authorship.evidenceIds)
  ) {
    reasons.add('authorship-unresolved');
  }

  if (record.rightsAssessment.status === 'rejected') {
    reasons.add('rights-review-rejected');
  }
  if (
    !isResolvedRightsBasis(record.rightsAssessment.basis) ||
    record.rightsAssessment.status !== 'verified'
  ) {
    reasons.add('rights-unresolved');
  } else {
    const resolvedBasis = record.rightsAssessment.basis;
    const expectedProvenance = PROVENANCE_STATUS_BY_BASIS[resolvedBasis];
    if (
      record.provenanceAssessment.status !== expectedProvenance ||
      !nonBlank(record.provenanceAssessment.limitation)
    ) {
      reasons.add('provenance-not-verified');
    }
    if (!evidenceExists(record.provenanceAssessment.evidenceIds)) {
      reasons.add('provenance-evidence-incomplete');
    }
    const requiredEvidenceKind = REQUIRED_EVIDENCE_KIND_BY_BASIS[resolvedBasis];
    const hasRequiredEvidence = evidenceHasKind(
      record.rightsAssessment.evidenceIds,
      requiredEvidenceKind,
    );
    const holderRequired = resolvedBasis !== 'public-domain';
    const authorizationComplete =
      resolvedBasis === 'public-domain'
        ? record.rightsAssessment.authorizationEvidenceStatus === 'not-applicable-verified'
        : record.rightsAssessment.authorizationEvidenceStatus === 'located-and-verified';
    if (
      !hasRequiredEvidence ||
      !evidenceExists(record.rightsAssessment.evidenceIds) ||
      (holderRequired && !record.rightsAssessment.rightsHolder) ||
      (holderRequired && !nonBlank(record.rightsAssessment.rightsHolder)) ||
      !nonBlank(record.rightsAssessment.limitation) ||
      !authorizationComplete
    ) {
      reasons.add('rights-evidence-incomplete');
    }
  }

  if (record.factualReview.status === 'verified') {
    if (
      !validReviewDate(record.factualReview.verifiedAt) ||
      !evidenceExists(record.factualReview.sourceEvidenceIds) ||
      !validEvidenceIdArray(record.factualReview.sourceEvidenceIds) ||
      !record.factualReview.sourceEvidenceIds.every(
        (evidenceId) => evidenceById.get(evidenceId)?.kind === 'factual-source',
      )
    ) {
      reasons.add('factual-review-incomplete');
    }
  } else if (record.factualReview.status === 'not-applicable') {
    if (
      !validReviewDate(record.factualReview.verifiedAt) ||
      !nonBlank(record.factualReview.notApplicableRationale) ||
      !validEvidenceIdArray(record.factualReview.sourceEvidenceIds) ||
      record.factualReview.sourceEvidenceIds.length !== 0
    ) {
      reasons.add('factual-review-incomplete');
    }
  } else {
    reasons.add('factual-review-incomplete');
  }

  if (
    !record.factualReviewRequirement ||
    !nonBlank(record.factualReviewRequirement.rationale) ||
    !['required', 'not-applicable-allowed'].includes(
      record.factualReviewRequirement.policy,
    )
  ) {
    reasons.add('registry-contract-invalid');
  } else if (
    record.factualReviewRequirement.policy === 'required' &&
    record.factualReview.status !== 'verified'
  ) {
    reasons.add('factual-review-incomplete');
  }

  if (
    !record.factualSourceResearch ||
    !nonBlank(record.factualSourceResearch.limitation)
  ) {
    reasons.add('factual-source-research-invalid');
  } else if (record.factualSourceResearch.status === 'not-started') {
    if (
      !validEvidenceIdArray(record.factualSourceResearch.sourceEvidenceIds) ||
      record.factualSourceResearch.sourceEvidenceIds.length !== 0
    ) {
      reasons.add('factual-source-research-invalid');
    }
  } else if (record.factualSourceResearch.status === 'candidate-sources-collected') {
    if (
      !evidenceExists(record.factualSourceResearch.sourceEvidenceIds) ||
      !validEvidenceIdArray(record.factualSourceResearch.sourceEvidenceIds) ||
      !record.factualSourceResearch.sourceEvidenceIds.every(
        (evidenceId) => evidenceById.get(evidenceId)?.kind === 'factual-source',
      )
    ) {
      reasons.add('factual-source-research-invalid');
    }
  } else {
    reasons.add('factual-source-research-invalid');
  }

  if (record.humanReview.status === 'rejected') {
    reasons.add('human-review-rejected');
  } else if (record.humanReview.status !== 'approved') {
    reasons.add('human-review-pending');
  } else {
    if (
      !nonBlank(record.humanReview.reviewerId) ||
      !nonBlank(record.humanReview.reviewerName) ||
      !nonBlank(record.humanReview.reviewerRole) ||
      !validReviewDate(record.humanReview.reviewedAt) ||
      !nonBlank(record.humanReview.decisionNote) ||
      !evidenceExists(record.humanReview.evidenceIds) ||
      !evidenceHasKind(record.humanReview.evidenceIds, 'human-review-record')
    ) {
      reasons.add('human-review-incomplete');
    }
    if (
      nonBlank(record.authorship.authorId) &&
      nonBlank(record.humanReview.reviewerId) &&
      canonicalIdentity(record.humanReview.reviewerId) ===
        canonicalIdentity(record.authorship.authorId)
    ) {
      reasons.add('reviewer-not-independent');
    }
  }

  if (
    record.automatedTriage.isHumanApproval !== false ||
    !nonBlank(record.automatedTriage.methodVersion) ||
    !validReviewDate(record.automatedTriage.assessedAt) ||
    !nonBlank(record.automatedTriage.note)
  ) {
    reasons.add('automated-triage-invalid');
  }

  const reasonCodes = [...reasons].sort();
  return {
    assetId: asset.assetId,
    disposition: reasonCodes.length ? 'quarantine' : 'eligible-for-editorial-review',
    eligibleForPublicationPipeline: reasonCodes.length === 0,
    rightsBasis: record.rightsAssessment.basis,
    reasonCodes,
  };
}

export function assessIeltsReadingRights(
  registry: IeltsReadingRightsRegistry,
  asset: {
    assetId: string;
    sourceObjectSha256: string;
    passageSha256: string | null;
  },
): IeltsReadingRightsDecision {
  try {
    return assessIeltsReadingRightsUnsafe(registry, asset);
  } catch {
    return {
      assetId: asset.assetId,
      disposition: 'quarantine',
      eligibleForPublicationPipeline: false,
      rightsBasis: 'unknown-quarantined',
      reasonCodes: ['registry-contract-invalid'],
    };
  }
}
