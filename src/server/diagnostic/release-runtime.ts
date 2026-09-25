import 'server-only';

import certificate from '../../../config/diagnostic/release-certificate.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } from './bank';
import { diagnosticPilotBankSha256 } from './pilot-analytics';
import {
  validateDiagnosticProductionRelease,
  type DiagnosticReleaseCertificate,
} from './release-runtime-core';

export function getDiagnosticProductionReleaseReadiness(
  env: Readonly<Record<string, string | undefined>> = process.env,
  releaseCertificate: DiagnosticReleaseCertificate = certificate as DiagnosticReleaseCertificate,
): { ready: boolean; blockers: readonly string[] } {
  const currentBankSha256 = diagnosticPilotBankSha256({
    bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
    writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
  });
  return validateDiagnosticProductionRelease({ env, certificate: releaseCertificate, currentBankSha256 });
}
