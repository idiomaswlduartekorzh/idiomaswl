export const PRESENCE_ACTIVE_WINDOW_SECONDS = 90
export const PRESENCE_HEARTBEAT_SECONDS = 25

export type PresenceKind = 'person' | 'bot'
export type PresenceSource = 'heartbeat' | 'request'

const BOT_USER_AGENT = new RegExp([
  'bot', 'crawler', 'spider', 'slurp', 'bingpreview', 'facebookexternalhit',
  'whatsapp', 'telegrambot', 'discordbot', 'headlesschrome', 'phantomjs',
  'lighthouse', 'pagespeed', 'pingdom', 'uptimerobot', 'semrush', 'ahrefs',
  'mj12bot', 'dotbot', 'bytespider', 'petalbot', 'yandex', 'baiduspider',
  'gptbot', 'chatgpt-user', 'claudebot', 'anthropic-ai', 'perplexitybot',
  'python-requests', 'curl/', 'wget/', 'go-http-client', 'okhttp/',
].join('|'), 'i')

const INTERNAL_PREFIXES = [
  '/api',
  '/_next',
  '/auth',
  '/login',
  '/reset-password',
  '/dashboard/admin',
  '/preview',
]

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  return BOT_USER_AGENT.test(userAgent ?? '')
}

export function classifyPresence(
  userAgent: string | null | undefined,
  webdriver = false,
): PresenceKind {
  return webdriver || isBotUserAgent(userAgent) ? 'bot' : 'person'
}

export function normalizePresencePath(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0 || value.length > 500) return null

  try {
    const base = new URL('https://www.idiomaswl.com')
    const url = new URL(value, base)
    if (url.origin !== base.origin) return null

    const pathname = url.pathname.replace(/\/{2,}/g, '/').slice(0, 180)
    return pathname.startsWith('/') ? pathname : null
  } catch {
    return null
  }
}

export function shouldTrackPresencePath(value: unknown): boolean {
  const path = normalizePresencePath(value)
  if (!path) return false
  return !INTERNAL_PREFIXES.some(prefix => path === prefix || path.startsWith(`${prefix}/`))
}
