'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Set registry — used for server-side answer validation
import coreano1  from '@/data/live-sets/coreano-1'
import nivel1    from '@/data/live-sets/coreano-nivel-1'
import nivel2    from '@/data/live-sets/coreano-nivel-2'
import nivel3    from '@/data/live-sets/coreano-nivel-3'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = {
  'coreano-1':        coreano1,
  'coreano-nivel-1':  nivel1,
  'coreano-nivel-2':  nivel2,
  'coreano-nivel-3':  nivel3,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

// ── Admin actions (require auth) ──────────────────────────────────────────────

export async function createSession(setId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  if (!SETS[setId]) throw new Error('Set no encontrado')

  let code = generateCode()
  for (let i = 0; i < 10; i++) {
    const { data } = await supabase.from('game_sessions').select('id').eq('code', code).maybeSingle()
    if (!data) break
    code = generateCode()
  }

  const { data, error } = await supabase
    .from('game_sessions')
    .insert({ code, set_id: setId, status: 'lobby', created_by: user.id })
    .select('id, code')
    .single()

  if (error) throw new Error(error.message)
  return data as { id: string; code: string }
}

export async function updateSessionStatus(code: string, status: string, questionIndex?: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const patch: Record<string, unknown> = { status }
  if (questionIndex !== undefined) patch.current_question_index = questionIndex

  const { error } = await supabase
    .from('game_sessions')
    .update(patch)
    .eq('code', code)
    .eq('created_by', user.id)

  if (error) throw new Error(error.message)
}

// ── Participant actions (no auth needed) ──────────────────────────────────────

export async function joinSession(
  code: string,
  name: string,
  whatsapp: string
): Promise<{ participantId: string; sessionId: string; score: number }> {
  const admin = createAdminClient()

  const { data: session, error: sErr } = await admin
    .from('game_sessions')
    .select('id, status')
    .eq('code', code.toUpperCase())
    .single()

  if (sErr || !session) throw new Error('Sesión no encontrada. Verifica el código.')
  // FIX: block joining any non-lobby session
  if (session.status === 'finished') throw new Error('Esta sesión ya terminó.')
  if (session.status !== 'lobby') throw new Error('El quiz ya comenzó. Espera la próxima sesión.')

  const { data: participant, error: pErr } = await admin
    .from('game_participants')
    .insert({ session_id: session.id, name: name.trim(), whatsapp: whatsapp.trim() })
    .select('id')
    .single()

  if (pErr || !participant) throw new Error('Error al unirse. Intenta de nuevo.')
  return { participantId: participant.id, sessionId: session.id, score: 0 }
}

export async function getParticipantScore(participantId: string): Promise<number> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('game_participants')
    .select('score')
    .eq('id', participantId)
    .single()
  return (data as { score: number } | null)?.score ?? 0
}

export async function submitAnswer(
  sessionId: string,
  participantId: string,
  questionIndex: number,
  answer: string
): Promise<{ isCorrect: boolean }> {
  const admin = createAdminClient()

  // FIX: block answers if session is not in 'question' state (race condition)
  const { data: session } = await admin
    .from('game_sessions')
    .select('status, set_id, current_question_index')
    .eq('id', sessionId)
    .single()

  if (!session) throw new Error('Sesión no encontrada')
  if (session.status !== 'question') return { isCorrect: false } // voting closed
  if (session.current_question_index !== questionIndex) return { isCorrect: false } // stale question

  // FIX: derive correctness server-side — never trust client
  const set = SETS[session.set_id as string]
  const question = set?.questions[questionIndex]
  if (!question) throw new Error('Pregunta no encontrada')
  const isCorrect = answer === question.correct

  // Prevent duplicate answers
  const { data: existing } = await admin
    .from('game_answers')
    .select('id')
    .eq('session_id', sessionId)
    .eq('participant_id', participantId)
    .eq('question_index', questionIndex)
    .maybeSingle()

  if (existing) return { isCorrect: existing ? false : isCorrect }

  const { error } = await admin
    .from('game_answers')
    .insert({ session_id: sessionId, participant_id: participantId, question_index: questionIndex, answer, is_correct: isCorrect })

  if (error) throw new Error(error.message)

  if (isCorrect) {
    const { data: p } = await admin
      .from('game_participants')
      .select('score')
      .eq('id', participantId)
      .single()
    if (p) {
      await admin
        .from('game_participants')
        .update({ score: ((p as { score: number }).score ?? 0) + 1 })
        .eq('id', participantId)
    }
  }

  return { isCorrect }
}

export async function getSessionLeaderboard(
  sessionId: string
): Promise<{ name: string; score: number }[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('game_participants')
    .select('name, score')
    .eq('session_id', sessionId)
    .order('score', { ascending: false })
    .limit(10)
  return (data ?? []) as { name: string; score: number }[]
}
