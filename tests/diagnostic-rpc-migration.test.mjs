import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sql = (await Promise.all([
  readFile(new URL('../supabase/migrations/20260925000447_diagnostic_attempts.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925001940_diagnostic_attempt_rpcs.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925014500_diagnostic_writing_submission.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925021500_diagnostic_finalization.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925030000_diagnostic_writing_automation.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925031500_diagnostic_human_writing_review.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925033000_diagnostic_human_only_writing.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925034500_diagnostic_consent_evidence.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925050000_diagnostic_delivery_policy.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925051500_diagnostic_pilot_retests.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260928090000_diagnostic_written_discourse.sql', import.meta.url), 'utf8'),
])).join('\n').toLowerCase();

test('diagnostic mutations are atomic security-invoker functions', () => {
  assert.match(sql, /create function public\.create_diagnostic_attempt/);
  assert.match(sql, /create function public\.submit_diagnostic_objective_stage/);
  assert.match(sql, /create function public\.submit_diagnostic_writing_stage/);
  assert.match(sql, /create function public\.complete_diagnostic_attempt/);
  assert.match(sql, /create function public\.record_diagnostic_automated_writing_evaluation/);
  assert.match(sql, /create function public\.record_diagnostic_human_writing_evaluation/);
  assert.equal((sql.match(/\nsecurity invoker\n/g) ?? []).length, 15);
  assert.equal(sql.includes('security definer'), false);
  assert.equal((sql.match(/set search_path = ''/g) ?? []).length, 15);
});

test('only service_role can execute diagnostic mutation functions', () => {
  assert.match(sql, /revoke all on function public\.create_diagnostic_attempt\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.create_diagnostic_attempt\([\s\S]+?to service_role;/);
  assert.match(sql, /revoke all on function public\.submit_diagnostic_objective_stage\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.submit_diagnostic_objective_stage\([\s\S]+?to service_role;/);
  assert.match(sql, /revoke all on function public\.submit_diagnostic_writing_stage\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.submit_diagnostic_writing_stage\([\s\S]+?to service_role;/);
  assert.match(sql, /revoke all on function public\.complete_diagnostic_attempt\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.complete_diagnostic_attempt\([\s\S]+?to service_role;/);
  assert.match(sql, /revoke all on function public\.record_diagnostic_automated_writing_evaluation\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.record_diagnostic_automated_writing_evaluation\([\s\S]+?to service_role;/);
  assert.match(sql, /revoke all on function public\.record_diagnostic_human_writing_evaluation\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.record_diagnostic_human_writing_evaluation\([\s\S]+?to service_role;/);
  assert.equal(/to (anon|authenticated)/.test(sql), false);
});

test('first human review is immutable and can move to independent adjudication', () => {
  assert.match(sql, /v_writing\.automated_evaluation is null[\s\S]+?diagnostic_automated_evaluation_missing/);
  assert.match(sql, /v_writing\.human_evaluation = p_human_evaluation[\s\S]+?'replayed', true/);
  assert.match(sql, /diagnostic_human_evaluation_conflict/);
  assert.match(sql, /p_next_status not in \('human-review','adjudication'\)/);
  assert.match(sql, /set human_evaluation = p_human_evaluation,[\s\S]+?status = p_next_status/);
});

test('human-only writing review is allowed from pending while finalization binds stored evidence', () => {
  assert.match(sql, /v_writing\.automated_evaluation is null and v_writing\.status <> 'pending'/);
  assert.match(sql, /v_writing\.automated_evaluation is not null and v_writing\.status <> 'automated-scored'/);
  assert.match(sql, /p_automated_evaluation is not null and jsonb_typeof\(p_automated_evaluation\) <> 'object'/);
  assert.match(sql, /v_writing\.automated_evaluation is distinct from p_automated_evaluation/);
  assert.match(sql, /v_writing\.human_evaluation is distinct from p_human_evaluation/);
});

test('automated writing evidence is stored once and conflicting retries fail closed', () => {
  assert.match(sql, /v_attempt\.status <> 'scoring'/);
  assert.match(sql, /v_writing\.automated_evaluation = p_automated_evaluation[\s\S]+?'replayed', true/);
  assert.match(sql, /diagnostic_automated_evaluation_conflict/);
  assert.match(sql, /set automated_evaluation = p_automated_evaluation,[\s\S]+?status = 'automated-scored'/);
  assert.match(sql, /'writing\.automated_scored'/);
});

test('finalization publishes writing evidence and the result profile in one transaction', () => {
  assert.match(sql, /v_attempt\.status <> 'scoring'/);
  assert.match(sql, /v_writing\.status not in \('pending','automated-scored','human-review','adjudication'\)/);
  assert.match(sql, /set status = 'completed',[\s\S]+?final_evidence = p_final_evidence/);
  assert.match(sql, /result_profile = p_result_profile/);
  assert.match(sql, /'attempt\.completed'/);
});

test('writing submission binds the server prompt and transitions atomically to scoring', () => {
  assert.match(sql, /v_attempt\.status <> 'writing' or v_stage\.kind <> 'writing'/);
  assert.match(sql, /v_stage\.item_ids\[1\] <> p_prompt_id/);
  assert.match(sql, /v_stage\.content_versions->>p_prompt_id/);
  assert.match(sql, /insert into public\.diagnostic_writing_evaluations/);
  assert.match(sql, /set status = 'scoring', version = v_next_version/);
  assert.match(sql, /v_stage\.submission_digest = p_response_sha256[\s\S]+?'replayed', true/);
});

test('stage submission binds owner, version, item ids and content versions before insert', () => {
  assert.match(sql, /where id = p_attempt_id and user_id = p_user_id[\s\S]+?for update/);
  assert.match(sql, /v_attempt\.version <> p_expected_attempt_version/);
  assert.match(sql, /not \(v_item_id = any\(v_stage\.item_ids\)\)/);
  assert.match(sql, /v_stage\.content_versions->>v_item_id/);
  assert.match(sql, /diagnostic_response_binding_invalid/);
});

test('identical retries are idempotent while changed retries are rejected', () => {
  assert.match(sql, /v_stage\.submission_digest = p_submission_digest[\s\S]+?'replayed', true/);
  assert.match(sql, /diagnostic_stage_already_completed/);
  assert.match(sql, /unique \(attempt_id, item_id\)/);
});

test('attempt creation stores server-validated consent evidence and defaults external processing off', () => {
  assert.match(sql, /p_consent_version text/);
  assert.match(sql, /p_consented_at timestamptz/);
  assert.match(sql, /consent_version, consented_at, status/);
  assert.match(sql, /'externalwritingprocessingconsent', false/);
  assert.match(sql, /p_delivery_policy_version text/);
  assert.match(sql, /p_result_validity_days integer/);
  assert.match(sql, /p_exposure_lookback_days integer/);
  assert.match(sql, /pg_advisory_xact_lock/);
});

test('objective-only completion is atomic, idempotent and service-role-only', () => {
  assert.match(sql, /create function public\.complete_diagnostic_objective_attempt/);
  assert.match(sql, /v_attempt\.status not in \('precision','confirmation'\)/);
  assert.match(sql, /set status = 'completed', result_profile = p_result_profile/);
  assert.match(sql, /v_stage\.submission_digest = p_submission_digest and v_attempt\.status = 'completed'[\s\S]+?'replayed', true/);
  assert.match(sql, /revoke all on function public\.complete_diagnostic_objective_attempt\([\s\S]+?from public, anon, authenticated, service_role;/);
  assert.match(sql, /grant execute on function public\.complete_diagnostic_objective_attempt\([\s\S]+?to service_role;/);
});
