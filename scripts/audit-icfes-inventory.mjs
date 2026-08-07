import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const OWN_IDS = Array.from({ length: 23 }, (_, index) => `mock-${String(index + 1).padStart(2, '0')}`);
const ownModules = await Promise.all(OWN_IDS.map((id) => import(`../src/data/mocks/icfes-${id}.ts`)));
const { SIMULACROS } = await import('../src/data/mocks/icfes-simulacros.ts');

const catalogSource = readFileSync('src/data/exams.ts', 'utf8');
const registrySource = readFileSync('src/data/mocks/index.ts', 'utf8');
const guidedRegistrySource = readFileSync('src/data/icfes/guided-registry.ts', 'utf8');
const guided55Source = readFileSync('src/data/icfes/guided-simulacro-2026.ts', 'utf8');
const sitemapSource = readFileSync('src/app/sitemap.ts', 'utf8');

const catalogBlock = catalogSource.match(/icfes:\s*\{[\s\S]*?\n\s*available:\s*true,\n\s*\},/)?.[0] ?? '';
const catalogIds = [...catalogBlock.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1]);
const registryIds = [...registrySource.matchAll(/'icfes:(mock-\d+)'/g)].map((match) => match[1]);
const guidedIds = guidedRegistrySource.match(/GUIDED_MOCK_IDS\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1].match(/mock-\d+/g) ?? [];
const guidedWorkbookIds = guidedRegistrySource.match(/GUIDED_WORKBOOK_IDS\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1].match(/icfes-[\w-]+/g) ?? [];
const guidedWorkbookExclusions = guidedRegistrySource.match(/GUIDED_WORKBOOK_EXCLUSIONS\s*=\s*\{([\s\S]*?)\}\s*as const/)?.[1].match(/icfes-[\w-]+/g) ?? [];

const ownResources = ownModules.map(({ default: mock }) => {
  const questionCount = mock.sections.reduce((total, section) => total + section.questions.length, 0);
  return {
    id: mock.id,
    family: 'saber-11',
    provenance: 'welearn-original',
    year: null,
    grade: 11,
    format: 'practice-abbreviated-45',
    questions: questionCount,
    parts: [...new Set(mock.sections.map((section) => section.part))].sort(),
    guidedEligible: true,
    guidedStatus: guidedIds.includes(mock.id) ? 'pilot-approved' : 'pending-editorial-batch',
    route: `/examenes/icfes/practica/${mock.id}`,
    guidedRoute: `/examenes/icfes/practica/${mock.id}/guiado`,
  };
});

const officialResources = SIMULACROS.map((simulacro) => {
  const family = simulacro.assessment;
  return {
    id: simulacro.id,
    family,
    provenance: 'icfes-published',
    year: simulacro.year,
    grade: simulacro.grade,
    format: simulacro.assessment === 'saber-11' ? 'historical-published-sample' : 'related-icfes-assessment',
    questions: simulacro.questions.length,
    declaredQuestions: simulacro.totalQuestions,
    parts: simulacro.partRanges.map(({ part }) => part),
    guidedEligible: guidedWorkbookIds.includes(simulacro.id),
    guidedStatus: guidedWorkbookIds.includes(simulacro.id) ? 'approved' : guidedWorkbookExclusions.includes(simulacro.id) ? 'excluded-missing-stimulus' : 'not-saber-11',
    route: `/practica/icfes-saber-11/examenes/${simulacro.id}`,
    guidedRoute: guidedWorkbookIds.includes(simulacro.id) ? `/practica/icfes-saber-11/examenes/${simulacro.id}/guiado` : null,
    source: simulacro.source,
  };
});

const guided55 = {
  id: 'guided-simulacro-2026-55',
  family: 'saber-11',
  provenance: 'welearn-original',
  year: 2026,
  grade: 11,
  format: 'guided-current-blueprint-55',
  questions: 55,
  parts: [1, 2, 3, 4, 5, 6, 7],
  guidedEligible: true,
  guidedStatus: guided55Source.includes("trap: 'pista parcial'") ? 'blocked-generic-feedback' : 'approved',
  route: '/practica/icfes-saber-11/simulacro-guiado',
};

const resources = [...ownResources, ...officialResources, guided55];
const duplicateIds = resources.filter((resource, index) => resources.findIndex(({ id }) => id === resource.id) !== index).map(({ id }) => id);
const catalogMissing = [...ownResources, ...officialResources].filter(({ id }) => !catalogIds.includes(id)).map(({ id }) => id);
const registryMissing = ownResources.filter(({ id }) => !registryIds.includes(id)).map(({ id }) => id);
const officialCountMismatches = officialResources.filter(({ questions, declaredQuestions }) => questions !== declaredQuestions).map(({ id }) => id);
const fileIds = ownResources.map(({ id }) => id);

