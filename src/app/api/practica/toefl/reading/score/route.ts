import { scoreToeflReadingAttempt } from '@/lib/toefl/reading-contract';
import { TOEFL_READING_SET1_SCORING } from '@/server/toefl/reading-set-1';
import { TOEFL_READING_SET1 } from '@/data/toefl/reading-set-1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isSafeId(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 3 && value.length <= 160;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isRecord(body)
      || body.objectId !== TOEFL_READING_SET1.objectId
      || !isSafeId(body.attemptId)
      || !isSafeId(body.closeId)
      || !isRecord(body.responses)
      || !Array.isArray(body.presentedItemIds)
      || body.presentedItemIds.length > TOEFL_READING_SET1_SCORING.items.length
      || !body.presentedItemIds.every(isSafeId)) {
      return Response.json({ error: 'invalid_reading_score_request' }, { status: 400 });
    }

    const configuredIds = new Set(TOEFL_READING_SET1_SCORING.items.map((item) => item.itemId));
    const responseEntries = Object.entries(body.responses);
    if (responseEntries.length > configuredIds.size
      || responseEntries.some(([itemId, value]) => {
        if (!configuredIds.has(itemId)) return true;
        if (value === null || typeof value === 'string') return false;
        return !Array.isArray(value) || value.length > 8 || !value.every(isSafeId);
      })
      || body.presentedItemIds.some((itemId) => !configuredIds.has(itemId))) {
      return Response.json({ error: 'invalid_reading_score_request' }, { status: 400 });
    }

    const result = scoreToeflReadingAttempt(TOEFL_READING_SET1_SCORING, {
      attemptId: body.attemptId,
      closeId: body.closeId,
      responses: body.responses as Record<string, string | string[] | null>,
      presentedItemIds: body.presentedItemIds,
    });
    return Response.json(result, { status: 200 });
  } catch {
    return Response.json({ error: 'invalid_reading_score_request' }, { status: 400 });
  }
}
