import { randomBytes } from 'node:crypto'
import { NextResponse } from 'next/server'
import { availableExercises } from '@/lib/reading/catalog'
import { reviewReadingWritingWithGemini } from '@/lib/reading/free-writing-feedback'
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server'
import { consumeWritingQuotas, readUtf8StreamLimited, validateWritingFeedbackRequest, WRITING_REVIEW_MAX_BODY_BYTES } from '@/lib/writing-feedback'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COOKIE_NAME = 'wl-writing-quota'

function reply(body: unknown, status: number, cookie = '') {
  const headers = new Headers({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
  if (cookie) headers.set('Set-Cookie', cookie)
  return NextResponse.json(body, { status, headers })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return reply({ code: 'forbidden' }, 403)
  if (Number(request.headers.get('content-length') ?? 0) > WRITING_REVIEW_MAX_BODY_BYTES) return reply({ code: 'too_large' }, 413)

  let input: unknown
  try {
    const raw = await readUtf8StreamLimited(request.body, WRITING_REVIEW_MAX_BODY_BYTES)
    if (raw === null) return reply({ code: 'too_large' }, 413)
    input = JSON.parse(raw)
  } catch { return reply({ code: 'invalid_input' }, 400) }
  const validated = validateWritingFeedbackRequest(input)
  if (!validated.ok || !validated.assignment.taskId) return reply({ code: 'invalid_input' }, 400)
  const exercise = availableExercises('en').find((item) => item.id === validated.assignment.taskId && item.schemaVersion === '1.2.0')
  if (!exercise) return reply({ code: 'not_found' }, 404)
  const units = exercise.language === 'ja'
    ? Array.from(validated.text.replace(/\s+/gu, '')).length
    : validated.text.split(/\s+/u).filter(Boolean).length
  if (units < exercise.production.minWords || units > exercise.production.maxWords) return reply({ code: 'invalid_length' }, 400)
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return reply({ code: 'unavailable' }, 503)

  const rawCookie = request.headers.get('cookie') ?? ''
  const existing = rawCookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1)
  const identity = existing && /^[A-Za-z0-9_-]{32,64}$/.test(existing) ? existing : randomBytes(32).toString('base64url')
  const cookie = identity === existing ? '' : `${COOKIE_NAME}=${identity}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!await consumeWritingQuotas(identity, ip, consumeExamReviewRateLimit)) return reply({ code: 'rate_limited' }, 429, cookie)

  const assignment = {
    taskId: exercise.id,
    title: exercise.content.title.en ?? exercise.id,
    language: exercise.language,
    level: exercise.level.cefr,
    prompt: exercise.production.prompt.en ?? '',
    sourceText: exercise.content.targetText.slice(0, 4_000),
    objectives: exercise.content.objectives.map((objective) => objective.en).filter((value): value is string => Boolean(value)),
    feedbackLanguage: exercise.language,
  }
  const result = await reviewReadingWritingWithGemini(validated.text, assignment, apiKey)
  if (!result.ok) return reply({ code: result.code }, result.code === 'rate_limited' ? 429 : 503, cookie)
  return reply({ feedback: result.feedback }, 200, cookie)
}
