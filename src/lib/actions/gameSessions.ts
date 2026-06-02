'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateCode(): string {
  // Avoid confusing chars (0/O, 1/I/L)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

// ── Admin actions (require auth) ──────────────────────────────────────────────

export async function createSession(setId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Ensure unique code
  let code = generateCode()
  let attempts = 0
  while (attempts < 10) {
    const { data } = await supabase
      .from('game_sessions')
      .select('id')
      .eq('code', code)
      .maybeSingle()
    if (!data) break
    code = generateCode()
    attempts++
  }

  const { data, error } = await supabase
    .from('game_sessions')
    .insert({ code, set_id: setId, status: 'lobby', created_by: user.id })
    .select('id, code')
    .single()

  if (error) throw new Error(error.message)
  return data as { id: string; code: string }
}

export async function updateSessionStatus(
  code: string,
  status: string,
  questionIndex?: number
) {
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
): Promise<{ participantId: string; sessionId: string }> {
  // Use admin client to bypass RLS for insert
  const admin = createAdminClient()

  const { data: session, error: sErr } = await admin
    .from('game_sessions')
    .select('id, status')
    .eq('code', code.toUpperCase())
    .single()

  if (sErr || !session) throw new Error('Sesión no encontrada')
  if (session.status === 'finished') throw new Error('Esta sesión ya terminó')

  const { data: participant, error: pErr } = await admin
    .from('game_participants')
    .insert({ session_id: session.id, name: name.trim(), whatsapp: whatsapp.trim() })
    .select('id')
    .single()

  if (pErr || !participant) throw new Error('Error al unirse')

  return { participantId: participant.id, sessionId: session.id }
}

export async function submitAnswer(
  sessionId: string,
  participantId: string,
  questionIndex: number,
  answer: string,
  isCorrect: boolean
): Promise<void> {
  const admin = createAdminClient()

  // Prevent duplicate answers for same question
  const { data: existing } = await admin
    .from('game_answers')
    .select('id')
    .eq('session_id', sessionId)
    .eq('participant_id', participantId)
    .eq('question_index', questionIndex)
    .maybeSingle()

  if (existing) return // already answered

  const { error } = await admin
    .from('game_answers')
    .insert({ session_id: sessionId, participant_id: participantId, question_index: questionIndex, answer, is_correct: isCorrect })

  if (error) throw new Error(error.message)

  // Update score if correct
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
}
