import { NextResponse } from 'next/server'
import { availableExercises } from '@/lib/reading/catalog'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { readUtf8StreamLimited } from '@/lib/writing-feedback'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function reply(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return reply({ code: 'forbidden' }, 403)
  if (Number(request.headers.get('content-length') ?? 0) > 12_000) return reply({ code: 'too_large' }, 413)

  let input: unknown
  try {
    const raw = await readUtf8StreamLimited(request.body, 12_000)
    if (raw === null) return reply({ code: 'too_large' }, 413)
    input = JSON.parse(raw)
  } catch { return reply({ code: 'invalid_input' }, 400) }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return reply({ code: 'invalid_input' }, 400)
  const candidate = input as Record<string, unknown>
  if (candidate.consent !== true || typeof candidate.exerciseId !== 'string' || typeof candidate.text !== 'string') {
    return reply({ code: 'invalid_input' }, 400)
  }
  const exercise = availableExercises('en').find((item) => item.id === candidate.exerciseId && item.schemaVersion === '1.2.0')
  if (!exercise) return reply({ code: 'not_found' }, 404)

  const text = candidate.text.trim()
  const units = exercise.language === 'ja' ? Array.from(text.replace(/\s+/gu, '')).length : text.split(/\s+/u).filter(Boolean).length
  if (new TextEncoder().encode(text).byteLength > 8_000 || text.length < 12 || units < exercise.production.minWords || units > exercise.production.maxWords) {
    return reply({ code: 'invalid_length', min: exercise.production.minWords, max: exercise.production.maxWords }, 400)
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return reply({ code: 'save_unavailable' }, 503)
  const db = await createClient()
  const { data: { user } } = await db.auth.getUser()
  if (!user || user.is_anonymous) return reply({ code: 'sign_in_required' }, 401)

  const { data, error } = await createAdminClient().from('reading_writing_submissions').insert({
    student_id: user.id,
    exercise_id: exercise.id,
    language: exercise.language,
    level: exercise.level.cefr,
    exercise_title: exercise.content.title.en ?? exercise.content.title.es ?? exercise.id,
    response_text: text,
    response_units: units,
  }).select('id').single()
  if (error || !data) return reply({ code: 'save_failed' }, 503)
  return reply({ id: data.id }, 201)
}
