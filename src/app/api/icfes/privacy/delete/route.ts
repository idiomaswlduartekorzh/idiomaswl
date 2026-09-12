import {
  IcfesPrivacyOperationError,
  deleteAuthenticatedIcfesUserData,
} from '@/lib/icfes/privacy-operations.server';
import {
  ICFES_DELETE_CONFIRMATION,
  icfesPrivacyErrorHttpStatus,
  isSameOriginIcfesPrivacyRequest,
  parseIcfesPrivacyIdempotencyKey,
} from '@/lib/icfes/privacy-operations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function DELETE(request: Request): Promise<Response> {
  if (!isSameOriginIcfesPrivacyRequest(request.url, request.headers.get('origin'))) {
    return json({ ok: false, code: 'invalid_origin' }, 403);
  }
  if (request.headers.get('x-confirm-data-deletion') !== ICFES_DELETE_CONFIRMATION) {
    return json({ ok: false, code: 'deletion_confirmation_required' }, 400);
  }
  const idempotencyKey = parseIcfesPrivacyIdempotencyKey(request.headers.get('idempotency-key'));
  if (!idempotencyKey) return json({ ok: false, code: 'invalid_idempotency_key' }, 400);

  try {
    const result = await deleteAuthenticatedIcfesUserData(idempotencyKey);
    return json({ ok: true, result });
  } catch (error) {
    const code = error instanceof IcfesPrivacyOperationError ? error.code : 'unavailable';
    return json({ ok: false, code }, icfesPrivacyErrorHttpStatus(code));
  }
}
