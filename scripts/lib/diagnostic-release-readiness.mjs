const EXPECTED_OBJECTIVE_DECISIONS = 288;
const EXPECTED_WRITING_PROMPTS = 24;
const EXPECTED_LISTENING_RECORDINGS = 36;
const SHA256 = /^[a-f0-9]{64}$/u;
const COMMIT_SHA = /^[a-f0-9]{40}$/u;

function isIsoDate(value) {
  return typeof value === 'string'
    && Number.isFinite(Date.parse(value))
    && new Date(Date.parse(value)).toISOString() === value;
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function gate(id, blockers, details) {
  return { id, status: blockers.length === 0 ? 'PASS' : 'HOLD', blockers, details };
}

function countApprovedCast(casting) {
  return Object.values(casting?.profiles ?? {})
    .filter(profile => profile?.approval === 'approved_for_diagnostic').length;
}

export function buildDiagnosticReleaseReadiness(input) {
  const bank = input.bankReadiness;
  const evidence = input.releaseEvidence;
  const objectiveApprovals = input.approvals?.objectiveApprovals ?? [];
  const writingApprovals = input.approvals?.writingApprovals ?? [];
  const publications = input.audioPublications?.publications ?? [];
  const writingMode = evidence?.writingOperations?.mode ?? null;
  const provider = input.providerReadiness ?? { ready: false, provider: null, model: null, blockers: [] };

  const governanceBlockers = [];
  if (evidence?.evidenceVersion !== 'english-diagnostic-release-evidence-v1') {
    governanceBlockers.push('RELEASE_EVIDENCE_VERSION_INVALID');
  }
  if (!isIsoDate(evidence?.updatedAt)) governanceBlockers.push('RELEASE_EVIDENCE_NOT_ATTESTED');

  const contentBlockers = [];
  const approvedSelectableObjectiveDecisions = bank?.summary?.approvedSelectableObjectiveDecisions
    ?? bank?.summary?.operationalObjectiveDecisions
    ?? 0;
  if (approvedSelectableObjectiveDecisions !== EXPECTED_OBJECTIVE_DECISIONS) {
    contentBlockers.push('OBJECTIVE_BANK_NOT_APPROVED');
  }
  if (!Array.isArray(bank?.objectiveCells)
    || bank.objectiveCells.length !== 24
    || bank.objectiveCells.some(cell =>
      ((cell.approvedPilotDecisions ?? 0) + (cell.operationalDecisions ?? 0)) < cell.requirements.decisions)) {
    contentBlockers.push('OBJECTIVE_CELL_CAPACITY_INCOMPLETE');
  }
  if (objectiveApprovals.length !== EXPECTED_OBJECTIVE_DECISIONS) {
    contentBlockers.push('OBJECTIVE_APPROVALS_INCOMPLETE');
  }
  if (bank?.summary?.writingApprovedPrompts !== EXPECTED_WRITING_PROMPTS
    || writingApprovals.length !== EXPECTED_WRITING_PROMPTS) {
    contentBlockers.push('WRITING_APPROVALS_INCOMPLETE');
  }

  const audioBlockers = [];
  if (publications.length !== EXPECTED_LISTENING_RECORDINGS) {
    audioBlockers.push('LISTENING_RECORDINGS_INCOMPLETE');
  }
  if (new Set(publications.map(record => record.mediaId)).size !== publications.length) {
    audioBlockers.push('LISTENING_RECORDING_IDS_NOT_UNIQUE');
  }
  if (publications.some(record => !nonEmpty(record.audioSha256)
    || !nonEmpty(record.transcriptSha256)
    || !nonEmpty(record.transcriptReviewerId)
    || !nonEmpty(record.alignmentReviewerId)
    || record.transcriptReviewerId === record.alignmentReviewerId
    || !isIsoDate(record.reviewedAt))) {
    audioBlockers.push('LISTENING_RECORDING_EVIDENCE_INVALID');
  }

  const writingBlockers = [];
  const writingGovernanceBound = SHA256.test(evidence?.writingOperations?.governanceManifestSha256 ?? '')
    && evidence?.writingOperations?.workflowSnapshotSha256 === input.governanceSnapshots?.['writing-operations'];
  if (writingMode !== 'human' && writingMode !== 'external') {
    writingBlockers.push('WRITING_OPERATION_MODE_UNSELECTED');
  } else if (writingMode === 'human') {
    const human = evidence.writingOperations.humanReview;
    if (human?.approved !== true
      || !Number.isInteger(human?.verifiedReviewerCount)
      || human.verifiedReviewerCount < 2
      || !SHA256.test(human?.reviewerRosterSha256 ?? '')
      || !Number.isFinite(human?.slaHours)
      || human.slaHours <= 0
      || !isIsoDate(human?.verifiedAt)
      || !nonEmpty(human?.verifiedBy)) {
      writingBlockers.push('HUMAN_WRITING_OPERATION_NOT_VERIFIED');
    }
  } else {
    const external = evidence.writingOperations.externalProcessing;
    if (external?.consentCaptureVerified !== true
      || !isIsoDate(external?.verifiedAt)
      || !nonEmpty(external?.verifiedBy)) {
      writingBlockers.push('EXTERNAL_WRITING_CONSENT_FLOW_NOT_VERIFIED');
    }
    if (!provider.ready) writingBlockers.push('EXTERNAL_WRITING_PROVIDER_NOT_READY');
  }
  if (writingMode && !writingGovernanceBound) {
    writingBlockers.push('WRITING_GOVERNANCE_APPROVAL_NOT_BOUND');
  }

  const databaseBlockers = [];
  if (evidence?.database?.appliedThroughMigration !== input.expectedMigration) {
    databaseBlockers.push('DATABASE_MIGRATIONS_NOT_VERIFIED');
  }
  if (evidence?.database?.authenticatedFlowVerified !== true
    || !isIsoDate(evidence?.database?.verifiedAt)
    || !nonEmpty(evidence?.database?.verifiedBy)) {
    databaseBlockers.push('AUTHENTICATED_DATABASE_FLOW_NOT_VERIFIED');
  }
  const liveVerification = evidence?.database?.liveVerification;
  if (!SHA256.test(liveVerification?.inspectionReceiptSha256 ?? '')
    || !SHA256.test(liveVerification?.authenticatedFlowReceiptSha256 ?? '')
    || !nonEmpty(liveVerification?.supabaseProject)
    || !nonEmpty(liveVerification?.applicationHost)
    || liveVerification?.sourceSha256 !== input.currentSourceSha256
    || liveVerification?.bankSnapshotSha256 !== input.currentBankSha256
    || !COMMIT_SHA.test(liveVerification?.deployedCommit ?? '')
    || !['pilot', 'production'].includes(liveVerification?.accessMode)) {
    databaseBlockers.push('LIVE_DATABASE_EVIDENCE_NOT_BOUND_TO_RELEASE');
  }

  const privacyBlockers = [];
  if (input.retentionPolicy?.status !== 'approved'
    || evidence?.privacy?.retentionPolicyVersion !== input.retentionPolicy?.policyVersion
    || !SHA256.test(evidence?.privacy?.governanceManifestSha256 ?? '')
    || evidence?.privacy?.retentionSnapshotSha256 !== input.governanceSnapshots?.['retention-policy']
    || input.retentionPolicy?.approval?.snapshotSha256 !== input.governanceSnapshots?.['retention-policy']
    || input.retentionPolicy?.approval?.manifestSha256 !== evidence?.privacy?.governanceManifestSha256
    || !isIsoDate(evidence?.privacy?.approvedAt)
    || !nonEmpty(evidence?.privacy?.approvedBy)) {
    privacyBlockers.push('RETENTION_POLICY_NOT_APPROVED');
  }
  if (evidence?.privacy?.deletionFlowVerified !== true
    || !SHA256.test(evidence?.privacy?.deletionReceiptSha256 ?? '')
    || evidence.privacy.deletionReceiptSha256
      !== evidence?.database?.liveVerification?.authenticatedFlowReceiptSha256) {
    privacyBlockers.push('DATA_DELETION_FLOW_NOT_VERIFIED');
  }

  const pilotBlockers = [];
  if (input.pilotCriteria?.status !== 'approved'
    || !SHA256.test(input.pilotCriteria?.approval?.manifestSha256 ?? '')
    || input.pilotCriteria?.approval?.snapshotSha256 !== input.governanceSnapshots?.['pilot-criteria']) {
    pilotBlockers.push('PILOT_CRITERIA_NOT_APPROVED');
  }
  if (input.pilotReport?.reportVersion !== 'diagnostic-pilot-report-v1'
    || input.pilotReport?.criteria?.version !== input.pilotCriteria?.criteriaVersion
    || input.pilotReport?.criteria?.status !== 'approved') {
    pilotBlockers.push('PILOT_CRITERIA_SNAPSHOT_MISMATCH');
  }
  if (!input.pilotReport
    || input.pilotReport.decision !== 'ELIGIBLE_FOR_VALIDATION_REVIEW'
    || Object.values(input.pilotReport.gates ?? {}).some(value => value !== true)) {
    pilotBlockers.push('PILOT_THRESHOLDS_NOT_MET');
  }
  if (!nonEmpty(input.currentBankSha256)
    || input.pilotReport?.bankSnapshot?.sha256 !== input.currentBankSha256) {
    pilotBlockers.push('PILOT_BANK_SNAPSHOT_MISMATCH');
  }
  if (!nonEmpty(evidence?.pilot?.reportPath)
    || evidence.pilot.reportSha256 !== input.pilotReportSha256) {
    pilotBlockers.push('PILOT_REPORT_NOT_BOUND');
  }
  if (evidence?.pilot?.validationDecision !== 'approved'
    || !isIsoDate(evidence?.pilot?.reviewedAt)
    || !nonEmpty(evidence?.pilot?.reviewedBy)) {
    pilotBlockers.push('PILOT_VALIDATION_NOT_APPROVED');
  }

  const qualityBlockers = [];
  if (!input.workingTreeClean) qualityBlockers.push('WORKING_TREE_NOT_CLEAN');
  if (!nonEmpty(input.currentSourceSha256)
    || evidence?.quality?.diagnosticSuiteSourceSha256 !== input.currentSourceSha256) {
    qualityBlockers.push('DIAGNOSTIC_SUITE_NOT_VERIFIED_FOR_SOURCE');
  }
  if (!nonEmpty(input.currentSourceSha256)
    || evidence?.quality?.productionBuildSourceSha256 !== input.currentSourceSha256) {
    qualityBlockers.push('PRODUCTION_BUILD_NOT_VERIFIED_FOR_SOURCE');
  }
  if (!nonEmpty(evidence?.quality?.verifiedCommit)
    || !SHA256.test(evidence?.quality?.receiptSha256 ?? '')
    || !isIsoDate(evidence?.quality?.verifiedAt)
    || !nonEmpty(evidence?.quality?.verifiedBy)) {
    qualityBlockers.push('QUALITY_EVIDENCE_NOT_ATTESTED');
  }

  const gates = [
    gate('governance', governanceBlockers, {
      evidenceVersion: evidence?.evidenceVersion ?? null,
      updatedAt: evidence?.updatedAt ?? null,
    }),
    gate('content', contentBlockers, {
      approvedSelectableObjectiveDecisions,
      operationalObjectiveDecisions: bank?.summary?.operationalObjectiveDecisions ?? 0,
      requiredObjectiveDecisions: EXPECTED_OBJECTIVE_DECISIONS,
      objectiveApprovals: objectiveApprovals.length,
      writingApprovals: writingApprovals.length,
    }),
    gate('listening-audio', audioBlockers, {
      verifiedRecordings: publications.length,
      requiredRecordings: EXPECTED_LISTENING_RECORDINGS,
      diagnosticCastApprovals: countApprovedCast(input.voiceCasting),
      note: 'Casting approval is production context; immutable recording publications are the release evidence.',
    }),
    gate('writing-operations', writingBlockers, {
      mode: writingMode,
      governanceSnapshot: input.governanceSnapshots?.['writing-operations'] ?? null,
      externalProvider: {
        ready: provider.ready === true,
        provider: provider.provider ?? null,
        model: provider.model ?? null,
        blockers: [...(provider.blockers ?? [])],
      },
    }),
    gate('database', databaseBlockers, {
      expectedMigration: input.expectedMigration,
      targetProject: liveVerification?.supabaseProject ?? null,
      applicationHost: liveVerification?.applicationHost ?? null,
    }),
    gate('privacy', privacyBlockers, {
      configuredPolicyVersion: input.retentionPolicy?.policyVersion ?? null,
      configuredPolicyStatus: input.retentionPolicy?.status ?? null,
      retentionPolicyVersion: evidence?.privacy?.retentionPolicyVersion ?? null,
      retentionSnapshot: input.governanceSnapshots?.['retention-policy'] ?? null,
    }),
    gate('pilot', pilotBlockers, {
      criteriaVersion: input.pilotCriteria?.criteriaVersion ?? null,
      criteriaStatus: input.pilotCriteria?.status ?? null,
      criteriaSnapshot: input.governanceSnapshots?.['pilot-criteria'] ?? null,
      pilotDecision: input.pilotReport?.decision ?? null,
    }),
    gate('quality', qualityBlockers, {
      currentCommit: input.currentCommit ?? null,
      currentSourceSha256: input.currentSourceSha256 ?? null,
    }),
  ];
  const releaseReady = gates.every(candidate => candidate.status === 'PASS');
  const activation = {
    engineEnabled: input.activation?.engineEnabled === true,
    uiEnabled: input.activation?.uiEnabled === true,
  };
  const active = releaseReady && activation.engineEnabled && activation.uiEnabled;

  return {
    reportVersion: 'diagnostic-release-readiness-v1',
    decision: active ? 'ACTIVE' : releaseReady ? 'READY_TO_ENABLE' : 'HOLD',
    releaseReady,
    activation,
    summary: {
      passedGates: gates.filter(candidate => candidate.status === 'PASS').length,
      totalGates: gates.length,
      blockerCount: gates.reduce((sum, candidate) => sum + candidate.blockers.length, 0),
    },
    gates,
    safeguards: {
      secretsIncluded: false,
      activationDoesNotOverrideEvidence: true,
      humanWritingPathCanReleaseWithoutExternalProvider: true,
    },
  };
}
