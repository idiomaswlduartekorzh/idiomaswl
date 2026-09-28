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

test('runner supports resume, private audio, discourse ordering and uncertainty-aware results', () => {
  assert.match(client, /welearn:diagnostic:active-attempt/);
  assert.match(client, /kind === 'processing'/);
  assert.match(client, /audioStimulus\.src/);
  assert.match(client, /kind === 'ordering'/);
  assert.match(client, /moveOrderingFragment/);
  assert.match(client, /Usar este orden/);
  assert.match(client, /plausibleRange/);
  assert.match(client, /No sé \/ omitir/);
  assert.match(client, /readObjectiveDraft/);
  assert.match(client, /writeObjectiveDraft/);
  assert.match(client, /written-discourse/);
  assert.match(client, /recommendations/);
  assert.match(client, /import\('jspdf'\)/);
  assert.match(client, /nivel-radar-welearn\.pdf/);
});

test('audio readiness uses a real non-scored sample and explicit listener confirmation', () => {
  assert.match(client, /audioCheck\.assetPath/);
  assert.match(client, /Muestra de sonido no puntuada/);
  assert.match(client, /Confirmo que escuché la muestra con claridad/);
  assert.match(client, /setAudioSampleStarted\(true\)/);
  assert.doesNotMatch(client, /createOscillator|AudioContext/);
  assert.match(client, /No puedo realizar la parte de escucha y necesito la vía accesible/);
  assert.match(client, /Escucha quedará sin estimar/);
  assert.match(client, /listeningAccommodation/);
});

test('runner avoids free-text review, explains the objective construct and exposes data deletion', () => {
  assert.match(client, /Todo se califica automáticamente/);
  assert.match(client, /No enviamos texto libre a revisores ni proveedores externos/);
  assert.match(client, /no acredita producción libre/i);
  assert.match(client, /Borrar mis datos diagnósticos/);
  assert.match(client, /confirmation: 'DELETE_DIAGNOSTIC_DATA'/);
});

test('adaptive UI has an independent server-side release flag and isolated preview review mode', () => {
  assert.match(page, /DIAGNOSTIC_ADAPTIVE_UI_ENABLED === 'true'/);
  assert.match(page, /process\.env\.VERCEL_ENV === 'preview'/);
  assert.match(page, /adaptiveUiEnabled \? <AdaptiveNivelRadarClient reviewMode=\{reviewMode\} \/> : <NivelRadarClient \/>/);
  assert.match(client, /Preview de revisión · recorrido simulado/);
  assert.match(client, /No guarda respuestas ni inventa un nivel personal/i);
});

test('preview review mode mirrors the real 15 + 20 objective path instead of returning a superficial profile', () => {
  assert.match(client, /items: REVIEW_LOCATOR_ITEMS/);
  assert.match(client, /items: REVIEW_PRECISION_ITEMS/);
  assert.match(client, /REVIEW_OBJECTIVE_DELIVERY\.stage\.stageId/);
  assert.match(client, /activateDelivery\(REVIEW_PRECISION_DELIVERY\)/);
  assert.match(client, /setView\('review-complete'\)/);
  assert.doesNotMatch(client, /const REVIEW_RESULT/);
});
