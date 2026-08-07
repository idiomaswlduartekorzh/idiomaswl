import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const {
  GUIDED_SIMULACRO_2026_COUNTS,
  GUIDED_SIMULACRO_2026_QUESTIONS,
} = await import('../src/data/icfes/guided-simulacro-2026.ts');

const EXPECTED_COUNTS = { 1: 6, 2: 6, 3: 6, 4: 10, 5: 9, 6: 6, 7: 12 };
const BANNED_PATTERNS = [
  /no encaja con la pista decisiva/i,
  /esta pista separa .* de los distractores/i,
  /pertenece al banco, pero no cumple/i,
  /rompe la concordancia, la categoría gramatical/i,
  /falla al menos una capa de validación/i,
];

const questions = [...GUIDED_SIMULACRO_2026_QUESTIONS];
const routeSource = readFileSync('src/app/(site)/practica/icfes-saber-11/simulacro-guiado/page.tsx', 'utf8');
const errorReviewSource = readFileSync('src/app/(site)/practica/icfes-saber-11/repaso-errores/page.tsx', 'utf8');
const checks = [];
function check(id, label, pass, severity, evidence, remediation = '') {
  checks.push({ id, label, pass, severity: pass ? 'pass' : severity, evidence, remediation: pass ? '' : remediation });
}

check('question-count', 'El entrenamiento conserva 55 preguntas', questions.length === 55, 'critical', `${questions.length}/55`, 'Reconciliar el banco base y las preguntas adicionales.');
check(
  'part-counts',
  'Distribución completa por las siete partes',
  Object.entries(EXPECTED_COUNTS).every(([part, count]) => GUIDED_SIMULACRO_2026_COUNTS[part] === count),
  'critical',
  Object.entries(GUIDED_SIMULACRO_2026_COUNTS).map(([part, count]) => `P${part}:${count}`).join(' · '),
  'Restaurar la distribución 6/6/6/10/9/6/12.',
);

const ids = questions.map(({ id }) => id);
check('unique-ids', 'Identificadores únicos', new Set(ids).size === ids.length, 'critical', `${new Set(ids).size}/${ids.length}`, 'Eliminar ids repetidos.');

const invalidAnswers = questions.filter(({ answerIndex, options }) => !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length);
check('valid-answers', 'Claves dentro del rango de opciones', invalidAnswers.length === 0, 'critical', `${invalidAnswers.length} inválidas`, 'Corregir answerIndex.');

const duplicateOptions = questions.filter(({ options }) => new Set(options.map(({ text }) => text.trim().toLowerCase())).size !== options.length);
check('unique-options', 'Opciones distintas por pregunta', duplicateOptions.length === 0, 'high', `${duplicateOptions.length} preguntas con duplicados`, 'Eliminar distractores duplicados.');

const missingRationales = questions.flatMap((question) => question.options
  .map((option, optionIndex) => ({ question, option, optionIndex }))
  .filter(({ option }) => !option.rationale?.trim() || option.rationale.trim().length < 24));
check('rationale-coverage', 'Cada alternativa tiene retroalimentación sustantiva', missingRationales.length === 0, 'high', `${questions.reduce((total, question) => total + question.options.length, 0) - missingRationales.length} alternativas cubiertas`, 'Escribir una razón concreta para cada alternativa.');

const repeatedWithinQuestion = questions.filter(({ options }) => new Set(options.map(({ rationale }) => rationale.trim().toLowerCase())).size !== options.length);
check('distinct-rationales', 'Las razones no se repiten dentro de una pregunta', repeatedWithinQuestion.length === 0, 'high', `${repeatedWithinQuestion.length} preguntas repetitivas`, 'Explicar el error particular de cada distractor.');

const genericFeedback = questions.flatMap((question) => question.options
  .filter(({ rationale }) => BANNED_PATTERNS.some((pattern) => pattern.test(rationale)))
  .map(({ text, rationale }) => ({ questionId: question.id, option: text, rationale })));
check('no-generic-feedback', 'Sin plantillas generalistas prohibidas', genericFeedback.length === 0, 'high', `${genericFeedback.length} coincidencias`, 'Reemplazar la plantilla por evidencia semántica o gramatical específica.');

const incompleteEvidence = questions.filter(({ evidence }) => !evidence?.quote?.trim() || !evidence.reason?.trim() || evidence.reason.trim().length < 24);
check('evidence-coverage', 'Cada pregunta explica su evidencia', incompleteEvidence.length === 0, 'high', `${questions.length - incompleteEvidence.length}/${questions.length}`, 'Añadir cita y razón localizada.');

const incompletePedagogy = questions.filter(({ strategy, microLesson, reinforcement }) => !strategy?.trim() || !microLesson?.body?.trim() || !reinforcement?.href?.startsWith('/practica/icfes-saber-11/'));
check('pedagogical-next-step', 'Cada pregunta ofrece estrategia y refuerzo conectado', incompletePedagogy.length === 0, 'high', `${questions.length - incompletePedagogy.length}/${questions.length}`, 'Completar regla transferible y enlace de práctica.');

const mislabeledSources = questions.filter(({ source }) => source.type !== 'original-practice' || /oficial del icfes/i.test(source.reference));
check('source-label', 'El banco se identifica como práctica propia', mislabeledSources.length === 0, 'critical', `${questions.length - mislabeledSources.length}/${questions.length}`, 'No presentar contenido propio como pregunta oficial.');
check('route-disclaimer', 'La ruta visible declara autoría y límites', routeSource.includes('No es un cuadernillo oficial ni predice tu puntaje ICFES') && routeSource.includes('elaboración original de Idiomas WeLearn'), 'critical', 'Descargo de autoría y no predicción', 'Restaurar el aviso visible de procedencia y alcance.');
check('error-queue-no-duplicates', 'La cola de errores no duplica las 21 preguntas base', !errorReviewSource.includes('ICFES_PRACTICE_QUESTIONS') && errorReviewSource.includes('GUIDED_SIMULACRO_2026_QUESTIONS'), 'high', 'Una sola fuente para las 55 preguntas', 'No concatenar el banco base porque ya está incluido en GUIDED_SIMULACRO_2026_QUESTIONS.');

const answerPositions = Array.from({ length: 5 }, (_, position) => ({
  position: String.fromCharCode(65 + position),
  count: questions.filter(({ answerIndex }) => answerIndex === position).length,
}));
const maxShare = Math.max(...answerPositions.map(({ count }) => count)) / questions.length;
check('answer-balance', 'Ninguna posición domina el banco', maxShare <= 0.4, 'medium', answerPositions.map(({ position, count }) => `${position}:${count}`).join(' · '), 'Redistribuir claves sin alterar el contenido.');

const failures = checks.filter(({ pass }) => !pass);
const report = {
  generatedAt: new Date().toISOString(),
  scope: {
    resource: 'simulacro-guiado-55',
    questions: questions.length,
    alternatives: questions.reduce((total, question) => total + question.options.length, 0),
    provenance: 'Práctica original de WeLearn; no es cuadernillo oficial.',
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
  partCounts: GUIDED_SIMULACRO_2026_COUNTS,
  answerPositions,
  checks,
};

if (!process.argv.includes('--no-write')) {
  writeFileSync('docs/icfes-guided-55-audit.json', `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
assert.equal(report.verdict, 'approved', `Auditoría del guiado de 55 bloqueada: ${failures.map(({ id }) => id).join(', ')}`);
