import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ICFES_DELETE_CONFIRMATION,
  classifyIcfesPrivacyDatabaseError,
  icfesPrivacyErrorHttpStatus,
  isSameOriginIcfesPrivacyRequest,
  parseIcfesPrivacyIdempotencyKey,
} from '../src/lib/icfes/privacy-operations.ts';

const migration = readFileSync('supabase/migrations/20260909180000_icfes_privacy_operations.sql', 'utf8');
const server = readFileSync('src/lib/icfes/privacy-operations.server.ts', 'utf8');
const exportRoute = readFileSync('src/app/api/icfes/privacy/export/route.ts', 'utf8');
const deleteRoute = readFileSync('src/app/api/icfes/privacy/delete/route.ts', 'utf8');
const purgeRoute = readFileSync('src/app/api/internal/icfes/privacy/purge/route.ts', 'utf8');
const privacyFoundation = readFileSync('supabase/migrations/20260909170000_icfes_privacy_foundation.sql', 'utf8');

function bounded(source, start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, `missing section ${start}`);
  return source.slice(from, to);
}

test('validates idempotency keys, same-origin mutations and stable error mapping', () => {
  const key = '123e4567-e89b-42d3-a456-426614174000';
  assert.equal(parseIcfesPrivacyIdempotencyKey(` ${key.toUpperCase()} `), key);
  assert.equal(parseIcfesPrivacyIdempotencyKey('not-a-uuid'), null);
  assert.equal(parseIcfesPrivacyIdempotencyKey(null), null);
  assert.equal(isSameOriginIcfesPrivacyRequest('https://idiomaswl.com/api/x', 'https://idiomaswl.com'), true);
  assert.equal(isSameOriginIcfesPrivacyRequest('https://idiomaswl.com/api/x', 'https://evil.example'), false);
  assert.equal(isSameOriginIcfesPrivacyRequest('https://idiomaswl.com/api/x', null), false);
  assert.equal(classifyIcfesPrivacyDatabaseError('icfes_privacy_contract_not_uniquely_approved'), 'policy_blocked');
  assert.equal(classifyIcfesPrivacyDatabaseError('icfes_privacy_request_already_open'), 'request_in_progress');
  assert.equal(classifyIcfesPrivacyDatabaseError('icfes_privacy_export_replay_drift'), 'replay_conflict');
  assert.equal(icfesPrivacyErrorHttpStatus('policy_blocked'), 423);
  assert.equal(icfesPrivacyErrorHttpStatus('replay_conflict'), 409);
  assert.equal(ICFES_DELETE_CONFIRMATION, 'DELETE-ICFES-DATA');
});

test('the current draft keeps export, deletion and purge fail-closed', () => {
  assert.match(privacyFoundation, /values\s*\(\s*'icfes-privacy-2026-09-draft'\s*,\s*'DRAFT_BLOCKED'\s*\)/i);
  assert.doesNotMatch(privacyFoundation, /values\s*\(\s*'icfes-privacy-2026-09-draft'\s*,\s*'APPROVED'\s*\)/i);
  for (const name of ['export_icfes_user_data', 'delete_icfes_user_data', 'purge_expired_icfes_attempts']) {
    const functionStart = migration.indexOf(`CREATE FUNCTION public.${name}`);
    const contractGuard = migration.indexOf("approved_count <> 1", functionStart);
    assert.ok(functionStart >= 0 && contractGuard > functionStart, `${name} must check the approved contract`);
  }
  assert.match(server, /ICFES_PRIVACY_OPERATIONS_ENABLED !== 'true'/);
});

