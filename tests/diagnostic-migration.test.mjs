import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sql = (await Promise.all([
  readFile(new URL('../supabase/migrations/20260925000447_diagnostic_attempts.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925013000_diagnostic_confirmation_status.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925034500_diagnostic_consent_evidence.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925050000_diagnostic_delivery_policy.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925051500_diagnostic_pilot_retests.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260925053000_diagnostic_immutable_evidence.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260928090000_diagnostic_written_discourse.sql', import.meta.url), 'utf8'),
])).join('\n').toLowerCase();
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

test('scored responses and audit events are append-only for the service role', () => {
  assert.match(sql, /revoke update, delete on table public\.diagnostic_responses from service_role/);
  assert.match(sql, /revoke update, delete on table public\.diagnostic_attempt_events from service_role/);
  assert.match(sql, /erasure performed by parent-attempt cascade/);
});

test('completed attempts and writing evaluations require final evidence', () => {
  assert.match(sql, /status = 'completed' and completed_at is not null and result_profile is not null/);
  assert.match(sql, /status = 'completed' and completed_at is not null and final_evidence is not null/);
});

test('attempt state constraint permits the adaptive confirmation stage', () => {
  assert.match(sql, /'locator', 'precision', 'confirmation', 'writing'/);
});

test('attempts bind general consent while external writing processing defaults closed', () => {
  assert.match(sql, /add column consent_version text/);
  assert.match(sql, /add column consented_at timestamptz/);
  assert.match(sql, /external_writing_processing_consent boolean not null default false/);
  assert.match(sql, /diagnostic_external_writing_consent_evidence_check/);
  assert.match(sql, /consent_version is not null[\s\S]+?char_length\(consent_version\)/);
  assert.match(sql, /external_writing_processing_consent = false[\s\S]+?external_writing_consent_version is null/);
  assert.match(sql, /external_writing_processing_consent = true[\s\S]+?external_writing_consent_version is not null[\s\S]+?external_writing_provider_policy_version is not null/);
});

test('attempts bind the delivery policy and result-validity window used at creation', () => {
  assert.match(sql, /add column delivery_policy_version text not null/);
  assert.match(sql, /add column access_mode text not null/);
  assert.match(sql, /add column result_validity_days smallint not null/);
  assert.match(sql, /add column exposure_lookback_days smallint not null/);
});

test('pilot retest schedules are bounded, private and consumed by an attempt trigger', () => {
  assert.match(sql, /add column remaining_retests smallint not null default 0/);
  assert.match(sql, /create trigger diagnostic_pilot_retest_before_attempt/);
  assert.match(sql, /before insert on public\.diagnostic_attempts/);
  assert.match(sql, /diagnostic_pilot_retest_not_authorized/);
});

test('written discourse becomes a machine-scored response dimension', () => {
  assert.match(sql, /check \(skill in \('reading','listening','written-discourse','grammar','vocabulary'\)\)/);
  assert.match(sql, /cardinality\(p_item_ids\) <> 15/);
  assert.match(sql, /'constructs', jsonb_build_array\('reading','listening','written-discourse','grammar','vocabulary'\)/);
});
