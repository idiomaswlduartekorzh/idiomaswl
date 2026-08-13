import assert from 'node:assert/strict';
import test from 'node:test';

import { IELTS_READING_TYPES } from '../src/data/practica-exams/seo-catalog.ts';
import {
  IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT,
  IELTS_ACADEMIC_READING_WELEARN_ROUTES,
  findIeltsAcademicReadingOfficialTypeByRoute,
  getIeltsAcademicReadingOfficialTypeByRoute,
} from '../src/lib/ielts/academic-reading-question-types.ts';

const contract = IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT;

test('declares the authoritative IELTS Academic Reading source and version', () => {
  assert.equal(contract.schemaVersion, 'ielts-academic-reading-question-types.v1');
  assert.equal(contract.module, 'academic');
  assert.equal(contract.source.authority, 'IELTS');
  assert.equal(
    contract.source.url,
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
  );
  assert.equal(contract.source.reviewedAt, '2026-08-09');
});

test('maps 11 contiguous official types to 14 unique WeLearn routes', () => {
  const numbers = contract.officialTypes.map((type) => type.officialNumber);
  const ids = contract.officialTypes.map((type) => type.id);
  const slugs = IELTS_ACADEMIC_READING_WELEARN_ROUTES.map((route) => route.slug);

  assert.equal(contract.officialTypes.length, contract.officialTypeCount);
  assert.equal(slugs.length, contract.welearnRouteCount);
  assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(slugs).size, slugs.length);
});

test('locks the complete official number, id, name and route matrix', () => {
  const actual = contract.officialTypes.map((type) => ({
    officialNumber: type.officialNumber,
    id: type.id,
    officialName: type.officialName,
    routeSlugs: type.welearnRoutes.map((route) => route.slug),
  }));

  assert.deepEqual(actual, [
    { officialNumber: 1, id: 'multiple-choice', officialName: 'Multiple choice', routeSlugs: ['multiple-choice'] },
    { officialNumber: 2, id: 'identifying-information', officialName: 'Identifying information (True/False/Not given)', routeSlugs: ['true-false-not-given'] },
    { officialNumber: 3, id: 'identifying-writer-views-claims', officialName: 'Identifying writer’s views/claims (Yes/No/Not given)', routeSlugs: ['yes-no-not-given'] },
    { officialNumber: 4, id: 'matching-information', officialName: 'Matching information', routeSlugs: ['matching-information'] },
    { officialNumber: 5, id: 'matching-headings', officialName: 'Matching headings', routeSlugs: ['matching-headings'] },
    { officialNumber: 6, id: 'matching-features', officialName: 'Matching features', routeSlugs: ['matching-features'] },
    { officialNumber: 7, id: 'matching-sentence-endings', officialName: 'Matching sentence endings', routeSlugs: ['matching-sentence-endings'] },
    { officialNumber: 8, id: 'sentence-completion', officialName: 'Sentence completion', routeSlugs: ['sentence-completion'] },
    { officialNumber: 9, id: 'summary-note-table-flow-chart-completion', officialName: 'Summary/note/table/flow-chart completion', routeSlugs: ['summary-completion', 'note-completion', 'table-completion', 'flow-chart-completion'] },
    { officialNumber: 10, id: 'diagram-label-completion', officialName: 'Diagram label completion', routeSlugs: ['diagram-labeling'] },
    { officialNumber: 11, id: 'short-answer-questions', officialName: 'Short-answer questions', routeSlugs: ['short-answer'] },
  ]);
});

test('splits only official type 9 into four WeLearn practice routes', () => {
  for (const officialType of contract.officialTypes) {
    const expectedRouteCount = officialType.officialNumber === 9 ? 4 : 1;
    assert.equal(officialType.welearnRoutes.length, expectedRouteCount, officialType.id);
  }

  const typeNine = contract.officialTypes.find((type) => type.officialNumber === 9);
  assert.deepEqual(
    typeNine?.welearnRoutes.map((route) => route.slug),
    ['summary-completion', 'note-completion', 'table-completion', 'flow-chart-completion'],
  );
  assert.match(typeNine?.welearnSplitRationale ?? '', /IELTS los agrupa en un solo tipo oficial/);
  for (const slug of ['summary-completion', 'note-completion', 'table-completion', 'flow-chart-completion']) {
    assert.equal(getIeltsAcademicReadingOfficialTypeByRoute(slug).officialNumber, 9);
  }
});

test('matches every published IELTS Reading type route by stable slug', () => {
  const published = IELTS_READING_TYPES.filter((route) => route.status === 'published');
  const catalogBySlug = new Map(published.map((route) => [route.slug, route]));
  const contractSlugs = IELTS_ACADEMIC_READING_WELEARN_ROUTES.map((route) => route.slug);

  assert.equal(published.length, contract.welearnRouteCount);
  assert.deepEqual([...contractSlugs].sort(), [...catalogBySlug.keys()].sort());

  for (const route of IELTS_ACADEMIC_READING_WELEARN_ROUTES) {
    const catalogRoute = catalogBySlug.get(route.slug);
    assert.ok(catalogRoute, route.slug);
    assert.equal(
      catalogRoute.path,
      `/practica/ielts/reading/tipos-de-preguntas/${route.slug}`,
      route.slug,
    );
    assert.equal(findIeltsAcademicReadingOfficialTypeByRoute(route.slug)?.officialNumber, route.officialNumber);
  }
});

test('keeps all four type 9 route descriptions explicit in the published catalog', () => {
  const typeNineSlugs = [
    'summary-completion',
    'note-completion',
    'table-completion',
    'flow-chart-completion',
  ];

  for (const slug of typeNineSlugs) {
    const route = IELTS_READING_TYPES.find((item) => item.slug === slug);
    assert.ok(route, slug);
    assert.match(route.faqs[0]?.answer ?? '', /ruta WeLearn/i, slug);
    assert.match(route.faqs[0]?.answer ?? '', /tipo oficial 9/i, slug);
    assert.doesNotMatch(route.faqs[0]?.answer ?? '', /es un tipo oficial de IELTS Reading/i, slug);
  }
});

test('keeps the approved product label distinct from the prohibited claim', () => {
  assert.equal(
    contract.productLabel,
    '11 tipos oficiales numerados · 14 rutas WeLearn para practicar sus formatos y variantes.',
  );
  assert.doesNotMatch(contract.productLabel, /14 tipos oficiales/i);
});

test('records a narrow rights boundary without copying IELTS test material', () => {
  assert.equal(contract.rights.basis, 'factual-descriptive-reference');
  assert.equal(contract.rights.copiedPassagesOrTasks, false);
  assert.equal(contract.rights.usesOfficialLogos, false);
  assert.equal(contract.rights.affiliation, 'independent-not-endorsed');
  assert.equal(
    contract.rights.noticeUrl,
    'https://ielts.org/legal/ielts-copyright-and-trade-mark-statement',
  );
});
