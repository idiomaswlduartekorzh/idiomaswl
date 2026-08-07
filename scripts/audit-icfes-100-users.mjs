import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { GUIDED_MOCK_IDS, GUIDED_WORKBOOK_IDS } from '../src/data/icfes/guided-registry.ts';

const runtime = process.argv.includes('--runtime');
const noWrite = process.argv.includes('--no-write');
const base = process.env.ICFES_AUDIT_BASE_URL ?? 'http://127.0.0.1:4192';
const HUB = '/practica/icfes-saber-11';
const CATALOG = `${HUB}/examenes`;
const GUIDED_55 = `${HUB}/simulacro-guiado`;
const VOCABULARY = `${HUB}/vocabulario`;
const ERRORS = `${HUB}/repaso-errores`;

const source = {
  hub: readFileSync('src/app/(site)/practica/icfes-saber-11/page.tsx', 'utf8'),
  vocabulary: readFileSync('src/app/(site)/practica/icfes-saber-11/vocabulario/page.tsx', 'utf8'),
  catalogue: readFileSync('src/app/(site)/practica/icfes-saber-11/examenes/ExamenesClient.tsx', 'utf8'),
  partPage: readFileSync('src/app/(site)/practica/icfes-saber-11/[partSlug]/page.tsx', 'utf8'),
  engine: readFileSync('src/app/(site)/practica/icfes-saber-11/_components/IcfesPartPracticeEngine.tsx', 'utf8'),
  partOneExamples: readFileSync('src/app/(site)/practica/icfes-saber-11/_components/IcfesPartOneExamples.tsx', 'utf8'),
  errorReview: readFileSync('src/app/(site)/practica/icfes-saber-11/repaso-errores/ErrorReviewClient.tsx', 'utf8'),
  mockGuided: readFileSync('src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/page.tsx', 'utf8'),
  workbookGuided: readFileSync('src/app/(site)/practica/icfes-saber-11/examenes/[examId]/guiado/page.tsx', 'utf8'),
};

const templates = [
  {
    id: 'organic-structure', count: 20, source: 'google-organic', priorKnowledge: 'none', viewport: 'desktop',
    intent: 'qué evalúa inglés ICFES y cómo son sus partes',
    journey: (index) => [HUB, `${HUB}/parte-${(index % 7) + 1}`],
    outcome: 'Comprende el tipo de tarea, observa un método y llega a práctica guiada.',
    opportunity: ['task-definition', 'worked-examples', 'guided-practice'],
  },
  {
    id: 'organic-vocabulary', count: 15, source: 'google-organic', priorKnowledge: 'low', viewport: 'mobile',
    intent: 'vocabulario y palabras para ICFES inglés',
    journey: (index) => [VOCABULARY, [ `${HUB}/parte-1`, `${HUB}/parte-7`, `${HUB}/sinonimos-inferencia` ][index % 3]],
    outcome: 'Pasa de vocabulario por familias a una tarea donde debe aplicarlo.',
    opportunity: ['semantic-groups', 'transfer-link', 'contextual-practice'],
  },
  {
    id: 'organic-guided-simulator', count: 15, source: 'google-organic', priorKnowledge: 'low', viewport: 'desktop',
    intent: 'simulacro ICFES inglés gratis con respuestas',
    journey: () => [HUB, GUIDED_55],
    outcome: 'Distingue práctica propia de prueba oficial y recibe feedback por alternativa.',
    opportunity: ['scope-disclaimer', 'seven-parts', 'immediate-feedback'],
  },
  {
    id: 'organic-workbooks', count: 15, source: 'google-organic', priorKnowledge: 'medium', viewport: 'desktop',
    intent: 'cuadernillos ICFES inglés con respuestas explicadas',
    journey: (index) => [CATALOG, `${CATALOG}/${GUIDED_WORKBOOK_IDS[index % GUIDED_WORKBOOK_IDS.length]}/guiado`],
    outcome: 'Elige una muestra histórica elegible y entiende sus límites antes de practicar.',
    opportunity: ['source-provenance', 'historical-scope', 'guided-review'],
  },
  {
    id: 'recommended-mock', count: 15, source: 'recommendation', priorKnowledge: 'none', viewport: 'mobile',
    intent: 'me recomendaron esta práctica y quiero empezar de inmediato',
    journey: (index) => [`/examenes/icfes/practica/${GUIDED_MOCK_IDS[index % GUIDED_MOCK_IDS.length]}/guiado`],
    outcome: 'Puede empezar sin registro, reconoce que es práctica abreviada y recibe una explicación accionable.',
    opportunity: ['no-registration', 'scope-disclaimer', 'error-explanation'],
  },
  {
    id: 'error-recovery', count: 10, source: 'returning', priorKnowledge: 'mixed', viewport: 'desktop',
    intent: 'quiero entender y corregir lo que fallé',
    journey: () => [HUB, ERRORS],
    outcome: 'Reencuentra selección, respuesta correcta, evidencia y refuerzo específico.',
    opportunity: ['stored-attempt', 'localized-evidence', 'reinforcement'],
  },
  {
    id: 'accessible-novice', count: 10, source: 'recommendation', priorKnowledge: 'none', viewport: 'keyboard-mobile',
    intent: 'necesito una explicación navegable sin depender de hover',
    journey: () => [HUB, `${HUB}/parte-1`],
    outcome: 'Navega enlaces y pestañas con teclado, foco visible y movimiento reducido.',
    opportunity: ['keyboard-tabs', 'focus-visible', 'reduced-motion'],
  },
];

