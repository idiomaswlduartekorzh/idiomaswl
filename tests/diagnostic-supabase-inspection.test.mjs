import assert from 'node:assert/strict';
import test from 'node:test';

import {
  diagnosticSupabaseApiKeyHeaders,
  inspectDiagnosticSupabase,
} from '../scripts/lib/diagnostic-supabase-inspection.mjs';

const endpoint = 'https://project-ref.supabase.co';
const adminKey = 'sb_secret_admin-example';
const publicKey = 'sb_publishable_public-example';

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function passingFetch({ exposePublicTable = false, includeUser = false, allowEvidenceMutation = false } = {}) {
  return async (url, options = {}) => {
    const headers = options.headers ?? {};
    const key = headers.apikey;
    const isAdmin = key === adminKey;
    const isUser = headers.Authorization === 'Bearer user-access-token';
    if (url.endsWith('/auth/v1/user')) {
      return includeUser && isUser
        ? jsonResponse({ id: '00000000-0000-4000-8000-000000000001', email: 'private@example.test' })
        : jsonResponse({ message: 'invalid token' }, 401);
    }
    if (url.includes('/storage/v1/bucket/diagnostic-audio')) {
      return isAdmin
        ? jsonResponse({
          id: 'diagnostic-audio', public: false, file_size_limit: 10_485_760,
          allowed_mime_types: ['audio/mpeg'],
        })
        : jsonResponse({ code: '42501', message: 'permission denied' }, 403);
    }
    if (url.includes('/rest/v1/rpc/')) {
      if (!isAdmin) return jsonResponse({ code: '42501', message: 'permission denied' }, 403);
      const enrollment = url.endsWith('/record_diagnostic_pilot_enrollment');
      const retest = url.endsWith('/record_diagnostic_pilot_retest_authorization');
      return jsonResponse({
        code: 'P0001',
        message: retest
          ? 'diagnostic_pilot_retest_authorization_invalid'
          : enrollment
          ? 'diagnostic_pilot_enrollment_invalid'
          : 'diagnostic_deletion_user_required',
      }, 400);
    }
    if (url.includes('/rest/v1/diagnostic_')) {
      if (isAdmin && ['PATCH', 'DELETE'].includes(options.method)) {
        return allowEvidenceMutation
          ? new Response(null, { status: 204 })
          : jsonResponse({ code: '42501', message: 'permission denied' }, 403);
      }
      if (isAdmin || exposePublicTable) return new Response(null, { status: 200 });
      return jsonResponse({ code: '42501', message: 'permission denied' }, 403);
    }
    throw new Error(`Unexpected URL ${url}`);
  };
}

test('live inspection verifies schema and deny boundaries without collecting rows or claiming app E2E', async () => {
  const receipt = await inspectDiagnosticSupabase({
    endpoint,
    adminKey,
    publicKey,
    expectedMigration: '20260925053000_diagnostic_immutable_evidence.sql',
    userAccessToken: 'user-access-token',
    fetchImpl: passingFetch({ includeUser: true }),
    generatedAt: '2026-09-25T12:00:00.000Z',
  });
  assert.equal(receipt.decision, 'PASS');
  assert.equal(receipt.claims.schemaContractVerified, true);
  assert.equal(receipt.claims.immutableResponseEvidenceVerified, true);
  assert.equal(receipt.claims.browserDirectAccessDenied, true);
  assert.equal(receipt.claims.privateStorageVerified, true);
  assert.equal(receipt.checks.authenticatedBoundary.identityResolved, true);
  assert.equal(receipt.claims.authenticatedApplicationFlowVerified, false);
  assert.equal(receipt.claims.destructiveWritesPerformed, false);
  const serialized = JSON.stringify(receipt);
  assert.doesNotMatch(serialized, /private@example|user-access-token|sb_secret|sb_publishable/);
});

test('inspection fails closed when a diagnostic table becomes browser-readable', async () => {
  const receipt = await inspectDiagnosticSupabase({
    endpoint,
    adminKey,
    publicKey,
    expectedMigration: '20260925053000_diagnostic_immutable_evidence.sql',
    fetchImpl: passingFetch({ exposePublicTable: true }),
  });
  assert.equal(receipt.decision, 'HOLD');
  assert.equal(receipt.groups.publicTableIsolation, false);
});

test('inspection fails closed when service role can rewrite append-only evidence', async () => {
  const receipt = await inspectDiagnosticSupabase({
    endpoint,
    adminKey,
    publicKey,
    expectedMigration: '20260925053000_diagnostic_immutable_evidence.sql',
    fetchImpl: passingFetch({ allowEvidenceMutation: true }),
  });
  assert.equal(receipt.decision, 'HOLD');
  assert.equal(receipt.groups.immutableEvidence, false);
  assert.equal(receipt.claims.immutableResponseEvidenceVerified, false);
  assert.equal(receipt.claims.destructiveWritesPerformed, false);
});

test('new Supabase API keys are never sent as JWTs while legacy keys retain compatibility', () => {
  assert.deepEqual(diagnosticSupabaseApiKeyHeaders('sb_secret_example'), { apikey: 'sb_secret_example' });
  assert.deepEqual(diagnosticSupabaseApiKeyHeaders('legacy-jwt'), {
    apikey: 'legacy-jwt', Authorization: 'Bearer legacy-jwt',
  });
  assert.deepEqual(diagnosticSupabaseApiKeyHeaders('sb_publishable_example', 'user-jwt'), {
    apikey: 'sb_publishable_example', Authorization: 'Bearer user-jwt',
  });
});
