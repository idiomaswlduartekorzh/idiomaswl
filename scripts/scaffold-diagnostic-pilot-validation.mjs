import { createHash } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';
import {
  buildDiagnosticPilotValidationPackets,
  validateDiagnosticPilotCaptureReceipt,
} from './lib/diagnostic-pilot-evidence.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const privatePath = (argument, label) => {
  const path = resolve(root, argument);
  const rel = relative(privateRoot, path);
  if (!argument || argument.startsWith('/') || !rel || rel === '..' || rel.startsWith(`..${sep}`)) {
    throw new Error(`${label} must be a relative path below .diagnostic-private/.`);
  }
  return path;
};
const reportPath = privatePath(value('report') || '.diagnostic-private/pilot/pilot-report.json', 'Pilot report');
const capturePath = privatePath(value('capture') || '.diagnostic-private/pilot/capture-receipt.json', 'Pilot capture receipt');
const outputRoot = privatePath(value('output') || '.diagnostic-private/pilot/validation', 'Pilot validation output');
const reportBytes = readFileSync(reportPath);
const captureBytes = readFileSync(capturePath);
const report = JSON.parse(reportBytes.toString('utf8'));
const captureReceipt = JSON.parse(captureBytes.toString('utf8'));
const reportSha256 = createHash('sha256').update(reportBytes).digest('hex');
const captureReceiptSha256 = createHash('sha256').update(captureBytes).digest('hex');
validateDiagnosticPilotCaptureReceipt({
  receipt: captureReceipt,
  receiptSha256: captureReceiptSha256,
  report,
  reportSha256,
  reportFile: basename(reportPath),
  expectedSourceSha256: diagnosticReleaseSourceSha256(root),
  expectedBankSnapshotSha256: diagnosticPilotBankSha256({
    bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
    writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
  }),
});
const packets = buildDiagnosticPilotValidationPackets({
  captureReceipt, captureReceiptSha256, generatedAt: new Date().toISOString(),
});
mkdirSync(outputRoot, { recursive: true });
for (const packet of packets) {
  writeFileSync(resolve(outputRoot, `${packet.role}.json`), `${JSON.stringify(packet, null, 2)}\n`, { mode: 0o600 });
}
process.stdout.write(`${JSON.stringify({
  outputRoot: relative(root, outputRoot), packetCount: packets.length, reportSha256, captureReceiptSha256,
}, null, 2)}\n`);
