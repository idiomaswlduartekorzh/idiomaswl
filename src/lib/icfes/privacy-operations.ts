export type IcfesPrivacyOperationErrorCode =
  | 'unauthorized'
  | 'invalid_request'
  | 'policy_blocked'
  | 'request_in_progress'
  | 'replay_conflict'
  | 'unavailable';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const ICFES_DELETE_CONFIRMATION = 'DELETE-ICFES-DATA';

export function parseIcfesPrivacyIdempotencyKey(value: string | null): string | null {
  const candidate = value?.trim() ?? '';
  return UUID_PATTERN.test(candidate) ? candidate.toLowerCase() : null;
}

export function isSameOriginIcfesPrivacyRequest(requestUrl: string, origin: string | null): boolean {
  if (!origin) return false;
  try {
    return new URL(requestUrl).origin === new URL(origin).origin;
  } catch {
    return false;
  }
}

export function classifyIcfesPrivacyDatabaseError(message: string | undefined): IcfesPrivacyOperationErrorCode {
  if (!message) return 'unavailable';
  if (message.includes('privacy_contract_not_uniquely_approved')) return 'policy_blocked';
  if (message.includes('privacy_identity_and_idempotency_required')
    || message.includes('privacy_purge_input_invalid')) return 'invalid_request';
  if (message.includes('privacy_request_already_open')
    || message.includes('privacy_request_invalid_state')
    || message.includes('privacy_purge_invalid_state')) return 'request_in_progress';
  if (message.includes('privacy_export_replay_drift')) return 'replay_conflict';
  return 'unavailable';
}

export function icfesPrivacyErrorHttpStatus(code: IcfesPrivacyOperationErrorCode): number {
  if (code === 'unauthorized') return 401;
  if (code === 'invalid_request') return 400;
  if (code === 'policy_blocked') return 423;
  if (code === 'request_in_progress' || code === 'replay_conflict') return 409;
  return 503;
}
