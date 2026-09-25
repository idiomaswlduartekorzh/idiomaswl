export interface DiagnosticReleaseCertificate {
  certificateVersion: string;
  status: 'hold' | 'ready';
  releaseId: string | null;
  bankSnapshotSha256: string | null;
  sourceSha256: string | null;
  evidenceVersion: string | null;
  issuedAt: string | null;
  issuedBy: string | null;
}

export function validateDiagnosticProductionRelease(input: {
  env: Readonly<Record<string, string | undefined>>;
  certificate: DiagnosticReleaseCertificate;
  currentBankSha256: string;
}): { ready: boolean; blockers: readonly string[] } {
  const blockers: string[] = [];
  const releaseId = input.env.DIAGNOSTIC_RELEASE_ID?.trim() ?? '';
  if (input.certificate.certificateVersion !== 'english-diagnostic-release-certificate-v1') {
    blockers.push('certificate-version-invalid');
  }
  if (input.certificate.status !== 'ready') blockers.push('certificate-not-ready');
  if (!releaseId || input.certificate.releaseId !== releaseId) blockers.push('release-id-mismatch');
  if (input.certificate.bankSnapshotSha256 !== input.currentBankSha256) blockers.push('bank-snapshot-mismatch');
  if (!input.certificate.sourceSha256 || !/^[a-f0-9]{64}$/u.test(input.certificate.sourceSha256)) {
    blockers.push('source-fingerprint-invalid');
  }
  if (!input.env.DIAGNOSTIC_RELEASE_SOURCE_SHA256
    || input.env.DIAGNOSTIC_RELEASE_SOURCE_SHA256 !== input.certificate.sourceSha256) {
    blockers.push('deployed-source-fingerprint-mismatch');
  }
  if (input.certificate.evidenceVersion !== 'english-diagnostic-release-evidence-v1') {
    blockers.push('evidence-version-invalid');
  }
  if (!input.certificate.issuedAt
    || Number.isNaN(Date.parse(input.certificate.issuedAt))
    || new Date(Date.parse(input.certificate.issuedAt)).toISOString() !== input.certificate.issuedAt
    || !input.certificate.issuedBy?.trim()) {
    blockers.push('certificate-attestation-invalid');
  }
  return { ready: blockers.length === 0, blockers };
}
