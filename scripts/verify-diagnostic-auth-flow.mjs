import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { verifyDiagnosticAuthenticatedFlow } from './lib/diagnostic-auth-flow.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
if (!process.argv.includes('--execute')) {
  process.stdout.write('Authenticated diagnostic verification is a destructive-fixture dry run.\n');
  process.stdout.write('Add --execute only with dedicated user/admin cookies and the UUID-bound deletion confirmation.\n');
  process.exit(0);
}

const receipt = await verifyDiagnosticAuthenticatedFlow({
  appUrl: process.env.DIAGNOSTIC_VERIFY_APP_URL?.trim() ?? '',
  userCookie: process.env.DIAGNOSTIC_VERIFY_USER_COOKIE ?? '',
  adminCookie: process.env.DIAGNOSTIC_VERIFY_ADMIN_COOKIE ?? '',
  fixtureUserId: process.env.DIAGNOSTIC_VERIFY_USER_ID?.trim() ?? '',
  destructiveConfirmation: process.env.DIAGNOSTIC_AUTH_FLOW_CONFIRM?.trim() ?? '',
  accessMode: process.env.DIAGNOSTIC_VERIFY_ACCESS_MODE?.trim() || 'pilot',
  cohortId: process.env.DIAGNOSTIC_VERIFY_COHORT_ID?.trim() || 'e2e-release-verification',
});

const outputArgument = process.argv.find(argument => argument.startsWith('--output='));
if (outputArgument) {
  const outputPath = resolve(root, outputArgument.slice('--output='.length));
  const privateRoot = resolve(root, '.diagnostic-private');
  const relativeOutput = relative(privateRoot, outputPath);
  if (!relativeOutput || relativeOutput === '..' || relativeOutput.startsWith(`..${sep}`)) {
    throw new Error('Authenticated flow receipts may only be written below .diagnostic-private/.');
  }
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
}

process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
if (receipt.decision !== 'PASS') process.exitCode = 1;
