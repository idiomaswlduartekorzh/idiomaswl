import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { objectiveLabel } from '@/lib/course-pricing/catalog';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { authenticatedResultHref, getStudentExamWorkspace, productKindForOffer } from './catalog';
import { buildStudentProgress, parseSkillScores } from './progress';
import type { StudentAssignment, StudentAttempt, StudentCourse, StudentDashboardData, StudentSubscription } from './types';

type AuthUser = Readonly<{
  id: string;
  email?: string | null;
  email_confirmed_at?: string | null;
  user_metadata?: Record<string, unknown>;
}>;

type Profile = { full_name?: string | null; target_exam?: string | null } | null;
type MembershipRow = { offer_id: string; exam_slug: string; status: string; starts_at: string; ends_at: string; created_at: string };
type CreditRow = { offer_id?: string; exam_slug: string; status: string; granted_at: string; consumed_at: string | null; consumed_submission_id: string | null };
type SubmissionRow = {
  id: string; exam_slug: string; mock_id: string | null; mock_title: string | null; total_score: number | null;
  total_max: number | null; total_label: string | null; created_at: string; reviewed_at: string | null;
  skills: unknown;
  writing_task1_assessment: unknown; writing_task2_assessment: unknown;
  toefl_speaking_repeat_assessment: unknown; toefl_speaking_interview_assessment: unknown;
};
type SubscriptionRow = StudentSubscription & { offer_id: string; exam_slug: string; created_at: string };
type CourseOrderRow = { id: string; selection: unknown; amount_in_cents: number; classes: number; sessions: number; created_at: string };
type FeedbackRow = { submission_id: string; status: 'pending' | 'processing' | 'completed' | 'failed'; generated_report?: unknown };
type SubmissionAccessRow = { submission_id: string; offer_id: string; personalized_feedback: boolean };
type AssignmentRow = {
  id: string; title: string; instructions: string; resource_url: string | null; due_at: string | null;
  status: StudentAssignment['status']; assigned_at: string; completed_at: string | null;
};
type CourseProgressRow = { course_slug: string; completed_at: string };

const COURSE_SLUGS: Record<string, string> = {
  ingles: 'english', coreano: 'korean', frances: 'french', aleman: 'german', italiano: 'italian',
  portugues: 'portuguese', japones: 'japanese', ruso: 'russian',
};

