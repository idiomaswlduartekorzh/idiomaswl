/**
 * Puente de solo lectura hacia los mocks reales de IELTS.
 *
 * Nunca importa un archivo ielts-set-N.ts directamente — pasa siempre por
 * getMock(), el mismo accesor que usa IELTSPracticeClient.tsx. Así el motor
 * de corrección queda anclado a la asignación real del examen y no puede
 * evaluar contra una consigna que el cliente inventó.
 *
 * Alcance actual: IELTS Academic, sets 1-4 (los únicos free:true en
 * EXAMS['ielts']). Ver GOAL: Motor de corrección personalizado por examen.
 */

import { getMock } from '@/data/mocks';
import type { WriteQuestion } from '@/data/mocks/types';

export interface IeltsWritingAssignment {
  /** Consigna completa tal como la ve el estudiante en el examen real. */
  promptText: string;
  /** Ruta pública de la imagen del gráfico (solo Task 1 Academic). */
  imageUrl?: string;
  minWords: number;
}

const FREE_MOCK_IDS = ['set-1', 'set-2', 'set-3', 'set-4'] as const;

export function isFreeIeltsMock(mockId: string): boolean {
  return (FREE_MOCK_IDS as readonly string[]).includes(mockId);
}

function findWriteQuestion(mockId: string, taskNumber: 1 | 2): WriteQuestion | null {
  const mock = getMock('ielts', mockId);
  if (!mock) return null;

  for (const section of mock.sections) {
    if (section.skill !== 'writing') continue;
    for (const q of section.questions) {
      if (q.type === 'write' && q.taskNumber === taskNumber) return q;
    }
  }
  return null;
}

/**
 * Arma la asignación de una tarea de Writing de un mock real.
 * Devuelve null si el mock/tarea no existe (mockId inválido, o el set no
 * tiene Writing todavía).
 */
export function getIeltsWritingAssignment(
  mockId: string,
  taskNumber: 1 | 2,
): IeltsWritingAssignment | null {
  const q = findWriteQuestion(mockId, taskNumber);
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
