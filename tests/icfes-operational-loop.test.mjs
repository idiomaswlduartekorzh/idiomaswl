import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');

test('the repair migration preserves teacher capacity through order and payment', () => {
  const sql = read('supabase/migrations/20260912160504_icfes_teacher_12h_operational_loop.sql');
  assert.match(sql, /xpress-2026-09-12-v5/);
  assert.match(sql, /xpress-20260912-v4/);
  assert.match(sql, /teacher_reservation uuid/);
  assert.match(sql, /status='order_linked',order_id=new_id/);
  assert.match(sql, /teacher_capacity_reservation_expired/);
  assert.match(sql, /status='consumed',membership_id=selected_membership_id/);
  assert.match(sql, /order_kind in \('subscription_start','renewal'\)/);
  assert.match(sql, /selected_order\.subscription_id is not null[\s\S]+xpress_subscriptions set/);
  assert.match(sql, /payment_failure_count=least\(3,payment_failure_count\+1\)/);
  assert.match(sql, /xpress_subscription_notifications\(subscription_id,order_id,event_key,kind\)/);
  assert.match(sql, /selected_order\.subscription_id[\s\S]+xpress_teacher_capacity_reservations/);
  assert.match(sql, /order_kind='single'[\s\S]+xpress_exam_credits/);
  assert.match(sql, /open_reviews/);
  assert.match(sql, /projected:=held_reservations\+outstanding_credits\+open_reviews\+1/);
  assert.match(sql, /status='cancelled',last_error='payment_revoked'/);
});

