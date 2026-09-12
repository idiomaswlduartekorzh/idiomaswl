import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { parseIcfesTeacherIdempotencyKey } from '../src/lib/icfes/teacher-api.ts';
import {
  authenticateIcfesTeacherWorker,
  createIcfesTeacherWorkerCredential,
} from '../src/lib/icfes/teacher-worker-auth.ts';
import {
  hashIcfesTeacherReviewResult,
  ICFES_TEACHER_REVIEW_RESULT_VERSION,
  parseIcfesTeacherReviewResult,
} from '../src/lib/icfes/teacher-review-result.ts';
import { ICFES_TEACHER_RUBRIC_VERSION } from '../src/lib/icfes/teacher-rubric-v1.ts';

const read = (path) => readFileSync(path, 'utf8');
const reviewerId = '123e4567-e89b-42d3-a456-426614174000';
const secret = 'teacher-worker-secret-at-least-32-bytes';
const validResult = {
  version: ICFES_TEACHER_REVIEW_RESULT_VERSION,
  rubricVersion: ICFES_TEACHER_RUBRIC_VERSION,
  summary: 'Buen desempeño global.', strengths: ['Comprensión literal'], priorities: ['Inferencia'],
  itemFeedback: [{ questionId: 'q-1', feedback: 'Revisa el conector que cambia el contraste.' }],
};

test('worker credential derives reviewer identity and fails closed on secret tampering', () => {
  const now = Date.parse('2026-09-12T12:00:00.000Z');
  const credential = createIcfesTeacherWorkerCredential(reviewerId, secret, now);
  assert.equal(authenticateIcfesTeacherWorker(credential, secret, now), reviewerId);
  assert.equal(authenticateIcfesTeacherWorker(credential, `${secret}x`, now), null);
  assert.equal(authenticateIcfesTeacherWorker(credential.replace(reviewerId, '223e4567-e89b-42d3-a456-426614174000'), secret), null);
  assert.equal(authenticateIcfesTeacherWorker(null, secret), null);
  assert.equal(authenticateIcfesTeacherWorker(credential, 'short'), null);
  assert.equal(authenticateIcfesTeacherWorker(credential, secret, now + 15 * 60_000 + 1_000), null);
});

test('teacher result is allowlisted, versioned and deterministically hashed', () => {
  const parsed = parseIcfesTeacherReviewResult(validResult);
  assert.ok(parsed);
  assert.equal(hashIcfesTeacherReviewResult(parsed), hashIcfesTeacherReviewResult(structuredClone(parsed)));
  assert.equal(parseIcfesTeacherReviewResult({ ...validResult, userEmail: 'x@example.com' }), null);
  assert.equal(parseIcfesTeacherReviewResult({ ...validResult, itemFeedback: [{ ...validResult.itemFeedback[0], userId: reviewerId }] }), null);
  assert.notEqual(hashIcfesTeacherReviewResult(parsed), hashIcfesTeacherReviewResult({ ...parsed, summary: 'Texto con drift.' }));
});

test('student request is same-origin, capability-bound, idempotent and derives membership and user server-side', () => {
  const route = read('src/app/api/icfes/teacher-reviews/route.ts');
  const server = read('src/lib/icfes/teacher-ops.server.ts');
  assert.match(route, /sameOrigin\(request\)/);
  assert.match(route, /idempotency-key/);
  assert.match(route, /icfesAttemptCookieName\(attemptId\)/);
  assert.doesNotMatch(route, /body\.(?:userId|user_id|membershipId|membership_id)/);
  assert.match(route, /key !== 'attemptId'/);
  assert.match(server, /auth\.getUser\(\)/);
  assert.match(server, /\.eq\('user_id', userId\)[\s\S]+\.eq\('exam_slug', 'icfes'\)[\s\S]+\.eq\('offer_id', 'exam-teacher'\)/);
  assert.match(server, /verifyIcfesAttemptToken\(input\.attemptCapability\)/);
  assert.match(server, /getIcfesPremiumAvailability\(capability\.examId\)\.eligible/);
  assert.match(server, /isIcfesTeacherReviewRequestReady/);
  assert.equal(parseIcfesTeacherIdempotencyKey(reviewerId), reviewerId);
  assert.equal(parseIcfesTeacherIdempotencyKey('bad'), null);
});

test('private result UI hides request control unless server eligibility exists and never exposes membershipId', () => {
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  const client = read('src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/IcfesPaidResultClient.tsx');
  assert.match(detail, /membership\.offer_id === 'exam-teacher'/);
  assert.match(detail, /userOwnsAttempt && await isIcfesTeacherReviewRequestReady\(membership\.id\)/);
  assert.match(detail, /canRequest: ready && !existing/);
  assert.match(client, /teacherReview\.canRequest \|\| detail\.teacherReview\.status/);
  assert.match(client, /body: JSON\.stringify\(\{ attemptId \}\)/);
  assert.doesNotMatch(client, /membershipId|userId|reviewerId/);
  assert.match(client, /Solicitar mi feedback personalizado/);
  assert.match(client, /itemFeedback/);
});

test('worker endpoints derive reviewer from HMAC credential and allowlist their bodies', () => {
  const claim = read('src/app/api/internal/icfes/teacher-reviews/claim/route.ts');
  const renew = read('src/app/api/internal/icfes/teacher-reviews/renew/route.ts');
  const complete = read('src/app/api/internal/icfes/teacher-reviews/complete/route.ts');
  for (const route of [claim, renew, complete]) {
    assert.match(route, /authenticateIcfesTeacherWorker\(request\.headers\.get\('authorization'\), process\.env\.ICFES_TEACHER_WORKER_SECRET\)/);
    assert.doesNotMatch(route, /input\.reviewerId|body\.reviewerId/);
    assert.match(route, /Cache-Control/);
  }
  assert.match(claim, /\['reviewId', 'stage'\]/);
  assert.match(renew, /\['reviewId', 'leaseId'\]/);
  assert.match(complete, /\['reviewId', 'leaseId', 'outcome', 'result', 'error'\]/);
});

test('SQL fences claim, heartbeat, QA, retry and completion replay by reviewer and lease', () => {
  const sql = read('supabase/migrations/20260909183000_icfes_teacher_review_delivery.sql');
  const server = read('src/lib/icfes/teacher-ops.server.ts');
  assert.match(sql, /workflow_stage text not null default 'review'/);
  assert.match(sql, /claim_xpress_teacher_review_qa/);
  assert.match(sql, /workflow_stage='qa'[\s\S]+status in \('needs_qa','failed'\)/);
  assert.match(sql, /renew_xpress_teacher_review_lease[\s\S]+assigned_to=p_reviewer[\s\S]+lease_id=p_lease[\s\S]+lease_expires_at>now\(\)/);
  assert.match(sql, /completion_reviewer_id<>p_reviewer or current_review\.completion_lease_id<>p_lease/);
  assert.match(sql, /current_review\.lease_expires_at<=now\(\) then return false/);
  assert.match(sql, /teacher_review_completion_drift/);
  assert.match(sql, /review_result->>'version'='icfes-teacher-review-result-2026-09-09-v1'/);
  assert.match(sql, /question->>'id'=feedback->>'questionId'/);
  assert.match(sql, /drop function if exists public\.finish_xpress_teacher_review\(uuid,uuid,text,text\)/);
  assert.match(server, /rpc\('finish_xpress_teacher_review_v2'/);
  assert.doesNotMatch(server, /from\('xpress_teacher_reviews'\)\.update/);
});
