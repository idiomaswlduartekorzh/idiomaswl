import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSelection, selectionDetails, selectionPath, selectionSummary, whatsappLink, PLANS, LANGUAGES } from '../src/lib/course-pricing/catalog.ts';

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
