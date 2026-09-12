import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { XPRESS_EXAM_OPTIONS } from '../src/lib/student-onboarding/catalog.ts';
import { getStudentExamWorkspace, productKindForOffer, STUDENT_PRODUCT_COPY } from '../src/lib/student-dashboard/catalog.ts';
import { studentDashboardPreview } from '../src/lib/student-dashboard/preview-data.ts';
import { buildStudentProgress, parseSkillScores } from '../src/lib/student-dashboard/progress.ts';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('the ten purchasable exam families resolve to their real mock routes', () => {
  assert.equal(XPRESS_EXAM_OPTIONS.length, 10);
  for (const option of XPRESS_EXAM_OPTIONS) {
    const workspace = getStudentExamWorkspace(option.id);
    assert.ok(workspace, `${option.id} must have an available workspace`);
    assert.ok(workspace.mocks.length > 0, `${option.id} must expose real mocks`);
    assert.ok(workspace.mocks.every((mock) => mock.href.startsWith('/')), `${option.id} must use internal routes`);
  }
});

test('the dashboard keeps the three products distinct', () => {
  assert.equal(productKindForOffer('exam-single'), 'single');
  assert.equal(productKindForOffer('exam-auto'), 'automatic');
  assert.equal(productKindForOffer('exam-teacher'), 'personalized');
  assert.equal(STUDENT_PRODUCT_COPY.single.billing, 'pago único');
  assert.equal(STUDENT_PRODUCT_COPY.automatic.billing, 'cada 30 días');
  assert.equal(STUDENT_PRODUCT_COPY.personalized.billing, 'cada 30 días');
  assert.match(STUDENT_PRODUCT_COPY.personalized.summary, /revisión pedagógica personalizada/);
  assert.doesNotMatch(STUDENT_PRODUCT_COPY.personalized.summary, /\bIA\b|inteligencia artificial|revisión humana/i);
});

test('personalized feedback and class enrollment appear only in their preview fixtures', () => {
  const single = studentDashboardPreview('single');
  const automatic = studentDashboardPreview('automatic');
  const personalized = studentDashboardPreview('personalized');
  assert.equal(single.subscription, null);
  assert.equal(single.access.state, 'consumed');
  assert.equal(automatic.attempts.some((attempt) => attempt.feedbackState !== 'not-included'), false);
  assert.equal(personalized.attempts.some((attempt) => attempt.feedbackState === 'delivered'), true);
  assert.equal(personalized.courses.length, 1);
  assert.equal(personalized.assignments.length, 2);
});

test('progress uses comparable attempts and real skill measurements', () => {
  const personalized = studentDashboardPreview('personalized');
  assert.equal(personalized.progress.examSlug, 'ielts');
  assert.deepEqual(personalized.progress.points.map((point) => point.score), [68, 82]);
  assert.equal(personalized.progress.trendPoints, 14);
  assert.equal(personalized.progress.strengths[0].name, 'Reading');
  assert.equal(personalized.progress.improvements[0].name, 'Writing');
  assert.equal(personalized.progress.activeDaysLast30, 5);
  assert.equal(personalized.progress.currentStreak, 3);
  assert.deepEqual(parseSkillScores([{ skill: 'Reading', score: 7, max: 10 }]), [{ name: 'Reading', score: 7, maximum: 10, percentage: 70 }]);
  assert.equal(buildStudentProgress([], null).points.length, 0);
});

