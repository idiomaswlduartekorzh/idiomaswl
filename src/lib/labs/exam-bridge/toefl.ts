/**
 * Puente de solo lectura hacia los mocks reales de TOEFL. Mismo principio
 * que exam-bridge/ielts.ts: nunca importa un archivo toefl-set-N.ts
 * directamente, siempre pasa por getMock().
 *
 * A diferencia de IELTS, aquí NO hay imagen (TOEFL Writing no tiene
 * gráficos) y stimulusLabel es solo un encabezado genérico ("Integrated
 * Writing Task") — el contenido real vive siempre en stimulus.
 */

import { getMock } from '@/data/mocks';
import type { WriteQuestion } from '@/data/mocks/types';
import type { ToeflTask } from '../rubrics/toefl-writing';

export interface ToeflWritingAssignment {
  promptText: string;
  minWords:   number;
}

const FREE_MOCK_IDS = ['set-1', 'set-2', 'set-3', 'set-4'] as const;

export function isFreeToeflMock(mockId: string): boolean {
  return (FREE_MOCK_IDS as readonly string[]).includes(mockId);
}

function findWriteQuestion(mockId: string, taskNumber: 1 | 2): WriteQuestion | null {
  const mock = getMock('toefl', mockId);
  if (!mock) return null;

  for (const section of mock.sections) {
    if (section.skill !== 'writing') continue;
    for (const q of section.questions) {
      if (q.type === 'write' && q.taskNumber === taskNumber) return q;
    }
  }
  return null;
}

export function getToeflWritingAssignment(
  mockId: string,
  task: ToeflTask,
): ToeflWritingAssignment | null {
  const taskNumber = task === 'integrated' ? 1 : 2;
  const q = findWriteQuestion(mockId, taskNumber);
  if (!q) return null;

  // Aquí stimulusLabel SIEMPRE es un encabezado genérico, nunca reemplaza a
  // stimulus (al revés que Task 1 de IELTS, donde stimulusLabel es la consigna).
  const consigna = q.stimulusLabel ? `${q.stimulusLabel}\n\n${q.stimulus}` : q.stimulus;

  return {
    promptText: `${consigna}\n\n${q.text}`.trim(),
    minWords:   q.minWords,
  };
}
