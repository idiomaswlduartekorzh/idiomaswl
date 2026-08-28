import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  canonicalHref,
  compareFaqParity,
  faqSchemaQuestions,
  normalizeVisibleText,
  robotsDirectives,
} from '../scripts/lib/seo-audit-utils.mjs';

const faqSchema = (questions) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((name) => ({ '@type': 'Question', name })),
});

test('la paridad FAQ ignora details ajenos como las notas del pódcast', () => {
  const html = `
    <details><summary>¿Cuánto dura el examen? <span aria-hidden="true">+</span></summary></details>
    <details><summary>¿Cómo recibo el resultado?</summary></details>
    <details><summary>Notas del episodio</summary></details>
    <script type="application/ld+json">${faqSchema(['¿Cuánto dura el examen?', '¿Cómo recibo el resultado?'])}</script>
  `;

  assert.deepEqual(compareFaqParity(html), {
    schema: ['¿Cuánto dura el examen?', '¿Cómo recibo el resultado?'],
    visible: ['¿Cuánto dura el examen?', '¿Cómo recibo el resultado?'],
    missingVisible: [],
    missingSchema: [],
  });
});

test('la paridad FAQ detecta preguntas visibles o estructuradas que divergen', () => {
  const html = `
    <details><summary>¿Pregunta visible?</summary></details>
    <script type="application/ld+json">${faqSchema(['¿Pregunta estructurada?'])}</script>
  `;
  const parity = compareFaqParity(html);
  assert.deepEqual(parity.missingVisible, ['¿Pregunta estructurada?']);
  assert.deepEqual(parity.missingSchema, ['¿Pregunta visible?']);
});

test('la paridad FAQ reconoce tarjetas article/h3 dentro de una sección FAQ', () => {
  const html = `
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <article><h3>Is this official practice?</h3><p>No.</p></article>
      <article><h3>How should I use it?</h3><p>As guided practice.</p></article>
    </section>
    <script type="application/ld+json">${faqSchema([
      'Is this official practice?',
      'How should I use it?',
    ])}</script>
  `;

  assert.deepEqual(compareFaqParity(html), {
    schema: ['Is this official practice?', 'How should I use it?'],
    visible: ['Is this official practice?', 'How should I use it?'],
    missingVisible: [],
    missingSchema: [],
  });
});

test('la paridad FAQ no confunde una pregunta didáctica fuera de una sección FAQ', () => {
  const html = `
    <section aria-labelledby="lesson-heading">
      <h2 id="lesson-heading">Analiza la consigna</h2>
      <article><h3>¿Qué postura vas a defender?</h3><p>Elige una postura clara.</p></article>
    </section>
  `;

  assert.deepEqual(compareFaqParity(html), {
    schema: [],
    visible: [],
    missingVisible: [],
    missingSchema: [],
  });
});

test('el extractor admite FAQPage dentro de @graph y entidades HTML', () => {
  const schema = JSON.stringify({
    '@graph': [{ '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: '¿Qué incluye & más?' }] }],
  }).replace('&', '&amp;');
  const html = `<script type='application/ld+json'>${schema}</script>`;
  assert.deepEqual(faqSchemaQuestions(html), ['¿Qué incluye & más?']);
  assert.equal(normalizeVisibleText('<strong>Plan&nbsp;local</strong>'), 'Plan local');
});

test('el auditor extrae canonical y robots sin depender del orden de atributos', () => {
  const html = `
    <meta content='follow, NOINDEX' data-owner="next" name="robots">
    <link href="https://www.idiomaswl.com/practica?a=1&amp;b=2" data-owner="next" rel='alternate canonical'>
  `;
  assert.deepEqual(robotsDirectives(html), ['follow', 'noindex']);
  assert.equal(canonicalHref(html), 'https://www.idiomaswl.com/practica?a=1&b=2');
});

test('el guardián estático acepta la fundación SEO sin deuda tolerada', () => {
  const result = spawnSync(process.execPath, ['scripts/check-seo-foundation.mjs'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Fundación SEO/);
  assert.doesNotMatch(result.stderr, /deuda conocida|lastModified|sin www/);
});

test('Task 2 solo publica FAQ schema cuando la página entrega FAQ visibles', () => {
  const component = readFileSync(
    'src/app/(site)/practica/ielts/academic/writing/task2/Task2SkillStructuredData.tsx',
    'utf8',
  );
  const introduction = readFileSync(
    'src/app/(site)/practica/ielts/academic/writing/task2/introduccion/page.tsx',
    'utf8',
  );
  const productionAudit = readFileSync('scripts/audit-seo.mjs', 'utf8');

  assert.doesNotMatch(component, /faqs\s*=\s*TASK2_SKILL_FAQS/);
  assert.match(component, /faqs\?\.length\s*\?\s*<FaqJsonLd faqs=\{faqs\}/);
  assert.match(introduction, /faqs=\{TASK2_SKILL_FAQS\}/);
  assert.match(productionAudit, /practica\\\/ielts\\\/academic\\\/writing\\\/task\[12\]/);
});

test('Task 1 no hereda FAQ schema que sus páginas no muestran', () => {
  const component = readFileSync(
    'src/app/(site)/practica/ielts/academic/writing/task1/Task1SkillStructuredData.tsx',
    'utf8',
  );

  assert.doesNotMatch(component, /FaqJsonLd|FAQS/);
  assert.match(component, /LearningResourceJsonLd/);
  assert.match(component, /BreadcrumbJsonLd/);
});

test('la auditoría de producción protege la paridad FAQ de TOEFL Reading', () => {
  const productionAudit = readFileSync('scripts/audit-seo.mjs', 'utf8');

  assert.match(productionAudit, /practica\\\/toefl\\\/reading/);
});

test('las plantillas de gramática no presentan secciones editoriales como FAQPage', () => {
  const practiceRoot = 'src/app/(site)/practica';
  const templates = readdirSync(practiceRoot, { recursive: true, encoding: 'utf8' })
    .filter((entry) => entry.endsWith('/gramatica/[slug]/page.tsx'));
  const productionAudit = readFileSync('scripts/audit-seo.mjs', 'utf8');

  assert.equal(templates.length, 24);
  for (const template of templates) {
    const source = readFileSync(path.join(practiceRoot, template), 'utf8');
    assert.doesNotMatch(source, /mainEntity:\s*topic\.seo/);
    assert.match(source, /'@type': 'LearningResource'/);
    assert.match(source, /'@type': 'BreadcrumbList'/);
  }
  assert.match(productionAudit, /gramatica\\\/\[a-z0-9-\]\+/);
});
