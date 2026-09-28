import 'server-only'

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  classifyPresence,
  normalizePresencePath,
  type PresenceKind,
  type PresenceSource,
} from '@/lib/presence'

export const PRESENCE_COOKIE = 'wl-presence'

function presenceSecret(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null
}

export function isPresenceStorageConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
      && presenceSecret(),
  )
}

export function hashPresenceIdentity(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function keyedPresenceIdentity(value: string): string | null {
  const secret = presenceSecret()
  return secret ? createHmac('sha256', secret).update(value).digest('hex') : null
}

function signatureFor(id: string): string | null {
  const secret = presenceSecret()
  if (!secret) return null
  return createHmac('sha256', secret).update(id).digest('hex')
}

export function createPresenceCookieValue(): string | null {
  const id = randomBytes(24).toString('base64url')
  const signature = signatureFor(id)
  return signature ? `${id}.${signature}` : null
}

export function readPresenceCookieValue(value: string | null | undefined): string | null {
  if (!value) return null
  const separator = value.lastIndexOf('.')
  if (separator < 1) return null

  const id = value.slice(0, separator)
  const received = value.slice(separator + 1)
  const expected = signatureFor(id)
  if (!expected || received.length !== expected.length) return null

  const matches = timingSafeEqual(Buffer.from(received), Buffer.from(expected))
  return matches ? id : null
}

export async function upsertPresence(input: {
  sessionKey: string
  kind: PresenceKind
  source: PresenceSource
  path: string
}): Promise<void> {
  const { error } = await createAdminClient()
    .from('site_presence')
    .upsert({
      session_key: input.sessionKey,
      visitor_kind: input.kind,
      source: input.source,
      path: input.path,
      last_seen: new Date().toISOString(),
    }, { onConflict: 'session_key' })

  if (error) throw new Error(`site_presence_upsert_failed:${error.code ?? 'unknown'}`)

  // A deterministic ~1/256 sample keeps old rows bounded even if no admin opens
  // the dashboard for a long period. The cleanup contains no visitor data.
  if (input.sessionKey.endsWith('00')) {
    const staleCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    await createAdminClient().from('site_presence').delete().lt('last_seen', staleCutoff)
  }
}

export async function recordBotPresence(request: NextRequest): Promise<void> {
  if (process.env.VERCEL_ENV !== 'production' || !isPresenceStorageConfigured()) return

  const userAgent = request.headers.get('user-agent')
  if (classifyPresence(userAgent) !== 'bot') return

  const path = normalizePresencePath(request.nextUrl.pathname)
  if (!path) return

  const forwardedFor = request.headers.get('x-vercel-forwarded-for')
    ?? request.headers.get('x-forwarded-for')
    ?? 'unknown'
  const ip = forwardedFor.split(',')[0]?.trim() || 'unknown'
  // Keying the digest prevents an IP/user-agent dictionary from reproducing
  // the stored identifier, while still grouping requests from the same bot.
  const sessionKey = keyedPresenceIdentity(`bot:${ip}:${userAgent ?? 'unknown'}`)
  if (!sessionKey) return

  try {
    await upsertPresence({ sessionKey, kind: 'bot', source: 'request', path })
  } catch {
    // Presence telemetry must never delay or break a page response.
  }
}
