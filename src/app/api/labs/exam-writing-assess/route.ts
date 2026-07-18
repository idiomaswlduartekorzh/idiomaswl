import { NextResponse } from 'next/server';
import { LABS_ENABLED, LIMITS, WRITING_ENGINE } from '@/lib/labs/config';
import { checkRateLimit, pruneExpired, WRITING_RULE } from '@/lib/labs/rate-limit';
import { assessWritingFree } from '@/lib/labs/providers/gemini';
import type { InlineImage } from '@/lib/labs/providers/gemini';
import { assessWritingGroq } from '@/lib/labs/providers/groq';
import { assessWritingOpus } from '@/lib/labs/providers/anthropic';
import { assessWritingNvidia } from '@/lib/labs/providers/nvidia';
import type { FullAssessment, LabsError, WritingRubric } from '@/lib/labs/types';

type Engine = 'gemini' | 'groq' | 'nvidia' | 'anthropic';

const IMAGE_MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

/**
 * Descarga la imagen vía HTTP (nunca fs.readFileSync con ruta dinámica —
 * ver el comentario en providers/gemini.ts: eso infló la función a 1.3GB
 * porque el Node File Trace de Vercel no puede resolver rutas dinámicas y
 * empaqueta TODO /public por seguridad). req.url da el origin correcto
 * tanto en local como en producción.
 */
async function fetchInlineImage(imageUrl: string, req: Request): Promise<InlineImage | null> {
  const ext = imageUrl.slice(imageUrl.lastIndexOf('.')).toLowerCase();
  const mimeType = IMAGE_MIME[ext];
  if (!mimeType) return null;

  try {
    const absoluteUrl = new URL(imageUrl, req.url);
    const res = await fetch(absoluteUrl);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return { mimeType, data: buf.toString('base64') };
  } catch (err) {
    console.error('[labs/exam-writing-assess] no se pudo descargar la imagen', imageUrl, err);
    return null;
  }
}

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
  getAssignment(mockId: string, taskNumber: TaskNumber): Promise<{ promptText: string; minWords: number; imageUrl?: string } | null>;
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

  const assignment = await adapter.getAssignment(mockId, taskNumber as TaskNumber);
  if (!assignment) {
    return NextResponse.json(
      { code: 'invalid_input', message: 'Este simulacro no tiene esa tarea de Writing.' },
      { status: 400 },
    );
  }

  const task = adapter.taskIdFor(taskNumber as TaskNumber);
  const image = assignment.imageUrl ? (await fetchInlineImage(assignment.imageUrl, req)) ?? undefined : undefined;

  async function callEngine(eng: Engine): Promise<FullAssessment | LabsError> {
    if (eng === 'anthropic') return assessWritingOpus(essay, assignment!.promptText, task, adapter.rubric);
    if (eng === 'nvidia')    return assessWritingNvidia(essay, assignment!.promptText, task, adapter.rubric);
    if (eng === 'groq')      return assessWritingGroq(essay, assignment!.promptText, task, adapter.rubric, image);
    return assessWritingFree(essay, assignment!.promptText, task, adapter.rubric, image);
  }

  // 'auto' (default en producción): Gemini para tareas con gráfico (visión
  // real), Groq para todo lo que es solo texto (más rápido, no se satura
  // tan fácil). Nemotron (NVIDIA) es tercer respaldo SOLO para tareas de
  // solo texto — no tiene visión, así que nunca entra en la cadena de una
  // tarea con gráfico (IELTS Task 1). Con LABS_WRITING_ENGINE forzada, ese
  // motor gana siempre y SIN respaldo — modo de depuración de un solo
  // proveedor.
  const engineChain: Engine[] = WRITING_ENGINE === 'auto'
    ? (image ? ['gemini', 'groq'] : ['groq', 'gemini', 'nvidia'])
    : [WRITING_ENGINE];

  let result = await callEngine(engineChain[0]);
  let engineUsed: Engine = engineChain[0];

  // Solo reintenta con el siguiente motor de la cadena ante saturación/caída
  // del actual — no ante errores de configuración (esos fallarían igual en
  // el respaldo) ni de validación. Si la tarea lleva imagen y toca usar Groq
  // de respaldo, la imagen se manda igual — el frontend marca el aviso de
  // precisión cuando engineUsed no es 'gemini' en una tarea con gráfico.
  for (const nextEngine of engineChain.slice(1)) {
    if (!('code' in result) || (result.code !== 'rate_limited' && result.code !== 'provider_error')) break;
    console.error(`[exam-writing-assess] ${engineUsed} falló (${result.code}), probando respaldo ${nextEngine}`);
    result = await callEngine(nextEngine);
    engineUsed = nextEngine;
  }

  if ('code' in result) {
    const status = result.code === 'rate_limited' ? 429
                 : result.code === 'not_configured' ? 503
                 : 502;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json({ ...result, engineUsed });
}
