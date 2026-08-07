import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const registrySource = readFileSync('src/data/icfes/guided-registry.ts', 'utf8');
const guidedSource = readFileSync('src/data/icfes/guided-mocks.ts', 'utf8');
const MOCK_IDS = registrySource.match(/GUIDED_MOCK_IDS\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1].match(/mock-\d+/g) ?? [];
const modules = await Promise.all(MOCK_IDS.map((mockId) => import(`../src/data/mocks/icfes-${mockId}.ts`)));
const { CURRENT_PART_SEVEN } = await import('../src/data/mocks/icfes-current-part-seven.ts');
const normalizerSource = readFileSync('src/data/mocks/normalize-icfes-mock.ts', 'utf8');

const PART_BY_STYLE = { 'matching-grid': 1, 'notices-grid': 2 };
const EXPECTED = { 1: 5, 2: 5, 3: 5, 4: 8, 5: 7, 6: 5, 7: 10 };
const EXPECTED_STYLE = { 1: 'matching-grid', 2: 'notices-grid', 3: 'dialogs-grid', 4: 'cloze-text', 5: 'reading', 6: 'reading', 7: 'cloze-text' };

const checks = [];
function check(id, label, pass, severity, evidence, remediation = '') {
  checks.push({ id, label, pass, severity: pass ? 'pass' : severity, evidence, remediation: pass ? '' : remediation });
}

const normalized = modules.map(({ default: mock }) => {
  const replacement = CURRENT_PART_SEVEN[mock.id];
  const sections = mock.sections.map((section) => section.part === 7 && replacement ? replacement : section).map((section) => {
    const part = PART_BY_STYLE[section.sectionStyle] ?? section.part;
    return { ...section, part, questions: section.questions.map((question) => ({ ...question, part, id: `${mock.id}:${question.id}` })) };
  }).sort((a, b) => a.part - b.part);
  return { ...mock, sections };
});

const rows = normalized.flatMap((mock) => mock.sections.flatMap((section) => section.questions.map((question) => ({ mockId: mock.id, part: section.part, style: section.sectionStyle, passage: section.passage, question }))));

for (const mock of normalized) {
  const mockRows = rows.filter((row) => row.mockId === mock.id);
  check(`${mock.id}-count`, `${mock.id}: 45 preguntas`, mockRows.length === 45, 'critical', `${mockRows.length}/45 preguntas`, 'Restaurar la pregunta faltante o retirar la duplicada.');
  const parts = mock.sections.map((section) => section.part);
  check(`${mock.id}-parts`, `${mock.id}: siete partes en orden`, JSON.stringify(parts) === JSON.stringify([1, 2, 3, 4, 5, 6, 7]), 'critical', `Partes ${parts.join(', ')}`, 'Normalizar el orden y la taxonomía antes de publicar.');
  for (const section of mock.sections) {
    check(`${mock.id}-p${section.part}-count`, `${mock.id} Parte ${section.part}: extensión esperada`, section.questions.length === EXPECTED[section.part], 'high', `${section.questions.length}/${EXPECTED[section.part]} preguntas`, 'Ajustar la sección a la distribución abreviada aprobada.');
    check(`${mock.id}-p${section.part}-style`, `${mock.id} Parte ${section.part}: tipo de tarea`, section.sectionStyle === EXPECTED_STYLE[section.part], 'critical', `${section.sectionStyle} vs ${EXPECTED_STYLE[section.part]}`, 'Sustituir la sección por el tipo de tarea correspondiente al blueprint vigente.');
  }
}

const expectedGrain = normalized.length * 45;
check('total-grain', 'Grano total: una fila por pregunta', rows.length === expectedGrain, 'critical', `${rows.length}/${expectedGrain} preguntas`, 'Reconciliar los bancos antes de habilitar el modo guiado.');
check('unique-ids', 'Identificadores únicos entre mocks', new Set(rows.map((row) => row.question.id)).size === rows.length, 'critical', `${new Set(rows.map((row) => row.question.id)).size}/${rows.length} identificadores únicos`, 'Prefijar cada pregunta con el id del mock.');

const invalidAnswers = rows.filter(({ question }) => !Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length);
check('valid-answers', 'Claves dentro del rango de opciones', invalidAnswers.length === 0, 'critical', `${invalidAnswers.length} claves inválidas`, 'Corregir answer antes de servir la pregunta.');

const duplicateOptions = rows.filter(({ question }) => new Set(question.options.map((option) => option.trim().toLowerCase())).size !== question.options.length);
check('unique-options', 'Opciones distintas dentro de cada pregunta', duplicateOptions.length === 0, 'high', `${duplicateOptions.length} preguntas con opciones duplicadas`, 'Eliminar opciones semántica o textualmente duplicadas.');

