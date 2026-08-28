import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
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
