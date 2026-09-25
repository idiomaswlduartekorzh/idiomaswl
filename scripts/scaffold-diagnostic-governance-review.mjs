import { mkdirSync, writeFileSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDiagnosticGovernanceReviewPackets } from './lib/diagnostic-governance-review.mjs';
import {
  DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS,
  DIAGNOSTIC_WRITING_GOVERNANCE_PATHS,
  diagnosticGovernanceSnapshots,
} from './lib/diagnostic-governance-snapshots.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputArgument = process.argv.find(argument => argument.startsWith('--output='));
const outputRoot = resolve(root, outputArgument?.slice('--output='.length)
  || '.diagnostic-private/governance-review');
const privateRoot = resolve(root, '.diagnostic-private');
const privateRelative = relative(privateRoot, outputRoot);
if (!privateRelative || privateRelative === '..' || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('Governance packets may only be written below .diagnostic-private/.');
}
const snapshots = diagnosticGovernanceSnapshots(root);
const packets = buildDiagnosticGovernanceReviewPackets({ snapshots, generatedAt: new Date().toISOString() });
mkdirSync(outputRoot, { recursive: true });
for (const packet of packets) {
  const path = resolve(outputRoot, `${packet.topic}--${packet.role}.json`);
  writeFileSync(path, `${JSON.stringify(packet, null, 2)}\n`, { mode: 0o600 });
}
writeFileSync(resolve(outputRoot, 'snapshot.json'), `${JSON.stringify({
  snapshotVersion: 'diagnostic-governance-snapshot-v1',
  snapshots,
  workflowPaths: {
    writing: DIAGNOSTIC_WRITING_GOVERNANCE_PATHS,
    delivery: DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS,
  },
}, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify({ outputRoot, packetCount: packets.length, snapshots }, null, 2)}\n`);