function commerceEnvironment(): 'sandbox' | 'production' {
  return getWompiServerConfig().environment;
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

function teacherFeedback(value: unknown): StudentAttempt['teacherFeedback'] {
  if (!value || typeof value !== 'object') return null;
  const report = value as Record<string, unknown>;
  if (typeof report.summary !== 'string' || typeof report.strengths !== 'string'
    || typeof report.improvements !== 'string' || typeof report.nextSteps !== 'string') return null;
  return { summary: report.summary, strengths: report.strengths,
    improvements: report.improvements, nextSteps: report.nextSteps };
}

function toAttempt(row: SubmissionRow, personalized: boolean, feedback?: FeedbackRow): StudentAttempt {
  const score = normalizedScore(row);
  const exam = getStudentExamWorkspace(row.exam_slug);
  const deliveredFeedback = feedback?.status === 'completed' ? teacherFeedback(feedback.generated_report) : null;
  return {
    id: row.id,
    examSlug: row.exam_slug,
    examName: exam?.name ?? row.exam_slug.toUpperCase(),
    examFlag: exam?.flag ?? '',
    examHubHref: exam?.hubHref ?? '/examenes',
    mockId: row.mock_id,
    title: row.mock_title?.trim() || 'Simulacro completado',
    createdAt: row.created_at,
    score: score.score,
    scoreLabel: score.label,
    reportHref: authenticatedResultHref(row.id),
    skills: parseSkillScores(row.skills),
    feedbackState: personalized
      ? (deliveredFeedback ? 'delivered' : feedback?.status === 'failed' ? 'failed' : feedback ? 'processing' : 'available')
      : 'not-included',
    teacherFeedback: deliveredFeedback,
  };
}

export async function loadOwnedPaidAttempt(user: AuthUser, submissionId: string): Promise<StudentAttempt | null> {
  if (!user.email) return null;
  const db = createAdminClient();
  const environment = commerceEnvironment();
  const { data: submission, error: submissionError } = await db.from('exam_submissions')
    .select('id,exam_slug,mock_id,mock_title,total_score,total_max,total_label,skills,created_at,reviewed_at,writing_task1_assessment,writing_task2_assessment,toefl_speaking_repeat_assessment,toefl_speaking_interview_assessment')
    .eq('id', submissionId).eq('user_id', user.id).maybeSingle();
  if (submissionError || !submission) return null;
  const row = submission as SubmissionRow;
  const [access, credit, membership, feedback] = await Promise.all([
    db.from('xpress_submission_access').select('offer_id,personalized_feedback')
      .eq('submission_id', submissionId).eq('user_id', user.id).eq('environment', environment).maybeSingle(),
    db.from('xpress_exam_credits').select('id').eq('user_id', user.id).eq('environment', environment)
      .eq('consumed_submission_id', submissionId).maybeSingle(),
    db.from('xpress_memberships').select('offer_id').eq('user_id', user.id).eq('environment', environment)
      .eq('exam_slug', row.exam_slug).eq('status', 'active').lte('starts_at', row.created_at)
      .gt('ends_at', row.created_at).limit(1).maybeSingle(),
    db.from('xpress_personalized_feedback_requests').select('submission_id,status,generated_report').eq('submission_id', submissionId)
      .eq('user_id', user.id).maybeSingle(),
  ]);
  if ([access, credit, membership, feedback].some((result) => result.error)) return null;
  if (!access.data && !credit.data && !membership.data) return null;
  const personalized = access.data?.personalized_feedback === true || access.data?.offer_id === 'exam-teacher'
    || membership.data?.offer_id === 'exam-teacher' || Boolean(feedback.data);
  return toAttempt(row, personalized, (feedback.data as FeedbackRow | null) ?? undefined);
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
    subscription: null, attempts: [], courses: [], courseProgress: { completedActivities: 0, lastCompletedAt: null }, assignments: [],
    progress: buildStudentProgress([], profile?.target_exam),
  };
  if (!user.email) return fallback;

  try {
    const db = createAdminClient();
    const environment = commerceEnvironment();
    const email = user.email.trim().toLowerCase();
    if (user.email_confirmed_at) {
      const { error: recoveryError } = await db.rpc('recover_xpress_identity', {
        p_user: user.id, p_email: email, p_environment: environment,
      });
      if (recoveryError) return fallback;
    }
    const [memberships, credits, subscriptions, submissions, submissionAccess, feedbackRequests, ownedCourseOrders, emailedCourseOrders, activity, assignmentRows, courseProgressRows] = await Promise.all([
      db.from('xpress_memberships').select('offer_id,exam_slug,status,starts_at,ends_at,created_at')
        .eq('user_id', user.id).eq('environment', environment).order('created_at', { ascending: false }).limit(20),
      db.from('xpress_exam_credits').select('exam_slug,status,granted_at,consumed_at,consumed_submission_id')
        .eq('user_id', user.id).eq('environment', environment).order('granted_at', { ascending: false }).limit(20),
      db.from('xpress_subscriptions').select('id,offer_id,exam_slug,status,next_charge_at,current_period_end,cancel_requested_at,created_at')
        .eq('user_id', user.id).eq('environment', environment).order('created_at', { ascending: false }).limit(5),
      db.from('exam_submissions').select('id,exam_slug,mock_id,mock_title,total_score,total_max,total_label,skills,created_at,reviewed_at,writing_task1_assessment,writing_task2_assessment,toefl_speaking_repeat_assessment,toefl_speaking_interview_assessment')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(100),
      db.from('xpress_submission_access').select('submission_id,offer_id,personalized_feedback')
        .eq('user_id', user.id).eq('environment', environment).order('granted_at', { ascending: false }).limit(100),
      db.from('xpress_personalized_feedback_requests').select('submission_id,status,generated_report')
        .eq('user_id', user.id).order('created_at', { ascending: false }).limit(100),
      db.from('course_orders').select('id,selection,amount_in_cents,classes,sessions,created_at')
        .eq('user_id', user.id).eq('environment', environment).order('created_at', { ascending: false }).limit(20),
      user.email_confirmed_at
        ? db.from('course_orders').select('id,selection,amount_in_cents,classes,sessions,created_at')
          .eq('purchaser_email', email).eq('environment', environment).order('created_at', { ascending: false }).limit(20)
        : Promise.resolve({ data: [] as CourseOrderRow[], error: null }),
      db.from('daily_activity').select('activity_date').eq('user_id', user.id).order('activity_date', { ascending: false }).limit(365),
      db.from('student_assignments').select('id,title,instructions,resource_url,due_at,status,assigned_at,completed_at')
        .eq('student_id', user.id).neq('status', 'canceled').order('assigned_at', { ascending: false }).limit(100),
      db.from('user_progress').select('course_slug,completed_at').eq('user_id', user.id)
        .order('completed_at', { ascending: false }).limit(1000),
    ]);
    const failed = [memberships, credits, subscriptions, submissions, submissionAccess, feedbackRequests, ownedCourseOrders, emailedCourseOrders, activity, assignmentRows, courseProgressRows].some((result) => result.error);
    if (failed) return fallback;

    const now = Date.now();
    const membershipRows = (memberships.data ?? []) as MembershipRow[];
    const creditRows = (credits.data ?? []) as CreditRow[];
    const subscriptionRows = (subscriptions.data ?? []) as unknown as SubscriptionRow[];
    const submissionRows = (submissions.data ?? []) as SubmissionRow[];
    const accessRows = (submissionAccess.data ?? []) as SubmissionAccessRow[];
    const accessBySubmission = new Map(accessRows.map((row) => [row.submission_id, row]));
    const feedbackBySubmission = new Map(((feedbackRequests.data ?? []) as FeedbackRow[]).map((row) => [row.submission_id, row]));
    const activeMembership = membershipRows.find((row) => row.status === 'active' && Date.parse(row.starts_at) <= now && Date.parse(row.ends_at) > now);
    const latestCredit = creditRows.find((row) => row.status === 'active' || row.status === 'consumed') ?? null;
    const latestMembership = membershipRows[0] ?? null;
    const selectedExam = activeMembership?.exam_slug || latestCredit?.exam_slug || latestMembership?.exam_slug || subscriptionRows[0]?.exam_slug || profile?.target_exam || null;
    const product = activeMembership ? productKindForOffer(activeMembership.offer_id) : latestCredit ? 'single' : latestMembership ? productKindForOffer(latestMembership.offer_id) : null;
    const accessState = activeMembership ? 'active' : latestCredit?.status === 'active' ? 'active' : latestCredit?.status === 'consumed' ? 'consumed' : latestMembership ? 'expired' : 'none';
    const consumedSubmissionIds = new Set(creditRows.flatMap((row) => row.consumed_submission_id ? [row.consumed_submission_id] : []));
    const isMembershipSubmission = (row: SubmissionRow) => membershipRows.some((membership) => (
      membership.status === 'active' && membership.exam_slug === row.exam_slug
      && Date.parse(row.created_at) >= Date.parse(membership.starts_at)
      && Date.parse(row.created_at) < Date.parse(membership.ends_at)
    ));
    const relevantSubmissions = submissionRows.filter((row) => (
      accessBySubmission.has(row.id) || consumedSubmissionIds.has(row.id)
      || feedbackBySubmission.has(row.id) || isMembershipSubmission(row)
    ));
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

    const attempts = relevantSubmissions.map((row) => {
      const ledgerAccess = accessBySubmission.get(row.id);
      const personalized = ledgerAccess?.personalized_feedback === true || ledgerAccess?.offer_id === 'exam-teacher'
        || feedbackBySubmission.has(row.id)
        || membershipRows.some((membership) => membership.offer_id === 'exam-teacher' && membership.exam_slug === row.exam_slug
          && Date.parse(row.created_at) >= Date.parse(membership.starts_at) && Date.parse(row.created_at) < Date.parse(membership.ends_at));
      return toAttempt(row, personalized, feedbackBySubmission.get(row.id));
    });
    const assignments: StudentAssignment[] = ((assignmentRows.data ?? []) as AssignmentRow[]).map((row) => ({
      id: row.id, title: row.title, instructions: row.instructions, resourceUrl: row.resource_url,
      dueAt: row.due_at, status: row.status, assignedAt: row.assigned_at, completedAt: row.completed_at,
    }));
    const activityDates = (activity.data ?? []).map((row) => String(row.activity_date));
    const selectedCourseSlugs = new Set(courses.flatMap((course) => {
      const translated = COURSE_SLUGS[course.language];
      return translated ? [course.language, translated] : [course.language];
    }));
    const completedCourseRows = ((courseProgressRows.data ?? []) as CourseProgressRow[])
      .filter((row) => selectedCourseSlugs.has(row.course_slug));

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
      attempts,
      courses,
      courseProgress: { completedActivities: completedCourseRows.length,
        lastCompletedAt: completedCourseRows[0]?.completed_at ?? null },
      assignments,
      progress: buildStudentProgress(attempts, selectedExam, activityDates),
    };
  } catch {
    return fallback;
  }
}
