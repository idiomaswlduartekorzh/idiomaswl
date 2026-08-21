/**
 * Puente de solo lectura hacia los mocks reales de TOEFL. Mismo principio
 * que exam-bridge/ielts.ts: import() dinámico del set exacto, nunca el
 * getMock() central (bundlearía los ~40+ mocks de todos los idiomas en esta
 * API route — ver el comentario largo en exam-bridge/ielts.ts).
 *
 * The exact public 2026 fixed-form content is rebuilt on the server so the
 * submission and correction routes never trust prompts sent by the browser.
 */

import type { MockExam, RepeatQuestion, SpeakQuestion, WriteQuestion } from '@/data/mocks/types';
import { withToefl2026FixedForm } from '@/data/mocks/toefl-fixed-form';
import type { ToeflTask } from '../rubrics/toefl-writing';

export interface ToeflWritingAssignment {
  promptText: string;
  minWords:   number;
}

export interface ToeflSpeakingAssignmentItem {
  questionId: string;
  taskType: 'repeat' | 'interview';
  label: string;
  prompt: string;
  mediaId?: string;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1': () => import('@/data/mocks/toefl-set-1'),
  'set-2': () => import('@/data/mocks/toefl-set-2'),
  'set-3': () => import('@/data/mocks/toefl-set-3'),
  'set-4': () => import('@/data/mocks/toefl-set-4'),
  'set-5': () => import('@/data/mocks/toefl-set-5'),
  'set-6': () => import('@/data/mocks/toefl-set-6'),
  'set-7': () => import('@/data/mocks/toefl-set-7'),
  'set-8': () => import('@/data/mocks/toefl-set-8'),
  'set-9': () => import('@/data/mocks/toefl-set-9'),
  'set-10': () => import('@/data/mocks/toefl-set-10'),
  'set-11': () => import('@/data/mocks/toefl-set-11'),
  'set-12': () => import('@/data/mocks/toefl-set-12'),
  'set-13': () => import('@/data/mocks/toefl-set-13'),
  'set-14': () => import('@/data/mocks/toefl-set-14'),
  'set-15': () => import('@/data/mocks/toefl-set-15'),
  'set-16': () => import('@/data/mocks/toefl-set-16'),
  'set-17': () => import('@/data/mocks/toefl-set-17'),
  'set-18': () => import('@/data/mocks/toefl-set-18'),
  'set-19': () => import('@/data/mocks/toefl-set-19'),
  'set-20': () => import('@/data/mocks/toefl-set-20'),
};

export function isFreeToeflMock(mockId: string): boolean {
  return mockId in SET_LOADERS;
}

export async function loadToeflMock(mockId: string): Promise<MockExam | null> {
  const loader = SET_LOADERS[mockId];
  if (!loader) return null;

  const { default: source } = await loader();
  return withToefl2026FixedForm(source);
}

async function findWriteQuestion(mockId: string, taskNumber: 1 | 2): Promise<WriteQuestion | null> {
  const mock = await loadToeflMock(mockId);
  if (!mock) return null;

  for (const section of mock.sections) {
    if (section.skill !== 'writing') continue;
    for (const q of section.questions) {
      if (q.type === 'write' && q.taskNumber === taskNumber) return q;
    }
  }
  return null;
}

export async function getToeflWritingAssignment(
  mockId: string,
  task: ToeflTask,
): Promise<ToeflWritingAssignment | null> {
  const taskNumber = task === 'write-email' ? 1 : 2;
  const q = await findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  // Aquí stimulusLabel SIEMPRE es un encabezado genérico, nunca reemplaza a
  // stimulus (al revés que Task 1 de IELTS, donde stimulusLabel es la consigna).
  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}

export async function getToeflSpeakingAssignment(mockId: string): Promise<ToeflSpeakingAssignmentItem[] | null> {
  const mock = await loadToeflMock(mockId);
  if (!mock) return null;
  const questions = mock.sections
    .filter(section => section.skill === 'speaking')
    .flatMap(section => section.questions)
    .filter((question): question is RepeatQuestion | SpeakQuestion => question.type === 'repeat' || question.type === 'speak');

  return questions.map(question => question.type === 'repeat' ? {
    questionId: question.id,
    taskType: 'repeat',
    label: `Listen and Repeat ${question.itemNumber}`,
    prompt: question.targetSentence,
    mediaId: question.mediaId,
  } : {
    questionId: question.id,
    taskType: 'interview',
    label: `Take an Interview ${question.partNumber}`,
    prompt: question.text,
    mediaId: question.mediaId,
  });
}
