const TABLE_PROBES = [
  { table: 'diagnostic_attempts', columns: 'id,consent_version,external_writing_processing_consent' },
  { table: 'diagnostic_stages', columns: 'id,submission_digest' },
  { table: 'diagnostic_responses', columns: 'id,outcome' },
  { table: 'diagnostic_writing_evaluations', columns: 'id,automated_evaluation,human_evaluation' },
  { table: 'diagnostic_attempt_events', columns: 'id,event_type' },
  { table: 'diagnostic_pilot_references', columns: 'attempt_id,reference_level' },
  { table: 'diagnostic_pilot_enrollments', columns: 'user_id,consent_reference' },
  { table: 'diagnostic_pilot_enrollment_events', columns: 'id,consent_reference' },
];

const RPC_PROBES = [
  {
    name: 'delete_diagnostic_user_data',
    body: { p_user_id: null },
    expectedAdminError: 'diagnostic_deletion_user_required',
  },
  {
    name: 'record_diagnostic_pilot_enrollment',
    body: {
      p_user_id: null,
      p_cohort_id: null,
      p_action: null,
      p_pilot_consent_version: null,
      p_consented_at: null,
      p_consent_reference: null,
      p_acted_by: null,
      p_reason: null,
    },
    expectedAdminError: 'diagnostic_pilot_enrollment_invalid',
  },
];

function apiKeyHeaders(apiKey, userAccessToken = null) {
  const headers = { apikey: apiKey };
  if (userAccessToken) headers.Authorization = `Bearer ${userAccessToken}`;
  else if (!apiKey.startsWith('sb_')) headers.Authorization = `Bearer ${apiKey}`;
  return headers;
}

function safeEndpoint(endpoint) {
  let parsed;
  try {
    parsed = new URL(endpoint);
  } catch {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not a valid URL.');
  }
  const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (parsed.protocol !== 'https:' && !local) {
    throw new Error('Remote Supabase inspection requires HTTPS.');
  }
  return parsed.origin;
}

async function readError(response) {
  const payload = await response.json().catch(() => null);
  return {
    status: response.status,
    code: typeof payload?.code === 'string' ? payload.code : null,
    message: typeof payload?.message === 'string' ? payload.message : '',
  };
}

function isAccessDenied(error) {
  return [401, 403, 404].includes(error.status)
    || ['42501', 'PGRST202', 'PGRST205'].includes(error.code)
    || /permission denied|not found in the schema cache|access to schema is forbidden/iu.test(error.message);
}

function publicCheckResult(id, error) {
  return { id, passed: isAccessDenied(error), status: error.status, code: error.code };
}

function projectLabel(origin) {
  const hostname = new URL(origin).hostname;
  return hostname.endsWith('.supabase.co') ? hostname.split('.')[0] : hostname;
}

export function diagnosticSupabaseApiKeyHeaders(apiKey, userAccessToken = null) {
  return apiKeyHeaders(apiKey, userAccessToken);
}

