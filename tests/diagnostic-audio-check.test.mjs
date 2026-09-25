import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '../src/server/diagnostic/bank/index.ts';

const config = JSON.parse(await readFile(new URL('../config/diagnostic/audio-check.json', import.meta.url), 'utf8'));
const asset = await readFile(new URL(`../public${config.assetPath}`, import.meta.url));

test('audio check reuses one immutable public asset only as unscored familiarization', () => {
  assert.deepEqual(Object.keys(config).sort(), [
    'assessmentBankEligible', 'assetPath', 'assetSha256', 'checkVersion', 'language',
    'purpose', 'scored', 'source',
  ]);
  assert.equal(config.checkVersion, 'english-diagnostic-audio-check-v1');
  assert.equal(config.language, 'en');
  assert.equal(config.source, 'recycled-public-reading-audio');
  assert.equal(config.scored, false);
  assert.equal(config.assessmentBankEligible, false);
  assert.equal(createHash('sha256').update(asset).digest('hex'), config.assetSha256);
  assert.ok(asset.length > 1_000);
});

test('the familiarization asset never enters either reserved assessment bank', () => {
  const serializedBank = JSON.stringify({
    objective: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
    writing: ENGLISH_DIAGNOSTIC_WRITING_BANK,
  });
  assert.equal(serializedBank.includes(config.assetPath), false);
  assert.equal(serializedBank.includes(config.assetSha256), false);
});
