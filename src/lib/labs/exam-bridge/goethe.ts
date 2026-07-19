/**
 * Puente de solo lectura hacia los mocks reales de Goethe-Zertifikat. Mismo
 * principio que exam-bridge/toefl.ts: import() dinámico del set exacto,
 * nunca el getMock() central (ver el comentario largo en exam-bridge/ielts.ts).
 *
 * El mock actual (set-1) solo tiene UNA tarea de Schreiben (taskNumber 1) —
 * a diferencia de IELTS/TOEFL/Cambridge no hay Task 2 todavía.
 */

import type { MockExam, WriteQuestion } from '@/data/mocks/types';
import type { GoetheTask } from '../rubrics/goethe-writing';

export interface GoetheWritingAssignment {
  promptText: string;
  minWords:   number;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1': () => import('@/data/mocks/goethe-set-1'),
};

export function isFreeGoetheMock(mockId: string): boolean {
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

export async function getGoetheWritingAssignment(
  mockId: string,
  _task: GoetheTask,
): Promise<GoetheWritingAssignment | null> {
  const q = await findWriteQuestion(mockId, 1);
  if (!q) return null;

  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
