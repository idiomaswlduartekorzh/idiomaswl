import { TOEFL_BUILD_SENTENCE_SET1 } from '@/data/toefl/build-sentence-set-1';
import { scoreToeflBuildSentenceAttempt } from '@/lib/toefl/build-sentence-contract';
import { TOEFL_BUILD_SENTENCE_SET1_SCORING } from '@/server/toefl/build-sentence-set-1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isSafeId(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 3 && value.length <= 180;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isRecord(body)
      || body.objectId !== TOEFL_BUILD_SENTENCE_SET1.objectId
      || !isSafeId(body.attemptId)
      || !isSafeId(body.closeId)
      || !isRecord(body.responses)
      || !Array.isArray(body.presentedItemIds)
      || body.presentedItemIds.length > TOEFL_BUILD_SENTENCE_SET1_SCORING.items.length
      || !body.presentedItemIds.every(isSafeId)) {
      return Response.json({ error: 'invalid_build_sentence_score_request' }, { status: 400 });
    }

    const configuredIds = new Set(TOEFL_BUILD_SENTENCE_SET1_SCORING.items.map((item) => item.itemId));
    const responseEntries = Object.entries(body.responses);
    if (responseEntries.length > configuredIds.size
      || responseEntries.some(([itemId, value]) => !configuredIds.has(itemId)
        || (value !== null && (!Array.isArray(value) || value.length > 12 || !value.every(isSafeId))))
      || body.presentedItemIds.some((itemId) => !configuredIds.has(itemId))) {
      return Response.json({ error: 'invalid_build_sentence_score_request' }, { status: 400 });
    }

    const result = scoreToeflBuildSentenceAttempt(TOEFL_BUILD_SENTENCE_SET1_SCORING, {
      attemptId: body.attemptId,
      closeId: body.closeId,
      responses: body.responses as Record<string, string[] | null>,
      presentedItemIds: body.presentedItemIds,
    });
    return Response.json(result, { status: 200 });
  } catch {
    return Response.json({ error: 'invalid_build_sentence_score_request' }, { status: 400 });
  }
}
