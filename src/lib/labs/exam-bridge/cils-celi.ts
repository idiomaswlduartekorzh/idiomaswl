/**
 * Puente de solo lectura hacia los mocks reales de CILS/CELI. Mismo
 * principio que exam-bridge/toefl.ts: import() dinámico del set exacto,
 * nunca el getMock() central (ver el comentario largo en exam-bridge/ielts.ts).
 */

import type { MockExam, WriteQuestion } from '@/data/mocks/types';
import type { CilsCeliTask } from '../rubrics/cils-celi-writing';

export interface CilsCeliWritingAssignment {
  promptText: string;
  minWords:   number;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1': () => import('@/data/mocks/cils-celi-set-1'),
};

export function isFreeCilsCeliMock(mockId: string): boolean {
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

export async function getCilsCeliWritingAssignment(
  mockId: string,
  task: CilsCeliTask,
): Promise<CilsCeliWritingAssignment | null> {
  const taskNumber = task === 'produzione1' ? 1 : 2;
  const q = await findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
