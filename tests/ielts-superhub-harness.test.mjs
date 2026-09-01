import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  findScopeViolations,
  findPublicAnswerKeyPaths,
  readJson,
  requiredFileAndMarkerFailures,
  validateAgentsManifest,
  validateHarnessManifest,
  validateListeningMock,
  validateRouteInventory,
} from '../scripts/lib/ielts-superhub-harness.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const harness = readJson(path.join(repoRoot, 'config/ielts-superhub-harness.json'));
const agents = readJson(path.join(repoRoot, 'config/ielts-superhub-agents.json'));
const clone = (value) => structuredClone(value);

function mockWithPartSlots(partSlots) {
  return {
    id: 'set-1',
    examSlug: 'ielts',
    sections: partSlots.map((slots, index) => ({
      part: index + 1,
      skill: 'listening',
      title: `Part ${index + 1}`,
      instructions: 'Listen and answer.',
      transcript: 'Audited transcript content. '.repeat(8),
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      questions: [{ id: `part-${index + 1}`, qRange: [1, slots] }],
    })),
  };
}

test('los manifiestos actuales cumplen sus contratos', () => {
  assert.deepEqual(validateAgentsManifest(agents), []);
  assert.deepEqual(validateHarnessManifest(harness), []);
});

test('detecta agentes duplicados y roles retirados', () => {
  const mutated = clone(agents);
  mutated.agents.at(-1).id = 'orchestrator';
  const failures = validateAgentsManifest(mutated).join('\n');
  assert.match(failures, /identificadores.*únicos/i);
  assert.match(failures, /release-guardian/);
});

test('detecta estados de audio solapados', () => {
  const mutated = clone(harness);
  mutated.listeningSets.published = [1];
  const failures = validateHarnessManifest(mutated).join('\n');
  assert.match(failures, /set 1 aparece/i);
  assert.match(failures, /área Listening siga bloqueada/i);
});

test('acepta 4 partes de 10 y rechaza una respuesta menos o una más', () => {
  assert.deepEqual(validateListeningMock(mockWithPartSlots([10, 10, 10, 10]), 1, harness.minimums), []);

  const shortFailures = validateListeningMock(mockWithPartSlots([9, 10, 10, 10]), 1, harness.minimums).join('\n');
  assert.match(shortFailures, /parte 1.*9 respuestas/i);
  assert.match(shortFailures, /39 respuestas Listening/i);

  const longFailures = validateListeningMock(mockWithPartSlots([11, 10, 10, 10]), 1, harness.minimums).join('\n');
  assert.match(longFailures, /parte 1.*11 respuestas/i);
  assert.match(longFailures, /41 respuestas Listening/i);
});

test('una excepción estructural solo pasa si coincide exactamente con la deuda declarada', () => {
  const declared = validateListeningMock(
    mockWithPartSlots([10, 10, 7, 13]),
    1,
    harness.minimums,
    { expectedPartSlots: [10, 10, 7, 13] },
  );
  assert.deepEqual(declared, []);

  const drift = validateListeningMock(
    mockWithPartSlots([10, 10, 8, 12]),
    1,
    harness.minimums,
    { expectedPartSlots: [10, 10, 7, 13] },
  ).join('\n');
  assert.match(drift, /ya no coincide con su deuda estructural/i);
});

test('bloquea cambios TOEFL y archivos compartidos durante la fase aislada', () => {
  const failures = findScopeViolations(
    [
      'src/app/(site)/practica/toefl/listening/page.tsx',
      'docs/ielts-toefl-route-map.md',
      'src/app/(site)/practica/ielts/page.tsx',
    ],
    harness,
  ).join('\n');
  assert.match(failures, /no puede modificar TOEFL/i);
  assert.match(failures, /archivo compartido diferido/i);
});

test('detecta si una sesión pierde el marcador noindex', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-'));
  const relativePath = 'session/page.tsx';
  fs.mkdirSync(path.dirname(path.join(tempRoot, relativePath)), { recursive: true });
  fs.writeFileSync(path.join(tempRoot, relativePath), 'export const metadata = {};\n');
  const failures = requiredFileAndMarkerFailures(tempRoot, {
    requiredFiles: [relativePath],
    requiredMarkers: { [relativePath]: ['robots: { index: false, follow: false }'] },
  });
  assert.match(failures.join('\n'), /perdió el marcador.*robots/i);
});

test('reconoce rutas IELTS estáticas añadidas directamente al sitemap', () => {
  const manifest = clone(harness);
  manifest.minimums.canonicalRoutes = 3;
  manifest.routeInventory.documentedCanonicalFloor = 1;
  manifest.routeInventory.knownSitemapOnlyRoutes = [
    '/practica/ielts/listening',
    '/practica/ielts/listening/part-1',
  ];
  manifest.routeInventory.noindexQueryRoutes = [
    '/practica/ielts/listening/sesion?practice=pilot&part=1',
  ];
  const routeMap = '`/practica/ielts`\n`/practica/ielts/listening/sesion?practice=pilot&part=1`';
  const sitemap = '`${BASE}/practica/ielts/listening`\n`${BASE}/practica/ielts/listening/part-1`';
  assert.deepEqual(validateRouteInventory(routeMap, sitemap, manifest), []);
  assert.match(validateRouteInventory(routeMap, sitemap.replace('/part-1', '/missing'), manifest).join('\n'), /part-1/);
});

test('el auditor de DTO público detecta claves answer y answers a cualquier profundidad', () => {
  const safeDto = { id: 'set-1-part-1', questions: [{ id: 'q1', options: ['A', 'B'] }] };
  assert.deepEqual(findPublicAnswerKeyPaths(safeDto), []);

  const leakingDto = {
    questions: [
      { id: 'q1', answer: 1 },
      { id: 'q2', blanks: [{ answers: ['secret'] }] },
    ],
  };
  assert.deepEqual(findPublicAnswerKeyPaths(leakingDto), [
    '$.questions.0.answer',
    '$.questions.1.blanks.0.answers',
  ]);
});
