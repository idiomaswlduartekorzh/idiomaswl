/**
 * Puente de solo lectura hacia los mocks reales de IELTS.
 *
 * Import DINÁMICO del archivo exacto (nunca el getMock() central de
 * @/data/mocks) — ese índice importa estáticamente los ~40+ mocks de TODOS
 * los idiomas, y bundlearlo entero en esta API route infló la función a
 * 1.12GB sin comprimir (límite de Vercel: 250MB), tumbando el deploy. Con
 * import() dinámico, Next solo empaqueta el set-N que realmente se pide.
 *
 * Alcance actual: IELTS Academic, sets 1-4 (los únicos free:true en
 * EXAMS['ielts']). Ver GOAL: Motor de corrección personalizado por examen.
 */

import type { MockExam, SpeakQuestion, WriteQuestion } from '@/data/mocks/types';

export interface IeltsWritingAssignment {
  /** Consigna completa tal como la ve el estudiante en el examen real. */
  promptText: string;
  /** Ruta pública de la imagen del gráfico (solo Task 1 Academic). */
  imageUrl?: string;
  minWords: number;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1': () => import('@/data/mocks/ielts-set-1'),
  'set-2': () => import('@/data/mocks/ielts-set-2'),
  'set-3': () => import('@/data/mocks/ielts-set-3'),
  'set-4': () => import('@/data/mocks/ielts-set-4'),
};

export interface IeltsSpeakingAssignmentItem {
  questionId: string;
  partNumber: number;
  prompt: string;
  cueCard?: string;
  followUp?: string[];
}

export function isFreeIeltsMock(mockId: string): boolean {
  return mockId in SET_LOADERS;
}

async function findWriteQuestion(mockId: string, taskNumber: 1 | 2): Promise<WriteQuestion | null> {
  const loader = SET_LOADERS[mockId];
  if (!loader) return null;

  const { default: mock } = await loader();
  for (const section of mock.sections) {
    if (section.skill !== 'writing') continue;
    for (const q of section.questions) {
      if (q.type === 'write' && q.taskNumber === taskNumber) return q;
    }
  }
  return null;
}

function isSpeakQuestion(question: MockExam['sections'][number]['questions'][number]): question is SpeakQuestion {
  return question.type === 'speak';
}

export async function getIeltsSpeakingAssignment(mockId: string): Promise<IeltsSpeakingAssignmentItem[] | null> {
  const loader = SET_LOADERS[mockId];
  if (!loader) return null;

  const { default: mock } = await loader();
  const speaking = mock.sections
    .filter(section => section.skill === 'speaking')
    .flatMap(section => section.questions)
    .filter(isSpeakQuestion)
    .map(question => ({
      questionId: question.id,
      partNumber: question.partNumber,
      prompt: question.text,
      cueCard: question.cueCard,
      followUp: question.followUp,
    }));

  return speaking.length > 0 ? speaking : null;
}

/**
 * Arma la asignación de una tarea de Writing de un mock real.
 * Devuelve null si el mock/tarea no existe (mockId inválido, o el set no
 * tiene Writing todavía).
 */
export async function getIeltsWritingAssignment(
  mockId: string,
  taskNumber: 1 | 2,
): Promise<IeltsWritingAssignment | null> {
  const q = await findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  // Task 1 (gráfico): la consigna vive en stimulusLabel; stimulus queda vacío.
  // Task 2: la consigna vive en stimulus. Algunos sets (p.ej. set-4) ADEMÁS
  // ponen un stimulusLabel genérico tipo "Write about the following topic:"
  // — es una entradilla, no la pregunta. NUNCA reemplaza a stimulus en Task 2,
  // o el motor evaluaría contra una consigna vacía de contenido.
  const consigna = taskNumber === 1
    ? (q.stimulusLabel || q.stimulus)
    : (q.stimulusLabel ? `${q.stimulusLabel}\n${q.stimulus}` : q.stimulus);

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    imageUrl:   q.imageUrl,
    minWords:   q.minWords,
  };
}