const missingPrompt = rows.filter(({ part, question }) => !(question.text?.trim() || (part === 3 && question.stimulus?.trim())));
check('complete-prompts', 'Enunciados o estímulos completos', missingPrompt.length === 0, 'critical', `${missingPrompt.length} preguntas sin contenido evaluable`, 'Añadir el enunciado o estímulo faltante.');

const partSeven = rows.filter((row) => row.part === 7);
const missingMarkers = partSeven.filter(({ passage, question }) => {
  const number = question.text.match(/\((\d+)\)/)?.[1];
  return !number || !passage?.includes(`(${number}) ___`);
});
check('part7-markers', 'Parte 7: cada pregunta apunta a un espacio real', missingMarkers.length === 0, 'critical', `${partSeven.length - missingMarkers.length}/${partSeven.length} espacios vinculados`, 'Alinear número de pregunta, marcador y clave.');

const answerSlots = Math.max(...rows.map(({ question }) => question.options.length));
const answerPositions = Array.from({ length: answerSlots }, (_, position) => ({ position: String.fromCharCode(65 + position), count: rows.filter(({ question }) => question.answer === position).length }));
const maxAnswerShare = Math.max(...answerPositions.map((item) => item.count)) / rows.length;
check('answer-balance', 'Distribución de claves sin patrón dominante', maxAnswerShare <= 0.4, 'medium', answerPositions.map((item) => `${item.position}:${item.count}`).join(' · '), 'Redistribuir claves para evitar que una letra supere 40%.');

const vocabulary = [...new Set(normalized.flatMap((mock) => mock.sections.filter(({ part }) => part === 1).flatMap(({ questions }) => questions.flatMap(({ options }) => options))))];
const missingGlosses = vocabulary.filter((word) => !new RegExp(`\\b${word}:`).test(guidedSource));
check('vocabulary-glosses', 'Vocabulario: significado específico para cada alternativa', missingGlosses.length === 0, 'high', `${vocabulary.length - missingGlosses.length}/${vocabulary.length} términos cubiertos`, 'Añadir glosas semánticas concretas para las palabras faltantes.');

const bannedTemplates = ['pertenece al banco, pero no cumple', 'rompe la concordancia, la categoría gramatical', 'falla al menos una capa de validación', "trap: 'pista parcial'"];
const presentTemplates = bannedTemplates.filter((template) => guidedSource.includes(template));
check('no-generic-feedback', 'Sin plantillas generalistas prohibidas', presentTemplates.length === 0, 'high', presentTemplates.length ? presentTemplates.join(' | ') : '0 patrones prohibidos', 'Sustituir la plantilla por una explicación basada en significado o evidencia.');

check('cloze-substitution', 'Cloze: prueba de sustitución visible', guidedSource.includes('substituteChoice') && guidedSource.includes('Prueba de sustitución'), 'high', 'Motor de sustitución contextual', 'Mostrar la oración resultante con cada alternativa.');
check('reading-evidence', 'Lectura: evidencia localizada a nivel de oración', guidedSource.includes('bestEvidenceSentence'), 'high', 'Selección de oración por coincidencia de términos', 'Evitar usar el pasaje completo como supuesta evidencia.');
check('mode-parity', 'Modo examen y guiado comparten la Parte 7 corregida', normalizerSource.includes('CURRENT_PART_SEVEN') && normalizerSource.includes('sourceSections'), 'critical', 'Sustitución en la frontera común del registro', 'Aplicar la corrección antes de bifurcar por modo.');

const partSummary = Object.keys(EXPECTED).map((partText) => {
  const part = Number(partText);
  const partRows = rows.filter((row) => row.part === part);
  const expected = EXPECTED[part] * normalized.length;
  return { part: `Parte ${part}`, questions: partRows.length, expected, status: partRows.length === expected ? 'Aprobada' : 'Bloqueada' };
});

const failures = checks.filter((item) => !item.pass);
const report = {
  generatedAt: new Date().toISOString(),
  scope: { mocks: normalized.map((mock) => mock.id), questionGrain: rows.length, expectedQuestionGrain: expectedGrain, standard: 'ICFES Saber 11 Inglés 2026-2 · práctica propia abreviada' },
  verdict: failures.some((item) => ['critical', 'high'].includes(item.severity)) ? 'blocked' : failures.length ? 'conditional' : 'approved',
  summary: { checks: checks.length, passed: checks.length - failures.length, failed: failures.length, critical: failures.filter((item) => item.severity === 'critical').length, high: failures.filter((item) => item.severity === 'high').length, medium: failures.filter((item) => item.severity === 'medium').length },
  answerPositions,
  partSummary,
  checks,
};

if (!process.argv.includes('--no-write')) {
  writeFileSync('docs/icfes-guided-editorial-audit.json', `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
assert.equal(report.verdict, 'approved', `Auditoría ICFES bloqueada: ${failures.map((item) => item.id).join(', ')}`);
