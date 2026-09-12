import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { XPRESS_EXAM_OPTIONS } from '../src/lib/student-onboarding/catalog.ts';
import { getStudentExamWorkspace, productKindForOffer, STUDENT_PRODUCT_COPY } from '../src/lib/student-dashboard/catalog.ts';
import { studentDashboardPreview } from '../src/lib/student-dashboard/preview-data.ts';

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
  assert.match(STUDENT_PRODUCT_COPY.personalized.summary, /asistido por IA/);
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
  assert.match(loader, /dataAvailable: false/);
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
  assert.match(migration, /alter table public\.xpress_personalized_feedback_requests enable row level security/);
  assert.match(migration, /revoke all on public\.xpress_personalized_feedback_requests from public,anon,authenticated,service_role/);
  assert.match(migration, /does not represent a human teacher review/);
});
