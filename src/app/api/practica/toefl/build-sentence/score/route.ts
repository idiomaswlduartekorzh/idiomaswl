import { scoreToeflBuildSentenceAttempt } from '@/lib/toefl/build-sentence-contract';
import { TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID } from '@/server/toefl/build-sentence-registry';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isSafeId(value: unknown): value is string {
  return typeof value === 'string'
    && value.length >= 3
    && value.length <= 180
    && /^[a-zA-Z0-9:._-]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isRecord(body)
      || !isSafeId(body.objectId)
      || !isSafeId(body.attemptId)
      || !isSafeId(body.closeId)
      || !isRecord(body.responses)
      || !Array.isArray(body.presentedItemIds)
      || !body.presentedItemIds.every(isSafeId)
      || new Set(body.presentedItemIds).size !== body.presentedItemIds.length) {
      return Response.json({ error: 'invalid_build_sentence_score_request' }, { status: 400 });
    }

    const scoring = Object.hasOwn(TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID, body.objectId)
      ? TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID[body.objectId]
      : undefined;
    if (!scoring || body.presentedItemIds.length > scoring.items.length) {
      return Response.json({ error: 'invalid_build_sentence_score_request' }, { status: 400 });
    }

    const configuredIds = new Set(scoring.items.map((item) => item.itemId));
    const responseEntries = Object.entries(body.responses);
    if (responseEntries.length > configuredIds.size
      || responseEntries.some(([itemId, value]) => !configuredIds.has(itemId)
        || (value !== null && (!Array.isArray(value)
          || value.length > 12
          || !value.every(isSafeId)
          || new Set(value).size !== value.length)))
      || body.presentedItemIds.some((itemId) => !configuredIds.has(itemId))) {
      return Response.json({ error: 'invalid_build_sentence_score_request' }, { status: 400 });
    }

    const result = scoreToeflBuildSentenceAttempt(scoring, {
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
