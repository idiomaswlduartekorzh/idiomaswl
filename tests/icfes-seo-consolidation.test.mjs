import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');
const examCatalog = read('src/data/exams.ts');
const guidedRegistry = read('src/data/icfes/guided-registry.ts');
const hubPage = read('src/app/(site)/examenes/[exam]/page.tsx');
const hero = read('src/app/(site)/examenes/[exam]/ExamInfoGraphic.tsx');
const grid = read('src/app/(site)/examenes/[exam]/MockGrid.tsx');
const jsonLd = read('src/app/(site)/examenes/[exam]/ExamJsonLd.tsx');
const guide = read('src/data/examGuides.ts');
const sitemap = read('src/app/sitemap.ts');
const robots = read('src/app/robots.ts');
const preparation = read('src/app/(site)/preparacion-icfes/page.tsx');
const learningHub = read('src/app/(site)/practica/icfes-saber-11/page.tsx');
const learningLayout = read('src/app/(site)/practica/icfes-saber-11/layout.tsx');
const workbookCatalog = read('src/app/(site)/practica/icfes-saber-11/examenes/page.tsx');
const workbookClient = read('src/app/(site)/practica/icfes-saber-11/examenes/ExamenesClient.tsx');
const blog = read('src/data/blog.ts');

test('the primary hub owns the simulacro ICFES Inglés intent and direct CTA', () => {
  assert.match(hubPage, /Simulacro ICFES Inglés gratis: 34 recursos Saber 11/);
  for (const query of ['simulacro ICFES inglés', 'simulacro inglés ICFES', 'simulacro de inglés ICFES', 'cuadernillos ICFES inglés']) {
    assert.ok(hubPage.includes(query), `Missing query variant: ${query}`);
  }
  assert.match(hero, /Simulacro ICFES Inglés: practica gratis para Saber 11/);
  assert.match(hero, /href="\/practica\/icfes-saber-11\/simulacro-guiado"[\s\S]*Empezar simulacro de 55 preguntas/);
  assert.match(hubPage, /canonical: `https:\/\/www\.idiomaswl\.com\/examenes\/\$\{slug\}`/);
});

test('34 unique resources produce 62 routes or modes without becoming 62 exams', () => {
  const catalogBlock = examCatalog.match(/icfes:\s*\{[\s\S]*?\n\s*available:\s*true,\n\s*\},/)?.[0] ?? '';
  const catalogIds = [...catalogBlock.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1]);
  const ownIds = catalogIds.filter((id) => /^mock-\d+$/.test(id));
  const publishedIds = catalogIds.filter((id) => id.startsWith('icfes-'));
  const guidedMockIds = guidedRegistry.match(/GUIDED_MOCK_IDS\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1].match(/mock-\d+/g) ?? [];
  const guidedWorkbookIds = guidedRegistry.match(/GUIDED_WORKBOOK_IDS\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1].match(/icfes-[\w-]+/g) ?? [];

  assert.equal(catalogIds.length, 33);
  assert.equal(new Set(catalogIds).size, 33);
  assert.equal(ownIds.length, 23);
  assert.equal(publishedIds.length, 10);

  const uniqueResources = catalogIds.length + 1;
  const modes = uniqueResources + guidedMockIds.length + guidedWorkbookIds.length;
  assert.equal(uniqueResources, 34);
  assert.equal(modes, 62);
  assert.match(grid, /34 recursos distintos/);
  assert.match(grid, /62 rutas o modos de uso, pero no 62 exámenes diferentes/);
  assert.match(grid, /Ver las \$\{group\.mocks\.length - INITIAL_VISIBLE_MOCKS\} prácticas propias restantes/);
  assert.match(grid, /Ver los \$\{group\.mocks\.length - INITIAL_VISIBLE_MOCKS\} cuadernillos restantes/);
  assert.match(guide, /Por qué ves 62 rutas, pero solo 34 recursos/);
});

test('structured data and crawl controls reflect the public canonical inventory', () => {
  assert.match(jsonLd, /'@type': 'ItemList'/);
  assert.match(jsonLd, /numberOfItems: resources\.length/);
  assert.match(jsonLd, /\.\.\.exam\.mocks\.map/);
  assert.match(sitemap, /priority: slug === 'icfes' \? 0\.93 : 0\.75/);
  assert.doesNotMatch(robots, /'\/examenes\/'|'\/practica\/icfes-saber-11\/'/);
});

test('satellite pages keep distinct intent and link back to the primary hub', () => {
  assert.match(preparation, /Preparación ICFES Inglés con tutor \| WeLearn/);
  assert.match(learningHub, /Cómo resolver las 7 partes de Inglés Saber 11/);
  assert.match(workbookCatalog, /Cuadernillos ICFES Inglés divulgados: catálogo por año/);
  assert.match(learningHub, /href="\/examenes\/icfes"/);
  assert.match(learningLayout, /href: '\/examenes\/icfes'/);
  assert.match(workbookClient, /href="\/examenes\/icfes"/);
  assert.ok((blog.match(/href="\/examenes\/icfes"/g) ?? []).length >= 4);
});

test('public claims stop at B1 and avoid unsupported score promises', () => {
  assert.match(examCatalog, /levels: \['Pre A1', 'A1', 'A2', 'B1'\]/);
  assert.match(preparation, /No prometemos una cantidad fija de puntos/);
  assert.doesNotMatch(preparation, /10–20 puntos|replican el examen real|Oficial ICFES/);
  assert.match(guide, /B1 es el techo/);
  assert.match(blog, /Saber 11 reporta hasta B1/);
});
