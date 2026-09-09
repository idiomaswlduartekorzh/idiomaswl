import 'server-only';

import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { ICFES_ATTEMPT_ID_PATTERN } from './attempt-contract';

interface TokenPayload {
  v: 1;
  attemptId: string;
  examId: string;
  expiresAt: number;
}

function secret(): string {
  const value = process.env.ICFES_ATTEMPT_SIGNING_SECRET?.trim();
  if (value) return value;
  if (process.env.NODE_ENV === 'production') throw new Error('Missing ICFES_ATTEMPT_SIGNING_SECRET');
  return 'local-icfes-attempt-signing-secret-change-before-production';
}

function signature(payload: string): string {
  return createHmac('sha256', secret()).update(payload, 'utf8').digest('base64url');
}

export function createIcfesAttemptToken(examId: string, now = Date.now()): string {
  const payload: TokenPayload = {
    v: 1,
    attemptId: randomUUID(),
    examId,
    expiresAt: now + 6 * 60 * 60 * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${encoded}.${signature(encoded)}`;
}

export function verifyIcfesAttemptToken(token: unknown, expectedExamId?: string, now = Date.now()): TokenPayload | null {
  if (typeof token !== 'string' || token.length > 2_000) return null;
  const [encoded, provided, extra] = token.split('.');
  if (!encoded || !provided || extra) return null;
  const expected = signature(encoded);
  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  if (expectedBytes.length !== providedBytes.length || !timingSafeEqual(expectedBytes, providedBytes)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as TokenPayload;
    if (payload.v !== 1 || !ICFES_ATTEMPT_ID_PATTERN.test(payload.attemptId)
      || !/^[a-z0-9-]{3,80}$/.test(payload.examId) || payload.expiresAt < now
      || (expectedExamId && payload.examId !== expectedExamId)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const ICFES_ATTEMPT_COOKIE = 'wl_icfes_attempt';
