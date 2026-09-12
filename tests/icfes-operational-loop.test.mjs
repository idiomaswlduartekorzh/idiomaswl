import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');

test('the repair migration preserves teacher capacity through order and payment', () => {
  const sql = read('supabase/migrations/20260912160504_icfes_teacher_12h_operational_loop.sql');
  assert.match(sql, /xpress-2026-09-12-v4/);
  assert.match(sql, /xpress-20260912-v3/);
  assert.match(sql, /teacher_reservation uuid/);
  assert.match(sql, /status='order_linked',order_id=new_id/);
  assert.match(sql, /teacher_capacity_reservation_expired/);
  assert.match(sql, /status='consumed',membership_id=selected_membership_id/);
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
  assert.match(sql, /student_completed/);
  assert.match(sql, /enable row level security/);
  assert.match(sql, /attempts<5/);
  assert.match(sql, /status=case when p_success then 'sent' when current_attempts>=5 then 'dead' else 'failed' end/);
  assert.match(sql, /reviewer\.status='active'[\s\S]+reviewer\.calibration_expires_at>now\(\)/);
  assert.match(sql, /set lease_expires_at=now\(\)\+interval '15 minutes'/);
  assert.doesNotMatch(sql, /greatest\(lease_expires_at,now\(\)\)/);
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
  assert.match(client, /Copiar encargo para Codex/);
  assert.match(client, /Aprobar, entregar y notificar/);
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
  assert.match(cron, /isAuthorizedCronRequest/);
  assert.match(cron, /recoverIcfesTeacherNotifications\(50\)/);
  assert.match(vercel, /\/api\/internal\/icfes\/teacher-reviews\/notifications/);
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
  assert.match(result, /language=ingles/);
  assert.match(result, /\/suscripcion\/examenes\?attempt=\$\{result\.attemptId\}/);
  assert.match(subscription, /\/api\/icfes\/attempts\/claim/);
  assert.match(subscription, /attemptClaim === 'claiming'/);
  assert.match(subscription, /icfesAttemptId \? \{ icfesAttemptId \}/);
  assert.match(payments, /legalSnapshot\.icfesAttemptId = input\.icfesAttemptId/);
  assert.match(payments, /redirectPath[\s\S]+attempt=/);
});
