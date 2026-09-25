import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sql = (await Promise.all([
  readFile(new URL('../supabase/migrations/20260925000447_diagnostic_attempts.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925001940_diagnostic_attempt_rpcs.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925014500_diagnostic_writing_submission.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925021500_diagnostic_finalization.sql', import.meta.url), 'utf8'),
])).join('\n').toLowerCase();

test('diagnostic mutations are atomic security-invoker functions', () => {
  assert.match(sql, /create function public\.create_diagnostic_attempt/);
  assert.match(sql, /create function public\.submit_diagnostic_objective_stage/);
  assert.match(sql, /create function public\.submit_diagnostic_writing_stage/);
  assert.match(sql, /create function public\.complete_diagnostic_attempt/);
  assert.equal((sql.match(/\nsecurity invoker\n/g) ?? []).length, 4);
  assert.equal(sql.includes('security definer'), false);
  assert.equal((sql.match(/set search_path = ''/g) ?? []).length, 4);
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
  assert.equal(/to (anon|authenticated)/.test(sql), false);
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
