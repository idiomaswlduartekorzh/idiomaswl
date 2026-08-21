import {
  readIeltsDelegatedReviewCase,
  submitIeltsDelegatedReview,
} from '@/lib/ielts/delegated-review.server';
import { consumeIeltsRateLimit } from '@/lib/ielts/rate-limit.server';

export const runtime = 'nodejs';

const REVIEW_IP_LIMIT = 300;
const REVIEW_TOKEN_LIMIT = 20;
const REVIEW_WINDOW_SECONDS = 60 * 60;
const MAX_REVIEW_BODY_BYTES = 64 * 1024;
const PRIVATE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function json(value: unknown, status = 200): Response {
  return Response.json(value, {
    status,
    headers: status === 429 ? { ...PRIVATE_HEADERS, 'Retry-After': '3600' } : PRIVATE_HEADERS,
  });
}

async function allowRequest(request: Request, token: string): Promise<boolean> {
  const ipAllowed = await consumeIeltsRateLimit({
    namespace: 'ielts-delegated-ip',
    identifier: clientIp(request),
    limit: REVIEW_IP_LIMIT,
    windowSeconds: REVIEW_WINDOW_SECONDS,
  });
  return ipAllowed && consumeIeltsRateLimit({
    namespace: 'ielts-delegated-token',
    identifier: token,
    limit: REVIEW_TOKEN_LIMIT,
    windowSeconds: REVIEW_WINDOW_SECONDS,
  });
}

function absoluteUrl(value: string | undefined, origin: string): string | undefined {
  if (!value) return undefined;
  return new URL(value, origin).toString();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
): Promise<Response> {
  const { token } = await params;
  if (!await allowRequest(request, token)) return json({ ok: false, error: 'Demasiadas solicitudes para este llamado. Inténtalo más tarde.', retryAfterSeconds: 3600 }, 429);
  const result = await readIeltsDelegatedReviewCase(token);
  if (!result.ok) return json({ ok: false, error: result.message }, result.status);

  const origin = new URL(request.url).origin;
  const reviewCase = result.reviewCase;
  const assignment = reviewCase.assignment.kind === 'writing'
    ? {
      ...reviewCase.assignment,
      imageUrl: absoluteUrl(reviewCase.assignment.imageUrl, origin),
    }
    : {
      ...reviewCase.assignment,
      prompts: reviewCase.assignment.prompts.map(prompt => ({
        ...prompt,
        audioUrl: absoluteUrl(prompt.audioUrl, origin),
      })),
    };

  return json({
    ok: true,
    review: {
      ...reviewCase,
      rubric: {
        ...reviewCase.rubric,
        sourceUrl: absoluteUrl(reviewCase.rubric.sourceUrl, origin),
      },
      assignment,
      submissionEndpoint: absoluteUrl(reviewCase.submissionEndpoint, origin),
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
): Promise<Response> {
  const { token } = await params;
  if (!await allowRequest(request, token)) return json({ ok: false, error: 'Demasiadas solicitudes para este llamado. Inténtalo más tarde.', retryAfterSeconds: 3600 }, 429);

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_REVIEW_BODY_BYTES) return json({ ok: false, error: 'La evaluación supera el tamaño permitido.' }, 413);

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REVIEW_BODY_BYTES) {
      return json({ ok: false, error: 'La evaluación supera el tamaño permitido.' }, 413);
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return json({ ok: false, error: 'La solicitud no contiene JSON válido.' }, 400);
  }

  const result = await submitIeltsDelegatedReview(token, body);
  if (!result.ok) return json({ ok: false, error: result.message }, result.status);
  return json({ ok: true, consolidated: result });
}