const checks = [
  { id: 'own-files', pass: fileIds.length === 23, evidence: `${fileIds.length}/23 módulos propios` },
  { id: 'own-registry', pass: registryMissing.length === 0 && registryIds.length === 23, evidence: `${registryIds.length}/23 registrados; faltan: ${registryMissing.join(', ') || 'ninguno'}` },
  { id: 'catalog-resources', pass: catalogIds.length === 33, evidence: `${catalogIds.length}/33 recursos en catálogo` },
  { id: 'catalog-parity', pass: catalogMissing.length === 0, evidence: `Faltantes: ${catalogMissing.join(', ') || 'ninguno'}` },
  { id: 'official-export', pass: officialResources.length === 10, evidence: `${officialResources.length}/10 cuadernillos exportados` },
  { id: 'official-question-counts', pass: officialCountMismatches.length === 0, evidence: `Desajustes: ${officialCountMismatches.join(', ') || 'ninguno'}` },
  { id: 'unique-inventory-ids', pass: duplicateIds.length === 0, evidence: `Duplicados: ${duplicateIds.join(', ') || 'ninguno'}` },
  { id: 'guided-55-route', pass: sitemapSource.includes('simulacro-guiado'), evidence: 'Ruta adicional de 55 preguntas en sitemap' },
  { id: 'assessment-classification', pass: officialResources.find(({ id }) => id === 'icfes-tyt')?.family === 'saber-tyt' && SIMULACROS.find(({ id }) => id === 'icfes-tyt')?.grade === null, evidence: 'TyT tiene assessment propio y grade nulo' },
];

const failed = checks.filter(({ pass }) => !pass);
const report = {
  generatedAt: new Date().toISOString(),
  verdict: failed.length ? 'blocked' : 'approved',
  totals: {
    catalogResources: 33,
    ownMocks: ownResources.length,
    officialSaber11: officialResources.filter(({ family }) => family === 'saber-11').length,
    relatedIcfes: officialResources.filter(({ family }) => family !== 'saber-11').length,
    standaloneGuided: 1,
    saber11Experiences: resources.filter(({ family }) => family === 'saber-11').length,
    allInventoryResources: resources.length,
    guidedApprovedOrPilot: resources.filter(({ guidedStatus }) => ['pilot-approved', 'approved'].includes(guidedStatus)).length,
  },
  findings: [
    { severity: 'high', id: 'guided-55-generic-feedback', status: guided55.guidedStatus === 'approved' ? 'resolved' : 'open', detail: guided55.guidedStatus === 'approved' ? 'El banco de 55 ya tiene retroalimentación específica por alternativa y una compuerta editorial propia.' : 'El constructor del simulacro de 55 preguntas todavía usa una justificación genérica y la etiqueta pista parcial.' },
    { severity: 'medium', id: 'tyt-grade-model', status: 'resolved', detail: 'El modelo distingue Saber 11, Saber 10, Saber 9 y Saber TyT; TyT ya no se representa como grado 11.' },
    { severity: 'info', id: 'historical-formats', status: 'documented', detail: 'Los siete cuadernillos Saber 11 son muestras históricas de extensiones y distribuciones distintas; no deben normalizarse como si fueran la aplicación estándar 2026-2.' },
  ],
  batchQueue: [
    ['mock-04', 'mock-05', 'mock-06'], ['mock-07', 'mock-08', 'mock-09'], ['mock-10', 'mock-11', 'mock-12'],
    ['mock-13', 'mock-14', 'mock-15'], ['mock-16', 'mock-17', 'mock-18'], ['mock-19', 'mock-20', 'mock-21'], ['mock-22', 'mock-23'],
    ['guided-simulacro-2026-55'],
    ['icfes-2023-g11', 'icfes-2022-g11'], ['icfes-2021-ex1', 'icfes-2021-ex2'], ['icfes-2019-ex1', 'icfes-2016'], ['icfes-2012'],
    ['icfes-2022-g10', 'icfes-2022-g9', 'icfes-tyt'],
    ['mock-01', 'mock-02', 'mock-03', 'final-reaudit'],
  ],
  checks,
  resources,
};

if (!process.argv.includes('--no-write')) writeFileSync('docs/icfes-inventory-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ verdict: report.verdict, totals: report.totals, findings: report.findings, checks }, null, 2));
assert.equal(failed.length, 0, `Inventario ICFES bloqueado: ${failed.map(({ id }) => id).join(', ')}`);
