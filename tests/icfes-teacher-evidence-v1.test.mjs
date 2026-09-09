import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  buildIcfesQuestionSnapshot,
  classifyIcfesAttemptClaim,
  hashIcfesQuestionSnapshot,
  isSameIcfesAttemptEvidence,
} from '../src/lib/icfes/attempt-evidence.ts';

const exam = {
  id: 'icfes-own-1', examSlug: 'icfes', title: 'Banco v1', subtitle: 'Propio', timeMinutes: 10,
  sections: [{
    part: 1, title: 'Parte 1', instructions: 'Elige.', passage: 'Texto estable.',
    questions: [{ type: 'mcq', id: 'q1', part: 1, text: 'Pregunta', options: ['A', 'B'], answer: 1 }],
    insights: { q1: { rationales: { A: 'Distractor', B: 'Clave' } } },
  }],
};

function evidence(snapshot = buildIcfesQuestionSnapshot(exam)) {
  return {
    exam_id: exam.id, access_token_hash: 'a'.repeat(64), answers: { q1: 1 },
    basic_result: { attemptId: 'attempt', examId: exam.id, correct: 1, total: 1, percentage: 100,
      byPart: [], bySkill: [], recommendation: { label: 'Seguir', href: '/' }, officialResource: false, premiumEligible: true },
    question_snapshot_version: snapshot.version,
    question_snapshot_hash: hashIcfesQuestionSnapshot(snapshot), question_snapshot: snapshot,
  };
}

test('question evidence is deterministic and captures rendered content, key and rationale', () => {
  const first = buildIcfesQuestionSnapshot(exam);
  const second = buildIcfesQuestionSnapshot(structuredClone(exam));
  assert.equal(hashIcfesQuestionSnapshot(first), hashIcfesQuestionSnapshot(second));
  assert.match(JSON.stringify(first), /Texto estable/);
  assert.match(JSON.stringify(first), /Distractor/);
  assert.match(JSON.stringify(first), /"answer":1/);
});

test('bank drift changes the hash and replay drift is rejected', () => {
  const original = evidence();
  const driftedExam = structuredClone(exam);
  driftedExam.sections[0].questions[0].text = 'Pregunta editada';
  const drifted = evidence(buildIcfesQuestionSnapshot(driftedExam));
  assert.notEqual(original.question_snapshot_hash, drifted.question_snapshot_hash);
  assert.equal(isSameIcfesAttemptEvidence(original, drifted), false);
  assert.equal(isSameIcfesAttemptEvidence(original, { ...original, answers: { q1: 0 } }), false);
  assert.equal(isSameIcfesAttemptEvidence(original, structuredClone(original)), true);
});

test('claim decisions permit first claim and same-owner replay but reject takeover', () => {
  assert.equal(classifyIcfesAttemptClaim(null, 'user-a'), 'CLAIM');
  assert.equal(classifyIcfesAttemptClaim('user-a', 'user-a'), 'REPLAY');
  assert.equal(classifyIcfesAttemptClaim('user-a', 'user-b'), 'REJECT_TAKEOVER');
});

test('server claim is capability-bound, atomic, service-only and cannot mutate evidence', async () => {
  const sql = await readFile(new URL('../supabase/migrations/20260909002000_icfes_attempt_claim_evidence.sql', import.meta.url), 'utf8');
  const helper = await readFile(new URL('../src/lib/icfes/attempt-ownership.server.ts', import.meta.url), 'utf8');
  const route = await readFile(new URL('../src/app/api/icfes/attempts/claim/route.ts', import.meta.url), 'utf8');
  const grade = await readFile(new URL('../src/app/api/icfes/attempts/grade/route.ts', import.meta.url), 'utf8');
  assert.match(helper, /verifyIcfesAttemptToken\(input\.token\)/);
  assert.match(helper, /createHash\('sha256'\)/);
  assert.match(helper, /isIcfesPersistenceEnabled\(\)/);
  assert.doesNotMatch(route, /body\.(?:userId|user_id)/);
  assert.match(route, /auth\.getUser\(\)/);
  assert.match(route, /icfesAttemptCookieName\(attemptId\)/);
  assert.match(grade, /httpOnly: true/);
  assert.match(sql, /pg_advisory_xact_lock/);
  assert.match(sql, /where id=p_attempt for update/);
  assert.match(sql, /current_attempt\.exam_id<>p_exam or current_attempt\.access_token_hash<>p_token_hash/);
  assert.match(sql, /current_attempt\.user_id is not null and current_attempt\.user_id<>p_user/);
  assert.match(sql, /where id=p_attempt and user_id is null returning/);
  assert.match(sql, /icfes_attempt_evidence_immutable/);
  assert.match(sql, /revoke all on function public\.claim_icfes_attempt[^;]+public,anon,authenticated,service_role/);
  assert.match(sql, /grant execute on function public\.claim_icfes_attempt[^;]+service_role/);
});

test('real teacher queue requires owned immutable attempt evidence and exposes no PII', async () => {
  const sql = await readFile(new URL('../supabase/migrations/20260909002000_icfes_attempt_claim_evidence.sql', import.meta.url), 'utf8');
  const serverOps = await readFile(new URL('../src/lib/icfes/teacher-ops.server.ts', import.meta.url), 'utf8');
  assert.match(sql, /id=p_attempt and user_id=p_user/);
  assert.match(sql, /question_snapshot_version='icfes-question-snapshot-2026-09-09-v1'/);
  assert.match(sql, /question_snapshot_hash is not null/);
  assert.match(sql, /attempt\.question_snapshot_hash,\s*attempt\.question_snapshot/);
  const view = sql.match(/create or replace view[\s\S]+?where review\.status='in_review'/)?.[0] ?? '';
  const projection = view.split(/from public\.xpress_teacher_reviews/i)[0];
  assert.doesNotMatch(projection, /user_id|user_email|user_name/);
  assert.doesNotMatch(view, /user_email|user_name/);
  assert.match(view, /attempt\.user_id=review\.user_id/);
  assert.match(serverOps, /claimAndEnqueueIcfesTeacherReview/);
  assert.match(serverOps, /createClient\(\)\)\.auth\.getUser\(\)/);
  assert.match(serverOps, /await claimIcfesAttemptForUser/);
  assert.match(serverOps, /p_snapshot: ICFES_TEACHER_RUBRIC/);
  assert.doesNotMatch(sql, /consumed_by_membership_id/);
  assert.match(sql, /where membership_id=p_membership and status='consumed'/);
  assert.match(sql, /attempt\.answers objective_answers,[\s\S]+review\.due_at,[\s\S]+attempt\.question_snapshot_version/);
  assert.match(sql, /pg_advisory_xact_lock\(pg_catalog\.hashtextextended\(p_membership::text, 12\)\)/);
  assert.match(sql, /existing\.rubric_snapshot<>p_snapshot/);
});