const users = [];
let personaNumber = 1;
for (const template of templates) {
  for (let index = 0; index < template.count; index += 1) {
    users.push({
      id: `student-${String(personaNumber).padStart(3, '0')}`,
      cohort: template.id,
      source: template.source,
      priorKnowledge: template.priorKnowledge,
      viewport: template.viewport,
      intent: template.intent,
      journey: template.journey(index),
      expectedOutcome: template.outcome,
      learningOpportunity: template.opportunity,
    });
    personaNumber += 1;
  }
}

const checks = [];
function check(id, title, pass, severity, evidence, remediation) {
  checks.push({ id, title, pass: Boolean(pass), severity, evidence, remediation });
}

check('cohort-size', 'La cohorte contiene exactamente 100 estudiantes sintéticos', users.length === 100, 'critical', `${users.length}/100`, 'Corregir la distribución de cohortes.');
check('source-mix', 'Incluye llegada orgánica, recomendada y recurrente', new Set(users.map((user) => user.source)).size === 3, 'high', [...new Set(users.map((user) => user.source))].join(', '), 'Añadir el origen de llegada faltante.');
check('novice-coverage', 'La mayoría incluye conocimiento nulo o bajo', users.filter((user) => ['none', 'low'].includes(user.priorKnowledge)).length >= 70, 'high', `${users.filter((user) => ['none', 'low'].includes(user.priorKnowledge)).length}/100`, 'Aumentar recorridos de principiantes.');
check('mobile-keyboard-coverage', 'La simulación cubre móvil y teclado', users.some((user) => user.viewport === 'mobile') && users.some((user) => user.viewport === 'keyboard-mobile'), 'high', 'Móvil y teclado presentes', 'Añadir recorridos no basados en mouse.');
check('hub-choice-architecture', 'El hub ofrece diagnóstico, partes, cuadernillos y errores', ['diagnostico', 'ICFES_PARTS.map', 'examenes', 'repaso-errores'].every((token) => source.hub.includes(token)), 'critical', 'Cuatro entradas verificadas', 'Restaurar el punto de entrada faltante.');
check('vocabulary-transfer', 'Vocabulario enlaza a aplicación real', ['parte-1', 'parte-7', 'sinonimos-inferencia'].every((token) => source.vocabulary.includes(token)), 'high', 'Tres destinos de transferencia', 'Evitar un banco de tarjetas sin aplicación.');
check('feedback-contract', 'El motor muestra evidencia, distractores y microlección', ['option.rationale', 'question.evidence.reason', 'question.microLesson', 'aria-live'].every((token) => source.engine.includes(token)), 'critical', 'Contrato pedagógico completo', 'No reducir feedback a correcta/incorrecta.');
check('attempt-persistence', 'El intento se persiste para continuidad', source.engine.includes('writeProgress(updated, progressScope)') && source.errorReview.includes('window.localStorage.length') && source.errorReview.includes('latestWrong'), 'critical', 'Persistencia y reconstrucción de cola', 'Conectar motor y repaso de errores.');
check('error-review-contract', 'El repaso reconstruye error, evidencia y refuerzo', ['selectedIndex', 'Respuesta correcta', 'Evidencia', 'reinforcement.href'].every((token) => source.errorReview.includes(token)), 'high', 'Cuatro elementos de corrección', 'Mostrar la decisión anterior y la transferencia.');
check('keyboard-contract', 'La Parte 1 implementa patrón de pestañas accesible', ['onKeyDown=', 'tabIndex=', 'aria-labelledby=', 'ArrowRight', 'Home', 'End'].every((token) => source.partOneExamples.includes(token)), 'high', 'Flechas, Home/End y roving tabindex', 'Restaurar navegación de teclado.');
check('own-practice-truth', 'Los mocks propios declaran extensión y límites', source.mockGuided.includes('práctica abreviada') && source.mockGuided.includes('no reproduce la extensión estándar') && source.mockGuided.includes('predice tu puntaje oficial'), 'critical', '45 preguntas, práctica propia y sin predicción', 'No presentar un mock propio como cuadernillo oficial.');
check('official-practice-truth', 'Las muestras oficiales preservan procedencia y alcance histórico', source.workbookGuided.includes('Muestra histórica') && source.workbookGuided.includes('elaboración editorial de Idiomas WeLearn') && source.workbookGuided.includes('predice un puntaje oficial'), 'critical', 'Fuente, autoría de explicación y límite visibles', 'Separar material divulgado y explicación propia.');
check('guided-inventory-reach', 'La cohorte cubre mocks representativos y las cinco muestras guiadas', new Set(users.flatMap((user) => user.journey).filter((route) => /mock-\d+\/guiado$/.test(route))).size === 15 && new Set(users.flatMap((user) => user.journey).filter((route) => GUIDED_WORKBOOK_IDS.some((id) => route.includes(id)))).size === 5, 'medium', '15/23 mocks muestreados por cohortes · 5/5 muestras históricas; el smoke independiente cubre 23/23', 'Rotar la cohorte y mantener el smoke exhaustivo de rutas.');

