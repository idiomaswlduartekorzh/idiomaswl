import { readBoundedJson } from '../http/read-bounded-json.ts';
import {
  validateIeltsListeningResponses,
  type IeltsListeningResponseSpec,
  type IeltsListeningScoreResult,
} from './listening-practice-contract.ts';

const MAX_BODY_BYTES = 8_192;

const RESPONSE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
} as const;

interface IeltsListeningRequestScorer {
  readonly identity: { readonly contentVersion: string };
  readonly questionNumbers: readonly number[];
  readonly responseSpecs: readonly IeltsListeningResponseSpec[];
  readonly score: (responses: Readonly<Record<string, string>>) => IeltsListeningScoreResult;
}

type IeltsListeningScorerLookup = (practiceId: unknown) => IeltsListeningRequestScorer | null;

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: RESPONSE_HEADERS });
}

export async function createIeltsListeningScoreResponse(
  request: Request,
  getScorer: IeltsListeningScorerLookup,
): Promise<Response> {
  const contentType = request.headers.get('content-type') ?? '';
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return json({ code: 'unsupported_media_type' }, 415);
  }
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ code: 'payload_too_large' }, 413);
  }

  const parsed = await readBoundedJson(request, MAX_BODY_BYTES);
  if (!parsed.ok) return json({ code: parsed.code }, parsed.status);
  const body = parsed.value;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ code: 'invalid_request' }, 400);
  }

  const candidate = body as Record<string, unknown>;
  const scorer = getScorer(candidate.practiceId);
  if (!scorer || candidate.contentVersion !== scorer.identity.contentVersion) {
    return json({ code: 'unknown_practice' }, 404);
  }
  if (!validateIeltsListeningResponses(candidate.responses, scorer.responseSpecs)) {
    return json({ code: 'invalid_responses' }, 400);
  }
  return json(scorer.score(candidate.responses));
}
