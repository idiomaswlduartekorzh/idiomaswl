import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import {
  DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS,
  recordDiagnosticA1AudioPilotApproval,
} from './lib/diagnostic-a1-audio-pilot.mjs';
import { diagnosticListeningAudioInvoice } from './generate-diagnostic-listening-audio.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const receiptArgument = value('receipt') || '.diagnostic-private/listening-pilot-a1/owner-approval.json';
const receiptPath = resolve(root, receiptArgument);
const privateRelative = relative(privateRoot, receiptPath);
if (receiptArgument.startsWith('/') || !privateRelative || privateRelative === '..'
  || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('A1 audio pilot approval receipt must stay below .diagnostic-private/.');
}
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
if (workingTree) throw new Error('Recording A1 audio pilot approval requires a clean working tree.');
const castingPath = resolve(root, 'config/diagnostic/english-listening-voice-casting.json');
const casting = JSON.parse(readFileSync(castingPath, 'utf8'));
const receiptBytes = readFileSync(receiptPath);
const receipt = JSON.parse(receiptBytes.toString('utf8'));
const receiptSha256 = createHash('sha256').update(receiptBytes).digest('hex');
const invoice = diagnosticListeningAudioInvoice(ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS
  .filter(brief => DIAGNOSTIC_A1_AUDIO_PILOT_MEDIA_IDS.includes(brief.id)));
const appliedAt = new Date().toISOString();
const nextCasting = recordDiagnosticA1AudioPilotApproval({
  casting,
  invoice,
  receipt,
  receiptSha256,
  appliedAt,
  appliedBy: value('applied-by') || 'dry-run-placeholder',
});
const confirmation = `APPLY_DIAGNOSTIC_A1_AUDIO_PILOT_APPROVAL:${receiptSha256}:${receipt.proposalSha256}`;
const summary = {
  decision: 'OWNER_APPROVAL_READY_TO_APPLY',
  receiptSha256,
  proposalSha256: receipt.proposalSha256,
  packageSha256: invoice.packageSha256,
  maximumCreditDebit: nextCasting.pilotApproval.maximumCreditDebit,
  approvedBy: nextCasting.pilotApproval.approvedBy,
  publicationAuthorized: false,
};
if (!process.argv.includes('--write')) {
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`Dry run only. To apply, add --write --applied-by=<operator> --confirm=${confirmation}\n`);
  process.exit(0);
}
if (value('confirm') !== confirmation) throw new Error('A1 audio pilot approval confirmation does not match the exact receipt and proposal.');
if (!value('applied-by')) throw new Error('--applied-by is required when writing A1 audio pilot approval.');
const finalCasting = recordDiagnosticA1AudioPilotApproval({
  casting, invoice, receipt, receiptSha256, appliedAt, appliedBy: value('applied-by'),
});
writeFileSync(castingPath, `${JSON.stringify(finalCasting, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...summary, decision: 'APPLIED', appliedBy: value('applied-by') }, null, 2)}\n`);