test('new reviews use 12 hours and a durable private notification outbox', () => {
  const sql = read('supabase/migrations/20260912160504_icfes_teacher_12h_operational_loop.sql');
  assert.match(sql, /alter column due_at set default now\(\)\+interval '12 hours'/);
  assert.match(sql, /create table public\.xpress_teacher_review_notifications/);
  assert.match(sql, /owner_requested'[\s\S]+owner_due_6h'[\s\S]+owner_due_9h'[\s\S]+owner_due_11h'[\s\S]+owner_breached'/);
  assert.match(sql, /references public\.xpress_teacher_reviews\(id\) on delete cascade/);
  assert.match(sql, /claim_xpress_teacher_review_notification\(p_lease uuid,p_environment text\)/);
  assert.match(sql, /review\.environment=p_environment/);
  assert.match(sql, /notification\.updated_at<now\(\)-interval '10 minutes'[\s\S]+review\.environment=p_environment/);
  assert.match(sql, /student_completed/);
  assert.match(sql, /enable row level security/);
  assert.match(sql, /attempts<5/);
  assert.match(sql, /status=case when p_success then 'sent' when current_attempts>=5 then 'dead' else 'failed' end/);
  assert.match(sql, /reviewer\.status='active'[\s\S]+reviewer\.calibration_expires_at>now\(\)/);
  assert.match(sql, /set lease_expires_at=now\(\)\+interval '15 minutes'/);
  assert.doesNotMatch(sql, /greatest\(lease_expires_at,now\(\)\)/);
  assert.match(sql, /claim_next_xpress_teacher_review_v3[\s\S]+for update skip locked limit 1/);
  assert.match(sql, /retry_xpress_teacher_review_notification/);
});

test('owner inbox is admin-only and keeps the Codex handoff pseudonymous', () => {
  const route = read('src/app/api/admin/icfes/teacher-reviews/route.ts');
  const page = read('src/app/(site)/dashboard/admin/icfes-reviews/page.tsx');
  const client = read('src/app/(site)/dashboard/admin/icfes-reviews/IcfesReviewInbox.tsx');
  assert.match(route, /requireAdmin\(\)/);
  assert.match(route, /sameOrigin\(request\)/);
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.doesNotMatch(route, /select\([^)]*(?:purchaser_email|user_email|phone|full_name)/);
  assert.match(client, /payload pseudonimizado/);
  assert.match(client, /Copiar y registrar handoff a Codex/);
  assert.match(client, /Aprobar humanamente, entregar y notificar/);
  assert.match(client, /humanAttested/);
  assert.match(route, /recordIcfesTeacherCodexHandoff/);
  assert.match(route, /input\.humanAttested !== true/);
  assert.match(route, /parseIcfesTeacherReviewResult\(input\.result\)/);
});

test('owner and learner emails are claimed, idempotent and recoverable by cron', () => {
  const notifications = read('src/lib/icfes/teacher-notifications.server.ts');
  const cron = read('src/app/api/internal/icfes/teacher-reviews/notifications/route.ts');
  const vercel = read('vercel.json');
  assert.match(notifications, /claim_xpress_teacher_review_notification/);
  assert.match(notifications, /finish_xpress_teacher_review_notification/);
  assert.match(notifications, /idempotencyKey: `icfes-teacher\/\$\{row\.id\}`/);
  assert.match(notifications, /COURSE_OWNER_NOTIFICATION_EMAIL/);
  assert.match(notifications, /Tu retroalimentación ICFES está lista/);
  assert.match(notifications, /isJoseAdminEmail\(ownerEmail\)/);
  assert.match(notifications, /no se presenta como revisión humana/);
  assert.match(cron, /isAuthorizedCronRequest/);
  assert.match(cron, /recoverIcfesTeacherNotifications\(50\)/);
  assert.match(vercel, /\/api\/internal\/icfes\/teacher-reviews\/notifications/);
});

test('human attribution requires durable Codex evidence and an authorized reviewer attestation', () => {
  const sql = read('supabase/migrations/20260912160504_icfes_teacher_12h_operational_loop.sql');
  const internalComplete = read('src/app/api/internal/icfes/teacher-reviews/complete/route.ts');
  const serverOps = read('src/lib/icfes/teacher-ops.server.ts');
  const studentApi = read('src/app/api/icfes/teacher-reviews/route.ts');
  const studentUi = read('src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/IcfesPaidResultClient.tsx');
  assert.match(sql, /record_xpress_teacher_codex_handoff/);
  assert.match(sql, /p_human_attested is not true/);
  assert.match(sql, /codex_handoff_lease_id<>p_lease/);
  assert.match(sql, /human_attested_at=now\(\)/);
  assert.match(sql, /drop function if exists public\.finish_xpress_teacher_review\(uuid,uuid,text,text\)/);
  assert.doesNotMatch(internalComplete, /outcome === 'completed'/);
  assert.match(studentApi, /delivery_attribution/);
  assert.match(serverOps, /completion_reviewer_id/);
  assert.match(serverOps, /calibratedAt <= attestedAt && attestedAt < calibrationExpiresAt/);
  assert.match(serverOps, /row\.review_result = null;[\s\S]+row\.delivery_attribution = null;/);
  assert.doesNotMatch(serverOps, /welearning-ai-assisted/);
  assert.match(studentUi, /Feedback pedagógico personalizado de WeLearn con asistencia de IA/);
  assert.doesNotMatch(studentUi, /docente humano|revisión humana/i);
});

test('free results and revoked access fail closed', () => {
  const grading = read('src/app/api/icfes/attempts/grade/route.ts');
  const contract = read('src/lib/icfes/attempt-contract.ts');
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  const payments = read('src/lib/icfes/payment-events.server.ts');
  assert.match(grading, /toIcfesPublicResult/);
  assert.match(contract, /IcfesPublicResultDto/);
  assert.match(contract, /correct: result\.correct/);
  assert.match(contract, /percentage: result\.percentage/);
  assert.doesNotMatch(contract.match(/export function toIcfesPublicResult[\s\S]+?\n\}/)?.[0] ?? '', /byPart|bySkill|recommendation/);
  assert.match(detail, /from\('icfes_entitlements'\)[\s\S]+\.eq\('status', 'active'\)/);
  assert.match(payments, /nextStatus === 'VOIDED'/);
  assert.match(payments, /status: 'revoked', revoked_at: now/);
});

test('the anonymous result survives registration and returns after membership payment', () => {
  const result = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  const subscription = read('src/app/(site)/suscripcion/examenes/XpressMembershipClient.tsx');
  const payments = read('src/lib/xpress-commerce/payments.server.ts');
  assert.match(result, /\/suscripcion\/examenes\?attempt=\$\{result\.attemptId\}&plan=exam-auto/);
  assert.match(subscription, /\/api\/icfes\/attempts\/claim/);
  assert.match(subscription, /attemptClaim === 'claiming'/);
  assert.match(subscription, /name="icfes_attempt_id" value=\{icfesAttemptId \?\? ''\}/);
  assert.match(read('src/lib/xpress-commerce/subscriptions.server.ts'), /icfesAttemptId \? \{ icfesAttemptId \} : \{\}/);
  assert.match(payments, /redirectPath[\s\S]+attempt=/);
});
