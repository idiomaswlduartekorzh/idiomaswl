export type DiagnosticObservedRoute =
  | '/api/diagnostic/attempts'
  | '/api/diagnostic/attempts/[attemptId]'
  | '/api/diagnostic/attempts/[attemptId]/stages/[stageId]'
  | '/api/diagnostic/media/[mediaId]'
  | '/api/admin/diagnostic/attempts/[attemptId]/finalize';

type DiagnosticObservedMethod = 'GET' | 'HEAD' | 'POST' | 'DELETE';
type DiagnosticInternalComponent =
  | 'attempt-start' | 'attempt-resume' | 'stage-submit' | 'media-delivery'
  | 'data-deletion' | 'writing-finalization' | 'persistence';
type DiagnosticInternalFailureReason =
  | 'access-mode-invalid' | 'delivery-policy-invalid' | 'release-certificate-invalid'
  | 'rollout-configuration-invalid' | 'pilot-consent-version-missing'
  | 'pilot-enrollment-check-failed' | 'attempt-start-failed' | 'attempt-resume-failed'
  | 'stage-submission-failed' | 'media-delivery-failed' | 'data-deletion-failed'
  | 'writing-finalization-failed' | 'attempt-creation-persistence-failed'
  | 'stage-persistence-failed' | 'writing-persistence-failed'
  | 'finalization-persistence-failed' | 'unclassified';

const OBSERVED_ROUTES = new Set<DiagnosticObservedRoute>([
  '/api/diagnostic/attempts',
  '/api/diagnostic/attempts/[attemptId]',
  '/api/diagnostic/attempts/[attemptId]/stages/[stageId]',
  '/api/diagnostic/media/[mediaId]',
  '/api/admin/diagnostic/attempts/[attemptId]/finalize',
]);
const OBSERVED_METHODS = new Set<DiagnosticObservedMethod>(['GET', 'HEAD', 'POST', 'DELETE']);
const INTERNAL_COMPONENTS = new Set<DiagnosticInternalComponent>([
  'attempt-start', 'attempt-resume', 'stage-submit', 'media-delivery',
  'data-deletion', 'writing-finalization', 'persistence',
]);
const INTERNAL_REASONS = new Set<DiagnosticInternalFailureReason>([
  'access-mode-invalid', 'delivery-policy-invalid', 'release-certificate-invalid',
  'rollout-configuration-invalid', 'pilot-consent-version-missing',
  'pilot-enrollment-check-failed', 'attempt-start-failed', 'attempt-resume-failed',
  'stage-submission-failed', 'media-delivery-failed', 'data-deletion-failed',
  'writing-finalization-failed', 'attempt-creation-persistence-failed',
  'stage-persistence-failed', 'writing-persistence-failed',
  'finalization-persistence-failed', 'unclassified',
]);

interface DiagnosticOperationalLog {
  schemaVersion: 'diagnostic-operational-log-v1';
  service: 'nivel-radar';
  level: 'info' | 'error';
  event: 'request.started' | 'request.completed' | 'request.failed' | 'internal.failure';
  route?: DiagnosticObservedRoute;
  method?: DiagnosticObservedMethod;
  component?: DiagnosticInternalComponent;
  reason?: DiagnosticInternalFailureReason;
  durationMs?: number;
  status?: number;
  outcome?: 'success' | 'redirect' | 'rejected' | 'failure';
}

export function logDiagnosticInternalFailure(input: {
  component: DiagnosticInternalComponent;
  reason: DiagnosticInternalFailureReason;
}): void {
  const component = INTERNAL_COMPONENTS.has(input.component) ? input.component : 'persistence';
  const reason = INTERNAL_REASONS.has(input.reason) ? input.reason : 'unclassified';
  writeDiagnosticOperationalLog({
    schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'error',
    event: 'internal.failure', component, reason,
  });
}

function writeDiagnosticOperationalLog(record: DiagnosticOperationalLog): void {
  const serialized = JSON.stringify(record);
  if (record.level === 'error') console.error(serialized);
  else console.info(serialized);
}

function responseOutcome(status: number): NonNullable<DiagnosticOperationalLog['outcome']> {
  if (status >= 500) return 'failure';
  if (status >= 400) return 'rejected';
  if (status >= 300) return 'redirect';
  return 'success';
}

/**
 * Emits only fixed route/method metadata, response status and duration.
 * It deliberately accepts no request, user, attempt, media, error or payload fields.
 */
export async function observeDiagnosticRoute(
  input: { route: DiagnosticObservedRoute; method: DiagnosticObservedMethod },
  operation: () => Promise<Response>,
  now: () => number = Date.now,
): Promise<Response> {
  if (!OBSERVED_ROUTES.has(input.route) || !OBSERVED_METHODS.has(input.method)) {
    throw new Error('diagnostic_observability_metadata_invalid');
  }
  const startedAt = now();
  writeDiagnosticOperationalLog({
    schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'info',
    event: 'request.started', route: input.route, method: input.method,
  });
  try {
    const response = await operation();
    const level = response.status >= 500 ? 'error' : 'info';
    writeDiagnosticOperationalLog({
      schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level,
      event: 'request.completed', route: input.route, method: input.method,
      durationMs: Math.max(0, now() - startedAt), status: response.status,
      outcome: responseOutcome(response.status),
    });
    return response;
  } catch (cause) {
    writeDiagnosticOperationalLog({
      schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'error',
      event: 'request.failed', route: input.route, method: input.method,
      durationMs: Math.max(0, now() - startedAt), outcome: 'failure',
    });
    throw cause;
  }
}
