import { sameOrigin } from '@/lib/course-pricing/http.server';
import {
  claimFreeExamAccess,
  parseXpressExamSlug,
  publicExamAccessPayload,
  resolveExamAccessForUser,
} from '@/lib/xpress-commerce/access.server';
import { xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const examSlug = parseXpressExamSlug(new URL(request.url).searchParams.get('exam'));
  if (!examSlug) return Response.json({ error: 'invalid_exam' }, { status: 400 });
  const user = await xpressUser();
  if (!user) {
    return Response.json({
      examSlug,
      level: 'anonymous',
      planId: null,
      source: 'anonymous',
      expiresAt: null,
      capabilities: ['discover-public-content'],
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  }
  try {
    const decision = await resolveExamAccessForUser(user.id, examSlug);
    return Response.json(publicExamAccessPayload(decision), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch {
    return Response.json({ error: 'access_unavailable' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: 'invalid_origin' }, { status: 403 });
  const user = await xpressUser();
  if (!user) return Response.json({ error: 'authentication_required' }, { status: 401 });
  const length = Number(request.headers.get('content-length') || '0');
  if (!Number.isFinite(length) || length > 2048) return Response.json({ error: 'invalid_request' }, { status: 400 });
  const raw = await request.json().catch(() => null) as { exam?: unknown; action?: unknown } | null;
  const examSlug = parseXpressExamSlug(raw?.exam);
  if (!examSlug || raw?.action !== 'claim-free') return Response.json({ error: 'invalid_request' }, { status: 400 });
  try {
    const decision = await claimFreeExamAccess(user.id, examSlug);
    return Response.json(publicExamAccessPayload(decision), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'free_exam_claim_failed';
    if (code === 'free_exam_already_claimed' || code === 'free_exam_requires_first_access') {
      return Response.json({ error: code }, { status: 409 });
    }
    return Response.json({ error: 'free_exam_claim_failed' }, { status: 503 });
  }
}
