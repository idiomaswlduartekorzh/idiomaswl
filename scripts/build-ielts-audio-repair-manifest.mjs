#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256, ttsText } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const specsPath = path.join(root, 'config/ielts-audio/repair-specs.json');
const outputPath = path.join(root, 'config/ielts-audio/repair-manifest.json');
const specsBytes = readFileSync(specsPath);
const specs = JSON.parse(specsBytes);
const production = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-manifest.json'), 'utf8'));
const policy = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/production-policy.json'), 'utf8'));
const write = process.argv.includes('--write');
for (const argument of process.argv.slice(2)) assert.equal(argument, '--write', `Unknown argument: ${argument}`);

const rows = specs.repairs.map(spec => {
  const productionRow = production.rows.find(row => row.set === spec.set);
  assert.ok(productionRow, `Production manifest missing Set ${spec.set}`);
  const sourceAudioPath = path.join(root, 'public', productionRow.audioUrl);
  assert.ok(existsSync(sourceAudioPath), `Repair source missing: ${sourceAudioPath}`);
  const asrPath = path.join(root, 'output/ielts-asr', production.manifestSha256, `asr-report-set-${spec.set}.json`);
  assert.ok(existsSync(asrPath), `Run reuse ASR before freezing repair Set ${spec.set}`);
  const asr = JSON.parse(readFileSync(asrPath, 'utf8'));
  const missing = asr.completionEvidence.filter(item => !item.found).map(item => item.question);
  assert.deepEqual(missing, spec.requiredQuestions.filter(question => missing.includes(question)), `Set ${spec.set} repair questions are not backed by the current failed ASR report`);
  assert.ok(spec.gapEndSeconds > spec.gapStartSeconds, `Set ${spec.set} repair gap is invalid`);
  const segments = spec.segments.map(segment => ({
    ...segment,
    billableCharacters: ttsText(segment.text).length,
    textSha256: sha256(segment.text),
  }));
  return {
    ...spec,
    audioUrl: productionRow.audioUrl,
    sourceAudioSha256: sha256(readFileSync(sourceAudioPath)),
    discoveryAsrReportSha256: sha256(readFileSync(asrPath)),
    productionManifestSha256: production.manifestSha256,
    gapDurationSeconds: Number((spec.gapEndSeconds - spec.gapStartSeconds).toFixed(3)),
    segments,
    billableCharacters: segments.reduce((total, segment) => total + segment.billableCharacters, 0),
  };
});
const billableCharacters = rows.reduce((total, row) => total + row.billableCharacters, 0);
const creditsPerCharacter = policy.generation.creditsPerCharacter[policy.generation.defaultModelId];
const manifestCore = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString().slice(0, 10),
  repairSpecsSha256: sha256(specsBytes),
  productionManifestSha256: production.manifestSha256,
  modelId: policy.generation.defaultModelId,
  rows,
  invoice: {
    billableCharacters,
    estimatedCredits: Math.ceil(billableCharacters * creditsPerCharacter),
    estimatedUsdBeforeTax: Number((billableCharacters * policy.generation.apiPriceUsdPer1000Characters[policy.generation.defaultModelId] / 1000).toFixed(4)),
  },
  releaseAuthorized: false,
};
const manifest = { ...manifestCore, repairManifestSha256: sha256(JSON.stringify(manifestCore)) };
if (write) writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
else {
  assert.ok(existsSync(outputPath), 'Missing repair manifest; run with --write');
  assert.deepEqual(JSON.parse(readFileSync(outputPath, 'utf8')), manifest, 'Repair manifest is stale; run with --write');
}
console.log(JSON.stringify({ repairManifestSha256: manifest.repairManifestSha256, sets: rows.map(row => row.set), invoice: manifest.invoice, write }, null, 2));
