import { AI_MAX_BODY_BYTES, AI_READING_ID, LocalRateLimit, reviewWithOpenAI, validateDraft } from '@/lib/reading/ai-feedback'

// Prueba local: estos contadores viven en un solo proceso. Antes de publicar,
// sustituirlos por una cuota duradera asociada a una identidad fiable.
const perIp = new LocalRateLimit(3, 60 * 60 * 1000)
const total = new LocalRateLimit(20, 24 * 60 * 60 * 1000)

const messages = {
  quota: 'Se alcanzó el límite de revisiones por ahora. Tu texto sigue aquí; inténtalo más tarde.',
  unavailable: 'La revisión con IA no está disponible ahora. Tu texto sigue aquí; puedes continuar el ejercicio.',
  invalid_response: 'No pudimos mostrar una revisión fiable. Tu texto sigue aquí; prueba más tarde.',
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development' || process.env.OPENAI_READING_FEEDBACK_ENABLED !== '1') {
    return new Response(null, { status: 404 })
  }
  const origin = req.headers.get('origin')
  if (origin && origin !== new URL(req.url).origin) return Response.json({ message: 'Solicitud no permitida.' }, { status: 403 })
  if (Number(req.headers.get('content-length') ?? 0) > AI_MAX_BODY_BYTES) {
    return Response.json({ message: 'El texto es demasiado largo para revisarlo.' }, { status: 413 })
  }
  let body: Record<string, unknown>
  try {
    const raw = await req.text()
    if (new TextEncoder().encode(raw).length > AI_MAX_BODY_BYTES) {
      return Response.json({ message: 'El texto es demasiado largo para revisarlo.' }, { status: 413 })
    }
    body = JSON.parse(raw) as Record<string, unknown>
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('bad body')
  } catch {
    return Response.json({ message: 'No pudimos leer el texto. Inténtalo de nuevo.' }, { status: 400 })
  }
  if (body.exerciseId !== AI_READING_ID) return Response.json({ message: 'Esta revisión no está disponible para esa lectura.' }, { status: 400 })
  const draft = validateDraft(body.text)
  if (!draft.ok) return Response.json({ message: draft.message }, { status: 400 })
  const key = process.env.OPENAI_API_KEY
  if (!key) return Response.json({ message: messages.unavailable }, { status: 503 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'local'
  if (!perIp.consume(ip) || !total.consume('all')) return Response.json({ message: messages.quota }, { status: 429 })

  const result = await reviewWithOpenAI(draft.text, key)
  if (!result.ok) return Response.json({ message: messages[result.code] }, { status: result.code === 'quota' ? 429 : 502 })
  return Response.json({ feedback: result.feedback }, { headers: { 'Cache-Control': 'no-store' } })
}
