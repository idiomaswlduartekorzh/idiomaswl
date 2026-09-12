#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const evidencePath = path.join(repoRoot, 'docs/icfes-payments-adversarial-local.json');
const testPath = 'tests/icfes-payments-adversarial.test.mjs';
const hashedArtifacts = [
  'src/lib/icfes/payment-adversarial-model.ts',
  'src/lib/icfes/payment-event.ts',
  'src/lib/icfes/commerce-v1.ts',
  testPath,
];

function sha256(relativePath) {
  return createHash('sha256').update(readFileSync(path.join(repoRoot, relativePath))).digest('hex');
}

const testRun = spawnSync(process.execPath, [
  '--experimental-strip-types',
  '--no-warnings',
  '--test',
  testPath,
], { cwd: repoRoot, encoding: 'utf8' });
const output = `${testRun.stdout ?? ''}\n${testRun.stderr ?? ''}`;
const passCount = Number(output.match(/ℹ pass (\d+)/)?.[1] ?? output.match(/# pass (\d+)/)?.[1] ?? 0);
const failCount = Number(output.match(/ℹ fail (\d+)/)?.[1] ?? output.match(/# fail (\d+)/)?.[1] ?? 0);

const report = {
  schemaVersion: 1,
  evidenceId: 'icfes-payments-adversarial-local-v1',
  scope: 'Deterministic local model only; no network, remote database, Wompi Sandbox or production credentials.',
  flags: {
    required: 'ICFES_ADVERSARIAL_PAYMENTS_ENABLED=true',
    default: false,
    productionDenied: true,
  },
  command: 'node --experimental-strip-types --no-warnings --test tests/icfes-payments-adversarial.test.mjs',
  localGate: testRun.status === 0 && passCount === 10 && failCount === 0 ? 'PASS' : 'FAIL',
  wompiSandboxEndToEnd: 'BLOCKED',
  tests: { expected: 10, passed: passCount, failed: failCount },
  scenarios: [
    'PENDING does not grant access',
    'DECLINED and ERROR do not grant access',
    'APPROVED grants one entitlement',
    'duplicate APPROVED and exact replay are idempotent',
    'late PENDING cannot regress APPROVED',
    'tampered amount, currency, environment and provider transaction are rejected',
    'REFUND and CHARGEBACK revoke access and resist approval replay',
    'COP 12,900 attempt detail is not silently treated as a membership credit',
    'COP 49,900 to COP 99,900 charges COP 50,000 and preserves the period end',
    'a late approval cannot reuse upgrade credit released to another order',
    'source reversal cascades to dependent upgrade access',
  ],
  artifacts: Object.fromEntries(hashedArtifacts.map((relativePath) => [relativePath, sha256(relativePath)])),
  blockers: [
    'No real Wompi Sandbox checkout, signed webhook and authoritative transaction lookup were executed.',
    'The local REFUND/CHARGEBACK vocabulary is not mapped to live provider events or persisted production revocation state.',
    'No remote migrations were applied and no real entitlement was granted or revoked.',
  ],
};

if (testRun.status !== 0) {
  process.stderr.write(output);
  process.exit(testRun.status ?? 1);
}

if (process.argv.includes('--write')) {
  writeFileSync(evidencePath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`✓ Evidencia adversarial local regenerada: ${passCount}/${passCount + failCount}; Wompi Sandbox sigue BLOCKED.`);
} else if (process.argv.includes('--verify')) {
  const saved = JSON.parse(readFileSync(evidencePath, 'utf8'));
  if (JSON.stringify(saved) !== JSON.stringify(report)) {
    console.error('La evidencia local de pagos ICFES está obsoleta. Regenera el JSON revisado.');
    process.exit(1);
  }
  console.log(`✓ Evidencia adversarial local verificada: ${passCount}/${passCount + failCount}; Wompi Sandbox sigue BLOCKED.`);
} else {
  console.log(JSON.stringify(report, null, 2));
}
