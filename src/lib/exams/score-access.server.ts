import { createHmac } from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { examCan, type ExamAccessDecision } from '@/lib/xpress-commerce/access';
import { parseXpressExamSlug, resolveExamAccessForUser } from '@/lib/xpress-commerce/access.server';

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

export async function hasExamScoreAccess(examSlug: string, _request?: Request): Promise<boolean> {
  const access = await currentExamScoreAccess(examSlug);
  return access !== null
    && examCan(access.level, 'start-exam')
    && examCan(access.level, 'save-result');
}

export async function hasDetailedExamResultsAccess(examSlug: string): Promise<boolean> {
  const access = await currentExamScoreAccess(examSlug);
  return access !== null && examCan(access.level, 'view-detailed-results');
}

export async function currentExamScoreAccess(examSlug: string): Promise<ExamAccessDecision | null> {
  const parsedExam = parseXpressExamSlug(examSlug);
  if (!parsedExam) return null;
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user?.email_confirmed_at) return null;
  try {
    return await resolveExamAccessForUser(user.id, parsedExam);
  } catch {
    return null;
  }
}
