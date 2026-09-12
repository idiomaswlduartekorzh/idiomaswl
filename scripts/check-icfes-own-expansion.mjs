import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import {
  BASELINE_MOCK_COUNT,
  REQUIRED_PARTS,
  validateExpansionManifest,
} from './lib/icfes-own-expansion-core.mjs';

const MANIFEST_PATH = 'src/data/icfes/own-mock-expansion-manifest.json';
const SCHEMA_PATH = 'src/data/icfes/own-mock-expansion.schema.json';
const REQUIRED_BASELINE_IDS = Array.from({ length: BASELINE_MOCK_COUNT }, (_, index) => `mock-${String(index + 1).padStart(2, '0')}`);

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
const catalog = readFileSync('src/data/exams.ts', 'utf8');
const registry = readFileSync('src/data/mocks/index.ts', 'utf8');
const guidedRegistry = readFileSync('src/data/icfes/guided-registry.ts', 'utf8');
const sitemap = readFileSync('src/app/sitemap.ts', 'utf8');
const practicePage = readFileSync('src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx', 'utf8');
const sanitizer = readFileSync('src/lib/icfes/exam-registry.server.ts', 'utf8');
const publicSurfaces = [catalog, registry, guidedRegistry, sitemap];

const candidateSources = new Map();
for (const candidate of manifest.candidates ?? []) {
  if (!existsSync(candidate.modulePath)) continue;
  const { default: source } = await import(`../${candidate.modulePath}`);
  candidateSources.set(candidate.mockId, source);
}

const manifestFailures = validateExpansionManifest(manifest, schema, { sources: candidateSources, publicSurfaces });
assert.deepEqual(manifestFailures, [], `Manifiesto ICFES v2 inválido:\n${manifestFailures.join('\n')}`);

const baselineIds = manifest.mocks.map(({ mockId }) => mockId);
for (const requiredId of REQUIRED_BASELINE_IDS) {
  assert.ok(baselineIds.includes(requiredId), `El baseline protegido perdió ${requiredId}.`);
}
assert.equal(new Set(baselineIds).size, baselineIds.length, 'Los mockId publicados deben ser únicos.');

const exactContent = new Map();
const globalItemIds = new Set();
let totalQuestions = 0;
const normalize = (value) => String(value ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();

for (const record of manifest.mocks) {
  assert.equal(record.modulePath, `src/data/mocks/icfes-${record.mockId}.ts`);
  assert.equal(record.route, `/examenes/icfes/practica/${record.mockId}`);
  assert.ok(existsSync(record.provenance.authoringRecord), `${record.mockId}: falta authoringRecord`);
  assert.ok(existsSync(record.editorial.remediationRecord), `${record.mockId}: falta remediationRecord`);

  const { default: mock } = await import(`../${record.modulePath}`);
  assert.equal(mock.id, record.mockId);
  assert.equal(mock.examSlug, 'icfes');
  assert.equal(createHash('sha256').update(JSON.stringify(mock)).digest('hex'), record.contentHash,
    `${record.mockId}: contenido distinto del snapshot editorial aprobado.`);

  const parts = mock.sections.map(({ part }) => part);
  assert.deepEqual(parts, REQUIRED_PARTS, `${record.mockId}: deben existir las siete partes en orden.`);
  const questions = mock.sections.flatMap(({ questions: items }) => items);
  assert.equal(questions.length, 45, `${record.mockId}: se esperaban 45 preguntas.`);
  totalQuestions += questions.length;

  const localIds = new Set();
  for (const question of questions) {
    assert.ok(!localIds.has(question.id), `${record.mockId}: itemId duplicado ${question.id}`);
    localIds.add(question.id);
    const globalId = `${record.mockId}:${question.id}`;
    assert.ok(!globalItemIds.has(globalId), `itemId global duplicado ${globalId}`);
    globalItemIds.add(globalId);
    assert.ok(['mcq', 'dialog'].includes(question.type), `${globalId}: tipo no machine-scored.`);
    assert.ok(Array.isArray(question.options) && question.options.length >= 3, `${globalId}: opciones insuficientes.`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${globalId}: answer fuera de rango.`);
    assert.equal(new Set(question.options.map(normalize)).size, question.options.length, `${globalId}: opciones duplicadas.`);

    const fingerprint = createHash('sha256').update(JSON.stringify({
      part: question.part,
      stimulus: normalize(question.stimulus),
      text: normalize(question.text),
      options: question.options.map(normalize),
    })).digest('hex');
    assert.equal(exactContent.get(fingerprint), undefined, `${globalId}: contenido exacto duplicado de ${exactContent.get(fingerprint)}`);
    exactContent.set(fingerprint, globalId);
  }

  assert.match(catalog, new RegExp(`id: '${record.mockId}'`), `${record.mockId}: falta en catálogo.`);
  assert.match(registry, new RegExp(`'icfes:${record.mockId}'`), `${record.mockId}: falta en registro runtime.`);
  assert.match(guidedRegistry, new RegExp(`'${record.mockId}'`), `${record.mockId}: falta en registro guiado.`);
}

assert.match(practicePage, /mock=\{sanitizeIcfesMock\(mock\)\}/, 'La ruta pública debe sanitizar el mock en el servidor.');
assert.match(sanitizer, /delete publicQuestion\.answer/, 'El payload público debe eliminar answer.');
assert.match(sanitizer, /insights: undefined/, 'El payload público debe eliminar insights.');

console.log(JSON.stringify({
  verdict: 'approved',
  schemaVersion: manifest.schemaVersion,
  releasedMocks: manifest.mocks.length,
  candidates: manifest.candidates.map(({ mockId, editorial, release }) => ({ mockId, editorial: editorial.status, release: release.status })),
  questions: totalQuestions,
  exactDuplicateQuestions: 0,
}, null, 2));
