import { getMock } from '@/data/mocks/index';
import { isIeltsSectionalListeningSetId, selectIeltsListeningPractice } from '@/data/ielts/sectional-listening-adapter';
import {
  getIeltsListeningAllowedKeys,
  scoreIeltsListeningPracticeAttempt,
  type IeltsListeningPracticeAnswers,
} from '@/lib/ielts/listening-practice-contract';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isSafeId(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 3 && value.length <= 180 && /^[a-zA-Z0-9:+._-]+$/.test(value);
}

function validateStringRecord(value: unknown, allowed: Set<string>): value is Record<string, string> {
  return isRecord(value)
    && Object.keys(value).length <= allowed.size
    && Object.entries(value).every(([key, item]) => allowed.has(key) && typeof item === 'string' && item.length <= 160);
}

function validateMcqRecord(value: unknown, allowed: Set<string>): value is Record<string, number> {
  return isRecord(value)
    && Object.keys(value).length <= allowed.size
    && Object.entries(value).every(([key, item]) => allowed.has(key) && Number.isInteger(item) && Number(item) >= 0 && Number(item) <= 10);
}

function validateMultiSelectRecord(value: unknown, allowed: Set<string>): value is Record<string, string[]> {
  return isRecord(value)
    && Object.keys(value).length <= allowed.size
    && Object.entries(value).every(([key, item]) => allowed.has(key)
      && Array.isArray(item)
      && item.length <= 5
      && new Set(item).size === item.length
      && item.every(choice => typeof choice === 'string' && /^[A-Z]$/.test(choice)));
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isRecord(body)
      || !isSafeId(body.mockId)
      || !isSafeId(body.objectId)
      || !isSafeId(body.contentVersion)
      || !isRecord(body.answers)
      || !isIeltsSectionalListeningSetId(body.mockId)) {
      return Response.json({ error: 'invalid_ielts_listening_score_request' }, { status: 400 });
    }

    const mock = getMock('ielts', body.mockId);
    const practice = mock ? selectIeltsListeningPractice(mock) : null;
    if (!mock || !practice || practice.objectId !== body.objectId || practice.contentVersion !== body.contentVersion) {
      return Response.json({ error: 'stale_ielts_listening_practice' }, { status: 409 });
    }

    const allowed = getIeltsListeningAllowedKeys(mock);
    const answers = body.answers;
    if (!validateStringRecord(answers.fills, allowed.fills)
      || !validateMcqRecord(answers.mcq, allowed.mcq)
      || !validateMultiSelectRecord(answers.ms, allowed.ms)
      || !validateStringRecord(answers.match, allowed.match)) {
      return Response.json({ error: 'invalid_ielts_listening_score_request' }, { status: 400 });
    }

    const validatedAnswers: IeltsListeningPracticeAnswers = {
      fills: answers.fills,
      mcq: answers.mcq,
      ms: answers.ms,
      match: answers.match,
    };
    return Response.json(scoreIeltsListeningPracticeAttempt(mock, validatedAnswers), { status: 200 });
  } catch {
    return Response.json({ error: 'invalid_ielts_listening_score_request' }, { status: 400 });
  }
}
