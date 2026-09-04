import { createHmac } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseIntent } from '@/lib/whatsapp/attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const MAX_BYTES = 4096;

export async function POST(request: Request) {
  const reply = (status: number) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
  if (process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED !== 'true') return reply(503);
  const origin = request.headers.get('origin');
  // Next can normalize request.url to localhost behind its dev/proxy server.
  // Compare the actual HTTP Host, as Server Actions do, not that internal URL.
  let originUrl: URL;
  try { originUrl = new URL(origin ?? ''); } catch { return reply(403); }
  const host = request.headers.get('host') ?? new URL(request.url).host;
  if (originUrl.host !== host || originUrl.origin !== origin) return reply(403);
  if (originUrl.protocol !== 'https:' && !(process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1'].includes(originUrl.hostname))) return reply(403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(400);
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BYTES) return reply(413);
  let size = 0;
  let body = '';
  const reader = request.body?.getReader();
  if (!reader) return reply(400);
  const decoder = new TextDecoder();
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BYTES) { await reader.cancel(); return reply(413); }
      body += decoder.decode(chunk.value, { stream: true });
    }
    body += decoder.decode();
  } catch { return reply(400); }
  let value: unknown;
  try { value = JSON.parse(body); } catch { return reply(400); }
  const intent = parseIntent(value);
  if (!intent) return reply(400);
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_SUPABASE_URL) return reply(503);
  // Vercel overwrites this header. Never use caller-supplied X-Forwarded-For.
  const ip = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for') : 'local';
  const rateKey = createHmac('sha256', secret).update(`wa-attribution:${new Date().toISOString().slice(0, 10)}:${ip ?? 'unknown'}`).digest('hex');
  try {
    const { data, error } = await createAdminClient().rpc('record_whatsapp_contact_intent', { p_intent: intent, p_rate_key: rateKey }).abortSignal(AbortSignal.timeout(5000));
    if (error) { console.error('[WhatsApp attribution] Persistence failed', error.code); return reply(503); }
    return reply(data === true ? 204 : 429);
  } catch { console.error('[WhatsApp attribution] Persistence unavailable'); return reply(503); }
}
