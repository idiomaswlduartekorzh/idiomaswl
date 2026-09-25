import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { simulateDiagnosticMst } from '../src/server/diagnostic/simulation.ts';

const report = simulateDiagnosticMst();
const serialized = `${JSON.stringify(report, null, 2)}\n`;
const outputIndex = process.argv.indexOf('--output');
if (outputIndex >= 0) {
  const outputPath = resolve(process.cwd(), process.argv[outputIndex + 1]);
  writeFileSync(outputPath, serialized);
  process.stdout.write(`${JSON.stringify({ status: 'WRITTEN', outputPath }, null, 2)}\n`);
} else {
  process.stdout.write(serialized);
}
