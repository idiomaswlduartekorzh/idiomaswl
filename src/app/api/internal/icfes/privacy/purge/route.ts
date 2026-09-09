import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import {
  IcfesPrivacyOperationError,
  runIcfesRetentionPurge,
} from '@/lib/icfes/privacy-operations.server';
import {
  icfesPrivacyErrorHttpStatus,
  parseIcfesPrivacyIdempotencyKey,
} from '@/lib/icfes/privacy-operations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function json(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

// Deliberately unscheduled. A future scheduler must provide both CRON_SECRET and
// a stable UUID idempotency key for each logical batch invocation.
export async function POST(request: Request): Promise<Response> {
  if (!isAuthorizedCronRequest(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return json({ ok: false, code: 'unauthorized' }, 401);
  }
  const idempotencyKey = parseIcfesPrivacyIdempotencyKey(request.headers.get('idempotency-key'));
  if (!idempotencyKey) return json({ ok: false, code: 'invalid_idempotency_key' }, 400);

  try {
    const result = await runIcfesRetentionPurge(idempotencyKey);
    return json({ ok: true, result });
  } catch (error) {
    const code = error instanceof IcfesPrivacyOperationError ? error.code : 'unavailable';
    return json({ ok: false, code }, icfesPrivacyErrorHttpStatus(code));
  }
}
