import assert from 'node:assert/strict';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from '../src/server/diagnostic/bank/listening-production-mid.en.ts';
import { buildDiagnosticListeningProductionPackage } from './lib/diagnostic-listening-production.mjs';

const repoRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const privateRoot = path.join(repoRoot, '.diagnostic-private');
const args = process.argv.slice(2);
const value = flag => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};
const requestedLevels = value('--levels')?.split(',').map(level => level.trim().toUpperCase()).filter(Boolean) ?? [];
const allowedLevels = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
assert.ok(requestedLevels.every(level => allowedLevels.has(level)), '--levels must contain only A1,A2,B1,B2,C1,C2');

const allBriefs = [
  ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
  ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
];
const selectedBriefs = requestedLevels.length
  ? allBriefs.filter(brief => requestedLevels.includes(brief.level))
  : allBriefs;
assert.ok(selectedBriefs.length > 0, 'recording package selection is empty');

const productionPackage = buildDiagnosticListeningProductionPackage(selectedBriefs);
const requestedOutput = value('--output');
const outputRoot = requestedOutput
  ? path.resolve(repoRoot, requestedOutput)
  : path.join(privateRoot, 'listening-production', productionPackage.packageSha256.slice(0, 16));
const relative = path.relative(privateRoot, outputRoot);
assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'recording packages must stay inside .diagnostic-private');
assert.ok(!existsSync(outputRoot), `refusing to overwrite existing recording package: ${outputRoot}`);

mkdirSync(outputRoot, { recursive: true });
writeFileSync(path.join(outputRoot, 'manifest.json'), `${JSON.stringify(productionPackage, null, 2)}\n`);
for (const medium of productionPackage.media) {
  const mediaRoot = path.join(outputRoot, medium.mediaId);
  mkdirSync(mediaRoot, { recursive: true });
  writeFileSync(path.join(mediaRoot, 'transcript.txt'), `${medium.transcript}\n`);
  writeFileSync(path.join(mediaRoot, 'recording-brief.json'), `${JSON.stringify({
    mediaId: medium.mediaId,
    level: medium.level,
    productionVersion: medium.productionVersion,
    transcriptSha256: medium.transcriptSha256,
    targetDurationSeconds: medium.targetDurationSeconds,
    paceWordsPerMinute: medium.paceWordsPerMinute,
    delivery: medium.delivery,
    speakers: medium.speakers,
    requiredOutputFilename: `${medium.mediaId}.mp3`,
  }, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify({
  outputRoot,
  packageSha256: productionPackage.packageSha256,
  mediaCount: productionPackage.media.length,
  levels: [...new Set(productionPackage.media.map(medium => medium.level))],
  containsAssessmentContent: false,
}, null, 2)}\n`);