test('server loader scopes every private product query to the authenticated identity', () => {
  const loader = read('src/lib/student-dashboard/data.server.ts');
  const page = read('src/app/(site)/dashboard/student/page.tsx');
  assert.match(page, /auth\.getUser\(\)/);
  assert.match(page, /isAdminEmail\(user\.email\)/);
  assert.match(loader, /from\('xpress_memberships'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /from\('xpress_exam_credits'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /from\('xpress_subscriptions'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /from\('exam_submissions'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /from\('course_orders'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /purchaser_email/);
  assert.match(loader, /email_confirmed_at/);
  assert.match(loader, /rpc\('recover_xpress_identity'/);
  assert.match(loader, /from\('student_assignments'\)[\s\S]*?\.eq\('student_id', user\.id\)/);
  assert.match(loader, /from\('daily_activity'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /dataAvailable: false/);
});

test('admin student files and assignments remain server-authorized', () => {
  const page = read('src/app/(site)/dashboard/admin/estudiantes/[studentId]/page.tsx');
  const actions = read('src/lib/actions/studentAssignments.ts');
  const migration = read('supabase/migrations/20260912190000_student_assignments.sql');
  const fulfillment = read('src/lib/course-pricing/fulfillment.server.ts');
  assert.match(page, /await requireAdmin\(\)/);
  assert.match(page, /Curva de aprendizaje/);
  assert.match(page, /createStudentAssignment/);
  assert.match(actions, /student\.plan === 'autodidacta'/);
  assert.match(fulfillment, /studentPlan=selection\.plan==='intensivo'\|\|selection\.plan==='diario'\?'intensivo':'preparacion'/);
  assert.doesNotMatch(fulfillment, /plan:'autodidacta'/);
  assert.match(migration, /alter table public\.student_assignments enable row level security/);
  assert.match(migration, /students read own assignments/);
  assert.match(migration, /students update own assignment completion/);
  assert.match(migration, /grant update\(status,completed_at,updated_at\)/);
  assert.match(migration, /security invoker/);
  assert.match(migration, /student_id=\(select auth\.uid\(\)\)/);
  assert.match(migration, /revoke all on function public\.set_student_assignment_completed/);
});

test('preview route is unavailable in production', () => {
  const preview = read('src/app/(site)/revision/dashboard-estudiante/page.tsx');
  assert.match(preview, /VERCEL_ENV === 'production'/);
  assert.match(preview, /STUDENT_DASHBOARD_PREVIEW !== 'true'/);
  assert.match(preview, /notFound\(\)/);
});

test('completed submissions are linked to paid access without trusting the browser', () => {
  const access = read('src/lib/xpress-commerce/submission-access.server.ts');
  assert.match(access, /from\('exam_submissions'\)[\s\S]*?\.eq\('user_id', input\.userId\)[\s\S]*?\.eq\('exam_slug', input\.examSlug\)/);
  assert.match(access, /from\('xpress_memberships'\)[\s\S]*?\.eq\('user_id', input\.userId\)[\s\S]*?\.eq\('environment', environment\)/);
  assert.match(access, /rpc\('consume_xpress_exam_credit'/);
  assert.match(access, /from\('xpress_submission_access'\)\.upsert/);
  assert.match(access, /from\('xpress_personalized_feedback_requests'\)\.upsert/);

  for (const file of [
    'src/lib/actions/saveExamResult.ts',
    'src/lib/ielts/submission.server.ts',
    'src/lib/toefl/submission.server.ts',
    'src/lib/goethe/submission.server.ts',
  ]) {
    assert.match(read(file), /recordXpressSubmissionAccess\(/, `${file} must record access after completion`);
  }
});

test('the additive migration preserves old purchases and enforces the new prices privately', () => {
  const migration = read('supabase/migrations/20260912150000_xpress_personalized_feedback_prices.sql');
  assert.match(migration, /xpress-2026-09-12-v4/);
  assert.match(migration, /xpress-2026-09-12-v5/);
  assert.match(migration, /offer_version='xpress-2026-09-12-v5'[\s\S]*?offer_id='exam-single'[\s\S]*?amount_in_cents=1290000/);
  assert.match(migration, /exam-auto' and amount_in_cents=4990000/);
  assert.match(migration, /exam-teacher' and amount_in_cents=9990000/);
  assert.match(migration, /create table public\.xpress_submission_access/);
  assert.match(migration, /submission_id uuid not null unique references public\.exam_submissions/);
  assert.match(migration, /credit_id uuid unique references public\.xpress_exam_credits/);
  assert.match(migration, /alter table public\.xpress_submission_access enable row level security/);
  assert.match(migration, /revoke all on public\.xpress_submission_access from public,anon,authenticated,service_role/);
  assert.match(migration, /alter table public\.xpress_personalized_feedback_requests enable row level security/);
  assert.match(migration, /revoke all on public\.xpress_personalized_feedback_requests from public,anon,authenticated,service_role/);
  assert.match(migration, /does not represent a human teacher review/);
  assert.match(migration, /create function public\.recover_xpress_identity/);
  assert.match(migration, /email_confirmed_at is not null/);
  assert.match(migration, /identity_recovery_subscription_conflict/);
  assert.match(migration, /grant execute on function public\.recover_xpress_identity\(uuid,text,text\) to service_role/);
});

test('paid reports remain addressable after a subscription ends or another single exam is purchased', () => {
  const loader = read('src/lib/student-dashboard/data.server.ts');
  const report = read('src/app/(site)/dashboard/student/resultados/[submissionId]/page.tsx');
  assert.match(loader, /from\('xpress_submission_access'\)[\s\S]*?\.eq\('user_id', user\.id\)/);
  assert.match(loader, /consumedSubmissionIds/);
  assert.match(loader, /isMembershipSubmission/);
  assert.match(loader, /accessBySubmission\.has\(row\.id\)/);
  assert.match(report, /dashboard\.attempts\.find\(\(item\) => item\.id === submissionId\)/);
  assert.match(report, /attempt\.examHubHref/);
});
