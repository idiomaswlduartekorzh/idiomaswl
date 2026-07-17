/**
 * Puente de solo lectura hacia los mocks reales de TOEFL. Mismo principio
 * que exam-bridge/ielts.ts: import() dinámico del set exacto, nunca el
 * getMock() central (bundlearía los ~40+ mocks de todos los idiomas en esta
 * API route — ver el comentario largo en exam-bridge/ielts.ts).
 *
 * A diferencia de IELTS, aquí NO hay imagen (TOEFL Writing no tiene
 * gráficos) y stimulusLabel es solo un encabezado genérico ("Integrated
 * Writing Task") — el contenido real vive siempre en stimulus.
 */

import type { MockExam, WriteQuestion } from '@/data/mocks/types';
import type { ToeflTask } from '../rubrics/toefl-writing';

export interface ToeflWritingAssignment {
  promptText: string;
  minWords:   number;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1': () => import('@/data/mocks/toefl-set-1'),
  'set-2': () => import('@/data/mocks/toefl-set-2'),
  'set-3': () => import('@/data/mocks/toefl-set-3'),
  'set-4': () => import('@/data/mocks/toefl-set-4'),
};

export function isFreeToeflMock(mockId: string): boolean {
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

export async function getToeflWritingAssignment(
  mockId: string,
  task: ToeflTask,
): Promise<ToeflWritingAssignment | null> {
  const taskNumber = task === 'integrated' ? 1 : 2;
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
