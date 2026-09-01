import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import {
  countIeltsPodcastEntries,
  readJson,
  requiredFileAndMarkerFailures,
  validateAgentsManifest,
  validateHarnessManifest,
  validateListeningMock,
  validateRouteInventory,
  walkFiles,
} from './lib/ielts-superhub-harness.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const harness = readJson(path.join(repoRoot, 'config/ielts-superhub-harness.json'));
const agents = readJson(path.join(repoRoot, 'config/ielts-superhub-agents.json'));
const failures = [
  ...validateAgentsManifest(agents),
  ...validateHarnessManifest(harness),
  ...requiredFileAndMarkerFailures(repoRoot, harness),
];

const routeRoot = path.join(repoRoot, 'src/app/(site)/practica/ielts');
const pageFiles = walkFiles(routeRoot).filter((file) => file.endsWith(`${path.sep}page.tsx`));
if (pageFiles.length < harness.minimums.routePageFiles) {
  failures.push(`El árbol IELTS tiene ${pageFiles.length} page.tsx; el mínimo protegido es ${harness.minimums.routePageFiles}.`);
}

const routeMapSource = fs.readFileSync(path.join(repoRoot, 'docs/ielts-toefl-route-map.md'), 'utf8');
const sitemapSource = fs.readFileSync(path.join(repoRoot, 'src/app/sitemap.ts'), 'utf8');
failures.push(...validateRouteInventory(routeMapSource, sitemapSource, harness));

const mockDirectory = path.join(repoRoot, 'src/data/mocks');
const mockFiles = walkFiles(mockDirectory)
  .filter((file) => /ielts-set-\d+\.ts$/.test(file))
  .sort((left, right) => Number(left.match(/(\d+)\.ts$/)[1]) - Number(right.match(/(\d+)\.ts$/)[1]));
if (mockFiles.length !== harness.minimums.registeredMocks) {
  failures.push(`Hay ${mockFiles.length} archivos de mock IELTS; se esperaban ${harness.minimums.registeredMocks}.`);
}

const registrySource = fs.readFileSync(path.join(mockDirectory, 'index.ts'), 'utf8');
const registeredMocks = new Set([...registrySource.matchAll(/'ielts:set-(\d+)'\s*:/g)].map((match) => Number(match[1])));
if (registeredMocks.size !== harness.minimums.registeredMocks) {
  failures.push(`El registro contiene ${registeredMocks.size} mocks IELTS; se esperaban ${harness.minimums.registeredMocks}.`);
}

for (let setNumber = 1; setNumber <= harness.minimums.registeredMocks; setNumber += 1) {
  const mockPath = path.join(mockDirectory, `ielts-set-${setNumber}.ts`);
  if (!fs.existsSync(mockPath)) continue;
  try {
    const module = await import(`${pathToFileURL(mockPath).href}?truth=${setNumber}`);
    const expectedPartSlots = harness.knownListeningStructureDebt?.[String(setNumber)]?.partAnswerSlots;
    failures.push(...validateListeningMock(module.default, setNumber, harness.minimums, { expectedPartSlots }));
  } catch (error) {
    failures.push(`No se pudo auditar IELTS set ${setNumber}: ${error.message}`);
  }
  if (!registeredMocks.has(setNumber)) failures.push(`IELTS set ${setNumber} no está registrado en src/data/mocks/index.ts.`);
}

const assetStates = new Map();
for (const setNumber of harness.listeningSets.assetPresentUnverified) assetStates.set(setNumber, 'asset-present-unverified');
for (const setNumber of harness.listeningSets.assetMissingBlocked) assetStates.set(setNumber, 'asset-missing-blocked');
for (const setNumber of harness.listeningSets.published) assetStates.set(setNumber, 'published');

for (let setNumber = 1; setNumber <= harness.minimums.registeredMocks; setNumber += 1) {
  const audioPath = path.join(repoRoot, `public/audio/ielts/ielts-listening-set-${setNumber}.mp3`);
  const exists = fs.existsSync(audioPath);
  const state = assetStates.get(setNumber);
  if (state === 'asset-missing-blocked' && exists) {
    failures.push(`IELTS set ${setNumber} ya tiene MP3, pero el manifiesto todavía lo declara asset-missing-blocked.`);
  }
  if ((state === 'asset-present-unverified' || state === 'published') && !exists) {
    failures.push(`IELTS set ${setNumber} está declarado ${state}, pero falta su MP3.`);
  }
  if (exists && fs.statSync(audioPath).size < harness.minimums.minimumListeningAudioBytes) {
    failures.push(`IELTS set ${setNumber} tiene un MP3 de ${fs.statSync(audioPath).size} bytes; parece vacío o truncado.`);
  }
}

const podcastLibraryPath = path.join(repoRoot, 'src/data/practica/podcast-library.ts');
const podcastLibrarySource = fs.readFileSync(podcastLibraryPath, 'utf8');
const podcastCount = countIeltsPodcastEntries(podcastLibrarySource);
if (podcastCount < harness.minimums.podcastsOnHub) {
  failures.push(`El catálogo conserva ${podcastCount} podcasts IELTS; el mínimo es ${harness.minimums.podcastsOnHub}.`);
}

if (failures.length) {
  console.error('IELTS superhub truth gate: BLOCK');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('IELTS superhub truth gate: PASS');
  console.log(`- ${pageFiles.length} archivos page.tsx preservados`);
  console.log(`- ${harness.minimums.canonicalRoutes} URLs canónicas inventariadas`);
  const declaredDebtCount = Object.keys(harness.knownListeningStructureDebt ?? {}).length;
  console.log(`- ${registeredMocks.size} mocks con 4 partes y 40 respuestas Listening validados`);
  console.log(`- ${registeredMocks.size - declaredDebtCount} mocks cumplen 10/10/10/10`);
  console.log(`- ${harness.minimums.physicalListeningAudioSets} sets con MP3 presentes; sets 13–20 bloqueados honestamente`);
  console.log(`- ${podcastCount} podcasts IELTS preservados`);
  for (const [setNumber, debt] of Object.entries(harness.knownListeningStructureDebt ?? {})) {
    console.log(`- DEUDA DECLARADA: set ${setNumber} conserva reparto ${debt.partAnswerSlots.join('/')} y no es publicable por secciones`);
  }
}
