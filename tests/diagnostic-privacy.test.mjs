import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const migration = readFileSync(new URL('../supabase/migrations/20260925040000_diagnostic_data_deletion.sql', import.meta.url), 'utf8');
const route = readFileSync(new URL('../src/app/api/diagnostic/attempts/route.ts', import.meta.url), 'utf8');
const handler = readFileSync(new URL('../src/server/diagnostic/privacy.server.ts', import.meta.url), 'utf8');
const repository = readFileSync(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');
const policy = JSON.parse(readFileSync(new URL('../config/diagnostic/data-retention-policy.json', import.meta.url), 'utf8'));

test('diagnostic deletion is service-only and verifies the cascade in one transaction', () => {
  assert.match(migration, /lock table public\.diagnostic_attempts in share row exclusive mode/i);
  assert.match(migration, /delete from public\.diagnostic_attempts where user_id = p_user_id/i);
  assert.match(migration, /diagnostic_deletion_incomplete/i);
  assert.match(migration, /revoke all on function public\.delete_diagnostic_user_data\(uuid\)[\s\S]*from public, anon, authenticated, service_role/i);
  assert.match(migration, /grant execute on function public\.delete_diagnostic_user_data\(uuid\)[\s\S]*to service_role/i);
});

test('the deletion endpoint derives identity from auth and requires same-origin explicit confirmation', () => {
  assert.match(route, /export async function DELETE/);
  assert.match(handler, /origin === new URL\(request\.url\)\.origin/);
  assert.match(handler, /DELETE_DIAGNOSTIC_DATA/);
  assert.match(handler, /supabase\.auth\.getUser\(\)/);
  assert.doesNotMatch(handler, /userId\s*[:=]\s*\(body/);
});

test('repository accepts only a complete zero-remaining deletion receipt', () => {
  assert.match(repository, /rpc\('delete_diagnostic_user_data', \{ p_user_id: userId \}\)/);
  assert.match(repository, /receipt\.remainingAttempts !== 0/);
});

test('retention durations remain an unapproved proposal and cannot clear the release gate', () => {
  assert.equal(policy.status, 'proposal-pending-privacy-approval');
  assert.ok(policy.rules.length >= 4);
  assert.ok(policy.notes.some(note => /not an active/i.test(note)));
});
