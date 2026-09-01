import { NextResponse } from 'next/server';

import {
  getIeltsListeningPart1Identity,
  getIeltsListeningPart1QuestionNumbers,
  scoreIeltsListeningPart1Practice,
} from '@/data/ielts/listening-part1-welearn-001.server';
import { readBoundedJson } from '@/lib/http/read-bounded-json';
import { validateIeltsListeningResponses } from '@/lib/ielts/listening-practice-contract';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8_192;

const RESPONSE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Referrer-Policy': 'no-referrer',
} as const;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: RESPONSE_HEADERS });
}

export async function POST(request: Request) {
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
  const identity = getIeltsListeningPart1Identity();
  if (candidate.practiceId !== identity.id || candidate.contentVersion !== identity.contentVersion) {
    return json({ code: 'unknown_practice' }, 404);
  }

  const expectedNumbers = getIeltsListeningPart1QuestionNumbers();
  if (!validateIeltsListeningResponses(candidate.responses, expectedNumbers)) {
    return json({ code: 'invalid_responses' }, 400);
  }

  return json(scoreIeltsListeningPart1Practice(candidate.responses));
}
