import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseMode = process.argv.includes('--release');
const compareArgument = process.argv.find((argument) => argument.startsWith('--compare-git-ref='));
const compareRef = compareArgument?.slice('--compare-git-ref='.length) || 'origin/main';
const reportDirectory = path.join(repoRoot, 'tmp/ielts-superhub-harness');
const modeReportPath = path.join(reportDirectory, releaseMode ? 'latest-release.json' : 'latest-truth.json');
const latestReportPath = path.join(reportDirectory, 'latest.json');

const stages = [
  {
    id: 'scope',
    command: process.execPath,
    args: ['scripts/check-ielts-scope.mjs', `--compare-git-ref=${compareRef}`],
  },
  {
    id: 'production-baseline',
    command: 'npm',
    args: ['run', 'check:production-baseline', '--', `--compare-git-ref=${compareRef}`],
  },
  { id: 'ielts-truth', command: 'npm', args: ['run', 'check:ielts:truth'] },
  { id: 'harness-mutations', command: 'npm', args: ['run', 'test:ielts:superhub'] },
  { id: 'practice-catalog', command: 'npm', args: ['run', 'check:practica-catalog'] },
];

if (releaseMode) {
  stages.push(
    { id: 'release-environment', command: process.execPath, args: ['scripts/check-ielts-release-environment.mjs'] },
    { id: 'ielts-task1', command: 'npm', args: ['run', 'check:ielts-task1'] },
    { id: 'ielts-task2', command: 'npm', args: ['run', 'check:ielts-task2'] },
    { id: 'ielts-review', command: 'npm', args: ['run', 'check:ielts-review-blueprint'] },
    { id: 'typescript', command: 'npx', args: ['tsc', '--noEmit', '--pretty', 'false'] },
    { id: 'production-build', command: 'npm', args: ['run', 'build'] },
  );
}

const report = {
  schemaVersion: 1,
  harness: 'ielts-superhub',
  mode: releaseMode ? 'release' : 'truth',
  compareRef,
  startedAt: new Date().toISOString(),
  knownBaselineDebt: JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'config/ielts-superhub-harness.json'), 'utf8'),
  ).knownBaselineDebt,
  stages: [],
};

function tail(value, maximum = 6000) {
  const normalized = value?.toString() ?? '';
  return normalized.length > maximum ? normalized.slice(-maximum) : normalized;
}

for (const stage of stages) {
  const startedAt = Date.now();
  console.log(`\n[IELTS harness] ${stage.id}`);
  const result = spawnSync(stage.command, stage.args, {
    cwd: repoRoot,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
  const stdout = result.stdout ?? '';
  const stderr = result.stderr ?? '';
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);
  const status = result.status === 0 ? 'PASS' : 'BLOCK';
  report.stages.push({
    id: stage.id,
    status,
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    command: [stage.command, ...stage.args],
    stdoutTail: tail(stdout),
    stderrTail: tail(stderr),
  });
  if (status === 'BLOCK') break;
}

report.finishedAt = new Date().toISOString();
report.decision = report.stages.length === stages.length && report.stages.every((stage) => stage.status === 'PASS')
  ? 'APPROVE'
  : 'BLOCK';
fs.mkdirSync(reportDirectory, { recursive: true });
const serializedReport = `${JSON.stringify(report, null, 2)}\n`;
fs.writeFileSync(modeReportPath, serializedReport);
fs.writeFileSync(latestReportPath, serializedReport);

console.log(`\nIELTS superhub harness: ${report.decision}`);
console.log(`Informe de modo: ${path.relative(repoRoot, modeReportPath)}`);
console.log(`Último informe: ${path.relative(repoRoot, latestReportPath)}`);
if (report.decision === 'BLOCK') process.exitCode = 1;
