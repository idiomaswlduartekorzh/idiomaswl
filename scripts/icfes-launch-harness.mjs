import process from 'node:process';
import { refreshHarness, validateHarness } from './lib/icfes-launch-harness-core.mjs';

const repoRoot = process.cwd();
if (process.argv.includes('--refresh')) await refreshHarness(repoRoot);
const result = await validateHarness(repoRoot);
console.log(JSON.stringify(result, null, 2));
