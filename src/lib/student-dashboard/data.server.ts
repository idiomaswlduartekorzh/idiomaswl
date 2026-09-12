import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { objectiveLabel } from '@/lib/course-pricing/catalog';
import { authenticatedResultHref, getStudentExamWorkspace, productKindForOffer } from './catalog';
import type { StudentAttempt, StudentCourse, StudentDashboardData, StudentSubscription } from './types';

type AuthUser = Readonly<{
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}>;

type Profile = { full_name?: string | null; target_exam?: string | null } | null;
type MembershipRow = { offer_id: string; exam_slug: string; status: string; starts_at: string; ends_at: string; created_at: string };
type CreditRow = { offer_id?: string; exam_slug: string; status: string; granted_at: string; consumed_at: string | null; consumed_submission_id: string | null };
type SubmissionRow = {
  id: string; exam_slug: string; mock_id: string | null; mock_title: string | null; total_score: number | null;
  total_max: number | null; total_label: string | null; created_at: string; reviewed_at: string | null;
  writing_task1_assessment: unknown; writing_task2_assessment: unknown;
  toefl_speaking_repeat_assessment: unknown; toefl_speaking_interview_assessment: unknown;
};
type SubscriptionRow = StudentSubscription & { offer_id: string; exam_slug: string; created_at: string };
type CourseOrderRow = { id: string; selection: unknown; amount_in_cents: number; classes: number; sessions: number; created_at: string };
type FeedbackRow = { submission_id: string; status: 'pending' | 'processing' | 'completed' | 'failed' };

function commerceEnvironment(): 'sandbox' | 'production' {
  return process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY?.startsWith('pub_prod_') ? 'production' : 'sandbox';
}

function displayName(user: AuthUser, profile: Profile): string {
  const metadataName = typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : null;
  return profile?.full_name?.trim() || metadataName?.trim() || user.email?.split('@')[0] || 'Estudiante';
}

function normalizedScore(row: SubmissionRow): { score: number | null; label: string } {
  const value = Number(row.total_score);
  const maximum = Number(row.total_max);
  if (Number.isFinite(value) && Number.isFinite(maximum) && maximum > 0) {
    const score = Math.max(0, Math.min(100, Math.round((value / maximum) * 100)));
    return { score, label: row.total_label?.trim() || `${score}%` };
  }
  return { score: null, label: row.total_label?.trim() || 'Reporte disponible' };
}

function hasDeliveredAssessment(row: SubmissionRow): boolean {
  return Boolean(
    row.reviewed_at || row.writing_task1_assessment || row.writing_task2_assessment
    || row.toefl_speaking_repeat_assessment || row.toefl_speaking_interview_assessment,
  );
}

function toAttempt(row: SubmissionRow, personalized: boolean, feedbackStatus?: FeedbackRow['status']): StudentAttempt {
  const score = normalizedScore(row);
  return {
    id: row.id,
    mockId: row.mock_id,
    title: row.mock_title?.trim() || 'Simulacro completado',
    createdAt: row.created_at,
    score: score.score,
    scoreLabel: score.label,
    reportHref: authenticatedResultHref(row.id),
    feedbackState: personalized
      ? (feedbackStatus === 'completed' || hasDeliveredAssessment(row) ? 'delivered' : feedbackStatus ? 'processing' : 'available')
      : 'not-included',
  };
}

function courseFromOrder(order: CourseOrderRow): StudentCourse {
  const selection = order.selection && typeof order.selection === 'object' ? order.selection as Record<string, unknown> : {};
  const language = typeof selection.language === 'string' ? selection.language : 'Idioma';
  const objective = typeof selection.objective === 'string' ? objectiveLabel(selection.objective) : 'Idioma general';
  const plan = typeof selection.plan === 'string' ? selection.plan : 'Plan de clases';
  return { id: order.id, language, objective, plan, classes: order.classes, sessions: order.sessions, purchasedAt: order.created_at };
}

