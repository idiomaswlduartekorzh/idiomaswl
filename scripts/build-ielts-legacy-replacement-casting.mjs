#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourcePath = path.join(root, 'config/ielts-audio/voice-casting.json');
const manifestPath = path.join(root, 'config/ielts-audio/legacy-replacement-manifest.json');
const outputPath = path.join(root, 'config/ielts-audio/legacy-replacement-casting.json');
const write = process.argv.includes('--write');
for (const argument of process.argv.slice(2)) assert.equal(argument, '--write', `Unknown argument: ${argument}`);

const sourceBytes = readFileSync(sourcePath);
const source = JSON.parse(sourceBytes);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const approvedSets = manifest.rows.map(row => row.set);
const casting = {
  ...source,
  manifest_sha256: manifest.manifestSha256,
  source_casting_sha256: sha256(sourceBytes),
  approval: 'authorized_for_legacy_replacement_staging_by_owner_2026-09-09',
  approval_scope: {
    approved_sets: approvedSets,
    pilot_set: 5,
    approved_max_usd_before_tax: 8.5,
    minimum_remaining_credits: 5000,
    authorization_basis: 'User explicitly authorized generating the audited legacy replacements with renewed ElevenLabs credits, prioritizing quality and then cost.',
    human_release_review_still_required: true,
  },
  target: {
    ...source.target,
    playback_speed_by_set: {
      '6': 0.992,
    },
  },
  account_snapshot: {
    status: 'verified_by_read_only_api_query_before_production',
    captured_at: '2026-09-09',
  },
};
assert.equal(casting.model_id, manifest.invoice.requiredProduction.modelId);
assert.ok(casting.approval_scope.approved_max_usd_before_tax >= manifest.invoice.requiredProduction.estimatedUsdBeforeTax);

if (write) writeFileSync(outputPath, `${JSON.stringify(casting, null, 2)}\n`);
else {
  assert.ok(existsSync(outputPath), `Missing ${path.relative(root, outputPath)}; run with --write`);
  assert.deepEqual(JSON.parse(readFileSync(outputPath, 'utf8')), casting, 'Legacy replacement casting is stale; run with --write');
}

console.log(JSON.stringify({
  manifestSha256: casting.manifest_sha256,
  modelId: casting.model_id,
  approvedSets,
  approvedMaxUsdBeforeTax: casting.approval_scope.approved_max_usd_before_tax,
  minimumRemainingCredits: casting.approval_scope.minimum_remaining_credits,
  write,
  note: 'Casting authorization only; no provider call occurred.',
}, null, 2));
