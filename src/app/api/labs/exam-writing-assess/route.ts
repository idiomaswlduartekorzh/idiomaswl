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

import { getGoetheWritingAssignment, isFreeGoetheMock } from '@/lib/labs/exam-bridge/goethe';
import { goetheWritingRubric } from '@/lib/labs/rubrics/goethe-writing';

import { getCilsCeliWritingAssignment, isFreeCilsCeliMock } from '@/lib/labs/exam-bridge/cils-celi';
import { cilsCeliWritingRubric } from '@/lib/labs/rubrics/cils-celi-writing';

import { getDelfDalfWritingAssignment, isFreeDelfDalfMock, levelForDelfDalfMock } from '@/lib/labs/exam-bridge/delf-dalf';
import { delfDalfWritingRubric } from '@/lib/labs/rubrics/delf-dalf-writing';

import { getCelpeBrasWritingAssignment, isFreeCelpeBrasMock } from '@/lib/labs/exam-bridge/celpe-bras';
import { celpeBrasWritingRubric } from '@/lib/labs/rubrics/celpe-bras-writing';

/**
 * Motor de corrección PERSONALIZADO POR EXAMEN. A diferencia de
 * /api/labs/writing-assess (el prototipo, donde el cliente manda la consigna
 * libremente), aquí el cliente solo manda examSlug + mockId + taskNumber +
 * su ensayo. La consigna real (y la imagen del gráfico si aplica) la resuelve
 * el servidor desde los mocks oficiales — el estudiante no puede alterarla.
 *
 * Contrato uniforme para todas las familias: taskNumber es 1..4 desde el
 * cliente (la mayoría usa solo 1|2; CELPE-Bras usa las 4 — sus 4 tareas de
 * Writing son reales, ver exam-bridge/celpe-bras.ts). Cada adaptador lo
 * traduce a su propio task id semántico (IELTS: task1-academic/task2 ·
 * TOEFL: integrated/academic-discussion · Cambridge: essay/part2) y aporta
 * su propia rúbrica — nunca se comparten. Si un adaptador no tiene esa
 * tarea, su getAssignment() devuelve null ANTES de que se llame
 * taskIdFor() — no hace falta validar cuántas tareas soporta cada uno acá.
 */

type TaskNumber = 1 | 2 | 3 | 4;

interface ExamAdapter {
  isFreeMock(mockId: string): boolean;
  getAssignment(mockId: string, taskNumber: TaskNumber): Promise<{ promptText: string; minWords: number; imageUrl?: string } | null>;
  rubric: WritingRubric<string>;
  /**
   * mockId disponible acá (no solo taskNumber) para familias donde el task
   * id semántico depende del SET, no solo del número de tarea — DELF/DALF
   * usa esto para elegir la rúbrica de nivel B1 vs B2 según el mock, ver
   * exam-bridge/delf-dalf.ts.
   */
  taskIdFor(taskNumber: TaskNumber, mockId: string): string;
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
  goethe: {
    isFreeMock: isFreeGoetheMock,
    // El mock actual solo tiene UNA tarea (siempre 'schreiben') — n se ignora.
    getAssignment: (mockId) => getGoetheWritingAssignment(mockId, 'schreiben'),
    rubric: goetheWritingRubric,
    taskIdFor: () => 'schreiben',
  },
  'cils-celi': {
    isFreeMock: isFreeCilsCeliMock,
    getAssignment: (mockId, n) => getCilsCeliWritingAssignment(mockId, n === 1 ? 'produzione1' : 'produzione2'),
    rubric: cilsCeliWritingRubric,
    taskIdFor: (n) => (n === 1 ? 'produzione1' : 'produzione2'),
  },
  'delf-dalf': {
    isFreeMock: isFreeDelfDalfMock,
    getAssignment: (mockId, n) => getDelfDalfWritingAssignment(mockId, n === 1 ? 1 : 2),
    rubric: delfDalfWritingRubric,
    // El nivel (b1/b2) depende del SET, no del número de tarea — ver
    // exam-bridge/delf-dalf.ts.
    taskIdFor: (_n, mockId) => levelForDelfDalfMock(mockId),
  },
  'celpe-bras': {
    isFreeMock: isFreeCelpeBrasMock,
    getAssignment: (mockId, n) => getCelpeBrasWritingAssignment(mockId, `tarefa${n}` as 'tarefa1' | 'tarefa2' | 'tarefa3' | 'tarefa4'),
    rubric: celpeBrasWritingRubric,
    taskIdFor: (n) => `tarefa${n}`,
  },
};

const VALID_TASK_NUMBERS: TaskNumber[] = [1, 2, 3, 4];

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

  const task = adapter.taskIdFor(taskNumber as TaskNumber, mockId);
  const image = assignment.imageUrl ? (await fetchInlineImage(assignment.imageUrl, req)) ?? undefined : undefined;

  async function callEngine(eng: Engine): Promise<FullAssessment | LabsError> {
    if (eng === 'anthropic') return assessWritingOpus(essay, assignment!.promptText, task, adapter.rubric);
    if (eng === 'nvidia')    return assessWritingNvidia(essay, assignment!.promptText, task, adapter.rubric);
    if (eng === 'groq')      return assessWritingGroq(essay, assignment!.promptText, task, adapter.rubric);
    return assessWritingFree(essay, assignment!.promptText, task, adapter.rubric, image);
  }

  // 'auto' (default en producción): Gemini para tareas con gráfico (visión
  // real), Groq para todo lo que es solo texto (más rápido, no se satura
  // tan fácil). Nemotron (NVIDIA) es tercer respaldo SOLO para tareas de
  // solo texto. Ni Groq ni Nemotron tienen visión viable para nuestro
  // esquema completo (probado con ambos, ver providers/groq.ts) — IELTS
  // Task 1 (el único caso con imagen) se queda solo con Gemini, sin
  // respaldo. Con LABS_WRITING_ENGINE forzada, ese motor gana siempre y
  // SIN respaldo — modo de depuración de un solo proveedor.
  const engineChain: Engine[] = WRITING_ENGINE === 'auto'
    ? (image ? ['gemini'] : ['groq', 'gemini', 'nvidia'])
    : [WRITING_ENGINE];

  let result = await callEngine(engineChain[0]);
  let engineUsed: Engine = engineChain[0];

  // Solo reintenta con el siguiente motor de la cadena ante saturación/caída
  // del actual — no ante errores de configuración (esos fallarían igual en
  // el respaldo) ni de validación.
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
