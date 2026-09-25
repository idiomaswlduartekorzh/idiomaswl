import { existsSync, readFileSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DIAGNOSTIC_GOVERNANCE_TOPICS,
  diagnosticGovernanceReviewProgress,
} from './lib/diagnostic-governance-review.mjs';
import { diagnosticGovernanceSnapshots } from './lib/diagnostic-governance-snapshots.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const inputArgument = process.argv.find(argument => argument.startsWith('--input='));
const inputRoot = resolve(root, inputArgument?.slice('--input='.length)
  || '.diagnostic-private/governance-review');
const privateRoot = resolve(root, '.diagnostic-private');
const privateRelative = relative(privateRoot, inputRoot);
if (!privateRelative || privateRelative === '..' || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('Governance review input must stay below .diagnostic-private/.');
}
const receipts = Object.entries(DIAGNOSTIC_GOVERNANCE_TOPICS).flatMap(([topic, roles]) =>
  roles.flatMap(role => {
    const path = resolve(inputRoot, `${topic}--${role}.json`);
    if (!existsSync(path)) return [];
    try {
      return [JSON.parse(readFileSync(path, 'utf8'))];
    } catch {
      return [{ packetId: `diagnostic-governance:${topic}:${role}`, malformed: true }];
    }
  }));
const report = diagnosticGovernanceReviewProgress({
  receipts,
  snapshots: diagnosticGovernanceSnapshots(root),
});
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (report.decision !== 'READY_FOR_COMPILATION') process.exitCode = 1;
