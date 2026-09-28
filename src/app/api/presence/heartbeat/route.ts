import { NextResponse, type NextRequest } from 'next/server'
import {
  classifyPresence,
  normalizePresencePath,
  shouldTrackPresencePath,
} from '@/lib/presence'
import {
  createPresenceCookieValue,
  hashPresenceIdentity,
  isPresenceStorageConfigured,
  PRESENCE_COOKIE,
  readPresenceCookieValue,
  upsertPresence,
} from '@/lib/presence.server'

export const dynamic = 'force-dynamic'

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      return new URL(origin).origin === request.nextUrl.origin
    } catch {
      return false
    }
  }

  return request.headers.get('sec-fetch-site') === 'same-origin'
}

export async function POST(request: NextRequest) {
  if (process.env.VERCEL_ENV !== 'production' || !isPresenceStorageConfigured()) {
    return new NextResponse(null, { status: 204 })
  }
  if (!sameOrigin(request)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 1024) return NextResponse.json({ error: 'payload_too_large' }, { status: 413 })

  let body: { path?: unknown; webdriver?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const path = normalizePresencePath(body.path)
  if (!path || !shouldTrackPresencePath(path)) return new NextResponse(null, { status: 204 })

  const existingCookie = request.cookies.get(PRESENCE_COOKIE)?.value
  const existingId = readPresenceCookieValue(existingCookie)
  const cookieValue = existingId ? existingCookie! : createPresenceCookieValue()
  const id = existingId ?? readPresenceCookieValue(cookieValue)
  if (!cookieValue || !id) return new NextResponse(null, { status: 503 })

  try {
    await upsertPresence({
      sessionKey: hashPresenceIdentity(`browser:${id}`),
      kind: classifyPresence(request.headers.get('user-agent'), body.webdriver === true),
      source: 'heartbeat',
      path,
    })
  } catch {
    return new NextResponse(null, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }

  const response = new NextResponse(null, {
    status: 204,
    headers: { 'Cache-Control': 'no-store' },
  })
  if (!existingId) {
    response.cookies.set(PRESENCE_COOKIE, cookieValue, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  return response
}
