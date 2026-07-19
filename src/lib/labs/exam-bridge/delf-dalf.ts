/**
 * Puente de solo lectura hacia los mocks reales de DELF/DALF. Mismo
 * principio que exam-bridge/toefl.ts: import() dinámico del set exacto,
 * nunca el getMock() central (ver el comentario largo en exam-bridge/ielts.ts).
 *
 * A diferencia de las demás familias, el NIVEL (B1 vs B2) varía por set, no
 * es fijo para toda la familia — delf-dalf-set-1 y set-2 son B1, b2-set-1 es
 * B2. levelForDelfDalfMock() expone ese nivel para que route.ts arme el
 * task id semántico correcto (ver rubrics/delf-dalf-writing.ts).
 *
 * Los sets también difieren en cuántas tareas de Writing tienen: set-1 (B1)
 * tiene 2, set-2 (B1) y b2-set-1 (B2) tienen solo 1 — getAssignment()
 * devuelve null para la tarea que no existe en ese set, como siempre.
 */

import type { MockExam, WriteQuestion } from '@/data/mocks/types';
import type { DelfDalfLevel } from '../rubrics/delf-dalf-writing';

export interface DelfDalfWritingAssignment {
  promptText: string;
  minWords:   number;
}

const SET_LOADERS: Record<string, () => Promise<{ default: MockExam }>> = {
  'set-1':    () => import('@/data/mocks/delf-dalf-set-1'),
  'set-2':    () => import('@/data/mocks/delf-b1-set-2'),
  'b2-set-1': () => import('@/data/mocks/delf-b2-set-1'),
};

const LEVEL_BY_SET: Record<string, DelfDalfLevel> = {
  'set-1':    'b1',
  'set-2':    'b1',
  'b2-set-1': 'b2',
};

export function isFreeDelfDalfMock(mockId: string): boolean {
  return mockId in SET_LOADERS;
}

/** Nivel real (B1/B2) de un set — usado por route.ts para elegir la rúbrica. */
export function levelForDelfDalfMock(mockId: string): DelfDalfLevel {
  return LEVEL_BY_SET[mockId] ?? 'b1';
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

export async function getDelfDalfWritingAssignment(
  mockId: string,
  taskNumber: 1 | 2,
): Promise<DelfDalfWritingAssignment | null> {
  const q = await findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
