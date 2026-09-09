import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const MANIFEST_PATH = 'src/data/icfes/own-mock-expansion-manifest.json';
const SCHEMA_PATH = 'src/data/icfes/own-mock-expansion.schema.json';
const EXPECTED_IDS = Array.from({ length: 23 }, (_, index) => `mock-${String(index + 1).padStart(2, '0')}`);
const EXPECTED_PARTS = [1, 2, 3, 4, 5, 6, 7];
const REQUIRED_GATES = [
  'schema-and-manifest',
  'stable-unique-ids',
  'catalog-and-registry-parity',
  'question-and-part-counts',
  'answer-index-range',
  'exact-content-duplicates',
  'approved-content-hash',
  'public-answer-leakage',
];

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
const catalog = readFileSync('src/data/exams.ts', 'utf8');
const registry = readFileSync('src/data/mocks/index.ts', 'utf8');
const guidedRegistry = readFileSync('src/data/icfes/guided-registry.ts', 'utf8');
const practicePage = readFileSync('src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx', 'utf8');
const sanitizer = readFileSync('src/lib/icfes/exam-registry.server.ts', 'utf8');

assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
assert.equal(schema.properties?.mocks?.minItems, 23);
assert.equal(schema.properties?.mocks?.maxItems, 23);
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.productId, 'icfes-saber-11-english');
assert.equal(manifest.policy.questionCount, 45);
assert.deepEqual(manifest.policy.parts, EXPECTED_PARTS);
assert.deepEqual(manifest.policy.requiredQualityGates, REQUIRED_GATES);
assert.equal(manifest.mocks.length, 23);

const manifestIds = manifest.mocks.map(({ mockId }) => mockId);
assert.deepEqual(manifestIds, EXPECTED_IDS, 'El manifiesto debe declarar los 23 mocks en orden estable.');
assert.equal(new Set(manifestIds).size, 23, 'Los mockId del manifiesto deben ser únicos.');

const exactContent = new Map();
const globalItemIds = new Set();
let totalQuestions = 0;

const normalize = (value) => String(value ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();

for (const record of manifest.mocks) {
  assert.equal(record.modulePath, `src/data/mocks/icfes-${record.mockId}.ts`);
  assert.equal(record.route, `/examenes/icfes/practica/${record.mockId}`);
  assert.match(record.contentVersion, /^2026-09-08\.[1-9][0-9]*$/);
  assert.match(record.contentHash, /^[a-f0-9]{64}$/);
  assert.equal(record.provenance.kind, 'welearn-original');
  assert.equal(record.provenance.owner, 'Idiomas WeLearn');
  assert.equal(record.provenance.rights, 'owned-content');
  assert.equal(record.editorial.status, 'approved');
  assert.deepEqual(record.editorial.reviewerRoles, ['english-language-specialist', 'icfes-format-reviewer', 'editorial-adjudicator']);
  assert.ok(['release-candidate', 'published'].includes(record.releaseStatus));
  assert.ok(existsSync(record.provenance.authoringRecord), `${record.mockId}: falta authoringRecord`);
  assert.ok(existsSync(record.editorial.remediationRecord), `${record.mockId}: falta remediationRecord`);

  const { default: mock } = await import(`../${record.modulePath}`);
  assert.equal(mock.id, record.mockId);
  assert.equal(mock.examSlug, 'icfes');

  const contentHash = createHash('sha256').update(JSON.stringify(mock)).digest('hex');
  assert.equal(contentHash, record.contentHash, `${record.mockId}: el contenido cambió; vuelva a revisión editorial y actualice versión/hash solo al aprobar.`);

  const parts = mock.sections.map(({ part }) => part);
  assert.deepEqual(parts, EXPECTED_PARTS, `${record.mockId}: deben existir exactamente las siete partes en orden.`);
  const questions = mock.sections.flatMap(({ questions }) => questions);
  assert.equal(questions.length, 45, `${record.mockId}: se esperaban 45 preguntas.`);
  totalQuestions += questions.length;

  const localIds = new Set();
  for (const question of questions) {
    assert.ok(!localIds.has(question.id), `${record.mockId}: itemId duplicado ${question.id}`);
    localIds.add(question.id);
    const globalId = `${record.mockId}:${question.id}`;
    assert.ok(!globalItemIds.has(globalId), `itemId global duplicado ${globalId}`);
    globalItemIds.add(globalId);

    assert.ok(['mcq', 'dialog'].includes(question.type), `${globalId}: tipo no machine-scored en un mock objetivo.`);
    assert.ok(Array.isArray(question.options) && question.options.length >= 3, `${globalId}: opciones insuficientes.`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${globalId}: answer fuera de rango.`);
    assert.equal(new Set(question.options.map(normalize)).size, question.options.length, `${globalId}: opciones duplicadas.`);

    const fingerprint = createHash('sha256').update(JSON.stringify({
      part: question.part,
      stimulus: normalize(question.stimulus),
      text: normalize(question.text),
      options: question.options.map(normalize),
    })).digest('hex');
    const prior = exactContent.get(fingerprint);
    assert.equal(prior, undefined, `${globalId}: contenido exacto duplicado de ${prior}`);
    exactContent.set(fingerprint, globalId);
  }

  assert.match(catalog, new RegExp(`id: '${record.mockId}'`), `${record.mockId}: falta en catálogo.`);
  assert.match(registry, new RegExp(`'icfes:${record.mockId}'`), `${record.mockId}: falta en registro runtime.`);
  assert.match(guidedRegistry, new RegExp(`'${record.mockId}'`), `${record.mockId}: falta en registro guiado.`);
}

assert.equal(totalQuestions, 1035);
assert.match(practicePage, /mock=\{sanitizeIcfesMock\(mock\)\}/, 'La ruta pública debe sanitizar el mock en el servidor.');
assert.match(sanitizer, /delete publicQuestion\.answer/, 'El payload público debe eliminar answer.');
assert.match(sanitizer, /insights: undefined/, 'El payload público debe eliminar insights.');

console.log(JSON.stringify({
  verdict: 'approved',
  schemaVersion: manifest.schemaVersion,
  mocks: manifest.mocks.length,
  questions: totalQuestions,
  partsPerMock: EXPECTED_PARTS.length,
  exactDuplicateQuestions: 0,
  qualityGates: REQUIRED_GATES.length,
}, null, 2));
