#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = process.cwd();
const require = createRequire(import.meta.url);
const catalogPath = path.join(root, 'src/data/practica-exams/seo-catalog.ts');
const routeMapPath = path.join(root, 'docs/ielts-toefl-route-map.md');
const inventoryPath = path.join(root, 'docs/ielts-toefl-content-inventory.json');
const keywordMapPath = path.join(root, 'docs/ielts-toefl-keyword-map.csv');

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function assertText(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${label} is missing text.`);
}

function assertArray(value, label, min = 1) {
  if (!Array.isArray(value) || value.length < min) fail(`${label} must contain at least ${min} item(s).`);
}

function includesOneOf(text, alternatives) {
  return alternatives.some((alternative) => text.includes(alternative));
}

function includesAll(text, requiredTexts) {
  return requiredTexts.every((requiredText) => text.includes(requiredText));
}

function loadTsModule(modulePath) {
  const source = fs.readFileSync(modulePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const sandbox = {
    exports: {},
    require,
    console,
  };
  vm.runInNewContext(compiled, sandbox, { filename: modulePath });
  return sandbox.exports;
}

function loadCatalog() {
  return loadTsModule(catalogPath);
}

function routeToPagePath(routePath) {
  const segments = routePath.replace(/^\/+|\/+$/g, '').split('/');
  return path.join(root, 'src/app/(site)', ...segments, 'page.tsx');
}

function validateSkillReviewSourceComponent() {
  const componentPath = path.join(root, 'src/components/exam-practice/SkillReviewSourceBlock.tsx');
  if (!fs.existsSync(componentPath)) {
    fail('SkillReviewSourceBlock component is missing.');
    return;
  }

  const componentText = fs.readFileSync(componentPath, 'utf8');
  for (const requiredText of [
    'Review and sources',
    'reviewed in August 2026',
    'Scope:',
    'not official IELTS questions',
    'do not predict a band score',
  ]) {
    if (!componentText.includes(requiredText)) fail(`SkillReviewSourceBlock must include "${requiredText}".`);
  }
}

function validateQuestionTypeReviewSourceComponent() {
  const componentPath = path.join(root, 'src/components/exam-practice/QuestionTypeReviewSourceBlock.tsx');
  if (!fs.existsSync(componentPath)) {
    fail('QuestionTypeReviewSourceBlock component is missing.');
    return;
  }

  const componentText = fs.readFileSync(componentPath, 'utf8');
  for (const requiredText of ['Revisión y fuentes', 'julio de 2026', 'tipo de pregunta de IELTS Reading', 'no son preguntas oficiales']) {
    if (!componentText.includes(requiredText)) fail(`QuestionTypeReviewSourceBlock must include "${requiredText}".`);
  }
}

function validateIeltsReadingQuestionTypesHub() {
  const pagePath = routeToPagePath('/practica/ielts/reading/tipos-de-preguntas');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const mixedPath = routeToPagePath('/practica/ielts/reading/mixed-practice');
  const mixedText = fs.existsSync(mixedPath) ? fs.readFileSync(mixedPath, 'utf8') : '';
  const embeddedPractice = includesAll(pageText, [
    'IeltsReadingMixedQuestionTypeEngine',
    'IELTS_READING_MIXED_QUESTION_TYPE_SETS',
  ]);
  const dedicatedPractice = pageText.includes('/practica/ielts/reading/mixed-practice') && includesAll(mixedText, [
    'IeltsReadingMixedQuestionTypeEngine',
    'IELTS_READING_MIXED_QUESTION_TYPE_SETS',
    '3 passages · 12 mixed decisions',
  ]);
  if (!embeddedPractice && !dedicatedPractice) {
    fail('IELTS Reading question-types hub must expose the verified mixed-question practice engine either inline or in its dedicated linked room.');
  }
}

function validateIeltsTask2Hub() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task2');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const contentText = fs.readFileSync(
    path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/Content.tsx'),
    'utf8'
  );
  if (!pageText.includes('IeltsTask2PromptBank')) {
    fail('IELTS Writing Task 2 hub must render IeltsTask2PromptBank.');
  }
  if (!pageText.includes('IELTS_TASK2_PROMPT_BANK')) {
    fail('IELTS Writing Task 2 hub must use IELTS_TASK2_PROMPT_BANK.');
  }
  for (const requiredText of [
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
    'Official format and WeLearn strategy',
    'Build the essay',
    'Study by question type',
    'Strengthen transferable skills',
    'Paraphrasing',
    'Thesis and position',
    'Topic sentences',
    'Explanation and development',
    'Examples and evidence',
    'Cohesion and linking',
    'Contrast and concession',
    'Sentence types',
    'Academic vocabulary',
    'Critical final review',
    '/practica/ielts/academic/writing/task2/analisis-pregunta',
  ]) {
    if (!pageText.includes(requiredText) && !contentText.includes(requiredText)) {
      fail(`IELTS Writing Task 2 hub must include "${requiredText}".`);
    }
  }
}

function validateIeltsCoreHubsStructuredData() {
  const hubs = [
    {
      path: '/practica/ielts/academic',
      label: 'IELTS Academic hub',
      requiredTexts: [
        'LearningResourceJsonLd',
        'FaqJsonLd',
        'BreadcrumbJsonLd',
        '/practica/ielts/academic/writing',
        '/practica/ielts/reading',
      ],
    },
    {
      path: '/practica/ielts/reading',
      label: 'IELTS Reading hub',
      requiredTexts: [
        'LearningResourceJsonLd',
        'FaqJsonLd',
        'BreadcrumbJsonLd',
        'tipos oficiales de pregunta',
        'Skimming y scanning son habilidades WeLearn',
      ],
    },
    {
      path: '/practica/ielts/academic/writing',
      label: 'IELTS Academic Writing hub',
      requiredTexts: [
        'LearningResourceJsonLd',
        'FaqJsonLd',
        'BreadcrumbJsonLd',
        '/practica/ielts/academic',
      ],
      requiredAlternatives: [
        ['IELTS Academic Writing incluye Task 1', 'IELTS Academic Writing has two tasks'],
        ['WeLearn separa formato oficial y estrategia', 'Official format versus WeLearn strategy'],
      ],
    },
  ];

  for (const hub of hubs) {
    const pagePath = routeToPagePath(hub.path);
    const contentPath = path.join(path.dirname(pagePath), 'Content.tsx');
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    const contentText = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, 'utf8') : '';
    const combinedText = `${pageText}\n${contentText}`;
    for (const requiredText of hub.requiredTexts) {
      if (!combinedText.includes(requiredText)) {
        fail(`${hub.label} must include "${requiredText}".`);
      }
    }
    for (const alternatives of hub.requiredAlternatives ?? []) {
      if (!includesOneOf(combinedText, alternatives)) {
        fail(`${hub.label} must include one of: ${alternatives.join(' / ')}.`);
      }
    }
  }
}

function getDocumentedRoutes(markdownText, exam) {
  return [
    ...new Set(
      markdownText.split('\n')
        .filter((line) => !/\|\s*planned\s*\|/i.test(line))
        .flatMap((line) => [...line.matchAll(/`(\/practica\/[^`]+)`/g)].map((match) => match[1]))
        // Query-driven practice sessions are documented operational routes, not
        // canonical content pages. They have their own noindex guardrail.
        .filter((routePath) => routePath.startsWith(`/practica/${exam}`) && !routePath.includes('?'))
    ),
  ].sort();
}

function validateIeltsDocumentationCoverage() {
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');
  const keywordMapText = fs.readFileSync(keywordMapPath, 'utf8');
  const ieltsRoutes = getDocumentedRoutes(routeMapText, 'ielts');

  if (ieltsRoutes.length === 0) {
    fail('IELTS route map must document at least one IELTS route.');
  }

  for (const routePath of ieltsRoutes) {
    if (!inventoryText.includes(routePath)) {
      fail(`${routePath} is documented in the IELTS route map but missing from the content inventory.`);
    }
    if (!keywordMapText.includes(`,${routePath},`)) {
      fail(`${routePath} is documented in the IELTS route map but missing from the keyword map.`);
    }
    if (!fs.existsSync(routeToPagePath(routePath))) {
      fail(`${routePath} is documented as an IELTS route but has no page.tsx.`);
    }
  }
}

function validateIeltsTask1Hub() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task1');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const contentText = fs.readFileSync(
    path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task1/Content.tsx'),
    'utf8'
  );
  for (const requiredText of [
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
    'Writing Task 1',
  ]) {
    if (!pageText.includes(requiredText) && !contentText.includes(requiredText)) {
      fail(`IELTS Writing Task 1 hub must include "${requiredText}".`);
    }
  }
  const combinedText = `${pageText}\n${contentText}`;
  for (const alternatives of [
    ['Formato oficial vs estrategia WeLearn', 'Official format versus WeLearn strategy'],
    ['Respuesta explicada', 'Explained answer', 'Answer review', 'model responses'],
  ]) {
    if (!includesOneOf(combinedText, alternatives)) {
      fail(`IELTS Writing Task 1 hub must include one of: ${alternatives.join(' / ')}.`);
    }
  }
}

function validateIeltsTask2OpinionRoute() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task2/opinion');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  if (!pageText.includes('IeltsTask2PromptBank')) {
    fail('IELTS Writing Task 2 opinion route must render IeltsTask2PromptBank.');
  }
  if (!pageText.includes('IELTS_TASK2_OPINION_PROMPTS')) {
    fail('IELTS Writing Task 2 opinion route must use IELTS_TASK2_OPINION_PROMPTS.');
  }
}

function validateIeltsTask2DiscussionRoute() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task2/discussion');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  if (!pageText.includes('IeltsTask2PromptBank')) {
    fail('IELTS Writing Task 2 discussion route must render IeltsTask2PromptBank.');
  }
  if (!pageText.includes('IELTS_TASK2_DISCUSSION_PROMPTS')) {
    fail('IELTS Writing Task 2 discussion route must use IELTS_TASK2_DISCUSSION_PROMPTS.');
  }
}

function validateIeltsTask2AdvantagesDisadvantagesRoute() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task2/advantages-disadvantages');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  if (!pageText.includes('IeltsTask2PromptBank')) {
    fail('IELTS Writing Task 2 advantages-disadvantages route must render IeltsTask2PromptBank.');
  }
  if (!pageText.includes('IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS')) {
    fail('IELTS Writing Task 2 advantages-disadvantages route must use IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS.');
  }
}

function validateIeltsTask2ProblemSolutionRoute() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task2/problem-solution');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  if (!pageText.includes('IeltsTask2PromptBank')) {
    fail('IELTS Writing Task 2 problem-solution route must render IeltsTask2PromptBank.');
  }
  if (!pageText.includes('IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS')) {
    fail('IELTS Writing Task 2 problem-solution route must use IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS.');
  }
}

function validateIeltsTask2DirectQuestionRoute() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/task2/direct-question');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  if (!pageText.includes('IeltsTask2PromptBank')) {
    fail('IELTS Writing Task 2 direct-question route must render IeltsTask2PromptBank.');
  }
  if (!pageText.includes('IELTS_TASK2_DIRECT_QUESTION_PROMPTS')) {
    fail('IELTS Writing Task 2 direct-question route must use IELTS_TASK2_DIRECT_QUESTION_PROMPTS.');
  }
}

function validateToeflAcademicDiscussionRoutes() {
  const guidePath = routeToPagePath('/practica/toefl/writing/academic-discussion');
  const guideText = fs.existsSync(guidePath) ? fs.readFileSync(guidePath, 'utf8') : '';
  if (!guideText.includes('AcademicDiscussionWorkbench')) {
    fail('TOEFL Academic Discussion guide must render AcademicDiscussionWorkbench.');
  }
  if (!guideText.includes('TOEFL_ACADEMIC_DISCUSSION_PROMPTS')) {
    fail('TOEFL Academic Discussion guide must use TOEFL_ACADEMIC_DISCUSSION_PROMPTS.');
  }
  if (!guideText.includes('/practica/toefl/writing/academic-discussion/banco-de-prompts')) {
    fail('TOEFL Academic Discussion guide must link to the prompt bank.');
  }
  if (!guideText.includes('Formato oficial vs estrategia WeLearn')) {
    fail('TOEFL Academic Discussion guide must distinguish official format from WeLearn strategy.');
  }
  if (!guideText.includes('ETS_WRITING_URL')) {
    fail('TOEFL Academic Discussion guide must cite the ETS TOEFL Writing source.');
  }
  if (!guideText.includes('Integrated Writing se mantiene como legacy/síntesis complementaria')) {
    fail('TOEFL Academic Discussion guide must keep Integrated Writing marked as legacy/synthesis.');
  }

  const bankPath = routeToPagePath('/practica/toefl/writing/academic-discussion/banco-de-prompts');
  const bankText = fs.existsSync(bankPath) ? fs.readFileSync(bankPath, 'utf8') : '';
  if (!bankText.includes('AcademicDiscussionPromptBankClient')) {
    fail('TOEFL Academic Discussion prompt bank must render AcademicDiscussionPromptBankClient.');
  }
  if (!bankText.includes('ACADEMIC_DISCUSSION_PROMPTS')) {
    fail('TOEFL Academic Discussion prompt bank must use ACADEMIC_DISCUSSION_PROMPTS.');
  }
  if (!bankText.includes('Integrated Writing permanece como ruta legacy/síntesis complementaria')) {
    fail('TOEFL Academic Discussion prompt bank FAQ must keep Integrated Writing marked as legacy/synthesis.');
  }
}

function validateToeflEmailRoutes() {
  const guidePath = routeToPagePath('/practica/toefl/writing/write-an-email');
  const guideText = fs.existsSync(guidePath) ? fs.readFileSync(guidePath, 'utf8') : '';
  if (!guideText.includes('EmailWritingWorkbench')) {
    fail('TOEFL Write an Email guide must render EmailWritingWorkbench.');
  }
  if (!guideText.includes('TOEFL_EMAIL_PROMPTS')) {
    fail('TOEFL Write an Email guide must use TOEFL_EMAIL_PROMPTS.');
  }
  if (!guideText.includes('/practica/toefl/writing/write-an-email/banco-de-prompts')) {
    fail('TOEFL Write an Email guide must link to the prompt bank.');
  }
  if (!guideText.includes('Formato oficial vs estrategia WeLearn')) {
    fail('TOEFL Write an Email guide must distinguish official format from WeLearn strategy.');
  }
  if (!guideText.includes('ETS_WRITING_URL')) {
    fail('TOEFL Write an Email guide must cite the ETS TOEFL Writing source.');
  }
  if (!guideText.includes('Integrated Writing se mantiene como legacy/síntesis complementaria')) {
    fail('TOEFL Write an Email guide must keep Integrated Writing marked as legacy/synthesis.');
  }

  const bankPath = routeToPagePath('/practica/toefl/writing/write-an-email/banco-de-prompts');
  const bankText = fs.existsSync(bankPath) ? fs.readFileSync(bankPath, 'utf8') : '';
  if (!bankText.includes('EmailPromptBankClient')) {
    fail('TOEFL Write an Email prompt bank must render EmailPromptBankClient.');
  }
  if (!bankText.includes('EMAIL_PROMPT_BANK')) {
    fail('TOEFL Write an Email prompt bank must use EMAIL_PROMPT_BANK.');
  }
  if (!bankText.includes('Integrated Writing permanece como ruta legacy/síntesis complementaria')) {
    fail('TOEFL Write an Email prompt bank FAQ must keep Integrated Writing marked as legacy/synthesis.');
  }
}

function validateToeflBuildSentenceRoute() {
  const guidePath = routeToPagePath('/practica/toefl/writing/build-a-sentence');
  const guideText = fs.existsSync(guidePath) ? fs.readFileSync(guidePath, 'utf8') : '';
  if (!guideText.includes('SentenceBuildWorkbench')) {
    fail('TOEFL Build a Sentence guide must render SentenceBuildWorkbench.');
  }
  if (!guideText.includes('TOEFL_SENTENCE_BUILD_ITEMS')) {
    fail('TOEFL Build a Sentence guide must use TOEFL_SENTENCE_BUILD_ITEMS.');
  }
  if (!guideText.includes('TOEFL_BUILD_A_SENTENCE_PROMPT_BANK')) {
    fail('TOEFL Build a Sentence guide must render TOEFL_BUILD_A_SENTENCE_PROMPT_BANK.');
  }
  if (!guideText.includes('Formato oficial vs estrategia WeLearn')) {
    fail('TOEFL Build a Sentence guide must distinguish official format from WeLearn strategy.');
  }
  if (!guideText.includes('Integrated Writing, que aquí se mantiene como síntesis/legacy')) {
    fail('TOEFL Build a Sentence guide must keep Integrated Writing marked as legacy/synthesis.');
  }
}

function validateToeflReadingCurrentFormatRoutes() {
  const hubPath = routeToPagePath('/practica/toefl/reading/formato-2026');
  const hubText = fs.existsSync(hubPath) ? fs.readFileSync(hubPath, 'utf8') : '';
  for (const requiredText of [
    'TOEFL_READING_CURRENT_FORMAT',
    'TOEFL_READING_MIXED_DRILLS',
    'Complete the Words',
    'Read in Daily Life',
    'Read an Academic Passage',
    'Formato oficial vs estrategia WeLearn',
    'rutas de question types como apoyo compatible',
  ]) {
    if (!hubText.includes(requiredText)) {
      fail(`TOEFL Reading current-format hub must include "${requiredText}".`);
    }
  }

  const currentTaskRoutes = [
    {
      path: '/practica/toefl/reading/formato-2026/complete-the-words',
      dataExport: 'TOEFL_COMPLETE_WORDS_ITEMS',
      requiredText: 'Banco inicial: completa cada oración',
    },
    {
      path: '/practica/toefl/reading/formato-2026/read-in-daily-life',
      dataExport: 'TOEFL_DAILY_LIFE_TEXTS',
      requiredText: 'Banco inicial de textos funcionales',
    },
    {
      path: '/practica/toefl/reading/formato-2026/read-an-academic-passage',
      dataExport: 'TOEFL_ACADEMIC_PASSAGES',
      requiredText: 'Banco inicial de pasajes académicos',
    },
  ];

  for (const route of currentTaskRoutes) {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes(route.dataExport)) fail(`${route.path} must use ${route.dataExport}.`);
    if (!pageText.includes(route.requiredText)) fail(`${route.path} must render its guided practice bank.`);
    if (!pageText.includes('Formato oficial vs estrategia WeLearn')) {
      fail(`${route.path} must distinguish official format from WeLearn strategy.`);
    }
    if (!pageText.includes('ETS_TEST_CONTENT_URL')) fail(`${route.path} must cite the ETS TOEFL test content source.`);
    if (!pageText.includes('Respuestas explicadas')) fail(`${route.path} must render explained answers.`);
    if (!pageText.includes('/practica/toefl/reading/formato-2026')) {
      fail(`${route.path} must link back to the current-format hub.`);
    }
  }
}

