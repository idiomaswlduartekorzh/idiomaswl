import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK, ENGLISH_DIAGNOSTIC_WRITING_BANK } from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { validateDiagnosticProductionRelease } from '../src/server/diagnostic/release-runtime-core.ts';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const certificate = JSON.parse(readFileSync(join(root, 'config/diagnostic/release-certificate.json'), 'utf8'));

if (certificate.status === 'hold') {
  const releaseFields = ['releaseId', 'bankSnapshotSha256', 'sourceSha256', 'evidenceVersion', 'issuedAt', 'issuedBy'];
  if (certificate.certificateVersion !== 'english-diagnostic-release-certificate-v1'
    || releaseFields.some(key => certificate[key] !== null)) {
    throw new Error('The HOLD diagnostic release certificate is malformed.');
  }
  process.stdout.write('✓ Diagnostic production certificate remains fail-closed\n');
} else {
  const currentBankSha256 = diagnosticPilotBankSha256({
    bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
    writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
  });
  const readiness = validateDiagnosticProductionRelease({
    env: {
      DIAGNOSTIC_RELEASE_ID: certificate.releaseId,
      DIAGNOSTIC_RELEASE_SOURCE_SHA256: certificate.sourceSha256,
    },
    certificate,
    currentBankSha256,
  });
  if (!readiness.ready) throw new Error(`Diagnostic release certificate rejected: ${readiness.blockers.join(', ')}`);
  const currentSourceSha256 = diagnosticReleaseSourceSha256(root);
  if (certificate.sourceSha256 !== currentSourceSha256) {
    throw new Error('Diagnostic release certificate is stale for the current source fingerprint.');
  }
  process.stdout.write(`✓ Diagnostic production certificate ${certificate.releaseId} matches current bank and source\n`);
}
