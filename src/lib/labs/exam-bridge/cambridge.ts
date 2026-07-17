/**
 * Puente de solo lectura hacia los mocks reales de Cambridge B2 First.
 * Mismo principio que los demás bridges: nunca importa un archivo
 * cambridge-b2-set-N directamente, siempre pasa por getMock().
 *
 * Part 2 trae las TRES opciones (article/email/review) dentro del mismo
 * stimulus — el estudiante solo entrega una. El bridge manda la consigna
 * completa (las tres) porque el propio enunciado del examen las incluye así;
 * es la rúbrica (cambridge-b2-writing.ts) la que le indica al modelo cómo
 * identificar cuál eligió el estudiante y evaluar solo esa.
 */

import { getMock } from '@/data/mocks';
import type { WriteQuestion } from '@/data/mocks/types';
import type { CambridgeTask } from '../rubrics/cambridge-b2-writing';

export interface CambridgeWritingAssignment {
  promptText: string;
  minWords:   number;
}

const FREE_MOCK_IDS = [
  'set-1', 'set-2', 'set-3', 'set-4', 'set-5',
  'set-6', 'set-7', 'set-8', 'set-9', 'set-10',
] as const;

export function isFreeCambridgeMock(mockId: string): boolean {
  return (FREE_MOCK_IDS as readonly string[]).includes(mockId);
}

function findWriteQuestion(mockId: string, taskNumber: 1 | 2): WriteQuestion | null {
  const mock = getMock('cambridge-b2', mockId);
  if (!mock) return null;

  for (const section of mock.sections) {
    if (section.skill !== 'writing') continue;
    for (const q of section.questions) {
      if (q.type === 'write' && q.taskNumber === taskNumber) return q;
    }
  }
  return null;
}

export function getCambridgeWritingAssignment(
  mockId: string,
  task: CambridgeTask,
): CambridgeWritingAssignment | null {
  const taskNumber = task === 'essay' ? 1 : 2;
  const q = findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
