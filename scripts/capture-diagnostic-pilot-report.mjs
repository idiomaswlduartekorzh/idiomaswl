import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '../src/server/diagnostic/bank/index.ts';
import { diagnosticPilotBankSha256 } from '../src/server/diagnostic/pilot-analytics.ts';
import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';
import { validateDiagnosticPilotCapture } from './lib/diagnostic-pilot-evidence.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = resolve(root, '.diagnostic-private');
const value = name => process.argv.find(argument => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? '';
const reportArgument = value('report') || '.diagnostic-private/pilot/pilot-report.json';
const receiptArgument = value('receipt') || '.diagnostic-private/pilot/capture-receipt.json';

function privatePath(argument, label) {
  const path = resolve(root, argument);
  const privateRelative = relative(privateRoot, path);
  if (!argument || argument.startsWith('/') || !privateRelative || privateRelative === '..'
    || privateRelative.startsWith(`..${sep}`)) {
    throw new Error(`${label} must be a relative path below .diagnostic-private/.`);
  }
  return path;
}

function safeCookie(value) {
  if (!value || value.length > 16_384 || /[\r\n]/u.test(value) || /^cookie\s*:/iu.test(value)) {
    throw new Error('DIAGNOSTIC_VERIFY_ADMIN_COOKIE must contain only a Cookie header value.');
  }
  return value;
}

function applicationOrigin(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error('DIAGNOSTIC_VERIFY_APP_URL is invalid.');
  }
  const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (parsed.protocol !== 'https:' && !local) throw new Error('Remote pilot capture requires HTTPS.');
  if (parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error('DIAGNOSTIC_VERIFY_APP_URL must be an origin.');
  }
  return parsed.origin;
}

async function jsonRequest(url, cookie) {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'error',
    headers: { Cookie: cookie, Accept: 'application/json' },
  });
  const payload = await response.json().catch(() => null);
  if (response.status !== 200) {
    throw new Error(`Pilot capture request failed (${response.status}/${payload?.code ?? 'NO_CODE'}).`);
  }
  return payload;
}

if (!process.argv.includes('--execute')) {
  process.stdout.write('Pilot report capture is a private, read-only live operation.\n');
  process.stdout.write('Add --execute with DIAGNOSTIC_VERIFY_APP_URL and DIAGNOSTIC_VERIFY_ADMIN_COOKIE.\n');
  process.exit(0);
}

const reportPath = privatePath(reportArgument, 'Pilot report output');
const receiptPath = privatePath(receiptArgument, 'Pilot capture receipt output');
if (reportPath === receiptPath) throw new Error('Pilot report and capture receipt outputs must differ.');
if (!process.argv.includes('--replace') && (existsSync(reportPath) || existsSync(receiptPath))) {
  throw new Error('Pilot capture outputs already exist; use new paths or explicitly add --replace.');
}
const workingTree = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
if (workingTree) throw new Error('Pilot report capture requires a clean working tree.');
const expectedCommitSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const expectedSourceSha256 = diagnosticReleaseSourceSha256(root);
const expectedBankSnapshotSha256 = diagnosticPilotBankSha256({
  bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
});
const appUrl = applicationOrigin(process.env.DIAGNOSTIC_VERIFY_APP_URL?.trim() ?? '');
const adminCookie = safeCookie(process.env.DIAGNOSTIC_VERIFY_ADMIN_COOKIE ?? '');
const now = new Date();
const sinceInput = value('since');
const since = sinceInput ? new Date(sinceInput) : new Date(now.getTime() - 180 * 24 * 60 * 60 * 1_000);
if (Number.isNaN(since.getTime()) || since >= now || since < new Date(now.getTime() - 366 * 24 * 60 * 60 * 1_000)) {
  throw new Error('--since must be within the last 366 days and before now.');
}
const bindingPayload = await jsonRequest(`${appUrl}/api/admin/diagnostic/release-binding`, adminCookie);
const pilotUrl = new URL('/api/admin/diagnostic/pilot-report', appUrl);
pilotUrl.searchParams.set('since', since.toISOString());
const reportPayload = await jsonRequest(pilotUrl.toString(), adminCookie);
if (reportPayload?.ok !== true || !reportPayload.report) throw new Error('Pilot report response is invalid.');
const reportBytes = Buffer.from(`${JSON.stringify(reportPayload.report, null, 2)}\n`);
const reportSha256 = createHash('sha256').update(reportBytes).digest('hex');
const capturedAt = new Date().toISOString();
const receipt = validateDiagnosticPilotCapture({
  report: reportPayload.report,
  binding: bindingPayload?.binding,
  capturedAt,
  since: since.toISOString(),
  reportFile: basename(reportPath),
  reportSha256,
  applicationUrl: appUrl,
  expectedSourceSha256,
  expectedBankSnapshotSha256,
  expectedCommitSha,
});
const receiptBytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
for (const path of [reportPath, receiptPath]) mkdirSync(dirname(path), { recursive: true });
const reportTemporary = `${reportPath}.tmp-${process.pid}`;
const receiptTemporary = `${receiptPath}.tmp-${process.pid}`;
writeFileSync(reportTemporary, reportBytes, { mode: 0o600 });
writeFileSync(receiptTemporary, receiptBytes, { mode: 0o600 });
renameSync(reportTemporary, reportPath);
renameSync(receiptTemporary, receiptPath);
process.stdout.write(`${JSON.stringify({
  decision: receipt.report.decision,
  reportPath: relative(root, reportPath),
  reportSha256,
  receiptPath: relative(root, receiptPath),
  receiptSha256: createHash('sha256').update(receiptBytes).digest('hex'),
  participantRowsIncluded: false,
}, null, 2)}\n`);
