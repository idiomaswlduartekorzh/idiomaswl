import {
  IcfesPrivacyOperationError,
  exportAuthenticatedIcfesUserData,
} from '@/lib/icfes/privacy-operations.server';
import {
  icfesPrivacyErrorHttpStatus,
  isSameOriginIcfesPrivacyRequest,
  parseIcfesPrivacyIdempotencyKey,
} from '@/lib/icfes/privacy-operations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200, attachment = false): Response {
  const headers: Record<string, string> = {
    'Cache-Control': 'private, no-store, max-age=0',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  };
  if (attachment) headers['Content-Disposition'] = 'attachment; filename="icfes-user-data.json"';
  return new Response(JSON.stringify(body), { status, headers });
}

export async function POST(request: Request): Promise<Response> {
  if (!isSameOriginIcfesPrivacyRequest(request.url, request.headers.get('origin'))) {
    return json({ ok: false, code: 'invalid_origin' }, 403);
  }
  const idempotencyKey = parseIcfesPrivacyIdempotencyKey(request.headers.get('idempotency-key'));
  if (!idempotencyKey) return json({ ok: false, code: 'invalid_idempotency_key' }, 400);

  try {
    const result = await exportAuthenticatedIcfesUserData(idempotencyKey);
    return json({ ok: true, result }, 200, true);
  } catch (error) {
    const code = error instanceof IcfesPrivacyOperationError ? error.code : 'unavailable';
    return json({ ok: false, code }, icfesPrivacyErrorHttpStatus(code));
  }
}
