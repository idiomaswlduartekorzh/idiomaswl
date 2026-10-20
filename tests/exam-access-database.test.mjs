import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(
  new URL('../supabase/migrations/20261020143934_exam_access_entitlements.sql', import.meta.url),
  'utf8',
);
const submissionAccessMigration = await readFile(
  new URL('../supabase/migrations/20260919195432_xpress_submission_access_atomic.sql', import.meta.url),
  'utf8',
);
const executableMigration = migration.replace(/^\s*--.*$/gm, '');

test('the non-payment grant ledger is private and server controlled', () => {
  assert.match(migration, /create table public\.exam_access_grants/);
  assert.match(migration, /alter table public\.exam_access_grants enable row level security/);
  assert.match(migration, /revoke all on table public\.exam_access_grants from public,anon,authenticated,service_role/);
  assert.match(migration, /grant select,insert on table public\.exam_access_grants to service_role/);
  assert.doesNotMatch(migration, /grant[^;]*(?:insert|update|delete)[^;]*exam_access_grants[^;]*to authenticated/i);
  assert.doesNotMatch(executableMigration, /user_metadata|raw_user_meta_data/i);
});

test('one account can never claim two free exams', () => {
  assert.match(migration, /create unique index exam_access_grants_one_free_exam_per_user[\s\S]*on public\.exam_access_grants\(user_id\)[\s\S]*where source='autodidacta-free'/);
  assert.match(migration, /pg_advisory_xact_lock\(pg_catalog\.hashtextextended\(p_user::text,73\)\)/);
  assert.match(migration, /free_exam_already_claimed/);
  assert.match(migration, /free_exam_requires_first_access/);
  assert.match(migration, /revoke all on function public\.claim_free_exam_access\(uuid,text\)[\s\S]*from public,anon,authenticated,service_role/);
  assert.match(migration, /grant execute on function public\.claim_free_exam_access\(uuid,text\) to service_role/);
});

test('paid subscriptions can coexist only when their exams differ', () => {
  assert.match(migration, /drop index if exists public\.xpress_subscriptions_one_open_user/);
  assert.match(migration, /on public\.xpress_subscriptions\(user_id,environment,exam_slug\)[\s\S]*where status<>'canceled'/);
  assert.match(migration, /where user_id=p_user and environment=p_environment and exam_slug=p_exam and status<>'canceled'/);
  assert.match(migration, /hashtextextended\(p_user::text\|\|':'\|\|p_exam,12\)/);
});

test('the database resolver never grants one exam from another exam entitlement', () => {
  assert.match(migration, /where user_id=p_user and exam_slug=p_exam and source='welearn'/);
  assert.match(migration, /where user_id=p_user and exam_slug=p_exam and environment=p_environment/);
  assert.match(migration, /where user_id=p_user and exam_slug=p_exam and source='autodidacta-free'/);
  assert.match(migration, /revoke all on function public\.resolve_exam_access\(uuid,text,text,timestamptz\)[\s\S]*from public,anon,authenticated,service_role/);
});

test('durable submission access is also bound to the exact exam', () => {
  assert.match(submissionAccessMigration, /membership\.exam_slug=p_exam/);
  assert.match(submissionAccessMigration, /credit\.exam_slug=p_exam/);
  assert.match(submissionAccessMigration, /where id=p_submission and user_id=p_user and exam_slug=p_exam/);
});