function validateIeltsSkimScanRoutes() {
  const skimmingPath = routeToPagePath('/practica/ielts/reading/habilidades/skimming');
  const skimmingText = fs.existsSync(skimmingPath) ? fs.readFileSync(skimmingPath, 'utf8') : '';
  for (const requiredText of [
    'SkimmingPracticeEngine',
    'SkimmingIndependentPractice',
    'SkimmingProgressEngine',
    'IELTS_SKIMMING_PRACTICE',
    'SKIMMING_INDEPENDENT_PASSAGE_ID',
    'ielts-reading-practice-engine-blueprint.md',
    '/practica/ielts/reading/habilidades/scanning',
    '/practica/ielts/reading/tipos-de-preguntas/matching-headings',
  ]) {
    if (!skimmingText.includes(requiredText)) fail(`IELTS skimming route must include "${requiredText}".`);
  }

  const scanningPath = routeToPagePath('/practica/ielts/reading/habilidades/scanning');
  const scanningText = fs.existsSync(scanningPath) ? fs.readFileSync(scanningPath, 'utf8') : '';
  const newScanningContract = [
    'ScanningPracticeEngine',
    'ScanningIndependentPractice',
    'ScanningProgressEngine',
    'SCANNING_GUIDED_PASSAGE_ID',
    'SCANNING_INDEPENDENT_PASSAGE_ID',
    'ielts-reading-practice-engine-blueprint.md',
    'SkillReviewSourceBlock',
    'IELTS_ACADEMIC_URL',
    'reviewedFocus',
    'sources={[',
    'officialNote=',
    '/practica/ielts/reading/habilidades/skimming',
    '/practica/ielts/reading/tipos-de-preguntas/matching-information',
  ];
  const legacyScanningContract = [
    'SkimScanTransferEngine',
    'IELTS_SCANNING_PRACTICE',
    'IELTS_SKIM_SCAN_TRANSFER_SETS',
    'Formato oficial vs estrategia WeLearn',
    'SkillReviewSourceBlock',
    'Skimming and scanning',
    '/practica/ielts/reading/habilidades/skimming',
    '/practica/ielts/reading/tipos-de-preguntas/matching-information',
  ];
  if (!includesAll(scanningText, newScanningContract) && !includesAll(scanningText, legacyScanningContract)) {
    fail('IELTS scanning route must satisfy the complete progressive or legacy audited practice contract.');
  }
}

function validateIeltsReadingSkillPracticeRoutes() {
  const routes = [
    {
      path: '/practica/ielts/reading/habilidades/inferencia',
      label: 'IELTS inference route',
      requiredTexts: [
        'InferenceGuidedPractice',
        'InferenceIndependentPractice',
        'InferenceProgressEngine',
        'INFERENCE_GUIDED_PASSAGE_ID',
        'INFERENCE_INDEPENDENT_PASSAGE_ID',
        'ielts-reading-practice-engine-blueprint.md',
        'SkillReviewSourceBlock',
        'IELTS_ACADEMIC_URL',
        '/practica/ielts/reading/habilidades/scanning',
        '/practica/ielts/reading/habilidades/parafrasis',
        '/practica/ielts/reading/tipos-de-preguntas/multiple-choice',
        '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given',
      ],
    },
    {
      path: '/practica/ielts/reading/habilidades/parafrasis',
      label: 'IELTS paraphrase route',
      requiredTexts: [
        'ParaphraseGuidedPractice',
        'ParaphraseIndependentPractice',
        'ParaphraseProgressEngine',
        'PARAPHRASE_GUIDED_PASSAGE_ID',
        'PARAPHRASE_INDEPENDENT_PASSAGE_ID',
        'ielts-reading-practice-engine-blueprint.md',
        'SkillReviewSourceBlock',
        'IELTS_ACADEMIC_URL',
        '/practica/ielts/reading/habilidades/skimming',
        '/practica/ielts/reading/habilidades/scanning',
        '/practica/ielts/reading/tipos-de-preguntas/summary-completion',
        '/practica/ielts/reading/tipos-de-preguntas/sentence-completion',
      ],
    },
    {
      path: '/practica/ielts/reading/habilidades/limite-de-palabras',
      label: 'IELTS word-limit route',
      requiredTexts: [
        'WordLimitPracticeEngine',
        'IELTS_WORD_LIMIT_PRACTICE_SETS',
        'Formato oficial vs estrategia WeLearn',
        'SkillReviewSourceBlock',
        'IELTS_ACADEMIC_URL',
        '/practica/ielts/reading/habilidades/scanning',
        '/practica/ielts/reading/habilidades/parafrasis',
        '/practica/ielts/reading/tipos-de-preguntas/sentence-completion',
        '/practica/ielts/reading/tipos-de-preguntas/short-answer',
      ],
    },
    {
      path: '/practica/ielts/reading/habilidades/gestion-del-tiempo',
      label: 'IELTS time-management route',
      requiredTexts: [
        'TimeManagementPracticeEngine',
        'IELTS_TIME_MANAGEMENT_PRACTICE_SETS',
        'Formato oficial vs estrategia WeLearn',
        'SkillReviewSourceBlock',
        'IELTS_ACADEMIC_URL',
        '/practica/ielts/reading/habilidades/skimming',
        '/practica/ielts/reading/habilidades/scanning',
        '/practica/ielts/reading/tipos-de-preguntas/matching-headings',
        '/practica/ielts/reading/tipos-de-preguntas/multiple-choice',
      ],
    },
  ];

  for (const route of routes) {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    const internationalReviewContract = [
      'InternationalReadingSkillLesson',
      'SkillReviewSourceBlock',
      'IELTS_ACADEMIC_URL',
      'reviewedFocus',
      'sources={[',
      'officialNote=',
    ];
    const requiredTexts = route.requiredTexts.filter((requiredText) => requiredText !== 'Formato oficial vs estrategia WeLearn');
    for (const requiredText of requiredTexts) {
      if (!pageText.includes(requiredText)) fail(`${route.label} must include "${requiredText}".`);
    }
    if (!pageText.includes('Formato oficial vs estrategia WeLearn') && !includesAll(pageText, internationalReviewContract)) {
      fail(`${route.label} must include the complete official-format review boundary.`);
    }
  }
}

function validateIeltsParaphraseProgressContract() {
  const dataPath = path.join(root, 'src/data/practica-exams/ielts-reading-paraphrase-progress.ts');
  const componentPath = path.join(root, 'src/components/exam-practice/ParaphrasePracticeLab.tsx');
  if (!fs.existsSync(dataPath)) fail('IELTS paraphrase progress data is missing.');
  if (!fs.existsSync(componentPath)) fail('IELTS paraphrase practice lab is missing.');
  if (!fs.existsSync(dataPath) || !fs.existsSync(componentPath)) return;
  const dataText = fs.readFileSync(dataPath, 'utf8');
  const componentText = fs.readFileSync(componentPath, 'utf8');
  for (const requiredText of [
    'PARAPHRASE_STORAGE_KEY',
    'PARAPHRASE_LEGACY_STORAGE_KEY',
    'PARAPHRASE_LEVELS',
    'getParaphraseOptions',
    "'scope-shift'",
    "'certainty-shift'",
    "'cause-or-sequence-shift'",
    "'comparison-shift'",
  ]) if (!dataText.includes(requiredText)) fail(`IELTS paraphrase progress data must include "${requiredText}".`);
  for (const requiredText of [
    'native',
    'localStorage',
    'Press again to reset',
    'feedback closed',
    'WeLearn Progress Engine',
    'not an IELTS band',
    'not a secure Practice, Exam or proctored mode',
  ]) {
    const present = requiredText === 'native' ? componentText.includes('type="radio"') : componentText.includes(requiredText);
    if (!present) fail(`IELTS paraphrase practice lab must include "${requiredText}".`);
  }
}

function validateIeltsInferenceProgressContract() {
  const dataPath = path.join(root, 'src/data/practica-exams/ielts-reading-inference-progress.ts');
  const componentPath = path.join(root, 'src/components/exam-practice/InferencePracticeLab.tsx');
  if (!fs.existsSync(dataPath)) fail('IELTS inference progress data is missing.');
  if (!fs.existsSync(componentPath)) fail('IELTS inference practice lab is missing.');
  if (!fs.existsSync(dataPath) || !fs.existsSync(componentPath)) return;
  const dataText = fs.readFileSync(dataPath, 'utf8');
  const componentText = fs.readFileSync(componentPath, 'utf8');
  for (const requiredText of ['INFERENCE_STORAGE_KEY', 'INFERENCE_LEGACY_STORAGE_KEY', 'INFERENCE_LEVELS', 'getInferenceOptions', "'outside-knowledge'", "'certainty-inflation'", "'causation-invented'", "'scope-overreach'"]) {
    if (!dataText.includes(requiredText)) fail(`IELTS inference progress data must include "${requiredText}".`);
  }
  for (const requiredText of ['type="radio"', 'localStorage', 'Press again to reset', 'feedback closed', 'WeLearn Progress Engine', 'not an IELTS band', 'not a secure Practice, Exam or proctored mode']) {
    if (!componentText.includes(requiredText)) fail(`IELTS inference practice lab must include "${requiredText}".`);
  }
}

function validateIeltsGeneralTrainingHub() {
  const pagePath = routeToPagePath('/practica/ielts/general-training');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const sitemapText = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const ieltsHubText = fs.readFileSync(routeToPagePath('/practica/ielts'), 'utf8');
  const ieltsHubClientText = fs.readFileSync(path.join(root, 'src/app/(site)/practica/ielts/IELTSHubClient.tsx'), 'utf8');

  for (const requiredText of [
    'CANONICAL_URL',
    'IELTS_GENERAL_TRAINING_URL',
    'IELTS_GENERAL_TRAINING_SAMPLE_URL',
    'Formato oficial vs estrategia WeLearn',
    'Mini práctica inicial con respuestas explicadas',
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
    '/practica/ielts/academic',
    '/practica/ielts/reading/habilidades',
    '/practica/ielts/reading/tipos-de-preguntas',
    '/practica/ielts/academic/writing/task2',
    'Writing Task 1: carta',
    'Reading General Training',
    'Respuesta:',
    'Explicación:',
  ]) {
    if (!pageText.includes(requiredText)) fail(`IELTS General Training hub must include "${requiredText}".`);
  }

  if (!sitemapText.includes('/practica/ielts/general-training')) {
    fail('IELTS General Training hub must be in sitemap only after complete publication.');
  }
  if (!includesOneOf(ieltsHubText, ['Academic y General Training', 'Academic and General Training'])) {
    fail('IELTS top hub metadata/schema must represent both Academic and General Training.');
  }
  if (!ieltsHubClientText.includes('/practica/ielts/general-training')) {
    fail('IELTS top hub must link to the General Training hub.');
  }
}

function validateIeltsWritingRubricRoute() {
  const pagePath = routeToPagePath('/practica/ielts/academic/writing/rubrica');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const sitemapText = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const writingHubText = fs.readFileSync(routeToPagePath('/practica/ielts/academic/writing'), 'utf8');
  const writingHubClientText = fs.readFileSync(
    path.join(root, 'src/app/(site)/practica/ielts/academic/writing/Content.tsx'),
    'utf8'
  );

  for (const requiredText of [
    'IELTS_ACADEMIC_URL',
    'IELTS_ACADEMIC_SAMPLE_URL',
    'Formato oficial vs estrategia WeLearn',
    'No. Es una rúbrica pedagógica de WeLearn',
    'Task Achievement / Task Response',
    'Coherence and Cohesion',
    'Lexical Resource',
    'Grammatical Range and Accuracy',
    'Checklist de revisión antes de entregar',
    'Diagnóstico rápido con respuestas explicadas',
    'Criterio principal:',
    'Explicación:',
    '/practica/ielts/academic/writing/task1',
    '/practica/ielts/academic/writing/task2',
    '/practica/ielts/academic/writing/task2/model-answers',
    '/practica/ielts/general-training',
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
  ]) {
    if (!pageText.includes(requiredText)) fail(`IELTS Writing rubric route must include "${requiredText}".`);
  }

  if (!sitemapText.includes('/practica/ielts/academic/writing/rubrica')) {
    fail('IELTS Writing rubric route must be in sitemap only after complete publication.');
  }
  if (!writingHubText.includes('IELTS Academic Writing')) {
    fail('IELTS Writing hub page must remain present while linking rubric route.');
  }
  if (!writingHubClientText.includes('/practica/ielts/academic/writing/rubrica')) {
    fail('IELTS Writing hub must link to the rubric route.');
  }
}

