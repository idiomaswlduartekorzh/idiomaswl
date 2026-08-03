import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const CONTEXTS = new Set(['part-practice', 'guided-simulator', 'daily-question', 'error-review']);
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

interface AttemptInput {
  clientAttemptId: string;
  clientSessionId?: string;
  questionId: string;
  officialPart: number;
  skill: string;
  subskill: string;
  context: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  elapsedSeconds: number;
  answeredAt: string;
}

interface SessionInput {
  clientSessionId: string;
  context: string;
  officialPart?: number;
  progressScope: string;
  questionCount: number;
  correctCount?: number;
  elapsedSeconds?: number;
  startedAt: string;
  completedAt?: string;
}

function safeText(value: unknown, max = 160): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max;
}

function validDate(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 40 && !Number.isNaN(Date.parse(value));
}

function isAttempt(value: unknown): value is AttemptInput {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return safeText(item.clientAttemptId, 240)
    && (!item.clientSessionId || safeText(item.clientSessionId, 160))
    && safeText(item.questionId)
    && Number.isInteger(item.officialPart) && Number(item.officialPart) >= 1 && Number(item.officialPart) <= 7
    && safeText(item.skill, 100) && safeText(item.subskill, 100)
    && typeof item.context === 'string' && CONTEXTS.has(item.context)
    && Number.isInteger(item.selectedIndex) && Number(item.selectedIndex) >= 0 && Number(item.selectedIndex) <= 9
    && Number.isInteger(item.correctIndex) && Number(item.correctIndex) >= 0 && Number(item.correctIndex) <= 9
    && typeof item.isCorrect === 'boolean'
    && Number.isInteger(item.elapsedSeconds) && Number(item.elapsedSeconds) >= 0 && Number(item.elapsedSeconds) <= 7200
    && validDate(item.answeredAt);
}

function isSession(value: unknown): value is SessionInput {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return safeText(item.clientSessionId, 160)
    && typeof item.context === 'string' && CONTEXTS.has(item.context)
    && (item.officialPart === undefined || (Number.isInteger(item.officialPart) && Number(item.officialPart) >= 1 && Number(item.officialPart) <= 7))
    && safeText(item.progressScope, 160)
    && Number.isInteger(item.questionCount) && Number(item.questionCount) > 0 && Number(item.questionCount) <= 100
    && (item.correctCount === undefined || (Number.isInteger(item.correctCount) && Number(item.correctCount) >= 0 && Number(item.correctCount) <= Number(item.questionCount)))
    && (item.elapsedSeconds === undefined || (Number.isInteger(item.elapsedSeconds) && Number(item.elapsedSeconds) >= 0))
    && validDate(item.startedAt)
    && (item.completedAt === undefined || validDate(item.completedAt));
}

export async function POST(request: Request) {
  let payload: { attempts?: unknown; session?: unknown; resolveQuestionId?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ code: 'invalid_json' }, { status: 400 });
  }

  const attempts = payload.attempts ?? [];
  if (!Array.isArray(attempts) || attempts.length > 200 || !attempts.every(isAttempt)) {
    return NextResponse.json({ code: 'invalid_attempts' }, { status: 400 });
  }
  if (payload.session !== undefined && !isSession(payload.session)) {
    return NextResponse.json({ code: 'invalid_session' }, { status: 400 });
  }
  if (payload.resolveQuestionId !== undefined && !safeText(payload.resolveQuestionId)) {
    return NextResponse.json({ code: 'invalid_question' }, { status: 400 });
  }
  if (attempts.length === 0 && payload.session === undefined && payload.resolveQuestionId === undefined) {
    return NextResponse.json({ code: 'empty_payload' }, { status: 400 });
  }

  if (!SUPABASE_CONFIGURED) return NextResponse.json({ synced: 0, anonymous: true }, { status: 202 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ synced: 0, anonymous: true }, { status: 202 });

  if (typeof payload.resolveQuestionId === 'string') {
    const { error } = await supabase.from('icfes_error_queue').update({
      resolved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.id).eq('question_key', payload.resolveQuestionId);
    if (error) return NextResponse.json({ code: 'error_resolution_failed' }, { status: 503 });
  }

  if (payload.session) {
    const session = payload.session as SessionInput;
    const { error } = await supabase.from('icfes_practice_sessions').upsert({
      user_id: user.id,
      client_session_id: session.clientSessionId,
      context: session.context,
      official_part: session.officialPart ?? null,
      progress_scope: session.progressScope,
      question_count: session.questionCount,
      correct_count: session.correctCount ?? null,
      elapsed_seconds: session.elapsedSeconds ?? null,
      started_at: session.startedAt,
      completed_at: session.completedAt ?? null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,client_session_id' });
    if (error) return NextResponse.json({ code: 'session_write_failed' }, { status: 503 });
  }

  let inserted = 0;
  for (const attempt of attempts as AttemptInput[]) {
    const { data, error } = await supabase.rpc('record_icfes_practice_attempt', {
      p_client_attempt_id: attempt.clientAttemptId,
      p_client_session_id: attempt.clientSessionId ?? '',
      p_question_key: attempt.questionId,
      p_official_part: attempt.officialPart,
      p_skill: attempt.skill,
      p_subskill: attempt.subskill,
      p_context: attempt.context,
      p_selected_index: attempt.selectedIndex,
      p_correct_index: attempt.correctIndex,
      p_is_correct: attempt.isCorrect,
      p_elapsed_seconds: attempt.elapsedSeconds,
      p_answered_at: attempt.answeredAt,
    });
    if (error) return NextResponse.json({ code: 'attempt_write_failed', synced: inserted }, { status: 503 });
    if (data === true) inserted += 1;
  }

  return NextResponse.json({ synced: inserted, received: attempts.length });
}

export async function GET() {
  if (!SUPABASE_CONFIGURED) return NextResponse.json({ anonymous: true, mastery: [], errors: [], attempts: [], sessions: [] });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ anonymous: true, mastery: [], errors: [], attempts: [], sessions: [] });

  const [masteryResult, errorsResult, attemptsResult, sessionsResult] = await Promise.all([
    supabase.from('icfes_skill_mastery').select('official_part,skill,total_attempts,correct_attempts,accuracy,last_attempt_at').eq('user_id', user.id).order('official_part'),
    supabase.from('icfes_error_queue').select('question_key,official_part,skill,wrong_count,last_wrong_at,next_review_at').eq('user_id', user.id).is('resolved_at', null).order('next_review_at'),
    supabase.from('icfes_practice_attempts').select('question_key,selected_index,is_correct,elapsed_seconds,answered_at').eq('user_id', user.id).eq('is_correct', false).order('answered_at', { ascending: false }).limit(200),
    supabase.from('icfes_practice_sessions').select('client_session_id,context,official_part,question_count,correct_count,elapsed_seconds,started_at,completed_at').eq('user_id', user.id).order('updated_at', { ascending: false }).limit(20),
  ]);
  if (masteryResult.error || errorsResult.error || attemptsResult.error || sessionsResult.error) {
    return NextResponse.json({ code: 'progress_read_failed' }, { status: 503 });
  }
  return NextResponse.json({
    mastery: masteryResult.data ?? [],
    errors: errorsResult.data ?? [],
    attempts: attemptsResult.data ?? [],
    sessions: sessionsResult.data ?? [],
  });
}