export async function inspectDiagnosticSupabase({
  endpoint,
  adminKey,
  publicKey,
  expectedMigration,
  userAccessToken = null,
  fetchImpl = fetch,
  generatedAt = new Date().toISOString(),
}) {
  const origin = safeEndpoint(endpoint);
  if (!adminKey || !publicKey || adminKey === publicKey) {
    throw new Error('Distinct server and public Supabase keys are required.');
  }
  if (!expectedMigration?.endsWith('.sql')) throw new Error('Expected migration is required.');

  const serviceSchema = [];
  const publicIsolation = [];
  for (const probe of TABLE_PROBES) {
    const url = `${origin}/rest/v1/${probe.table}?select=${encodeURIComponent(probe.columns)}&limit=0`;
    const adminResponse = await fetchImpl(url, {
      method: 'HEAD',
      headers: apiKeyHeaders(adminKey),
    });
    const adminError = adminResponse.ok ? null : await readError(adminResponse);
    serviceSchema.push({
      id: probe.table,
      passed: adminResponse.ok,
      status: adminResponse.status,
      code: adminError?.code ?? null,
    });

    const publicResponse = await fetchImpl(url, {
      method: 'HEAD',
      headers: apiKeyHeaders(publicKey),
    });
    const publicError = publicResponse.ok
      ? { status: publicResponse.status, code: null, message: '' }
      : await readError(publicResponse);
    publicIsolation.push(publicCheckResult(probe.table, publicError));
  }

  const serviceFunctions = [];
  const publicFunctionIsolation = [];
  for (const probe of RPC_PROBES) {
    const url = `${origin}/rest/v1/rpc/${probe.name}`;
    const adminResponse = await fetchImpl(url, {
      method: 'POST',
      headers: { ...apiKeyHeaders(adminKey), 'content-type': 'application/json' },
      body: JSON.stringify(probe.body),
    });
    const adminError = await readError(adminResponse);
    serviceFunctions.push({
      id: probe.name,
      passed: !adminResponse.ok && adminError.message.includes(probe.expectedAdminError),
      status: adminError.status,
      code: adminError.code,
    });

    const publicResponse = await fetchImpl(url, {
      method: 'POST',
      headers: { ...apiKeyHeaders(publicKey), 'content-type': 'application/json' },
      body: JSON.stringify(probe.body),
    });
    const publicError = await readError(publicResponse);
    publicFunctionIsolation.push(publicCheckResult(probe.name, publicError));
  }

  const bucketUrl = `${origin}/storage/v1/bucket/diagnostic-audio`;
  const bucketResponse = await fetchImpl(bucketUrl, { headers: apiKeyHeaders(adminKey) });
  const bucketPayload = bucketResponse.ok ? await bucketResponse.json().catch(() => null) : null;
  const bucket = {
    id: 'diagnostic-audio',
    passed: bucketResponse.ok
      && bucketPayload?.id === 'diagnostic-audio'
      && bucketPayload?.public === false
      && bucketPayload?.file_size_limit === 10_485_760
      && Array.isArray(bucketPayload?.allowed_mime_types)
      && bucketPayload.allowed_mime_types.includes('audio/mpeg'),
    status: bucketResponse.status,
    public: bucketPayload?.public ?? null,
  };
  const publicBucketResponse = await fetchImpl(bucketUrl, { headers: apiKeyHeaders(publicKey) });
  const publicBucketError = publicBucketResponse.ok
    ? { status: publicBucketResponse.status, code: null, message: '' }
    : await readError(publicBucketResponse);
  const publicBucketIsolation = publicCheckResult('diagnostic-audio', publicBucketError);

  let authenticatedBoundary = {
    supplied: false,
    identityResolved: false,
    directTableAccessDenied: false,
    checks: [],
  };
  if (userAccessToken) {
    const identityResponse = await fetchImpl(`${origin}/auth/v1/user`, {
      headers: apiKeyHeaders(publicKey, userAccessToken),
    });
    const identity = identityResponse.ok ? await identityResponse.json().catch(() => null) : null;
    const checks = [];
    for (const probe of TABLE_PROBES) {
      const response = await fetchImpl(
        `${origin}/rest/v1/${probe.table}?select=${encodeURIComponent(probe.columns)}&limit=0`,
        { method: 'HEAD', headers: apiKeyHeaders(publicKey, userAccessToken) },
      );
      const error = response.ok
        ? { status: response.status, code: null, message: '' }
        : await readError(response);
      checks.push(publicCheckResult(probe.table, error));
    }
    authenticatedBoundary = {
      supplied: true,
      identityResolved: identityResponse.ok && typeof identity?.id === 'string',
      directTableAccessDenied: checks.every(check => check.passed),
      checks,
    };
  }

  const groups = {
    serviceSchema: serviceSchema.every(check => check.passed),
    publicTableIsolation: publicIsolation.every(check => check.passed),
    serviceFunctions: serviceFunctions.every(check => check.passed),
    publicFunctionIsolation: publicFunctionIsolation.every(check => check.passed),
    privateStorage: bucket.passed && publicBucketIsolation.passed,
    authenticatedBoundary: !authenticatedBoundary.supplied
      || (authenticatedBoundary.identityResolved && authenticatedBoundary.directTableAccessDenied),
  };
  const passed = Object.values(groups).every(Boolean);

  return {
    receiptVersion: 'diagnostic-supabase-inspection-v1',
    decision: passed ? 'PASS' : 'HOLD',
    generatedAt,
    target: { project: projectLabel(origin) },
    expectedMigration,
    groups,
    checks: {
      serviceSchema,
      publicIsolation,
      serviceFunctions,
      publicFunctionIsolation,
      bucket,
      publicBucketIsolation,
      authenticatedBoundary,
    },
    claims: {
      schemaContractVerified: groups.serviceSchema && groups.serviceFunctions,
      browserDirectAccessDenied: groups.publicTableIsolation && groups.publicFunctionIsolation,
      privateStorageVerified: groups.privateStorage,
      authenticatedApplicationFlowVerified: false,
      destructiveWritesPerformed: false,
      participantDataIncluded: false,
      secretsIncluded: false,
    },
  };
}
