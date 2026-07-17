/**
 * Puente de solo lectura hacia los mocks reales de Cambridge B2 First.
 * Mismo principio que los demás bridges: import() dinámico del set exacto,
 * nunca el getMock() central (ver el comentario largo en exam-bridge/ielts.ts
 * — bundlear los ~40+ mocks de todos los idiomas en esta API route fue lo
 * que infló la función a 1.12GB y tumbó el deploy).
 *
 * set-1 vive en su propio archivo; set-2..set-10 son exports nombrados de
 * cambridge-b2-original-sets.ts (generados por plantilla) — un solo import
 * dinámico de ese archivo sirve para cualquiera de esos 9 sets.
 *
 * Part 2 trae las TRES opciones (article/email/review) dentro del mismo
 * stimulus — el estudiante solo entrega una. El bridge manda la consigna
 * completa (las tres) porque el propio enunciado del examen las incluye así;
 * es la rúbrica (cambridge-b2-writing.ts) la que le indica al modelo cómo
 * identificar cuál eligió el estudiante y evaluar solo esa.
 */

import type { MockExam, WriteQuestion } from '@/data/mocks/types';
import type { CambridgeTask } from '../rubrics/cambridge-b2-writing';

export interface CambridgeWritingAssignment {
  promptText: string;
  minWords:   number;
}

const SET_LOADERS: Record<string, () => Promise<MockExam>> = {
  'set-1':  async () => (await import('@/data/mocks/cambridge-b2-set-1')).default,
  'set-2':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set2,
  'set-3':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set3,
  'set-4':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set4,
  'set-5':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set5,
  'set-6':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set6,
  'set-7':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set7,
  'set-8':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set8,
  'set-9':  async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set9,
  'set-10': async () => (await import('@/data/mocks/cambridge-b2-original-sets')).cambridgeB2Set10,
};

export function isFreeCambridgeMock(mockId: string): boolean {
  return mockId in SET_LOADERS;
}

async function findWriteQuestion(mockId: string, taskNumber: 1 | 2): Promise<WriteQuestion | null> {
  const loader = SET_LOADERS[mockId];
  if (!loader) return null;

  const mock = await loader();
  for (const section of mock.sections) {
    if (section.skill !== 'writing') continue;
    for (const q of section.questions) {
      if (q.type === 'write' && q.taskNumber === taskNumber) return q;
    }
  }
  return null;
}

export async function getCambridgeWritingAssignment(
  mockId: string,
  task: CambridgeTask,
): Promise<CambridgeWritingAssignment | null> {
  const taskNumber = task === 'essay' ? 1 : 2;
  const q = await findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
