import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { pathToFileURL } from 'node:url';

const projectRoot = pathToFileURL(`${process.cwd()}/`).href;
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('@/')) {
        return nextResolve(`${projectRoot}src/${specifier.slice(2)}.ts`, context);
      }
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const { SIMULACROS, getSimulacroQuestionPart } = await import('../src/data/mocks/icfes-simulacros.ts');
const {
  getGuidedWorkbookQuestions,
  GUIDED_WORKBOOK_EXCLUSIONS,
  GUIDED_WORKBOOK_IDS,
} = await import('../src/data/icfes/guided-workbooks.ts');

const routeSource = readFileSync('src/app/(site)/practica/icfes-saber-11/examenes/[examId]/guiado/page.tsx', 'utf8');
const catalogSource = readFileSync('src/app/(site)/practica/icfes-saber-11/examenes/ExamenesClient.tsx', 'utf8');
const errorReviewSource = readFileSync('src/app/(site)/practica/icfes-saber-11/repaso-errores/page.tsx', 'utf8');
const official = SIMULACROS.filter((exam) => exam.assessment === 'saber-11');
const guidedRows = GUIDED_WORKBOOK_IDS.flatMap((examId) => {
  const exam = official.find(({ id }) => id === examId);
  assert.ok(exam, `Cuadernillo guiado inexistente: ${examId}`);
  return getGuidedWorkbookQuestions(examId).map((question, index) => ({ exam, sourceQuestion: exam.questions[index], question }));
});

const checks = [];
function check(id, label, pass, severity, evidence, remediation = '') {
  checks.push({ id, label, pass, severity: pass ? 'pass' : severity, evidence, remediation: pass ? '' : remediation });
}

check('official-count', 'Siete muestras Saber 11 clasificadas', official.length === 7, 'critical', `${official.length}/7`, 'Reconciliar el registro oficial.');
check('guided-eligibility', 'Cinco muestras completas habilitadas y dos exclusiones documentadas', GUIDED_WORKBOOK_IDS.length === 5 && Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).length === 2, 'critical', `${GUIDED_WORKBOOK_IDS.length} guiadas · ${Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).length} excluidas`, 'No habilitar una muestra sin todos sus estímulos.');

const expectedGuidedQuestions = GUIDED_WORKBOOK_IDS.reduce((total, examId) => total + official.find(({ id }) => id === examId).questions.length, 0);
check('guided-question-count', 'La extensión histórica se conserva', guidedRows.length === expectedGuidedQuestions && guidedRows.length === 145, 'critical', `${guidedRows.length}/145 preguntas`, 'No completar ni recortar muestras históricas.');

const mismatchedOptions = guidedRows.filter(({ sourceQuestion, question }) => sourceQuestion.answer !== question.answerIndex || JSON.stringify(sourceQuestion.options) !== JSON.stringify(question.options.map(({ text }) => text)));
check('official-option-parity', 'Opciones y claves idénticas al banco fuente', mismatchedOptions.length === 0, 'critical', `${mismatchedOptions.length} diferencias`, 'Restaurar literalmente opciones y claves divulgadas.');

const mismatchedParts = guidedRows.filter(({ exam, sourceQuestion, question }) => getSimulacroQuestionPart(exam, sourceQuestion.n) !== question.officialPart);
check('official-part-parity', 'Parte histórica preservada por pregunta', mismatchedParts.length === 0, 'critical', `${mismatchedParts.length} diferencias`, 'Usar partRanges del cuadernillo, no la distribución 2026-2.');

const invalidSources = guidedRows.filter(({ exam, question }) => question.source.type !== 'official-workbook' || question.source.reference !== exam.source);
check('source-provenance', 'Cada pregunta conserva la referencia oficial', invalidSources.length === 0, 'critical', `${invalidSources.length} referencias inválidas`, 'Separar fuente oficial de explicación WeLearn.');

const ids = guidedRows.map(({ question }) => question.id);
check('unique-guided-ids', 'Identificadores guiados únicos', new Set(ids).size === ids.length, 'critical', `${new Set(ids).size}/${ids.length}`, 'Prefijar ids por cuadernillo.');

const missingRationales = guidedRows.flatMap(({ question }) => question.options.filter(({ rationale }) => !rationale?.trim() || rationale.trim().length < 24));
check('rationale-coverage', 'Cada alternativa tiene una razón visible', missingRationales.length === 0, 'high', `${guidedRows.reduce((total, { question }) => total + question.options.length, 0) - missingRationales.length} alternativas cubiertas`, 'Añadir retroalimentación específica por distractor.');

const bannedTemplates = /No encaja con la pista decisiva|Esta pista separa .* de los distractores|pertenece al banco, pero no cumple todos los rasgos/i;
const genericRationales = guidedRows.flatMap(({ question }) => question.options.filter(({ rationale }) => bannedTemplates.test(rationale)));
check('no-banned-feedback', 'Sin las plantillas generalistas rechazadas', genericRationales.length === 0, 'high', `${genericRationales.length} coincidencias`, 'Explicar significado, sustitución o evidencia.');

