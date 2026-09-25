import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const guide = await readFile(new URL('../docs/diagnostic-interpretation-guide.md', import.meta.url), 'utf8');
const client = await readFile(new URL('../src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx', import.meta.url), 'utf8');
const snapshots = await readFile(new URL('../scripts/lib/diagnostic-governance-snapshots.mjs', import.meta.url), 'utf8');

test('tutor guide defines permitted use, uncertainty and non-certification language', () => {
  for (const phrase of [
    'lectura, escucha, escritura, gramática y vocabulario',
    'No debe usarse para admisión, inmigración, contratación, certificación oficial',
    'No estimada',
    'Confianza técnica',
    'no porcentaje de dominio',
    'El tutor no modifica un nivel',
  ]) assert.match(guide, new RegExp(phrase, 'u'));
  assert.match(guide, /pantalla o el PDF del intento exacto/);
  assert.match(guide, /sin copiar respuestas, texto escrito, IDs de ítem ni\s+audio reservado/);
});

test('screen, PDF and delivery governance share the interpretation contract', () => {
  assert.match(client, /diagnosticProfileWarningLabel/);
  assert.match(client, /diagnosticSkillStatusLabel/);
  assert.match(client, /diagnosticConfidenceLabel/);
  assert.match(client, /no es un porcentaje de dominio del idioma/);
  assert.match(client, /no es porcentaje de dominio ni probabilidad de acierto del nivel/);
  assert.match(snapshots, /docs\/diagnostic-interpretation-guide\.md/);
  assert.match(snapshots, /src\/lib\/diagnostic\/result-language\.ts/);
});
