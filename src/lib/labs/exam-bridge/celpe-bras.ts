/**
 * Puente de solo lectura hacia los mocks reales de CELPE-Bras. Mismo
 * principio que exam-bridge/toefl.ts: import() dinámico del set exacto,
 * nunca el getMock() central (ver el comentario largo en exam-bridge/ielts.ts).
 *
 * OJO — a diferencia de TODAS las demás familias, acá buscamos por
 * section.part (1-4), NO por q.taskNumber. El campo taskNumber de este mock
 * se repite (1,2,1,2) porque nunca se diseñó pensando en 4 tareas — es un
 * campo genérico del tipo WriteQuestion compartido con IELTS/TOEFL/etc.,
 * no algo específico de CELPE-Bras. part sí es único por tarea (1,2,3,4) y
 * es la señal correcta para ubicar cada una de las 4 producciones reales.
 */

import type { MockExam, WriteQuestion } from '@/data/mocks/types';
import type { CelpeBrasTask } from '../rubrics/celpe-bras-writing';

export interface CelpeBrasWritingAssignment {
  promptText: string;
  minWords:   number;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1': () => import('@/data/mocks/celpe-bras-set-1'),
};

export function isFreeCelpeBrasMock(mockId: string): boolean {
  return mockId in SET_LOADERS;
}

const PART_BY_TASK: Record<CelpeBrasTask, number> = {
  tarefa1: 1,
  tarefa2: 2,
  tarefa3: 3,
  tarefa4: 4,
};

async function findWriteQuestion(mockId: string, part: number): Promise<WriteQuestion | null> {
  const loader = SET_LOADERS[mockId];
  if (!loader) return null;

  const { default: mock } = await loader();
  for (const section of mock.sections) {
    if (section.skill !== 'writing' || section.part !== part) continue;
    for (const q of section.questions) {
      if (q.type === 'write') return q;
    }
  }
  return null;
}

export async function getCelpeBrasWritingAssignment(
  mockId: string,
  task: CelpeBrasTask,
): Promise<CelpeBrasWritingAssignment | null> {
  const q = await findWriteQuestion(mockId, PART_BY_TASK[task]);
  if (!q) return null;

  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