const incompleteEvidence = guidedRows.filter(({ question }) => !question.evidence.quote.trim() || !question.evidence.reason.trim() || question.evidence.reason.length < 24);
check('evidence-coverage', 'Toda respuesta tiene evidencia y razón', incompleteEvidence.length === 0, 'high', `${guidedRows.length - incompleteEvidence.length}/${guidedRows.length}`, 'Localizar una frase o pista verificable.');

const readingEvidenceOutsidePassage = guidedRows.filter(({ exam, sourceQuestion, question }) => {
  if (sourceQuestion.type !== 'reading') return false;
  const passage = exam.passages.find(({ id }) => id === sourceQuestion.passageId);
  const normalizedPassage = passage?.text.replace(/\s+/g, ' ').toLowerCase() ?? '';
  return !question.evidence.quote.split('...').every((fragment) => normalizedPassage.includes(fragment.trim().toLowerCase()));
});
check('reading-evidence-localized', 'La evidencia de lectura existe en el pasaje', readingEvidenceOutsidePassage.length === 0, 'high', `${readingEvidenceOutsidePassage.length} citas externas`, 'Citar una oración real del texto.');

const gapWithoutSubstitution = guidedRows.filter(({ sourceQuestion, question }) => sourceQuestion.type === 'gap' && !question.options.every(({ text, rationale }) => rationale.toLowerCase().includes(text.toLowerCase())));
check('gap-substitution', 'Cada opción cloze se analiza de forma explícita', gapWithoutSubstitution.length === 0, 'high', `${gapWithoutSubstitution.length} preguntas incompletas`, 'Nombrar o sustituir cada opción al justificarla.');

const missingNoticeStimuli = official.flatMap((exam) => exam.questions
  .filter(({ type, passageId, stem }) => type === 'notice' && !passageId && !/[“"'](.+)[”"']/.test(stem))
  .map((question) => `${exam.id}-q${question.n}`));
check('documented-missing-stimuli', 'Seis avisos incompletos quedan fuera del guiado', missingNoticeStimuli.length === 6 && missingNoticeStimuli.every((id) => Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).some((examId) => id.startsWith(examId))), 'critical', missingNoticeStimuli.join(' · '), 'No inferir estímulos faltantes desde opciones o claves.');

check('dynamic-guided-page', 'La ruta usa extensión y partes de cada muestra', routeSource.includes('{questions.length} preguntas') && routeSource.includes('exam.partRanges.length') && !routeSource.includes('<strong>25 preguntas</strong>'), 'high', 'Extensión dinámica', 'Eliminar textos fijos del piloto 2023.');
check('historical-disclaimer', 'La ruta explica el alcance histórico', routeSource.includes('no reproduce necesariamente la aplicación estándar 2026-2 ni predice un puntaje oficial'), 'critical', 'Descargo visible', 'No presentar una muestra histórica como formato vigente completo.');
check('catalog-eligibility', 'El catálogo muestra guiado solo cuando es elegible', catalogSource.includes('GUIDED_WORKBOOK_IDS.includes') && catalogSource.includes('GUIDED_WORKBOOK_EXCLUSIONS'), 'high', 'Elegibilidad explícita', 'Conectar el CTA a la lista editorial aprobada.');
check('error-review-integration', 'Los cinco cuadernillos entran a la cola de errores', errorReviewSource.includes('GUIDED_WORKBOOK_IDS.flatMap(getGuidedWorkbookQuestions)'), 'high', 'Integración por registro', 'Añadir todos los bancos guiados sin duplicarlos.');

const answerPositions = Array.from({ length: 8 }, (_, index) => ({
  position: String.fromCharCode(65 + index),
  count: guidedRows.filter(({ question }) => question.answerIndex === index).length,
}));
const failures = checks.filter(({ pass }) => !pass);
const report = {
  generatedAt: new Date().toISOString(),
  scope: {
    officialSaber11Samples: official.map(({ id, year, totalQuestions, partRanges }) => ({ id, year, totalQuestions, parts: partRanges.map(({ part }) => part) })),
    guided: [...GUIDED_WORKBOOK_IDS],
    excluded: GUIDED_WORKBOOK_EXCLUSIONS,
    guidedQuestions: guidedRows.length,
    provenanceRule: 'Enunciados/opciones/claves: material divulgado por ICFES. Explicaciones: elaboración IdiomasWL.',
  },
  verdict: failures.some(({ severity }) => severity === 'critical' || severity === 'high') ? 'blocked' : failures.length ? 'conditional' : 'approved',
  summary: {
    checks: checks.length,
    passed: checks.length - failures.length,
    failed: failures.length,
    critical: failures.filter(({ severity }) => severity === 'critical').length,
    high: failures.filter(({ severity }) => severity === 'high').length,
    medium: failures.filter(({ severity }) => severity === 'medium').length,
  },
  answerPositions,
  checks,
};

if (!process.argv.includes('--no-write')) {
  writeFileSync('docs/icfes-official-guided-audit.json', `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
assert.equal(report.verdict, 'approved', `Auditoría oficial bloqueada: ${failures.map(({ id }) => id).join(', ')}`);
