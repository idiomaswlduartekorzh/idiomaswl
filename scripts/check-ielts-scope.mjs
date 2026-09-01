import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { findScopeViolations, readJson } from './lib/ielts-superhub-harness.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = readJson(path.join(repoRoot, 'config/ielts-superhub-harness.json'));
const compareArgument = process.argv.find((argument) => argument.startsWith('--compare-git-ref='));
const compareRef = compareArgument?.slice('--compare-git-ref='.length) || 'origin/main';
const allowSharedIntegration = process.argv.includes('--allow-shared-integration');

function gitLines(args) {
  try {
    return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    const stderr = error?.stderr?.toString().trim();
    throw new Error(`No se pudo ejecutar git ${args.join(' ')}: ${stderr || error.message}`);
  }
}

let paths;
try {
  paths = [
    ...gitLines(['diff', '--name-only', `${compareRef}...HEAD`]),
    ...gitLines(['diff', '--name-only']),
    ...gitLines(['diff', '--name-only', '--cached']),
    ...gitLines(['ls-files', '--others', '--exclude-standard']),
  ];
} catch (error) {
  console.error(`IELTS scope gate: BLOCK\n- ${error.message}`);
  process.exit(1);
}

const changedPaths = [...new Set(paths)].sort();
const failures = findScopeViolations(changedPaths, manifest, { allowSharedIntegration });
if (failures.length) {
  console.error('IELTS scope gate: BLOCK');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`IELTS scope gate: PASS (${changedPaths.length} rutas cambiadas contra ${compareRef})`);
  console.log('- Ningún archivo TOEFL fue modificado.');
  if (!allowSharedIntegration) console.log('- Los archivos mixtos IELTS/TOEFL siguen diferidos.');
}
