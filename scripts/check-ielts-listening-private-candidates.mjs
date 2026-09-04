import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { auditIeltsListeningPrivateCandidates } from './lib/ielts-listening-private-candidate-readiness.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// This check can certify isolation, never publication or human approval.
export function privateCandidateExitCode(report, requireMachineReady = false) {
  if (
    report?.integrity !== 'PASS'
    || report?.publicationDecision !== 'BLOCK'
    || !['READY', 'BLOCKED'].includes(report?.machineReadiness)
  ) return 1;
  return requireMachineReady && report.machineReadiness !== 'READY' ? 1 : 0;
}

export function runPrivateCandidateCheck(
  args,
  audit = () => auditIeltsListeningPrivateCandidates({ root: repositoryRoot }),
) {
  const validArguments = args.length === 0
    || (args.length === 1 && args[0] === '--require-machine-ready');
  if (!validArguments) {
    return {
      exitCode: 2,
      report: { scope: 'ielts-listening-private-candidates', integrity: 'BLOCK',
        machineReadiness: 'BLOCKED', publicationDecision: 'BLOCK', code: 'INVALID_ARGUMENTS' },
    };
  }
  try {
    const report = audit();
    return { report, exitCode: privateCandidateExitCode(report, args.length === 1) };
  } catch {
    // An exception may contain file contents or a manifest-controlled value.
    // Emit only a stable code; never serialize the exception or its message.
    return {
      exitCode: 1,
      report: { scope: 'ielts-listening-private-candidates', integrity: 'BLOCK',
        machineReadiness: 'BLOCKED', publicationDecision: 'BLOCK', code: 'AUDIT_READ_FAILED' },
    };
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = runPrivateCandidateCheck(process.argv.slice(2));
  process.stdout.write(`${JSON.stringify(result.report, null, 2)}\n`);
  process.exitCode = result.exitCode;
}