function validateIeltsGeneralTrainingWritingTask1Route() {
  const pagePath = routeToPagePath('/practica/ielts/general-training/writing/task1');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const sitemapText = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');
  const gtHubText = fs.readFileSync(routeToPagePath('/practica/ielts/general-training'), 'utf8');

  for (const requiredText of [
    'CANONICAL_URL',
    'IELTS_GENERAL_TRAINING_URL',
    'IELTS_GENERAL_TRAINING_SAMPLE_URL',
    'GT_TASK1_LETTER_PROMPTS',
    'Formato oficial vs estrategia WeLearn',
    'Respuesta explicada',
    'Mini práctica: elige el tono',
    'Banco de práctica: cartas IELTS General Training Task 1',
    'formal',
    'semi-formal',
    'informal',
    'Trampa común:',
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
    '/practica/ielts/general-training',
    '/practica/ielts/academic/writing/task1',
    '/practica/ielts/academic/writing/rubrica',
    '/practica/ielts/academic/writing/task2',
  ]) {
    if (!pageText.includes(requiredText)) {
      fail(`IELTS General Training Writing Task 1 route must include "${requiredText}".`);
    }
  }

  const promptIds = [...pageText.matchAll(/id: 'gt-task1-letter-/g)];
  if (promptIds.length < 4) {
    fail('IELTS General Training Writing Task 1 route must include at least four original letter prompts.');
  }
  for (const requiredField of [
    'situation:',
    'tone:',
    'purpose:',
    'bulletPoints:',
    'plan:',
    'usefulLanguage:',
    'commonTrap:',
    'modelOpening:',
    'answerCheck:',
  ]) {
    if (!pageText.includes(requiredField)) {
      fail(`IELTS General Training Writing Task 1 prompts must include "${requiredField}".`);
    }
  }

  if (!sitemapText.includes('/practica/ielts/general-training/writing/task1')) {
    fail('IELTS General Training Writing Task 1 route must be in sitemap only after complete publication.');
  }
  if (!routeMapText.includes('/practica/ielts/general-training/writing/task1')) {
    fail('IELTS General Training Writing Task 1 route must be documented in the route map.');
  }
  if (!inventoryText.includes('/practica/ielts/general-training/writing/task1')) {
    fail('IELTS General Training Writing Task 1 route must be represented in the inventory.');
  }
  if (!gtHubText.includes('/practica/ielts/general-training/writing/task1')) {
    fail('IELTS General Training hub must link to the Writing Task 1 child route.');
  }
}

function validateIeltsGeneralTrainingReadingRoute() {
  const pagePath = routeToPagePath('/practica/ielts/general-training/reading');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const sitemapText = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');
  const gtHubText = fs.readFileSync(routeToPagePath('/practica/ielts/general-training'), 'utf8');

  for (const requiredText of [
    'CANONICAL_URL',
    'IELTS_GENERAL_TRAINING_URL',
    'IELTS_GENERAL_TRAINING_SAMPLE_URL',
    'IELTS_GT_READING_TEXTS',
    'Formato oficial vs estrategia WeLearn',
    'Banco de práctica: textos General Training Reading',
    'Respuesta:',
    'Explicación:',
    'Trampa:',
    'short-answer',
    'sentence-completion',
    'matching-information',
    'true-false-not-given',
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
    '/practica/ielts/general-training',
    '/practica/ielts/general-training/writing/task1',
    '/practica/ielts/reading/habilidades/skimming',
    '/practica/ielts/reading/habilidades/scanning',
    '/practica/ielts/reading/habilidades/limite-de-palabras',
    '/practica/ielts/reading/tipos-de-preguntas',
  ]) {
    if (!pageText.includes(requiredText)) {
      fail(`IELTS General Training Reading route must include "${requiredText}".`);
    }
  }

  const textIds = [...pageText.matchAll(/id: 'gt-reading-/g)];
  for (const requiredContext of ['functional', 'social', 'workplace', 'training']) {
    if (!pageText.includes(requiredContext)) {
      fail(`IELTS General Training Reading route must include "${requiredContext}" text coverage.`);
    }
  }

  const questionIds = [...pageText.matchAll(/id: 'gt-reading-[^']+-q\d+'/g)];
  if (textIds.length < 4) {
    fail('IELTS General Training Reading route must include at least four original reading texts.');
  }
  if (questionIds.length < 12) {
    fail('IELTS General Training Reading route must include at least twelve original questions.');
  }
  for (const requiredField of ['context:', 'firstMove:', 'passage:', 'questions:', 'answer:', 'explanation:', 'trap:']) {
    if (!pageText.includes(requiredField)) {
      fail(`IELTS General Training Reading bank must include "${requiredField}".`);
    }
  }

  if (!sitemapText.includes('/practica/ielts/general-training/reading')) {
    fail('IELTS General Training Reading route must be in sitemap only after complete publication.');
  }
  if (!routeMapText.includes('/practica/ielts/general-training/reading')) {
    fail('IELTS General Training Reading route must be documented in the route map.');
  }
  if (!inventoryText.includes('/practica/ielts/general-training/reading')) {
    fail('IELTS General Training Reading route must be represented in the inventory.');
  }
  if (!gtHubText.includes('/practica/ielts/general-training/reading')) {
    fail('IELTS General Training hub must link to the Reading child route.');
  }
}

function validateIeltsGeneralTrainingWritingTask2Route() {
  const pagePath = routeToPagePath('/practica/ielts/general-training/writing/task2');
  const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  const sitemapText = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');
  const gtHubText = fs.readFileSync(routeToPagePath('/practica/ielts/general-training'), 'utf8');

  for (const requiredText of [
    'CANONICAL_URL',
    'IELTS_GENERAL_TRAINING_URL',
    'IELTS_GENERAL_TRAINING_SAMPLE_URL',
    'GT_TASK2_ESSAY_PROMPTS',
    'Formato oficial vs estrategia WeLearn',
    'Diferencia práctica entre Task 2 Academic y General Training',
    'Banco de práctica: ensayos General Training Task 2',
    'Respuesta explicada',
    'Trampa común:',
    'opinion',
    'discussion',
    'advantages-disadvantages',
    'problem-solution',
    'direct-question',
    'LearningResourceJsonLd',
    'FaqJsonLd',
    'BreadcrumbJsonLd',
    '/practica/ielts/general-training',
    '/practica/ielts/general-training/writing/task1',
    '/practica/ielts/academic/writing/task2',
    '/practica/ielts/academic/writing/task2/model-answers',
    '/practica/ielts/academic/writing/rubrica',
  ]) {
    if (!pageText.includes(requiredText)) {
      fail(`IELTS General Training Writing Task 2 route must include "${requiredText}".`);
    }
  }

  const promptIds = [...pageText.matchAll(/id: 'gt-task2-/g)];
  if (promptIds.length < 5) {
    fail('IELTS General Training Writing Task 2 route must include at least five original essay prompts.');
  }
  for (const requiredField of [
    'category:',
    'prompt:',
    'target:',
    'plan:',
    'thesisMove:',
    'usefulLanguage:',
    'commonTrap:',
    'modelOpening:',
    'answerCheck:',
  ]) {
    if (!pageText.includes(requiredField)) {
      fail(`IELTS General Training Writing Task 2 prompts must include "${requiredField}".`);
    }
  }

  if (!sitemapText.includes('/practica/ielts/general-training/writing/task2')) {
    fail('IELTS General Training Writing Task 2 route must be in sitemap only after complete publication.');
  }
  if (!routeMapText.includes('/practica/ielts/general-training/writing/task2')) {
    fail('IELTS General Training Writing Task 2 route must be documented in the route map.');
  }
  if (!inventoryText.includes('/practica/ielts/general-training/writing/task2')) {
    fail('IELTS General Training Writing Task 2 route must be represented in the inventory.');
  }
  if (!gtHubText.includes('/practica/ielts/general-training/writing/task2')) {
    fail('IELTS General Training hub must link to the Writing Task 2 child route.');
  }
}

function validateIeltsTask1LegacySkillReviewRoutes() {
  const sharedBlockPath = path.join(
    root,
    'src/app/(site)/practica/ielts/academic/writing/task1/Task1OfficialReviewBlock.tsx'
  );
  const sharedBlockText = fs.existsSync(sharedBlockPath) ? fs.readFileSync(sharedBlockPath, 'utf8') : '';
  for (const requiredText of [
    'IELTS_ACADEMIC_URL',
    'IELTS_ACADEMIC_SAMPLE_URL',
    '/practica/ielts/academic/writing/rubrica',
    '/practica/ielts/general-training',
  ]) {
    if (!sharedBlockText.includes(requiredText)) {
      fail(`IELTS Task 1 shared review block must include "${requiredText}".`);
    }
  }
  for (const alternatives of [
    ['Formato oficial vs estrategia WeLearn', 'Official format versus WeLearn strategy'],
    ['Foco revisado:', 'Review focus:'],
    ['Respuesta explicada:', 'Explained answer:'],
  ]) {
    if (!includesOneOf(sharedBlockText, alternatives)) {
      fail(`IELTS Task 1 shared review block must include one of: ${alternatives.join(' / ')}.`);
    }
  }

  const routes = [
    {
      path: '/practica/ielts/academic/writing/task1/introduccion',
      focus: ['Parafrasear el enunciado', 'Paraphrase the prompt'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/overview',
      focus: ['Seleccionar los rasgos principales', 'Select the main features'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/tendencias',
      focus: ['Distinguir tendencia global', 'Distinguish the overall trend'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/comparaciones',
      component: 'ComparisonsEnglish.tsx',
      focus: ['Comparar cifras relevantes', 'Compare relevant figures', 'compare relevant evidence'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/procesos',
      focus: ['Describir etapas en orden lógico', 'Describe stages in logical order'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/mapas',
      focus: ['Ubicar cambios espaciales', 'Locate spatial changes'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/vocabulario',
      focus: ['Elegir vocabulario de datos', 'Choose precise data vocabulary', 'Choose data vocabulary'],
    },
    {
      path: '/practica/ielts/academic/writing/task1/tarea-completa',
      focus: ['Integrar introducción', 'Integrate the introduction', 'Integrate an introduction'],
    },
  ];

  for (const route of routes) {
    const pageDir = path.dirname(routeToPagePath(route.path));
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    const contentPath = path.join(pageDir, route.component ?? 'Content.tsx');
    const contentText = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, 'utf8') : '';
    if (pageText.includes('| Idiomas WeLearn')) {
      fail(`${route.path} metadata title must not duplicate the global Idiomas WeLearn template.`);
    }
    if (!pageText.includes('Task1SkillStructuredData')) {
      fail(`${route.path} must render Task1SkillStructuredData.`);
    }
    if (!contentText.includes('Task1OfficialReviewBlock')) {
      fail(`${route.path} must render Task1OfficialReviewBlock.`);
    }
    if (!includesOneOf(contentText, route.focus)) {
      fail(`${route.path} must declare one reviewed focus: ${route.focus.join(' / ')}.`);
    }
    if (!contentText.includes('officialFormat=')) {
      fail(`${route.path} must pass officialFormat to Task1OfficialReviewBlock.`);
    }
    if (!contentText.includes('welearnStrategy=')) {
      fail(`${route.path} must pass welearnStrategy to Task1OfficialReviewBlock.`);
    }
    if (!contentText.includes('answerCheck=')) {
      fail(`${route.path} must pass answerCheck to Task1OfficialReviewBlock.`);
    }
  }
}

function validateIeltsTask1DiscoveryRules() {
  const sitemapPath = path.join(root, 'src/app/sitemap.ts');
  const sitemapText = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
  const indexedTask1Routes = [
    'introduccion',
    'overview',
    'body-1',
    'body-2',
    'tendencias',
    'comparaciones',
    'procesos',
    'mapas',
    'vocabulario',
    'tarea-completa',
  ];

  for (const route of indexedTask1Routes) {
    if (!sitemapText.includes(`'${route}'`)) {
      fail(`IELTS Task 1 sitemap must retain the complete canonical lesson route "${route}".`);
    }
  }

  if (sitemapText.includes("'sesion'")) {
    fail('IELTS Task 1 individual writing sessions must stay out of the sitemap.');
  }

  const sessionPagePath = path.join(
    root,
    'src/app/(site)/practica/ielts/academic/writing/task1/tarea-completa/sesion/page.tsx'
  );
  const sessionPageText = fs.existsSync(sessionPagePath) ? fs.readFileSync(sessionPagePath, 'utf8') : '';
  if (!sessionPageText.includes('robots: { index: false, follow: false }')) {
    fail('IELTS Task 1 individual writing sessions must remain noindex, nofollow.');
  }
}

function validateIeltsTask2LegacySkillReviewRoutes() {
  const sharedBlockPath = path.join(
    root,
    'src/app/(site)/practica/ielts/academic/writing/task2/Task2OfficialReviewBlock.tsx'
  );
  const sharedBlockText = fs.existsSync(sharedBlockPath) ? fs.readFileSync(sharedBlockPath, 'utf8') : '';
  for (const requiredText of [
    'IELTS_ACADEMIC_URL',
    'IELTS_ACADEMIC_SAMPLE_URL',
    '/practica/ielts/academic/writing/rubrica',
    '/practica/ielts/academic/writing/task2/model-answers',
    '/practica/ielts/general-training',
  ]) {
    if (!sharedBlockText.includes(requiredText)) {
      fail(`IELTS Task 2 shared review block must include "${requiredText}".`);
    }
  }
  for (const alternatives of [
    ['Formato oficial vs estrategia WeLearn', 'Official format versus WeLearn strategy'],
    ['Foco revisado:', 'Review focus:'],
    ['Respuesta explicada:', 'Explained answer:'],
  ]) {
    if (!includesOneOf(sharedBlockText, alternatives)) {
      fail(`IELTS Task 2 shared review block must include one of: ${alternatives.join(' / ')}.`);
    }
  }

  const routes = [
    {
      path: '/practica/ielts/academic/writing/task2/tipo-ensayo',
      component: 'TipoEnsayoClient.tsx',
      focus: 'Reconocer la instrucción del prompt',
    },
    {
      path: '/practica/ielts/academic/writing/task2/introduccion',
      component: 'IntroduccionTask2Client.tsx',
      focus: 'Write an accurate paraphrase',
    },
    {
      path: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
      component: 'ParrafosCuerpoClient.tsx',
      focus: 'Desarrollar párrafos de cuerpo',
    },
    {
      path: '/practica/ielts/academic/writing/task2/linking-language',
      component: 'LinkingLanguageClient.tsx',
      focus: 'Elegir conectores',
    },
    {
      path: '/practica/ielts/academic/writing/task2/conclusion',
      component: 'ConclusionTask2Client.tsx',
      focus: 'Complete the response',
    },
    {
      path: '/practica/ielts/academic/writing/task2/revision-final',
      component: 'FinalReviewClient.tsx',
      focus: 'Use the remaining time',
    },
    {
      path: '/practica/ielts/academic/writing/task2/tarea-completa',
      component: 'TareaCompletaTask2Client.tsx',
      focus: 'Planear, escribir, revisar',
    },
  ];

  for (const route of routes) {
    const pageDir = path.dirname(routeToPagePath(route.path));
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    const componentPath = path.join(pageDir, route.component);
    const componentText = fs.existsSync(componentPath) ? fs.readFileSync(componentPath, 'utf8') : '';
    if (pageText.includes('| Idiomas WeLearn')) {
      fail(`${route.path} metadata title must not duplicate the global Idiomas WeLearn template.`);
    }
    if (!pageText.includes('Task2SkillStructuredData')) {
      fail(`${route.path} must render Task2SkillStructuredData.`);
    }
    if (!componentText.includes('Task2OfficialReviewBlock')) {
      fail(`${route.path} must render Task2OfficialReviewBlock.`);
    }
    if (!componentText.includes(route.focus)) {
      fail(`${route.path} must declare route-specific reviewed focus "${route.focus}".`);
    }
    if (!componentText.includes('officialFormat=')) {
      fail(`${route.path} must pass officialFormat to Task2OfficialReviewBlock.`);
    }
    if (!componentText.includes('welearnStrategy=')) {
      fail(`${route.path} must pass welearnStrategy to Task2OfficialReviewBlock.`);
    }
    if (!componentText.includes('answerCheck=')) {
      fail(`${route.path} must pass answerCheck to Task2OfficialReviewBlock.`);
    }
  }
}

function validateIeltsTask2IntroductionPilot() {
  const base = path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/introduccion');
  const pageText = fs.readFileSync(path.join(base, 'page.tsx'), 'utf8');
  const componentText = fs.readFileSync(path.join(base, 'IntroduccionTask2Client.tsx'), 'utf8');
  const engineText = fs.readFileSync(path.join(base, 'IntroductionPracticeEngine.tsx'), 'utf8');
  const dataText = fs.readFileSync(path.join(base, 'introduction-data.ts'), 'utf8');

  for (const requiredText of [
    'IELTS Writing Task 2 Introduction',
    'robots: { index: true, follow: true }',
    "locale: 'en_US'",
    "alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/introduccion' }",
  ]) {
    if (!pageText.includes(requiredText)) fail(`IELTS Task 2 introduction metadata must include "${requiredText}".`);
  }

  for (const requiredText of [
    'lang="en"',
    'ESSAY_TYPES',
    'INTRO_SENTENCE_TYPES',
    'IntroductionPracticeEngine',
    'Official format and WeLearn strategy',
    'Sentence types as Lego blocks',
    'Five guided examples per question family',
    'Frequently asked questions',
    'Is this page a separate official IELTS task?',
    '/practica/ielts/academic/writing/task2/analisis-pregunta',
  ]) {
    if (!componentText.includes(requiredText)) fail(`IELTS Task 2 introduction pilot must include "${requiredText}".`);
  }

  for (const essayType of ['opinion', 'discussion', 'problem-solution', 'advantages-disadvantages', 'direct-questions']) {
    if (!dataText.includes(`id: '${essayType}'`)) fail(`IELTS Task 2 introduction data must include ${essayType}.`);
  }
  if ((dataText.match(/title: '/g) ?? []).length < 25) {
    fail('IELTS Task 2 introduction must retain at least 25 original guided examples across the five question families.');
  }
  for (const requiredText of ['bodyOne:', 'bodyTwo:', 'bodyThree:', 'conclusion:', 'whyItWorks:', 'INTRO_SENTENCE_TYPES']) {
    if (!dataText.includes(requiredText)) fail(`IELTS Task 2 introduction data must include "${requiredText}".`);
  }

  for (const levelTitle of [
    'Identify the function',
    'Choose an aligned thesis',
    'Repair the mismatch',
    'Assemble the blocks',
    'Complete the introduction',
    'Write one block',
    'Build an introduction',
    'Transfer to a timed essay',
  ]) {
    if (!engineText.includes(levelTitle)) fail(`IELTS Task 2 introduction engine must include level "${levelTitle}".`);
  }
  for (const requiredText of ['rotateOptions', '40 * 60', '250 minimum words', 'not automated band scoring']) {
    if (!engineText.includes(requiredText)) fail(`IELTS Task 2 introduction engine must include "${requiredText}".`);
  }
}

function validateIeltsTask2PromptAnalysisPilot() {
  const base = path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta');
  const pageText = fs.readFileSync(path.join(base, 'page.tsx'), 'utf8');
  const componentText = fs.readFileSync(path.join(base, 'PromptAnalysisClient.tsx'), 'utf8');
  const engineText = fs.readFileSync(path.join(base, 'PromptAnalysisPracticeEngine.tsx'), 'utf8');
  const dataText = fs.readFileSync(path.join(base, 'prompt-analysis-data.ts'), 'utf8');
  for (const requiredText of ['IELTS Task 2 Prompt Analysis', 'robots: { index: true, follow: true }', "locale: 'en_US'", 'analisis-pregunta']) {
    if (!pageText.includes(requiredText)) fail(`IELTS Task 2 prompt analysis metadata must include "${requiredText}".`);
  }
  for (const requiredText of ['lang="en"', 'Five question families', 'Watch one · then do four', 'Worked example', 'Now you try', 'PromptAnalysisPracticeEngine', 'Frequently asked questions', '/practica/ielts/academic/writing/task2/introduccion']) {
    if (!componentText.includes(requiredText)) fail(`IELTS Task 2 prompt analysis lesson must include "${requiredText}".`);
  }
  for (const requiredText of ['topic:', 'instruction:', 'scope:', 'position:', 'bodyRoute:', 'checklist:']) {
    if (!dataText.includes(requiredText)) fail(`IELTS Task 2 prompt analysis data must include "${requiredText}".`);
  }
  for (const title of ['Identify the instruction', 'Select the complete checklist', 'Detect the missing part', 'Assemble the prompt map', 'Choose the body route', 'Write a one-sentence plan', 'Build the complete plan', 'Transfer to a timed essay']) {
    if (!engineText.includes(title)) fail(`IELTS Task 2 prompt analysis engine must include "${title}".`);
  }
}

function validateIeltsTask2BodyOnePilot() {
  const base = path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/body-1');
  const pageText = fs.readFileSync(path.join(base, 'page.tsx'), 'utf8');
  const componentText = fs.readFileSync(path.join(base, 'BodyOneClient.tsx'), 'utf8');
  const workshopText = fs.readFileSync(path.join(base, 'BodyOneWorkshop.tsx'), 'utf8');
  const engineText = fs.readFileSync(path.join(base, 'BodyOnePracticeEngine.tsx'), 'utf8');
  const dataText = fs.readFileSync(path.join(base, 'body-one-data.ts'), 'utf8');

  for (const requiredText of ['IELTS Task 2 Body Paragraph 1', 'robots: { index: true, follow: true }', "locale: 'en_US'", 'task2/body-1']) {
    if (!pageText.includes(requiredText)) fail(`IELTS Task 2 Body 1 metadata must include "${requiredText}".`);
  }
  for (const requiredText of ['lang="en"', 'Official format and WeLearn strategy', 'Watch one · then do four', 'Worked example', 'Now you try', 'BodyOnePracticeEngine', 'Frequently asked questions', '/practica/ielts/academic/writing/task2/introduccion']) {
    if (!componentText.includes(requiredText)) fail(`IELTS Task 2 Body 1 lesson must include "${requiredText}".`);
  }
  for (const essayType of ['opinion', 'discussion', 'problem-solution', 'advantages-disadvantages', 'direct-questions']) {
    if (!dataText.includes(`id: '${essayType}'`)) fail(`IELTS Task 2 Body 1 data must include ${essayType}.`);
  }
  if ((dataText.match(/title: '/g) ?? []).length < 25) fail('IELTS Task 2 Body 1 must retain at least 25 original guided cases.');
  for (const requiredText of ['Position claim', 'First-view sentence', 'Problem or cause', 'First-side claim', 'Answer to Question 1', 'commonMistake:']) {
    if (!dataText.includes(requiredText)) fail(`IELTS Task 2 Body 1 data must include "${requiredText}".`);
  }
  for (const requiredText of ['Compare with the expert model', 'not automated band scoring']) {
    if (!workshopText.includes(requiredText)) fail(`IELTS Task 2 Body 1 workshop must include "${requiredText}".`);
  }
  for (const title of ['Identify the function', 'Choose an aligned topic sentence', 'Detect the logic error', 'Assemble the blocks', 'Complete the missing block', 'Write one original sentence', 'Build the complete Body 1 paragraph', 'Transfer to complete essay practice']) {
    if (!engineText.includes(title)) fail(`IELTS Task 2 Body 1 engine must include "${title}".`);
  }
  for (const requiredText of ['rotateOptions', 'Complete Essay Practice', '/practica/ielts/academic/writing/task2/tarea-completa', 'localStorage']) {
    if (!engineText.includes(requiredText)) fail(`IELTS Task 2 Body 1 engine must include "${requiredText}".`);
  }
}

function validateIeltsTask2BodyTwoPilot() {
  const base = path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/body-2');
  const pageText = fs.readFileSync(path.join(base, 'page.tsx'), 'utf8');
  const componentText = fs.readFileSync(path.join(base, 'BodyTwoClient.tsx'), 'utf8');
  const workshopText = fs.readFileSync(path.join(base, 'BodyTwoWorkshop.tsx'), 'utf8');
  const engineText = fs.readFileSync(path.join(base, 'BodyTwoPracticeEngine.tsx'), 'utf8');
  const dataText = fs.readFileSync(path.join(base, 'body-two-data.ts'), 'utf8');

  for (const requiredText of ['IELTS Task 2 Body Paragraph 2', 'robots: { index: true, follow: true }', "locale: 'en_US'", 'task2/body-2']) {
    if (!pageText.includes(requiredText)) fail(`IELTS Task 2 Body 2 metadata must include "${requiredText}".`);
  }
  for (const requiredText of ['lang="en"', 'Official format and WeLearn strategy', 'Watch one · then do four', 'Worked example', 'Now you try', 'BodyTwoPracticeEngine', 'Frequently asked questions', '/practica/ielts/academic/writing/task2/body-1', '/practica/ielts/academic/writing/task2/conclusion']) {
    if (!componentText.includes(requiredText)) fail(`IELTS Task 2 Body 2 lesson must include "${requiredText}".`);
  }
  for (const essayType of ['Opinion:', 'Discussion:', 'Problem and solution:', 'Advantages and disadvantages:', 'Direct questions:']) {
    if (!dataText.includes(essayType)) fail(`IELTS Task 2 Body 2 data must include ${essayType}.`);
  }
  if ((dataText.match(/paragraphJob:/g) ?? []).length < 25) fail('IELTS Task 2 Body 2 must retain at least 25 original guided cases.');
  for (const requiredText of ['Second claim or concession', 'Second-view sentence', 'Concession or contrast', 'Rebuttal or evaluation', 'Solution claim', 'Answer to Question 2', 'commonMistake:']) {
    if (!dataText.includes(requiredText)) fail(`IELTS Task 2 Body 2 data must include "${requiredText}".`);
  }
  for (const requiredText of ['Compare with the expert model', 'ColoredBodyParagraph', 'not automated band scoring']) {
    if (!workshopText.includes(requiredText)) fail(`IELTS Task 2 Body 2 workshop must include "${requiredText}".`);
  }
  for (const title of ['Identify the second function', 'Choose a distinct controlling idea', 'Detect repetition or misalignment', 'Assemble the Body 2 blocks', 'Complete the relationship block', 'Write one connecting sentence', 'Build the complete Body 2 paragraph', 'Transfer to complete essay practice']) {
    if (!engineText.includes(title)) fail(`IELTS Task 2 Body 2 engine must include "${title}".`);
  }
  for (const requiredText of ['rotateOptions', 'Complete Essay Practice', '/practica/ielts/academic/writing/task2/tarea-completa', 'localStorage']) {
    if (!engineText.includes(requiredText)) fail(`IELTS Task 2 Body 2 engine must include "${requiredText}".`);
  }
}

function validateIeltsTask2ConclusionLesson() {
  const base = path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/conclusion');
  const pageText = fs.readFileSync(path.join(base, 'page.tsx'), 'utf8');
  const componentText = fs.readFileSync(path.join(base, 'ConclusionTask2Client.tsx'), 'utf8');
  const workshopText = fs.readFileSync(path.join(base, 'ConclusionWorkshop.tsx'), 'utf8');
  const engineText = fs.readFileSync(path.join(base, 'ConclusionPracticeEngine.tsx'), 'utf8');
  const dataText = fs.readFileSync(path.join(base, 'conclusion-data.ts'), 'utf8');
  for (const requiredText of ['IELTS Task 2 Conclusion', 'robots: { index: true, follow: true }', "locale: 'en_US'", 'task2/conclusion']) if (!pageText.includes(requiredText)) fail(`IELTS Task 2 Conclusion metadata must include "${requiredText}".`);
  for (const requiredText of ['lang="en"', 'Official format and WeLearn strategy', 'Watch one · then do four', 'Worked example', 'Now you try', 'ConclusionPracticeEngine', 'Frequently asked questions', '/practica/ielts/academic/writing/task2/revision-final']) if (!componentText.includes(requiredText)) fail(`IELTS Task 2 Conclusion lesson must include "${requiredText}".`);
  for (const requiredText of ["opinion:", "discussion:", "'problem-solution':", "'advantages-disadvantages':", "'direct-questions':", 'BODY_ONE_LESSONS.map']) if (!dataText.includes(requiredText)) fail(`IELTS Task 2 Conclusion data must include "${requiredText}".`);
  for (const requiredText of ['Compare with the expert model', 'ColoredBodyParagraph', 'automated band score']) if (!workshopText.includes(requiredText)) fail(`IELTS Task 2 Conclusion workshop must include "${requiredText}".`);
  for (const title of ['Identify the job', 'Choose the aligned restatement', 'Detect conclusion drift', 'Assemble the blocks', 'Complete the synthesis', 'Write one closing block', 'Build the conclusion', 'Transfer to the full essay']) if (!engineText.includes(title)) fail(`IELTS Task 2 Conclusion engine must include "${title}".`);
  for (const requiredText of ['localStorage', 'Complete Essay Practice', '/practica/ielts/academic/writing/task2/tarea-completa']) if (!engineText.includes(requiredText)) fail(`IELTS Task 2 Conclusion engine must include "${requiredText}".`);
}

function validateIeltsTask2FinalReviewLesson() {
  const base = path.join(root, 'src/app/(site)/practica/ielts/academic/writing/task2/revision-final');
  const pageText = fs.readFileSync(path.join(base, 'page.tsx'), 'utf8');
  const componentText = fs.readFileSync(path.join(base, 'FinalReviewClient.tsx'), 'utf8');
  const engineText = fs.readFileSync(path.join(base, 'FinalReviewPracticeEngine.tsx'), 'utf8');
  const dataText = fs.readFileSync(path.join(base, 'review-data.ts'), 'utf8');
  for (const requiredText of ['IELTS Task 2 Final Review', 'robots: { index: true, follow: true }', "locale: 'en_US'", 'task2/revision-final']) if (!pageText.includes(requiredText)) fail(`IELTS Task 2 Final Review metadata must include "${requiredText}".`);
  for (const requiredText of ['lang="en"', 'Official criteria and WeLearn strategy', 'Watch one · then do four', 'Worked example', 'Now you try', 'FinalReviewPracticeEngine', 'Frequently asked questions', '/practica/ielts/academic/writing/task2/tarea-completa']) if (!componentText.includes(requiredText)) fail(`IELTS Task 2 Final Review lesson must include "${requiredText}".`);
  for (const requiredText of ['Task Response', 'Essay logic', 'Position control', 'Cohesion', 'Language control', 'BODY_ONE_LESSONS.map']) if (!dataText.includes(requiredText)) fail(`IELTS Task 2 Final Review data must include "${requiredText}".`);
  for (const title of ['Identify the layer', 'Find the missing instruction', 'Diagnose logic drift', 'Order the review', 'Choose the revision', 'Rewrite one sentence', 'Run a full checklist', 'Transfer to timed practice']) if (!engineText.includes(title)) fail(`IELTS Task 2 Final Review engine must include "${title}".`);
  for (const requiredText of ['localStorage', 'automated band', '/practica/ielts/academic/writing/task2/tarea-completa']) if (!engineText.includes(requiredText)) fail(`IELTS Task 2 Final Review engine must include "${requiredText}".`);
}

function hasDuplicateText(items) {
  const normalized = items.map((item) => String(item).trim().toLowerCase());
  return new Set(normalized).size !== normalized.length;
}

function validateRoute(route, index, routeMapText) {
  const label = `route[${index}] ${route?.path ?? '(missing path)'}`;
  assertText(route.title, `${label}.title`);
  assertText(route.description, `${label}.description`);
  assertText(route.path, `${label}.path`);
  assertText(route.searchIntent, `${label}.searchIntent`);
  assertArray(route.teaches, `${label}.teaches`);
  assertArray(route.keywords, `${label}.keywords`);
  assertArray(route.faqs, `${label}.faqs`, 2);

  if (route.path && route.path !== route.path.toLowerCase()) fail(`${label} must use a lowercase path.`);
  if (route.path && !route.path.startsWith('/practica/')) fail(`${label} must live under /practica/.`);
  if (route.parentPath && !route.path.startsWith(route.parentPath)) fail(`${label} must be nested under parentPath ${route.parentPath}.`);
  if (route.status === 'published' && !fs.existsSync(routeToPagePath(route.path))) fail(`${label} is published but has no page.tsx.`);
  if (route.path && !routeMapText.includes(route.path)) fail(`${label} is missing from docs/ielts-toefl-route-map.md.`);

  for (const [faqIndex, faq] of (route.faqs ?? []).entries()) {
    assertText(faq.question, `${label}.faqs[${faqIndex}].question`);
    assertText(faq.answer, `${label}.faqs[${faqIndex}].answer`);
  }

  const isIeltsReadingSkill = route.path?.startsWith('/practica/ielts/reading/habilidades/');
  if (isIeltsReadingSkill && !/not .*official|no .*tipo|not .*separate|habilidad/i.test(route.note ?? `${route.description} ${route.faqs?.map((faq) => faq.answer).join(' ')}`)) {
    fail(`${label} must clearly state that IELTS Reading skills are not official standalone question types.`);
  }
  if (isIeltsReadingSkill && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('SkillReviewSourceBlock')) fail(`${label} must render SkillReviewSourceBlock.`);
    if (!pageText.includes('IELTS_ACADEMIC_URL')) fail(`${label} must cite the IELTS Academic official source in its review block.`);
    if (!pageText.includes('reviewedFocus')) fail(`${label} must declare reviewedFocus for the skill review block.`);
    if (!pageText.includes('sources={[')) fail(`${label} must declare source notes for the skill review block.`);
  }

  const isIeltsReadingQuestionType = route.path?.startsWith('/practica/ielts/reading/tipos-de-preguntas/');
  if (isIeltsReadingQuestionType && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('QuestionTypeReviewSourceBlock')) fail(`${label} must render QuestionTypeReviewSourceBlock.`);
    if (!pageText.includes('IELTS_SAMPLE_URL')) fail(`${label} must cite the IELTS Academic sample questions source in its review block.`);
    if (!pageText.includes('reviewedFocus')) fail(`${label} must declare reviewedFocus for the question-type review block.`);
    if (!pageText.includes('sources={[')) fail(`${label} must declare source notes for the question-type review block.`);
    if (!pageText.includes('Formato oficial vs estrategia WeLearn') && !pageText.includes('OfficialStrategyCard')) {
      fail(`${label} must include a top official-format vs WeLearn-strategy card.`);
    }
  }

  if (route.path === '/practica/toefl/writing/integrated-writing') {
    const legacyText = `${route.note ?? ''} ${route.description ?? ''} ${route.faqs?.map((faq) => faq.answer).join(' ') ?? ''}`;
    if (!/formato anterior|legacy|síntesis|synthesis/i.test(legacyText)) {
      fail(`${label} must remain labeled as legacy/general synthesis, not a current primary TOEFL Writing task.`);
    }
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('ObjectivePracticeSetBank')) fail(`${label} must render ObjectivePracticeSetBank.`);
    if (!pageText.includes('IELTS_TFNG_PRACTICE_SETS')) fail(`${label} must use IELTS_TFNG_PRACTICE_SETS.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('ObjectivePracticeSetBank')) fail(`${label} must render ObjectivePracticeSetBank.`);
    if (!pageText.includes('IELTS_YNNG_PRACTICE_SETS')) fail(`${label} must use IELTS_YNNG_PRACTICE_SETS.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/multiple-choice' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('MultipleChoicePassageBank')) fail(`${label} must render MultipleChoicePassageBank.`);
    if (!pageText.includes('IELTS_MULTIPLE_CHOICE_PASSAGES')) fail(`${label} must use IELTS_MULTIPLE_CHOICE_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/sentence-completion' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('SummaryCompletionPassageBank')) fail(`${label} must render SummaryCompletionPassageBank.`);
    if (!pageText.includes('IELTS_SENTENCE_COMPLETION_PASSAGES')) fail(`${label} must use IELTS_SENTENCE_COMPLETION_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/summary-completion' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('SummaryCompletionPassageBank')) fail(`${label} must render SummaryCompletionPassageBank.`);
    if (!pageText.includes('IELTS_SUMMARY_COMPLETION_PASSAGES')) fail(`${label} must use IELTS_SUMMARY_COMPLETION_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/note-completion' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('NoteCompletionPassageBank')) fail(`${label} must render NoteCompletionPassageBank.`);
    if (!pageText.includes('IELTS_NOTE_COMPLETION_PASSAGES')) fail(`${label} must use IELTS_NOTE_COMPLETION_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/table-completion' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('TableCompletionPassageBank')) fail(`${label} must render TableCompletionPassageBank.`);
    if (!pageText.includes('IELTS_TABLE_COMPLETION_PASSAGES')) fail(`${label} must use IELTS_TABLE_COMPLETION_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('FlowChartCompletionPassageBank')) fail(`${label} must render FlowChartCompletionPassageBank.`);
    if (!pageText.includes('IELTS_FLOW_CHART_COMPLETION_PASSAGES')) fail(`${label} must use IELTS_FLOW_CHART_COMPLETION_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('DiagramLabelingPassageBank')) fail(`${label} must render DiagramLabelingPassageBank.`);
    if (!pageText.includes('IELTS_DIAGRAM_LABELING_PASSAGES')) fail(`${label} must use IELTS_DIAGRAM_LABELING_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/short-answer' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('ShortAnswerPassageBank')) fail(`${label} must render ShortAnswerPassageBank.`);
    if (!pageText.includes('IELTS_SHORT_ANSWER_PASSAGES')) fail(`${label} must use IELTS_SHORT_ANSWER_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/matching-headings' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('MatchingHeadingsPassageBank')) fail(`${label} must render MatchingHeadingsPassageBank.`);
    if (!pageText.includes('IELTS_MATCHING_HEADINGS_PASSAGES')) fail(`${label} must use IELTS_MATCHING_HEADINGS_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/matching-information' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('MatchingInformationPassageBank')) fail(`${label} must render MatchingInformationPassageBank.`);
    if (!pageText.includes('IELTS_MATCHING_INFORMATION_PASSAGES')) fail(`${label} must use IELTS_MATCHING_INFORMATION_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/matching-features' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('MatchingFeaturesPassageBank')) fail(`${label} must render MatchingFeaturesPassageBank.`);
    if (!pageText.includes('IELTS_MATCHING_FEATURES_PASSAGES')) fail(`${label} must use IELTS_MATCHING_FEATURES_PASSAGES.`);
  }

  if (route.path === '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings' && route.status === 'published') {
    const pagePath = routeToPagePath(route.path);
    const pageText = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
    if (!pageText.includes('MatchingSentenceEndingsPassageBank')) fail(`${label} must render MatchingSentenceEndingsPassageBank.`);
    if (!pageText.includes('IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES')) fail(`${label} must use IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES.`);
  }
}

function validateMultipleChoicePassage(name, passage) {
  assertText(passage?.id, `${name}.id`);
  assertText(passage?.title, `${name}.title`);
  assertText(passage?.passage, `${name}.passage`);
  assertArray(passage?.questions, `${name}.questions`, 1);

  for (const [index, question] of (passage?.questions ?? []).entries()) {
    const label = `${name}.questions[${index}] ${question?.id ?? '(missing id)'}`;
    assertText(question.id, `${label}.id`);
    assertText(question.question, `${label}.question`);
    assertArray(question.options, `${label}.options`, 3);
    if (hasDuplicateText(question.options ?? [])) fail(`${label}.options contains duplicate text.`);
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) fail(`${label}.answer is outside options range.`);
    assertText(question.explanation, `${label}.explanation`);
    assertText(question.trap, `${label}.trap`);
  }
}

function validateMultipleChoicePassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  const skillCounts = new Map();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.passage, `${label}.passage`);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);

    for (const [questionIndex, question] of (passage.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global id.`);
      questionIds.add(question.id);
      assertText(question.id, `${questionLabel}.id`);
      assertText(question.question, `${questionLabel}.question`);
      assertArray(question.options, `${questionLabel}.options`, 3);
      if (hasDuplicateText(question.options ?? [])) fail(`${questionLabel}.options contains duplicate text.`);
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) fail(`${questionLabel}.answer is outside options range.`);
      assertText(question.explanation, `${questionLabel}.explanation`);
      assertText(question.skill, `${questionLabel}.skill`);
      assertText(question.trap, `${questionLabel}.trap`);
      skillCounts.set(question.skill, (skillCounts.get(question.skill) ?? 0) + 1);
      totalQuestions += 1;
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
  for (const requiredSkill of options.requiredSkills ?? []) {
    if (!skillCounts.has(requiredSkill)) fail(`${name} must include at least one ${requiredSkill} question.`);
  }
}

function validateObjectiveQuestions(name, questions) {
  assertArray(questions, name, 1);
  const ids = new Set();
  for (const [index, question] of (questions ?? []).entries()) {
    const label = `${name}[${index}] ${question?.id ?? '(missing id)'}`;
    if (ids.has(question.id)) fail(`${label} has duplicate id.`);
    ids.add(question.id);
    assertText(question.id, `${label}.id`);
    assertText(question.statement, `${label}.statement`);
    if (!['TRUE', 'FALSE', 'YES', 'NO', 'NOT GIVEN'].includes(question.answer)) fail(`${label}.answer has invalid value.`);
    assertText(question.explanation, `${label}.explanation`);
    assertText(question.trap, `${label}.trap`);
  }
}

function validateObjectivePracticeSets(name, sets, options = {}) {
  assertArray(sets, name, options.minSets ?? 1);
  const setIds = new Set();
  const questionIds = new Set();
  const answerCounts = new Map();
  let totalQuestions = 0;

  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.id ?? '(missing id)'}`;
    if (setIds.has(set.id)) fail(`${label} has duplicate id.`);
    setIds.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    assertText(set.instructions, `${label}.instructions`);
    assertText(set.timeTarget, `${label}.timeTarget`);
    assertText(set.passageTitle, `${label}.passageTitle`);
    assertText(set.passage, `${label}.passage`);
    assertArray(set.questions, `${label}.questions`, options.minQuestionsPerSet ?? 1);

    for (const [questionIndex, question] of (set.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global question id.`);
      questionIds.add(question.id);
      assertText(question.id, `${questionLabel}.id`);
      assertText(question.statement, `${questionLabel}.statement`);
      if (!['TRUE', 'FALSE', 'YES', 'NO', 'NOT GIVEN'].includes(question.answer)) fail(`${questionLabel}.answer has invalid value.`);
      answerCounts.set(question.answer, (answerCounts.get(question.answer) ?? 0) + 1);
      assertText(question.explanation, `${questionLabel}.explanation`);
      assertText(question.skill, `${questionLabel}.skill`);
      assertText(question.trap, `${questionLabel}.trap`);
      totalQuestions += 1;
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
  for (const requiredAnswer of options.requiredAnswers ?? []) {
    if (!answerCounts.has(requiredAnswer)) fail(`${name} must include at least one ${requiredAnswer} answer.`);
  }
}

function validateMatchingHeadingsPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  let totalParagraphs = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.instructions, `${label}.instructions`);
    assertArray(passage.headingOptions, `${label}.headingOptions`, options.minHeadings ?? 1);
    assertArray(passage.paragraphs, `${label}.paragraphs`, options.minParagraphsPerPassage ?? 1);

    const headingIds = new Set();
    for (const [headingIndex, heading] of (passage.headingOptions ?? []).entries()) {
      const headingLabel = `${label}.headingOptions[${headingIndex}] ${heading?.id ?? '(missing id)'}`;
      if (headingIds.has(heading.id)) fail(`${headingLabel} has duplicate id.`);
      headingIds.add(heading.id);
      assertText(heading.id, `${headingLabel}.id`);
      assertText(heading.text, `${headingLabel}.text`);
    }

    const paragraphIds = new Set();
    for (const [paragraphIndex, paragraph] of (passage.paragraphs ?? []).entries()) {
      const paragraphLabel = `${label}.paragraphs[${paragraphIndex}] ${paragraph?.id ?? '(missing id)'}`;
      if (paragraphIds.has(paragraph.id)) fail(`${paragraphLabel} has duplicate id.`);
      paragraphIds.add(paragraph.id);
      assertText(paragraph.id, `${paragraphLabel}.id`);
      assertText(paragraph.label, `${paragraphLabel}.label`);
      assertText(paragraph.text, `${paragraphLabel}.text`);
      assertText(paragraph.answer, `${paragraphLabel}.answer`);
      if (!headingIds.has(paragraph.answer)) fail(`${paragraphLabel}.answer does not match a heading option.`);
      assertText(paragraph.explanation, `${paragraphLabel}.explanation`);
      assertText(paragraph.trap, `${paragraphLabel}.trap`);
      totalParagraphs += 1;
    }

    if ((passage.headingOptions ?? []).length <= (passage.paragraphs ?? []).length) {
      fail(`${label} must include unused heading distractors.`);
    }
  }

  if (options.minTotalParagraphs && totalParagraphs < options.minTotalParagraphs) {
    fail(`${name} must include at least ${options.minTotalParagraphs} paragraphs.`);
  }
}

function validateMatchingInformationPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.instructions, `${label}.instructions`);
    assertArray(passage.paragraphs, `${label}.paragraphs`, options.minParagraphsPerPassage ?? 1);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);

    const paragraphIds = new Set();
    for (const [paragraphIndex, paragraph] of (passage.paragraphs ?? []).entries()) {
      const paragraphLabel = `${label}.paragraphs[${paragraphIndex}] ${paragraph?.id ?? '(missing id)'}`;
      if (paragraphIds.has(paragraph.id)) fail(`${paragraphLabel} has duplicate id.`);
      paragraphIds.add(paragraph.id);
      assertText(paragraph.id, `${paragraphLabel}.id`);
      assertText(paragraph.label, `${paragraphLabel}.label`);
      assertText(paragraph.text, `${paragraphLabel}.text`);
    }

    const answerCounts = new Map();
    for (const [questionIndex, question] of (passage.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global id.`);
      questionIds.add(question.id);
      assertText(question.id, `${questionLabel}.id`);
      assertText(question.statement, `${questionLabel}.statement`);
      assertText(question.answer, `${questionLabel}.answer`);
      if (!paragraphIds.has(question.answer)) fail(`${questionLabel}.answer does not match a passage paragraph.`);
      answerCounts.set(question.answer, (answerCounts.get(question.answer) ?? 0) + 1);
      assertText(question.explanation, `${questionLabel}.explanation`);
      assertText(question.trap, `${questionLabel}.trap`);
      totalQuestions += 1;
    }

    if (![...answerCounts.values()].some((count) => count > 1)) {
      fail(`${label} must reuse at least one paragraph answer, as IELTS Matching Information may do.`);
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateMatchingFeaturesPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.instructions, `${label}.instructions`);
    assertText(passage.passageTitle, `${label}.passageTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertArray(passage.features, `${label}.features`, options.minFeaturesPerPassage ?? 1);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);

    const featureIds = new Set();
    for (const [featureIndex, feature] of (passage.features ?? []).entries()) {
      const featureLabel = `${label}.features[${featureIndex}] ${feature?.id ?? '(missing id)'}`;
      if (featureIds.has(feature.id)) fail(`${featureLabel} has duplicate id.`);
      featureIds.add(feature.id);
      assertText(feature.id, `${featureLabel}.id`);
      assertText(feature.label, `${featureLabel}.label`);
      assertText(feature.description, `${featureLabel}.description`);
    }

    const answerCounts = new Map();
    for (const [questionIndex, question] of (passage.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global id.`);
      questionIds.add(question.id);
      assertText(question.id, `${questionLabel}.id`);
      assertText(question.statement, `${questionLabel}.statement`);
      assertText(question.answer, `${questionLabel}.answer`);
      if (!featureIds.has(question.answer)) fail(`${questionLabel}.answer does not match a feature.`);
      answerCounts.set(question.answer, (answerCounts.get(question.answer) ?? 0) + 1);
      assertText(question.explanation, `${questionLabel}.explanation`);
      assertText(question.trap, `${questionLabel}.trap`);
      totalQuestions += 1;
    }

    if (![...answerCounts.values()].some((count) => count > 1)) {
      fail(`${label} must reuse at least one feature answer, as IELTS Matching Features may do.`);
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateMatchingSentenceEndingsPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.instructions, `${label}.instructions`);
    assertText(passage.passageTitle, `${label}.passageTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertArray(passage.endingOptions, `${label}.endingOptions`, options.minEndingsPerPassage ?? 1);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);

    const endingIds = new Set();
    for (const [endingIndex, ending] of (passage.endingOptions ?? []).entries()) {
      const endingLabel = `${label}.endingOptions[${endingIndex}] ${ending?.id ?? '(missing id)'}`;
      if (endingIds.has(ending.id)) fail(`${endingLabel} has duplicate id.`);
      endingIds.add(ending.id);
      assertText(ending.id, `${endingLabel}.id`);
      assertText(ending.text, `${endingLabel}.text`);
    }

    const answerCounts = new Map();
    for (const [questionIndex, question] of (passage.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global id.`);
      questionIds.add(question.id);
      assertText(question.id, `${questionLabel}.id`);
      assertText(question.sentenceStart, `${questionLabel}.sentenceStart`);
      assertText(question.answer, `${questionLabel}.answer`);
      if (!endingIds.has(question.answer)) fail(`${questionLabel}.answer does not match an ending option.`);
      answerCounts.set(question.answer, (answerCounts.get(question.answer) ?? 0) + 1);
      assertText(question.explanation, `${questionLabel}.explanation`);
      assertText(question.trap, `${questionLabel}.trap`);
      totalQuestions += 1;
    }

    if ((passage.endingOptions ?? []).length <= (passage.questions ?? []).length) {
      fail(`${label} must include more endings than sentence starts.`);
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateChoiceSet(name, items, getOptions, getAnswer, extraChecks = () => {}, config = {}) {
  assertArray(items, name, 1);
  const ids = new Set();
  for (const [index, item] of (items ?? []).entries()) {
    const label = `${name}[${index}] ${item?.id ?? '(missing id)'}`;
    if (config.requireId !== false) {
      if (ids.has(item.id)) fail(`${label} has duplicate id.`);
      ids.add(item.id);
      assertText(item.id, `${label}.id`);
    }
    const optionList = getOptions(item);
    assertArray(optionList, `${label}.options`, 2);
    if (hasDuplicateText(optionList ?? [])) fail(`${label}.options contains duplicate text.`);
    const answer = getAnswer(item);
    if (!Number.isInteger(answer) || answer < 0 || answer >= optionList.length) fail(`${label}.answer is outside options range.`);
    assertText(item.explanation, `${label}.explanation`);
    extraChecks(item, label);
  }
}

function validateCompletionQuestions(name, items, options = {}) {
  assertArray(items, name, 1);
  const ids = new Set();
  for (const [index, item] of (items ?? []).entries()) {
    const label = `${name}[${index}] ${item?.id ?? '(missing id)'}`;
    if (options.requireId !== false) {
      if (ids.has(item.id)) fail(`${label} has duplicate id.`);
      ids.add(item.id);
      assertText(item.id, `${label}.id`);
    }
    assertText(item.answer, `${label}.answer`);
    assertText(item.explanation, `${label}.explanation`);
    assertText(item.hint ?? item.trap, `${label}.hintOrTrap`);
  }
}

function validateSummaryCompletionPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.wordLimit, `${label}.wordLimit`);
    assertText(passage.passage, `${label}.passage`);
    assertText(passage.summaryIntro, `${label}.summaryIntro`);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);
    validateCompletionQuestions(`${label}.questions`, passage.questions);

    for (const question of passage.questions ?? []) {
      if (questionIds.has(question.id)) fail(`${label}.questions has duplicate global question id ${question.id}.`);
      questionIds.add(question.id);
      assertText(question.before, `${label}.questions.${question.id}.before`);
      assertText(question.after, `${label}.questions.${question.id}.after`);
      if ((question.answer ?? '').trim().split(/\s+/).filter(Boolean).length > 2) {
        fail(`${label}.questions.${question.id}.answer exceeds two words.`);
      }
      for (const [alternativeIndex, alternative] of (question.alternatives ?? []).entries()) {
        assertText(alternative, `${label}.questions.${question.id}.alternatives[${alternativeIndex}]`);
      }
      totalQuestions += 1;
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateNoteCompletionPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.wordLimit, `${label}.wordLimit`);
    assertText(passage.passageTitle, `${label}.passageTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertText(passage.notesTitle, `${label}.notesTitle`);
    assertText(passage.instructions, `${label}.instructions`);
    if (!Number.isInteger(passage.maxWords) || passage.maxWords < 1) fail(`${label}.maxWords must be a positive integer.`);
    assertArray(passage.noteGroups, `${label}.noteGroups`, options.minGroupsPerPassage ?? 1);

    for (const [groupIndex, group] of (passage.noteGroups ?? []).entries()) {
      const groupLabel = `${label}.noteGroups[${groupIndex}] ${group?.heading ?? '(missing heading)'}`;
      assertText(group.heading, `${groupLabel}.heading`);
      assertArray(group.items, `${groupLabel}.items`, options.minItemsPerGroup ?? 1);
      validateCompletionQuestions(`${groupLabel}.items`, group.items);

      for (const item of group.items ?? []) {
        if (questionIds.has(item.id)) fail(`${groupLabel}.items has duplicate global question id ${item.id}.`);
        questionIds.add(item.id);
        assertText(item.before, `${groupLabel}.items.${item.id}.before`);
        assertText(item.after, `${groupLabel}.items.${item.id}.after`);
        if ((item.answer ?? '').trim().split(/\s+/).filter(Boolean).length > passage.maxWords) {
          fail(`${groupLabel}.items.${item.id}.answer exceeds ${passage.maxWords} words.`);
        }
        for (const [alternativeIndex, alternative] of (item.alternatives ?? []).entries()) {
          assertText(alternative, `${groupLabel}.items.${item.id}.alternatives[${alternativeIndex}]`);
        }
        totalQuestions += 1;
      }
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateTableCompletionPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const rowIds = new Set();
  let totalBlanks = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.wordLimit, `${label}.wordLimit`);
    assertText(passage.passageTitle, `${label}.passageTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertText(passage.instructions, `${label}.instructions`);
    assertText(passage.tableTitle, `${label}.tableTitle`);
    if (!Number.isInteger(passage.maxWords) || passage.maxWords < 1) fail(`${label}.maxWords must be a positive integer.`);
    assertArray(passage.columns, `${label}.columns`, options.minColumns ?? 2);
    assertArray(passage.rows, `${label}.rows`, options.minRowsPerPassage ?? 1);

    for (const [rowIndex, row] of (passage.rows ?? []).entries()) {
      const rowLabel = `${label}.rows[${rowIndex}] ${row?.id ?? '(missing id)'}`;
      if (rowIds.has(row.id)) fail(`${rowLabel} has duplicate global row id.`);
      rowIds.add(row.id);
      assertText(row.id, `${rowLabel}.id`);
      assertArray(row.cells, `${rowLabel}.cells`, passage.columns.length);
      if ((row.cells ?? []).length !== passage.columns.length) {
        fail(`${rowLabel}.cells must match column count ${passage.columns.length}.`);
      }

      for (const [cellIndex, cell] of (row.cells ?? []).entries()) {
        const cellLabel = `${rowLabel}.cells[${cellIndex}]`;
        if (cell.type === 'text') {
          assertText(cell.text, `${cellLabel}.text`);
          continue;
        }
        if (cell.type !== 'blank') fail(`${cellLabel}.type must be text or blank.`);
        assertText(cell.before, `${cellLabel}.before`);
        assertText(cell.after, `${cellLabel}.after`);
        assertText(cell.answer, `${cellLabel}.answer`);
        assertText(cell.explanation, `${cellLabel}.explanation`);
        assertText(cell.hint, `${cellLabel}.hint`);
        if ((cell.answer ?? '').trim().split(/\s+/).filter(Boolean).length > passage.maxWords) {
          fail(`${cellLabel}.answer exceeds ${passage.maxWords} words.`);
        }
        for (const [alternativeIndex, alternative] of (cell.alternatives ?? []).entries()) {
          assertText(alternative, `${cellLabel}.alternatives[${alternativeIndex}]`);
        }
        totalBlanks += 1;
      }
    }
  }

  if (options.minTotalBlanks && totalBlanks < options.minTotalBlanks) {
    fail(`${name} must include at least ${options.minTotalBlanks} blanks.`);
  }
}

function validateFlowChartCompletionPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const stepIds = new Set();
  let totalSteps = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.wordLimit, `${label}.wordLimit`);
    assertText(passage.passageTitle, `${label}.passageTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertText(passage.instructions, `${label}.instructions`);
    assertText(passage.flowTitle, `${label}.flowTitle`);
    if (!Number.isInteger(passage.maxWords) || passage.maxWords < 1) fail(`${label}.maxWords must be a positive integer.`);
    assertArray(passage.steps, `${label}.steps`, options.minStepsPerPassage ?? 1);
    validateCompletionQuestions(`${label}.steps`, passage.steps);

    for (const [stepIndex, step] of (passage.steps ?? []).entries()) {
      const stepLabel = `${label}.steps[${stepIndex}] ${step?.id ?? '(missing id)'}`;
      if (stepIds.has(step.id)) fail(`${stepLabel} has duplicate global step id.`);
      stepIds.add(step.id);
      assertText(step.id, `${stepLabel}.id`);
      assertText(step.label, `${stepLabel}.label`);
      assertText(step.before, `${stepLabel}.before`);
      assertText(step.after, `${stepLabel}.after`);
      if ((step.answer ?? '').trim().split(/\s+/).filter(Boolean).length > passage.maxWords) {
        fail(`${stepLabel}.answer exceeds ${passage.maxWords} words.`);
      }
      for (const [alternativeIndex, alternative] of (step.alternatives ?? []).entries()) {
        assertText(alternative, `${stepLabel}.alternatives[${alternativeIndex}]`);
      }
      totalSteps += 1;
    }
  }

  if (options.minTotalSteps && totalSteps < options.minTotalSteps) {
    fail(`${name} must include at least ${options.minTotalSteps} steps.`);
  }
}

function validateDiagramLabelingPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.wordLimit, `${label}.wordLimit`);
    assertText(passage.diagramTitle, `${label}.diagramTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertArray(passage.stages, `${label}.stages`, options.minStagesPerPassage ?? 1);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);
    validateCompletionQuestions(`${label}.questions`, passage.questions);

    const stageIds = new Set();
    for (const [stageIndex, stage] of (passage.stages ?? []).entries()) {
      const stageLabel = `${label}.stages[${stageIndex}] ${stage?.id ?? '(missing id)'}`;
      if (stageIds.has(stage.id)) fail(`${stageLabel} has duplicate stage id.`);
      stageIds.add(stage.id);
      assertText(stage.id, `${stageLabel}.id`);
      assertText(stage.label, `${stageLabel}.label`);
      assertText(stage.description, `${stageLabel}.description`);
    }

    for (const [questionIndex, question] of (passage.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global question id.`);
      questionIds.add(question.id);
      assertText(question.stageId, `${questionLabel}.stageId`);
      if (!stageIds.has(question.stageId)) fail(`${questionLabel}.stageId does not match a stage.`);
      assertText(question.before, `${questionLabel}.before`);
      assertText(question.after, `${questionLabel}.after`);
      if ((question.answer ?? '').trim().split(/\s+/).filter(Boolean).length > 2) {
        fail(`${questionLabel}.answer exceeds two words.`);
      }
      for (const [alternativeIndex, alternative] of (question.alternatives ?? []).entries()) {
        assertText(alternative, `${questionLabel}.alternatives[${alternativeIndex}]`);
      }
      totalQuestions += 1;
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateShortAnswerPassages(name, passages, options = {}) {
  assertArray(passages, name, options.minPassages ?? 1);
  const passageIds = new Set();
  const questionIds = new Set();
  let totalQuestions = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertText(passage.wordLimit, `${label}.wordLimit`);
    assertText(passage.passageTitle, `${label}.passageTitle`);
    assertText(passage.passage, `${label}.passage`);
    assertText(passage.instructions, `${label}.instructions`);
    if (!Number.isInteger(passage.maxWords) || passage.maxWords < 1) fail(`${label}.maxWords must be a positive integer.`);
    assertArray(passage.questions, `${label}.questions`, options.minQuestionsPerPassage ?? 1);

    for (const [questionIndex, question] of (passage.questions ?? []).entries()) {
      const questionLabel = `${label}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global question id.`);
      questionIds.add(question.id);
      assertText(question.id, `${questionLabel}.id`);
      assertText(question.question, `${questionLabel}.question`);
      assertText(question.answer, `${questionLabel}.answer`);
      assertText(question.explanation, `${questionLabel}.explanation`);
      assertText(question.hint, `${questionLabel}.hint`);
      assertText(question.trap, `${questionLabel}.trap`);
      if ((question.answer ?? '').trim().split(/\s+/).filter(Boolean).length > passage.maxWords) {
        fail(`${questionLabel}.answer exceeds ${passage.maxWords} words.`);
      }
      for (const [alternativeIndex, alternative] of (question.alternatives ?? []).entries()) {
        assertText(alternative, `${questionLabel}.alternatives[${alternativeIndex}]`);
      }
      totalQuestions += 1;
    }
  }

  if (options.minTotalQuestions && totalQuestions < options.minTotalQuestions) {
    fail(`${name} must include at least ${options.minTotalQuestions} questions.`);
  }
}

function validateDailyLifeTexts(name, texts) {
  assertArray(texts, name, 4);
  const textIds = new Set();
  const questionIds = new Set();
  let questionCount = 0;

  for (const [textIndex, text] of (texts ?? []).entries()) {
    const textLabel = `${name}[${textIndex}] ${text?.id ?? '(missing id)'}`;
    if (textIds.has(text.id)) fail(`${textLabel} has duplicate id.`);
    textIds.add(text.id);
    assertText(text.id, `${textLabel}.id`);
    assertText(text.title, `${textLabel}.title`);
    assertText(text.text, `${textLabel}.text`);
    assertArray(text.questions, `${textLabel}.questions`, 3);

    for (const [questionIndex, question] of (text.questions ?? []).entries()) {
      const label = `${textLabel}.questions[${questionIndex}] ${question?.id ?? '(missing id)'}`;
      if (questionIds.has(question.id)) fail(`${label} has duplicate id.`);
      questionIds.add(question.id);
      questionCount += 1;
      assertText(question.id, `${label}.id`);
      assertText(question.question, `${label}.question`);
      assertText(question.answer, `${label}.answer`);
      assertText(question.explanation, `${label}.explanation`);
      assertText(question.trap, `${label}.trap`);
    }
  }

  if (questionCount < 12) fail(`${name} must include at least 12 daily-life questions.`);
}

function validateAcademicPassages(name, passages) {
  assertArray(passages, name, 3);
  const passageIds = new Set();
  const questionIds = new Set();
  let questionCount = 0;

  for (const [passageIndex, passage] of (passages ?? []).entries()) {
    const label = `${name}[${passageIndex}] ${passage?.id ?? '(missing id)'}`;
    if (passageIds.has(passage.id)) fail(`${label} has duplicate id.`);
    passageIds.add(passage.id);
    assertText(passage.id, `${label}.id`);
    assertText(passage.title, `${label}.title`);
    assertArray(passage.paragraphs, `${label}.paragraphs`, 2);
    for (const [paragraphIndex, paragraph] of (passage.paragraphs ?? []).entries()) {
      assertText(paragraph, `${label}.paragraphs[${paragraphIndex}]`);
    }
    validateChoiceSet(
      `${label}.questions`,
      passage.questions,
      (item) => item.options,
      (item) => item.answer,
      (item, questionLabel) => {
        if (questionIds.has(item.id)) fail(`${questionLabel} has duplicate global question id.`);
        questionIds.add(item.id);
        questionCount += 1;
        assertText(item.id, `${questionLabel}.id`);
        assertText(item.type, `${questionLabel}.type`);
        assertText(item.prompt, `${questionLabel}.prompt`);
        assertText(item.trap, `${questionLabel}.trap`);
      }
    );
    assertArray(passage.questions, `${label}.questions`, 3);
  }

  if (questionCount < 9) fail(`${name} must include at least 9 academic passage questions.`);
}

function validateReadingSkillPractice(name, sets) {
  assertArray(sets, name, 1);
  const slugs = new Set();
  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.slug ?? '(missing slug)'}`;
    if (slugs.has(set.slug)) fail(`${label} has duplicate slug.`);
    slugs.add(set.slug);
    assertText(set.slug, `${label}.slug`);
    assertText(set.title, `${label}.title`);
    assertText(set.directAnswer, `${label}.directAnswer`);
    assertArray(set.whenToUse, `${label}.whenToUse`, 2);
    assertArray(set.method, `${label}.method`, 2);
    assertText(set.textTitle, `${label}.textTitle`);
    assertText(set.text, `${label}.text`);
    validateChoiceSet(
      `${label}.questions`,
      set.questions,
      (item) => item.options,
      (item) => item.answer,
      (item, questionLabel) => {
        assertText(item.prompt, `${questionLabel}.prompt`);
        assertText(item.evidence, `${questionLabel}.evidence`);
        assertText(item.trap, `${questionLabel}.trap`);
      }
    );
  }
}

function validateSkimScanTransfer(name, set) {
  assertText(set?.id, `${name}.id`);
  assertText(set?.title, `${name}.title`);
  assertText(set?.instructions, `${name}.instructions`);
  assertText(set?.timeTarget, `${name}.timeTarget`);
  assertText(set?.passageTitle, `${name}.passageTitle`);
  assertArray(set?.passage, `${name}.passage`, 2);
  assertArray(set?.tasks, `${name}.tasks`, 4);

  const paragraphIds = new Set();
  for (const [index, paragraph] of (set?.passage ?? []).entries()) {
    const label = `${name}.passage[${index}] ${paragraph?.id ?? '(missing id)'}`;
    if (paragraphIds.has(paragraph.id)) fail(`${label} has duplicate id.`);
    paragraphIds.add(paragraph.id);
    assertText(paragraph.id, `${label}.id`);
    assertText(paragraph.label, `${label}.label`);
    assertText(paragraph.text, `${label}.text`);
    assertText(paragraph.function, `${label}.function`);
  }

  const taskIds = new Set();
  const moveCounts = new Map([
    ['skim', 0],
    ['scan', 0],
  ]);
  for (const [index, task] of (set?.tasks ?? []).entries()) {
    const label = `${name}.tasks[${index}] ${task?.id ?? '(missing id)'}`;
    if (taskIds.has(task.id)) fail(`${label} has duplicate id.`);
    taskIds.add(task.id);
    assertText(task.id, `${label}.id`);
    assertText(task.question, `${label}.question`);
    if (!['skim', 'scan'].includes(task.firstMove)) fail(`${label}.firstMove must be skim or scan.`);
    else moveCounts.set(task.firstMove, (moveCounts.get(task.firstMove) ?? 0) + 1);
    assertText(task.paragraphAnswer, `${label}.paragraphAnswer`);
    if (!paragraphIds.has(task.paragraphAnswer)) fail(`${label}.paragraphAnswer does not match a passage paragraph id.`);
    assertText(task.signalAnswer, `${label}.signalAnswer`);
    assertText(task.explanation, `${label}.explanation`);
    assertText(task.evidence, `${label}.evidence`);
    assertText(task.trap, `${label}.trap`);
  }

  for (const [move, count] of moveCounts.entries()) {
    if (count < 2) fail(`${name}.tasks must include at least 2 ${move} first-move decisions.`);
  }
}

function validateSkimScanTransfers(name, sets) {
  assertArray(sets, name, 4);
  const ids = new Set();
  const taskIds = new Set();
  for (const [index, set] of (sets ?? []).entries()) {
    const label = `${name}[${index}] ${set?.id ?? '(missing id)'}`;
    if (ids.has(set.id)) fail(`${label} has duplicate id.`);
    ids.add(set.id);
    validateSkimScanTransfer(label, set);
    for (const task of set?.tasks ?? []) {
      if (taskIds.has(task.id)) fail(`${label}.tasks has duplicate global task id ${task.id}.`);
      taskIds.add(task.id);
    }
  }
}

function validateIeltsReadingMixedQuestionTypeSets(name, sets, validRoutes) {
  assertArray(sets, name, 3);
  const setIds = new Set();
  const taskIds = new Set();
  const routeCoverage = new Set();

  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.id ?? '(missing id)'}`;
    if (setIds.has(set.id)) fail(`${label} has duplicate id.`);
    setIds.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    assertText(set.instructions, `${label}.instructions`);
    assertText(set.timeTarget, `${label}.timeTarget`);
    assertText(set.passageTitle, `${label}.passageTitle`);
    assertArray(set.passage, `${label}.passage`, 3);
    assertArray(set.tasks, `${label}.tasks`, 4);

    const paragraphIds = new Set();
    for (const [paragraphIndex, paragraph] of (set.passage ?? []).entries()) {
      const paragraphLabel = `${label}.passage[${paragraphIndex}] ${paragraph?.id ?? '(missing id)'}`;
      if (paragraphIds.has(paragraph.id)) fail(`${paragraphLabel} has duplicate id.`);
      paragraphIds.add(paragraph.id);
      assertText(paragraph.id, `${paragraphLabel}.id`);
      assertText(paragraph.label, `${paragraphLabel}.label`);
      assertText(paragraph.function, `${paragraphLabel}.function`);
      assertText(paragraph.text, `${paragraphLabel}.text`);
    }

    for (const [taskIndex, task] of (set.tasks ?? []).entries()) {
      const taskLabel = `${label}.tasks[${taskIndex}] ${task?.id ?? '(missing id)'}`;
      if (taskIds.has(task.id)) fail(`${taskLabel} has duplicate global id.`);
      taskIds.add(task.id);
      assertText(task.id, `${taskLabel}.id`);
      assertText(task.questionType, `${taskLabel}.questionType`);
      assertText(task.route, `${taskLabel}.route`);
      if (!validRoutes.has(task.route)) fail(`${taskLabel}.route is not a published IELTS Reading question-type route.`);
      else routeCoverage.add(task.route);
      assertText(task.prompt, `${taskLabel}.prompt`);
      assertText(task.question, `${taskLabel}.question`);
      assertArray(task.options, `${taskLabel}.options`, 3);
      if (hasDuplicateText(task.options ?? [])) fail(`${taskLabel}.options contains duplicate text.`);
      if (!Number.isInteger(task.answer) || task.answer < 0 || task.answer >= task.options.length) fail(`${taskLabel}.answer is outside options range.`);
      assertText(task.evidence, `${taskLabel}.evidence`);
      assertText(task.explanation, `${taskLabel}.explanation`);
      assertText(task.trap, `${taskLabel}.trap`);
      assertText(task.linkedSkill, `${taskLabel}.linkedSkill`);
    }
  }

  if (taskIds.size < 12) fail(`${name} must include at least 12 mixed tasks.`);
  if (routeCoverage.size < 10) fail(`${name} must cover at least 10 IELTS Reading question-type routes.`);
}

function validateParaphraseSets(name, sets) {
  assertArray(sets, name, 1);
  const setIds = new Set();
  const itemIds = new Set();
  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.id ?? '(missing id)'}`;
    if (setIds.has(set.id)) fail(`${label} has duplicate id.`);
    setIds.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    assertText(set.instructions, `${label}.instructions`);
    assertText(set.timeTarget, `${label}.timeTarget`);
    validateChoiceSet(
      `${label}.items`,
      set.items,
      (item) => item.options,
      (item) => item.answer,
      (item, itemLabel) => {
        if (itemIds.has(item.id)) fail(`${itemLabel} has duplicate global item id.`);
        itemIds.add(item.id);
        assertText(item.source, `${itemLabel}.source`);
        assertText(item.focus, `${itemLabel}.focus`);
        assertArray(item.traps, `${itemLabel}.traps`, 1);
      }
    );
  }
}

function validateInferenceSets(name, sets) {
  assertArray(sets, name, 1);
  const setIds = new Set();
  const questionIds = new Set();
  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.id ?? '(missing id)'}`;
    if (setIds.has(set.id)) fail(`${label} has duplicate id.`);
    setIds.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    assertText(set.instructions, `${label}.instructions`);
    assertText(set.timeTarget, `${label}.timeTarget`);
    assertText(set.passageTitle, `${label}.passageTitle`);
    assertText(set.passage, `${label}.passage`);
    validateChoiceSet(
      `${label}.questions`,
      set.questions,
      (question) => question.options,
      (question) => question.answer,
      (question, questionLabel) => {
        if (questionIds.has(question.id)) fail(`${questionLabel} has duplicate global question id.`);
        questionIds.add(question.id);
        assertText(question.evidenceFocus, `${questionLabel}.evidenceFocus`);
        assertText(question.evidence, `${questionLabel}.evidence`);
        assertArray(question.traps, `${questionLabel}.traps`, 1);
      }
    );
  }
}

function validateWordLimitSets(name, sets) {
  assertArray(sets, name, 1);
  const setIds = new Set();
  const questionIds = new Set();
  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.id ?? '(missing id)'}`;
    if (setIds.has(set.id)) fail(`${label} has duplicate id.`);
    setIds.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    assertText(set.instructions, `${label}.instructions`);
    assertText(set.timeTarget, `${label}.timeTarget`);
    assertText(set.passageTitle, `${label}.passageTitle`);
    assertText(set.wordLimit, `${label}.wordLimit`);
    assertText(set.passage, `${label}.passage`);
    validateCompletionQuestions(`${label}.questions`, set.questions);
    for (const question of set?.questions ?? []) {
      if (questionIds.has(question.id)) fail(`${label}.questions has duplicate global question id ${question.id}.`);
      questionIds.add(question.id);
      assertText(question.before, `${label}.questions.${question.id}.before`);
      assertText(question.after, `${label}.questions.${question.id}.after`);
      if ((question.answer ?? '').trim().split(/\s+/).filter(Boolean).length > 2) {
        fail(`${label}.questions.${question.id}.answer exceeds two words.`);
      }
      for (const [alternativeIndex, alternative] of (question.alternatives ?? []).entries()) {
        assertText(alternative, `${label}.questions.${question.id}.alternatives[${alternativeIndex}]`);
      }
    }
  }
}

function validateTimeManagementSets(name, sets) {
  assertArray(sets, name, 1);
  const setIds = new Set();
  const decisionIds = new Set();
  for (const [setIndex, set] of (sets ?? []).entries()) {
    const label = `${name}[${setIndex}] ${set?.id ?? '(missing id)'}`;
    if (setIds.has(set.id)) fail(`${label} has duplicate id.`);
    setIds.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    assertText(set.instructions, `${label}.instructions`);
    assertText(set.timeTarget, `${label}.timeTarget`);
    assertText(set.passageTitle, `${label}.passageTitle`);
    assertArray(set.passageMap, `${label}.passageMap`, 2);
    for (const [mapIndex, item] of (set.passageMap ?? []).entries()) {
      assertText(item.label, `${label}.passageMap[${mapIndex}].label`);
      assertText(item.purpose, `${label}.passageMap[${mapIndex}].purpose`);
      assertText(item.timeBudget, `${label}.passageMap[${mapIndex}].timeBudget`);
    }
    validateChoiceSet(
      `${label}.decisions`,
      set.decisions,
      (decision) => decision.options,
      (decision) => decision.answer,
      (decision, decisionLabel) => {
        if (decisionIds.has(decision.id)) fail(`${decisionLabel} has duplicate global decision id.`);
        decisionIds.add(decision.id);
        assertText(decision.questionType, `${decisionLabel}.questionType`);
        assertText(decision.prompt, `${decisionLabel}.prompt`);
        assertText(decision.signal, `${decisionLabel}.signal`);
        assertText(decision.trap, `${decisionLabel}.trap`);
      }
    );
  }
}

function validateMixedDrills(name, drills) {
  assertArray(drills, name, 6);
  const ids = new Set();
  const validFamilies = new Set(['Complete the Words', 'Read in Daily Life', 'Read an Academic Passage']);
  const validSkills = new Set(['logical-relationships', 'text-organisation', 'time-management']);
  const familyCounts = new Map([...validFamilies].map((family) => [family, 0]));
  for (const [index, drill] of (drills ?? []).entries()) {
    const label = `${name}[${index}] ${drill?.id ?? '(missing id)'}`;
    if (ids.has(drill.id)) fail(`${label} has duplicate id.`);
    ids.add(drill.id);
    assertText(drill.id, `${label}.id`);
    if (!validFamilies.has(drill.taskFamily)) fail(`${label}.taskFamily is not a current TOEFL Reading family.`);
    else familyCounts.set(drill.taskFamily, (familyCounts.get(drill.taskFamily) ?? 0) + 1);
    if (!validSkills.has(drill.skill)) fail(`${label}.skill is not a TOEFL Reading skill route.`);
    assertText(drill.title, `${label}.title`);
    assertText(drill.text, `${label}.text`);
    assertText(drill.prompt, `${label}.prompt`);
    assertArray(drill.options, `${label}.options`, 3);
    if (hasDuplicateText(drill.options ?? [])) fail(`${label}.options contains duplicate text.`);
    if (!Number.isInteger(drill.answer) || drill.answer < 0 || drill.answer >= drill.options.length) fail(`${label}.answer is outside options range.`);
    assertText(drill.explanation, `${label}.explanation`);
    assertText(drill.evidence, `${label}.evidence`);
    assertText(drill.trap, `${label}.trap`);
  }

  for (const [family, count] of familyCounts.entries()) {
    if (count < 1) fail(`${name} must include at least 1 drill for ${family}.`);
  }
}

function validateWritingPrompts(name, prompts, integrated = false) {
  assertArray(prompts, name, 1);
  const ids = new Set();
  for (const [index, prompt] of prompts.entries()) {
    const label = `${name}[${index}] ${prompt?.id ?? '(missing id)'}`;
    if (ids.has(prompt.id)) fail(`${label} has duplicate id.`);
    ids.add(prompt.id);
    assertText(prompt.id, `${label}.id`);
    assertText(prompt.topic, `${label}.topic`);
    assertText(prompt.target, `${label}.target`);
    assertArray(prompt.checklist, `${label}.checklist`, 2);
    if (integrated) {
      assertText(prompt.reading, `${label}.reading`);
      assertText(prompt.lecture, `${label}.lecture`);
      assertArray(prompt.readingClaims, `${label}.readingClaims`, 2);
      assertArray(prompt.lectureResponses, `${label}.lectureResponses`, 2);
    } else {
      assertText(prompt.question ?? prompt.task, `${label}.questionOrTask`);
      assertArray(prompt.phrases, `${label}.phrases`, 1);
    }
  }
}

function validateIeltsTask2PromptBank(name, prompts, options = {}) {
  assertArray(prompts, name, options.minPrompts ?? 10);
  const ids = new Set();
  const validTypes = new Set(['Opinion', 'Discussion', 'Advantages and disadvantages', 'Problem-solution', 'Direct question']);
  const typeCounts = new Map([...validTypes].map((type) => [type, 0]));

  for (const [index, prompt] of (prompts ?? []).entries()) {
    const label = `${name}[${index}] ${prompt?.id ?? '(missing id)'}`;
    if (ids.has(prompt.id)) fail(`${label} has duplicate id.`);
    ids.add(prompt.id);
    assertText(prompt.id, `${label}.id`);
    if (!validTypes.has(prompt.essayType)) fail(`${label}.essayType is not an IELTS Task 2 practice type.`);
    else typeCounts.set(prompt.essayType, (typeCounts.get(prompt.essayType) ?? 0) + 1);
    if (options.requiredType && prompt.essayType !== options.requiredType) {
      fail(`${label}.essayType must be ${options.requiredType}.`);
    }
    assertText(prompt.route, `${label}.route`);
    if (!String(prompt.route).startsWith('/practica/ielts/academic/writing/task2/')) {
      fail(`${label}.route must point to an existing IELTS Task 2 route.`);
    }
    assertText(prompt.prompt, `${label}.prompt`);
    assertText(prompt.target, `${label}.target`);
    assertArray(prompt.plan, `${label}.plan`, 4);
    assertText(prompt.thesisMove, `${label}.thesisMove`);
    assertArray(prompt.usefulLanguage, `${label}.usefulLanguage`, 3);
    assertText(prompt.commonTrap, `${label}.commonTrap`);
    assertArray(prompt.selfCheck, `${label}.selfCheck`, 3);
  }

  if (options.requiredType) {
    if ((typeCounts.get(options.requiredType) ?? 0) < (options.minPrompts ?? 1)) {
      fail(`${name} must include at least ${options.minPrompts ?? 1} prompts for ${options.requiredType}.`);
    }
  } else {
    for (const [type, count] of typeCounts.entries()) {
      if (count < 2) fail(`${name} must include at least 2 prompts for ${type}.`);
    }
  }
}

function validateAcademicDiscussionPromptBank(name, prompts) {
  assertArray(prompts, name, 10);
  const ids = new Set();
  const validCategories = new Set(['Education', 'Campus life', 'Technology', 'Society', 'Work']);
  const validDifficulties = new Set(['B1+', 'B2', 'C1']);
  const categoryCounts = new Map([...validCategories].map((category) => [category, 0]));

  for (const [index, prompt] of (prompts ?? []).entries()) {
    const label = `${name}[${index}] ${prompt?.id ?? '(missing id)'}`;
    if (ids.has(prompt.id)) fail(`${label} has duplicate id.`);
    ids.add(prompt.id);
    assertText(prompt.id, `${label}.id`);
    if (!validCategories.has(prompt.category)) fail(`${label}.category is not an Academic Discussion category.`);
    else categoryCounts.set(prompt.category, (categoryCounts.get(prompt.category) ?? 0) + 1);
    if (!validDifficulties.has(prompt.difficulty)) fail(`${label}.difficulty is not supported.`);
    assertText(prompt.topic, `${label}.topic`);
    assertText(prompt.professor, `${label}.professor`);
    assertText(prompt.studentA, `${label}.studentA`);
    assertText(prompt.studentB, `${label}.studentB`);
    assertText(prompt.question, `${label}.question`);
    assertText(prompt.strategy, `${label}.strategy`);
    assertText(prompt.trap, `${label}.trap`);
    assertArray(prompt.checklist, `${label}.checklist`, 4);
    assertArray(prompt.usefulLanguage, `${label}.usefulLanguage`, 4);
    assertText(prompt.modelAnswer, `${label}.modelAnswer`);
    assertText(prompt.whyItWorks, `${label}.whyItWorks`);
  }

  for (const [category, count] of categoryCounts.entries()) {
    if (count < 1) fail(`${name} must include at least 1 prompt for ${category}.`);
  }
}

function validateEmailPromptBank(name, prompts) {
  assertArray(prompts, name, 10);
  const ids = new Set();
  const validCategories = new Set(['Academic', 'Campus', 'Work', 'Service', 'Peer']);
  const validTones = new Set(['formal', 'semi-formal', 'friendly']);
  const validDifficulties = new Set(['B1+', 'B2', 'C1']);
  const categoryCounts = new Map([...validCategories].map((category) => [category, 0]));
  const toneCounts = new Map([...validTones].map((tone) => [tone, 0]));

  for (const [index, prompt] of (prompts ?? []).entries()) {
    const label = `${name}[${index}] ${prompt?.id ?? '(missing id)'}`;
    if (ids.has(prompt.id)) fail(`${label} has duplicate id.`);
    ids.add(prompt.id);
    assertText(prompt.id, `${label}.id`);
    if (!validCategories.has(prompt.category)) fail(`${label}.category is not a Write an Email category.`);
    else categoryCounts.set(prompt.category, (categoryCounts.get(prompt.category) ?? 0) + 1);
    if (!validTones.has(prompt.tone)) fail(`${label}.tone is not supported.`);
    else toneCounts.set(prompt.tone, (toneCounts.get(prompt.tone) ?? 0) + 1);
    if (!validDifficulties.has(prompt.difficulty)) fail(`${label}.difficulty is not supported.`);
    assertText(prompt.topic, `${label}.topic`);
    assertText(prompt.situation, `${label}.situation`);
    assertText(prompt.task, `${label}.task`);
    assertText(prompt.audience, `${label}.audience`);
    assertText(prompt.purpose, `${label}.purpose`);
    assertText(prompt.strategy, `${label}.strategy`);
    assertText(prompt.trap, `${label}.trap`);
    assertArray(prompt.checklist, `${label}.checklist`, 4);
    assertArray(prompt.usefulLanguage, `${label}.usefulLanguage`, 4);
    assertText(prompt.modelEmail, `${label}.modelEmail`);
    assertText(prompt.whyItWorks, `${label}.whyItWorks`);
  }

  for (const [category, count] of categoryCounts.entries()) {
    if (count < 1) fail(`${name} must include at least 1 prompt for ${category}.`);
  }
  for (const [tone, count] of toneCounts.entries()) {
    if (count < 1) fail(`${name} must include at least 1 prompt for ${tone}.`);
  }
}

function validateSentenceBuildPromptBank(name, prompts) {
  assertArray(prompts, name, 5);
  const ids = new Set();
  const requiredTaskFocuses = new Set(['Cause and result', 'Contrast', 'Condition', 'Relative clause', 'Concession']);
  const taskFocusCounts = new Map([...requiredTaskFocuses].map((taskFocus) => [taskFocus, 0]));
  for (const [index, prompt] of (prompts ?? []).entries()) {
    const label = `${name}[${index}] ${prompt?.id ?? '(missing id)'}`;
    if (ids.has(prompt.id)) fail(`${label} has duplicate id.`);
    ids.add(prompt.id);
    assertText(prompt.id, `${label}.id`);
    assertText(prompt.taskFocus, `${label}.taskFocus`);
    if (requiredTaskFocuses.has(prompt.taskFocus)) {
      taskFocusCounts.set(prompt.taskFocus, (taskFocusCounts.get(prompt.taskFocus) ?? 0) + 1);
    }
    assertText(prompt.prompt, `${label}.prompt`);
    assertText(prompt.targetStructure, `${label}.targetStructure`);
    assertText(prompt.modelSentence, `${label}.modelSentence`);
    assertText(prompt.whyItWorks, `${label}.whyItWorks`);
    assertText(prompt.commonError, `${label}.commonError`);
    assertText(prompt.transferTo, `${label}.transferTo`);
  }

  for (const [taskFocus, count] of taskFocusCounts.entries()) {
    if (count < 1) fail(`${name} must include at least 1 prompt for ${taskFocus}.`);
  }
}

function validateToeflWritingMixedDrills(name, drills) {
  assertArray(drills, name, 12);
  const ids = new Set();
  const validTaskTypes = new Set(['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion']);
  const taskCounts = new Map([...validTaskTypes].map((taskType) => [taskType, 0]));
  for (const [index, drill] of (drills ?? []).entries()) {
    const label = `${name}[${index}] ${drill?.id ?? '(missing id)'}`;
    if (ids.has(drill.id)) fail(`${label} has duplicate id.`);
    ids.add(drill.id);
    assertText(drill.id, `${label}.id`);
    if (!validTaskTypes.has(drill.taskType)) fail(`${label}.taskType is not a current TOEFL Writing task.`);
    else taskCounts.set(drill.taskType, (taskCounts.get(drill.taskType) ?? 0) + 1);
    assertText(drill.title, `${label}.title`);
    assertText(drill.situation, `${label}.situation`);
    assertText(drill.prompt, `${label}.prompt`);
    assertArray(drill.options, `${label}.options`, 3);
    if (hasDuplicateText(drill.options ?? [])) fail(`${label}.options contains duplicate text.`);
    if (!Number.isInteger(drill.answer) || drill.answer < 0 || drill.answer >= drill.options.length) fail(`${label}.answer is outside options range.`);
    assertText(drill.explanation, `${label}.explanation`);
    assertText(drill.structureCue, `${label}.structureCue`);
    assertText(drill.trap, `${label}.trap`);
    assertText(drill.nextStep, `${label}.nextStep`);
  }

  for (const [taskType, count] of taskCounts.entries()) {
    if (count < 4) fail(`${name} must include at least 4 drills for ${taskType}.`);
  }
}

function validateToeflWritingScoredVariants(name, variants) {
  assertArray(variants, name, 1);
  const ids = new Set();
  const validTaskTypes = new Set(['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion']);
  const tasksSeen = new Set();
  for (const [index, variant] of (variants ?? []).entries()) {
    const label = `${name}[${index}] ${variant?.id ?? '(missing id)'}`;
    if (ids.has(variant.id)) fail(`${label} has duplicate id.`);
    ids.add(variant.id);
    assertText(variant.id, `${label}.id`);
    if (!validTaskTypes.has(variant.taskType)) fail(`${label}.taskType is not a current TOEFL Writing task.`);
    tasksSeen.add(variant.taskType);
    assertText(variant.label, `${label}.label`);
    assertText(variant.prompt, `${label}.prompt`);
    assertText(variant.response, `${label}.response`);
    if (!Number.isInteger(variant.welearnScoreEstimate) || variant.welearnScoreEstimate < 1 || variant.welearnScoreEstimate > 6) {
      fail(`${label}.welearnScoreEstimate must be an integer from 1 to 6.`);
    }
    assertText(variant.scoreLabel, `${label}.scoreLabel`);
    assertArray(variant.whyThisScore, `${label}.whyThisScore`, 2);
    assertText(variant.upgradeMove, `${label}.upgradeMove`);
    assertArray(variant.checklist, `${label}.checklist`, 3);
  }

  for (const taskType of validTaskTypes) {
    if (!tasksSeen.has(taskType)) fail(`${name} must include at least one variant for ${taskType}.`);
  }
}

function validateToeflWritingRevisionDrills(name, drills) {
  assertArray(drills, name, 6);
  const ids = new Set();
  const validTaskTypes = new Set(['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion']);
  const taskCounts = new Map([...validTaskTypes].map((taskType) => [taskType, 0]));

  for (const [index, drill] of (drills ?? []).entries()) {
    const label = `${name}[${index}] ${drill?.id ?? '(missing id)'}`;
    if (ids.has(drill.id)) fail(`${label} has duplicate id.`);
    ids.add(drill.id);
    assertText(drill.id, `${label}.id`);
    if (!validTaskTypes.has(drill.taskType)) fail(`${label}.taskType is not a current TOEFL Writing task.`);
    else taskCounts.set(drill.taskType, (taskCounts.get(drill.taskType) ?? 0) + 1);
    assertText(drill.title, `${label}.title`);
    assertText(drill.focus, `${label}.focus`);
    assertText(drill.prompt, `${label}.prompt`);
    assertText(drill.flawedResponse, `${label}.flawedResponse`);
    assertText(drill.question, `${label}.question`);
    assertArray(drill.options, `${label}.options`, 3);
    if (hasDuplicateText(drill.options ?? [])) fail(`${label}.options contains duplicate text.`);
    if (!Number.isInteger(drill.answer) || drill.answer < 0 || drill.answer >= drill.options.length) fail(`${label}.answer is outside options range.`);
    assertText(drill.explanation, `${label}.explanation`);
    assertText(drill.evidence, `${label}.evidence`);
    assertText(drill.trap, `${label}.trap`);
    assertText(drill.rewriteAction, `${label}.rewriteAction`);
  }

  for (const [taskType, count] of taskCounts.entries()) {
    if (count < 2) fail(`${name} must include at least 2 revision drills for ${taskType}.`);
  }
}

function validateToeflWritingTimedReviewSets(name, sets) {
  assertArray(sets, name, 3);
  const ids = new Set();
  const taskIds = new Set();
  const validTaskTypes = new Set(['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion']);

  for (const [index, set] of (sets ?? []).entries()) {
    const label = `${name}[${index}] ${set?.id ?? '(missing id)'}`;
    if (ids.has(set.id)) fail(`${label} has duplicate id.`);
    ids.add(set.id);
    assertText(set.id, `${label}.id`);
    assertText(set.title, `${label}.title`);
    if (!Number.isInteger(set.timeLimitMinutes) || set.timeLimitMinutes < 8 || set.timeLimitMinutes > 20) {
      fail(`${label}.timeLimitMinutes must be an integer between 8 and 20.`);
    }
    assertText(set.goal, `${label}.goal`);
    assertText(set.instructions, `${label}.instructions`);
    assertArray(set.officialTaskMix, `${label}.officialTaskMix`, 3);

    for (const taskType of validTaskTypes) {
      if (!(set.officialTaskMix ?? []).includes(taskType)) fail(`${label}.officialTaskMix must include ${taskType}.`);
    }
    for (const taskType of set.officialTaskMix ?? []) {
      if (!validTaskTypes.has(taskType)) fail(`${label}.officialTaskMix contains a non-current TOEFL Writing task.`);
    }

    assertArray(set.checkpoints, `${label}.checkpoints`, 3);
    for (const [checkpointIndex, checkpoint] of (set.checkpoints ?? []).entries()) {
      const checkpointLabel = `${label}.checkpoints[${checkpointIndex}]`;
      assertText(checkpoint.minute, `${checkpointLabel}.minute`);
      assertText(checkpoint.action, `${checkpointLabel}.action`);
      assertText(checkpoint.reason, `${checkpointLabel}.reason`);
    }

    assertArray(set.tasks, `${label}.tasks`, 3);
    const tasksSeen = new Set();
    for (const [taskIndex, task] of (set.tasks ?? []).entries()) {
      const taskLabel = `${label}.tasks[${taskIndex}] ${task?.id ?? '(missing id)'}`;
      if (taskIds.has(task.id)) fail(`${taskLabel} has duplicate id.`);
      taskIds.add(task.id);
      assertText(task.id, `${taskLabel}.id`);
      if (!validTaskTypes.has(task.taskType)) fail(`${taskLabel}.taskType is not a current TOEFL Writing task.`);
      tasksSeen.add(task.taskType);
      assertText(task.prompt, `${taskLabel}.prompt`);
      assertText(task.timeTarget, `${taskLabel}.timeTarget`);
      assertText(task.reviewQuestion, `${taskLabel}.reviewQuestion`);
      assertText(task.expectedMove, `${taskLabel}.expectedMove`);
      assertText(task.commonTrap, `${taskLabel}.commonTrap`);
    }

    for (const taskType of validTaskTypes) {
      if (!tasksSeen.has(taskType)) fail(`${label}.tasks must include ${taskType}.`);
    }

    assertArray(set.debrief, `${label}.debrief`, 2);
    for (const [debriefIndex, item] of (set.debrief ?? []).entries()) {
      assertText(item, `${label}.debrief[${debriefIndex}]`);
    }
  }
}

function main() {
  const catalog = loadCatalog();
  const academicDiscussionBank = loadTsModule(
    path.join(root, 'src/app/(site)/practica/toefl/writing/academic-discussion/banco-de-prompts/prompts.ts')
  );
  const emailPromptBank = loadTsModule(
    path.join(root, 'src/app/(site)/practica/toefl/writing/write-an-email/banco-de-prompts/prompts.ts')
  );
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  validateIeltsDocumentationCoverage();
  validateSkillReviewSourceComponent();
  validateQuestionTypeReviewSourceComponent();
  validateIeltsReadingQuestionTypesHub();
  validateIeltsCoreHubsStructuredData();
  validateIeltsTask1Hub();
  validateIeltsTask2Hub();
  validateIeltsTask2OpinionRoute();
  validateIeltsTask2DiscussionRoute();
  validateIeltsTask2AdvantagesDisadvantagesRoute();
  validateIeltsTask2ProblemSolutionRoute();
  validateIeltsTask2DirectQuestionRoute();
  validateToeflAcademicDiscussionRoutes();
  validateToeflEmailRoutes();
  validateToeflBuildSentenceRoute();
  validateToeflReadingCurrentFormatRoutes();
  validateIeltsSkimScanRoutes();
  validateIeltsReadingSkillPracticeRoutes();
  validateIeltsParaphraseProgressContract();
  validateIeltsInferenceProgressContract();
  validateIeltsGeneralTrainingHub();
  validateIeltsWritingRubricRoute();
  validateIeltsGeneralTrainingWritingTask1Route();
  validateIeltsGeneralTrainingReadingRoute();
  validateIeltsGeneralTrainingWritingTask2Route();
  validateIeltsTask1LegacySkillReviewRoutes();
  validateIeltsTask1DiscoveryRules();
  validateIeltsTask2LegacySkillReviewRoutes();
  validateIeltsTask2IntroductionPilot();
  validateIeltsTask2PromptAnalysisPilot();
  validateIeltsTask2BodyOnePilot();
  validateIeltsTask2BodyTwoPilot();
  validateIeltsTask2ConclusionLesson();
  validateIeltsTask2FinalReviewLesson();

  const routes = catalog.EXAM_PRACTICE_ROUTES ?? [];
  assertArray(routes, 'EXAM_PRACTICE_ROUTES', 1);
  const publishedIeltsReadingQuestionTypeRoutes = new Set(
    (catalog.IELTS_READING_TYPES ?? [])
      .filter((route) => route.status === 'published' && route.path?.startsWith('/practica/ielts/reading/tipos-de-preguntas/'))
      .map((route) => route.path)
  );

  const routePaths = new Set();
  for (const [index, route] of routes.entries()) {
    if (routePaths.has(route.path)) fail(`Duplicate route path: ${route.path}`);
    routePaths.add(route.path);
    validateRoute(route, index, routeMapText);
  }

  validateChoiceSet(
    'IELTS_SKIMMING_PRACTICE.paragraphMap',
    catalog.IELTS_SKIMMING_PRACTICE?.paragraphMap,
    (item) => item.options,
    (item) => item.answer
  );
  validateChoiceSet(
    'IELTS_SKIMMING_PRACTICE.summaryQuestion',
    catalog.IELTS_SKIMMING_PRACTICE?.summaryQuestion ? [catalog.IELTS_SKIMMING_PRACTICE.summaryQuestion] : [],
    (item) => item.options,
    (item) => item.answer,
    (item, label) => assertArray(item.traps, `${label}.traps`, 1),
    { requireId: false }
  );
  validateChoiceSet(
    'IELTS_INFERENCE_PRACTICE.questions',
    catalog.IELTS_INFERENCE_PRACTICE?.questions,
    (item) => item.options,
    (item) => item.answer,
    (item, label) => {
      assertText(item.evidence, `${label}.evidence`);
      assertArray(item.traps, `${label}.traps`, 1);
    }
  );
  validateInferenceSets('IELTS_INFERENCE_PRACTICE_SETS', catalog.IELTS_INFERENCE_PRACTICE_SETS);
  validateChoiceSet(
    'IELTS_PARAPHRASE_PRACTICE.items',
    catalog.IELTS_PARAPHRASE_PRACTICE?.items,
    (item) => item.options,
    (item) => item.answer,
    (item, label) => assertArray(item.traps, `${label}.traps`, 1)
  );
  validateParaphraseSets('IELTS_PARAPHRASE_PRACTICE_SETS', catalog.IELTS_PARAPHRASE_PRACTICE_SETS);
  validateChoiceSet(
    'IELTS_TIME_MANAGEMENT_PRACTICE.decisions',
    catalog.IELTS_TIME_MANAGEMENT_PRACTICE?.decisions,
    (item) => item.options,
    (item) => item.answer,
    (item, label) => assertText(item.trap, `${label}.trap`)
  );
  validateTimeManagementSets('IELTS_TIME_MANAGEMENT_PRACTICE_SETS', catalog.IELTS_TIME_MANAGEMENT_PRACTICE_SETS);

  validateCompletionQuestions('IELTS_SCANNING_PRACTICE.targets', catalog.IELTS_SCANNING_PRACTICE?.targets);
  validateSkimScanTransfer('IELTS_SKIM_SCAN_TRANSFER', catalog.IELTS_SKIM_SCAN_TRANSFER);
  validateSkimScanTransfers('IELTS_SKIM_SCAN_TRANSFER_SETS', catalog.IELTS_SKIM_SCAN_TRANSFER_SETS);
  validateIeltsReadingMixedQuestionTypeSets(
    'IELTS_READING_MIXED_QUESTION_TYPE_SETS',
    catalog.IELTS_READING_MIXED_QUESTION_TYPE_SETS,
    publishedIeltsReadingQuestionTypeRoutes
  );
  validateCompletionQuestions('IELTS_WORD_LIMIT_PRACTICE.questions', catalog.IELTS_WORD_LIMIT_PRACTICE?.questions);
  validateWordLimitSets('IELTS_WORD_LIMIT_PRACTICE_SETS', catalog.IELTS_WORD_LIMIT_PRACTICE_SETS);
  validateObjectiveQuestions('IELTS_TFNG_QUESTIONS', catalog.IELTS_TFNG_QUESTIONS);
  validateObjectivePracticeSets('IELTS_TFNG_PRACTICE_SETS', catalog.IELTS_TFNG_PRACTICE_SETS, {
    minSets: 3,
    minQuestionsPerSet: 6,
    minTotalQuestions: 22,
    requiredAnswers: ['TRUE', 'FALSE', 'NOT GIVEN'],
  });
  validateObjectiveQuestions('IELTS_YNNG_QUESTIONS', catalog.IELTS_YNNG_QUESTIONS);
  validateObjectivePracticeSets('IELTS_YNNG_PRACTICE_SETS', catalog.IELTS_YNNG_PRACTICE_SETS, {
    minSets: 3,
    minQuestionsPerSet: 7,
    minTotalQuestions: 22,
    requiredAnswers: ['YES', 'NO', 'NOT GIVEN'],
  });
  validateMatchingHeadingsPassages('IELTS_MATCHING_HEADINGS_PASSAGES', catalog.IELTS_MATCHING_HEADINGS_PASSAGES, {
    minPassages: 3,
    minParagraphsPerPassage: 5,
    minHeadings: 8,
    minTotalParagraphs: 17,
  });
  validateMatchingInformationPassages('IELTS_MATCHING_INFORMATION_PASSAGES', catalog.IELTS_MATCHING_INFORMATION_PASSAGES, {
    minPassages: 3,
    minParagraphsPerPassage: 5,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
  });
  validateMatchingFeaturesPassages('IELTS_MATCHING_FEATURES_PASSAGES', catalog.IELTS_MATCHING_FEATURES_PASSAGES, {
    minPassages: 3,
    minFeaturesPerPassage: 4,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 19,
  });
  validateMatchingSentenceEndingsPassages('IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES', catalog.IELTS_MATCHING_SENTENCE_ENDINGS_PASSAGES, {
    minPassages: 3,
    minEndingsPerPassage: 8,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
  });

  validateMultipleChoicePassage('IELTS_MULTIPLE_CHOICE_PASSAGE', catalog.IELTS_MULTIPLE_CHOICE_PASSAGE);
  validateMultipleChoicePassages('IELTS_MULTIPLE_CHOICE_PASSAGES', catalog.IELTS_MULTIPLE_CHOICE_PASSAGES, {
    minPassages: 3,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
    requiredSkills: ['detail', 'purpose', 'inference', 'main idea', 'vocabulary in context'],
  });
  validateMultipleChoicePassage('TOEFL_VOCABULARY_PASSAGE', catalog.TOEFL_VOCABULARY_PASSAGE);
  validateMultipleChoicePassage('TOEFL_INFERENCE_PASSAGE', catalog.TOEFL_INFERENCE_PASSAGE);
  validateMultipleChoicePassage('TOEFL_FACTUAL_INFORMATION_PASSAGE', catalog.TOEFL_FACTUAL_INFORMATION_PASSAGE);
  validateMultipleChoicePassage('TOEFL_RHETORICAL_PURPOSE_PASSAGE', catalog.TOEFL_RHETORICAL_PURPOSE_PASSAGE);
  validateMultipleChoicePassage('TOEFL_SENTENCE_SIMPLIFICATION_PASSAGE', catalog.TOEFL_SENTENCE_SIMPLIFICATION_PASSAGE);
  {
    const completeWordsIds = new Set();
    validateChoiceSet(
      'TOEFL_COMPLETE_WORDS_ITEMS',
      catalog.TOEFL_COMPLETE_WORDS_ITEMS,
      (item) => item.options,
      (item) => item.answer,
      (item, label) => {
        if (completeWordsIds.has(item.id)) fail(`${label} has duplicate id.`);
        completeWordsIds.add(item.id);
        assertText(item.id, `${label}.id`);
        assertText(item.sentence, `${label}.sentence`);
        assertText(item.trap, `${label}.trap`);
      }
    );
    assertArray(catalog.TOEFL_COMPLETE_WORDS_ITEMS, 'TOEFL_COMPLETE_WORDS_ITEMS', 16);
  }
  validateDailyLifeTexts('TOEFL_DAILY_LIFE_TEXTS', catalog.TOEFL_DAILY_LIFE_TEXTS);
  validateAcademicPassages('TOEFL_ACADEMIC_PASSAGES', catalog.TOEFL_ACADEMIC_PASSAGES);
  validateReadingSkillPractice('TOEFL_READING_SKILL_PRACTICE', catalog.TOEFL_READING_SKILL_PRACTICE);
  validateMixedDrills('TOEFL_READING_MIXED_DRILLS', catalog.TOEFL_READING_MIXED_DRILLS);

  validateCompletionQuestions('IELTS_SUMMARY_COMPLETION_PASSAGE.questions', catalog.IELTS_SUMMARY_COMPLETION_PASSAGE?.questions);
  validateSummaryCompletionPassages('IELTS_SUMMARY_COMPLETION_PASSAGES', catalog.IELTS_SUMMARY_COMPLETION_PASSAGES, {
    minPassages: 3,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
  });
  validateCompletionQuestions('IELTS_SENTENCE_COMPLETION_PASSAGE.questions', catalog.IELTS_SENTENCE_COMPLETION_PASSAGE?.questions);
  validateSummaryCompletionPassages('IELTS_SENTENCE_COMPLETION_PASSAGES', catalog.IELTS_SENTENCE_COMPLETION_PASSAGES, {
    minPassages: 3,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
  });
  validateCompletionQuestions('IELTS_DIAGRAM_LABELING_PASSAGE.questions', catalog.IELTS_DIAGRAM_LABELING_PASSAGE?.questions);
  validateDiagramLabelingPassages('IELTS_DIAGRAM_LABELING_PASSAGES', catalog.IELTS_DIAGRAM_LABELING_PASSAGES, {
    minPassages: 3,
    minStagesPerPassage: 6,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
  });
  validateCompletionQuestions('IELTS_SHORT_ANSWER_PASSAGE.questions', catalog.IELTS_SHORT_ANSWER_PASSAGE?.questions);
  validateShortAnswerPassages('IELTS_SHORT_ANSWER_PASSAGES', catalog.IELTS_SHORT_ANSWER_PASSAGES, {
    minPassages: 3,
    minQuestionsPerPassage: 6,
    minTotalQuestions: 18,
  });
  validateCompletionQuestions('IELTS_FLOW_CHART_COMPLETION_PASSAGE.steps', catalog.IELTS_FLOW_CHART_COMPLETION_PASSAGE?.steps);
  validateFlowChartCompletionPassages('IELTS_FLOW_CHART_COMPLETION_PASSAGES', catalog.IELTS_FLOW_CHART_COMPLETION_PASSAGES, {
    minPassages: 3,
    minStepsPerPassage: 6,
    minTotalSteps: 18,
  });

  for (const [groupIndex, group] of (catalog.IELTS_NOTE_COMPLETION_PASSAGE?.noteGroups ?? []).entries()) {
    validateCompletionQuestions(`IELTS_NOTE_COMPLETION_PASSAGE.noteGroups[${groupIndex}].items`, group.items);
  }
  validateNoteCompletionPassages('IELTS_NOTE_COMPLETION_PASSAGES', catalog.IELTS_NOTE_COMPLETION_PASSAGES, {
    minPassages: 3,
    minGroupsPerPassage: 3,
    minItemsPerGroup: 2,
    minTotalQuestions: 18,
  });
  for (const [rowIndex, row] of (catalog.IELTS_TABLE_COMPLETION_PASSAGE?.rows ?? []).entries()) {
    validateCompletionQuestions(
      `IELTS_TABLE_COMPLETION_PASSAGE.rows[${rowIndex}].blanks`,
      row.cells?.filter((cell) => cell.type === 'blank') ?? [],
      { requireId: false }
    );
  }
  validateTableCompletionPassages('IELTS_TABLE_COMPLETION_PASSAGES', catalog.IELTS_TABLE_COMPLETION_PASSAGES, {
    minPassages: 3,
    minRowsPerPassage: 3,
    minColumns: 3,
    minTotalBlanks: 18,
  });

  validateWritingPrompts('TOEFL_INTEGRATED_WRITING_PROMPTS', catalog.TOEFL_INTEGRATED_WRITING_PROMPTS, true);
  validateWritingPrompts('TOEFL_ACADEMIC_DISCUSSION_PROMPTS', catalog.TOEFL_ACADEMIC_DISCUSSION_PROMPTS);
  validateWritingPrompts('TOEFL_EMAIL_PROMPTS', catalog.TOEFL_EMAIL_PROMPTS);
  validateAcademicDiscussionPromptBank(
    'ACADEMIC_DISCUSSION_PROMPTS',
    academicDiscussionBank.ACADEMIC_DISCUSSION_PROMPTS
  );
  validateEmailPromptBank('EMAIL_PROMPT_BANK', emailPromptBank.EMAIL_PROMPT_BANK);
  validateIeltsTask2PromptBank('IELTS_TASK2_PROMPT_BANK', catalog.IELTS_TASK2_PROMPT_BANK);
  validateIeltsTask2PromptBank('IELTS_TASK2_OPINION_PROMPTS', catalog.IELTS_TASK2_OPINION_PROMPTS, {
    requiredType: 'Opinion',
    minPrompts: 2,
  });
  validateIeltsTask2PromptBank('IELTS_TASK2_DISCUSSION_PROMPTS', catalog.IELTS_TASK2_DISCUSSION_PROMPTS, {
    requiredType: 'Discussion',
    minPrompts: 2,
  });
  validateIeltsTask2PromptBank(
    'IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS',
    catalog.IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS,
    {
      requiredType: 'Advantages and disadvantages',
      minPrompts: 2,
    }
  );
  validateIeltsTask2PromptBank('IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS', catalog.IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS, {
    requiredType: 'Problem-solution',
    minPrompts: 2,
  });
  validateIeltsTask2PromptBank('IELTS_TASK2_DIRECT_QUESTION_PROMPTS', catalog.IELTS_TASK2_DIRECT_QUESTION_PROMPTS, {
    requiredType: 'Direct question',
    minPrompts: 2,
  });

  if ((catalog.TOEFL_SENTENCE_BUILD_ITEMS ?? []).length === 0) fail('TOEFL_SENTENCE_BUILD_ITEMS must not be empty.');
  for (const [index, item] of (catalog.TOEFL_SENTENCE_BUILD_ITEMS ?? []).entries()) {
    const label = `TOEFL_SENTENCE_BUILD_ITEMS[${index}] ${item?.id ?? '(missing id)'}`;
    assertText(item.id, `${label}.id`);
    assertArray(item.fragments, `${label}.fragments`, 2);
    assertText(item.answer, `${label}.answer`);
    assertText(item.explanation, `${label}.explanation`);
    assertText(item.hint, `${label}.hint`);
  }
  validateSentenceBuildPromptBank('TOEFL_BUILD_A_SENTENCE_PROMPT_BANK', catalog.TOEFL_BUILD_A_SENTENCE_PROMPT_BANK);
  validateToeflWritingMixedDrills('TOEFL_WRITING_MIXED_DRILLS', catalog.TOEFL_WRITING_MIXED_DRILLS);
  validateToeflWritingScoredVariants('TOEFL_WRITING_SCORED_VARIANTS', catalog.TOEFL_WRITING_SCORED_VARIANTS);
  validateToeflWritingRevisionDrills('TOEFL_WRITING_REVISION_DRILLS', catalog.TOEFL_WRITING_REVISION_DRILLS);
  validateToeflWritingTimedReviewSets('TOEFL_WRITING_TIMED_REVIEW_SETS', catalog.TOEFL_WRITING_TIMED_REVIEW_SETS);

  if (warnings.length > 0) {
    console.log('Exam practice content warnings:');
    for (const warning of warnings) console.log(`- ${warning}`);
  }

  if (errors.length > 0) {
    console.error('Exam practice content check failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Exam practice content check passed: ${routes.length} routes and core exercise banks validated.`);
}

main();
