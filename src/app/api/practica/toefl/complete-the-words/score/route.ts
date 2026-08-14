import { NextResponse } from 'next/server';
import { TOEFL_CTW_SET1_V3 } from '@/data/toefl/complete-the-words-set-1';
import { scoreCompleteWords } from '@/lib/toefl/complete-words-contract';
import { TOEFL_CTW_SET1_V3_SCORING } from '@/server/toefl/complete-words-set-1';

function isShortId(value: unknown, max = 180): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max && /^[a-zA-Z0-9:._-]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ code: 'invalid_json' }, { status: 400 });
  }

  if (payload.objectId !== TOEFL_CTW_SET1_V3.objectId) {
    return NextResponse.json({ code: 'unknown_object' }, { status: 404 });
  }
  if (!isShortId(payload.attemptId) || !isShortId(payload.closeId)) {
    return NextResponse.json({ code: 'invalid_identity' }, { status: 400 });
  }
  if (!payload.responses || typeof payload.responses !== 'object' || Array.isArray(payload.responses)) {
    return NextResponse.json({ code: 'invalid_responses' }, { status: 400 });
  }
  if (!Array.isArray(payload.presentedBlankIds) || payload.presentedBlankIds.length > TOEFL_CTW_SET1_V3.blanks.length) {
    return NextResponse.json({ code: 'invalid_presentation' }, { status: 400 });
  }

  const knownIds = new Set<string>(TOEFL_CTW_SET1_V3.blanks.map((blank) => blank.id));
  const responses = payload.responses as Record<string, unknown>;
  const responseEntries = Object.entries(responses);
  if (
    responseEntries.length > TOEFL_CTW_SET1_V3.blanks.length
    || responseEntries.some(([id, value]) => !knownIds.has(id) || typeof value !== 'string' || value.length > 32)
    || payload.presentedBlankIds.some((id) => typeof id !== 'string' || !knownIds.has(id))
    || new Set(payload.presentedBlankIds).size !== payload.presentedBlankIds.length
  ) {
    return NextResponse.json({ code: 'invalid_responses' }, { status: 400 });
  }

  const result = scoreCompleteWords(TOEFL_CTW_SET1_V3_SCORING, {
    objectId: TOEFL_CTW_SET1_V3.objectId,
    attemptId: payload.attemptId,
    closeId: payload.closeId,
    responses: Object.fromEntries(responseEntries) as Record<string, string>,
    presentedBlankIds: payload.presentedBlankIds as string[],
  });

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
