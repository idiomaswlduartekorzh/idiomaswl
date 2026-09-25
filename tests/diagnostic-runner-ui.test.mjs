import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const client = await readFile(new URL('../src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx', import.meta.url), 'utf8');
const page = await readFile(new URL('../src/app/(site)/nivel-radar/page.tsx', import.meta.url), 'utf8');

test('adaptive runner uses only server-issued stages and never bundles answer keys', () => {
  assert.match(client, /fetch\('\/api\/diagnostic\/attempts'/);
  assert.match(client, /\/stages\/\$\{objective\.stage\.stageId\}/);
  assert.match(client, /contentVersion: item\.contentVersion/);
  assert.match(client, /responseMs:/);
  assert.match(client, /audioPlayCount:/);
  assert.doesNotMatch(client, /correctAnswer|correctOption|answer:/);
  assert.doesNotMatch(client, /cambridge|toefl|ICFES_DIAGNOSTIC_QUESTIONS/);
});

test('runner supports resume, private audio, writing and uncertainty-aware results', () => {
  assert.match(client, /welearn:diagnostic:active-attempt/);
  assert.match(client, /kind === 'processing'/);
  assert.match(client, /audioStimulus\.src/);
  assert.match(client, /minimumWords/);
  assert.match(client, /plausibleRange/);
  assert.match(client, /No sé \/ omitir/);
});

test('adaptive UI has an independent server-side release flag', () => {
  assert.match(page, /DIAGNOSTIC_ADAPTIVE_UI_ENABLED === 'true'/);
  assert.match(page, /adaptiveUiEnabled \? <AdaptiveNivelRadarClient \/> : <NivelRadarClient \/>/);
});
