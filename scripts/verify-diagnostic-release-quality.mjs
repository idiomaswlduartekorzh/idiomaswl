import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { diagnosticReleaseSourceSha256 } from './lib/diagnostic-release-source.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputArgument = process.argv.find(argument => argument.startsWith('--output='));
if (!process.argv.includes('--execute')) {
  process.stdout.write('Diagnostic release quality verification is a dry run.\n');
  process.stdout.write('Add --execute and a private --output path to run the suite, TypeScript and production build.\n');
  process.exit(0);
}
if (!outputArgument) throw new Error('Quality verification requires --output below .diagnostic-private/.');

const outputPath = resolve(root, outputArgument.slice('--output='.length));
const privateRoot = resolve(root, '.diagnostic-private');
const privateRelative = relative(privateRoot, outputPath);
if (!privateRelative || privateRelative === '..' || privateRelative.startsWith(`..${sep}`)) {
  throw new Error('Quality receipts may only be written below .diagnostic-private/.');
}
const clean = () => execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim() === '';
if (!clean()) throw new Error('Quality verification requires a clean working tree.');

const startedAt = new Date().toISOString();
const sourceSha256 = diagnosticReleaseSourceSha256(root);
const commitSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const run = (command, args, env = process.env) => {
  const result = spawnSync(command, args, {
    cwd: root, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.slice(-4_000);
    throw new Error(`Quality command failed: ${command} ${args.join(' ')}\n${output}`);
  }
  return `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
};

const suiteOutput = run('pnpm', ['run', 'test:diagnostic-foundation']);
const testCount = Number([...suiteOutput.matchAll(/ℹ tests (\d+)/gu)].at(-1)?.[1]);
if (!Number.isInteger(testCount) || testCount < 1) throw new Error('Diagnostic suite test count was not detected.');
run(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit']);
const buildOutput = run(process.execPath, ['node_modules/next/dist/bin/next', 'build', '--webpack'], {
  ...process.env,
  NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --max-old-space-size=6144`.trim(),
});
const pageProgress = [...buildOutput.matchAll(/\((\d+)\/(\d+)\)/gu)]
  .map(match => [Number(match[1]), Number(match[2])])
  .filter(([current, total]) => current === total && total > 0);
const staticPageCount = pageProgress.at(-1)?.[1] ?? 0;
if (!staticPageCount) throw new Error('Production build static page count was not detected.');
if (!clean() || diagnosticReleaseSourceSha256(root) !== sourceSha256) {
  throw new Error('Diagnostic source changed during quality verification.');
}

const receipt = {
  receiptVersion: 'diagnostic-quality-evidence-v1',
  decision: 'PASS',
  startedAt,
  completedAt: new Date().toISOString(),
  sourceSha256,
  commitSha,
  checks: {
    workingTreeClean: true,
    diagnosticSuite: { passed: true, testCount },
    typescript: { passed: true },
    productionBuild: { passed: true, staticPageCount },
  },
  claims: { sourceUnchangedDuringRun: true, outputsContainSecrets: false },
};
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
