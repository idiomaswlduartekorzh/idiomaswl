import { randomBytes } from 'node:crypto'
import { NextResponse } from 'next/server'
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server'
import {
  consumeWritingQuotas,
  readUtf8StreamLimited,
  validateWritingFeedbackRequest,
  WRITING_REVIEW_MAX_BODY_BYTES,
  reviewWritingWithOpenAi,
} from '@/lib/writing-feedback'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COOKIE_NAME = 'wl-writing-quota'
const COPY = {
  rate_limited: 'Llegaste al límite de revisiones disponibles por ahora. Tu ejercicio sigue intacto; inténtalo más tarde.',
  quota_exhausted: 'La cuenta de revisión no tiene saldo disponible en este momento. Tu ejercicio sigue intacto.',
  not_configured: 'La revisión no está disponible en este momento. Tu ejercicio sigue intacto.',
  provider_error: 'No pudimos revisar el texto ahora. Tu ejercicio sigue intacto; inténtalo más tarde.',
  invalid_response: 'No pudimos mostrar comentarios fiables. Tu texto sigue en el ejercicio.',
  invalid_input: 'No pudimos leer el texto o el contexto de la tarea. Tu ejercicio sigue intacto.',
} as const

function quotaCookie(request: Request) {
  const raw = request.headers.get('cookie') ?? ''
  const current = raw.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1)
  if (current && /^[A-Za-z0-9_-]{32,64}$/.test(current)) return { id: current, setCookie: '' }
  const id = randomBytes(32).toString('base64url')
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return { id, setCookie: `${COOKIE_NAME}=${id}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${secure}` }
}

function json(body: unknown, status: number, setCookie: string) {
  const headers = new Headers({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
  if (setCookie) headers.set('Set-Cookie', setCookie)
  return NextResponse.json(body, { status, headers })
}

export async function POST(request: Request) {
  if (process.env.OPENAI_WRITING_FEEDBACK_ENABLED !== '1') return new NextResponse(null, { status: 404 })
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return json({ message: 'Solicitud no permitida.' }, 403, '')
  const identity = quotaCookie(request)
  const advertisedBytes = Number(request.headers.get('content-length') ?? 0)
  if (advertisedBytes > WRITING_REVIEW_MAX_BODY_BYTES) {
    return json({ message: 'El texto y el contexto superan el tamaño permitido.' }, 413, identity.setCookie)
  }

  let raw: string | null
  let payload: unknown
  try {
    raw = await readUtf8StreamLimited(request.body, WRITING_REVIEW_MAX_BODY_BYTES)
    if (raw === null) {
      return json({ message: 'El texto y el contexto superan el tamaño permitido.' }, 413, identity.setCookie)
    }
    payload = JSON.parse(raw)
  } catch {
    return json({ message: COPY.invalid_input }, 400, identity.setCookie)
  }
  const validated = validateWritingFeedbackRequest(payload)
  if (!validated.ok) return json({ message: validated.message }, 400, identity.setCookie)
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return json({ message: COPY.not_configured }, 503, identity.setCookie)

  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const withinQuota = await consumeWritingQuotas(identity.id, ip, consumeExamReviewRateLimit)
  if (!withinQuota) return json({ message: COPY.rate_limited }, 429, identity.setCookie)

  const result = await reviewWritingWithOpenAi(validated.text, validated.assignment, apiKey)
  if (!result.ok) {
    const status = result.code === 'invalid_input' ? 400 : result.code === 'rate_limited' ? 429 : result.code === 'invalid_response' ? 502 : 503
    return json({ message: COPY[result.code] }, status, identity.setCookie)
  }
  return json({ feedback: result.feedback }, 200, identity.setCookie)
}
