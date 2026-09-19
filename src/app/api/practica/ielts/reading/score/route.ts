import { getMock } from '@/data/mocks/index';
import { isIeltsSectionalListeningSetId } from '@/data/ielts/sectional-listening-adapter';
import { IELTS_CHOICE_PRESENTATION_VERSION } from '@/data/mocks/ielts-choice-presentation';
import { getIeltsObjectiveAllowedKeys } from '@/lib/ielts/listening-practice-contract';
import { scoreIeltsReadingPracticeAttempt } from '@/lib/ielts/reading-practice-contract';
import { getIeltsReviewBlueprint } from '@/lib/ielts/review-blueprint';
import { consumeIeltsRateLimit } from '@/lib/ielts/rate-limit.server';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 24_000) {
      return Response.json({ error: 'invalid_ielts_reading_score_request' }, { status: 413 });
    }
    const body: unknown = await request.json();
    if (!isRecord(body) || typeof body.mockId !== 'string'
      || !isIeltsSectionalListeningSetId(body.mockId)
      || typeof body.contentVersion !== 'string' || !isRecord(body.answers)) {
      return Response.json({ error: 'invalid_ielts_reading_score_request' }, { status: 400 });
    }
    const blueprint = getIeltsReviewBlueprint(body.mockId);
    const mock = getMock('ielts', body.mockId);
    const version = blueprint && `${blueprint.contentVersion}+${IELTS_CHOICE_PRESENTATION_VERSION}`;
    if (!blueprint || !mock || body.contentVersion !== version) {
      return Response.json({ error: 'stale_ielts_reading_practice' }, { status: 409 });
    }
    const allowed = getIeltsObjectiveAllowedKeys(mock, 'reading');
    const answers = body.answers;
    if (!isRecord(answers.fills) || !isRecord(answers.mcq) || !isRecord(answers.ms) || !isRecord(answers.match)
      || Object.keys(answers.fills).length > allowed.fills.size
      || Object.keys(answers.mcq).length > allowed.mcq.size
      || Object.keys(answers.ms).length > allowed.ms.size
      || Object.keys(answers.match).length > allowed.match.size
      || !Object.entries(answers.fills).every(([key, value]) => allowed.fills.has(key) && typeof value === 'string' && value.length <= 160)
      || !Object.entries(answers.mcq).every(([key, value]) => allowed.mcq.has(key) && Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 10)
      || !Object.entries(answers.ms).every(([key, value]) => allowed.ms.has(key) && Array.isArray(value) && value.length <= 5 && new Set(value).size === value.length && value.every(item => typeof item === 'string' && /^[A-Z]$/.test(item)))
      || !Object.entries(answers.match).every(([key, value]) => allowed.match.has(key) && typeof value === 'string' && value.length <= 10)) {
      return Response.json({ error: 'invalid_ielts_reading_score_request' }, { status: 400 });
    }

    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const identifier = forwarded && /^[0-9a-fA-F:.]{3,64}$/.test(forwarded) ? forwarded : 'unknown';
    const permitted = await consumeIeltsRateLimit({
      namespace: 'ielts-reading-practice-score-ip',
      identifier,
      limit: 80,
      windowSeconds: 3600,
    });
    if (!permitted) return Response.json({ error: 'ielts_reading_score_rate_limited' }, { status: 429 });

    return Response.json(scoreIeltsReadingPracticeAttempt(mock, {
      fills: answers.fills as Record<string, string>,
      mcq: answers.mcq as Record<string, number>,
      ms: answers.ms as Record<string, string[]>,
      match: answers.match as Record<string, string>,
    }));
  } catch {
    return Response.json({ error: 'invalid_ielts_reading_score_request' }, { status: 400 });
  }
}
