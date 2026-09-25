import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migrationUrl = new URL('../supabase/migrations/20260925000447_diagnostic_attempts.sql', import.meta.url);
const sql = (await readFile(migrationUrl, 'utf8')).toLowerCase();
const tables = [
  'diagnostic_attempts',
  'diagnostic_stages',
  'diagnostic_responses',
  'diagnostic_writing_evaluations',
  'diagnostic_attempt_events',
];

test('creates the durable diagnostic model with RLS on every table', () => {
  for (const table of tables) {
    assert.match(sql, new RegExp(`create table public\\.${table}`));
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`));
  }
});

test('browser roles receive no direct table grants', () => {
  const revokeBlock = sql.match(/revoke all on table[\s\S]+?from public, anon, authenticated, service_role;/)?.[0] ?? '';
  for (const table of tables) assert.match(revokeBlock, new RegExp(`public\\.${table}`));
  assert.equal(/grant\s+(select|insert|update|delete)[\s\S]+?to\s+(anon|authenticated)/.test(sql), false);
  assert.match(sql, /grant select, insert, update, delete on table[\s\S]+to service_role;/);
});

test('response ownership is tied to its stage and attempt at the database layer', () => {
  assert.match(sql, /foreign key \(stage_id, attempt_id, user_id\)[\s\S]+?diagnostic_stages\(id, attempt_id, user_id\)/);
  assert.match(sql, /unique \(attempt_id, item_id\)/);
  assert.match(sql, /outcome text not null check \(outcome in \('correct','incorrect','omitted'\)\)/);
});

test('completed attempts and writing evaluations require final evidence', () => {
  assert.match(sql, /status = 'completed' and completed_at is not null and result_profile is not null/);
  assert.match(sql, /status = 'completed' and completed_at is not null and final_evidence is not null/);
});

