export const ICFES_TEACHER_RUBRIC_VERSION = 'icfes-teacher-rubric-2026-09-09-v1' as const;
export const ICFES_TEACHER_RUBRIC = Object.freeze({
  version: ICFES_TEACHER_RUBRIC_VERSION,
  scope: 'one-completed-owned-icfes-attempt',
  disclaimer: 'Retroalimentación pedagógica de WeLearn; no es un resultado ni una calificación oficial del ICFES.',
  criteria: Object.freeze([
    {
      id: 'evidence-use',
      weight: 30,
      label: 'Uso de evidencia',
      requirement: 'Relaciona cada patrón priorizado con respuestas y explicaciones del intento, sin inventar claves.',
    },
    {
      id: 'error-patterns',
      weight: 30,
      label: 'Diagnóstico de errores',
      requirement: 'Agrupa errores por habilidad y distingue una brecha recurrente de un error aislado.',
    },
    {
      id: 'actionability',
      weight: 25,
      label: 'Acciones de mejora',
      requirement: 'Propone acciones concretas, priorizadas y realizables con el material disponible.',
    },
    {
      id: 'clarity-and-safety',
      weight: 15,
      label: 'Claridad y límites',
      requirement: 'Usa lenguaje claro, evita datos innecesarios y no presenta la retroalimentación como oficial.',
    },
  ]),
  requiredOutput: Object.freeze([
    'summary',
    'evidence-backed-patterns',
    'three-priority-actions',
    'next-practice-recommendation',
    'non-official-disclaimer',
  ]),
  qaStopConditions: Object.freeze([
    'missing-attempt-evidence',
    'answer-key-override-without-adjudication',
    'official-score-claim',
    'unnecessary-personal-data',
    'missing-priority-actions',
  ]),
} as const);
