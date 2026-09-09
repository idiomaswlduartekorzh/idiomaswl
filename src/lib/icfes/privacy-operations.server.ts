import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  classifyIcfesPrivacyDatabaseError,
  type IcfesPrivacyOperationErrorCode,
} from './privacy-operations';

export class IcfesPrivacyOperationError extends Error {
  constructor(public readonly code: IcfesPrivacyOperationErrorCode) {
    super(code);
    this.name = 'IcfesPrivacyOperationError';
  }
}

function requireOperationsEnabled() {
  if (process.env.ICFES_PRIVACY_OPERATIONS_ENABLED !== 'true') {
    throw new IcfesPrivacyOperationError('policy_blocked');
  }
}

async function requireAuthenticatedUserId(): Promise<string> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new IcfesPrivacyOperationError('unauthorized');
  return user.id;
}

function requireObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new IcfesPrivacyOperationError('unavailable');
  }
  return value as Record<string, unknown>;
}

async function callPrivacyRpc(
  name: 'export_icfes_user_data' | 'delete_icfes_user_data',
  userId: string,
  idempotencyKey: string,
): Promise<Record<string, unknown>> {
  const { data, error } = await createAdminClient().rpc(name, {
    p_user: userId,
    p_idempotency_key: idempotencyKey,
  }).abortSignal(AbortSignal.timeout(15_000));
  if (error) throw new IcfesPrivacyOperationError(classifyIcfesPrivacyDatabaseError(error.message));
  return requireObject(data);
}

export async function exportAuthenticatedIcfesUserData(
  idempotencyKey: string,
): Promise<Record<string, unknown>> {
  const userId = await requireAuthenticatedUserId();
  requireOperationsEnabled();
  return callPrivacyRpc('export_icfes_user_data', userId, idempotencyKey);
}

export async function deleteAuthenticatedIcfesUserData(
  idempotencyKey: string,
): Promise<Record<string, unknown>> {
  const userId = await requireAuthenticatedUserId();
  requireOperationsEnabled();
  return callPrivacyRpc('delete_icfes_user_data', userId, idempotencyKey);
}

export async function runIcfesRetentionPurge(
  idempotencyKey: string,
  batchLimit = 100,
): Promise<Record<string, unknown>> {
  requireOperationsEnabled();
  const { data, error } = await createAdminClient().rpc('purge_expired_icfes_attempts', {
    p_idempotency_key: idempotencyKey,
    p_limit: batchLimit,
  }).abortSignal(AbortSignal.timeout(30_000));
  if (error) throw new IcfesPrivacyOperationError(classifyIcfesPrivacyDatabaseError(error.message));
  return requireObject(data);
}
