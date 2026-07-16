import { NextResponse } from 'next/server';
import { LABS_ENABLED, LIMITS } from '@/lib/labs/config';
import { checkRateLimit, pruneExpired, WRITING_RULE } from '@/lib/labs/rate-limit';
import { assessWritingFree } from '@/lib/labs/providers/gemini';
import type { IeltsTask } from '@/lib/labs/types';

const VALID_TASKS: IeltsTask[] = ['task1-academic', 'task1-general', 'task2'];

export async function POST(req: Request) {
  // Interruptor maestro: sin LABS_ENABLED, esta ruta no existe.
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

  let payload: { essay?: unknown; prompt?: unknown; task?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ code: 'invalid_input', message: 'JSON inválido.' }, { status: 400 });
  }

  const essay  = typeof payload.essay === 'string' ? payload.essay.trim() : '';
  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
  const task   = payload.task as IeltsTask;

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
  if (!prompt) {
    return NextResponse.json(
      { code: 'invalid_input', message: 'Falta la pregunta del examen.' },
      { status: 400 },
    );
  }
  if (!VALID_TASKS.includes(task)) {
    return NextResponse.json({ code: 'invalid_input', message: 'Task inválido.' }, { status: 400 });
  }

  const result = await assessWritingFree(essay, prompt, task);

  if ('code' in result) {
    const status = result.code === 'rate_limited' ? 429
                 : result.code === 'not_configured' ? 503
                 : 502;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
