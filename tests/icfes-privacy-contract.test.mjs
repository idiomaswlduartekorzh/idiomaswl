import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const migration = readFileSync('supabase/migrations/20260909170000_icfes_privacy_foundation.sql', 'utf8');
const teacherMigration = readFileSync('supabase/migrations/20260909001000_icfes_teacher_review_queue.sql', 'utf8');
const operationsMigration = readFileSync('supabase/migrations/20260909180000_icfes_privacy_operations.sql', 'utf8');
const guide = readFileSync('docs/icfes-privacy-contract.md', 'utf8');

function between(source, start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, `missing bounded SQL section: ${start}`);
  return source.slice(from, to);
}

test('the seeded privacy contract is blocked and contains no invented legal values', () => {
  assert.match(migration, /values\s*\(\s*'icfes-privacy-2026-09-draft'\s*,\s*'DRAFT_BLOCKED'\s*\)/i);
  assert.doesNotMatch(migration, /values\s*\(\s*'icfes-privacy-2026-09-draft'\s*,\s*'APPROVED'\s*\)/i);
  for (const field of ['attempt_retention_days', 'export_response_days', 'deletion_response_days', 'minor_handling', 'legal_basis', 'approval_evidence_ref']) {
    assert.ok(migration.includes(field));
  }
  for (const field of ['processing_purpose', 'legal_basis', 'approved_by', 'approval_evidence_ref']) {
    assert.match(migration, new RegExp(`and\\s+${field}\\s+is\\s+not\\s+null`, 'i'));
  }
  assert.match(guide, /no constituye aprobación jurídica/i);
});

test('attempt writes fail closed without an approved contract and calculate retention in SQL', () => {
  assert.match(migration, /contract\.status\s*<>\s*'APPROVED'/i);
  assert.match(migration, /raise exception 'icfes_privacy_contract_not_approved'/i);
  assert.match(migration, /new\.retention_expires_at\s*:=\s*new\.created_at\s*\+\s*make_interval/i);
  assert.match(migration, /icfes_privacy_contract_approved_version_immutable/);
});

test('minor handling stores no birth date and blocks unknown or unattested status', () => {
  assert.match(migration, /age_assurance\s+in\s*\(\s*'UNKNOWN'\s*,\s*'ADULT_ATTESTED'\s*,\s*'MINOR_GUARDIAN_ATTESTED'\s*,\s*'MINOR_UNATTESTED'\s*\)/i);
  assert.match(migration, /new\.age_assurance\s*=\s*'UNKNOWN'/i);
  assert.match(migration, /new\.age_assurance\s*=\s*'MINOR_UNATTESTED'/i);
  assert.match(migration, /contract\.minor_handling\s*<>\s*'GUARDIAN_ATTESTATION'/i);
  assert.doesNotMatch(migration, /date_of_birth|birth_date|document_number/i);
});

test('basic free result cannot persist answer keys or rationales', () => {
  assert.match(migration, /basic_result\s+\?\|\s+array\s*\[\s*'answer'\s*,\s*'answers'\s*,\s*'correctAnswer'\s*,\s*'rationale'\s*,\s*'explanation'\s*,\s*'questions'\s*\]/i);
});

test('teacher payload protects the real queue instead of creating a parallel workflow', () => {
  assert.doesNotMatch(migration, /icfes_teacher_review_assignments|icfes_teacher_review_payloads/);
  const view = between(teacherMigration, 'create view public.xpress_teacher_review_payloads', 'create table public.xpress_teacher_review_alerts');
  const projection = view.slice(0, view.indexOf('\nfrom public.xpress_teacher_reviews'));
  assert.match(view, /security_invoker\s*=\s*true/);
  assert.match(view, /from public\.xpress_teacher_reviews review/);
  assert.match(view, /join public\.icfes_attempts attempt/);
  assert.match(view, /attempt\.id=review\.icfes_attempt_id and attempt\.user_id=review\.user_id/);
  assert.match(view, /extensions\.digest\(attempt\.id::text\s*,\s*'sha256'\)/);
  assert.match(view, /attempt\.answers as objective_answers/);
  assert.match(view, /attempt\.basic_result/);
  assert.match(view, /review_subject_ref/);
  assert.doesNotMatch(view, /join public\.exam_submissions/);
  assert.doesNotMatch(projection, /attempt\.user_id|user_email|user_name|email|phone/i);
  assert.doesNotMatch(view, /rubric_snapshot/);
  assert.match(teacherMigration, /get_xpress_teacher_review_payload[\s\S]+review\.assigned_to=p_reviewer[\s\S]+review\.lease_id=p_lease[\s\S]+reviewer\.calibration_expires_at>now\(\)/);
});

test('browser roles have no table grants and service updates are column-scoped', () => {
  const combined = `${migration}\n${teacherMigration}`;
  assert.match(migration, /revoke all on table[\s\S]+from public\s*,\s*anon\s*,\s*authenticated\s*,\s*service_role/i);
  assert.match(teacherMigration, /revoke all on public\.xpress_teacher_reviewers[\s\S]+public\.xpress_teacher_review_payloads[\s\S]+from public\s*,\s*anon\s*,\s*authenticated\s*,\s*service_role/);
  assert.match(teacherMigration, /revoke all on function public\.get_xpress_teacher_review_payload\(uuid,uuid,uuid\)[\s\S]+from public\s*,\s*anon\s*,\s*authenticated\s*,\s*service_role/);
  assert.doesNotMatch(combined, /GRANT[^;]+TO (?:anon|authenticated)/i);
  assert.match(migration, /grant update\s*\(\s*user_id\s*,\s*updated_at\s*\)\s+on table public\.icfes_attempts to service_role/i);
  assert.doesNotMatch(migration, /GRANT (?:SELECT, INSERT, )?UPDATE ON TABLE public\.icfes_attempts/);
});

test('export/delete/purge operations exist but remain honestly policy-blocked', () => {
  assert.match(migration, /request_type\s+text\s+not null\s+check\s*\(\s*request_type\s+in\s*\(\s*'EXPORT'\s*,\s*'DELETE'\s*\)\s*\)/i);
  assert.match(migration, /status text not null default 'BLOCKED_POLICY'/i);
  assert.match(operationsMigration, /CREATE FUNCTION public\.export_icfes_user_data/);
  assert.match(operationsMigration, /CREATE FUNCTION public\.delete_icfes_user_data/);
  assert.match(operationsMigration, /CREATE FUNCTION public\.purge_expired_icfes_attempts/);
  assert.doesNotMatch(operationsMigration, /cron\.schedule/);
  assert.match(guide, /sigue siendo un blocker/i);
});
