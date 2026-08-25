/**
 * Puente de solo lectura hacia los mocks reales de IELTS.
 *
 * Import DINÁMICO del archivo exacto (nunca el getMock() central de
 * @/data/mocks) — ese índice importa estáticamente los ~40+ mocks de TODOS
 * los idiomas, y bundlearlo entero en esta API route infló la función a
 * 1.12GB sin comprimir (límite de Vercel: 250MB), tumbando el deploy. Con
 * import() dinámico, Next solo empaqueta el set-N que realmente se pide.
 *
 * Alcance de revisión: los 20 sets publicados. La disponibilidad gratuita
 * del motor automático de Writing sigue siendo una decisión independiente.
 */

import type { MockExam, SpeakQuestion, WriteQuestion } from '@/data/mocks/types';
import { withIeltsAcademic2026Blueprint } from '@/data/mocks/ielts-academic-2026';

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
  'set-5': () => import('@/data/mocks/ielts-set-5'),
  'set-6': () => import('@/data/mocks/ielts-set-6'),
  'set-7': () => import('@/data/mocks/ielts-set-7'),
  'set-8': () => import('@/data/mocks/ielts-set-8'),
  'set-9': () => import('@/data/mocks/ielts-set-9'),
  'set-10': () => import('@/data/mocks/ielts-set-10'),
  'set-11': () => import('@/data/mocks/ielts-set-11'),
  'set-12': () => import('@/data/mocks/ielts-set-12'),
  'set-13': () => import('@/data/mocks/ielts-set-13'),
  'set-14': () => import('@/data/mocks/ielts-set-14'),
  'set-15': () => import('@/data/mocks/ielts-set-15'),
  'set-16': () => import('@/data/mocks/ielts-set-16'),
  'set-17': () => import('@/data/mocks/ielts-set-17'),
  'set-18': () => import('@/data/mocks/ielts-set-18'),
  'set-19': () => import('@/data/mocks/ielts-set-19'),
  'set-20': () => import('@/data/mocks/ielts-set-20'),
};

const FREE_WRITING_MOCKS = new Set(['set-1', 'set-2', 'set-3', 'set-4']);

export interface IeltsSpeakingAssignmentItem {
  questionId: string;
  partNumber: number;
  prompt: string;
  cueCard?: string;
  followUp?: string[];
}

export function isFreeIeltsMock(mockId: string): boolean {
  return FREE_WRITING_MOCKS.has(mockId);
}

export function isReviewableIeltsMock(mockId: string): boolean {
  return mockId in SET_LOADERS;
}

export async function loadIeltsMock(mockId: string): Promise<MockExam | null> {
  const loader = SET_LOADERS[mockId];
  if (!loader) return null;
  const authoredMock = (await loader()).default;
  const setNumber = Number(mockId.replace(/^set-/, ''));

  // Sets 4–20 are transformed before they reach the browser (MCQ positions,
  // audited Reading length and Listening release state). The submission
  // server must use the exact same projection or a visually correct answer
  // can be scored against a different option index. Keeping this here also
  // prevents unreleased Listening sections from producing a false Band 1.
  return Number.isInteger(setNumber) && setNumber >= 4 && setNumber <= 20
    ? withIeltsAcademic2026Blueprint(authoredMock)
    : authoredMock;
}

async function findWriteQuestion(mockId: string, taskNumber: 1 | 2): Promise<WriteQuestion | null> {
  if (!isReviewableIeltsMock(mockId)) return null;

  const mock = await loadIeltsMock(mockId);
  if (!mock) return null;
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
  if (!isReviewableIeltsMock(mockId)) return null;

  const mock = await loadIeltsMock(mockId);
  if (!mock) return null;
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
