import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nodeModulesPath = path.join(repoRoot, 'node_modules');

if (!fs.existsSync(nodeModulesPath)) {
  console.error('IELTS release environment: BLOCK');
  console.error('- Falta node_modules. Ejecuta npm ci dentro del mismo filesystem del worktree.');
  process.exit(1);
}

const realNodeModules = fs.realpathSync(nodeModulesPath);
const relative = path.relative(repoRoot, realNodeModules);
if (relative.startsWith('..') || path.isAbsolute(relative)) {
  console.error('IELTS release environment: BLOCK');
  console.error(`- node_modules resuelve fuera del worktree: ${realNodeModules}`);
  console.error('- Turbopack rechaza este layout. Instala las dependencias físicamente dentro del worktree antes del release.');
  process.exit(1);
}

console.log('IELTS release environment: PASS');
console.log(`- node_modules está dentro del worktree: ${realNodeModules}`);
