import { createHmac, timingSafeEqual } from 'node:crypto';

const cookieName = (examSlug: string) => `wl_exam_score_${examSlug}`;

function signature(id: string, examSlug: string): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('Exam score access key missing');
  return createHmac('sha256', key).update(`exam-score-v1:${id}:${examSlug}`).digest('hex');
}

export async function grantExamScoreAccess(id: string, examSlug: string): Promise<void> {
  if (!/^[a-z0-9-]{2,40}$/.test(examSlug)) throw new Error('Invalid exam slug');
  const { cookies } = await import('next/headers');
  (await cookies()).set(cookieName(examSlug), `${id}.${signature(id, examSlug)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    // Server Actions post to the current page, while score handlers live under /api.
    path: '/',
    maxAge: 60 * 60 * 12,
  });
}

export async function hasExamScoreAccess(examSlug: string, request?: Request): Promise<boolean> {
  if (!/^[a-z0-9-]{2,40}$/.test(examSlug)) return false;
  const value = request
    ? request.headers.get('cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName(examSlug)}=`))?.slice(cookieName(examSlug).length + 1)
    : (await (await import('next/headers')).cookies()).get(cookieName(examSlug))?.value;
  const match = value && /^([0-9a-f-]{36})\.([0-9a-f]{64})$/i.exec(value);
  if (!match) return false;
  const expected = Buffer.from(signature(match[1], examSlug), 'hex');
  const provided = Buffer.from(match[2], 'hex');
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}
