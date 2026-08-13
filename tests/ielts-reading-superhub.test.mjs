import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const page = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/reading/page.tsx'), 'utf8');
const content = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/reading/Content.tsx'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/reading/page.module.css'), 'utf8');
const mixedPage = fs.readFileSync(
  path.join(root, 'src/app/(site)/practica/ielts/reading/mixed-practice/page.tsx'),
  'utf8'
);
const mixedEngine = fs.readFileSync(
  path.join(root, 'src/components/exam-practice/MixedPracticeLab.tsx'),
  'utf8'
);
const skillsHub = fs.readFileSync(
  path.join(root, 'src/app/(site)/practica/ielts/reading/habilidades/page.tsx'),
  'utf8'
);
const questionTypesHub = fs.readFileSync(
  path.join(root, 'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/page.tsx'),
  'utf8'
);
const internationalQuestionTypes = fs.readFileSync(
  path.join(root, 'src/app/(site)/practica/ielts/reading/international-question-type/[slug]/page.tsx'),
  'utf8'
);
const internationalLesson = fs.readFileSync(
  path.join(root, 'src/components/exam-practice/InternationalReadingSkillLesson.tsx'),
  'utf8'
);
const internationalClinic = fs.readFileSync(
  path.join(root, 'src/components/exam-practice/InternationalQuestionTypePractice.tsx'),
  'utf8'
);
const nextConfig = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8');

test('defines an indexable canonical English IELTS Reading learning hub', () => {
  assert.match(page, /IELTS Academic Reading Practice Hub/);
  assert.match(page, /robots: \{ index: true, follow: true \}/);
  assert.match(page, /alternates: \{ canonical: URL \}/);
  assert.match(page, /CourseSchema/);
  assert.match(page, /inLanguage="en"/);
  assert.match(page, /'@type': 'ItemList'/);
});

test('links every focused IELTS Reading question-type route', () => {
  const slugs = [
    'true-false-not-given',
    'yes-no-not-given',
    'matching-headings',
    'matching-information',
    'matching-features',
    'matching-sentence-endings',
    'multiple-choice',
    'sentence-completion',
    'summary-completion',
    'note-completion',
    'table-completion',
    'flow-chart-completion',
    'diagram-labeling',
    'short-answer',
  ];
  for (const slug of slugs) assert.match(content, new RegExp(`'${slug}'`));
  assert.equal(slugs.length, 14);
});

test('exposes the six transferable Reading subskills as a separate learning path', () => {
  for (const skill of [
    'Skimming',
    'Scanning',
    'Paraphrase recognition',
    'Inference',
    'Word-limit control',
    'Time management',
  ]) {
    assert.match(content, new RegExp(skill));
  }
  assert.match(content, /These are not official IELTS question types/);
});

test('moves mixed practice into a dedicated English learning route', () => {
  assert.match(content, /\/practica\/ielts\/reading\/mixed-practice/);
  assert.doesNotMatch(content, /IeltsReadingMixedQuestionTypeEngine/);
  assert.match(mixedPage, /MixedGuidedPractice/);
  assert.match(mixedPage, /MixedIndependentPractice/);
  assert.match(mixedPage, /MixedProgressEngine/);
  assert.match(mixedPage, /alternates: \{ canonical: URL \}/);
  assert.doesNotMatch(content, /Próximamente|Amazon rainforest|const PASSAGE/);
  assert.match(mixedEngine, /WeLearn Progress Engine/);
  assert.match(mixedEngine, /Submit all decisions/);
  assert.match(mixedEngine, /not a secure Practice, Exam or proctored mode/);
});

test('keeps only the FAQ section in Spanish on the main hub', () => {
  assert.match(content, /Preguntas frecuentes/);
  assert.match(content, /¿Por dónde debería empezar\?/);
  assert.match(page, /¿Skimming y scanning son tipos oficiales/);
});

test('keeps both linked indexes international while preserving a Spanish FAQ', () => {
  assert.match(skillsHub, /name="IELTS Reading Skills"/);
  assert.match(skillsHub, /inLanguage="en"/);
  assert.match(skillsHub, /Recommended pathway/);
  assert.match(skillsHub, /Preguntas frecuentes/);
  assert.match(questionTypesHub, /name="IELTS Reading Question Types"/);
  assert.match(questionTypesHub, /inLanguage="en"/);
  assert.match(questionTypesHub, /11 official types → 14 WeLearn routes/);
  assert.match(questionTypesHub, /Preguntas frecuentes/);
  assert.doesNotMatch(questionTypesHub, /IeltsReadingMixedQuestionTypeEngine/);
});

test('serves all fourteen audited question URLs through the international lesson layer', () => {
  assert.match(nextConfig, /source: '\/practica\/ielts\/reading\/tipos-de-preguntas\/:slug'/);
  assert.match(nextConfig, /destination: '\/practica\/ielts\/reading\/international-question-type\/:slug'/);
  assert.match(internationalQuestionTypes, /satisfies Record<string, QuestionTypeConfig>/);
  assert.equal([...internationalQuestionTypes.matchAll(/^  '[a-z-]+': \{/gm)].length, 14);
  assert.match(internationalQuestionTypes, /robots: \{ index: true, follow: true \}/);
  assert.match(internationalQuestionTypes, /locale: 'en_US'/);
});

test('keeps lesson content English, marks the Spanish FAQ and provides interactive feedback', () => {
  assert.match(internationalLesson, /inLanguage: 'en'/);
  assert.match(internationalLesson, /<div className=\{styles\.page\} style=\{skillStyle\} lang="en">/);
  assert.match(internationalLesson, /aria-labelledby="faq-heading" lang="es"/);
  assert.match(internationalLesson, /FAQ en español/);
  assert.match(internationalClinic, /Three decisions before the full bank/);
  assert.match(internationalClinic, /aria-live="polite"/);
  assert.match(internationalClinic, /role="status"/);
  assert.match(internationalClinic, /minHeight: 48/);
});

test('uses full document navigation for rewritten detail routes', () => {
  assert.match(content, /<a key=\{slug\} href=\{questionRoute\(slug\)\}/);
  assert.match(internationalLesson, /link\.href\.startsWith\('\/practica\/ielts\/reading\/tipos-de-preguntas\/'\)/);
  assert.match(questionTypesHub, /<a\s+key=\{type\.slug\}/);
});

test('resolves every focused lesson to a local Next.js page', () => {
  const routes = [
    'habilidades/skimming',
    'habilidades/scanning',
    'habilidades/parafrasis',
    'habilidades/inferencia',
    'habilidades/limite-de-palabras',
    'habilidades/gestion-del-tiempo',
    ...[
      'true-false-not-given',
      'yes-no-not-given',
      'matching-headings',
      'matching-information',
      'matching-features',
      'matching-sentence-endings',
      'multiple-choice',
      'sentence-completion',
      'summary-completion',
      'note-completion',
      'table-completion',
      'flow-chart-completion',
      'diagram-labeling',
      'short-answer',
    ].map((slug) => `tipos-de-preguntas/${slug}`),
  ];
  for (const route of routes) {
    assert.equal(
      fs.existsSync(path.join(root, `src/app/(site)/practica/ielts/reading/${route}/page.tsx`)),
      true,
      `Missing route page for ${route}`
    );
  }
});

test('includes responsive desktop and mobile layouts for the superhub', () => {
  assert.match(styles, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 900px\)/);
  assert.match(styles, /@media \(max-width: 680px\)/);
  assert.match(styles, /\.typeLinks \{ grid-template-columns: 1fr; \}/);
});
