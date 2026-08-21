import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

const RECEIPT_TTL_SECONDS = 2 * 60 * 60;
export const TOEFL_SUBMISSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function signingSecret(): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  return secret;
}

export function createToeflSubmissionToken(submissionId: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + RECEIPT_TTL_SECONDS;
  const signature = createHmac('sha256', signingSecret())
    .update(`toefl:${submissionId}:${expiresAt}`)
    .digest('base64url');
  return `${expiresAt}.${signature}`;
}

export function verifyToeflSubmissionToken(submissionId: string, token: unknown): boolean {
  if (typeof token !== 'string') return false;
  const [expiresRaw, signature] = token.split('.');
  const expiresAt = Number(expiresRaw);
  if (!Number.isInteger(expiresAt) || expiresAt < Math.floor(Date.now() / 1000) || !signature) return false;
  const expected = createHmac('sha256', signingSecret())
    .update(`toefl:${submissionId}:${expiresAt}`)
    .digest('base64url');
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}
