import { createHmac, timingSafeEqual } from 'node:crypto';
import { ICFES_TEACHER_UUID_PATTERN } from './teacher-api.ts';

const WORKER_CREDENTIAL_LIFETIME_SECONDS = 15 * 60;

function signature(reviewerId: string, expiresAt: number, secret: string): string {
  return createHmac('sha256', secret).update(`icfes-teacher-worker-v2:${reviewerId}:${expiresAt}`, 'utf8').digest('hex');
}

export function createIcfesTeacherWorkerCredential(reviewerId: string, secret: string, now = Date.now()): string {
  if (!ICFES_TEACHER_UUID_PATTERN.test(reviewerId) || secret.length < 32) throw new Error('invalid_worker_credential');
  const normalized = reviewerId.toLowerCase();
  const expiresAt = Math.floor(now / 1000) + WORKER_CREDENTIAL_LIFETIME_SECONDS;
  return `Bearer v2.${normalized}.${expiresAt}.${signature(normalized, expiresAt, secret)}`;
}

export function authenticateIcfesTeacherWorker(authorization: string | null, secret: string | undefined, now = Date.now()): string | null {
  if (!authorization || !secret || secret.length < 32) return null;
  const match = /^Bearer v2\.([0-9a-f-]{36})\.(\d{10})\.([0-9a-f]{64})$/i.exec(authorization);
  if (!match || !ICFES_TEACHER_UUID_PATTERN.test(match[1])) return null;
  const reviewerId = match[1].toLowerCase();
  const expiresAt = Number(match[2]);
  const nowSeconds = Math.floor(now / 1000);
  if (!Number.isSafeInteger(expiresAt) || expiresAt < nowSeconds || expiresAt > nowSeconds + WORKER_CREDENTIAL_LIFETIME_SECONDS) return null;
  const expected = signature(reviewerId, expiresAt, secret);
  const actual = match[3].toLowerCase();
  return actual.length === expected.length
    && timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex')) ? reviewerId : null;
}
