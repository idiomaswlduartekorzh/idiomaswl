import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
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

const delay = milliseconds => new Promise(resolveDelay => setTimeout(resolveDelay, milliseconds));
const availablePort = () => new Promise((resolvePort, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : null;
    server.close(error => error ? reject(error) : resolvePort(port));
  });
});
async function waitForServer(url, child, serverOutput) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Production server exited before E2E.\n${serverOutput()}`);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) return;
    } catch {
      // The process is still starting; retry within the bounded deadline.
    }
    await delay(250);
  }
  throw new Error(`Production server did not become ready for E2E.\n${serverOutput()}`);
}
async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([once(child, 'exit'), delay(5_000)]);
  if (child.exitCode === null) {
    child.kill('SIGKILL');
    await once(child, 'exit');
  }
}

const suiteOutput = run('pnpm', ['run', 'test:diagnostic-foundation']);
const testCount = Number([...suiteOutput.matchAll(/ℹ tests (\d+)/gu)].at(-1)?.[1]);
if (!Number.isInteger(testCount) || testCount < 1) throw new Error('Diagnostic suite test count was not detected.');
run(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit']);
const nodeOptions = (process.env.NODE_OPTIONS ?? '')
  .split(/\s+/u)
  .filter(option => option && !option.startsWith('--max-old-space-size='))
  .concat('--max-old-space-size=8192')
  .join(' ');
const buildOutput = run(process.execPath, ['node_modules/next/dist/bin/next', 'build', '--webpack'], {
  ...process.env,
  NODE_OPTIONS: nodeOptions,
  DIAGNOSTIC_ADAPTIVE_UI_ENABLED: 'true',
  DIAGNOSTIC_QUALITY_BUILD: 'true',
});
const pageProgress = [...buildOutput.matchAll(/\((\d+)\/(\d+)\)/gu)]
  .map(match => [Number(match[1]), Number(match[2])])
  .filter(([current, total]) => current === total && total > 0);
const staticPageCount = pageProgress.at(-1)?.[1] ?? 0;
if (!staticPageCount) throw new Error('Production build static page count was not detected.');
const port = await availablePort();
if (!Number.isInteger(port)) throw new Error('Could not reserve a local port for diagnostic E2E.');
const baseUrl = `http://127.0.0.1:${port}`;
let serverLog = '';
const server = spawn(process.execPath, [
  'node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port),
], {
  cwd: root,
  env: { ...process.env, NODE_OPTIONS: nodeOptions, DIAGNOSTIC_ADAPTIVE_UI_ENABLED: 'true' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
const appendServerLog = chunk => { serverLog = `${serverLog}${chunk.toString('utf8')}`.slice(-8_000); };
server.stdout.on('data', appendServerLog);
server.stderr.on('data', appendServerLog);
let e2eOutput;
try {
  await waitForServer(`${baseUrl}/nivel-radar`, server, () => serverLog);
  const installedChrome = process.platform === 'darwin'
    && existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  const browserEnv = process.env.PLAYWRIGHT_USE_INSTALLED_CHROME
    ? process.env.PLAYWRIGHT_USE_INSTALLED_CHROME
    : installedChrome ? 'true' : 'false';
  e2eOutput = run(process.execPath, [
    'node_modules/@playwright/test/cli.js', 'test', 'tests/e2e/diagnostic-adaptive.spec.ts',
  ], { ...process.env, BASE_URL: baseUrl, PLAYWRIGHT_USE_INSTALLED_CHROME: browserEnv });
} finally {
  await stopServer(server);
}
const e2eTestCount = Number([...e2eOutput.matchAll(/(\d+) passed/gu)].at(-1)?.[1]);
if (!Number.isInteger(e2eTestCount) || e2eTestCount < 1) {
  throw new Error('Diagnostic browser E2E test count was not detected.');
}
if (!clean() || diagnosticReleaseSourceSha256(root) !== sourceSha256) {
  throw new Error('Diagnostic source changed during quality verification.');
}

const receipt = {
  receiptVersion: 'diagnostic-quality-evidence-v2',
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
    browserE2E: {
      passed: true,
      testCount: e2eTestCount,
      serverMode: 'production',
      adaptiveUiEnabled: true,
    },
  },
  claims: { sourceUnchangedDuringRun: true, outputsContainSecrets: false },
};
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
