import type {
  IcfesAutomaticFeedbackAreaDto,
  IcfesAutomaticFeedbackDto,
  IcfesAutomaticQuestionFeedbackDto,
  IcfesBasicResultDto,
  IcfesBreakdownRow,
  IcfesPremiumQuestionDto,
} from './attempt-contract.ts';

export const ICFES_AUTOMATIC_FEEDBACK_VERSION = 'icfes-automatic-feedback-v1' as const;

function bandFor(percentage: number): IcfesAutomaticFeedbackAreaDto['band'] {
  if (percentage >= 80) return 'solid';
  if (percentage >= 60) return 'developing';
  return 'priority';
}

function areaFeedback(row: IcfesBreakdownRow): IcfesAutomaticFeedbackAreaDto {
  const band = bandFor(row.percentage);
  const message = band === 'solid'
    ? `Acertaste ${row.correct} de ${row.total}. Conserva este criterio y comprueba cada respuesta con la evidencia.`
    : band === 'developing'
      ? `Acertaste ${row.correct} de ${row.total}. Revisa las preguntas falladas para volver más estable este desempeño.`
      : `Acertaste ${row.correct} de ${row.total}. Empieza por las preguntas falladas de esta área y contrasta cada opción con la evidencia.`;
  return { ...row, band, message };
}

function compareAscending(a: IcfesBreakdownRow, b: IcfesBreakdownRow): number {
  return a.percentage - b.percentage
    || (a.key === b.key ? 0 : a.key < b.key ? -1 : 1)
    || (a.label === b.label ? 0 : a.label < b.label ? -1 : 1);
}

function compareDescending(a: IcfesBreakdownRow, b: IcfesBreakdownRow): number {
  return b.percentage - a.percentage
    || (a.key === b.key ? 0 : a.key < b.key ? -1 : 1)
    || (a.label === b.label ? 0 : a.label < b.label ? -1 : 1);
}

function questionFeedback(
  question: IcfesPremiumQuestionDto,
  skillByPart: ReadonlyMap<string, string>,
): IcfesAutomaticQuestionFeedbackDto {
  const skill = skillByPart.get(String(question.part)) ?? `Parte ${question.part}`;
  const answerContrast = question.selectedOption === null
    ? `No registraste respuesta; la respuesta válida es “${question.correctOption}”.`
    : `Elegiste “${question.selectedOption}”; la respuesta válida es “${question.correctOption}”.`;
  return {
    questionId: question.id,
    number: question.number,
    part: question.part,
    skill,
    prompt: question.prompt,
    guidance: `${answerContrast} ${question.rationale}`,
  };
}

/**
 * Builds paid feedback exclusively from the persisted score breakdown and the
 * premium question rows already reconstructed by the secure grading registry.
 * It has no clock, randomness, model call or mutable external dependency.
 */
export function buildIcfesAutomaticFeedback(
  result: IcfesBasicResultDto,
  questions: readonly IcfesPremiumQuestionDto[],
): IcfesAutomaticFeedbackDto {
  const skillRows = result.bySkill.filter((row) => row.total > 0);
  const ascendingSkills = [...skillRows].sort(compareAscending);
  const strongestAreas = [...skillRows]
    .filter((row) => row.percentage >= 70)
    .sort(compareDescending)
    .slice(0, 2)
    .map(areaFeedback);
  const priorityAreas = ascendingSkills
    .filter((row) => row.percentage < 70)
    .slice(0, 2)
    .map(areaFeedback);
  const skillByPart = new Map(skillRows.map((row) => [row.key, row.label]));
  const missedQuestions = questions
    .filter((question) => !question.correct)
    .map((question) => questionFeedback(question, skillByPart));
  const strongest = strongestAreas[0]?.label;
  const priority = priorityAreas[0]?.label;
  const context = strongest && priority
    ? `Tu mejor área fue ${strongest}; la prioridad inmediata es ${priority}.`
    : strongest
      ? `Tu desempeño más estable estuvo en ${strongest}.`
      : priority
        ? `La prioridad inmediata es ${priority}.`
        : 'No hay suficientes áreas calificadas para comparar fortalezas y prioridades.';
  const headline = result.percentage >= 80
    ? 'Desempeño sólido'
    : result.percentage >= 60
      ? 'Base en desarrollo'
      : 'Hay bases por reforzar';

  return Object.freeze({
    version: ICFES_AUTOMATIC_FEEDBACK_VERSION,
    headline,
    summary: `Obtuviste ${result.correct} de ${result.total} respuestas correctas (${result.percentage}%). ${context}`,
    strongestAreas: Object.freeze(strongestAreas),
    priorityAreas: Object.freeze(priorityAreas),
    partFeedback: Object.freeze(result.byPart.filter((row) => row.total > 0).map(areaFeedback)),
    questionFeedback: Object.freeze(missedQuestions),
  });
}