const uniqueRoutes = [...new Set(users.flatMap((user) => user.journey))];
const runtimeResults = [];
if (runtime) {
  for (const route of uniqueRoutes) {
    const response = await fetch(`${base}${route}`, { redirect: 'manual' });
    const html = await response.text();
    runtimeResults.push({
      route,
      status: response.status,
      title: html.match(/<title>(.*?)<\/title>/s)?.[1] ?? null,
      hasMain: /<main[\s>]/.test(html),
      hasDescription: /<meta name="description" content="[^"]+"/.test(html),
    });
  }
  const broken = runtimeResults.filter((route) => route.status !== 200 || !route.hasMain);
  check('runtime-route-health', 'Todas las rutas de los 100 recorridos renderizan', broken.length === 0, 'critical', `${runtimeResults.length - broken.length}/${runtimeResults.length} rutas únicas sanas`, `Corregir: ${broken.map((item) => `${item.status} ${item.route}`).join(', ')}`);
  const indexableWithoutDescription = runtimeResults.filter((item) => !item.hasDescription && item.route !== ERRORS);
  check('runtime-search-snippets', 'Las entradas indexables tienen descripción', indexableWithoutDescription.length === 0, 'high', `${runtimeResults.length - indexableWithoutDescription.length}/${runtimeResults.length} con descripción o noindex`, `Añadir metadata: ${indexableWithoutDescription.map((item) => item.route).join(', ')}`);
}

const failed = checks.filter((item) => !item.pass);
const blocking = failed.filter((item) => ['critical', 'high'].includes(item.severity));
const perCohort = templates.map((template) => ({
  cohort: template.id,
  users: users.filter((user) => user.cohort === template.id).length,
  source: template.source,
  outcomeProxy: template.outcome,
  caveat: 'Oportunidad pedagógica inferida por contenido y flujo; no equivale a aprendizaje observado en personas reales.',
}));
const report = {
  generatedAt: new Date().toISOString(),
  methodology: {
    kind: 'deterministic-synthetic-cohort',
    runtime,
    statement: 'Se simulan tareas, rutas y exposición pedagógica; no se simulan emociones, memoria ni aprendizaje humano como si fueran mediciones reales.',
    browserEvidence: 'Playwright manual dirigido valida teclado, respuesta incorrecta, feedback específico, persistencia y repaso; sus resultados se consolidan en la auditoría final.',
  },
  verdict: blocking.length ? 'blocked' : failed.length ? 'approved-with-observations' : 'approved',
  totals: { users: users.length, cohorts: templates.length, uniqueRoutes: uniqueRoutes.length, checks: checks.length, criticalOrHighOpen: blocking.length },
  perCohort,
  runtimeResults,
  findings: failed,
  checks,
  users,
};

if (!noWrite) writeFileSync('docs/icfes-100-user-simulation.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ verdict: report.verdict, totals: report.totals, cohorts: perCohort, failed: failed.map(({ id, severity }) => ({ id, severity })) }, null, 2));
assert.equal(blocking.length, 0, `Simulación ICFES bloqueada: ${blocking.map(({ id }) => id).join(', ')}`);