export async function loadStudentDashboard(user: AuthUser, profile: Profile): Promise<StudentDashboardData> {
  const fallback: StudentDashboardData = {
    name: displayName(user, profile), email: user.email ?? '', dataAvailable: false,
    access: { state: 'none', product: null, exam: null, startsAt: null, endsAt: null, singleAttemptAvailable: false },
    subscription: null, attempts: [], courses: [],
  };
  if (!user.email) return fallback;

  try {
    const db = createAdminClient();
    const environment = commerceEnvironment();
    const email = user.email.trim().toLowerCase();
    const [memberships, credits, subscriptions, submissions, feedbackRequests, ownedCourseOrders, emailedCourseOrders] = await Promise.all([
      db.from('xpress_memberships').select('offer_id,exam_slug,status,starts_at,ends_at,created_at')
        .eq('user_id', user.id).eq('environment', environment).order('created_at', { ascending: false }).limit(20),
      db.from('xpress_exam_credits').select('exam_slug,status,granted_at,consumed_at,consumed_submission_id')
        .eq('user_id', user.id).eq('environment', environment).order('granted_at', { ascending: false }).limit(20),
      db.from('xpress_subscriptions').select('id,offer_id,exam_slug,status,next_charge_at,current_period_end,cancel_requested_at,created_at')
        .eq('user_id', user.id).eq('environment', environment).order('created_at', { ascending: false }).limit(5),
      db.from('exam_submissions').select('id,exam_slug,mock_id,mock_title,total_score,total_max,total_label,created_at,reviewed_at,writing_task1_assessment,writing_task2_assessment,toefl_speaking_repeat_assessment,toefl_speaking_interview_assessment')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(100),
      db.from('xpress_personalized_feedback_requests').select('submission_id,status')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(100),
      db.from('course_orders').select('id,selection,amount_in_cents,classes,sessions,created_at')
        .eq('user_id', user.id).eq('environment', environment).order('created_at', { ascending: false }).limit(20),
      db.from('course_orders').select('id,selection,amount_in_cents,classes,sessions,created_at')
        .eq('purchaser_email', email).eq('environment', environment).order('created_at', { ascending: false }).limit(20),
    ]);
    const failed = [memberships, credits, subscriptions, submissions, feedbackRequests, ownedCourseOrders, emailedCourseOrders].some((result) => result.error);
    if (failed) return fallback;

    const now = Date.now();
    const membershipRows = (memberships.data ?? []) as MembershipRow[];
    const creditRows = (credits.data ?? []) as CreditRow[];
    const subscriptionRows = (subscriptions.data ?? []) as unknown as SubscriptionRow[];
    const submissionRows = (submissions.data ?? []) as SubmissionRow[];
    const feedbackBySubmission = new Map(((feedbackRequests.data ?? []) as FeedbackRow[]).map((row) => [row.submission_id, row.status]));
    const activeMembership = membershipRows.find((row) => row.status === 'active' && Date.parse(row.starts_at) <= now && Date.parse(row.ends_at) > now);
    const latestCredit = creditRows.find((row) => row.status === 'active' || row.status === 'consumed') ?? null;
    const latestMembership = membershipRows[0] ?? null;
    const selectedExam = activeMembership?.exam_slug || latestCredit?.exam_slug || latestMembership?.exam_slug || subscriptionRows[0]?.exam_slug || profile?.target_exam || null;
    const product = activeMembership ? productKindForOffer(activeMembership.offer_id) : latestCredit ? 'single' : latestMembership ? productKindForOffer(latestMembership.offer_id) : null;
    const accessState = activeMembership ? 'active' : latestCredit?.status === 'active' ? 'active' : latestCredit?.status === 'consumed' ? 'consumed' : latestMembership ? 'expired' : 'none';
    const personalized = product === 'personalized' && accessState === 'active';
    const relevantSubmissions = accessState === 'active' && product !== 'single'
      ? submissionRows.filter((row) => row.exam_slug === selectedExam)
      : accessState === 'consumed' && latestCredit?.consumed_submission_id
        ? submissionRows.filter((row) => row.id === latestCredit.consumed_submission_id)
        : [];
    const courseOrderMap = new Map<string, CourseOrderRow>();
    for (const order of [...(ownedCourseOrders.data ?? []), ...(emailedCourseOrders.data ?? [])] as CourseOrderRow[]) courseOrderMap.set(order.id, order);
    const courseOrderIds = [...courseOrderMap.keys()];
    let courses: StudentCourse[] = [];
    if (courseOrderIds.length) {
      const enrollments = await db.from('course_enrollments').select('order_id').in('order_id', courseOrderIds);
      if (enrollments.error) return fallback;
      const enrolled = new Set((enrollments.data ?? []).map((row) => String(row.order_id)));
      courses = [...courseOrderMap.values()].filter((order) => enrolled.has(order.id)).map(courseFromOrder);
    }
    const currentSubscription = subscriptionRows[0] ?? null;
    const subscription: StudentSubscription | null = currentSubscription ? {
      id: currentSubscription.id,
      status: currentSubscription.status,
      nextChargeAt: currentSubscription.nextChargeAt ?? (currentSubscription as unknown as { next_charge_at: string | null }).next_charge_at,
      periodEndsAt: currentSubscription.periodEndsAt ?? (currentSubscription as unknown as { current_period_end: string | null }).current_period_end,
      cancelRequestedAt: currentSubscription.cancelRequestedAt ?? (currentSubscription as unknown as { cancel_requested_at: string | null }).cancel_requested_at,
    } : null;

    return {
      name: displayName(user, profile), email, dataAvailable: true,
      access: {
        state: accessState,
        product,
        exam: getStudentExamWorkspace(selectedExam),
        startsAt: activeMembership?.starts_at ?? latestCredit?.granted_at ?? null,
        endsAt: activeMembership?.ends_at ?? null,
        singleAttemptAvailable: product === 'single' && latestCredit?.status === 'active',
      },
      subscription,
      attempts: relevantSubmissions.map((row) => toAttempt(row, personalized, feedbackBySubmission.get(row.id))),
      courses,
    };
  } catch {
    return fallback;
  }
}
