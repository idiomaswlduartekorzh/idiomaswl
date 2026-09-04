/** Shared, dependency-free attribution contract. Browser metadata is a hint, not proof. */
export const CONTACT_PHONE = '573005004253';
export const CONTACT_REF_PATTERN = /^WL-[A-F0-9]{24}$/;
export const ATTRIBUTION_TTL_MS = 30 * 60 * 1000;

export interface ContactSource {
  landing_page: string;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  channel: string;
}
export interface ContactIntent extends ContactSource {
  reference: string;
  source_page: string;
  interaction: 'click' | 'context_menu';
}

export function publicPath(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 400 || !value.startsWith('/') || value.startsWith('//')) return null;
  const path = value.split(/[?#]/)[0];
  if (!/^\/[a-zA-Z0-9/_%.~-]*$/.test(path)) return null;
  let decoded: string;
  try { decoded = decodeURIComponent(path); } catch { return null; }
  if (/^\/(dashboard|admin|api|auth|login|reset-password)(\/|$)/i.test(decoded)) return null;
  if (decoded.includes('..') || decoded.includes('%')) return null;
  // Do not retain email addresses, encoded query strings or authentication paths.
  if (/%(?:40|3f|23|3d|26|2f|5c)/i.test(path)) return null;
  return path;
}

function tag(value: unknown): string | null {
  return typeof value === 'string' && /^[a-zA-Z0-9_.~ -]{1,100}$/.test(value)
    ? value.trim().toLowerCase() || null : null;
}

function hostname(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 253) return null;
  return /^(?:[a-z0-9-]+\.)+[a-z]{2,63}$/i.test(value) ? value.toLowerCase() : null;
}

export function channelFor(source: Pick<ContactSource, 'utm_source' | 'utm_medium' | 'referrer_host'>): string {
  if (source.utm_source || source.utm_medium) return 'Campaña etiquetada';
  const host = source.referrer_host ?? '';
  if (/(^|\.)(google\.(?:com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})|bing\.com|search\.yahoo\.com|duckduckgo\.com)$/.test(host)) return 'Buscador (inferido)';
  if (/(^|\.)(facebook\.com|instagram\.com|t\.co|tiktok\.com|linkedin\.com)$/.test(host)) return 'Red social (inferido)';
  return host ? 'Sitio referido' : 'Directo / desconocido';
}

export function captureSource(url: URL, referrer: string): ContactSource {
  let host: string | null = null;
  try {
    const ref = new URL(referrer);
    if (ref.hostname.replace(/^www\./, '') !== url.hostname.replace(/^www\./, '')) host = hostname(ref.hostname);
  } catch { /* No referrer is normal for private browsers and messaging apps. */ }
  const source = {
    landing_page: publicPath(url.pathname) ?? '/',
    referrer_host: host,
    utm_source: tag(url.searchParams.get('utm_source')),
    utm_medium: tag(url.searchParams.get('utm_medium')),
    utm_campaign: tag(url.searchParams.get('utm_campaign')),
    utm_content: tag(url.searchParams.get('utm_content')),
  };
  return { ...source, channel: channelFor(source) };
}

export function parseIntent(value: unknown): ContactIntent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const page = publicPath(v.source_page);
  const landing = publicPath(v.landing_page);
  if (!page || !landing || typeof v.reference !== 'string' || !CONTACT_REF_PATTERN.test(v.reference)) return null;
  if (v.interaction !== 'click' && v.interaction !== 'context_menu') return null;
  const source = {
    landing_page: landing,
    referrer_host: hostname(v.referrer_host),
    utm_source: tag(v.utm_source), utm_medium: tag(v.utm_medium),
    utm_campaign: tag(v.utm_campaign), utm_content: tag(v.utm_content),
  };
  return { ...source, channel: channelFor(source), reference: v.reference, source_page: page, interaction: v.interaction };
}

export function contactUrl(href: string): URL | null {
  try {
    const url = new URL(href);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const phone = url.hostname === 'wa.me' ? url.pathname.slice(1)
      : ['api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname) && url.pathname === '/send'
        ? url.searchParams.get('phone') : null;
    return phone?.replace(/^\+/, '') === CONTACT_PHONE ? url : null;
  } catch { return null; }
}

export function referenceFromText(text: string | null): string | null {
  const refs = [...(text ?? '').toUpperCase().matchAll(/\bWL-[A-F0-9]{24}\b/g)];
  const unique = [...new Set(refs.map(r => r[0]))];
  return unique.length === 1 ? unique[0] : null;
}

export function decorateContactUrl(href: string, intent: ContactIntent): string | null {
  const url = contactUrl(href);
  if (!url) return null;
  const text = (url.searchParams.get('text') ?? 'Hola, quiero información sobre WeLearn.').slice(0, 3000);
  const origin = intent.utm_source ?? intent.referrer_host ?? 'directo/no identificado';
  url.searchParams.set('text', `${text}\n\nOrigen WeLearn: ${intent.source_page} · ${origin}\nRef: ${intent.reference}`);
  return url.href;
}

export function reportWindow(days: number, now = new Date()): { start: string; end: string } {
  // Colombia has no DST: include today and N-1 calendar days, America/Bogota.
  const colombia = new Date(now.getTime() - 5 * 3600000).toISOString().slice(0, 10);
  const midnight = new Date(`${colombia}T00:00:00-05:00`).getTime();
  return { start: new Date(midnight - (days - 1) * 86400000).toISOString(), end: now.toISOString() };
}