test('server ownership comes only from verified auth and never from request payloads', () => {
  assert.match(server, /auth\.getUser\(\)/);
  assert.match(server, /const userId = await requireAuthenticatedUserId\(\)/);
  assert.ok(server.indexOf('const userId = await requireAuthenticatedUserId()') < server.indexOf("callPrivacyRpc('export_icfes_user_data'"));
  assert.doesNotMatch(exportRoute, /request\.json\(|userId|user_id/);
  assert.doesNotMatch(deleteRoute, /request\.json\(|userId|user_id/);
  assert.match(exportRoute, /isSameOriginIcfesPrivacyRequest/);
  assert.match(deleteRoute, /isSameOriginIcfesPrivacyRequest/);
  assert.match(exportRoute, /idempotency-key/);
  assert.match(deleteRoute, /idempotency-key/);
  assert.match(deleteRoute, /x-confirm-data-deletion/);
  assert.match(deleteRoute, /ICFES_DELETE_CONFIRMATION/);
});

test('export only joins records through the authenticated owner and excludes third-party review data', () => {
  const section = bounded(migration, 'CREATE FUNCTION public.export_icfes_user_data', 'CREATE FUNCTION public.delete_icfes_user_data');
  assert.match(section, /WHERE attempt\.user_id = p_user/);
  assert.match(section, /membership\.user_id = p_user AND membership\.exam_slug = 'icfes'/);
  assert.match(section, /review\.user_id = p_user/);
  assert.doesNotMatch(section, /assigned_to|rubric_snapshot|xpress_payment_events|access_token_hash/);
  assert.match(section, /'attempts'[\s\S]+?'oneTimeOrders'[\s\S]+?'entitlements'[\s\S]+?'memberships'[\s\S]+?'teacherReviews'[\s\S]+?'privacyRequests'/);
  assert.match(section, /privacy_request\.id <> request_row\.id/);
  assert.match(section, /IF is_replay THEN[\s\S]+?result_evidence_ref <> evidence_hash[\s\S]+?icfes_privacy_export_replay_drift[\s\S]+?'replayed', true/);
  assert.match(section, /'evidenceRef', evidence_hash,[\s\S]+?'replayed', false/);
});

test('deletion is idempotent, ownership-bound and pseudonymizes request evidence', () => {
  const section = bounded(migration, 'CREATE FUNCTION public.delete_icfes_user_data', 'CREATE FUNCTION public.purge_expired_icfes_attempts');
  assert.match(section, /request_row\.status = 'COMPLETED'[\s\S]+?'replayed', true/);
  assert.match(section, /review\.user_id = p_user[\s\S]+?attempt\.user_id = p_user/);
  assert.match(section, /DELETE FROM public\.icfes_attempts[\s\S]+?WHERE user_id = p_user/);
  assert.match(section, /SET subject_ref = subject_hash,[\s\S]+?user_id = NULL/);
  assert.match(section, /pg_advisory_xact_lock\(pg_catalog\.hashtextextended\(subject_hash, 0\)\)/);
  assert.doesNotMatch(section, /DELETE FROM public\.xpress_orders|DELETE FROM public\.xpress_memberships/);
});

test('purge is bounded, concurrency-safe and deletes dependencies before expired attempts', () => {
  const section = bounded(migration, 'CREATE FUNCTION public.purge_expired_icfes_attempts', 'REVOKE ALL ON FUNCTION public.export_icfes_user_data');
  assert.match(section, /p_limit < 1 OR p_limit > 500/);
  assert.match(section, /retention_expires_at <= now\(\)/);
  assert.match(section, /FOR UPDATE SKIP LOCKED[\s\S]+?LIMIT p_limit/);
  const alerts = section.indexOf('DELETE FROM public.xpress_teacher_review_alerts');
  const reviews = section.indexOf('DELETE FROM public.xpress_teacher_reviews');
  const attempts = section.indexOf('DELETE FROM public.icfes_attempts');
  assert.ok(alerts >= 0 && alerts < reviews && reviews < attempts);
  assert.match(section, /run_row\.status = 'COMPLETED'[\s\S]+?'replayed', true/);
  assert.doesNotMatch(migration, /cron\.schedule/);
});

test('privileged functions are explicitly revoked from browser roles and cron handler requires a secret', () => {
  for (const signature of [
    'export_icfes_user_data\\(uuid, uuid\\)',
    'delete_icfes_user_data\\(uuid, uuid\\)',
    'purge_expired_icfes_attempts\\(uuid, integer\\)',
  ]) {
    assert.match(migration, new RegExp(`REVOKE ALL ON FUNCTION public\\.${signature}[\\s\\S]+?FROM PUBLIC, anon, authenticated, service_role`));
    assert.match(migration, new RegExp(`GRANT EXECUTE ON FUNCTION public\\.${signature} TO service_role`));
  }
  assert.match(migration, /SECURITY DEFINER[\s\S]+?SET search_path = ''/);
  assert.match(purgeRoute, /isAuthorizedCronRequest/);
  assert.match(purgeRoute, /process\.env\.CRON_SECRET/);
  assert.match(purgeRoute, /idempotency-key/);
});
