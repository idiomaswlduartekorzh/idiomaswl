import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseSelection, selectionDetails, selectionPath, selectionSummary, whatsappLink, PLANS, LANGUAGES } from '../src/lib/course-pricing/catalog.ts';

const readProjectFile = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const blogSource = readProjectFile('src/data/blog.ts');

function articleSource(slug: string) {
  const start = blogSource.indexOf(`slug: '${slug}'`);
  assert.notEqual(start, -1, `No se encontró el artículo ${slug}`);
  const end = blogSource.indexOf("\n    slug: '", start + 1);
  return blogSource.slice(start, end === -1 ? undefined : end);
}

test('tampered and duplicate URL values cannot invent a price, plan or cross-language exam', () => {
  const { selection, corrected } = parseSelection({ idioma: 'coreano', objetivo: 'IELTS Academic', plan: ['diario','esencial'], precio: '1' });
  assert.equal(corrected, true);
  assert.equal(selection.objective, 'general');
  assert.equal(selectionDetails(selection).plan.price, 540000);
  assert.throws(() => selectionDetails({ ...selection, objective: 'IELTS Academic' }));
});
test('share links round-trip all valid courses and keep personal/marketing parameters out', () => {
  for (const language of LANGUAGES) for (const objective of ['general', ...language.exams]) for (const plan of PLANS) {
    const input = { language: language.id, objective, plan: plan.id, level: 'No sé mi nivel' };
    const url = new URL(selectionPath(input), 'https://www.idiomaswl.com');
    assert.deepEqual(parseSelection(Object.fromEntries(url.searchParams)).selection, input);
    assert.deepEqual([...url.searchParams.keys()], ['idioma','objetivo','plan','nivel']);
  }
});
test('approved prices have four-week units and decrease per session without annual billing', () => {
  assert.deepEqual(PLANS.map(p => p.price), [320000,540000,760000,960000,1160000]);
  let previous = Infinity;
  for (const plan of PLANS) {
    const { selection } = parseSelection({ plan: plan.id });
    const detail = selectionDetails(selection);
    assert.equal(detail.classes * 100, detail.sessions * 50);
    assert.equal(detail.classes, plan.weekly * 4);
    assert.ok(plan.price / detail.sessions < previous);
    previous = plan.price / detail.sessions;
  }
});
test('WhatsApp carries the exact reviewed selection and only uses the official recipient', () => {
  const { selection } = parseSelection({ idioma:'frances', objetivo:'DALF', plan:'diario', nivel:'Avanzado' });
  const url = new URL(whatsappLink(selection));
  assert.equal(url.origin + url.pathname, 'https://wa.me/573005004253');
  assert.equal(url.searchParams.get('text'), selectionSummary(selection));
  assert.match(selectionSummary(selection), /1\.160\.000/);
  assert.match(selectionSummary(selection), /20 clases en cuatro semanas/);
  assert.match(selectionSummary(selection), /Nivel declarado: Avanzado/);
});

test('the public pricing route cannot fall back to the retired catalog', () => {
  const page = readProjectFile('src/app/(site)/precios/page.tsx');
  assert.doesNotMatch(page, /PreciosClient|COURSE_PRICING_ENABLED|COURSE_PRICING_PREVIEW|legacyMetadata/);
  assert.match(page, /CoursePricingClient/);
});

test('Bucaramanga pricing articles publish the approved four-week catalog', () => {
  const slugs = [
    'academias-de-ingles-en-bucaramanga-comparativa-2026',
    'cuanto-cuesta-aprender-ingles-en-bucaramanga-2026',
  ];
  const articles = slugs.map(articleSource).join('\n');
  for (const price of ['$320.000', '$540.000', '$760.000', '$960.000', '$1.160.000']) {
    assert.ok(articles.includes(price), `Falta el precio vigente ${price}`);
  }
  assert.doesNotMatch(articles, /\$180(?:K|\.000)|\$280\.000|\$480\.000|paquetes? de (?:4|10|20) horas/i);
  assert.match(articles, /ciclo de (?:cuatro|4) semanas/i);
});
