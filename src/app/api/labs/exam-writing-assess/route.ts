import { NextResponse } from 'next/server';
import { LABS_ENABLED, LIMITS, WRITING_ENGINE } from '@/lib/labs/config';
import { checkRateLimit, pruneExpired, WRITING_RULE } from '@/lib/labs/rate-limit';
import { assessWritingFree } from '@/lib/labs/providers/gemini';
import { assessWritingGroq } from '@/lib/labs/providers/groq';
import { assessWritingOpus } from '@/lib/labs/providers/anthropic';
import type { FreeAssessment, LabsError, WritingRubric } from '@/lib/labs/types';

import { getIeltsWritingAssignment, isFreeIeltsMock } from '@/lib/labs/exam-bridge/ielts';
import { ieltsWritingRubric } from '@/lib/labs/rubrics/ielts-writing';

import { getToeflWritingAssignment, isFreeToeflMock } from '@/lib/labs/exam-bridge/toefl';
import { toeflWritingRubric } from '@/lib/labs/rubrics/toefl-writing';

import { getCambridgeWritingAssignment, isFreeCambridgeMock } from '@/lib/labs/exam-bridge/cambridge';
import { cambridgeB2WritingRubric } from '@/lib/labs/rubrics/cambridge-b2-writing';

/**
 * Motor de corrección PERSONALIZADO POR EXAMEN. A diferencia de
 * /api/labs/writing-assess (el prototipo, donde el cliente manda la consigna
 * libremente), aquí el cliente solo manda examSlug + mockId + taskNumber +
 * su ensayo. La consigna real (y la imagen del gráfico si aplica) la resuelve
 * el servidor desde los mocks oficiales — el estudiante no puede alterarla.
 *
 * Contrato uniforme para las 3 familias: taskNumber siempre 1|2 desde el
 * cliente. Cada adaptador lo traduce a su propio task id semántico
 * (IELTS: task1-academic/task2 · TOEFL: integrated/academic-discussion ·
 * Cambridge: essay/part2) y aporta su propia rúbrica — nunca se comparten.
 */

type TaskNumber = 1 | 2;

interface ExamAdapter {
  isFreeMock(mockId: string): boolean;
  getAssignment(mockId: string, taskNumber: TaskNumber): { promptText: string; minWords: number; imageUrl?: string } | null;
  rubric: WritingRubric<string>;
  taskIdFor(taskNumber: TaskNumber): string;
}

const ADAPTERS: Record<string, ExamAdapter> = {
  ielts: {
    isFreeMock: isFreeIeltsMock,
    getAssignment: getIeltsWritingAssignment,
    rubric: ieltsWritingRubric,
    taskIdFor: (n) => (n === 1 ? 'task1-academic' : 'task2'),
  },
  toefl: {
    isFreeMock: isFreeToeflMock,
    getAssignment: (mockId, n) => getToeflWritingAssignment(mockId, n === 1 ? 'integrated' : 'academic-discussion'),
    rubric: toeflWritingRubric,
    taskIdFor: (n) => (n === 1 ? 'integrated' : 'academic-discussion'),
  },
  'cambridge-b2': {
    isFreeMock: isFreeCambridgeMock,
    getAssignment: (mockId, n) => getCambridgeWritingAssignment(mockId, n === 1 ? 'essay' : 'part2'),
    rubric: cambridgeB2WritingRubric,
    taskIdFor: (n) => (n === 1 ? 'essay' : 'part2'),
  },
};

const VALID_TASK_NUMBERS: TaskNumber[] = [1, 2];

export const maxDuration = 120;

export async function POST(req: Request) {
  if (!LABS_ENABLED) return new NextResponse(null, { status: 404 });

  pruneExpired();

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip, WRITING_RULE)) {
    return NextResponse.json(
      { code: 'rate_limited', message: 'Demasiadas evaluaciones seguidas. Espera un minuto.' },
      { status: 429 },
    );
  }

  let payload: { examSlug?: unknown; mockId?: unknown; taskNumber?: unknown; essay?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ code: 'invalid_input', message: 'JSON inválido.' }, { status: 400 });
  }

  const examSlug   = typeof payload.examSlug === 'string' ? payload.examSlug : '';
  const mockId     = typeof payload.mockId === 'string' ? payload.mockId : '';
  const taskNumber = payload.taskNumber;
  const essay      = typeof payload.essay === 'string' ? payload.essay.trim() : '';

  const adapter = ADAPTERS[examSlug];
  if (!adapter) {
    return NextResponse.json(
      { code: 'invalid_input', message: 'Este examen todavía no tiene motor de corrección propio.' },
      { status: 400 },
    );
  }
  if (!adapter.isFreeMock(mockId)) {
    return NextResponse.json(
      { code: 'invalid_input', message: 'Este simulacro todavía no tiene motor de corrección propio.' },
      { status: 400 },
    );
  }
  if (!VALID_TASK_NUMBERS.includes(taskNumber as TaskNumber)) {
    return NextResponse.json({ code: 'invalid_input', message: 'taskNumber inválido.' }, { status: 400 });
  }
  if (essay.length < LIMITS.minEssayChars) {
    return NextResponse.json(
      { code: 'invalid_input', message: `El ensayo es muy corto (mínimo ${LIMITS.minEssayChars} caracteres).` },
      { status: 400 },
    );
  }
  if (essay.length > LIMITS.maxEssayChars) {
    return NextResponse.json(
      { code: 'invalid_input', message: `El ensayo excede ${LIMITS.maxEssayChars} caracteres.` },
      { status: 400 },
    );
  }

  const assignment = adapter.getAssignment(mockId, taskNumber as TaskNumber);
  if (!assignment) {
    return NextResponse.json(
      { code: 'invalid_input', message: 'Este simulacro no tiene esa tarea de Writing.' },
      { status: 400 },
    );
  }

  const task = adapter.taskIdFor(taskNumber as TaskNumber);

  // 'auto' (default en producción): Gemini para tareas con gráfico (visión
  // real), Groq para todo lo que es solo texto (más rápido, no se satura
  // tan fácil). Con LABS_WRITING_ENGINE forzada, ese motor gana siempre —
  // solo para pruebas.
  const engine = WRITING_ENGINE === 'auto'
    ? (assignment.imageUrl ? 'gemini' : 'groq')
    : WRITING_ENGINE;

  const result: FreeAssessment | LabsError = engine === 'anthropic'
    ? await assessWritingOpus(essay, assignment.promptText, task, adapter.rubric)
    : engine === 'groq'
    ? await assessWritingGroq(essay, assignment.promptText, task, adapter.rubric, assignment.imageUrl)
    : await assessWritingFree(essay, assignment.promptText, task, adapter.rubric, assignment.imageUrl);

  if ('code' in result) {
    const status = result.code === 'rate_limited' ? 429
                 : result.code === 'not_configured' ? 503
                 : 502;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
