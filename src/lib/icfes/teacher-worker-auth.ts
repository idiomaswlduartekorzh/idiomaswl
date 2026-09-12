import { createHmac, timingSafeEqual } from 'node:crypto';
import { ICFES_TEACHER_UUID_PATTERN } from './teacher-api.ts';

function signature(reviewerId: string, secret: string): string {
  return createHmac('sha256', secret).update(`icfes-teacher-worker-v1:${reviewerId}`, 'utf8').digest('hex');
}

export function createIcfesTeacherWorkerCredential(reviewerId: string, secret: string): string {
  if (!ICFES_TEACHER_UUID_PATTERN.test(reviewerId) || secret.length < 32) throw new Error('invalid_worker_credential');
  const normalized = reviewerId.toLowerCase();
  return `Bearer v1.${normalized}.${signature(normalized, secret)}`;
}

export function authenticateIcfesTeacherWorker(authorization: string | null, secret: string | undefined): string | null {
  if (!authorization || !secret || secret.length < 32) return null;
  const match = /^Bearer v1\.([0-9a-f-]{36})\.([0-9a-f]{64})$/i.exec(authorization);
  if (!match || !ICFES_TEACHER_UUID_PATTERN.test(match[1])) return null;
  const reviewerId = match[1].toLowerCase();
  const expected = signature(reviewerId, secret);
  const actual = match[2].toLowerCase();
  return actual.length === expected.length
    && timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex')) ? reviewerId : null;
}
